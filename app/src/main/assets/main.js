/* jshint esversion: 8 */

const NUM_TYPE = 9;
const VERSION = '3.4.4';
let sai_DEBUGGING = false;
let sai_FPS = 0;
let sai_screen_width = 0;
let sai_screen_height = 0;
let sai_old_cxScreen = null;
let sai_old_cyScreen = null;
let sai_old_time = (new Date()).getTime();
let sai_counter = 0;
let sai_clock = 0;
let sai_ready = false;
let sai_message_text = '';
let sai_division = 1;
let sai_speed = 45.0;
let sai_sound = null;
let sai_sound_name = 'Magic';
let sai_kirakira_sound = null;
let sai_type_sound = 1;
let sai_stars = new Array(32);
let sai_touchmoving = false;
let sai_registration = null;
let sai_coin_img = new Image();
let sai_rotation_type = 'normal';
let sai_stopping = false;
let sai_released = false;
let sai_logo_img = new Image();
let sai_tap_here_img = new Image();
let sai_hypno_releasing_img = new Image();
let sai_all_released_img = new Image();
let sai_speed_irregular = false;
let sai_pic_type = 0;
let sai_blinking_interval = 0;
let sai_first_time = false;
let sai_request_anime = null;

function AndroidMicrophoneOnReload(){
	localStorage.setItem('AndroidMicrophoneOnReload', '1');
	location.reload();
}

