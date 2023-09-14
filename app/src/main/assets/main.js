/* jshint esversion: 8 */

const NUM_TYPE = 9;
const VERSION = '3.4.3';
let DEBUGGING = false;

function AndroidMicrophoneOnReload(){
	localStorage.setItem('AndroidMicrophoneOnReload', '1');
	location.reload();
}

document.addEventListener('DOMContentLoaded', function(){
	let cxScreen = 0, cyScreen = 0;
	let old_cxScreen = null, old_cyScreen = null;
	let old_time = (new Date()).getTime();
	let counter = 0, clock = 0;
	let ready = false;
	let theText = '';
	let division = 1;
	let speed = 45.0;
	let sound = null;
	let soundName = 'Magic';
	let kirakira_sound = null;
	let typeSound = 1;
	let stars = new Array(32);
	let touchmoving = false;
	let theRegistration = null;
	let coin_img = new Image();
	let rotationType = 'normal';
	let stopping = false;
	let released = false;
	let logo_img = new Image();
	let please_tap_here_img = new Image();
	let hypnosis_releasing_img = new Image();
	let all_released_img = new Image();
	let speedIrregular = false;
	let picType = 0;
	let blinking_interval = 0;

	coin_img.src = 'images/coin5yen.png';

	function isNativeApp(){
		return navigator.userAgent.indexOf('/KraKra-native-app/') != -1;
	}

	function getNativeAppVersion(){
		let results = navigator.userAgent.match(/\/KraKra-native-app\/([\d\.]+)\//);
		if(results)
			return results[1];
		return false;
	}

	function mod(x, y){
		return (x*y < 0) * y + x % y;
	}

	function addStar(x, y){
		stars.shift();
		if(isLargeDisplay()){
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
			if(window.speechSynthesis){
				window.speechSynthesis.cancel();
			}
		}
	}

	function setBlinkingType(value){
		value = parseInt(value);
		let text, hz;
		switch(value){
		case 0:
		default:
			text = trans_getText('TEXT_NO_BLINKING');
			hz = 0;
			break;
		case 1:
			hz = 4.0;
			text = "4.0Hz";
			break;
		case 2:
			hz = 5.0;
			text = "5.0Hz";
			break;
		case 3:
			hz = 6.0;
			text = "6.0Hz";
			break;
		case 4:
			hz = 7.0;
			text = "7.0Hz";
			break;
		case 5:
			hz = 8.0;
			text = "8.0Hz";
			break;
		case 6:
			hz = 9.0;
			text = "9.0Hz";
			break;
		case 7:
			hz = 10.0;
			text = "10Hz";
			break;
		}
		blinking_interval = (hz > 0) ? (1.0 / hz) : 0;
		if(blinking_type.value != value.toString())
			blinking_type.value = value.toString();
		blinking_output.innerText = text;
		localStorage.setItem('saiminBlinkType', value);
	}

	function setLanguage(lang){
		if(!lang)
			lang = 'en';

		trans_localize(lang);

		notice_text.scrollLeft = notice_text.scrollTop = 0;

		hypnosis_releasing_img = new Image();
		if(released){
			hypnosis_releasing_img.src = trans_getText('TEXT_HYPNOSIS_RELEASED_IMG');
		}else{
			hypnosis_releasing_img.src = trans_getText('TEXT_KILLING_HYPNOSIS_IMG');
		}

		logo_img = new Image();
		logo_img.src = trans_getText('TEXT_LOGO');

		please_tap_here_img = new Image();
		please_tap_here_img.src = trans_getText('TEXT_TAP_HERE');

		all_released_img = new Image();
		all_released_img.src = trans_getText('TEXT_ALL_RELEASED_IMG');

		language_select.value = lang;

		setBlinkingType(blinking_type.value);
		try{
			android.setLanguage(lang);
		}catch(error){
			;
		}
	}

	function adjustText(text){
		text = text.replace('～', 'ー');
		// {{language-specific}}
		text = text.replace(trans_getText('TEXT_FULLWIDTH_SPACE'), '  ').trim();
		if(text == '')
			return text;
		while (text.slice(-1) == trans_getText('TEXT_PERIOD'))
			text = text.slice(0, -1);
		if(text == '')
			return text;
		text += trans_getText('TEXT_PERIOD_SPACE');
		return text;
	}

	async function playSpeech(text){
		cancelSpeech();
		text = adjustText(text);
		try{
			android.speechLoop(text);
		}catch(error){
			if(window.speechSynthesis){
				text = text.repeat(32);
				let speech = new SpeechSynthesisUtterance(text);
				speech.pitch = 0.6;
				speech.rate = 0.4;
				// {{LANGUAGE_SPECIFIC}}
				if(trans_currentLanguage == 'ja' || trans_currentLanguage == 'ja-JP') // Japanese
					speech.lang = 'ja-JP';
				else if(trans_currentLanguage == 'zh-CN') // Chinese (Simplified)
					speech.lang = 'zh-CN';
				else if(trans_currentLanguage == 'zh-TW') // Chinese (Traditional)
					speech.lang = 'zh-TW';
				else if(trans_currentLanguage == 'ko-KR') // Korean
					speech.lang = 'ko-KR';
				else if(trans_currentLanguage == 'it' || trans_currentLanguage == 'it-IT') // Italian
					speech.lang = 'it-IT';
				else if(trans_currentLanguage == 'de' || trans_currentLanguage == 'de-DE') // German
					speech.lang = 'de-DE';
				else // English is default
					speech.lang = 'en-US';
				window.speechSynthesis.speak(speech);
			}
		}
	}

	function isLargeDisplay(){
		return cxScreen >= 1500 || cyScreen >= 1500;
	}

	let playing = null;

	function setSoundName(value){
		if(value.indexOf('sn') == 0)
			value = '';
		soundName = value;
		if(soundName != ''){
			console.log('sn/' + soundName + '.mp3');
			sound = new Audio('sn/' + soundName + '.mp3');
		}else{
			sound = null;
		}
		sound_select.value = value;
		localStorage.setItem('saiminSoundName', soundName);
	}

	function setTypeSound(value, test = false){
		if(value === true || value == "true")
			value = 1;
		if(value === false || value == "false")
			value = 0;
		typeSound = parseInt(value);
		if(type_sound_select.checked != !!value)
			type_sound_select.checked = !!value;
		localStorage.setItem('saiminTypeSound', value);
		if(test && typeSound == 1 && kirakira_sound){
			kirakira_sound.play();
		}
	}

	function setScreenBrightness(value){
		try{
			android.setBrightness(value);
		}catch(error){
			console.log("android.setBrightness(" + value + ") failed: " + error);
		}
		screen_brightness.value = value;
		localStorage.setItem('saiminScreenBrightness', value);
	}

	function setMessageSizeType(value){
		floating_text1.classList.remove('font_size_small');
		floating_text1.classList.remove('font_size_normal');
		floating_text1.classList.remove('font_size_large');
		floating_text1.classList.remove('font_size_huge');
		floating_text2.classList.remove('font_size_small');
		floating_text2.classList.remove('font_size_normal');
		floating_text2.classList.remove('font_size_large');
		floating_text2.classList.remove('font_size_huge');
		value = value.toString();
		switch (value){
		case 'small':
		case '1':
			floating_text1.classList.add('font_size_small');
			floating_text2.classList.add('font_size_small');
			value = '1';
			break;
		case 'normal':
		case '2':
		default:
			floating_text1.classList.add('font_size_normal');
			floating_text2.classList.add('font_size_normal');
			value = '2';
			break;
		case 'large':
		case '3':
			floating_text1.classList.add('font_size_large');
			floating_text2.classList.add('font_size_large');
			value = '3';
			break;
		case 'huge':
		case '4':
			floating_text1.classList.add('font_size_huge');
			floating_text2.classList.add('font_size_huge');
			value = '4';
			break;
		}
		if(value != message_size_select.value)
			message_size_select.value = value;
		localStorage.setItem('saiminMessageSize', value);
	}

	function setSpeedType(value){
		speedIrregular = false;
		switch (value){
		case 'slow':
			speed = 27.5;
			break;
		case 'normal':
			speed = 45.0;
			break;
		case 'irregular':
			speed = 70.0;
			speedIrregular = true;
			break;
		case 'fast':
			speed = 70.0;
			break;
		default:
			speed = parseFloat(value);
			break;
		}
		if(speed != parseFloat(speed_type_value.value)){
			if(speedIrregular)
				speed_type_value.value = speed;
			else
				speed_type_value.value = speed;
		}
		if(speed_type_value.disabled != speedIrregular){
			speed_type_value.disabled = speedIrregular;
		}
		if(speed_irregular.checked != speedIrregular){
			speed_irregular.checked = speedIrregular;
		}
		localStorage.setItem('saiminSpeedType', speed);
	}

	function setDivision(value){
		value = parseInt(value);
		switch(value){
		case 2:
			division_select.checked = true;
			division = 2;
			break;
		case 1:
		default:
			division_select.checked = false;
			division = 1;
			break;
		}
		localStorage.setItem('saiminDivision', division.toString());
	}

	function getCount(){
		return counter;
	}

	let oldPicType = 0;

	function getPicType(){
		return picType;
	};

	function setPicType(value){
		picType = parseInt(value);
		if(picType == -1){
			cancelSpeech();
			speech_checkbox.checked = false;
			speech_label.classList.remove('checked');
			released = false;
			sound_button.classList.add('releasing');
			text_button.classList.add('releasing');
			speech_label.classList.add('releasing');
			hypnosis_releasing_img.src = trans_getText('TEXT_KILLING_HYPNOSIS_IMG');
			setTimeout(function(){
				hypnosis_releasing_img.src = trans_getText('TEXT_HYPNOSIS_RELEASED_IMG');
				all_released_img.src = trans_getText('TEXT_ALL_RELEASED_IMG');
				released = true;
			}, 3000);
		}else{
			if(oldPicType == -1){
				theText = '';
				speech_checkbox.checked = false;
				speech_label.classList.remove('checked');
				cancelSpeech();
			}
			sound_button.classList.remove('releasing');
			text_button.classList.remove('releasing');
			speech_label.classList.remove('releasing');
		}
		type_select.value = picType.toString();
		type_select_button.innerText = trans_getText('TEXT_PIC') + picType.toString();
		localStorage.setItem('saiminType', picType.toString());
		try{
			android.setPicType(picType);
		}catch(error){
			;
		}
		oldPicType = picType;
	};

	function setText(txt){
		theText = txt.replace(trans_getText('TEXT_FULLWIDTH_SPACE'), '  ').trim();
		localStorage.setItem('saiminText', theText);
		if(speech_checkbox.checked){
			playSpeech(theText);
		}
		floating_text1.innerText = theText;
		floating_text2.innerText = theText;
	}

	function setRotation(value){
		switch(value){
		case 'normal':
		case false:
		default:
			rotation_select.checked = false;
			rotationType = 'normal';
			break;
		case 'counter':
		case true:
			rotation_select.checked = true;
			rotationType = 'counter';
			break;
		}
		localStorage.setItem('saiminRotation', rotationType.toString());
	}

	function fitCanvas(){
		let ctx = saimin_canvas.getContext('2d', { alpha: false });
		cxScreen = ctx.canvas.width = window.innerWidth;
		cyScreen = ctx.canvas.height = window.innerHeight;
	}

	function fit(){
		fitCanvas();
		let position = { my: 'center', at: 'center', of: window };
		if(localStorage.getItem('saiminHelpShowing')){
			$('#about_dialog').dialog('option', 'position', position);
		}else if(localStorage.getItem('saiminAppearanceShowing')){
			$('#appearance_dialog').dialog('option', 'position', position);
		}else if(localStorage.getItem('saiminConfigShowing')){
			$('#config_dialog').dialog('option', 'position', position);
		}
	}

	function updateVersionDisplay(){
		let nativeVersion = getNativeAppVersion();
		let text = version_text.innerText;
		if(nativeVersion){
			text = text.replace('[[VERSION]]', nativeVersion + '(native) / ' + VERSION + '(web)');
		}else{
			text = text.replace('[[VERSION]]', VERSION + '(web)');
		}
		version_text.innerText = text;
	}

	function accepted(){
		localStorage.setItem('saiminAdultCheck3', '1');
		microphone_label.classList.remove('invisible');
		type_select_button.classList.remove('invisible');
		sound_button.classList.remove('invisible');
		speech_label.classList.remove('invisible');
		config_button.classList.remove('invisible');
		about_button.classList.remove('invisible');
		text_button.classList.remove('invisible');
		updateVersionDisplay();
		if(!ready){
			let theType = localStorage.getItem('saiminType');
			if(theType){
				setPicType(theType);
			}else{
				setPicType(0);
			}
			window.requestAnimationFrame(draw_all);
			ready = true;
		}
	}

	function chooseLanguage(){
		let lang = localStorage.getItem('saiminLanguage3');
		let first_time = false;
		if(!lang){
			lang = trans_getDefaultLanguage();
			first_time = true;
		}
		language_select2.value = lang;
		let dialogContainer = $('#choose_language_dialog');
		dialogContainer.dialog({
			dialogClass: 'no-close',
			title: trans_getText('TEXT_CHOOSE_LANGUAGE'),
			buttons: [{
				text: trans_getText('TEXT_OK'),
				click: function(){
					setLanguage(language_select2.value);
					dialogContainer.dialog('close');
					if(first_time)
						help();
				},
			},{
				text: trans_getText('TEXT_CANCEL'),
				click: function(){
					dialogContainer.dialog('close');
					if(first_time && !localStorage.getItem('saiminLanguage3')){
						setLanguage('en');
						help();
					}
				},
			}],
			// Workaround against slowness
			draggable: false,
			resizable: false,
		});
		dialogContainer.keydown(function(e){
			if(e.keyCode == 13){
				$(this).parent().find('button:nth-child(1)').trigger('click');
				return false;
			}
		});
		$('#choose_language_dialog').on('dialogclose', function(event){
			if(first_time && !localStorage.getItem('saiminLanguage3')){
				setLanguage('en');
				help();
			}
		});
	}

	function help(){
		$('#notice_text').width(window.innerWidth * 2 / 3).height(window.innerHeight * 2 / 5);
		setTimeout(function(){
			notice_text.scrollLeft = notice_text.scrollTop = 0;
		}, 200);
		localStorage.setItem('saiminHelpShowing', '1');
		let dialogContainer = $('#about_dialog');
		dialogContainer.dialog({
			dialogClass: 'no-close',
			title: trans_getText('TEXT_ABOUT_APP'),
			buttons: [{
				text: trans_getText('TEXT_INIT_APP'),
				click: function(){
					try{
						android.clearSettings();
					}catch(error){
						;
					}
					localStorage.clear();
					if(theRegistration){
						theRegistration.unregister();
					}
					alert(trans_getText('TEXT_INITTED_APP'));
					location.reload();
				},
			},{
				text: trans_getText('TEXT_OK'),
				click: function(){
					dialogContainer.dialog('close');
					accepted();
				},
			}],
			width: window.innerWidth * 4 / 5,
			// Workaround against slowness
			draggable: false,
			resizable: false,
		});
		dialogContainer.keydown(function(e){
			if(e.keyCode == 13){
				$(this).parent().find('button:nth-child(2)').trigger('click');
				return false;
			}
		});
		dialogContainer.on('dialogclose', function(event){
			localStorage.removeItem('saiminHelpShowing');
			accepted();
		});
	}

	function apperance(){
		let old_type_value = type_select.value;
		let old_division_value = division_select.checked ? 2 : 1;
		let old_speed_type_value = speed_type_value.value;
		let old_rotation_value = rotation_select.checked;
		let old_blinking_value = blinking_type.value;
		localStorage.setItem('saiminAppearanceShowing', '1');
		let dialogContainer = $('#appearance_dialog');
		dialogContainer.dialog({
			dialogClass: 'no-close',
			title: trans_getText('TEXT_APPEARANCE'),
			buttons: [
				{
					text: trans_getText('TEXT_RELEASE_HYPNOSIS'),
					click: function(){
						dialogContainer.dialog('close');
						setPicType(-1);
					},
				},{
					text: trans_getText('TEXT_OK'),
					click: function(){
						dialogContainer.dialog('close');
						if(picType == -1)
							setPicType(picType);
					},
				},{
					text: trans_getText('TEXT_CANCEL'),
					click: function(){
						setPicType(old_type_value);
						setDivision(old_division_value);
						setSpeedType(old_speed_type_value);
						setRotation(old_rotation_value);
						setBlinkingType(old_blinking_value);
						dialogContainer.dialog('close');
					},
				}
			],
			// Workaround against slowness
			draggable: false,
			resizable: false,
		});
		dialogContainer.keydown(function(e){
			if(e.keyCode == 13){
				$(this).parent().find('button:nth-child(2)').trigger('click');
				return false;
			}
		});
		dialogContainer.on('dialogclose', function(event){
			localStorage.removeItem('saiminAppearanceShowing');
		});
	}

	function config(){
		let old_language = localStorage.getItem('saiminLanguage3');
		let old_message_size_value = message_size_select.value;
		let old_sound_value = sound_select.value;
		let old_type_sound_value = type_sound_select.checked;
		let old_screen_brightness = screen_brightness.value;
		localStorage.setItem('saiminConfigShowing', '1');
		let dialogContainer = $('#config_dialog');
		dialogContainer.dialog({
			dialogClass: 'no-close',
			title: trans_getText('TEXT_CONFIGURATION'),
			buttons: [
				{
					text: trans_getText('TEXT_OK'),
					click: function(){
						dialogContainer.dialog('close');
					},
				},{
					text: trans_getText('TEXT_CANCEL'),
					click: function(){
						setLanguage(old_language);
						setMessageSizeType(old_message_size_value);
						setSoundName(old_sound_value);
						setTypeSound(old_type_sound_value);
						setScreenBrightness(old_screen_brightness);
						dialogContainer.dialog('close');
					},
				}
			],
			// Workaround against slowness
			draggable: false,
			resizable: false,
		});
		dialogContainer.keydown(function(e){
			if(e.keyCode == 13){
				$(this).parent().find('button:nth-child(1)').trigger('click');
				return false;
			}
		});
		dialogContainer.on('dialogclose', function(event){
			localStorage.removeItem('saiminConfigShowing');
		});
	}

	function circle(ctx, x, y, radius, is_fill = true){
		ctx.beginPath();
		ctx.arc(x, y, Math.abs(radius), 0, 2 * Math.PI);
		ctx.closePath();
		if(is_fill)
			ctx.fill();
		else
			ctx.stroke();
	}

	function circle2(ctx, x, y, radius, is_fill = true, N = 16){
		ctx.beginPath();
		for (let i = 0; i < N; ++i){
			let x0 = x + radius * Math.cos(2 * Math.PI * i / N);
			let y0 = y + radius * Math.sin(2 * Math.PI * i / N);
			if(i == 0){
				ctx.moveTo(x0, y0);
			}else{
				ctx.lineTo(x0, y0);
			}
		}
		ctx.closePath();
		if(is_fill)
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

	function line2(ctx, x0, y0, x1, y1, lineWidth){
		let dx = x1 - x0, dy = y1 - y0;
		let len = Math.sqrt(dx * dx + dy * dy);
		let ux = dx / len, uy = dy / len;
		let udx = uy * lineWidth / 2, udy = -ux * lineWidth / 2;
		ctx.beginPath();
		ctx.moveTo(x0 - udx, y0 - udy);
		ctx.lineTo(x0 + udx, y0 + udy);
		ctx.lineTo(x1 + udx, y1 + udy);
		ctx.lineTo(x1 - udx, y1 - udy);
		ctx.fill();
		circle2(ctx, x0, y0, lineWidth / 2, true, 15);
	}

	function heart(ctx, x0, y0, x1, y1){
		let x2 = (0.6 * x0 + 0.4 * x1);
		let y2 = (0.6 * y0 + 0.4 * y1);
		let comp = new Complex({re:x1 - x0, im:y1 - y0});
		let comp0 = new Complex({abs:1.0, arg:Math.PI * 0.5});
		let p0 = comp.mul(comp0.div(16)).add({re:x0, im:y0});
		let p1 = comp.div(comp0.mul(16)).add({re:x0, im:y0});
		let p2 = comp.mul(comp0).add({re:x0, im:y0});
		let p3 = comp.div(comp0).add({re:x0, im:y0});
		ctx.beginPath();
		ctx.moveTo(x2, y2);
		ctx.bezierCurveTo(p0.re, p0.im, p2.re, p2.im, x1, y1);
		ctx.bezierCurveTo(p3.re, p3.im, p1.re, p1.im, x2, y2);
		ctx.fill();
	}

	function eye(ctx, x0, y0, r, opened = 1.0, alpha = 1.0){
		ctx.beginPath();
		ctx.moveTo(x0 - r, y0);
		const r025 = r * 0.25;
		const r05 = r025 * 2 * opened;
		ctx.bezierCurveTo(x0 - r025, y0 - r05, x0 + r025, y0 - r05, x0 + r, y0);
		ctx.bezierCurveTo(x0 + r025, y0 + r05, x0 - r025, y0 + r05, x0 - r, y0);
		ctx.closePath();
		if(alpha == 1.0){
			ctx.strokeStyle = "#000";
		}else{
			ctx.strokeStyle = `rgba(0, 0, 0, ${alpha * 100.0}%)`;
		}
		ctx.lineWidth = r * 0.15;
		ctx.stroke();

		if(alpha == 1.0){
			ctx.fillStyle = "#000";
		}else{
			ctx.fillStyle = `rgba(0, 0, 0, ${alpha * 100.0}%)`;
		}
		ctx.save();
		circle(ctx, x0, y0, r / 3 * opened, true);
		ctx.restore();
	}

	function eye2(ctx, x0, y0, r, opened = 1.0){
		ctx.beginPath();
		ctx.moveTo(x0, y0 - r * 1.3);
		const r025 = r * 0.25;
		const r05 = r025 * 2 * opened;
		ctx.bezierCurveTo(x0 - r05, y0 - r025, x0 - r05, y0 + r025, x0, y0 + r * 1.3);
		ctx.bezierCurveTo(x0 + r05, y0 + r025, x0 + r05, y0 - r025, x0, y0 - r * 1.3);
		ctx.closePath();
		ctx.fillStyle = "#faa";
		ctx.fill();
		ctx.strokeStyle = "#c00";
		ctx.lineWidth = r * 0.15;
		ctx.stroke();

		ctx.fillStyle = "#000";
		ctx.save();
		circle(ctx, x0, y0, r / 3 * opened, true);
		ctx.restore();
	}

	function light(ctx, x0, y0, radius){
		let r0 = radius;
		let rmid = radius * 0.333;
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

	function drawSubliminal(ctx, px, py, dx, dy){
		ctx.save();

		ctx.beginPath();
		ctx.moveTo(px, py);
		ctx.lineTo(px + dx, py);
		ctx.lineTo(px + dx, py + dy);
		ctx.lineTo(px, py + dy);
		ctx.closePath();
		ctx.clip();

		let count = getCount();
		let factor1 = Math.sin(count * 0.1);
		let factor2 = Math.abs(Math.cos(count * 0.03));

		ctx.fillStyle = `rgb(${factor2 * 30 + 40}%, 20%, ${40}%)`;
		ctx.fillRect(px, py, dx, dy);

		let mxy = Math.min(dx, dy) * (0.7 + 0.2 * factor1);
		let cx = px + dx / 2;
		let cy = py + dy / 2;

		ctx.fillStyle = '#f03';
		heart(ctx, cx, cy - mxy / 2, cx, cy + mxy / 2);

		ctx.restore();
	}

	// pic-1: Release Hyponosis
	function drawPicMinusOne(ctx, px, py, dx, dy){
		ctx.save();

		ctx.beginPath();
		ctx.moveTo(px, py);
		ctx.lineTo(px + dx, py);
		ctx.lineTo(px + dx, py + dy);
		ctx.lineTo(px, py + dy);
		ctx.closePath();
		ctx.clip();

		let qx = px + dx / 2;
		let qy = py + dy / 2;
		let dxy = (dx + dy) / 2;

		ctx.fillStyle = 'black';
		ctx.fillRect(px, py, dx, dy);

		let count2 = -getCount();
		let factor = 1.2 * Math.abs(Math.sin(count2 * 0.05));

		if(released)
			factor = 1.0;

		let grd = ctx.createRadialGradient(qx, qy, 0, qx, qy, dxy * factor);
		grd.addColorStop(0, 'rgba(255, 255, 0, 1.0)');
		grd.addColorStop(1, 'rgba(255, 255, 255, 1.0)');
		ctx.fillStyle = grd;
		circle(ctx, qx, qy, dxy, true);

		ctx.strokeStyle = "black";
		ctx.lineWidth = 10;
		circle(ctx, qx, qy, (dx + dy + 10) / 5 * factor + dxy * 0.2, false);

		if(hypnosis_releasing_img.complete){
			let x = px + (dx - hypnosis_releasing_img.width) / 2;
			let y = py + (dy - hypnosis_releasing_img.height) / 2 - dy * 0.1;
			ctx.drawImage(hypnosis_releasing_img, x, y);
		}

		if(released && all_released_img.complete){
			let x = px + (dx - all_released_img.width) / 2;
			let y = py + (dy - all_released_img.height) / 2 + dy * 0.2;
			ctx.drawImage(all_released_img, x, y);
		}

		ctx.restore();
	}

	// pic0: Initial Screen
	function drawPic0(ctx, px, py, dx, dy){
		ctx.save();

		ctx.beginPath();
		ctx.moveTo(px, py);
		ctx.lineTo(px + dx, py);
		ctx.lineTo(px + dx, py + dy);
		ctx.lineTo(px, py + dy);
		ctx.closePath();
		ctx.clip();

		let qx = px + dx / 2;
		let qy = py + dy / 2;
		let dxy = (dx + dy) / 2;

		ctx.fillStyle = 'black';
		ctx.fillRect(px, py, dx, dy);

		let grd = ctx.createRadialGradient(qx, qy, 0, qx, qy, dxy * 0.5);
		grd.addColorStop(0, 'rgba(255, 0, 255, 0.0)');
		grd.addColorStop(1, 'rgba(255, 0, 255, 1.0)');
		ctx.fillStyle = grd;
		circle(ctx, qx, qy, dxy, true);

		if(logo_img.complete){
			let x = px + (dx - logo_img.width) / 2;
			let y = py + (dy - logo_img.height) / 2 - dy * 0.1;
			ctx.drawImage(logo_img, x, y);
		}

		if(please_tap_here_img.complete){
			let x = qx - please_tap_here_img.width / 2;
			let y = py + dy * 0.7;
			ctx.drawImage(please_tap_here_img, x, y);
		}

		ctx.restore();
	}

	// pic1: Spiral
	function drawPic1(ctx, px, py, dx, dy){
		ctx.save();

		let qx = px + dx / 2;
		let qy = py + dy / 2;

		ctx.beginPath();
		ctx.moveTo(px, py);
		ctx.lineTo(px + dx, py);
		ctx.lineTo(px + dx, py + dy);
		ctx.lineTo(px, py + dy);
		ctx.closePath();
		ctx.clip();

		ctx.fillStyle = '#f0f';
		ctx.fillRect(px, py, dx, dy);

		let size = (dx + dy) * 2 / 5;
		let count2 = -getCount();
		if(isLargeDisplay()){
			qx += 40 * Math.cos(count2 * 0.15);
			qy += 40 * Math.sin(count2 * 0.15);
		}else{
			qx += 20 * Math.cos(count2 * 0.15);
			qy += 20 * Math.sin(count2 * 0.15);
		}

		let dr0 = 15;
		let dr = dr0 / 2;
		let flag2 = -1;
		let ci = 6;

		ctx.strokeStyle = '#000';
		ctx.lineCap = 'square';

		for (let i = 0; i <= ci; ++i){
			let count = 0;
			let x, y, oldx = qx, oldy = qy, f = 0.5;
			for (let radius = 0; radius < size; radius += f){
				let theta = dr0 * count * 0.375;
				let value = 0.3 * Math.sin(count2 * 0.04) + 0.7;

				let radian = theta * (Math.PI / 180.0) + i * (2 * Math.PI) / ci;
				let comp = new Complex({abs:radius, arg:flag2 * radian - count2 * (Math.PI * 0.03)});
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

	// pic2: Concentric Circles
	function drawPic2(ctx, px, py, dx, dy, flag=true){
		ctx.save();

		let qx = px + dx / 2;
		let qy = py + dy / 2;
		let dxy = (dx + dy) / 2;

		let count2 = getCount();
		let factor = (0.99 + Math.abs(Math.sin(count2 * 0.2)) * 0.01);

		ctx.beginPath();
		if(flag){
			ctx.moveTo(px, py);
			ctx.lineTo(px + dx, py);
			ctx.lineTo(px + dx, py + dy);
			ctx.lineTo(px, py + dy);
		}else{
			let value = 0.2 + 0.2 * Math.abs(Math.sin(count2 * 0.02));
			ctx.arc(qx, qy, Math.abs(dxy) * value, 0, 2 * Math.PI);
		}
		ctx.closePath();
		ctx.clip();

		ctx.fillStyle = '#fff';
		ctx.fillRect(px, py, dx, dy);

		let size = (dx + dy) * 0.4;

		let dr0 = 30;
		if(isLargeDisplay()){
			dr0 *= 2;
			count2 *= 2;
			ctx.lineWidth = 30;
		}else{
			ctx.lineWidth = 15;
		}
		let dr = dr0 / 2 * factor;
		let radius = mod(count2 * 4, dr0);
		if(flag)
			radius = dr0 - radius;

		for (; radius < size; radius += dr0){
			circle(ctx, qx, qy, radius, false);
		}

		ctx.restore();
	}

	function hsv2rgb(h, s, v){
		let r, g, b;
		r = g = b = v;
		if(s > 0)
		{
			h *= 6;
			let i = Math.floor(h);
			let f = h - i;
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

	// pic3: The Eyes
	function drawPic3(ctx, px, py, dx, dy){
		ctx.save();

		let qx = px + dx / 2;
		let qy = py + dy / 2;
		let dxy = (dx + dy) / 2;

		ctx.beginPath();
		ctx.moveTo(px, py);
		ctx.lineTo(px + dx, py);
		ctx.lineTo(px + dx, py + dy);
		ctx.lineTo(px, py + dy);
		ctx.closePath();
		ctx.clip();

		ctx.fillStyle = 'white';
		ctx.fillRect(px, py, dx, dy);

		let count2 = getCount();
		let factor = count2 * 0.03;

		let cxy = ((dx >= dy) ? dy : dx) * 1.2;
		const colors = ['#f0f', '#ff0', '#0f0', '#0ff', '#00c', '#f0f'];

		let k = factor * 5;
		let r_delta = 30;
		let flag = (factor % 10) / 0.5;
		let flag2 = Math.sin(factor * 0.7) > -0.4;
		for (let r = 0; r < 360;){
			let radian = r * Math.PI / 180 + factor;
			ctx.beginPath();
			ctx.moveTo(qx, qy);
			let x0 = qx + cxy * Math.cos(radian);
			let y0 = qy + cxy * Math.sin(radian);
			ctx.lineTo(x0, y0);
			r += r_delta;
			radian = r * Math.PI / 180 + factor;
			let x1 = qx + cxy * Math.cos(radian);
			let y1 = qy + cxy * Math.sin(radian);
			ctx.lineTo(x1, y1);
			let factor2 = Math.abs(1 - Math.sin(factor * 8));
			if(flag2){
				ctx.fillStyle = `rgb(255, ${factor2 * 50 + 55}, ${factor2 * 200 + 55})`;
			}else{
				ctx.fillStyle = `hsl(${(k * 60) % 360}, 100%, 50%)`
			}
			ctx.fill();
			++k;
		}
		k = factor * 5;
		for (let r = 0; r < 360;){
			let radian = r * Math.PI / 180 + factor;
			let x0 = qx + cxy * Math.cos(radian);
			let y0 = qy + cxy * Math.sin(radian);
			let factor2 = Math.abs(1 - Math.sin(factor * 8));
			ctx.beginPath();
			ctx.moveTo(qx, qy);
			ctx.lineTo(x0, y0);
			ctx.strokeStyle = `rgb(255, 200, ${factor2 * 192}`;
			ctx.lineWidth = 10;
			ctx.stroke();
			r += r_delta / 2;
			++k;
		}

		dxy = (dx >= dy) ? dx : dy;

		ctx.lineWidth = 10;
		let i = 0;
		ctx.strokeStyle = 'rgba(255, 0, 0, 50%)';
		for (let r = mod(count2 * 2, 100); r < cxy; r += 100){
			circle(ctx, qx, qy, r, false);
			++i;
		}

		let opened = 1.0;
		let f = Math.sin(Math.abs(count2 * 0.1));
		if(f >= 0.8){
			opened = 0.6 + 0.4 * Math.abs(Math.sin(f * Math.PI));
		}

		let factor3 = (0.3 + Math.sin(count2 * 0.05) * 0.3);
		eye2(ctx, qx, qy, cxy / 8, (1.0 + factor3));
		ctx.fillStyle = '#f00';
		factor3 = 0.5 + Math.abs(factor3);
		heart(ctx, qx, qy - cxy / 25 * factor3, qx, qy + cxy / 25 * factor3);

		const N = 4;
		const delta = (2 * Math.PI) / N;
		let radian = factor * 1.3;
		for (i = 0; i < N; ++i){
			let x, y;

			x = qx + cxy * Math.cos(radian + 0.4) * 0.3;
			y = qy + cxy * Math.sin(radian + 0.4) * 0.3;
			eye(ctx, x, y, cxy / 10, opened, 0.25);

			x = qx + cxy * Math.cos(radian + 0.2) * 0.3;
			y = qy + cxy * Math.sin(radian + 0.2) * 0.3;
			eye(ctx, x, y, cxy / 10, opened, 0.65);

			x = qx + cxy * Math.cos(radian) * 0.3;
			y = qy + cxy * Math.sin(radian) * 0.3;
			eye(ctx, x, y, cxy / 10, opened);

			ctx.fillStyle = '#f00';
			heart(ctx, x, y - cxy * opened / 50, x, y + cxy * opened / 50);

			radian += delta;
		}

		let grd = ctx.createRadialGradient(qx, qy, dxy * 0.25, qx, qy, dxy * 0.5);
		grd.addColorStop(0, 'rgba(255, 255, 255, 0.0)');
		grd.addColorStop(1, 'rgba(255, 255, 0, 0.8)');
		ctx.fillStyle = grd;
		circle(ctx, qx, qy, dxy, true);

		ctx.restore();
	}

	// pic4: Black and White Spiral
	function drawPic4(ctx, px, py, dx, dy){
		ctx.save();

		let qx = px + dx / 2;
		let qy = py + dy / 2;
		let dxy = (dx + dy) / 2;

		ctx.beginPath();
		ctx.moveTo(px, py);
		ctx.lineTo(px + dx, py);
		ctx.lineTo(px + dx, py + dy);
		ctx.lineTo(px, py + dy);
		ctx.closePath();
		ctx.clip();

		ctx.fillStyle = 'black';
		ctx.fillRect(px, py, dx, dy);

		let factor = getCount() * 0.4;

		let radius = 1;
		ctx.fillStyle = '#fff';
		for (let radian = 0; radian < 120;){
			const radian2 = radian - factor;
			const x0 = qx + radius * Math.cos(-radian2);
			const y0 = qy + radius * Math.sin(-radian2);
			radius *= 1.009;
			radian += 0.08;
			const radian3 = radian - factor;
			const x1 = qx + radius * Math.cos(-radian3);
			const y1 = qy + radius * Math.sin(-radian3);
			line2(ctx, x0, y0, x1, y1, radius * 0.325);
		}

		ctx.restore();
	}

	// pic5: Spreading Rainbow
	function drawPic5(ctx, px, py, dx, dy){
		ctx.save();

		let qx = px + dx / 2;
		let qy = py + dy / 2;
		let dxy = (dx + dy) / 2;

		ctx.beginPath();
		ctx.moveTo(px, py);
		ctx.lineTo(px + dx, py);
		ctx.lineTo(px + dx, py + dy);
		ctx.lineTo(px, py + dy);
		ctx.closePath();
		ctx.clip();

		//ctx.fillStyle = 'white';
		//ctx.fillRect(px, py, dx, dy);

		let count2 = getCount();
		let factor = count2 * 0.16;

		if(isLargeDisplay()){
			qx += 60 * Math.cos(factor * 0.8);
			qy += 60 * Math.sin(factor * 0.8);
		}else{
			qx += 30 * Math.cos(factor * 0.8);
			qy += 30 * Math.sin(factor * 0.8);
		}

		let isLarge = isLargeDisplay();
		for (let radius = isLarge ? ((dx + dy) * 0.2) : ((dx + dy) * 0.4); radius >= 10; radius *= 0.92){
			let r0, g0, b0;
			[r0, g0, b0] = hsv2rgb((dxy + factor * 0.3 - radius * 0.015) % 1.0, 1.0, 1.0);
			ctx.fillStyle = `rgb(${r0*255},${g0*255},${b0*255})`;

			let N0 = 20, N1 = 5;
			let i = 0;
			let oldx = null, oldy = null;
			for (let angle = 0; angle <= 360; angle += 360 / N0){
				let radian = (angle + count2 * 2) * (Math.PI / 180.0);
				let factor2 = radius * (1 + 0.7 * Math.abs(Math.sin(N1 * i * Math.PI / N0)));
				if(isLarge)
					factor2 *= 2;
				let x = qx + factor2 * Math.cos(radian);
				let y = qy + factor2 * Math.sin(radian);
				if(angle == 0){
					ctx.beginPath();
					ctx.moveTo(x, y);
				}else{
					if((i % 2) == 0){
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

		let grd = ctx.createRadialGradient(qx, qy, dxy * 0.25, qx, qy, dxy * 0.5);
		grd.addColorStop(0, 'rgba(255, 255, 255, 0.0)');
		grd.addColorStop(1, 'rgba(255, 255, 255, 0.7)');
		ctx.fillStyle = grd;
		circle(ctx, qx, qy, dxy, true);

		let value = factor * 25 + 10;
		let value2 = mod(value, 191);
		ctx.fillStyle = `rgb(255,${value2},${value2})`;
		let M = 5;
		let heartSize = 30;
		for (let radius = mod((factor * 10), 100) + 30; radius < dxy; radius += 100){
			for (let angle = 0; angle < 360; angle += 360 / M){
				let radian = angle * (Math.PI / 180.0);
				let x0 = qx + radius * Math.cos(radian + factor * 0.1 + radius / 100);
				let y0 = qy + radius * Math.sin(radian + factor * 0.1 + radius / 100);
				heart(ctx, x0, y0, x0, y0 + heartSize + mod(value, 191) / 12);
			}
			heartSize += 5;
		}

		ctx.restore();
	}

	// pic6: 5-yen coin
	function drawPic6(ctx, px, py, dx, dy){
		ctx.save();

		let qx = px + dx / 2;
		let qy = py + dy / 2;
		let dxy = (dx + dy) / 2;

		ctx.beginPath();
		ctx.moveTo(px, py);
		ctx.lineTo(px + dx, py);
		ctx.lineTo(px + dx, py + dy);
		ctx.lineTo(px, py + dy);
		ctx.closePath();
		ctx.clip();

		let count2 = getCount();
		const value = Math.sin(count2 * 0.05);
		ctx.fillStyle = `rgb(${value * 30 + 40}, ${value * 30 + 40}, ${value * 25 + 150})`
		ctx.fillRect(px, py, dx, dy);

		for (let k = dxy; k > 0; k -= 160){
			const delta = 10000 / k;
			for (let i = 0; i < 360; i += delta){
				let x = qx + k * Math.cos(count2 / 200 + i * (Math.PI / 180));
				let y = qy + k * Math.sin(count2 / 200 + i * (Math.PI / 180));
				x += k * Math.cos(i) * 0.2;
				y += k * Math.sin(i) * 0.2;
				ctx.fillStyle = `rgba(${255 - i % 255}, 91, ${i % 255}, 0.75)`;
				circle(ctx, x, y, i % 3 + 1);
			}
		}

		do {
			ctx.strokeStyle = `rgb(90, 80, 100)`;
			let r = dxy * 0.5;
			let r2 = r * 0.05;
			let x = qx + r * Math.cos(count2 * 0.01);
			let y = qy + r * Math.sin(count2 * 0.01);
			let x0 = x + r2 * Math.cos(count2 / 20);
			let y0 = y + r2 * Math.sin(count2 / 20);
			let x1 = x + r2 * Math.cos(count2 / 20 + Math.PI * 0.25);
			let y1 = y + r2 * Math.sin(count2 / 20 + Math.PI * 0.25);
			line(ctx, x0, y0, x1, y1, 5);
		}while(0);

		const focal = 100;
		function perspective(x, y, z){
			let w = focal / (focal + z);
			return [x * w, y * w];
		}

		const y = 600, cx = 8000;
		const deltax = 300, deltaz = 100;
		let iz = 0;
		for (let z = 0; z <= 900; z += deltaz){
			let ix = 0;
			for (let x = -cx; x < cx; x += deltax){
				const [x0, y0] = perspective(x, y, z);
				const [x1, y1] = perspective(x + deltax, y, z);
				const [x2, y2] = perspective(x + deltax, y, z + deltaz);
				const [x3, y3] = perspective(x, y, z + deltaz);
				ctx.beginPath();
				ctx.moveTo(qx + x0, qy + y0);
				ctx.lineTo(qx + x1, qy + y1);
				ctx.lineTo(qx + x2, qy + y2);
				ctx.lineTo(qx + x3, qy + y3);
				ctx.fillStyle = ((ix + iz) & 1) ? '#333' : '#666';
				ctx.fill();
				++ix;
			}
			++iz;
		}

		if(coin_img.complete){
			ctx.translate(qx - coin_img.width * 0.5, qy - coin_img.height * 0.75);

			let angle = Math.PI * Math.sin(count2 * 0.1 - 0.05) * 0.078;
			ctx.rotate(angle);

			let ratio = isLargeDisplay() ? 1.4 : 1;
			ctx.drawImage(coin_img, 0, 0, coin_img.width * ratio, coin_img.height * ratio);
		}

		ctx.restore();
	}

	// pic7: Clamor Clamor
	function drawPic7(ctx, px, py, dx, dy){
		ctx.save();

		let qx = px + dx / 2;
		let qy = py + dy / 2;
		let dxy = (dx + dy) / 2;

		ctx.beginPath();
		ctx.moveTo(px, py);
		ctx.lineTo(px + dx, py);
		ctx.lineTo(px + dx, py + dy);
		ctx.lineTo(px, py + dy);
		ctx.closePath();
		ctx.clip();

		let count2 = getCount();
		if(isLargeDisplay()){
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
				if(angle == 0){
					ctx.moveTo(qx + x, qy + y);
				}else{
					ctx.lineTo(qx + x, qy + y);
				}
			}
			ctx.fill();
			++i;
		}

		let grd = ctx.createRadialGradient(qx, qy, 0, qx, qy, dxy * 0.75);
		grd.addColorStop(0, 'rgba(255, 255, 255, 0.0)');
		grd.addColorStop(1, 'rgba(255, 255, 255, 1.0)');
		ctx.fillStyle = grd;
		circle(ctx, qx, qy, dxy, true);

		ctx.restore();
	}

	// pic8: Crazy Colors
	function drawPic8(ctx, px, py, dx, dy){
		ctx.save();

		let qx = px + dx / 2;
		let qy = py + dy / 2;
		let dxy = (dx + dy) / 2;

		ctx.beginPath();
		ctx.moveTo(px, py);
		ctx.lineTo(px + dx, py);
		ctx.lineTo(px + dx, py + dy);
		ctx.lineTo(px, py + dy);
		ctx.closePath();
		ctx.clip();

		ctx.fillStyle = '#000';
		ctx.fillRect(px, py, dx, dy);

		let count2 = getCount();
		if(isLargeDisplay()){
			qx += 40 * Math.cos(count2 * 0.08);
			qy += 40 * Math.sin(count2 * 0.08);
		}else{
			qx += 20 * Math.cos(count2 * 0.08);
			qy += 20 * Math.sin(count2 * 0.08);
		}

		const rotation = 8, width = dxy * 0.1;
		let calc_point = function(radius, radian){
			let x = qx + radius * Math.cos(radian);
			let y = qy + radius * Math.sin(radian);
			return [x, y];
		}
		const colors = ['#f00', '#ff0', '#0f0', '#0ff', '#00c', '#f0f'];
		const factor = count2 * 0.5;
		for (let radian0 = -4.5; radian0 < rotation * 2 * Math.PI; radian0 += 0.12){
			const radian1 = radian0 + 0.15;
			const radius0 = width * radian0 / (2 * Math.PI);
			const radius1 = radius0 + width * 1.03;
			const [x0, y0] = calc_point(radius0, radian0 - factor);
			const [x1, y1] = calc_point(radius1, radian0 - factor);
			const [x2, y2] = calc_point(radius1, radian1 - factor);
			const [x3, y3] = calc_point(radius0, radian1 - factor);
			let g = ctx.createLinearGradient(x0, y0, x1, y1);
			g.addColorStop(0 / 7, colors[0]);
			g.addColorStop(1 / 7, colors[1]);
			g.addColorStop(2 / 7, colors[2]);
			g.addColorStop(3 / 7, colors[3]);
			g.addColorStop(4 / 7, colors[4]);
			g.addColorStop(5 / 7, colors[5]);
			g.addColorStop(6 / 7, colors[0]);
			ctx.fillStyle = g;
			ctx.beginPath();
			ctx.lineTo(x0, y0);
			ctx.lineTo(x1, y1);
			ctx.lineTo(x2, y2);
			ctx.lineTo(x3, y3);
			ctx.fill();
		}

		ctx.restore();
	}

	// pic9: Mixed Spirals
	function drawPic9(ctx, px, py, dx, dy){
		ctx.save();

		let qx = px + dx / 2;
		let qy = py + dy / 2;
		let dxy = (dx + dy) / 2;

		let count2 = getCount();
		let sx = qx + dxy * Math.cos(count2 * 0.01) * 0.0015;
		let sy = qy + dxy * Math.sin(count2 * 0.01) * 0.0015;
		let tx = qx + dxy * Math.cos(count2 * 0.01) * 0.0025;
		let ty = qy + dxy * Math.sin(count2 * 0.01) * 0.0025;
		let delta1 = dxy / 8;
		ctx.beginPath();
		for (let i = 0; i < dxy; i += 2 * delta1){
			ctx.arc(sx, sy, i, 0, Math.PI * 2, false);
			ctx.arc(sx, sy, i + delta1, 0, Math.PI * 2, true);
		}
		ctx.clip();

		let ratio = 0.01;

		counter = -counter * 0.8;
		drawPic1(ctx, px, py, dx, dy);
		counter = -counter / 0.8;

		ctx.restore();
		ctx.save();

		ctx.beginPath();
		for (let i = delta1; i < dxy; i += 2 * delta1){
			ctx.arc(tx, ty, i, 0, Math.PI * 2, false);
			ctx.arc(tx, ty, i + delta1, 0, Math.PI * 2, true);
		}
		ctx.clip();

		counter *= 0.8;
		drawPic1(ctx, px, py, dx, dy);
		counter /= 0.8;

		ctx.restore();
	}

	function drawPic(ctx, px, py, dx, dy){
		switch (picType){
		case -1:
			drawPicMinusOne(ctx, px, py, dx, dy);
			break;
		case 0:
			drawPic0(ctx, px, py, dx, dy);
			break;
		case 1:
			drawPic1(ctx, px, py, dx, dy);
			break;
		case 2:
			drawPic2(ctx, px, py, dx, dy, true);
			drawPic2(ctx, px, py, dx, dy, false);
			break;
		case 3:
			drawPic3(ctx, px, py, dx, dy);
			break;
		case 4:
			drawPic4(ctx, px, py, dx, dy);
			break;
		case 5:
			drawPic5(ctx, px, py, dx, dy);
			break;
		case 6:
			drawPic6(ctx, px, py, dx, dy);
			break;
		case 7:
			drawPic7(ctx, px, py, dx, dy);
			break;
		case 8:
			drawPic8(ctx, px, py, dx, dy);
			break;
		case 9:
			drawPic9(ctx, px, py, dx, dy);
			break;
		}
	}

	function drawPicBlur(ctx, px, py, dx, dy){
		if(blinking_interval != 0 && picType != -1){
			if(mod(old_time / 1000, blinking_interval) < (blinking_interval * 0.3)){
				drawSubliminal(ctx, px, py, dx, dy);
				return;
			}
		}
		switch (picType){
		case 8:
		case 9:
			let ratio = 0.5;
			blurring_canvas.width = dx * ratio;
			blurring_canvas.height = dy * ratio;
			let ctx2 = blurring_canvas.getContext('2d', { alpha: false });
			drawPic(ctx2, 0, 0, dx * ratio, dy * ratio);
			ctx.drawImage(blurring_canvas, 0, 0, dx * ratio, dy * ratio, px, py, dx, dy);
			break;
		default:
			drawPic(ctx, px, py, dx, dy);
			break;
		}
	}

	function setTextPos(id, px, py, dx, dy, counter){
		let x = px + dx / 2 - id.clientWidth / 2;
		let y = py + dy * 0.7 - id.clientHeight / 2 + (1 + 0.4 * Math.sin(counter * 0.1)) * dy * 0.1;
		id.style.left = x + 'px';
		id.style.top = y + 'px';
	}

	let FPS = 0;

	function draw_all(){
		let ctx = saimin_canvas.getContext('2d', { alpha: false });

		let cx = cxScreen, cy = cyScreen;
		let x = cxScreen / 2, y = cyScreen / 2;

		let splitted = false;
		if(division == 1){
			drawPicBlur(ctx, 0, 0, cx, cy);
			setTextPos(floating_text1, 0, 0, cx, cy, counter);
			y += cy / 4;
		}else if(division == -1){
			if(cx >= cy * 1.75){
				drawPicBlur(ctx, 0, 0, cx / 2, cy);
				//drawPicBlur(ctx, cx / 2, 0, cx / 2, cy);
				ctx.drawImage(saimin_canvas, 0, 0, cx / 2, cy, cx / 2, 0, cx / 2, cy);
				setTextPos(floating_text1, 0, 0, cx / 2, cy, counter);
				setTextPos(floating_text2, cx / 2, 0, cx / 2, cy, counter);
				splitted = true;
			}else if(cy >= cx * 1.75){
				drawPicBlur(ctx, 0, 0, cx, cy / 2);
				//drawPicBlur(ctx, 0, cy / 2, cx, cy / 2);
				ctx.drawImage(saimin_canvas, 0, 0, cx, cy / 2, 0, cy / 2, cx, cy / 2);
				setTextPos(floating_text1, 0, 0, cx, cy / 2, counter);
				setTextPos(floating_text2, 0, cy / 2, cx, cy / 2, counter);
				splitted = true;
			}else{
				drawPicBlur(ctx, 0, 0, cx, cy);
				setTextPos(floating_text1, 0, 0, cx, cy, counter);
				y += cy / 4;
			}
		}else{
			if(cx >= cy){
				drawPicBlur(ctx, 0, 0, cx / 2, cy);
				//drawPicBlur(ctx, cx / 2, 0, cx / 2, cy);
				ctx.drawImage(saimin_canvas, 0, 0, cx / 2, cy, cx / 2, 0, cx / 2, cy);
				setTextPos(floating_text1, 0, 0, cx / 2, cy, counter);
				setTextPos(floating_text2, cx / 2, 0, cx / 2, cy, counter);
			}else{
				drawPicBlur(ctx, 0, 0, cx, cy / 2);
				//drawPicBlur(ctx, 0, cy / 2, cx, cy / 2);
				ctx.drawImage(saimin_canvas, 0, 0, cx, cy / 2, 0, cy / 2, cx, cy / 2);
				setTextPos(floating_text1, 0, 0, cx, cy / 2, counter);
				setTextPos(floating_text2, 0, cy / 2, cx, cy / 2, counter);
			}
			splitted = true;
		}

		if(picType == -1){
			floating_text1.classList.add('invisible');
			floating_text2.classList.add('invisible');
		}else if(theText != ''){
			if(splitted){
				floating_text1.classList.remove('invisible');
				floating_text2.classList.remove('invisible');
			}else{
				floating_text1.classList.remove('invisible');
				floating_text2.classList.add('invisible');
			}
		}else{
			floating_text1.classList.add('invisible');
			floating_text2.classList.add('invisible');
		}

		for (let iStar = 0; iStar < stars.length; ++iStar){
			let star = stars[iStar];
			if(star){
				ctx.fillStyle = `rgb(255, 255, 0, 0.8)`;
				light(ctx, star[0], star[1], star[2]);
				if(star[2] > 1.0){
					star[2] *= 0.98;
				}
			}
		}
		stars.shift();
		stars.push(null);

		if(old_cxScreen !== null && old_cyScreen !== null){
			if(window.innerWidth != old_cxScreen || window.innerHeight != old_cyScreen){
				fit();
			}
		}
		old_cxScreen = window.innerWidth;
		old_cyScreen = window.innerHeight;

		let new_time = (new Date()).getTime();
		let diff = (new_time - old_time) / 1000.0;
		if(rotationType == 'counter')
			diff = -diff;
		if(stopping)
			diff = 0;
		counter += diff * speed;
		old_time = new_time;

		if(speedIrregular){
			clock += diff;
			if(clock >= speed / 30.0){
				clock = 0;
				const MIN_VALUE = 35.0;
				const MAX_VALUE = 70.0;
				const MIDDLE = (MIN_VALUE + MAX_VALUE) * 0.5;
				if(speed < MIDDLE)
					speed = MIDDLE + (MAX_VALUE - MIDDLE) * Math.random();
				else
					speed = MIN_VALUE + (MIDDLE - MIN_VALUE) * Math.random();
			}
		}

		if(DEBUGGING){
			if(diff != 0){
				FPS = 1 / Math.abs(diff);
				FPS = Math.round(FPS * 10) / 10;
			}
			let text = Math.round(FPS).toString() + '.' + (FPS * 10 % 10).toString();
			ctx.font = '32px san-serif';
			let measure = ctx.measureText(text);
			let width = measure.width;
			let height = measure.actualBoundingBoxAscent + measure.actualBoundingBoxDescent;
			ctx.fillStyle = "red";
			ctx.fillText(text, (cxScreen - width) / 2, height);
		}

		window.requestAnimationFrame(draw_all);
	}

	function main(){
		const argc = arguments.length, argv = arguments;

		cancelSpeech();
		fitCanvas();

		let saiminText = localStorage.getItem('saiminText');
		if(saiminText){
			setText(saiminText);
		}

		let saiminDivision = localStorage.getItem('saiminDivision');
		if(saiminDivision){
			setDivision(saiminDivision);
		}

		let saiminSoundName = localStorage.getItem('saiminSoundName');
		if(saiminSoundName){
			setSoundName(saiminSoundName);
		}else{
			setSoundName('Magic');
		}

		let saiminTypeSound = localStorage.getItem('saiminTypeSound');
		if(saiminTypeSound){
			setTypeSound(saiminTypeSound);
		}

		let saiminSpeedType = localStorage.getItem('saiminSpeedType');
		if(saiminSpeedType){
			setSpeedType(saiminSpeedType);
		}else{
			setSpeedType('normal');
		}

		let saiminBlinkType = localStorage.getItem('saiminBlinkType');
		if(saiminBlinkType){
			setBlinkingType(saiminBlinkType);
		}else{
			setBlinkingType(0);
		}

		let saiminRotation = localStorage.getItem('saiminRotation');
		if(saiminRotation){
			setRotation(saiminRotation);
		}else{
			setRotation('normal');
		}

		let saiminMessageSize = localStorage.getItem('saiminMessageSize');
		if(saiminMessageSize){
			setMessageSizeType(saiminMessageSize);
		}else{
			setMessageSizeType('normal');
		}

		let saiminScreenBrightness = localStorage.getItem('saiminScreenBrightness');
		if(saiminScreenBrightness){
			setScreenBrightness(saiminScreenBrightness);
		}else{
			setScreenBrightness('normal');
		}

		text_button.addEventListener('click', function(){
			if(picType == -1)
				return;
			let text = prompt(trans_getText('TEXT_INPUT_MESSAGE'), theText);
			if(text !== null){
				setText(text);
			}
		});

		about_button.addEventListener('click', function(){
			help();
		});

		type_select_button.addEventListener('click', function(e){
			e.preventDefault();
			apperance();
		});

		sound_button.addEventListener('click', function(){
			if(picType == -1){
				let releasing_sound = null;
				let lang = localStorage.getItem('saiminLanguage3');
				releasing_sound = new Audio(trans_getText('TEXT_MP3_RELEASED_HYPNOSIS'));
				releasing_sound.play();
				return;
			}
			if(soundName != ''){
				if(sound){
					let s = new Audio('sn/' + soundName + '.mp3');
					s.play();
				}
			}else{
				config();
			}
		});

		config_button.addEventListener('click', function(){
			config();
		});

		type_select.addEventListener('change', function(){
			if(!ready)
				return;
			setPicType(parseInt(type_select.value));
		}, false);
		type_select.addEventListener('click', function(){
			if(!ready)
				return;
			setPicType(parseInt(type_select.value));
		}, false);

		language_select.addEventListener('change', function(){
			if(!ready)
				return;
			setLanguage(language_select.value);
		}, false);

		message_size_select.addEventListener('input', function(){
			if(!ready)
				return;
			setMessageSizeType(message_size_select.value, true);
		}, false);

		screen_brightness.addEventListener('change', function(){
			if(!ready)
				return;
			setScreenBrightness(screen_brightness.value, true);
		}, false);

		sound_select.addEventListener('change', function(){
			if(!ready)
				return;
			setSoundName(sound_select.value);
		}, false);
		sound_select.addEventListener('click', function(){
			if(!ready)
				return;
			setSoundName(sound_select.value);
		}, false);
		config_play_button.addEventListener('click', function(){
			if(!ready)
				return;
			if(soundName != '' && sound){
				let s = new Audio('sn/' + soundName + '.mp3');
				s.play();
			}
		}, false);

		type_sound_select.addEventListener('change', function(){
			if(!ready)
				return;
			setTypeSound(type_sound_select.checked, true);
		}, false);
		type_sound_select.addEventListener('click', function(){
			if(!ready)
				return;
			setTypeSound(type_sound_select.checked, true);
		}, false);

		division_select.addEventListener('change', function(){
			if(!ready)
				return;
			setDivision(division_select.checked ? 2 : 1);
		}, false);
		division_select.addEventListener('click', function(){
			if(!ready)
				return;
			setDivision(division_select.checked ? 2 : 1);
		}, false);

		speed_type_value.addEventListener('input', function(){
			if(!ready)
				return;
			setSpeedType(speed_type_value.value);
		}, false);

		speed_irregular.addEventListener('change', function(){
			if(!ready)
				return;
			if(speed_irregular.checked){
				setSpeedType('irregular');
			}else{
				setSpeedType('normal');
			}
		}, false);

		rotation_select.addEventListener('change', function(){
			if(!ready)
				return;
			setRotation(rotation_select.checked);
		}, false);

		blinking_type.addEventListener('input', function(){
			if(!ready)
				return;
			setBlinkingType(blinking_type.value);
		}, false);

		function canvasClick(e){
			if(!ready)
				return;
			if(e.shiftKey){
				setPicType((picType + (NUM_TYPE + 1) - 1) % (NUM_TYPE + 1));
			}else{
				setPicType((picType + 1) % (NUM_TYPE + 1));
			}
			type_select.value = picType.toString();
			if(typeSound == 1 && kirakira_sound && type_sound_select.checked){
				let kirakira = new Audio('sn/kirakira.mp3');
				kirakira.play();
			}
		}

		floating_text1.addEventListener('click', function(e){
			canvasClick(e);
		}, false);
		floating_text2.addEventListener('click', function(e){
			canvasClick(e);
		}, false);

		saimin_canvas.addEventListener('click', function(e){
			canvasClick(e);
		}, false);

		saimin_canvas.addEventListener('mousemove', function(e){
			if(!ready)
				return;
			addStar(e.clientX, e.clientY);
		}, false);

		saimin_canvas.addEventListener('touchstart', function(e){
			if(!ready)
				return;
			touchmoving = true;
		}, {passive: true});
		saimin_canvas.addEventListener('touchmove', function(e){
			if(!ready)
				return;
			if(touchmoving){
				let touches = e.touches;
				if(touches && touches.length == 1){
					addStar(touches[0].clientX, touches[0].clientY);
				}
			}
		}, {passive: true});
		saimin_canvas.addEventListener('touchend', function(e){
			if(!ready)
				return;
			touchmoving = false;
		}, {passive: true});
		saimin_canvas.addEventListener('touchcancel', function(e){
			if(!ready)
				return;
			touchmoving = false;
		}, {passive: true});

		saimin_canvas.addEventListener('wheel', function(e){
			e.preventDefault();
			if(!ready)
				return;
			if(e.ctrlKey)
				return;
			if(e.deltaY < 0){
				if(speed < 80.0)
					speed += 5.0;
				else
					speed = 80.0;
			}else if(e.deltaY > 0){
				if(speed > 0.0)
					speed -= 5.0;
				else
					speed = 0.0;
			}
		}, { passive: false });

		let saiminAdultCheck3 = localStorage.getItem('saiminAdultCheck3');
		let saiminLanguage3 = localStorage.getItem('saiminLanguage3');
		if(saiminAdultCheck3 && saiminLanguage3){
			setLanguage(saiminLanguage3);
			accepted();
		}else{
			if(!saiminLanguage3){
				chooseLanguage();
			}else{
				setLanguage(saiminLanguage3);
				if(!saiminAdultCheck3){
					help();
				}
			}
		}

		speech_checkbox.addEventListener('click', function(e){
			if(picType == -1){
				if(speech_checkbox.checked){
					playSpeech(trans_getText('TEXT_HYPNOSIS_RELEASED'));
					speech_label.classList.add('checked');
				}else{
					cancelSpeech();
					speech_label.classList.remove('checked');
				}
				return;
			}
			if(speech_checkbox.checked){
				playSpeech(theText);
				speech_label.classList.add('checked');
			}else{
				cancelSpeech();
				speech_label.classList.remove('checked');
			}
		});

		let mic_isInited = false;
		microphone.addEventListener('click', function(e){
			if(microphone.checked){
				if(!mic_isInited){
					mic_setup();
					mic_isInited = true;
				}
				mic_connect();
				microphone_label.classList.add('checked');
			}else{
				mic_disconnect();
				microphone_label.classList.remove('checked');
			}
		});

		// make kirakira sound quickly playable
		kirakira_sound = new Audio('sn/kirakira.mp3');

		if(localStorage.getItem('saiminHelpShowing')){
			help();
		}else if(localStorage.getItem('saiminAppearanceShowing')){
			apperance();
		}else if(localStorage.getItem('saiminConfigShowing')){
			config();
		}

		// service worker
		if(location.host != '' && 'serviceWorker' in navigator){
			navigator.serviceWorker.register('./sw.js', {scope: './'})
			.then((registration) => {
				theRegistration = registration;
				console.log('Service worker registered');
			});
		}

		window.addEventListener('resize', function(){
			if(location.hostname == '' || isNativeApp()){
				if(localStorage.getItem('saiminHelpShowing')){
					localStorage.setItem('saiminType', picType);
					location.reload();
				}else{
					fit();
				}
			}else{
				localStorage.setItem('saiminType', picType);
				location.reload();
			}
		}, false);

		if(localStorage.getItem('AndroidMicrophoneOnReload')){
			localStorage.removeItem('AndroidMicrophoneOnReload');
			mic_connect();
			microphone_label.classList.add('checked');
		}

		function showButtons(enabled){
			if(enabled){
				microphone_label.classList.remove('invisible');
				type_select_button.classList.remove('invisible');
				sound_button.classList.remove('invisible');
				speech_label.classList.remove('invisible');
				config_button.classList.remove('invisible');
				about_button.classList.remove('invisible');
				text_button.classList.remove('invisible');
			}else{
				microphone_label.classList.add('invisible');
				type_select_button.classList.add('invisible');
				sound_button.classList.add('invisible');
				speech_label.classList.add('invisible');
				config_button.classList.add('invisible');
				about_button.classList.add('invisible');
				text_button.classList.add('invisible');
			}
			try{
				android.showNaviBar(enabled);
			}catch(error){
				;
			}
		}

		document.body.addEventListener('keydown', function(e){
			if(!ready || e.ctrlKey)
				return;
			if('0' <= e.key && e.key <= '9'){ // pic0...pic9
				setPicType(e.key);
				return;
			}
			if(e.key == 'c' || e.key == 'C'){ // Configuration
				config_button.click();
				return;
			}
			if(e.key == 'h' || e.key == 'H'){ // Help
				about_button.click();
				return;
			}
			if(e.key == 'a' || e.key == 'A'){ // Appearance
				e.preventDefault();
				type_select_button.click();
				return;
			}
			if(e.key == 'p' || e.key == 'P'){ // Play/Pause
				sound_button.click();
				return;
			}
			if(e.key == 'm' || e.key == 'M'){ // Microphone
				microphone.click();
				return;
			}
			if(e.key == 't' || e.key == 'T'){ // Text
				text_button.click();
				return;
			}
			if(e.key == 's' || e.key == 'S'){ // Speech
				speech_checkbox.click();
				return;
			}
			if(e.key == 'x' || e.key == 'X'){ // Pause
				stopping = !stopping;
				return;
			}
			if(e.key == '-' || e.key == 'k' || e.key == 'K'){ // Kill hypnosis
				setPicType(-1);
				return;
			}
			if(e.key == 'd' || e.key == 'D'){ // Division (screen split)
				if(division == 1){
					setDivision(2);
				}else if(division == 2){
					setDivision(1);
				}else{
					setDivision(1);
				}
				return;
			}
			if(e.key == 'g' || e.key == 'G'){ // Goggle Mode
				if(division == 1){
					setDivision(2);
				}else{
					setDivision(1);
				}
				showButtons(division == 1);
				return;
			}
			if(e.key == 'b' || e.key == 'B'){ // buttons
				showButtons(microphone_label.classList.contains('invisible'));
				return;
			}
			if(e.key == 'w' || e.key == 'W'){ // Speed Slow
				setSpeedType('slow');
				return;
			}
			if(e.key == 'n' || e.key == 'N'){ // Speed Normal
				setSpeedType('normal');
				return;
			}
			if(e.key == 'f' || e.key == 'F'){ // Speed Fast
				setSpeedType('fast');
				return;
			}
			if(e.key == 'i' || e.key == 'I'){ // Speed Irregular
				setSpeedType('irregular');
				return;
			}
			if(e.key == 'u' || e.key == 'U'){ // Debugging
				DEBUGGING = !DEBUGGING;
				return;
			}
			if(e.key == 'l' || e.key == 'L'){ // Blinking
				setBlinkingType((parseInt(blinking_type.value) + 1) % 8);
				return;
			}
			if(e.key == 'r' || e.key == 'R'){ // Reload
				localStorage.setItem('saiminType', picType);
				location.reload();
				return;
			}
			// {{LANGUAGE_SPECIFIC}}
			if(e.key == 'e' || e.key == 'E'){ // English
				setLanguage('en');
				return;
			}
			if(e.key == 'z' || e.key == 'Z'){ // Chinese (Simplified)
				setLanguage('zh-CN');
				return;
			}
			if(e.key == 'j' || e.key == 'J'){ // Japanese
				setLanguage('ja');
				return;
			}
			//alert(e.key);
		});
	}

	main();
});
