// facelocker.js by katahiromz
// License: MIT

const facelocker = function(canvas, on_lock){
	this.initialized = false;
	this.canvas = null; // キャンバス。
	this.camvas = null; // カメラとキャンバスを取り扱う。
	this.dets = null; // 検出されたオブジェクト群。
	this.imageData = null; // ロックオン時のイメージ。
	this.target = null; // ターゲット。
	this.target_candidate = null; // ターゲットの候補。
	this.update_memory = null; // pico.js用のデータ。
	this.classify_region = null; // pico.jsの顔検出器。
	this.threshold = 50.0; // 顔検出の閾値。
	this.zoomRatio = 1.0; // ズーム比率。
	this.heart_img = new Image(); // ハート画像。
	this.heart_img.src = 'img/heart.svg';
	const face_aspect = 1.3; // 一般的な顔の縦横比。
	let error_message = null; // エラーメッセ－ジ（もしあれば）。
	let self = this;

	// RGBAデータをグレースケールに変換する関数。
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

	// テキストを描画する関数。
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

	// ターゲットを描画する関数。
	const draw_target = function(ctx, target, status){
		let x = target.x, y = target.y, radius = target.radius;
		ctx.beginPath();
		ctx.ellipse(x, y, radius, radius * face_aspect, 0, 0, 2 * Math.PI);
		ctx.lineWidth = 5;
		ctx.strokeStyle = 'black';
		ctx.stroke();
		ctx.lineWidth = 3;
		// 状態に応じて描画方法を変える。
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

			// 回転するハート群を描画する。
			if (self.heart_img.complete){
				let value = (new Date().getTime() % 2500) / 2500;
				const num = 8;
				for (let i = 0; i < num; ++i){
					let radian = (value + i / num) * (2 * Math.PI);
					let heart_width = self.heart_img.width * (4 + Math.sin(value * 2 * Math.PI)) * 0.3;
					let heart_height = self.heart_img.height * (4 + Math.sin(value * 2 * Math.PI)) * 0.3;
					let cx = x - heart_width / 2 + radius * Math.cos(radian);
					let cy = y - heart_height / 2 + radius * Math.sin(radian) * face_aspect;
					ctx.drawImage(self.heart_img, cx, cy, heart_width, heart_height);
				}
			}

			// 中央から離れるにつれ黄色を深めるグラデーション。
			let dxy = (ctx.canvas.width + ctx.canvas.height) / 2;
			let grd = ctx.createRadialGradient(x, y, dxy * 0.25, x, y, dxy * 0.5);
			let value2 = (new Date().getTime() % 400) / 400;
			grd.addColorStop(0, 'rgba(255, 255, 255, 0.0)');
			grd.addColorStop(1, `rgba(255, 255, 0, ${0.65 + 0.20 * Math.sin(value2 * 2 * Math.PI)})`);
			ctx.fillStyle = grd;
			ctx.beginPath();
			ctx.arc(x, y, dxy, 0, 2 * Math.PI);
			ctx.fill();
			break;
		}
	};

	// 検出された顔を描画する関数。
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

	// ターゲット候補を追跡する。
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

	// 顔認識で顔を検出する関数。
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

	// 顔認識を停止する。
	this.stop = function(){
		if(!self.initialized)
			return;

		self.camvas.cancelAnimation();
	};

	// 顔認識を再開する。
	this.resume = function(){
		if(!self.initialized)
			return;

		self.camvas.requestAnimation();
	};

	// 顔認識のロック・アンロックを切り替える。
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

	// ２長方形の交差部分を計算する。交差がなければfalseを返す。
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

	// 同じターゲットかを判定する。
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

	// 顔認識の状態を返す。
	this.get_status = function(){
		if (self.target)
			return 2;
		else if(self.target_candidate)
			return 1;
		else
			return 0;
	};

	// 顔認識のキャンバスがクリックされた。
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

	// 顔が見つかったか？
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

	// カメラの裏表の設定。
	this.set_side = function(side = null){
		if(side)
			self.side = side;
		else if(self.side == 'user')
			self.side = 'environment';
		else
			self.side = 'user';

		if(self.camvas.connecting){
			// camvasに接続されていれば再接続する。
			self.camvas.disconnect();
			self.camvas.connect(self.side, function(side){
				self.side = side;
				// ローカルストレージにカメラの裏表の設定を保存する。
				localStorage.setItem('saiminCameraSide', side);
			});
		}
	};

	// pico.jsの顔検出器を読み込む。
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

	// 顔認識を初期化する。
	this.init = function(canvas, on_lock){
		if(typeof canvas == 'string')
			canvas = document.getElementById(canvas);
		self.canvas = canvas;

		self.on_lock = on_lock;

		// カメラの裏表の設定をローカルストレージから読み込む。
		let saiminCameraSide = localStorage.getItem('saiminCameraSide');
		if(saiminCameraSide){
			self.side = saiminCameraSide;
		}else{
			self.side = 'user';
		}

		// 初期化済みか？
		if(self.initialized)
			return;

		// Initialize pico.js face detector
		self.update_memory = pico.instantiate_detection_memory(5); // we will use the detecions of the last 5 frames

		// 顔検出器を読み込む。
		load_facefinder();

		// Get the drawing context on the canvas and define a function to transform an RGBA image to grayscale
		let ctx = self.canvas.getContext('2d', {
			willReadFrequently: true,
			antialias: false,
			alpha: false,
		});

		// 最適なズーム比率を計算する。
		const get_best_zoom = function(width, height, videoWidth, videoHeight){
			if (videoHeight * width < height * videoWidth){
				return height / videoHeight;
			}else{
				return width / videoWidth;
			}
		};

		// This function is called each time a video frame becomes available
		let processfn = function(video, dt){
			// キャンバスサイズ。
			ctx.canvas.width = window.innerWidth;
			ctx.canvas.height = window.innerHeight;
			let width = ctx.canvas.width, height = ctx.canvas.height;

			// ターゲットがあるか？
			if (self.target != null){
				ctx.putImageData(self.imageData, 0, 0);
				draw_detections(ctx, self.dets);
				return;
			}

			// カメラと画面のアスペクト比に応じてズームする。
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

			// 顔認識のキャンバスに文字列を表示する。
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

		self.initialized = true; // 初期化された。
		self.on_lock(0); // 最初はターゲットなし。
	}

	this.init(canvas, on_lock);
};