document.addEventListener('DOMContentLoaded', function(){
	sai_coin_img.src = 'images/coin5yen.png';

	function SAI_is_native_app(){
		return navigator.userAgent.indexOf('/KraKra-native-app/') != -1;
	}

	function SAI_choose_page(page_id){
		// Hide all the pages
		sai_id_page_initial.classList.add('sai_class_invisible');
		sai_id_page_choose_langauge.classList.add('sai_class_invisible');
		sai_id_page_agreement.classList.add('sai_class_invisible');
		sai_id_page_main.classList.add('sai_class_invisible');

		// Display one page
		if(typeof(page_id) == 'string')
			page_id = document.getElementById(page_id);
		page_id.classList.remove('sai_class_invisible');
		if (page_id == sai_id_page_main){
			if (!sai_ready)
				SAI_accepted();
			if(!sai_request_anime){
				sai_request_anime = window.requestAnimationFrame(SAI_draw_all);
			}
		}else{
			window.cancelAnimationFrame(sai_request_anime);
			sai_request_anime = null;
		}
	}

	function SAI_get_native_app_version(){
		let results = navigator.userAgent.match(/\/KraKra-native-app\/([\d\.]+)\//);
		if(results)
			return results[1];
		return false;
	}

	function SAI_mod(x, y){
		return (x*y < 0) * y + x % y;
	}

	function SAI_star_add(x, y){
		sai_stars.shift();
		if(SAI_display_is_large()){
			x += (Math.random() - 0.5) * 2 * 20 * 2;
			y += (Math.random() - 0.5) * 2 * 20 * 2;
			let size = 5 + Math.random() * 10 * 2;
			sai_stars.push([x, y, size]);
		}else{
			x += (Math.random() - 0.5) * 2 * 20;
			y += (Math.random() - 0.5) * 2 * 20;
			let size = 5 + Math.random() * 10;
			sai_stars.push([x, y, size]);
		}
	}

	function SAI_speech_cancel(){
		try{
			android.cancelSpeech();
		}catch(error){
			if(window.speechSynthesis){
				window.speechSynthesis.cancel();
			}
		}
	}

	function SAI_blink_set_type(value){
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
		sai_blinking_interval = (hz > 0) ? (1.0 / hz) : 0;
		if(sai_id_range_blink_type.value != value.toString())
			sai_id_range_blink_type.value = value.toString();
		sai_id_text_blink_output.innerText = text;
		localStorage.setItem('saiminBlinkType', value);
	}

	function SAI_set_language(lang){
		if(!lang)
			lang = 'en';

		trans_localize(lang);

		sai_id_text_notice.scrollLeft = sai_id_text_notice.scrollTop = 0;

		sai_hypno_releasing_img = new Image();
		if(sai_released){
			sai_hypno_releasing_img.src = trans_getText('TEXT_HYPNOSIS_RELEASED_IMG');
		}else{
			sai_hypno_releasing_img.src = trans_getText('TEXT_KILLING_HYPNOSIS_IMG');
		}

		sai_logo_img = new Image();
		sai_logo_img.src = trans_getText('TEXT_LOGO');

		sai_tap_here_img = new Image();
		sai_tap_here_img.src = trans_getText('TEXT_TAP_HERE');

		sai_all_released_img = new Image();
		sai_all_released_img.src = trans_getText('TEXT_ALL_RELEASED_IMG');

		sai_id_select_language_1.value = lang;

		SAI_blink_set_type(sai_id_range_blink_type.value);

		trans_setHtmlText(sai_id_page_agreement_header_1, trans_getText('TEXT_ABOUT_APP'));
		trans_setHtmlText(sai_id_button_agree, trans_getText('TEXT_I_AGREE'));

		try{
			android.setLanguage(lang);
		}catch(error){
			;
		}
	}

	function SAI_adjust_text(text){
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

	async function SAI_speech_play(text){
		SAI_speech_cancel();
		text = SAI_adjust_text(text);
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

	function SAI_display_is_large(){
		return sai_screen_width >= 1500 || sai_screen_height >= 1500;
	}

	function SAI_sound_set_name(value){
		if(value.indexOf('sn') == 0)
			value = '';
		sai_sound_name = value;
		if(sai_sound_name != ''){
			console.log('sn/' + sai_sound_name + '.mp3');
			sai_sound = new Audio('sn/' + sai_sound_name + '.mp3');
		}else{
			sai_sound = null;
		}
		sound_select.value = value;
		localStorage.setItem('saiminSoundName', sai_sound_name);
	}

	function SAI_set_type_sound(value, test = false){
		if(value === true || value == "true")
			value = 1;
		if(value === false || value == "false")
			value = 0;
		sai_type_sound = parseInt(value);
		if(sai_id_checkbox_pic_change_sound.checked != !!value)
			sai_id_checkbox_pic_change_sound.checked = !!value;
		localStorage.setItem('saiminTypeSound', value);
		if(test && sai_type_sound == 1 && sai_kirakira_sound){
			sai_kirakira_sound.play();
		}
	}

	function SAI_screen_set_brightness(value){
		try{
			android.setBrightness(value);
		}catch(error){
			console.log("android.setBrightness(" + value + ") failed: " + error);
		}
		screen_brightness.value = value;
		localStorage.setItem('saiminScreenBrightness', value);
	}

	function SAI_mesage_set_type(value){
		sai_id_text_floating_1.classList.remove('font_size_small');
		sai_id_text_floating_1.classList.remove('font_size_normal');
		sai_id_text_floating_1.classList.remove('font_size_large');
		sai_id_text_floating_1.classList.remove('font_size_huge');
		sai_id_text_floating_2.classList.remove('font_size_small');
		sai_id_text_floating_2.classList.remove('font_size_normal');
		sai_id_text_floating_2.classList.remove('font_size_large');
		sai_id_text_floating_2.classList.remove('font_size_huge');
		value = value.toString();
		switch (value){
		case 'small':
		case '1':
			sai_id_text_floating_1.classList.add('font_size_small');
			sai_id_text_floating_2.classList.add('font_size_small');
			value = '1';
			break;
		case 'normal':
		case '2':
		default:
			sai_id_text_floating_1.classList.add('font_size_normal');
			sai_id_text_floating_2.classList.add('font_size_normal');
			value = '2';
			break;
		case 'large':
		case '3':
			sai_id_text_floating_1.classList.add('font_size_large');
			sai_id_text_floating_2.classList.add('font_size_large');
			value = '3';
			break;
		case 'huge':
		case '4':
			sai_id_text_floating_1.classList.add('font_size_huge');
			sai_id_text_floating_2.classList.add('font_size_huge');
			value = '4';
			break;
		}
		if(value != sai_id_select_message_size.value)
			sai_id_select_message_size.value = value;
		localStorage.setItem('saiminMessageSize', value);
	}

	function SAI_speed_set_type(value){
		sai_speed_irregular = false;
		switch (value){
		case 'slow':
			sai_speed = 27.5;
			break;
		case 'normal':
			sai_speed = 45.0;
			break;
		case 'irregular':
			sai_speed = 70.0;
			sai_speed_irregular = true;
			break;
		case 'fast':
			sai_speed = 70.0;
			break;
		default:
			sai_speed = parseFloat(value);
			break;
		}
		if(sai_speed != parseFloat(sai_id_range_speed_type.value)){
			if(sai_speed_irregular)
				sai_id_range_speed_type.value = sai_speed;
			else
				sai_id_range_speed_type.value = sai_speed;
		}
		if(sai_id_range_speed_type.disabled != sai_speed_irregular){
			sai_id_range_speed_type.disabled = sai_speed_irregular;
		}
		if(speed_irregular.checked != sai_speed_irregular){
			speed_irregular.checked = sai_speed_irregular;
		}
		localStorage.setItem('saiminSpeedType', sai_speed);
	}

	function SAI_screen_set_division(value){
		value = parseInt(value);
		switch(value){
		case 2:
			sai_id_checkbox_split.checked = true;
			sai_division = 2;
			break;
		case 1:
		default:
			sai_id_checkbox_split.checked = false;
			sai_division = 1;
			break;
		}
		localStorage.setItem('saiminDivision', sai_division.toString());
	}

	function SAI_get_tick_count(){
		return sai_counter;
	}

	let oldPicType = 0;

	function SAI_pic_get_type(){
		return sai_pic_type;
	};

	function SAI_pic_set_type(value){
		sai_pic_type = parseInt(value);
		if(sai_pic_type == -1){
			SAI_speech_cancel();
			sai_id_checkbox_speech.checked = false;
			speech_label.classList.remove('checked');
			sai_released = false;
			sai_id_button_sound.classList.add('releasing');
			sai_id_button_message.classList.add('releasing');
			speech_label.classList.add('releasing');
			sai_hypno_releasing_img.src = trans_getText('TEXT_KILLING_HYPNOSIS_IMG');
			setTimeout(function(){
				sai_hypno_releasing_img.src = trans_getText('TEXT_HYPNOSIS_RELEASED_IMG');
				sai_all_released_img.src = trans_getText('TEXT_ALL_RELEASED_IMG');
				sai_released = true;
			}, 3000);
		}else{
			if(oldPicType == -1){
				sai_message_text = '';
				sai_id_checkbox_speech.checked = false;
				speech_label.classList.remove('checked');
				SAI_speech_cancel();
			}
			sai_id_button_sound.classList.remove('releasing');
			sai_id_button_message.classList.remove('releasing');
			speech_label.classList.remove('releasing');
		}
		sai_id_select_pic_type.value = sai_pic_type.toString();
		sai_id_button_type_select.innerText = trans_getText('TEXT_PIC') + sai_pic_type.toString();
		localStorage.setItem('saiminType', sai_pic_type.toString());
		try{
			android.SAI_pic_set_type(sai_pic_type);
		}catch(error){
			;
		}
		oldPicType = sai_pic_type;
	};

	function SAI_message_set_text(txt){
		sai_message_text = txt.replace(trans_getText('TEXT_FULLWIDTH_SPACE'), '  ').trim();
		localStorage.setItem('saiminText', sai_message_text);
		if(sai_id_checkbox_speech.checked){
			SAI_speech_play(sai_message_text);
		}
		sai_id_text_floating_1.innerText = sai_message_text;
		sai_id_text_floating_2.innerText = sai_message_text;
	}

	function SAI_rotation_set(value){
		switch(value){
		case 'normal':
		case false:
		default:
			sai_id_checkbox_rotation.checked = false;
			sai_rotation_type = 'normal';
			break;
		case 'counter':
		case true:
			sai_id_checkbox_rotation.checked = true;
			sai_rotation_type = 'counter';
			break;
		}
		localStorage.setItem('saiminRotation', sai_rotation_type.toString());
	}

	function SAI_fit_canvas(){
		let ctx = sai_id_canvas_01.getContext('2d', { alpha: false });
		sai_screen_width = ctx.canvas.width = window.innerWidth;
		sai_screen_height = ctx.canvas.height = window.innerHeight;
	}

	function SAI_screen_fit(){
		SAI_fit_canvas();
		let position = { my: 'center', at: 'center', of: window };
		if(localStorage.getItem('saiminHelpShowing')){
			SAI_choose_page(sai_id_page_agreement);
		}else if(localStorage.getItem('saiminAppearanceShowing')){
			$('#appearance_dialog').dialog('option', 'position', position);
		}else if(localStorage.getItem('saiminConfigShowing')){
			$('#config_dialog').dialog('option', 'position', position);
		}
	}

	function SAI_update_version_display(){
		let nativeVersion = SAI_get_native_app_version();
		let text = sai_id_text_version.innerText;
		if(nativeVersion){
			text = text.replace('[[VERSION]]', nativeVersion + '(native) / ' + VERSION + '(web)');
		}else{
			text = text.replace('[[VERSION]]', VERSION + '(web)');
		}
		sai_id_text_version.innerText = text;
	}

	function SAI_accepted(){
		localStorage.setItem('saiminAdultCheck3', '1');
		sai_id_label_mic.classList.remove('sai_class_invisible');
		sai_id_button_type_select.classList.remove('sai_class_invisible');
		sai_id_button_sound.classList.remove('sai_class_invisible');
		speech_label.classList.remove('sai_class_invisible');
		sai_id_button_config.classList.remove('sai_class_invisible');
		sai_id_button_about.classList.remove('sai_class_invisible');
		sai_id_button_message.classList.remove('sai_class_invisible');
		SAI_update_version_display();
		if(!sai_ready){
			let theType = localStorage.getItem('saiminType');
			if(theType){
				SAI_pic_set_type(theType);
			}else{
				SAI_pic_set_type(0);
			}
			if (!sai_request_anime)
				sai_request_anime = window.requestAnimationFrame(SAI_draw_all);
			sai_ready = true;
			SAI_choose_page(sai_id_page_main);
		}
	}

	function SAI_language_choose(){
		let lang = localStorage.getItem('saiminLanguage3');
		if(!lang){
			lang = trans_getDefaultLanguage();
			sai_first_time = true;
		}
		sai_id_select_language_2.value = lang;
	}

	function SAI_help(){
		setTimeout(function(){
			sai_id_text_notice.scrollLeft = sai_id_text_notice.scrollTop = 0;
		}, 200);
		localStorage.setItem('saiminHelpShowing', '1');
		SAI_choose_page(sai_id_page_agreement);
	}

	function SAI_appearance(){
		let old_type_value = sai_id_select_pic_type.value;
		let old_division_value = sai_id_checkbox_split.checked ? 2 : 1;
		let old_speed_type_value = sai_id_range_speed_type.value;
		let old_rotation_value = sai_id_checkbox_rotation.checked;
		let old_blinking_value = sai_id_range_blink_type.value;
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
						SAI_pic_set_type(-1);
					},
				},{
					text: trans_getText('TEXT_OK'),
					click: function(){
						dialogContainer.dialog('close');
						if(sai_pic_type == -1)
							SAI_pic_set_type(sai_pic_type);
					},
				},{
					text: trans_getText('TEXT_CANCEL'),
					click: function(){
						SAI_pic_set_type(old_type_value);
						SAI_screen_set_division(old_division_value);
						SAI_speed_set_type(old_speed_type_value);
						SAI_rotation_set(old_rotation_value);
						SAI_blink_set_type(old_blinking_value);
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

	function SAI_config(){
		let old_language = localStorage.getItem('saiminLanguage3');
		let old_message_size_value = sai_id_select_message_size.value;
		let old_sound_value = sound_select.value;
		let old_type_sound_value = sai_id_checkbox_pic_change_sound.checked;
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
						SAI_set_language(old_language);
						SAI_mesage_set_type(old_message_size_value);
						SAI_sound_set_name(old_sound_value);
						SAI_set_type_sound(old_type_sound_value);
						SAI_screen_set_brightness(old_screen_brightness);
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

	function SAI_draw_circle(ctx, x, y, radius, is_fill = true){
		ctx.beginPath();
		ctx.arc(x, y, Math.abs(radius), 0, 2 * Math.PI);
		ctx.closePath();
		if(is_fill)
			ctx.fill();
		else
			ctx.stroke();
	}

	function SAI_draw_circle_2(ctx, x, y, radius, is_fill = true, N = 16){
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

	function SAI_draw_line(ctx, x0, y0, x1, y1, lineWidth){
		ctx.lineWidth = lineWidth;
		ctx.beginPath();
		ctx.moveTo(x0, y0);
		ctx.lineTo(x1, y1);
		ctx.stroke();
	}

	function SAI_draw_line_2(ctx, x0, y0, x1, y1, lineWidth){
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
		SAI_draw_circle_2(ctx, x0, y0, lineWidth / 2, true, 15);
	}

	function SAI_draw_heart(ctx, x0, y0, x1, y1){
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

	function SAI_draw_eye(ctx, x0, y0, r, opened = 1.0, alpha = 1.0){
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
		SAI_draw_circle(ctx, x0, y0, r / 3 * opened, true);
		ctx.restore();
	}

	function SAI_draw_eye_2(ctx, x0, y0, r, opened = 1.0){
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
		SAI_draw_circle(ctx, x0, y0, r / 3 * opened, true);
		ctx.restore();
	}

	function SAI_draw_light(ctx, x0, y0, radius){
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

	function SAI_draw_subliminal(ctx, px, py, dx, dy){
		ctx.save();

		ctx.beginPath();
		ctx.moveTo(px, py);
		ctx.lineTo(px + dx, py);
		ctx.lineTo(px + dx, py + dy);
		ctx.lineTo(px, py + dy);
		ctx.closePath();
		ctx.clip();

		let count = SAI_get_tick_count();
		let factor1 = Math.sin(count * 0.1);
		let factor2 = Math.abs(Math.cos(count * 0.03));

		ctx.fillStyle = `rgb(${factor2 * 30 + 40}%, 20%, ${40}%)`;
		ctx.fillRect(px, py, dx, dy);

		let mxy = Math.min(dx, dy) * (0.7 + 0.2 * factor1);
		let cx = px + dx / 2;
		let cy = py + dy / 2;

		ctx.fillStyle = '#f03';
		SAI_draw_heart(ctx, cx, cy - mxy / 2, cx, cy + mxy / 2);

		ctx.restore();
	}

	// pic-1: Release Hyponosis
	function SAI_draw_pic_minus_1(ctx, px, py, dx, dy){
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

		let count2 = -SAI_get_tick_count();
		let factor = 1.2 * Math.abs(Math.sin(count2 * 0.05));

		if(sai_released)
			factor = 1.0;

		let grd = ctx.createRadialGradient(qx, qy, 0, qx, qy, dxy * factor);
		grd.addColorStop(0, 'rgba(255, 255, 0, 1.0)');
		grd.addColorStop(1, 'rgba(255, 255, 255, 1.0)');
		ctx.fillStyle = grd;
		SAI_draw_circle(ctx, qx, qy, dxy, true);

		ctx.strokeStyle = "black";
		ctx.lineWidth = 10;
		SAI_draw_circle(ctx, qx, qy, (dx + dy + 10) / 5 * factor + dxy * 0.2, false);

		if(sai_hypno_releasing_img.complete){
			let x = px + (dx - sai_hypno_releasing_img.width) / 2;
			let y = py + (dy - sai_hypno_releasing_img.height) / 2 - dy * 0.1;
			ctx.drawImage(sai_hypno_releasing_img, x, y);
		}

		if(sai_released && sai_all_released_img.complete){
			let x = px + (dx - sai_all_released_img.width) / 2;
			let y = py + (dy - sai_all_released_img.height) / 2 + dy * 0.2;
			ctx.drawImage(sai_all_released_img, x, y);
		}

		ctx.restore();
	}

	// pic0: Initial Screen
	function SAI_draw_pic_0(ctx, px, py, dx, dy){
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
		SAI_draw_circle(ctx, qx, qy, dxy, true);

		if(sai_logo_img.complete){
			let x = px + (dx - sai_logo_img.width) / 2;
			let y = py + (dy - sai_logo_img.height) / 2 - dy * 0.1;
			ctx.drawImage(sai_logo_img, x, y);
		}

		if(sai_tap_here_img.complete){
			let x = qx - sai_tap_here_img.width / 2;
			let y = py + dy * 0.7;
			ctx.drawImage(sai_tap_here_img, x, y);
		}

		ctx.restore();
	}

	// pic1: Spiral
	function SAI_draw_pic_1(ctx, px, py, dx, dy){
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
		let count2 = -SAI_get_tick_count();
		if(SAI_display_is_large()){
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
			
				SAI_draw_line(ctx, oldx, oldy, x, y, dr * f * 0.666);

				oldx = x;
				oldy = y;
				count += 1;
				f *= 1.02;
			}
		}

		ctx.restore();
	}

	// pic2: Concentric Circles
	function SAI_draw_pic_2(ctx, px, py, dx, dy, flag=true){
		ctx.save();

		let qx = px + dx / 2;
		let qy = py + dy / 2;
		let dxy = (dx + dy) / 2;

		let count2 = SAI_get_tick_count();
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
		if(SAI_display_is_large()){
			dr0 *= 2;
			count2 *= 2;
			ctx.lineWidth = 30;
		}else{
			ctx.lineWidth = 15;
		}
		let dr = dr0 / 2 * factor;
		let radius = SAI_mod(count2 * 4, dr0);
		if(flag)
			radius = dr0 - radius;

		for (; radius < size; radius += dr0){
			SAI_draw_circle(ctx, qx, qy, radius, false);
		}

		ctx.restore();
	}

	function SAI_hsv2rgb(h, s, v){
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
	function SAI_draw_pic_3(ctx, px, py, dx, dy){
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

		let count2 = SAI_get_tick_count();
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
		for (let r = SAI_mod(count2 * 2, 100); r < cxy; r += 100){
			SAI_draw_circle(ctx, qx, qy, r, false);
			++i;
		}

		let opened = 1.0;
		let f = Math.sin(Math.abs(count2 * 0.1));
		if(f >= 0.8){
			opened = 0.6 + 0.4 * Math.abs(Math.sin(f * Math.PI));
		}

		let factor3 = (0.3 + Math.sin(count2 * 0.05) * 0.3);
		SAI_draw_eye_2(ctx, qx, qy, cxy / 8, (1.0 + factor3));
		ctx.fillStyle = '#f00';
		factor3 = 0.5 + Math.abs(factor3);
		SAI_draw_heart(ctx, qx, qy - cxy / 25 * factor3, qx, qy + cxy / 25 * factor3);

		const N = 4;
		const delta = (2 * Math.PI) / N;
		let radian = factor * 1.3;
		for (i = 0; i < N; ++i){
			let x, y;

			x = qx + cxy * Math.cos(radian + 0.4) * 0.3;
			y = qy + cxy * Math.sin(radian + 0.4) * 0.3;
			SAI_draw_eye(ctx, x, y, cxy / 10, opened, 0.25);

			x = qx + cxy * Math.cos(radian + 0.2) * 0.3;
			y = qy + cxy * Math.sin(radian + 0.2) * 0.3;
			SAI_draw_eye(ctx, x, y, cxy / 10, opened, 0.65);

			x = qx + cxy * Math.cos(radian) * 0.3;
			y = qy + cxy * Math.sin(radian) * 0.3;
			SAI_draw_eye(ctx, x, y, cxy / 10, opened);

			ctx.fillStyle = '#f00';
			SAI_draw_heart(ctx, x, y - cxy * opened / 50, x, y + cxy * opened / 50);

			radian += delta;
		}

		let grd = ctx.createRadialGradient(qx, qy, dxy * 0.25, qx, qy, dxy * 0.5);
		grd.addColorStop(0, 'rgba(255, 255, 255, 0.0)');
		grd.addColorStop(1, 'rgba(255, 255, 0, 0.8)');
		ctx.fillStyle = grd;
		SAI_draw_circle(ctx, qx, qy, dxy, true);

		ctx.restore();
	}

	// pic4: Black and White Spiral
	function SAI_draw_pic_4(ctx, px, py, dx, dy){
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

		let factor = SAI_get_tick_count() * 0.4;

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
			SAI_draw_line_2(ctx, x0, y0, x1, y1, radius * 0.325);
		}

		ctx.restore();
	}

	// pic5: Spreading Rainbow
	function SAI_draw_pic_5(ctx, px, py, dx, dy){
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

		let count2 = SAI_get_tick_count();
		let factor = count2 * 0.16;

		if(SAI_display_is_large()){
			qx += 60 * Math.cos(factor * 0.8);
			qy += 60 * Math.sin(factor * 0.8);
		}else{
			qx += 30 * Math.cos(factor * 0.8);
			qy += 30 * Math.sin(factor * 0.8);
		}

		let isLarge = SAI_display_is_large();
		for (let radius = isLarge ? ((dx + dy) * 0.2) : ((dx + dy) * 0.4); radius >= 10; radius *= 0.92){
			let r0, g0, b0;
			[r0, g0, b0] = SAI_hsv2rgb((dxy + factor * 0.3 - radius * 0.015) % 1.0, 1.0, 1.0);
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
		SAI_draw_circle(ctx, qx, qy, dxy, true);

		let value = factor * 25 + 10;
		let value2 = SAI_mod(value, 191);
		ctx.fillStyle = `rgb(255,${value2},${value2})`;
		let M = 5;
		let heartSize = 30;
		for (let radius = SAI_mod((factor * 10), 100) + 30; radius < dxy; radius += 100){
			for (let angle = 0; angle < 360; angle += 360 / M){
				let radian = angle * (Math.PI / 180.0);
				let x0 = qx + radius * Math.cos(radian + factor * 0.1 + radius / 100);
				let y0 = qy + radius * Math.sin(radian + factor * 0.1 + radius / 100);
				SAI_draw_heart(ctx, x0, y0, x0, y0 + heartSize + SAI_mod(value, 191) / 12);
			}
			heartSize += 5;
		}

		ctx.restore();
	}

	// pic6: 5-yen coin
	function SAI_draw_pic_6(ctx, px, py, dx, dy){
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

		let count2 = SAI_get_tick_count();
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
				SAI_draw_circle(ctx, x, y, i % 3 + 1);
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
			SAI_draw_line(ctx, x0, y0, x1, y1, 5);
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

		if(sai_coin_img.complete){
			ctx.translate(qx - sai_coin_img.width * 0.5, qy - sai_coin_img.height * 0.75);

			let angle = Math.PI * Math.sin(count2 * 0.1 - 0.05) * 0.078;
			ctx.rotate(angle);

			let ratio = SAI_display_is_large() ? 1.4 : 1;
			ctx.drawImage(sai_coin_img, 0, 0, sai_coin_img.width * ratio, sai_coin_img.height * ratio);
		}

		ctx.restore();
	}

	// pic7: Clamor Clamor
	function SAI_draw_pic_7(ctx, px, py, dx, dy){
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

		let count2 = SAI_get_tick_count();
		if(SAI_display_is_large()){
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
		SAI_draw_circle(ctx, qx, qy, dxy, true);

		ctx.restore();
	}

	// pic8: Crazy Colors
	function SAI_draw_pic_8(ctx, px, py, dx, dy){
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

		let count2 = SAI_get_tick_count();
		if(SAI_display_is_large()){
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
	function SAI_draw_pic_9(ctx, px, py, dx, dy){
		ctx.save();

		let qx = px + dx / 2;
		let qy = py + dy / 2;
		let dxy = (dx + dy) / 2;

		let count2 = SAI_get_tick_count();
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

		sai_counter = -sai_counter * 0.8;
		SAI_draw_pic_1(ctx, px, py, dx, dy);
		sai_counter = -sai_counter / 0.8;

		ctx.restore();
		ctx.save();

		ctx.beginPath();
		for (let i = delta1; i < dxy; i += 2 * delta1){
			ctx.arc(tx, ty, i, 0, Math.PI * 2, false);
			ctx.arc(tx, ty, i + delta1, 0, Math.PI * 2, true);
		}
		ctx.clip();

		sai_counter *= 0.8;
		SAI_draw_pic_1(ctx, px, py, dx, dy);
		sai_counter /= 0.8;

		ctx.restore();
	}

	function SAI_draw_pic(ctx, px, py, dx, dy){
		switch (sai_pic_type){
		case -1:
			SAI_draw_pic_minus_1(ctx, px, py, dx, dy);
			break;
		case 0:
			SAI_draw_pic_0(ctx, px, py, dx, dy);
			break;
		case 1:
			SAI_draw_pic_1(ctx, px, py, dx, dy);
			break;
		case 2:
			SAI_draw_pic_2(ctx, px, py, dx, dy, true);
			SAI_draw_pic_2(ctx, px, py, dx, dy, false);
			break;
		case 3:
			SAI_draw_pic_3(ctx, px, py, dx, dy);
			break;
		case 4:
			SAI_draw_pic_4(ctx, px, py, dx, dy);
			break;
		case 5:
			SAI_draw_pic_5(ctx, px, py, dx, dy);
			break;
		case 6:
			SAI_draw_pic_6(ctx, px, py, dx, dy);
			break;
		case 7:
			SAI_draw_pic_7(ctx, px, py, dx, dy);
			break;
		case 8:
			SAI_draw_pic_8(ctx, px, py, dx, dy);
			break;
		case 9:
			SAI_draw_pic_9(ctx, px, py, dx, dy);
			break;
		}
	}

	function SAI_draw_pic_blur(ctx, px, py, dx, dy){
		if(sai_blinking_interval != 0 && sai_pic_type != -1){
			if(SAI_mod(sai_old_time / 1000, sai_blinking_interval) < (sai_blinking_interval * 0.3)){
				SAI_draw_subliminal(ctx, px, py, dx, dy);
				return;
			}
		}
		switch (sai_pic_type){
		case 8:
		case 9:
			let ratio = 0.5;
			sai_id_canvas_02.width = dx * ratio;
			sai_id_canvas_02.height = dy * ratio;
			let ctx2 = sai_id_canvas_02.getContext('2d', { alpha: false });
			SAI_draw_pic(ctx2, 0, 0, dx * ratio, dy * ratio);
			ctx.drawImage(sai_id_canvas_02, 0, 0, dx * ratio, dy * ratio, px, py, dx, dy);
			break;
		default:
			SAI_draw_pic(ctx, px, py, dx, dy);
			break;
		}
	}

	function SAI_message_set_position(id, px, py, dx, dy, sai_counter){
		let x = px + dx / 2 - id.clientWidth / 2;
		let y = py + dy * 0.7 - id.clientHeight / 2 + (1 + 0.4 * Math.sin(sai_counter * 0.1)) * dy * 0.1;
		id.style.left = x + 'px';
		id.style.top = y + 'px';
	}

	function SAI_draw_all(){
		let ctx = sai_id_canvas_01.getContext('2d', { alpha: false });

		let cx = sai_screen_width, cy = sai_screen_height;
		let x = sai_screen_width / 2, y = sai_screen_height / 2;

		let splitted = false;
		if(sai_division == 1){
			SAI_draw_pic_blur(ctx, 0, 0, cx, cy);
			SAI_message_set_position(sai_id_text_floating_1, 0, 0, cx, cy, sai_counter);
			y += cy / 4;
		}else if(sai_division == -1){
			if(cx >= cy * 1.75){
				SAI_draw_pic_blur(ctx, 0, 0, cx / 2, cy);
				//SAI_draw_pic_blur(ctx, cx / 2, 0, cx / 2, cy);
				ctx.drawImage(sai_id_canvas_01, 0, 0, cx / 2, cy, cx / 2, 0, cx / 2, cy);
				SAI_message_set_position(sai_id_text_floating_1, 0, 0, cx / 2, cy, sai_counter);
				SAI_message_set_position(sai_id_text_floating_2, cx / 2, 0, cx / 2, cy, sai_counter);
				splitted = true;
			}else if(cy >= cx * 1.75){
				SAI_draw_pic_blur(ctx, 0, 0, cx, cy / 2);
				//SAI_draw_pic_blur(ctx, 0, cy / 2, cx, cy / 2);
				ctx.drawImage(sai_id_canvas_01, 0, 0, cx, cy / 2, 0, cy / 2, cx, cy / 2);
				SAI_message_set_position(sai_id_text_floating_1, 0, 0, cx, cy / 2, sai_counter);
				SAI_message_set_position(sai_id_text_floating_2, 0, cy / 2, cx, cy / 2, sai_counter);
				splitted = true;
			}else{
				SAI_draw_pic_blur(ctx, 0, 0, cx, cy);
				SAI_message_set_position(sai_id_text_floating_1, 0, 0, cx, cy, sai_counter);
				y += cy / 4;
			}
		}else{
			if(cx >= cy){
				SAI_draw_pic_blur(ctx, 0, 0, cx / 2, cy);
				//SAI_draw_pic_blur(ctx, cx / 2, 0, cx / 2, cy);
				ctx.drawImage(sai_id_canvas_01, 0, 0, cx / 2, cy, cx / 2, 0, cx / 2, cy);
				SAI_message_set_position(sai_id_text_floating_1, 0, 0, cx / 2, cy, sai_counter);
				SAI_message_set_position(sai_id_text_floating_2, cx / 2, 0, cx / 2, cy, sai_counter);
			}else{
				SAI_draw_pic_blur(ctx, 0, 0, cx, cy / 2);
				//SAI_draw_pic_blur(ctx, 0, cy / 2, cx, cy / 2);
				ctx.drawImage(sai_id_canvas_01, 0, 0, cx, cy / 2, 0, cy / 2, cx, cy / 2);
				SAI_message_set_position(sai_id_text_floating_1, 0, 0, cx, cy / 2, sai_counter);
				SAI_message_set_position(sai_id_text_floating_2, 0, cy / 2, cx, cy / 2, sai_counter);
			}
			splitted = true;
		}

		if(sai_pic_type == -1){
			sai_id_text_floating_1.classList.add('sai_class_invisible');
			sai_id_text_floating_2.classList.add('sai_class_invisible');
		}else if(sai_message_text != ''){
			if(splitted){
				sai_id_text_floating_1.classList.remove('sai_class_invisible');
				sai_id_text_floating_2.classList.remove('sai_class_invisible');
			}else{
				sai_id_text_floating_1.classList.remove('sai_class_invisible');
				sai_id_text_floating_2.classList.add('sai_class_invisible');
			}
		}else{
			sai_id_text_floating_1.classList.add('sai_class_invisible');
			sai_id_text_floating_2.classList.add('sai_class_invisible');
		}

		for (let iStar = 0; iStar < sai_stars.length; ++iStar){
			let star = sai_stars[iStar];
			if(star){
				ctx.fillStyle = `rgb(255, 255, 0, 0.8)`;
				SAI_draw_light(ctx, star[0], star[1], star[2]);
				if(star[2] > 1.0){
					star[2] *= 0.98;
				}
			}
		}
		sai_stars.shift();
		sai_stars.push(null);

		if(sai_old_cxScreen !== null && sai_old_cyScreen !== null){
			if(window.innerWidth != sai_old_cxScreen || window.innerHeight != sai_old_cyScreen){
				SAI_screen_fit();
			}
		}
		sai_old_cxScreen = window.innerWidth;
		sai_old_cyScreen = window.innerHeight;

		let new_time = (new Date()).getTime();
		let diff_time = (new_time - sai_old_time) / 1000.0;
		if(sai_rotation_type == 'counter')
			diff_time = -diff_time;
		if(sai_stopping)
			diff_time = 0;
		sai_counter += diff_time * sai_speed;
		sai_old_time = new_time;

		if(sai_speed_irregular){
			sai_clock += diff_time;
			if(sai_clock >= sai_speed / 30.0){
				sai_clock = 0;
				const MIN_VALUE = 35.0;
				const MAX_VALUE = 70.0;
				const MIDDLE = (MIN_VALUE + MAX_VALUE) * 0.5;
				if(sai_speed < MIDDLE)
					sai_speed = MIDDLE + (MAX_VALUE - MIDDLE) * Math.random();
				else
					sai_speed = MIN_VALUE + (MIDDLE - MIN_VALUE) * Math.random();
			}
		}

		if(sai_DEBUGGING){
			if(diff_time != 0){
				sai_FPS = 1 / Math.abs(diff_time);
				sai_FPS = Math.round(sai_FPS * 10) / 10;
			}
			let text = Math.round(sai_FPS).toString() + '.' + (sai_FPS * 10 % 10).toString();
			ctx.font = '32px san-serif';
			let measure = ctx.measureText(text);
			let width = measure.width;
			let height = measure.actualBoundingBoxAscent + measure.actualBoundingBoxDescent;
			ctx.fillStyle = "red";
			ctx.fillText(text, (sai_screen_width - width) / 2, height);
		}

		if(sai_request_anime){
			sai_request_anime = window.requestAnimationFrame(SAI_draw_all);
		}
	}

	function SAI_main(){
		const argc = arguments.length, argv = arguments;

		SAI_speech_cancel();
		SAI_fit_canvas();

		let saiminText = localStorage.getItem('saiminText');
		if(saiminText){
			SAI_message_set_text(saiminText);
		}

		let saiminDivision = localStorage.getItem('saiminDivision');
		if(saiminDivision){
			SAI_screen_set_division(saiminDivision);
		}

		let saiminSoundName = localStorage.getItem('saiminSoundName');
		if(saiminSoundName){
			SAI_sound_set_name(saiminSoundName);
		}else{
			SAI_sound_set_name('Magic');
		}

		let saiminTypeSound = localStorage.getItem('saiminTypeSound');
		if(saiminTypeSound){
			SAI_set_type_sound(saiminTypeSound);
		}

		let saiminSpeedType = localStorage.getItem('saiminSpeedType');
		if(saiminSpeedType){
			SAI_speed_set_type(saiminSpeedType);
		}else{
			SAI_speed_set_type('normal');
		}

		let saiminBlinkType = localStorage.getItem('saiminBlinkType');
		if(saiminBlinkType){
			SAI_blink_set_type(saiminBlinkType);
		}else{
			SAI_blink_set_type(0);
		}

		let saiminRotation = localStorage.getItem('saiminRotation');
		if(saiminRotation){
			SAI_rotation_set(saiminRotation);
		}else{
			SAI_rotation_set('normal');
		}

		let saiminMessageSize = localStorage.getItem('saiminMessageSize');
		if(saiminMessageSize){
			SAI_mesage_set_type(saiminMessageSize);
		}else{
			SAI_mesage_set_type('normal');
		}

		let saiminScreenBrightness = localStorage.getItem('saiminScreenBrightness');
		if(saiminScreenBrightness){
			SAI_screen_set_brightness(saiminScreenBrightness);
		}else{
			SAI_screen_set_brightness('normal');
		}

		sai_id_button_message.addEventListener('click', function(){
			if(sai_pic_type == -1)
				return;
			let text = prompt(trans_getText('TEXT_INPUT_MESSAGE'), sai_message_text);
			if(text !== null){
				SAI_message_set_text(text);
			}
		});

		sai_id_button_about.addEventListener('click', function(){
			SAI_help();
		});

		sai_id_button_type_select.addEventListener('click', function(e){
			e.preventDefault();
			SAI_appearance();
		});

		sai_id_button_sound.addEventListener('click', function(){
			if(sai_pic_type == -1){
				let releasing_sound = null;
				let lang = localStorage.getItem('saiminLanguage3');
				releasing_sound = new Audio(trans_getText('TEXT_MP3_RELEASED_HYPNOSIS'));
				releasing_sound.play();
				return;
			}
			if(sai_sound_name != ''){
				if(sai_sound){
					let s = new Audio('sn/' + sai_sound_name + '.mp3');
					s.play();
				}
			}else{
				SAI_config();
			}
		});

		sai_id_button_config.addEventListener('click', function(){
			SAI_config();
		});

		sai_id_select_pic_type.addEventListener('change', function(){
			if(!sai_ready)
				return;
			SAI_pic_set_type(parseInt(sai_id_select_pic_type.value));
		}, false);
		sai_id_select_pic_type.addEventListener('click', function(){
			if(!sai_ready)
				return;
			SAI_pic_set_type(parseInt(sai_id_select_pic_type.value));
		}, false);

		sai_id_select_language_1.addEventListener('change', function(){
			if(!sai_ready)
				return;
			SAI_set_language(sai_id_select_language_1.value);
		}, false);

		sai_id_button_agree.addEventListener('click', function(e){
			localStorage.removeItem('saiminHelpShowing');
			SAI_choose_page(sai_id_page_main);
		});

		sai_id_select_message_size.addEventListener('input', function(){
			if(!sai_ready)
				return;
			SAI_mesage_set_type(sai_id_select_message_size.value, true);
		}, false);

		screen_brightness.addEventListener('change', function(){
			if(!sai_ready)
				return;
			SAI_screen_set_brightness(screen_brightness.value, true);
		}, false);

		sound_select.addEventListener('change', function(){
			if(!sai_ready)
				return;
			SAI_sound_set_name(sound_select.value);
		}, false);
		sound_select.addEventListener('click', function(){
			if(!sai_ready)
				return;
			SAI_sound_set_name(sound_select.value);
		}, false);
		sai_id_button_sound_play.addEventListener('click', function(){
			if(!sai_ready)
				return;
			if(sai_sound_name != '' && sai_sound){
				let s = new Audio('sn/' + sai_sound_name + '.mp3');
				s.play();
			}
		}, false);

		sai_id_checkbox_pic_change_sound.addEventListener('change', function(){
			if(!sai_ready)
				return;
			SAI_set_type_sound(sai_id_checkbox_pic_change_sound.checked, true);
		}, false);
		sai_id_checkbox_pic_change_sound.addEventListener('click', function(){
			if(!sai_ready)
				return;
			SAI_set_type_sound(sai_id_checkbox_pic_change_sound.checked, true);
		}, false);

		sai_id_checkbox_split.addEventListener('change', function(){
			if(!sai_ready)
				return;
			SAI_screen_set_division(sai_id_checkbox_split.checked ? 2 : 1);
		}, false);
		sai_id_checkbox_split.addEventListener('click', function(){
			if(!sai_ready)
				return;
			SAI_screen_set_division(sai_id_checkbox_split.checked ? 2 : 1);
		}, false);

		sai_id_range_speed_type.addEventListener('input', function(){
			if(!sai_ready)
				return;
			SAI_speed_set_type(sai_id_range_speed_type.value);
		}, false);

		speed_irregular.addEventListener('change', function(){
			if(!sai_ready)
				return;
			if(speed_irregular.checked){
				SAI_speed_set_type('irregular');
			}else{
				SAI_speed_set_type('normal');
			}
		}, false);

		sai_id_checkbox_rotation.addEventListener('change', function(){
			if(!sai_ready)
				return;
			SAI_rotation_set(sai_id_checkbox_rotation.checked);
		}, false);

		sai_id_range_blink_type.addEventListener('input', function(){
			if(!sai_ready)
				return;
			SAI_blink_set_type(sai_id_range_blink_type.value);
		}, false);

		function canvasClick(e){
			if(!sai_ready)
				return;
			if(e.shiftKey){
				SAI_pic_set_type((sai_pic_type + (NUM_TYPE + 1) - 1) % (NUM_TYPE + 1));
			}else{
				SAI_pic_set_type((sai_pic_type + 1) % (NUM_TYPE + 1));
			}
			sai_id_select_pic_type.value = sai_pic_type.toString();
			if(sai_type_sound == 1 && sai_kirakira_sound && sai_id_checkbox_pic_change_sound.checked){
				let kirakira = new Audio('sn/kirakira.mp3');
				kirakira.play();
			}
		}

		sai_id_text_floating_1.addEventListener('click', function(e){
			canvasClick(e);
		}, false);
		sai_id_text_floating_2.addEventListener('click', function(e){
			canvasClick(e);
		}, false);

		sai_id_canvas_01.addEventListener('click', function(e){
			canvasClick(e);
		}, false);

		sai_id_canvas_01.addEventListener('mousemove', function(e){
			if(!sai_ready)
				return;
			SAI_star_add(e.clientX, e.clientY);
		}, false);

		sai_id_canvas_01.addEventListener('touchstart', function(e){
			if(!sai_ready)
				return;
			sai_touchmoving = true;
		}, {passive: true});
		sai_id_canvas_01.addEventListener('touchmove', function(e){
			if(!sai_ready)
				return;
			if(sai_touchmoving){
				let touches = e.touches;
				if(touches && touches.length == 1){
					SAI_star_add(touches[0].clientX, touches[0].clientY);
				}
			}
		}, {passive: true});
		sai_id_canvas_01.addEventListener('touchend', function(e){
			if(!sai_ready)
				return;
			sai_touchmoving = false;
		}, {passive: true});
		sai_id_canvas_01.addEventListener('touchcancel', function(e){
			if(!sai_ready)
				return;
			sai_touchmoving = false;
		}, {passive: true});

		sai_id_canvas_01.addEventListener('wheel', function(e){
			e.preventDefault();
			if(!sai_ready)
				return;
			if(e.ctrlKey)
				return;
			if(e.deltaY < 0){
				if(sai_speed < 80.0)
					sai_speed += 5.0;
				else
					sai_speed = 80.0;
			}else if(e.deltaY > 0){
				if(sai_speed > 0.0)
					sai_speed -= 5.0;
				else
					sai_speed = 0.0;
			}
		}, { passive: false });

		let saiminAdultCheck3 = localStorage.getItem('saiminAdultCheck3');
		let saiminLanguage3 = localStorage.getItem('saiminLanguage3');
		if(saiminAdultCheck3 && saiminLanguage3){
			SAI_set_language(saiminLanguage3);
			SAI_accepted();
		}else{
			if(!saiminLanguage3){
				SAI_choose_page(sai_id_page_choose_langauge);
				sai_id_button_choose_language.addEventListener('click', function(e){
					SAI_set_language(sai_id_select_language_2.value);
					SAI_choose_page(sai_id_page_main);
					if(sai_first_time){
						SAI_help();
					}
				});
				SAI_language_choose();
			}else{
				SAI_set_language(saiminLanguage3);
				if(!saiminAdultCheck3){
					SAI_choose_page(sai_id_page_main);
					SAI_help();
				}
			}
		}

		sai_id_checkbox_speech.addEventListener('click', function(e){
			if(sai_pic_type == -1){
				if(sai_id_checkbox_speech.checked){
					SAI_speech_play(trans_getText('TEXT_HYPNOSIS_RELEASED'));
					speech_label.classList.add('checked');
				}else{
					SAI_speech_cancel();
					speech_label.classList.remove('checked');
				}
				return;
			}
			if(sai_id_checkbox_speech.checked){
				SAI_speech_play(sai_message_text);
				speech_label.classList.add('checked');
			}else{
				SAI_speech_cancel();
				speech_label.classList.remove('checked');
			}
		});

		let mic_isInited = false;
		sai_id_checkbox_mic.addEventListener('click', function(e){
			if(sai_id_checkbox_mic.checked){
				if(!mic_isInited){
					mic_setup();
					mic_isInited = true;
				}
				mic_connect();
				sai_id_label_mic.classList.add('checked');
			}else{
				mic_disconnect();
				sai_id_label_mic.classList.remove('checked');
			}
		});

		// make kirakira sound quickly playable
		sai_kirakira_sound = new Audio('sn/kirakira.mp3');

		if(localStorage.getItem('saiminHelpShowing')){
			SAI_help();
		}else if(localStorage.getItem('saiminAppearanceShowing')){
			SAI_appearance();
		}else if(localStorage.getItem('saiminConfigShowing')){
			SAI_config();
		}

		// service worker
		if(location.host != '' && 'serviceWorker' in navigator){
			navigator.serviceWorker.register('./sw.js', {scope: './'})
			.then((registration) => {
				sai_registration = registration;
				console.log('Service worker registered');
			});
		}

		window.addEventListener('resize', function(){
			if(location.hostname == '' || SAI_is_native_app()){
				if(localStorage.getItem('saiminHelpShowing')){
					localStorage.setItem('saiminType', sai_pic_type);
					location.reload();
				}else{
					SAI_screen_fit();
				}
			}else{
				localStorage.setItem('saiminType', sai_pic_type);
				location.reload();
			}
		}, false);

		if(localStorage.getItem('AndroidMicrophoneOnReload')){
			localStorage.removeItem('AndroidMicrophoneOnReload');
			mic_connect();
			sai_id_label_mic.classList.add('checked');
		}

		function showButtons(enabled){
			if(enabled){
				sai_id_label_mic.classList.remove('sai_class_invisible');
				sai_id_button_type_select.classList.remove('sai_class_invisible');
				sai_id_button_sound.classList.remove('sai_class_invisible');
				speech_label.classList.remove('sai_class_invisible');
				sai_id_button_config.classList.remove('sai_class_invisible');
				sai_id_button_about.classList.remove('sai_class_invisible');
				sai_id_button_message.classList.remove('sai_class_invisible');
			}else{
				sai_id_label_mic.classList.add('sai_class_invisible');
				sai_id_button_type_select.classList.add('sai_class_invisible');
				sai_id_button_sound.classList.add('sai_class_invisible');
				speech_label.classList.add('sai_class_invisible');
				sai_id_button_config.classList.add('sai_class_invisible');
				sai_id_button_about.classList.add('sai_class_invisible');
				sai_id_button_message.classList.add('sai_class_invisible');
			}
			try{
				android.showNaviBar(enabled);
			}catch(error){
				;
			}
		}

		document.body.addEventListener('keydown', function(e){
			if(!sai_ready || e.ctrlKey)
				return;
			if('0' <= e.key && e.key <= '9'){ // pic0...pic9
				SAI_pic_set_type(e.key);
				return;
			}
			if(e.key == 'c' || e.key == 'C'){ // Configuration
				sai_id_button_config.click();
				return;
			}
			if(e.key == 'h' || e.key == 'H'){ // Help
				sai_id_button_about.click();
				return;
			}
			if(e.key == 'a' || e.key == 'A'){ // Appearance
				e.preventDefault();
				sai_id_button_type_select.click();
				return;
			}
			if(e.key == 'p' || e.key == 'P'){ // Play/Pause
				sai_id_button_sound.click();
				return;
			}
			if(e.key == 'm' || e.key == 'M'){ // Microphone
				sai_id_checkbox_mic.click();
				return;
			}
			if(e.key == 't' || e.key == 'T'){ // Text
				sai_id_button_message.click();
				return;
			}
			if(e.key == 's' || e.key == 'S'){ // Speech
				sai_id_checkbox_speech.click();
				return;
			}
			if(e.key == 'x' || e.key == 'X'){ // Pause
				sai_stopping = !sai_stopping;
				return;
			}
			if(e.key == '-' || e.key == 'k' || e.key == 'K'){ // Kill hypnosis
				SAI_pic_set_type(-1);
				return;
			}
			if(e.key == 'd' || e.key == 'D'){ // Division (screen split)
				if(sai_division == 1){
					SAI_screen_set_division(2);
				}else if(sai_division == 2){
					SAI_screen_set_division(1);
				}else{
					SAI_screen_set_division(1);
				}
				return;
			}
			if(e.key == 'g' || e.key == 'G'){ // Goggle Mode
				if(sai_division == 1){
					SAI_screen_set_division(2);
				}else{
					SAI_screen_set_division(1);
				}
				showButtons(sai_division == 1);
				return;
			}
			if(e.key == 'b' || e.key == 'B'){ // buttons
				showButtons(sai_id_label_mic.classList.contains('sai_class_invisible'));
				return;
			}
			if(e.key == 'w' || e.key == 'W'){ // Speed Slow
				SAI_speed_set_type('slow');
				return;
			}
			if(e.key == 'n' || e.key == 'N'){ // Speed Normal
				SAI_speed_set_type('normal');
				return;
			}
			if(e.key == 'f' || e.key == 'F'){ // Speed Fast
				SAI_speed_set_type('fast');
				return;
			}
			if(e.key == 'i' || e.key == 'I'){ // Speed Irregular
				SAI_speed_set_type('irregular');
				return;
			}
			if(e.key == 'u' || e.key == 'U'){ // Debugging
				sai_DEBUGGING = !sai_DEBUGGING;
				return;
			}
			if(e.key == 'l' || e.key == 'L'){ // Blinking
				SAI_blink_set_type((parseInt(sai_id_range_blink_type.value) + 1) % 8);
				return;
			}
			if(e.key == 'r' || e.key == 'R'){ // Reload
				localStorage.setItem('saiminType', sai_pic_type);
				location.reload();
				return;
			}
			// {{LANGUAGE_SPECIFIC}}
			if(e.key == 'e' || e.key == 'E'){ // English
				SAI_set_language('en');
				return;
			}
			if(e.key == 'z' || e.key == 'Z'){ // Chinese (Simplified)
				SAI_set_language('zh-CN');
				return;
			}
			if(e.key == 'j' || e.key == 'J'){ // Japanese
				SAI_set_language('ja');
				return;
			}
			//alert(e.key);
		});
	}

	SAI_main();
});
