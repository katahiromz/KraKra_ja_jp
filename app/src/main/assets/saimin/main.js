/* jshint esversion: 8 */

const NUM_TYPE = 7;
const VERSION = '3.2.2';
const DEBUG = true;

// {{language-specific}}
const TEXT_PIC = '画';
const TEXT_OK = 'OK';
const TEXT_CANCEL = 'キャンセル';
const TEXT_YES = 'はい';
const TEXT_NO = 'いいえ';
const TEXT_VERSION_INFO = 'バージョン情報';
const TEXT_INIT_APP = 'アプリの初期化';
const TEXT_INITTED_APP = 'アプリを初期化しました。';
const TEXT_ADULT_CHECK = '成人チェック';
const TEXT_CONFIGURATION = '全般設定';
const TEXT_EXPIRED = '期限切れ';
const TEXT_APPEARANCE = '見た目の設定';
const TEXT_INPUT_MESSAGE = 'メッセージ文字列を入力して下さい。';
const TEXT_FORBIDDEN = '使用禁止';
const TEXT_FULLWIDTH_SPACE = '　';
const TEXT_PERIOD = '。';
const TEXT_PERIOD_SPACE = '。';

jQuery(function($){
	var cx = 0, cy = 0;
	var old_cx = null, old_cy = null;
	var old_time = (new Date()).getTime();
	var type = 0;
	var counter = 0, clock = 0;
	var ready = false;
	var theText = '';
	var division = -1;
	var speed = 45.0;
	var sound = null;
	var soundName = 'Magic';
	var kirakira_sound = null;
	var typeSound = 1;
	var stars = new Array(32);
	var touchmoving = false;
	var theRegistration = null;
	var speedType = 'normal';
	var coin = new Image();
	coin.src = 'images/coin5yen.png';

	function isNativeApp(){
		return navigator.userAgent.indexOf('/KraKra-native-app/') != -1;
	}

	function isWebApp(){
		return navigator.userAgent.indexOf('/KraKra-web-app/') != -1;
	}

	function getNativeAppVersion(){
		let results = navigator.userAgent.match(/\/KraKra-native-app\/([\d\.]+)\//);
		if (results)
			return results[1];
		return false;
	}

	function addStar(x, y){
		stars.shift();
		if (isLargeDisplay()){
			x += (Math.random() - 0.5) * 2 * 20 * 2;
			y += (Math.random() - 0.5) * 2 * 20 * 2;
			let size = 5 + Math.random() * 10 * 2;
			stars.push([x, y, size]);
		}else{
			x += (Math.random() - 0.5) * 2 * 20;
			y += (Math.random() - 0.5) * 2 * 20;
			let size = 5 + Math.random() * 10;
			stars.push([x, y, size]);
		}
	}

	function cancelSpeech(){
		try{
			android.cancelSpeech();
		}catch(error){
			if (window.speechSynthesis){
				window.speechSynthesis.cancel();
			}
		}
	}

	function adjustText(text){
		// {{language-specific}}
		text = text.replace(TEXT_FULLWIDTH_SPACE, '  ').trim();
		if (text == '')
			return text;
		while (text.slice(-1) == TEXT_PERIOD)
			text = text.slice(0, -1);
		if (text == '')
			return text;
		text += TEXT_PERIOD_SPACE;
		return text;
	}

	async function playSpeech(text){
		cancelSpeech();
		text = adjustText(text);
		try{
			android.speechLoop(text);
		}catch(error){
			if (window.speechSynthesis){
				text = text.repeat(64);
				var speech = new SpeechSynthesisUtterance(text);
				// {{language-specific}}
				speech.pitch = 0.6;
				speech.rate = 0.4;
				speech.lang = 'ja-JP';
				window.speechSynthesis.speak(speech);
			}
		}
	}

	function isLargeDisplay(){
		return cx >= 1500 || cy >= 1500;
	}

	var playing = null;

	function setSoundName(value, test = false){
		if (value.indexOf('sn') == 0)
			value = '';
		soundName = value;
		if (soundName != ''){
			console.log('sn/' + soundName + '.mp3, ' + test);
			if (test){
				sound = null;
			}
			sound = new Audio('sn/' + soundName + '.mp3');
			if (test){
				if (playing){
					try{
						playing.pause();
					}catch(error){
						;
					}
				}
				setTimeout(function(){
					playing = sound;
					sound.play();
				}, 100);
			}
		}else{
			sound = null;
		}
		document.getElementById('sound-select').value = value;
		localStorage.setItem('saiminSoundName', soundName);
	}

	function setTypeSound(value, test = false){
		typeSound = parseInt(value);
		document.getElementById('type-sound-select').value = value;
		localStorage.setItem('saiminTypeSound', value);
		if (test && typeSound == 1 && kirakira_sound){
			kirakira_sound.play();
		}
	}

	function setSpeedType(value){
		switch (value){
		case 'slow':
			speed = 35.0;
			break;
		case 'normal':
		case 'irregular':
			speed = 45.0;
			break;
		case 'fast':
			speed = 70.0;
			break;
		default:
			return;
		}
		speedType = value;
		document.getElementById('speed-type-select').value = value;
		localStorage.setItem('saiminSpeedType', value);
	}

	function setDivision(value){
		division = parseInt(value);
		document.getElementById('division-select').value = division;
		localStorage.setItem('saiminDivision', division.toString());
	}

	function getCount(){
		return counter;
	}

	function setType(value){
		if (!ready)
			return;
		type = parseInt(value);
		if (type == 0){
			$('#please-tap-here').removeClass('invisible');
			$('#heart-block').removeClass('invisible');
		}else{
			$('#please-tap-here').addClass('invisible');
			$('#heart-block').addClass('invisible');
		}
		var type_select = document.getElementById('type-select');
		type_select.value = type.toString();
		$('#type-select-button').text(TEXT_PIC + type.toString());
		localStorage.setItem('saiminType', type.toString());
	}

	function setText(txt){
		theText = txt.replace(TEXT_FULLWIDTH_SPACE, '  ').trim();
		localStorage.setItem('saiminText', theText);
		var speech = document.getElementById('speech');
		if (speech.checked){
			playSpeech(theText);
		}
		$('#floating-text').text(theText);
	}

	function fitCanvas(){
		var ctx = document.getElementById('canvas').getContext('2d');
		cx = ctx.canvas.width = window.innerWidth;
		cy = ctx.canvas.height = window.innerHeight;
	}

	function fit(){
		fitCanvas();
		let position = { my: 'center', at: 'center', of: window };
		if (localStorage.getItem('saiminHelpShowing')){
			$('#about-dialog').dialog('option', 'position', position);
		}else if (localStorage.getItem('saiminAppearanceShowing')){
			$('#appearance-dialog').dialog('option', 'position', position);
		}else if (localStorage.getItem('saiminConfigShowing')) {
			$('#config-dialog').dialog('option', 'position', position);
		}
	}

	function forbidden(){
		$('#child-dialog').dialog({
			dialogClass: 'no-close',
			title: TEXT_FORBIDDEN,
			buttons: [{
				text: TEXT_OK,
				click: function(){
					$(this).dialog('close');
					location.href = 'https://google.co.jp';
					return false;
				},
			}],
		});
	}

	function updateVersionDisplay(){
		let nativeVersion = getNativeAppVersion();
		let text = $('#version-text').text();
		if (nativeVersion){
			text = text.replace('[[VERSION]]', nativeVersion + '(native) / ' + VERSION + '(web)');
		}else{
			text = text.replace('[[VERSION]]', VERSION + '(web)');
		}
		$('#version-text').text(text);
	}

	function accepted(){
		ready = true;
		localStorage.setItem('saiminAdultCheck', '1');
		var saiminType = localStorage.getItem('saiminType');
		if (saiminType){
			setType(parseInt(saiminType));
		}else{
			setType(0);
		}
		$('#microphone-label').removeClass('invisible');
		$('#type-select-button').removeClass('invisible');
		$('#sound-button').removeClass('invisible');
		$('#speech-label').removeClass('invisible');
		$('#config-button').removeClass('invisible');
		$('#about-button').removeClass('invisible');
		$('#text-button').removeClass('invisible');
		if (isNativeApp()){
			$('#caption').addClass('invisible');
		}
		if (type == 0){
			$('#please-tap-here').removeClass('invisible');
		}else{
			$('#please-tap-here').addClass('invisible');
		}
		updateVersionDisplay();
		window.requestAnimationFrame(draw);
	}

	function help(){
		$('#notice-text').width(window.innerWidth * 2 / 3).height(window.innerHeight * 2 / 5).scrollTop(0);
		localStorage.setItem('saiminHelpShowing', '1');
		$('#about-dialog').dialog({
			dialogClass: 'no-close',
			title: TEXT_VERSION_INFO,
			buttons: [{
				text: TEXT_INIT_APP,
				click: function(){
					try{
						android.clearSettings();
					}catch(error){
						;
					}
					localStorage.clear();
					localStorage.setItem('saiminAdultCheck', '1');
					if (theRegistration){
						theRegistration.unregister();
					}
					alert(TEXT_INITTED_APP);
					$(this).dialog('close');
					location.reload();
				},
			},{
				text: TEXT_OK,
				click: function(){
					$(this).dialog('close');
				},
			}],
			width: window.innerWidth * 4 / 5,
		});
		$('#about-dialog').on('dialogclose', function(event){
			localStorage.removeItem('saiminHelpShowing');
		});
	}

	function doAdultCheck(){
		if (true){ // We don't do adult check any more
			accepted();
			help();
		}else{
			$('#adult-check-dialog').dialog({
				dialogClass: 'no-close',
				title: TEXT_ADULT_CHECK,
				buttons: [
					{
						text: TEXT_YES,
						click: function(){
							$(this).dialog('close');
							accepted();
							help();
						},
					},
					{
						text: TEXT_NO,
						click: function(){
							localStorage.setItem('saiminAdultCheck', '-1');
							$(this).dialog('close');
							forbidden();
						},
					},
				],
			});
		}
	}

	function apperance(){
		let type_select = document.getElementById('type-select');
		let division_select = document.getElementById('division-select');
		let speed_type_select = document.getElementById('speed-type-select');
		let old_type_value = type_select.value;
		let old_division_value = division_select.value;
		let old_speed_type_value = speed_type_select.value;
		localStorage.setItem('saiminAppearanceShowing', '1');
		$('#appearance-dialog').dialog({
			dialogClass: 'no-close',
			title: TEXT_APPEARANCE,
			buttons: [
				{
					text: TEXT_OK,
					click: function(){
						$(this).dialog('close');
					},
				},{
					text: TEXT_CANCEL,
					click: function(){
						setType(old_type_value);
						setDivision(old_division_value);
						setSpeedType(old_speed_type_value);
						$(this).dialog('close');
					},
				}
			],
		});
		$('#appearance-dialog').on('dialogclose', function(event){
			localStorage.removeItem('saiminAppearanceShowing');
		});
	}

	function config(){
		let sound_select = document.getElementById('sound-select');
		let type_sound_select = document.getElementById('type-sound-select');
		let old_sound_value = sound_select.value;
		let old_type_sound_value = type_sound_select.value;
		localStorage.setItem('saiminConfigShowing', '1');
		$('#config-dialog').dialog({
			dialogClass: 'no-close',
			title: TEXT_CONFIGURATION,
			buttons: [
				{
					text: TEXT_OK,
					click: function(){
						$(this).dialog('close');
					},
				},{
					text: TEXT_CANCEL,
					click: function(){
						setSoundName(old_sound_value);
						setTypeSound(old_type_sound_value);
						$(this).dialog('close');
					},
				}
			],
		});
		$('#config-dialog').on('dialogclose', function(event){
			localStorage.removeItem('saiminConfigShowing');
		});
	}

	function circle(ctx, x, y, radius, is_fill = true){
		ctx.beginPath();
		ctx.arc(x, y, radius, 0, 2 * Math.PI);
		ctx.closePath();
		if (is_fill)
			ctx.fill();
		else
			ctx.stroke();
	}

	function line(ctx, x0, y0, x1, y1, lineWidth){
		ctx.lineWidth = lineWidth;
		ctx.beginPath();
		ctx.moveTo(x0, y0);
		ctx.lineTo(x1, y1);
		ctx.stroke();
	}

	function heart(ctx, x0, y0, x1, y1){
		var x2 = (0.6 * x0 + 0.4 * x1);
		var y2 = (0.6 * y0 + 0.4 * y1);
		var comp = new Complex({re:x1 - x0, im:y1 - y0});
		var comp0 = new Complex({abs:1.0, arg:Math.PI * 0.5});
		var p0 = comp.mul(comp0.div(16)).add({re:x0, im:y0});
		var p1 = comp.div(comp0.mul(16)).add({re:x0, im:y0});
		var p2 = comp.mul(comp0).add({re:x0, im:y0});
		var p3 = comp.div(comp0).add({re:x0, im:y0});
		ctx.beginPath();
		ctx.moveTo(x2, y2);
		ctx.bezierCurveTo(p0.re, p0.im, p2.re, p2.im, x1, y1);
		ctx.bezierCurveTo(p3.re, p3.im, p1.re, p1.im, x2, y2);
		ctx.fill();
	}

	function eye(ctx, x0, y0, r, opened = 1.0){
		ctx.beginPath();
		ctx.moveTo(x0 - r, y0);
		const r025 = r * 0.25;
		const r05 = r025 * 2 * opened;
		ctx.bezierCurveTo(x0 - r025, y0 - r05, x0 + r025, y0 - r05, x0 + r, y0);
		ctx.bezierCurveTo(x0 + r025, y0 + r05, x0 - r025, y0 + r05, x0 - r, y0);
		ctx.closePath();
		ctx.stroke();

		ctx.save();
		circle(ctx, x0, y0, r / 3 * opened, true);
		ctx.restore();
	}

	function light(ctx, x0, y0, radius){
		var r0 = radius;
		var rmid = radius * 0.333;
		ctx.beginPath();
		ctx.moveTo(x0 - r0, y0);
		ctx.lineTo(x0, y0 + rmid);
		ctx.lineTo(x0 + r0, y0);
		ctx.lineTo(x0, y0 - rmid);
		ctx.fill();
		
		ctx.beginPath();
		ctx.moveTo(x0, y0 - r0);
		ctx.lineTo(x0 + rmid, y0);
		ctx.lineTo(x0, y0 + r0);
		ctx.lineTo(x0 - rmid, y0);
		ctx.fill();
	}

	function drawType0(ctx, px, py, dx, dy){
		ctx.save();

		var qx = px + dx / 2;
		var qy = py + dy / 2;
		var dxy = (dx + dy) / 2;

		ctx.fillStyle = 'black';
		ctx.fillRect(px, py, dx, dy);

		let grd = ctx.createRadialGradient(qx, qy, 0, qx, qy, dxy * 0.5);
		grd.addColorStop(0, 'rgba(255, 0, 255, 0.0)');
		grd.addColorStop(1, 'rgba(255, 0, 255, 1.0)');
		ctx.fillStyle = grd;
		circle(ctx, qx, qy, dxy, true);

		ctx.restore();
	}

	function drawType1(ctx, px, py, dx, dy){
		ctx.save();

		var qx = px + dx / 2;
		var qy = py + dy / 2;

		ctx.beginPath();
		ctx.moveTo(px, py);
		ctx.lineTo(px + dx, py);
		ctx.lineTo(px + dx, py + dy);
		ctx.lineTo(px, py + dy);
		ctx.closePath();
		ctx.clip();

		ctx.fillStyle = '#f6f';
		ctx.fillRect(px, py, dx, dy);

		var size = (dx + dy) * 2 / 5;
		var count2 = getCount();
		if (isLargeDisplay()){
			qx += 60 * Math.cos(count2 * 0.1);
			qy += 60 * Math.sin(count2 * 0.1);
		}else{
			qx += 30 * Math.cos(count2 * 0.1);
			qy += 30 * Math.sin(count2 * 0.1);
		}

		var dr0 = 15;
		var dr = dr0 / 2;
		var flag2 = -1;
		var ci = 6;

		ctx.strokeStyle = '#000';
		ctx.lineCap = 'square';

		for (var i = 0; i <= ci; ++i){
			var count = 0;
			var x, y, oldx = qx, oldy = qy, f = 0.5;
			for (var radius = 0; radius < size; radius += f){
				var theta = dr0 * count * 0.375;
				var value = 0.3 * Math.sin(count2 * 0.04) + 0.7;

				var radian = theta * (Math.PI / 180.0) + i * (2 * Math.PI) / ci;
				var comp = new Complex({abs:radius, arg:flag2 * radian - count2 * (Math.PI * 0.03)});
				x = qx + comp.re;
				y = qy + comp.im;
			
				line(ctx, oldx, oldy, x, y, dr * f * 0.666);

				oldx = x;
				oldy = y;
				count += 1;
				f *= 1.02;
			}
		}

		ctx.restore();
	}

	function drawType2(ctx, px, py, dx, dy, flag=true){
		ctx.save();

		var qx = px + dx / 2;
		var qy = py + dy / 2;
		var dxy = (dx + dy) / 2;

		var count2 = getCount();
		var factor = (0.99 + Math.abs(Math.sin(count2 * 0.2)) * 0.01);

		ctx.beginPath();
		if (flag){
			ctx.moveTo(px, py);
			ctx.lineTo(px + dx, py);
			ctx.lineTo(px + dx, py + dy);
			ctx.lineTo(px, py + dy);
		} else {
			var value = 0.2 + 0.2 * Math.abs(Math.sin(count2 * 0.02));
			ctx.arc(qx, qy, dxy * value, 0, 2 * Math.PI);
		}
		ctx.closePath();
		ctx.clip();

		ctx.fillStyle = '#f3c';
		ctx.fillRect(px, py, dx, dy);

		var size = (cx + cy) * 0.4;

		var dr0 = 30;
		if (isLargeDisplay()){
			dr0 *= 2;
			count2 *= 2;
			ctx.lineWidth = 30;
		} else {
			ctx.lineWidth = 15;
		}
		var dr = dr0 / 2 * factor;
		var radius = (count2 * 4) % dr0;
		if (flag)
			radius = dr0 - radius;

		if (radius < 0)
			radius = -radius;

		for (; radius < size; radius += dr0)
		{
			circle(ctx, qx, qy, radius, false);
		}

		ctx.restore();
	}

	function hsv2rgb(h, s, v)
	{
		var r, g, b;
		r = g = b = v;
		if (s > 0)
		{
			h *= 6;
			var i = Math.floor(h);
			var f = h - i;
			switch (i)
			{
			case 0:
			default:
				g *= 1 - s * (1 - f);
				b *= 1 - s;
				break;
			case 1:
				r *= 1 - s * f;
				b *= 1 - s;
				break;
			case 2:
				r *= 1 - s;
				b *= 1 - s * (1 - f);
				break;
			case 3:
				r *= 1 - s;
				g *= 1 - s * f;
				break;
			case 4:
				r *= 1 - s * (1 - f);
				g *= 1 - s;
				break;
			case 5:
				g *= 1 - s;
				b *= 1 - s * f;
				break;
			}
		}
		return [r, g, b];
	}

	function drawType3(ctx, px, py, dx, dy){
		ctx.save();

		var qx = px + dx / 2;
		var qy = py + dy / 2;
		var dxy = (dx + dy) / 2;

		ctx.beginPath();
		ctx.moveTo(px, py);
		ctx.lineTo(px + dx, py);
		ctx.lineTo(px + dx, py + dy);
		ctx.lineTo(px, py + dy);
		ctx.closePath();
		ctx.clip();

		//ctx.fillStyle = 'white';
		//ctx.fillRect(px, py, dx, dy);

		var count2 = getCount();
		var factor = count2 * 0.03;

		var size = 32;
		if (isLargeDisplay())
			size *= 2;
		var nCount2 = 0;
		var cxy = ((cx >= cy) ? cy : cx) * 1.2;
		var xy0 = (cxy + size) - (cxy + size) % size;
		var comp0 = new Complex({abs:1.0, arg:factor * 1.0});
		for (var y = -xy0; y < cxy + size; y += size)
		{
			var nCount = nCount2 % 3;
			for (var x = -xy0; x < cxy + size; x += size)
			{
				var h, s = 1.0, v = 1.0;
				switch (nCount % 3)
				{
				case 0:
					h = (0.2 + factor * 1.2) % 1.0;
					break;
				case 1:
					h = (0.4 + factor * 1.2) % 1.0;
					break;
				case 2:
					h = (0.8 + factor * 1.2) % 1.0;
					break;
				}
				let r, g, b;
				[r, g, b] = hsv2rgb(h, s, v);

				if (r > 0.8)
					r = 1.0;
				if (g > 0.8)
					g = 1.0;
				if (b > 0.8)
					b = 1.0;

				ctx.fillStyle = `rgb(${r * 255},${g * 255},${b * 255})`;

				var x0 = x - size / 2;
				var y0 = y - size / 2;
				var x1 = x0 + size;
				var y1 = y0 + size;
				ctx.beginPath();
				var comp1 = new Complex({re:x0, im:y0});
				comp1 = comp1.mul(comp0);
				ctx.moveTo(qx + comp1.re, qy + comp1.im);
				var comp2 = new Complex({re:x0, im:y1});
				comp2 = comp2.mul(comp0);
				ctx.lineTo(qx + comp2.re, qy + comp2.im);
				var comp3 = new Complex({re:x1, im:y1});
				comp3 = comp3.mul(comp0);
				ctx.lineTo(qx + comp3.re, qy + comp3.im);
				var comp4 = new Complex({re:x1, im:y0});
				comp4 = comp4.mul(comp0);
				ctx.lineTo(qx + comp4.re, qy + comp4.im);
				ctx.fill();

				if (x >= 0)
					nCount = (nCount + 2) % 3;
				else
					++nCount;
			}
			if (y >= 0)
				nCount2 = (nCount2 + 2) % 3;
			else
				++nCount2;
		}

		dxy = (dx >= dy) ? dx : dy;

		var grd = ctx.createRadialGradient(qx, qy, dxy * 0.25, qx, qy, dxy * 0.6);
		grd.addColorStop(0, 'rgba(255, 255, 255, 0.0)');
		grd.addColorStop(1, 'rgba(255, 255, 255, 1.0)');
		ctx.fillStyle = grd;
		circle(ctx, qx, qy, dxy, true);

		ctx.lineWidth = 10;
		var i = 0;
		for (var r = (count2 * 2) % 100; r < cxy; r += 100){
			if (i < 3){
				ctx.strokeStyle = 'rgba(255, 20, 29, 0.9)';
			} else {
				ctx.strokeStyle = 'rgba(255, 20, 29, 0.4)';
			}
			circle(ctx, qx, qy, r, false);
			++i;
		}

		ctx.strokeStyle = '#633';
		if (isLargeDisplay())
			ctx.lineWidth = 16;
		else
			ctx.lineWidth = 8;
		ctx.fillStyle = '#633';
		eye(ctx, qx, qy, cxy / 10, 1.0);
		ctx.fillStyle = '#f66';
		heart(ctx, qx, qy - cxy / 50, qx, qy + cxy / 50);

		var opened = 1.0;
		var f = Math.sin(Math.abs(count2 * 0.1));
		if (f >= 0.8){
			opened = 0.6 + 0.4 * Math.abs(Math.sin(f * Math.PI));
		}

		const N = 4;
		const delta = (2 * Math.PI) / N;
		var radian = factor;
		for (i = 0; i < N; ++i){
			let x = qx + cxy * Math.cos(radian) * 0.3;
			let y = qy + cxy * Math.sin(radian) * 0.3;
			ctx.fillStyle = '#633';
			eye(ctx, x, y, cxy / 10, opened);
			ctx.fillStyle = '#f66';
			heart(ctx, x, y - cxy * opened / 50, x, y + cxy * opened / 50);
			radian += delta;
		}

		ctx.restore();
	}

	function drawType4_5(ctx, px, py, dx, dy, t){
		ctx.save();

		var qx = px + dx / 2;
		var qy = py + dy / 2;
		var dxy = (dx + dy) / 2;

		ctx.beginPath();
		ctx.moveTo(px, py);
		ctx.lineTo(px + dx, py);
		ctx.lineTo(px + dx, py + dy);
		ctx.lineTo(px, py + dy);
		ctx.closePath();
		ctx.clip();

		//ctx.fillStyle = 'white';
		//ctx.fillRect(px, py, dx, dy);

		var count2 = getCount();
		var factor = count2 * 0.16;

		if (isLargeDisplay()){
			qx += 60 * Math.cos(factor * 0.8);
			qy += 60 * Math.sin(factor * 0.8);
		}else{
			qx += 30 * Math.cos(factor * 0.8);
			qy += 30 * Math.sin(factor * 0.8);
		}

		var isLarge = isLargeDisplay();
		for (var radius = isLarge ? ((dx + dy) * 0.2) : ((dx + dy) * 0.4); radius >= 10; radius *= 0.92){
			var r0, g0, b0;
			[r0, g0, b0] = hsv2rgb((dxy + factor * 0.3 - radius * 0.015) % 1.0, 1.0, 1.0);
			ctx.fillStyle = `rgb(${r0*255},${g0*255},${b0*255})`;

			var N0 = 20, N1 = 5;
			var i = 0;
			var oldx = null, oldy = null;
			for (var angle = 0; angle <= 360; angle += 360 / N0){
				var radian = (angle + count2 * 2) * (Math.PI / 180.0);
				var factor2 = radius * (1 + 0.7 * Math.abs(Math.sin(N1 * i * Math.PI / N0)));
				if (isLarge)
					factor2 *= 2;
				var x = qx + factor2 * Math.cos(radian);
				var y = qy + factor2 * Math.sin(radian);
				if (angle == 0){
					ctx.beginPath();
					ctx.moveTo(x, y);
				}else{
					if ((i % 2) == 0){
						ctx.bezierCurveTo(oldx, oldy, (x + oldx) / 2, (y + oldy) / 2, x, y);
					}
				}
				oldx = x;
				oldy = y;
				++i;
			}
			ctx.fill();
		}

		dxy = (dx >= dy) ? dx : dy;

		var grd = ctx.createRadialGradient(qx, qy, dxy * 0.25, qx, qy, dxy * 0.5);
		grd.addColorStop(0, 'rgba(255, 255, 255, 0.0)');
		grd.addColorStop(1, 'rgba(255, 255, 255, 1.0)');
		ctx.fillStyle = grd;
		circle(ctx, qx, qy, dxy, true);

		if (t == 4){
			ctx.fillStyle = `rgb(255, 255, ${(factor * 10) % 255}, 0.8)`;
			let M = 5;
			for (let radius = (factor * 10) % 100; radius < dxy; radius += 100){
				for (let angle = 0; angle < 360; angle += 360 / M){
					let radian = angle * (Math.PI / 180.0);
					let x0 = qx + radius * Math.cos(radian + factor * 0.1 + radius / 100);
					let y0 = qy + radius * Math.sin(radian + factor * 0.1 + radius / 100);
					light(ctx, x0, y0, (radius * 0.1) % 30 + 10);
				}
			}
		} else if (t == 5){
			var value = factor * 25 + 10;
			ctx.fillStyle = `rgb(255,${value % 191},${value % 191})`;
			let M = 5;
			let heartSize = 30;
			for (let radius = (factor * 10) % 100 + 30; radius < dxy; radius += 100){
				for (let angle = 0; angle < 360; angle += 360 / M){
					let radian = angle * (Math.PI / 180.0);
					let x0 = qx + radius * Math.cos(radian + factor * 0.1 + radius / 100);
					let y0 = qy + radius * Math.sin(radian + factor * 0.1 + radius / 100);
					heart(ctx, x0, y0, x0, y0 + heartSize + value % 191 / 12);
				}
				heartSize += 5;
			}
		}

		ctx.restore();
	}

	function drawType6(ctx, px, py, dx, dy, t){
		ctx.save();

		var qx = px + dx / 2;
		var qy = py + dy / 2;
		var dxy = (dx + dy) / 2;

		ctx.beginPath();
		ctx.moveTo(px, py);
		ctx.lineTo(px + dx, py);
		ctx.lineTo(px + dx, py + dy);
		ctx.lineTo(px, py + dy);
		ctx.closePath();
		ctx.clip();

		ctx.fillStyle = '#99F';
		ctx.fillRect(px, py, dx, dy);

		ctx.fillStyle = '#336';
		ctx.strokeStyle = '#ccc';
		ctx.lineWidth = 4;

		let focal = 100;
		let cx = 8000, cy = 600;
		for (let z = 0; z <= 1000; z += 100){
			let w = focal / (focal + z);
			let x0 = -cx * w;
			let x1 = +cx * w;
			let y0 = cy * w;
			ctx.beginPath();
			ctx.moveTo(qx + x0, qy + y0);
			ctx.lineTo(qx + x1, qy + y0);
			ctx.stroke();
		}
		for (let x = -cx; x < cx; x += 400){
			let z0 = 0;
			let z1 = 1000;
			let w0 = focal / (focal + z0);
			let w1 = focal / (focal + z1);
			let x0 = x * w0;
			let x1 = x * w1;
			let y0 = cy * w0;
			let y1 = cy * w1;
			ctx.beginPath();
			ctx.moveTo(qx + x0, qy + y0);
			ctx.lineTo(qx + x1, qy + y1);
			ctx.stroke();
		}

		if (coin.complete){
			ctx.translate(qx - coin.width * 0.5, qy - coin.height * 0.75);

			var count2 = getCount();
			var angle = Math.PI * Math.sin(count2 * 0.1 - 0.05) * 0.078;
			ctx.rotate(angle);

			let ratio = isLargeDisplay() ? 1.4 : 1;
			ctx.drawImage(coin, 0, 0, coin.width * ratio, coin.height * ratio);
		}

		ctx.restore();
	}

	function drawType7(ctx, px, py, dx, dy, t){
		ctx.save();

		var qx = px + dx / 2;
		var qy = py + dy / 2;
		var dxy = (dx + dy) / 2;

		ctx.beginPath();
		ctx.moveTo(px, py);
		ctx.lineTo(px + dx, py);
		ctx.lineTo(px + dx, py + dy);
		ctx.lineTo(px, py + dy);
		ctx.closePath();
		ctx.clip();

		let count2 = getCount();
		if (isLargeDisplay()){
			qx += 60 * Math.cos(count2 * 0.1);
			qy += 60 * Math.sin(count2 * 0.1);
		}else{
			qx += 30 * Math.cos(count2 * 0.1);
			qy += 30 * Math.sin(count2 * 0.1);
		}

		ctx.fillStyle = '#000';
		ctx.fillRect(px, py, dx, dy);

		let factor1 = count2 * 0.13;
		let factor2 = count2 * 0.075;

		let i = 0;
		const delta = dxy * 0.015 + 1;
		for (let radius = (Math.floor(dxy * 0.35 / delta) + 1) * delta; radius > 0; radius -= delta){
			switch (i & 3){
			case 0: ctx.fillStyle = '#f00'; break;
			case 1: ctx.fillStyle = '#ff0'; break;
			case 2: ctx.fillStyle = '#f90'; break;
			case 3: ctx.fillStyle = '#300'; break;
			}
			ctx.beginPath();
			for (let angle = 0; angle <= 360; angle += 5){
				let radian = angle * (Math.PI / 180);
				let zoom = (1.0 * Math.abs(Math.sin(radian * 3)) + Math.cos(factor1) + 2);
				let x = (radius + 2) * Math.cos(radian + factor2) * zoom;
				let y = (radius + 2) * Math.sin(radian + factor2) * zoom;
				if (angle == 0){
					ctx.moveTo(qx + x, qy + y);
				}else{
					ctx.lineTo(qx + x, qy + y);
				}
			}
			ctx.fill();
			++i;
		}

		var grd = ctx.createRadialGradient(qx, qy, 0, qx, qy, dxy * 0.75);
		grd.addColorStop(0, 'rgba(255, 255, 255, 0.0)');
		grd.addColorStop(1, 'rgba(255, 255, 255, 1.0)');
		ctx.fillStyle = grd;
		circle(ctx, qx, qy, dxy, true);

		ctx.restore();
	}

	function drawType(ctx, px, py, cx, cy){
		switch (type){
		case 0:
			drawType0(ctx, px, py, cx, cy);
			break;
		case 1:
			drawType1(ctx, px, py, cx, cy);
			break;
		case 2:
			drawType2(ctx, px, py, cx, cy, true);
			drawType2(ctx, px, py, cx, cy, false);
			break;
		case 3:
			drawType3(ctx, px, py, cx, cy);
			break;
		case 4:
			drawType4_5(ctx, px, py, cx, cy, type);
			break;
		case 5:
			drawType4_5(ctx, px, py, cx, cy, type);
			break;
		case 6:
			drawType6(ctx, px, py, cx, cy, type);
			break;
		case 7:
			drawType7(ctx, px, py, cx, cy, type);
			break;
		}
	}

	function draw(){
		var ctx = document.getElementById('canvas').getContext('2d');

		var x = cx / 2, y = cy / 2, delta_percent = 0;

		if (type == 0 || division == 1){
			drawType(ctx, 0, 0, cx, cy);
			y += cy / 4;
			delta_percent = 25;
		} else if (division == -1){
			if (cx >= cy * 1.75){
				drawType(ctx, 0, 0, cx / 2, cy);
				drawType(ctx, cx / 2, 0, cx / 2, cy);
			}else if (cy >= cx * 1.75){
				drawType(ctx, 0, 0, cx, cy / 2);
				drawType(ctx, 0, cy / 2, cx, cy / 2);
			}else{
				drawType(ctx, 0, 0, cx, cy);
				y += cy / 4;
				delta_percent = 25;
			}
		} else {
			if (cx >= cy){
				drawType(ctx, 0, 0, cx / 2, cy);
				drawType(ctx, cx / 2, 0, cx / 2, cy);
			}else{
				drawType(ctx, 0, 0, cx, cy / 2);
				drawType(ctx, 0, cy / 2, cx, cy / 2);
			}
		}

		if (theText != ''){
			$('#floating-text').removeClass('invisible');
			let top = (50 + 5 * Math.sin(counter * 0.1) + delta_percent) + '%';
			document.getElementById('floating-text').style.top = top;
		}else{
			$('#floating-text').addClass('invisible');
		}

		for (var iStar = 0; iStar < stars.length; ++iStar){
			var star = stars[iStar];
			if (star){
				ctx.fillStyle = `rgb(255, 255, 0, 0.8)`;
				light(ctx, star[0], star[1], star[2]);
				if (star[2] > 1.0){
					star[2] *= 0.98;
				}
			}
		}
		stars.shift();
		stars.push(null);

		if (old_cx !== null && old_cy !== null){
			if (window.innerWidth != old_cx || window.innerHeight != old_cy){
				fit();
			}
		}
		old_cx = window.innerWidth;
		old_cy = window.innerHeight;

		var new_time = (new Date()).getTime();
		var diff = (new_time - old_time) / 1000.0;
		counter += diff * speed;
		old_time = new_time;

		if (speedType == 'irregular'){
			clock += diff;
			if (clock >= speed / 30.0){
				clock = 0;
				const MIN_VALUE = 35.0;
				const MAX_VALUE = 70.0;
				const MIDDLE = (MIN_VALUE + MAX_VALUE) * 0.5;
				if (speed < MIDDLE)
					speed = MIDDLE + (MAX_VALUE - MIDDLE) * Math.random();
				else
					speed = MIN_VALUE + (MIDDLE - MIN_VALUE) * Math.random();
			}
		}

		window.requestAnimationFrame(draw);
	}


	function init(){
		cancelSpeech();
		fitCanvas();

		var saiminText = localStorage.getItem('saiminText');
		if (saiminText){
			setText(saiminText);
		}

		var saiminDivision = localStorage.getItem('saiminDivision');
		if (saiminDivision){
			setDivision(saiminDivision);
		}

		var saiminSoundName = localStorage.getItem('saiminSoundName');
		if (saiminSoundName){
			setSoundName(saiminSoundName);
		}else{
			setSoundName('Magic');
		}

		var saiminTypeSound = localStorage.getItem('saiminTypeSound');
		if (saiminTypeSound){
			setTypeSound(saiminTypeSound);
		}

		var saiminSpeedType = localStorage.getItem('saiminSpeedType');
		if (saiminSpeedType){
			setSpeedType(saiminSpeedType);
		}else{
			setSpeedType('normal');
		}

		$('#text-button').click(function(){
			let text = prompt(TEXT_INPUT_MESSAGE, theText);
			if (text !== null){
				setText(text);
			}
		});

		$('#about-button').click(function(){
			help();
		});

		$('#type-select-button').click(function(){
			apperance();
		});

		$('#sound-button').click(function(){
			if (soundName != ''){
				if (sound){
					let s = new Audio('sn/' + soundName + '.mp3');
					s.play();
				}
			}else{
				config();
			}
		});

		$('#config-button').click(function(){
			config();
		});

		var type_select = document.getElementById('type-select');
		type_select.addEventListener('change', function(){
			if (!ready)
				return;
			setType(parseInt(type_select.value));
		}, false);
		type_select.addEventListener('click', function(){
			if (!ready)
				return;
			setType(parseInt(type_select.value));
		}, false);

		var sound_select = document.getElementById('sound-select');
		sound_select.addEventListener('change', function(){
			if (!ready)
				return;
			setSoundName(sound_select.value, true);
		}, false);
		sound_select.addEventListener('click', function(){
			if (!ready)
				return;
			setSoundName(sound_select.value, true);
		}, false);

		var type_sound_select = document.getElementById('type-sound-select');
		type_sound_select.addEventListener('change', function(){
			if (!ready)
				return;
			setTypeSound(type_sound_select.value, true);
		}, false);
		type_sound_select.addEventListener('click', function(){
			if (!ready)
				return;
			setTypeSound(type_sound_select.value, true);
		}, false);

		var division_select = document.getElementById('division-select');
		division_select.addEventListener('change', function(){
			if (!ready)
				return;
			setDivision(parseInt(division_select.value));
		}, false);
		division_select.addEventListener('click', function(){
			if (!ready)
				return;
			setDivision(parseInt(division_select.value));
		}, false);

		var speed_type_select = document.getElementById('speed-type-select');
		speed_type_select.addEventListener('change', function(){
			if (!ready)
				return;
			setSpeedType(speed_type_select.value);
		}, false);

		function canvasClick(e){
			if (!ready)
				return;
			if (e.shiftKey){
				setType((type + (NUM_TYPE + 1) - 1) % (NUM_TYPE + 1));
			}else{
				setType((type + 1) % (NUM_TYPE + 1));
			}
			type_select.value = type.toString();
			if (typeSound == 1){
				if (kirakira_sound){
					let kirakira = new Audio('sn/kirakira.mp3');
					kirakira.play();
				}
			}
		}

		document.getElementById('floating-text').addEventListener('click', function(e){
			canvasClick(e);
		}, false);

		document.getElementById('canvas').addEventListener('click', function(e){
			canvasClick(e);
		}, false);

		document.getElementById('please-tap-here').addEventListener('click', function(e){
			canvasClick(e);
		}, false);
		document.getElementById('heart-block').addEventListener('click', function(e){
			canvasClick(e);
		}, false);

		document.getElementById('canvas').addEventListener('mousemove', function(e){
			if (!ready)
				return;
			addStar(e.clientX, e.clientY);
		}, false);

		document.getElementById('canvas').addEventListener('touchstart', function(e){
			if (!ready)
				return;
			touchmoving = true;
		}, {passive: true});
		document.getElementById('canvas').addEventListener('touchmove', function(e){
			if (!ready)
				return;
			if (touchmoving){
				var touches = e.touches;
				if (touches && touches.length == 1){
					addStar(touches[0].clientX, touches[0].clientY);
				}
			}
		}, {passive: true});
		document.getElementById('canvas').addEventListener('touchend', function(e){
			if (!ready)
				return;
			touchmoving = false;
		}, {passive: true});
		document.getElementById('canvas').addEventListener('touchcancel', function(e){
			if (!ready)
				return;
			touchmoving = false;
		}, {passive: true});

		document.getElementById('canvas').addEventListener('wheel', function(e){
			e.preventDefault();
			if (!ready)
				return;
			if (e.ctrlKey)
				return;
			if (e.deltaY < 0){
				if (speed < 80.0)
					speed += 5.0;
				else
					speed = 80.0;
			} else if (e.deltaY > 0){
				if (speed > 0.0)
					speed -= 5.0;
				else
					speed = 0.0;
			}
		}, { passive: false });

		if (!DEBUG && !isNativeApp() && !isWebApp()){
			$('#license-expired-dialog').dialog({
				dialogClass: 'no-close',
				title: TEXT_EXPIRED,
				buttons: [
					{
						text: TEXT_OK,
						click: function(){
							$(this).dialog('close');
						},
					},
				],
			});
			return;
		}

		var saiminAdultCheck = localStorage.getItem('saiminAdultCheck');
		if (!saiminAdultCheck){
			doAdultCheck();
		} else if (saiminAdultCheck == '1'){
			accepted();
		} else if (saiminAdultCheck == '-1'){
			forbidden();
		}

		let speech = document.getElementById('speech');
		let speech_label = $('#speech-label');
		speech.addEventListener('click', function(e){
			if (speech.checked){
				playSpeech(theText);
				speech_label.addClass('checked');
			} else {
				cancelSpeech();
				speech_label.removeClass('checked');
			}
		});

		let mic_isInited = false;
		let mic = document.getElementById('microphone');
		let mic_label = $('#microphone-label');
		mic.addEventListener('click', function(e){
			if (mic.checked){
				if (!mic_isInited){
					mic_setup();
					mic_isInited = true;
				}
				mic_connect();
				mic_label.addClass('checked');
			} else {
				mic_disconnect();
				mic_label.removeClass('checked');
			}
		});

		// make kirakira sound quickly playable
		kirakira_sound = new Audio('sn/kirakira.mp3');

		if (localStorage.getItem('saiminHelpShowing')){
			help();
		}else if (localStorage.getItem('saiminAppearanceShowing')){
			apperance();
		}else if (localStorage.getItem('saiminConfigShowing')){
			config();
		}

		// service worker
		if (location.host != '' && 'serviceWorker' in navigator){
			navigator.serviceWorker.register('./sw.js', {scope: './'})
			.then((registration) => {
				theRegistration = registration;
				console.log('Service worker registered');
			});
		}

		window.addEventListener('resize', function(){
			if (location.hostname == '' || isNativeApp() || isWebApp()){
				if (localStorage.getItem('saiminHelpShowing')){
					location.reload();
				}else{
					fit();
				}
			} else {
				location.reload();
			}
		}, false);
	}

	init();
});
