const camvas = function(ctx, callback){
	let self = this;
	this.ctx = ctx;
	this.callback = callback;
	this.animation = null;
	this.connecting = false;
	this.forbidden_side = null;
	this.allowed_side = null;
	this.videoWidth = 320;
	this.videoHeight = 240;

	let last = Date.now();
	this.loop = function() {
		if (!self.animation)
			return;

		self.callback(self.video, Date.now() - last);
		last = Date.now();
		self.animation = requestAnimationFrame(self.loop);

		self.videoWidth = self.video.videoWidth;
		self.videoHeight = self.video.videoHeight;
	};

	this.cancelAnimation = function(){
		if (self.animation){
			cancelAnimationFrame(self.animation);
			self.animation = null;
		}
	};
	this.requestAnimation = function(){
		if (self.animation == null){
			self.animation = requestAnimationFrame(self.loop)
		}
	};

	this.connect = function(side = null, callback = null){
		if(side && side == self.forbidden_side)
			side = self.allowed_side;

		let facingMode = null;
		if(side == 'user')
			facingMode = 'user';
		else if(side == 'environment')
			facingMode = {exact: 'environment'};

		// We can't `new Video()` yet, so we'll resort to the vintage
		// "hidden div" hack for dynamic loading.
		self.streamContainer = document.createElement('div');
		self.video = document.createElement('video');

		self.video.setAttribute('autoplay', '1');
		self.video.setAttribute('playsinline', '1'); // important for iPhones

		// The video should fill out all of the canvas
		self.video.setAttribute('width', 1);
		self.video.setAttribute('height', 1);

		self.video.addEventListener('loadedmetadata', function(e){
			self.videoWidth = this.videoWidth;
			self.videoHeight = this.videoHeight;
		}, false);

		self.streamContainer.appendChild(self.video);
		document.body.appendChild(self.streamContainer);

		if(facingMode){
			navigator.mediaDevices.getUserMedia({
				audio: false,
				video: {
					facingMode: facingMode,
				},
			}).then(function(stream) {
				self.video.srcObject = stream;
				self.connecting = true;
				if(callback){
					callback(side);
				}
				self.requestAnimation();
			}, function(err) {
				self.forbidden_side = side;
				if(side == 'user')
					self.allowed_side = side = 'environment';
				else
					self.allowed_side = side = 'user';
				// Retry with looser contraint
				navigator.mediaDevices.getUserMedia({
					audio: false,
					video: true,
				}).then(function(stream) {
					self.video.srcObject = stream;
					self.connecting = true;
					if(callback){
						callback(side);
					}
					self.requestAnimation();
				}, function(err) {
					throw err;
				});
			})
		}else{
			navigator.mediaDevices.getUserMedia({
				audio: false,
				video: true,
			}).then(function(stream) {
				self.video.srcObject = stream;
				self.connecting = true;
				if(callback){
					callback(side);
				}
				self.requestAnimation();
			}, function(err) {
				throw err;
			});
		}
	};

	this.disconnect = function(){
		self.connecting = false;
		if(self.video){
			self.video.srcObject.getVideoTracks().forEach(function(camera){
				camera.stop();
			});
			self.video = null;
		}
		if(self.streamContainer && self.streamContainer.parentNode){
			self.streamContainer.parentNode.removeChild(self.streamContainer);
			self.streamContainer = null;
		}
	};

	this.destroy = function() {
		self.cancelAnimation();
		self.disconnect();
	};
};
