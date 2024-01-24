// facelocker.js by katahiromz
// License: MIT

const facelocker = function(canvas, on_lock){
	this.initialized = false;
	this.canvas = null;
	this.camvas = null;
	this.dets = null;
	this.imageData = null;
	this.target = null;
	this.target_candidate = null;
	this.update_memory = null;
	this.classify_region = null;
	this.threshold = 50.0;
	this.zoomRatio = 1.0;
	const face_aspect = 1.3;
	let error_message = null;

	let self = this;

	const rgba_to_grayscale = function(rgba, nrows, ncols){
		let gray = new Uint8Array(nrows * ncols);
		for(let r = 0; r < nrows; ++r){
			for(let c = 0; c < ncols; ++c){
				// gray = 0.2*red + 0.7*green + 0.1*blue
				gray[r*ncols + c] = (2 * rgba[r*4*ncols + 4*c + 0] +
				                     7 * rgba[r*4*ncols + 4*c + 1] +
				                     1 * rgba[r*4*ncols + 4*c + 2]) / 10;
			}
		}
		return gray;
	};

	const myFillText = function(ctx, text,x, y){
		let fillStyle = ctx.fillStyle;
		ctx.fillStyle = 'black';
		for(dy = -3; dy <= +3; ++dy){
			for(dx = -3; dx <= +3; ++dx){
				ctx.fillText(text, x + dx, y + dy);
			}
		}
		ctx.fillText(text, x, y);
		ctx.fillStyle = fillStyle;
		ctx.fillText(text, x, y);
	};

	const draw_target = function(ctx, target, status){
		let x = target.x, y = target.y, radius = target.radius;
		ctx.beginPath();
		ctx.ellipse(x, y, radius, radius * face_aspect, 0, 0, 2 * Math.PI);
		ctx.lineWidth = 5;
		ctx.strokeStyle = 'black';
		ctx.stroke();
		ctx.lineWidth = 3;
		switch(status){
		case 0:
			ctx.strokeStyle = 'green';
			ctx.stroke();
			break;
		case 1:
			ctx.strokeStyle = 'cyan';
			ctx.stroke();
			ctx.font = "bold 20px san-serif";
			ctx.fillStyle = "#ff0";
			ctx.textAlign = "center";
			myFillText(ctx, "LOCK ON?", x, y - radius);
			break;
		case 2:
			ctx.strokeStyle = 'red';
			ctx.stroke();
			ctx.font = "bold 20px san-serif";
			ctx.fillStyle = "#f99";
			ctx.textAlign = "center";
			myFillText(ctx, "LOCKED ON", x, y - radius);

			let value = (new Date().getTime() % 1000) / 1000;
			let cx = x + radius * Math.cos(value * (2 * Math.PI));
			let cy = y + radius * Math.sin(value * (2 * Math.PI));
			ctx.beginPath();
			ctx.arc(cx, cy, 10, 0, 2 * Math.PI, false);
			ctx.fillStyle = "red";
			ctx.fill();
			break;
		}
	};

	const draw_detections = function(ctx, dets){
		if(!dets)
			return;
		if(self.target){
			draw_target(ctx, self.target, 2);
			return;
		}
		for(let det of dets){
			if(det[3] <= self.threshold)
				continue;

			let x = det[1], y = det[0], radius = det[2] / 2;
			let target = {x: x, y: y, radius: radius};
			draw_target(ctx, target, 0);
		}
		if(self.target_candidate){
			draw_target(ctx, self.target_candidate, 1);
		}
	};

	const track_candidate = function(dets){
		let candidate = self.target_candidate;
		if(!candidate)
			return;
		let nearest_candidate = null;
		let nearest_distance = 1000000000;
		for(let det of dets){
			if(det[3] <= self.threshold)
				continue;

			let x = det[1], y = det[0], radius = det[2] / 2;
			let dx = candidate.x - x;
			let dy = candidate.y - y;
			let dist = dx * dx + dy * dy;
			if (dist < nearest_distance){
				nearest_distance = dist;
				nearest_candidate = {x: x, y: y, radius: radius};
			}
		}
		if (nearest_candidate){
			self.target_candidate = nearest_candidate;
		}
	}

	this.get_detections = function(rgba, width, height){
		if (!self.classify_region || !self.update_memory)
			return;

		let image = {
			pixels: rgba_to_grayscale(rgba, height, width),
			nrows: height,
			ncols: width,
			ldim: width
		};

		let params = {
			shiftfactor: 0.1, // move the detection window by 10% of its size
			minsize: 25,     // minimum size of a face
			maxsize: 1000,    // maximum size of a face
			scalefactor: 1.1  // for multiscale processing: resize the detection window by 10% when moving to the higher scale
		};

		let dets = pico.run_cascade(image, self.classify_region, params);
		dets = self.update_memory(dets);
		dets = pico.cluster_detections(dets, 0.2); // set IoU threshold to 0.2
		return dets;
	};

	this.stop = function(){
		if(!self.initialized)
			return;

		self.camvas.cancelAnimation();
	};

	this.resume = function(){
		if(!self.initialized)
			return;

		self.camvas.requestAnimation();
	};

	this.lock_unlock = function(do_lock){
		if(!self.initialized)
			return;

		if(self.target){
			self.target = null;
			if (self.on_lock)
				self.on_lock(0);
		}else if(self.target_candidate){
			self.target = self.target_candidate;
			self.target_candidate = null;
			if (self.on_lock)
				self.on_lock(2);
		}
	};

	this.intersect_rectangle = function(rect1, rect2){
		if(rect1.width <= 0 || rect1.height <= 0 || rect2.width <= 0 || rect2.height <= 0)
			return false;
		let x0 = Math.max(rect1.x, rect2.x);
		let y0 = Math.max(rect1.y, rect2.y);
		let x1 = Math.min(rect1.x + rect1.width, rect2.x + rect2.width);
		let y1 = Math.min(rect1.y + rect1.height, rect2.y + rect2.height);
		let width = x1 - x0, height = y1 - y0;
		if(width <= 0 || height <= 0)
			return false;
		return {x:x0, y:y0, width:width, height:height};
	}

	this.is_same_target = function(target1, target2){
		let rect1 = {
			x: target1.x - target1.radius,
			y: target1.y - target1.radius,
			width: 2 * target1.radius,
			height: 2 * target1.radius
		};
		let rect2 = {
			x: target2.x - target2.radius,
			y: target2.y - target2.radius,
			width: 2 * target2.radius,
			height: 2 * target2.radius
		};
		return self.intersect_rectangle(rect1, rect2);
	};

	this.get_status = function(){
		if (self.target)
			return 2;
		else if(self.target_candidate)
			return 1;
		else
			return 0;
	};

	this.on_click = function(e){
		if(self.target)
			return;

		let dets = self.dets;
		if(!dets)
			return;

		let found = null;
		let nearest_distance = 1000000000;
		let pageX = e.pageX, pageY = e.pageY;
		for(let det of dets){
			if(det[3] <= self.threshold)
				continue;

			let x = det[1], y = det[0], radius = det[2];
			let rect = {x: x - radius/2, y: y - radius/2 * face_aspect, width: radius, height: radius * face_aspect};
			if (pageX < rect.x || pageY < rect.y)
				continue;
			if (rect.x + rect.width < pageX || rect.y + rect.height < pageY)
				continue;
			let dx = pageX - x, dy = pageY - y;
			let dist = dx * dx + dy * dy;
			if (dist < nearest_distance){
				nearest_distance = dist;
				found = {x: x, y: y, radius: radius};
			}
		}

		if(found){
			if(self.target_candidate && self.is_same_target(found, self.target_candidate)){
				self.target = self.target_candidate;
				self.target_candidate = null;
				if (self.on_lock)
					self.on_lock(2);
			}else{
				self.target_candidate = found;
				if (self.on_lock)
					self.on_lock(1);
			}
		}else{
			self.target_candidate = null;
			if (self.on_lock)
				self.on_lock(0);
		}
	};

	this.found_face = function(){
		let dets = self.dets;
		if(!dets)
			return false;
		for(let det of dets){
			if(det[3] <= self.threshold)
				continue;
			return true;
		}
		return false;
	};

	this.set_side = function(side = null){
		if(side)
			self.side = side;
		else if(self.side == 'user')
			self.side = 'environment';
		else
			self.side = 'user';

		if(self.camvas.connecting){
			self.camvas.disconnect();
			self.camvas.connect(self.side, function(side){
				self.side = side;
				localStorage.setItem('saiminCameraSide', side);
			});
		}
	};

	function load_facefinder(){
		let url = './facefinder';
		if(location.protocol == 'file:')
			url = 'https://katahiromz.github.io/saimin/facefinder';
		fetch(url)
		.then(function(response){
			response.arrayBuffer().then(function(buffer){
				let bytes = new Int8Array(buffer);
				self.classify_region = pico.unpack_cascade(bytes);
				error_message = null;
				console.log('* facefinder loaded');
			})
		}).catch((e) => {
			error_message = trans_getText('TEXT_NO_WEBCONNECT');
			setTimeout(load_facefinder, 10 * 1000);
		});
	};

	this.init = function(canvas, on_lock){
		if(typeof canvas == 'string')
			canvas = document.getElementById(canvas);
		self.canvas = canvas;

		self.on_lock = on_lock;

		let saiminCameraSide = localStorage.getItem('saiminCameraSide');
		if(saiminCameraSide){
			self.side = saiminCameraSide;
		}else{
			self.side = 'user';
		}

		if(self.initialized)
			return;

		// Initialize pico.js face detector
		self.update_memory = pico.instantiate_detection_memory(5); // we will use the detecions of the last 5 frames

		load_facefinder();

		// Get the drawing context on the canvas and define a function to transform an RGBA image to grayscale
		let ctx = self.canvas.getContext('2d', {
			willReadFrequently: true,
			antialias: false,
			alpha: false,
		});

		const get_best_zoom = function(width, height, videoWidth, videoHeight){
			if (videoHeight * width < height * videoWidth){
				return height / videoHeight;
			}else{
				return width / videoWidth;
			}
		};

		// This function is called each time a video frame becomes available
		let processfn = function(video, dt){
			// The canvas size
			ctx.canvas.width = window.innerWidth;
			ctx.canvas.height = window.innerHeight;
			let width = ctx.canvas.width, height = ctx.canvas.height;

			if (self.target != null){
				ctx.putImageData(self.imageData, 0, 0);
				draw_detections(ctx, self.dets);
				return;
			}

			let camvas = self.camvas;
			let videoWidth = camvas.videoWidth, videoHeight = camvas.videoHeight;
			self.zoomRatio = get_best_zoom(width, height, videoWidth, videoHeight);
			ctx.drawImage(video, 0, 0, videoWidth, videoHeight,
			              width / 2 - self.zoomRatio * videoWidth / 2,
			              height / 2 - self.zoomRatio * videoHeight / 2,
			              self.zoomRatio * videoWidth, self.zoomRatio * videoHeight);
			self.imageData = ctx.getImageData(0, 0, width, height);
			self.dets = self.get_detections(self.imageData.data, width, height);
			track_candidate(self.dets);
			draw_detections(ctx, self.dets);

			ctx.font = "bold 20px san-serif";
			let text;
			if (error_message !== null){
				ctx.fillStyle = "red";
				ctx.textAlign = "center";
				text = error_message;
				myFillText(ctx, text, width / 2, height - 20 / 2);
			}else if (self.target_candidate == null){
				ctx.fillStyle = "red";
				ctx.textAlign = "center";
				text = trans_getText('TEXT_FACE_GETTER');
				myFillText(ctx, text, width / 2, 20);
				if(self.found_face()){
					text = trans_getText('TEXT_TAP_ON_TARGET');
				}else{
					text = trans_getText('TEXT_CANT_FIND_FACE');
				}
				myFillText(ctx, text, width / 2, height - 20 / 2);
			}else{
				ctx.fillStyle = "#f0f";
				ctx.textAlign = "center";
				text = trans_getText('TEXT_CAN_LOCK_ON');
				myFillText(ctx, text, width / 2, height - 20 / 2);
			}
		}

		// Instantiate camera handling (see https://github.com/cbrandolino/camvas)
		self.camvas = new camvas(ctx, processfn);
		self.camvas.connect(self.side, function(side){
			self.side = side;
		});

		self.initialized = true;

		self.on_lock(0);
	}

	this.init(canvas, on_lock);
};
