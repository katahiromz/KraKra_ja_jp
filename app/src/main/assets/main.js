// 催眠アプリ「催眠くらくら」のJavaScriptのメインコード。
// 暗号名はKraKra。

const sai_VERSION = '3.7.4'; // KraKraバージョン番号。
const sai_DEBUGGING = false; // デバッグ中か？
let sai_FPS = 0; // 実測フレームレート。

// 【KraKra JavaScript 命名規則】
// - 関数名の頭に SAI_ を付ける。
// - 変数名・定数名の頭に sai_ を付ける。
// - 要素IDの頭に sai_id_ を付ける。
// - CSSクラスの頭に sai_class_ を付ける。

// 【KraKra コーディング ルール】
// - インデントはTabを使うこと。
// - 言語特有の記述が必要な個所は「{{LANGUAGE_SPECIFIC}}」というコメントを付けること。
// - 関数はすべてconst変数にすること。functionキーワードは省略しないこと。

// メッセージ項目がクリックされた。
const SAI_on_click_message = function(id){
	sai_id_text_message.value = id.textContent;
	sai_id_text_message.focus();
}

// メッセージ項目でキーが入力された。
const SAI_on_keydown_message = function(e){
	if(e.code == 'Enter' || e.key == ' '){
		e.target.click();
		return false;
	}
	return true;
}

// ドキュメントの読み込みが完了（DOMContentLoaded）されたら無名関数が呼び出される。
document.addEventListener('DOMContentLoaded', function(){
	// 変数を保護するため、関数内部に閉じ込める。
	const sai_NUM_TYPE = 17; // 「画」の個数。
	let sai_screen_width = 0; // スクリーンの幅（ピクセル単位）を覚えておく。
	let sai_screen_height = 0; // スクリーンの高さ（ピクセル単位）を覚えておく。
	let sai_pic_type = 0; // 映像の種類を表す整数値。
	let sai_stopping = true; // 停止中か？
	let sai_hypnosis_releasing_time = null; // 催眠解除中ならば時刻。さもなければnull。
	let sai_old_time = (new Date()).getTime(); // 処理フレームの時刻を覚えておく。
	let sai_counter = 0; // 映像を動かす変数。
	let sai_clock = 0; // スピードが不規則のときに映像の速さを変化させる変数。
	let sai_message_text = ''; // メッセージテキスト。
	let sai_screen_split = 1; // 画面分割の分割数。
	let sai_speed = 45.0; // 映像のスピード。
	let sai_sound_object = null; // 音声オブジェクト。
	let sai_sound_name = 'Magic'; // 音声の名前。ファイル名の一部。
	let sai_switch_sound_object = new Audio('sn/kirakira.mp3'); // 切り替えの音声のオブジェクト。
	let sai_switch_sound_type = 1; // 切り替えの音声の種類。
	let sai_stars = new Array(32); // 画面を指でなぞったときのきらめきを保存する。
	let sai_touchmoving = false; // 画面を指でなぞっているかどうか？
	let sai_touch_time = null; // 触れた時間。
	let sai_not_click = false; // クリックではない？
	let sai_touch_position = null; // 触っている位置。
	let sai_touching_coin = false; // コインを触っているかどうか？
	let sai_service_worker_registration = null; // サービスワーカーの登録。
	let sai_coin_img = new Image(); // 五円玉のイメージ。
	let sai_rotation_type = 'normal'; // 回転の種類。
	let sai_logo_img = new Image(); // KraKraのロゴ。
	let sai_tap_here_img = new Image(); // 「ここをタップ」の画像。
	let sai_hypno_releasing_img = new Image(); // 「催眠術を解放中」の画像。
	let sai_all_released_img = new Image(); // 「催眠術を解放しました」の画像。
	let sai_speed_irregular = false; // 映像スピードが不規則か？
	let sai_old_pic_type = 0; // 古い映像の種類。
	let sai_blinking_interval = 0; // 画面点滅（サブリミナル）の間隔（秒）。
	let sai_first_time = false; // 初回か？
	let sai_request_anime = null; // アニメーションの要求。
	let sai_count_down = null; // カウントダウンの時刻またはnull。
	let sai_spiral_img = new Image();
	let sai_eye_left_img = new Image();
	let sai_eye_right_img = new Image();
	let sai_user_message_list = []; // メッセージリスト。
	let sai_releasing_sound = null; // 催眠解除の音声。
	let sai_message_size = 2; // メッセージの寸法。
	let sai_kaleido_radius = 50; // 万華鏡の細胞の半径。
	let sai_kaleido_canvas_1 = null; // 万華鏡用の一時的なキャンバス1。
	let sai_kaleido_canvas_2 = null; // 万華鏡用の一時的なキャンバス2。
	let sai_face_getter = null; // 顔認識。

	// このアプリはネイティブアプリか？
	const SAI_is_native_app = function(){
		return navigator.userAgent.indexOf('/KraKra-native-app/') != -1;
	}

	// ネイティブアプリならバージョン番号を取得する。
	const SAI_get_native_app_version = function(){
		let results = navigator.userAgent.match(/\/KraKra-native-app\/([\d\.]+)\//);
		if(results)
			return results[1];
		return false;
	}

	// HTMLの特殊文字を置換。
	const SAI_htmlspecialchars = function(str){
		return (str + '').replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/'/g,'&#039;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); 
	}

	// メッセージリストを作成する。
	const SAI_populate_message_list = function(){
		// メッセージリストを構築する。
		let msg_list = trans_message_list();
		msg_list = JSON.parse(JSON.stringify(msg_list)); // Deep Copy
		for(let item of sai_user_message_list){
			let index = msg_list.indexOf(item);
			if(index >= 0)
				msg_list.splice(index, 1);
		}
		for(let item of sai_user_message_list){
			msg_list.unshift(item);
		}
		msg_list.unshift(''); // 使いやすさのために空文字列を最初に置く。

		let html = '';
		for(let item of msg_list){
			html += '<div onclick="SAI_on_click_message(this)" tabindex="0" onkeydown="return SAI_on_keydown_message(arguments[0])">';
			html += SAI_htmlspecialchars(item);
			html += '</div>';
		}
		sai_id_message_list.innerHTML = html;
	}

	// 音声が再生中か？
	const SAI_sound_is_playing = function(){
		return sai_sound_object && !sai_sound_object.paused;
	}

	// 音声を一時停止。
	const SAI_sound_pause = function(){
		// 再生中なら停止する。
		if(SAI_sound_is_playing())
			sai_sound_object.pause();
		// UIを更新。
		sai_id_button_sound_play.classList.remove('sai_class_checked');
		sai_id_image_config_play_pause.classList.remove('playing');
	}

	// ページを選択。
	const SAI_choose_page = function(page_id){
		// まず、すべてのページを隠す。
		let pages = document.getElementsByClassName('sai_class_page');
		for(let page of pages){
			page.classList.add('sai_class_invisible');
		}

		// 一つのページを表示する。
		if(typeof(page_id) == 'string')
			page_id = document.getElementById(page_id);
		page_id.classList.remove('sai_class_invisible');

		if(page_id == sai_id_page_main || page_id == sai_id_page_config){ // メインページか設定ページなら
			// 必要ならアニメーションを要求する。
			if(!sai_request_anime){
				sai_request_anime = window.requestAnimationFrame(SAI_draw_all);
			}
			// 催眠解除の音声を止める。
			if(sai_releasing_sound && !sai_releasing_sound.paused)
				sai_releasing_sound.pause();
		}else{
			// アニメーションをキャンセルする。
			window.cancelAnimationFrame(sai_request_anime);
			sai_request_anime = null;
			// 音声の再生を停止する。
			SAI_sound_pause();
		}

		// 顔認識の状態をUIに反映する。
		const face_update_status = function(status){
			switch(status){
			case 0: // Unlocked
				sai_id_button_lock_on.innerText = trans_getText('TEXT_LOCK_ON');
				sai_id_button_lock_on.disabled = true;
				break;
			case 1: // Candidate
				sai_id_button_lock_on.innerText = trans_getText('TEXT_LOCK_ON');
				sai_id_button_lock_on.disabled = false;
				break;
			case 2: // Locked
				sai_id_button_lock_on.innerText = trans_getText('TEXT_UNLOCK');
				sai_id_button_lock_on.disabled = false;
				if(sai_id_checkbox_auto_play_sound.checked){
					let lockon_sound = new Audio('sn/LockOn.mp3');
					if(lockon_sound){
						lockon_sound.volume = sai_id_range_sound_volume.value / 100.0;
						lockon_sound.play();
					}
				}
				break;
			}
			sai_id_button_close.innerText = trans_getText('TEXT_CLOSE');
		};

		// 顔認識のページか？
		if(page_id == sai_id_page_face_getter){
			if (!sai_face_getter) {
				sai_face_getter = new facelocker(sai_id_canvas_face, function(status){
					face_update_status(status);
				});
			}
			face_update_status(sai_face_getter.get_status());
			sai_face_getter.resume();
		}else{
			if(sai_face_getter){
				sai_face_getter.stop();
			}
		}

		if(page_id == sai_id_page_message){ // 「メッセージ」ページなら
			// メッセージリスト表示状態を保存する。
			localStorage.setItem('saiminMessageListShowing', 1);
			// メッセージリストを埋める。
			SAI_populate_message_list();
			// メッセージテキストボックスのプレースホルダーをセットする。
			sai_id_text_message.placeholder = trans_getText('TEXT_INPUTMESSAGE');
			// 現在のメッセージを設定する。
			sai_id_text_message.value = localStorage.getItem('saiminText') || '';
			// メッセージをしゃべるか？
			sai_id_checkbox_message_speech.checked = sai_id_checkbox_speech_on_off.checked;
			// 100ミリ秒後に一番上にスクロールする。
			setTimeout(function(){
				sai_id_message_scrollable.scrollLeft = sai_id_message_scrollable.scrollTop = 0;
			}, 100);
		}

		if(page_id == sai_id_page_config){ // 「設定」ページなら
			// 100ミリ秒後に一番上にスクロールする。
			setTimeout(function(){
				sai_id_config_scrollable.scrollLeft = sai_id_config_scrollable.scrollTop = 0;
			}, 100);
		}
	}

	// メッセージリストを表示する。
	const SAI_message_list_show = function(){
		SAI_choose_page(sai_id_page_message);
	}

	// 負の浮動小数点数に対応した剰余（modular; 余り）関数。
	const SAI_mod = function(x, y){
		return (x*y < 0) * y + x % y;
	}

	// きらめきに新しい星を追加する。
	const SAI_star_add = function(x, y){
		sai_stars.shift(); // 古い星を消す。
		let ctx = sai_id_canvas_01.getContext('2d', { alpha: false });
		if(SAI_screen_is_large(ctx)){ // 画面が大きければ
			// 大きな星を押し込む。
			x += (Math.random() - 0.5) * 2 * 20 * 2;
			y += (Math.random() - 0.5) * 2 * 20 * 2;
			let size = 5 + Math.random() * 10 * 2;
			sai_stars.push([x, y, size]);
		}else{ // さもなければ小さな星を押し込む。
			x += (Math.random() - 0.5) * 2 * 20;
			y += (Math.random() - 0.5) * 2 * 20;
			let size = 5 + Math.random() * 10;
			sai_stars.push([x, y, size]);
		}
	}

	// スピーチを中断する。
	const SAI_speech_cancel = function(){
		console.log('SAI_speech_cancel');
		try{
			android.cancelSpeech(); // スピーチのキャンセル。Androidでなければ失敗。
		}catch(error){ // Androidではない。
			// Web側でスピーチをキャンセル。
			if(window.speechSynthesis){
				window.speechSynthesis.cancel();
			}
		}
	}

	// メッセージをしゃべるかどうか？
	const SAI_speech_set = function(value){
		switch(value){
		case 0:
		case '0':
		case false:
		case 'false':
		default:
			value = 0;
			break;

		case 1:
		case '1':
		case true:
		case 'true':
			value = 1;
			break;
		}

		// UIを更新。
		if(sai_id_checkbox_speech_on_off.checked != !!value)
			sai_id_checkbox_speech_on_off.checked = !!value;

		// ローカルストレージに記憶。
		localStorage.setItem('saiminSpeech', value.toString());
	}

	// 画面点滅（サブリミナル）の種類を指定する。
	const SAI_blink_set_type = function(value){
		value = parseInt(value); // 整数に変換。

		// テキストとヘルツ数を取得する。
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
		// 点滅間隔をセットする。
		sai_blinking_interval = (hz > 0) ? (1.0 / hz) : 0;

		// <input>タグの値を更新する。
		if(sai_id_range_blink_type.value != value.toString())
			sai_id_range_blink_type.value = value.toString();

		// outputにテキストをセット。
		sai_id_text_blink_output.textContent = text;

		// ローカルストレージに点滅タイプを記憶。
		localStorage.setItem('saiminBlinkType', value);
	}

	// 催眠が解除されたか？
	const SAI_is_hypno_released = function(){
		if(!sai_hypnosis_releasing_time)
			return false;
		return ((new Date().getTime()) - sai_hypnosis_releasing_time) >= 3000;
	}

	// KraKraの言語をセットして、UIをローカライズする。
	const SAI_set_language = function(lang){
		// 言語が指定されてなければとりあえず英語。
		if(!lang)
			lang = 'en';

		// ローカライズ。translation.jsを参照。
		trans_localize(lang);

		// 「バージョン情報」テキストを一番上にスクロール。
		sai_id_text_notice.scrollLeft = sai_id_text_notice.scrollTop = 0;

		// 「催眠解除中」の画像を更新。
		sai_hypno_releasing_img = new Image();
		if(SAI_is_hypno_released()){
			sai_hypno_releasing_img.src = trans_getText('TEXT_HYPNOSIS_RELEASED_IMG');
		}else{
			sai_hypno_releasing_img.src = trans_getText('TEXT_KILLING_HYPNOSIS_IMG');
		}

		// ロゴ画像も翻訳されているので更新が必要。
		sai_logo_img = new Image();
		sai_logo_img.src = trans_getText('TEXT_LOGO');

		// 「ここをタップ」画像も翻訳されている。
		sai_tap_here_img = new Image();
		sai_tap_here_img.src = trans_getText('TEXT_TAP_HERE');

		// 「催眠解除成功」の画像も更新。
		sai_all_released_img = new Image();
		sai_all_released_img.src = trans_getText('TEXT_ALL_RELEASED_IMG');

		// 言語<select>の値も更新。
		sai_id_select_language_1.value = lang;

		// 画面点滅タイプのUIも更新。
		SAI_blink_set_type(sai_id_range_blink_type.value);

		// メッセージサイズのUIも更新。
		SAI_message_set_size(sai_id_select_message_size.value, true);

		// 映像のスピードの種類のUIも更新。
		SAI_speed_set_type(localStorage.getItem('saiminSpeedType'));

		// Android側にも言語変更を通知する。
		try{
			android.setLanguage(lang);
		}catch(error){
			;
		}
	}

	// KraKraのスキンをセットする。
	const SAI_set_skin = function(skin, reset_colors = false){
		// スキン設定がなければデフォルトを使う。
		if(!skin)
			skin = trans_getDefaultSkin();

		// 設定をUIに反映する。
		trans_skin = skin = skin.toString();
		sai_id_select_skin.value = skin;

		// ローカルストレージに記憶。
		localStorage.setItem('saiminSkin', skin);

		// スタイルシートも更新。
		stylesheet_1.href = trans_getStyleSheet();

		// 色をリセットするか？
		if (reset_colors){
			sai_id_color_1st.value = trans_getColor('COLOR_1ST');
			sai_id_color_2nd.value = trans_getColor('COLOR_2ND');
			localStorage.setItem('saimin1stColor', sai_id_color_1st.value);
			localStorage.setItem('saimin2ndColor', sai_id_color_2nd.value);
		}
	};

	// スピーチに対応するために、テキストを調整する。
	const SAI_adjust_text_for_speech = function(text){
		text = text.replace('～', 'ー');

		// {{LANGUAGE_SPECIFIC}}
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

	// スピーチを開始する。
	const SAI_speech_start = function(text, once_only = false){
		console.log('SAI_speech_start');

		// 開始する前にいったんキャンセルする。
		SAI_speech_cancel();

		// スピーチ用にテキストを調整する。
		text = SAI_adjust_text_for_speech(text);

		// 音量。
		let voice_volume = parseFloat(sai_id_range_voice_volume.value) / 100.0;

		try{
			// Android側のスピーチを開始する。Androidでなければ失敗。
			android.speechLoop(text, voice_volume);
		}catch(error){ // Androidではない。Web側のスピーチを開始する。
			if(window.speechSynthesis){ // 音声合成に対応していれば
				if(!once_only)
					text = text.repeat(32); // 32回繰り返す。
				let speech = new SpeechSynthesisUtterance(text);
				speech.pitch = 0.6; // 音声の高さ。
				speech.rate = 0.4; // 音声の速さ。
				speech.volume = voice_volume; // 音量。
				// {{LANGUAGE_SPECIFIC}}: スピーチの言語をセットする。
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
				else if(trans_currentLanguage == 'es' || trans_currentLanguage == 'es-ES') // Spanish
					speech.lang = 'es-ES';
				else // English is default
					speech.lang = 'en-US';
				// 実際にスピーチを開始する。
				window.speechSynthesis.speak(speech);
				console.log('speech');
			}
		}
	}

	// 大きな画面か？
	const SAI_screen_is_large = function(ctx){
		return ctx.canvas.width >= 1200 || ctx.canvas.height >= 1200;
	}

	// 効果音の音量。
	const SAI_sound_set_volume = function(value){
		value = parseInt(value);

		// 音量をセットする。
		sai_id_range_sound_volume.value = value;
		sai_id_text_sound_volume_output.textContent = value.toString() + "%";
		if(sai_sound_object){
			sai_sound_object.volume = value / 100.0;
		}

		// ローカルストレージに記憶する。
		localStorage.setItem('saiminSoundVolume', value.toString());
	}

	// 音声オブジェクトを作成する。
	const SAI_sound_create = function(){
		// 音があった場合、まずは止める。
		if(sai_sound_object)
			sai_sound_object.pause();
		// 音声名がなければ音声オブジェクトなし。
		if(!sai_sound_name){
			sai_sound_object = null;
			return;
		}

		sai_sound_object = new Audio('sn/' + sai_sound_name + '.mp3');
		sai_sound_object.addEventListener('ended', function(e){ // 音声が停止した？
			// UIを更新する。
			sai_id_image_config_play_pause.classList.remove('playing');
			sai_id_button_sound_play.classList.remove('sai_class_checked');
		});
	}

	// 音声の名前をセットし、音声オブジェクトを作成する。設定を保存する。
	const SAI_sound_set_name = function(value){
		// 音声のバリデーション。
		if(value.indexOf('sn') == 0)
			value = '';
		// 音声を停止する。
		SAI_sound_pause();
		// 変数に音声の名前を記憶。
		sai_sound_name = value;
		// 必要なら音声オブジェクトを作成するか、破棄する。
		SAI_sound_create();
		// 音声の選択を更新。
		sai_id_select_sound.value = value;
		// ローカルストレージに記憶する。
		localStorage.setItem('saiminSoundName', sai_sound_name);
	}

	// 映像切り替えの音の有無をセットする。
	const SAI_set_type_sound = function(value, test = false){
		// ローカルストレージから来た値は文字列かもしれない。正規化。
		switch(value){
		case true:
		case 'true':
		case '1':
			value = 1;
			break;
		default:
			value = 0;
			break;
		}

		// 映像切り替えの種類を整数値でセットする。
		sai_switch_sound_type = parseInt(value);

		// UIを更新する。
		sai_id_checkbox_switching_sound.checked = !!value;

		// ローカルストレージに記憶する。
		localStorage.setItem('saiminSwitchSound', value.toString());

		// テストならば実際に音を出す。
		if(test)
			SAI_sound_play_switch();
	}

	// 画面の明るさをセットする。
	const SAI_screen_set_brightness = function(value){
		try{
			// Android側で明るさをセット。Androidでなければ失敗。
			android.setBrightness(value);
		}catch(error){ // Androidではなかった。
			// 何もできないのでとりあえずログ出力。
			console.log("android.setBrightness(" + value + ") failed: " + error);
		}

		// 明るさのUIを更新。
		sai_id_select_brightness.value = value;

		// ローカルストレージに記憶する。
		localStorage.setItem('saiminScreenBrightness', value);
	}

	// 渦の向きをセットする。
	const SAI_set_vortex_direction = function(value){
		switch(value){
		case 'clockwise': case 'counterclockwise': break;
		default: value = 'clockwise';
		}
		sai_id_select_vortex_direction.value = value;
		// スパイラルの画像も更新。
		if (value == 'counterclockwise')
			sai_spiral_img.src = 'img/spiral2.svg';
		else
			sai_spiral_img.src = 'img/spiral.svg';
		// ローカルストレージに記憶する。
		localStorage.setItem('saiminVortexDirection', value);
	};

	// メッセージボイスの音量を設定する関数。
	const SAI_message_set_voice_volume = function(value){
		value = parseFloat(value); // 値を浮動小数点数に変換。

		// 音量を制限。
		if (value >= 100)
			value = 100;
		if (value <= 0)
			value = 0;
		
		// 必要ならUIを更新。
		if(value != sai_id_range_voice_volume.value)
			sai_id_range_voice_volume.value = value;

		// outputのUIを更新。
		let text = parseInt(value).toString() + "%";
		trans_setHtmlText(sai_id_text_voice_volume_output, text);

		// ローカルストレージに記憶。
		localStorage.setItem('saiminMessageVolume', value.toString());
	}

	// モーションブラーを設定する関数。
	const SAI_set_motion_blur = function(value){
		value = parseInt(value);
		if(value < sai_id_range_motion_blur.min) value = sai_id_range_motion_blur.min;
		else if(value > sai_id_range_motion_blur.max) value = sai_id_range_motion_blur.max;
		sai_id_range_motion_blur.value = value;
		sai_id_text_motion_blur_output.textContent = (value * 10) + '%';
		// ローカルストレージに記憶。
		localStorage.setItem('saiminMotionBlur', value.toString());
	}

	// メッセージの表示サイズをセットする。
	const SAI_message_set_size = function(value){
		// いったん、すべての文字サイズ設定クラスを削除。
		sai_id_text_floating_1.classList.remove('sai_class_font_size_small');
		sai_id_text_floating_1.classList.remove('sai_class_font_size_normal');
		sai_id_text_floating_1.classList.remove('sai_class_font_size_large');
		sai_id_text_floating_1.classList.remove('sai_class_font_size_huge');
		sai_id_text_floating_2.classList.remove('sai_class_font_size_small');
		sai_id_text_floating_2.classList.remove('sai_class_font_size_normal');
		sai_id_text_floating_2.classList.remove('sai_class_font_size_large');
		sai_id_text_floating_2.classList.remove('sai_class_font_size_huge');

		value = value.toString(); // 値を文字列に変換。

		// 文字サイズ設定クラスを追加。テキストを取得。
		let text = '';
		switch (value){
		case 'huge':
		case '4':
			sai_id_text_floating_1.classList.add('sai_class_font_size_huge');
			sai_id_text_floating_2.classList.add('sai_class_font_size_huge');
			value = '4';
			text = trans_getText('TEXT_SIZE_HUGE');
			sai_message_size = 4;
			break;
		case 'large':
		case '3':
			sai_id_text_floating_1.classList.add('sai_class_font_size_large');
			sai_id_text_floating_2.classList.add('sai_class_font_size_large');
			value = '3';
			text = trans_getText('TEXT_SIZE_LARGE');
			sai_message_size = 3;
			break;
		case 'normal':
		case '2':
		default:
			sai_id_text_floating_1.classList.add('sai_class_font_size_normal');
			sai_id_text_floating_2.classList.add('sai_class_font_size_normal');
			value = '2';
			text = trans_getText('TEXT_SIZE_NORMAL');
			sai_message_size = 2;
			break;
		case 'small':
		case '1':
			sai_id_text_floating_1.classList.add('sai_class_font_size_small');
			sai_id_text_floating_2.classList.add('sai_class_font_size_small');
			value = '1';
			text = trans_getText('TEXT_SIZE_SMALL');
			sai_message_size = 1;
			break;
		}

		// 必要ならUIを更新。
		if(value != sai_id_select_message_size.value)
			sai_id_select_message_size.value = value;

		// outputのUIを更新。
		trans_setHtmlText(sai_id_select_message_size_output, text);

		// ローカルストレージに記憶。
		localStorage.setItem('saiminMessageSize', value);
	}

	// 映像スピードをセットする。
	const SAI_speed_set_type = function(value){
		// まず「不規則」ではないことを仮定。
		sai_speed_irregular = false;

		// スピードとテキストと不規則性を取得。
		let text;
		switch (value){
		case 'slow':
			sai_speed = 27.5;
			text = trans_getText('TEXT_SPEED_SLOW');
			break;
		case 'normal':
			sai_speed = 45.0;
			text = trans_getText('TEXT_SPEED_NORMAL');
			break;
		case 'irregular':
			sai_speed = 70.0;
			sai_speed_irregular = true;
			text = trans_getText('TEXT_SPEED_IRREGULAR');
			break;
		case 'fast':
			sai_speed = 70.0;
			text = trans_getText('TEXT_SPEED_FAST');
			break;
		default:
			sai_speed = parseFloat(value);
			if(sai_speed == 0){
				text = trans_getText('TEXT_SPEED_ZERO');
			}else if(sai_speed <= 27.5){
				text = trans_getText('TEXT_SPEED_SLOW');
			}else if(sai_speed <= 45.0){
				text = trans_getText('TEXT_SPEED_NORMAL');
			}else if(sai_speed <= 70.0){
				text = trans_getText('TEXT_SPEED_FAST');
			}else{
				text = trans_getText('TEXT_SPEED_SUPER_FAST');
			}
			break;
		}

		// outputのUIを更新。
		sai_id_text_speed_output.textContent = text;

		// <input>を更新。
		if(sai_speed != parseFloat(sai_id_range_speed_type.value)){
			if(sai_speed_irregular)
				sai_id_range_speed_type.value = sai_speed;
			else
				sai_id_range_speed_type.value = sai_speed;
		}
		if(sai_id_range_speed_type.disabled != sai_speed_irregular){
			sai_id_range_speed_type.disabled = sai_speed_irregular;
		}
		if(sai_id_checkbox_speed_irregular.checked != sai_speed_irregular){
			sai_id_checkbox_speed_irregular.checked = sai_speed_irregular;
		}

		// ローカルストレージに記憶。
		if(sai_speed_irregular)
			localStorage.setItem('saiminSpeedType', 'irregular');
		else
			localStorage.setItem('saiminSpeedType', sai_speed);
	}

	// 画面分割の種類をセットする。
	const SAI_screen_set_split = function(value){
		value = parseInt(value); // 整数値に変換する。

		// チェックボックスと変数を更新。
		switch(value){
		case 2:
			sai_id_checkbox_split.checked = true;
			sai_screen_split = 2;
			break;
		case 1:
		default:
			sai_id_checkbox_split.checked = false;
			sai_screen_split = 1;
			break;
		}

		// ローカルストレージに記憶。
		localStorage.setItem('saiminDivision', sai_screen_split.toString());
	}

	// カウントダウンの有無をセットする。なければカウントダウンしない。
	const SAI_set_count_down = function(value){
		// ローカルストレージから来た値は文字列かもしれない。複数の型に対応。
		switch(value){
		case "true":
		case true:
		case "1":
			value = 1;
			break;
		case "false":
		case false:
		case "0":
			value = 0;
			break;
		}

		// UIを更新。
		if(value)
			sai_id_checkbox_count_down.checked = true;
		else
			sai_id_checkbox_count_down.checked = false;

		// ローカルストレージに記憶。
		localStorage.setItem('saiminCountDown', value.toString());
	}

	// 矢印の表示設定をセットする。
	const SAI_set_arrows = function(value){
		// ローカルストレージから来た値は文字列かもしれない。複数の型に対応。
		switch(value){
		case "true":
		case true:
		case "1":
			value = 1;
			break;
		case "false":
		case false:
		case "0":
			value = 0;
			break;
		}

		// UIを更新。
		if(value)
			sai_id_checkbox_arrows.checked = true;
		else
			sai_id_checkbox_arrows.checked = false;

		// ローカルストレージに記憶。
		localStorage.setItem('saiminShowArrows', value.toString());
	}

	// 映像の進行を支配する関数。
	const SAI_get_tick_count = function(){
		return sai_counter;
	}
	const SAI_get_tick_count_2 = function(){
		return sai_counter * 10000 / (1 + Math.min(sai_screen_width, sai_screen_height));
	}

	// 映像の種類を取得する。
	const SAI_pic_get_type = function(){
		return sai_pic_type;
	};

	// 映像の種類の整数値をセットする。
	const SAI_pic_set_type = function(value){
		value = parseInt(value); // 整数に変換して変数に記憶。

		if (value != -1){
			sai_hypnosis_releasing_time = null;
			sai_pic_type = value;
		}else{
			sai_hypnosis_releasing_time = (new Date()).getTime();
		}

		if(sai_hypnosis_releasing_time){ // 「催眠解除」の場合。
			// スピーチをキャンセル。
			SAI_speech_cancel();
			sai_id_button_speech.classList.remove('sai_class_checked');

			// 音声を停止。
			SAI_sound_pause();

			// 催眠解除クラスを追加。
			sai_id_button_sound_play.classList.add('sai_class_releasing');
			sai_id_button_message.classList.add('sai_class_releasing');
			sai_id_button_speech.classList.add('sai_class_releasing');

			// 催眠解除の画像のソースを更新。
			sai_hypno_releasing_img.src = trans_getText('TEXT_KILLING_HYPNOSIS_IMG');

			// 必要なら催眠解除の音声を流す。
			if(sai_id_checkbox_auto_play_sound.checked){
				if(!sai_releasing_sound)
					sai_releasing_sound = new Audio(trans_getText('TEXT_MP3_RELEASED_HYPNOSIS'));
				sai_releasing_sound.currentTime = 0;
				sai_releasing_sound.play();
			}
		}else{
			if(sai_old_pic_type == -1){ // 「催眠解除中」か？
				sai_message_text = ''; // メッセージテキストをクリア。

				// スピーチをキャンセル。
				sai_id_button_speech.classList.remove('sai_class_checked');
				SAI_speech_cancel();
			}

			// 「催眠解除中」ではない。
			sai_id_button_sound_play.classList.remove('sai_class_releasing');
			sai_id_button_message.classList.remove('sai_class_releasing');
			sai_id_button_speech.classList.remove('sai_class_releasing');
		}

		// 映像の種類のUIを更新する。
		sai_id_select_pic_type.value = sai_pic_type.toString();

		// ローカルストレージに記憶。
		localStorage.setItem('saiminType', sai_pic_type.toString());

		// Android側に映像の種類の変更を通知。
		try{
			android.setPicType(sai_pic_type);
		}catch(error){
			;
		}

		sai_old_pic_type = value;
	};

	// メッセージテキストをセットする。
	const SAI_message_set_text = function(txt){
		console.log('SAI_message_set_text', txt);

		// メッセージテキストを調整。
		sai_message_text = txt.replace(trans_getText('TEXT_FULLWIDTH_SPACE'), '  ').trim();

		// ローカルストレージに記憶。
		localStorage.setItem('saiminText', sai_message_text);

		// 停止中でなく、スピーチが有効な時
		if(!sai_stopping && sai_id_checkbox_speech_on_off.checked){
			// メッセージテキストがあればスピーチを開始、なければスピーチをキャンセル。
			if(sai_message_text){
				SAI_speech_start(sai_message_text);
			}else{
				SAI_speech_cancel();
			}
		}

		// メッセージテキストをセットする。
		let elements = document.getElementsByClassName('sai_class_text_message');
		for(let element of elements){
			trans_setHtmlText(element, sai_message_text);
		}
	}

	// 映像の回転の向きをセットする。
	const SAI_rotation_set = function(value){
		// valueは文字列かもしれないし、ブール値かもしれない。
		switch(value){
		case 'normal':
		case false:
		case 0:
		default:
			sai_id_checkbox_rotation.checked = false; // UIを更新。
			sai_rotation_type = 'normal';
			break;
		case 'counter':
		case true:
		case 1:
			sai_id_checkbox_rotation.checked = true; // UIを更新。
			sai_rotation_type = 'counter';
			break;
		}

		// ローカルストレージに記憶。
		localStorage.setItem('saiminRotation', sai_rotation_type.toString());
	}

	// フルスクリーンモード。
	const SAI_screen_set_fullscreen_mode = function(value){
		switch(value){
		case '1':
		case 'true':
		case true:
			value = 1;
			break;
		case '0':
		case 'false':
		case false:
		case null:
			value = 0;
			break;
		}

		sai_id_checkbox_fullscreen.checked = (value == 1);

		// ローカルストレージに記憶。
		localStorage.setItem('saiminFullscreen', value.toString());
	}

	// 音声の自動繰り返し。
	const SAI_sound_set_auto_repeat = function(value){
		switch(value){
		case '1':
		case 'true':
		case true:
			value = 1;
			break;
		case '0':
		case 'false':
		case false:
		case null:
			value = 0;
			break;
		}

		sai_id_checkbox_auto_repeat_sound.checked = (value == 1);

		// ローカルストレージに記憶。
		localStorage.setItem('saiminSoundAutoRepeat', value.toString());
	}

	// スクリーンのサイズをセットする。必要ならキャンバスのサイズも変更する。
	const SAI_screen_fit_canvas = function(){
		console.log('SAI_screen_fit_canvas');
		sai_screen_width = sai_id_canvas_01.width = sai_id_canvas_02.width = window.innerWidth;
		sai_screen_height = sai_id_canvas_01.height = sai_id_canvas_02.height = window.innerHeight;
		// 万華鏡の半径。
		sai_kaleido_radius = (sai_screen_width + sai_screen_height) * 0.1;
	}

	// スクリーンのサイズをセットし、必要なら画面を復帰する。
	const SAI_screen_fit = function(){
		SAI_screen_fit_canvas();
		if(localStorage.getItem('saiminHelpShowing')){
			SAI_choose_page(sai_id_page_agreement);
		}else if(localStorage.getItem('saiminConfigShowing')){
			SAI_config();
		}
	}

	// 「バージョン情報」にバージョン番号をセットする。
	const SAI_update_version_display = function(){
		let nativeVersion = SAI_get_native_app_version();
		let text = sai_id_text_version.textContent;
		if(nativeVersion){
			text = text.replace('[[VERSION]]', nativeVersion + '(native)');
		}else{
			text = text.replace('[[VERSION]]', sai_VERSION + '(web)');
		}
		sai_id_text_version.textContent = text;
	}

	// ユーザを受け入れる。
	const SAI_user_accepted = function(){
		// メインコントロール群を表示する。
		SAI_show_main_controls(true);

		// 映像の種類を初期化する。
		let type = localStorage.getItem('saiminType');
		if(type && type != -1){
			SAI_pic_set_type(type);
		}else{
			SAI_pic_set_type(0);
		}

		// 必要ならアニメーションを要求する。
		if(!sai_request_anime)
			sai_request_anime = window.requestAnimationFrame(SAI_draw_all);

		// メインページに飛ばす。
		SAI_choose_page(sai_id_page_main);
	}

	// 初期時の言語選択を自動化する。
	const SAI_language_choose = function(){
		// ローカルストレージから言語を取得。
		let lang = localStorage.getItem('saiminLanguage3');
		if(!lang){ // 取得できなければブラウザからデフォルトの言語を取得。
			sai_first_time = true; // これは初回時。
			trans_currentLanguage = lang = trans_getDefaultLanguage();
			SAI_set_skin(null);
		}
		sai_id_select_language_2.value = lang; // UIを更新。
	}

	// 「バージョン情報」ダイアログ。
	const SAI_help_and_agreement = function(){
		// バージョン番号の表示を更新。
		SAI_update_version_display();

		// テキストの一番上にスクロール。
		setTimeout(function(){
			sai_id_text_notice.scrollLeft = sai_id_text_notice.scrollTop = 0;
		}, 100);

		// ユーザーが同意したか？ ボタンのテキストを変える。「戻る」ボタンの表示を切り替える。
		if(localStorage.getItem('saiminUserAccepted')){
			trans_setHtmlText(sai_id_button_agree, trans_getText('TEXT_OK'));
			sai_id_button_agreement_back.classList.remove('sai_class_invisible');
			sai_id_button_init_app.classList.remove('sai_class_invisible');
		}else{
			trans_setHtmlText(sai_id_button_agree, trans_getText('TEXT_I_AGREE'));
			sai_id_button_agreement_back.classList.add('sai_class_invisible');
			sai_id_button_init_app.classList.add('sai_class_invisible');
		}

		// ローカルストレージに表示状態を記憶。
		localStorage.setItem('saiminHelpShowing', '1');
		// 画面遷移前に音声の停止。
		SAI_sound_pause();
		// 同意ページに移動。
		SAI_choose_page(sai_id_page_agreement);
	}

	// 「設定」ダイアログ。
	const SAI_config = function(){
		// ローカルストレージに表示状態を記憶。
		localStorage.setItem('saiminConfigShowing', '1');
		// 画面遷移前に音声の停止。
		SAI_sound_pause();
		// 「設定」ページに飛ばす。
		SAI_choose_page(sai_id_page_config);
	}

	// 円の描画。
	const SAI_draw_circle = function(ctx, x, y, radius, is_fill = true){
		ctx.beginPath();
		ctx.arc(x, y, Math.abs(radius), 0, 2 * Math.PI);
		ctx.closePath();
		if(is_fill)
			ctx.fill();
		else
			ctx.stroke();
	}

	// 円の描画２。
	// いくつかの環境では大きな円を描くときにSAI_draw_circleを使うと遅くなる。
	// こちらの関数は自前で円に近い図形（正多角形）を描画する。
	const SAI_draw_circle_2 = function(ctx, x, y, radius, is_fill = true, N = 16){
		ctx.beginPath();
		for(let i = 0; i < N; ++i){
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

	// 線分の描画。
	const SAI_draw_line = function(ctx, x0, y0, x1, y1, lineWidth){
		ctx.lineWidth = lineWidth;
		ctx.beginPath();
		ctx.moveTo(x0, y0);
		ctx.lineTo(x1, y1);
		ctx.stroke();
	}

	// 線分の描画２。
	// いくつかの環境ではSAI_draw_lineでかなり太い線を描くと時間がかかる。
	// こちらの関数は自前で線をレンダリングする。
	const SAI_draw_line_2 = function(ctx, x0, y0, x1, y1, lineWidth){
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

	// 矢印の描画。
	const SAI_draw_arrow = function(ctx, x0, y0, x1, y1, lineWidth){
		ctx.strokeStyle = ctx.fillStyle;
		ctx.lineCap = 'round';
		SAI_draw_line(ctx, x0, y0, x1, y1, lineWidth);
		let comp0 = new Complex({re:x1 - x0, im:y1 - y0});
		let abs = comp0.abs();
		comp0 = comp0.div(abs);
		let comp1 = new Complex({abs:1, arg:Math.PI * 30 / 180});
		let comp2 = comp0.div(comp1).mul(abs / 3);
		let comp3 = comp0.mul(comp1).mul(abs / 3);
		SAI_draw_line(ctx, x1, y1, x1 - comp2.re, y1 - comp2.im, lineWidth);
		SAI_draw_line(ctx, x1, y1, x1 - comp3.re, y1 - comp3.im, lineWidth);
	}

	// ハート形の描画。
	const SAI_draw_heart = function(ctx, x0, y0, x1, y1){
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

	// 目の描画。
	const SAI_draw_eye = function(ctx, x0, y0, r, opened = 1.0, alpha = 1.0, right = true){
		let r025 = r * 0.25;
		let r05 = r025 * 2 * opened;

		if (SAI_mod(sai_counter, 200) > 150){
			if (right){
				if (sai_eye_right_img.complete){
					r *= 1.5;
					r05 *= 1.5;
					ctx.drawImage(sai_eye_right_img, x0 - r, y0 - r05, 2 * r, 2 * r05);
					return;
				}
			}else{
				if (sai_eye_left_img.complete){
					r *= 1.5;
					r05 *= 1.5;
					ctx.drawImage(sai_eye_left_img, x0 - r, y0 - r05, 2 * r, 2 * r05);
					return;
				}
			}
		}

		ctx.strokeStyle = `rgba(0, 0, 0, ${alpha * 100.0}%)`;
		ctx.lineWidth = r * 0.10;

		ctx.beginPath();
		ctx.moveTo(x0, y0 - r * 0.75);
		ctx.lineTo(x0, y0 + r * 0.75);
		ctx.stroke();

		ctx.beginPath();
		ctx.moveTo(x0 - r05, y0 - r05);
		ctx.lineTo(x0 + r05, y0 + r05);
		ctx.stroke();

		ctx.beginPath();
		ctx.moveTo(x0 + r05, y0 - r05);
		ctx.lineTo(x0 - r05, y0 + r05);
		ctx.stroke();

		ctx.beginPath();
		ctx.moveTo(x0 - r, y0);
		ctx.bezierCurveTo(x0 - r025, y0 - r05, x0 + r025, y0 - r05, x0 + r, y0);
		ctx.bezierCurveTo(x0 + r025, y0 + r05, x0 - r025, y0 + r05, x0 - r, y0);
		ctx.closePath();

		ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 100.0}%)`;
		ctx.fill();

		ctx.strokeStyle = `rgba(0, 0, 0, ${alpha * 100.0}%)`;
		ctx.lineWidth = r * 0.10;
		ctx.stroke();

		ctx.fillStyle = `rgba(50, 0, 220, ${alpha * 100.0}%)`;
		SAI_draw_circle(ctx, x0, y0, r / 3 * opened, true);
		ctx.fillStyle = `rgba(20, 0, 90, ${alpha * 100.0}%)`;
		SAI_draw_circle(ctx, x0, y0, r / 5 * opened, true);
	}

	// 目の描画２。
	const SAI_draw_eye_2 = function(ctx, x0, y0, r, opened = 1.0){
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
		ctx.lineWidth = r * 0.10;
		ctx.stroke();

		ctx.fillStyle = "#404";
		SAI_draw_circle(ctx, x0, y0, r / 3 * opened, true);
		ctx.fillStyle = "#508";
		SAI_draw_circle(ctx, x0, y0, r / 4 * opened, true);
	}

	// きらめきの描画。
	const SAI_draw_light = function(ctx, x0, y0, radius){
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

	// 長方形領域(px, py, dx, dy)をクリッピングする。
	const SAI_clip_rect = function(ctx, px, py, dx, dy){
		ctx.beginPath();
		ctx.moveTo(px, py);
		ctx.lineTo(px + dx, py);
		ctx.lineTo(px + dx, py + dy);
		ctx.lineTo(px, py + dy);
		ctx.closePath();
		ctx.clip();
	}

	// サブリミナルの描画。
	const SAI_draw_subliminal = function(ctx, px, py, dx, dy){
		ctx.save(); // 現在の座標系やクリッピングなどを保存する。

		// 長方形領域(px, py, dx, dy)をクリッピングする。
		SAI_clip_rect(ctx, px, py, dx, dy);

		let count = SAI_get_tick_count();
		let factor1 = Math.sin(count * 0.1), factor2 = Math.abs(Math.cos(count * 0.03));

		// 指定した色で長方形領域を塗りつぶす。
		ctx.fillStyle = `rgb(${factor2 * 30 + 40}%, 20%, ${40}%)`;
		ctx.fillRect(px, py, dx, dy);

		// 画面中央の座標を計算する。
		let qx = px + dx / 2, qy = py + dy / 2;

		// ハート形を描画する。
		ctx.fillStyle = '#f03';
		let mxy = Math.min(dx, dy) * (0.7 + 0.2 * factor1);
		SAI_draw_heart(ctx, qx, qy - mxy / 2, qx, qy + mxy / 2);

		ctx.restore(); // ctx.saveで保存した情報で元に戻す。
	}

	// 映像「画-1: 催眠解除」の描画。
	// pic-1: Release Hyponosis
	const SAI_draw_pic_minus_1 = function(ctx, px, py, dx, dy){
		ctx.save(); // 現在の座標系やクリッピングなどを保存する。

		// 長方形領域(px, py, dx, dy)をクリッピングする。
		SAI_clip_rect(ctx, px, py, dx, dy);

		// 画面中央の座標を計算する。
		let qx = px + dx / 2, qy = py + dy / 2;

		// 画面の辺の平均の長さ。
		let dxy = (dx + dy) / 2;

		// 黒で長方形領域を塗りつぶす。
		ctx.fillStyle = 'black';
		ctx.fillRect(px, py, dx, dy);

		let count2 = -SAI_get_tick_count();
		let factor = 1.2 * Math.abs(Math.sin(count2 * 0.05));

		if(SAI_is_hypno_released())
			factor = 1.0;

		// 黄色っぽくて丸いグラデーションを描画する。
		let grd = ctx.createRadialGradient(qx, qy, 0, qx, qy, dxy * factor);
		grd.addColorStop(0, 'rgba(255, 255, 0, 1.0)');
		grd.addColorStop(1, 'rgba(255, 255, 255, 1.0)');
		ctx.fillStyle = grd;
		SAI_draw_circle(ctx, qx, qy, dxy, true);

		// 黒い丸を描画する。
		ctx.strokeStyle = "black";
		ctx.lineWidth = 10;
		SAI_draw_circle(ctx, qx, qy, (dx + dy + 10) / 5 * factor + dxy * 0.2, false);

		// 「催眠解放中」のイメージを描画する。
		if(sai_hypno_releasing_img.complete){
			let x = px + (dx - sai_hypno_releasing_img.width) / 2;
			let y = py + (dy - sai_hypno_releasing_img.height) / 2 - dy * 0.1;
			ctx.drawImage(sai_hypno_releasing_img, x, y);
		}

		// 「催眠解除完了」のイメージを描画する。
		if(SAI_is_hypno_released() && sai_all_released_img.complete){
			let x = px + (dx - sai_all_released_img.width) / 2;
			let y = py + (dy - sai_all_released_img.height) / 2 + dy * 0.2;
			ctx.drawImage(sai_all_released_img, x, y);
		}

		ctx.restore(); // ctx.saveで保存した情報で元に戻す。
	}

	// 1番目の色を取得。
	const SAI_color_get_1st = function(){
		if(sai_id_checkbox_color_1st_rainbow.checked){
			let value = SAI_mod(SAI_get_tick_count() * 0.02, 1);
			return `hsl(${value * 360 % 360}, 100%, 50%)`;
		}else{
			return sai_id_color_1st.value;
		}
	}

	// 2番目の色を取得。
	const SAI_color_get_2nd = function(){
		if(sai_id_checkbox_color_2nd_rainbow.checked){
			let value = SAI_mod(SAI_get_tick_count() * 0.02 + 0.5, 1);
			return `hsl(${value * 360 % 360}, 100%, 50%)`;
		}else{
			return sai_id_color_2nd.value;
		}
	}

	// フォーカス矢印（複数）を描画する。
	const SAI_draw_focus_arrows = function(ctx, qx, qy, dx, dy){
		if(!sai_id_checkbox_arrows.checked)
			return;
		let dxy = (dx + dy) / 2;
		let cnt = SAI_get_tick_count() * 0.02;
		let rx = dxy * 0.05 * Math.cos(cnt) * (2.0 + Math.sin(cnt * 4.0));
		let ry = dxy * 0.05 * Math.sin(cnt) * (2.0 + Math.sin(cnt * 4.0));
		let rx0 = rx * 2.6;
		let ry0 = ry * 2.6;
		let rx1 = rx * 1.5;
		let ry1 = ry * 1.5;
		ctx.fillStyle = 'yellow';
		SAI_draw_arrow(ctx, qx + rx0, qy + ry0, qx + rx1, qy + ry1, 14);
		SAI_draw_arrow(ctx, qx - rx0, qy - ry0, qx - rx1, qy - ry1, 14);
		ctx.fillStyle = 'black';
		SAI_draw_arrow(ctx, qx + rx0, qy + ry0, qx + rx1, qy + ry1, 5);
		SAI_draw_arrow(ctx, qx - rx0, qy - ry0, qx - rx1, qy - ry1, 5);
	};

	// 映像「画0: ダミー画面（練習用）」の描画。
	// pic0: Dummy Screen (for practice)
	const SAI_draw_pic_00 = function(ctx, px, py, dx, dy){
		ctx.save(); // 現在の座標系やクリッピングなどを保存する。

		// 長方形領域(px, py, dx, dy)をクリッピングする。
		SAI_clip_rect(ctx, px, py, dx, dy);

		// 画面中央の座標を計算する。
		let qx = px + dx / 2, qy = py + dy / 2;

		// 画面の辺の平均の長さ。
		let dxy = (dx + dy) / 2;

		// 黒で長方形領域を塗りつぶす。
		ctx.fillStyle = 'black';
		ctx.fillRect(px, py, dx, dy);

		// ピンク色の丸いグラデーションを描画する。
		let grd = ctx.createRadialGradient(qx, qy, 0, qx, qy, dxy * 0.5);
		grd.addColorStop(0, trans_getColor('COLOR_DUMMYPAGECOLOR0'));
		grd.addColorStop(1, trans_getColor('COLOR_DUMMYPAGECOLOR1'));
		ctx.fillStyle = grd;
		SAI_draw_circle(ctx, qx, qy, dxy, true);

		if(sai_logo_img.complete){ // ロゴイメージの読み込みが完了されたか？
			// 寸法を調整する。
			let width = sai_logo_img.width, height = sai_logo_img.height;
			while (width * 2 < sai_screen_width && height * 2 < sai_screen_height / 5){
				width *= 1.25;
				height *= 1.25;
			}
			while (width > sai_screen_width){
				width *= 0.75;
				height *= 0.75;
			}
			// 描画するロゴの位置を計算する。
			let x = px + (dx - width) / 2, y = py + (dy - height) * 0.4 - dy * 0.1;
			// ロゴを描画する。
			ctx.drawImage(sai_logo_img, x, y, width, height);
		}

		if(!sai_stopping && sai_tap_here_img.complete){
			// 停止中でなければ「タップして下さい」のイメージを描画する。
			let x = qx - sai_tap_here_img.width / 2, y = py + dy * 0.7;
			ctx.drawImage(sai_tap_here_img, x, y);
		}

		// フォーカス矢印を描画する。
		SAI_draw_focus_arrows(ctx, qx, qy, dx, dy);

		ctx.restore(); // ctx.saveで保存した情報で元に戻す。
	}

	// 映像「画1: 対数らせん」の描画。
	// pic1: Logarithmic Spiral
	const SAI_draw_pic_1_sub = function(ctx, px, py, dx, dy){
		ctx.save(); // 現在の座標系やクリッピングなどを保存する。

		// 長方形領域(px, py, dx, dy)をクリッピングする。
		SAI_clip_rect(ctx, px, py, dx, dy);

		// 映像の進行を表す変数。
		let count2 = -SAI_get_tick_count();

		// 画面の寸法を使って計算する。
		let qx = px + dx / 2, qy = py + dy / 2;
		let maxxy = Math.max(dx, dy), minxy = Math.min(dx, dy);
		let mxy = (maxxy + minxy) * 0.04;

		// 視覚的な酩酊感をもたらすために回転運動の中心点をすりこぎ運動させる。
		qx += mxy * Math.cos(count2 * 0.07);
		qy += mxy * Math.sin(count2 * 0.15);

		const num_lines = 20; // これは偶数でなければならない。
		const a = 1, b = 1.1; // らせんの係数。

		// 発散する渦巻きを表す多角形の頂点を構築する。
		let lines = [];
		for(let i = 0; i < num_lines; ++i){
			let delta_theta = 2 * Math.PI * i / num_lines;
			// 対数らせんの公式に従って頂点を追加していく。ただし偏角はdelta_thetaだけずらす。
			let line = [[qx, qy]];
			for(let theta = 0; theta <= 2 * Math.PI * 1.2; theta += 0.1){
				let r = a * Math.exp(b * theta);
				let t = theta + delta_theta;
				if (sai_id_select_vortex_direction.value == 'counterclockwise')
					t = -t;
				// 原点を中心として、これから描画する図形を回転する。
				t += -count2 * 0.12;
				let comp = new Complex({abs:r, arg:t});
				let x = comp.re, y = comp.im;
				// 画面中央を原点とする。
				x += qx;
				y += qy;
				line.push([x, y]);
			}
			lines.push(line);
		}

		// 多角形を描画する。
		let even = true;
		ctx.beginPath();
		ctx.moveTo(qx, qy);
		for(let i = 0; i < num_lines; ++i){
			let line = lines[i];
			if(even){ // 偶数回目はそのままの向き。
				for(let k = 0; k < line.length; ++k){
					ctx.lineTo(line[k][0], line[k][1]);
				}
			}else{ // 奇数回目は逆向き。
				for(let k = line.length - 1; k >= 0; --k)
					ctx.lineTo(line[k][0], line[k][1]);
			}
			even = !even;
		}
		ctx.closePath();
		ctx.fillStyle = SAI_color_get_1st(); // 1番目の色で塗りつぶす。
		ctx.fill('evenodd');
		ctx.rect(px, py, dx, dy);
		ctx.fillStyle = SAI_color_get_2nd(); // 2番目の色で塗りつぶす。
		ctx.fill('evenodd');

		ctx.restore(); // ctx.saveで保存した情報で元に戻す。
	}

	// 映像「画1: 対数らせん」の描画。
	// pic1: Logarithmic Spiral
	const SAI_draw_pic_01 = function(ctx, px, py, dx, dy){
		// 別のキャンバスに普通に描画する。
		let ctx2 = sai_id_canvas_02.getContext('2d', { alpha: false });
		ctx2.save();
		SAI_draw_pic_1_sub(ctx2, 0, 0, dx, dy);
		ctx2.restore();

		// 透明度を適用したイメージを転送する。これでモーションブラーが適用される。
		ctx.globalAlpha = 1 - sai_id_range_motion_blur.value * 0.1; // モーションブラーを掛ける。
		ctx.drawImage(sai_id_canvas_02, 0, 0, dx, dy, px, py, dx, dy);
		ctx.globalAlpha = 1; // 元に戻す。

		// フォーカス矢印を描画する。
		let qx = px + dx / 2;
		let qy = py + dy / 2;
		let maxxy = Math.max(dx, dy), minxy = Math.min(dx, dy);
		let mxy = (maxxy + minxy) * 0.04;
		let count2 = -SAI_get_tick_count();
		qx += mxy * Math.cos(count2 * 0.07);
		qy += mxy * Math.sin(count2 * 0.15);
		SAI_draw_focus_arrows(ctx, qx, qy, dx, dy);
	}

	// 映像「画2: 同心円状」の描画。
	// pic2: Concentric Circles
	const SAI_draw_pic_2_sub = function(ctx, px, py, dx, dy, outside=true){
		ctx.save(); // 現在の座標系やクリッピングなどを保存する。

		// 画面中央の座標を計算する。
		let qx = px + dx / 2, qy = py + dy / 2;

		// 画面の辺の平均の長さ。
		let dxy = (dx + dy) / 2;

		// 映像の進行を表す変数。
		let count2 = SAI_get_tick_count();
		let factor = (0.99 + Math.abs(Math.sin(count2 * 0.2)) * 0.01);

		// クリッピングする。!outsideならば円形に切り抜く。円形の半径は時刻により変動する。
		if(outside){
			SAI_clip_rect(ctx, px, py, dx, dy);
		}else{
			ctx.beginPath();
			let value = 0.2 + 0.2 * Math.abs(Math.sin(count2 * 0.02));
			ctx.arc(qx, qy, Math.abs(dxy) * value, 0, 2 * Math.PI);
			ctx.closePath();
			ctx.clip();
		}

		// 1番目の色で塗りつぶす。
		ctx.beginPath();
		ctx.fillStyle = SAI_color_get_1st();
		ctx.fillRect(px, py, dx, dy);

		// さまざまな計算をする。
		let dr0 = 30;
		if(SAI_screen_is_large(ctx)){
			dr0 *= 2;
			count2 *= 2;
			ctx.lineWidth = 30;
		}else{
			ctx.lineWidth = 15;
		}
		let dr = dr0 / 2 * factor;
		let radius = SAI_mod(count2 * 4, dr0);
		if(outside)
			radius = dr0 - radius;

		// 同心円状に描画する。
		let size = (dx + dy) * 0.4;
		ctx.beginPath();
		for(; radius < size; radius += dr0){
			ctx.arc(qx, qy, Math.abs(radius - ctx.lineWidth*0.5), 0, 2 * Math.PI);
			ctx.arc(qx, qy, Math.abs(radius + ctx.lineWidth*0.5), 0, 2 * Math.PI);
		}
		ctx.fillStyle = SAI_color_get_2nd();
		ctx.fill('evenodd');

		ctx.restore(); // ctx.saveで保存した情報で元に戻す。
	}

	// 映像「画2: 同心円状」の描画。
	// pic2: Concentric Circles
	const SAI_draw_pic_02 = function(ctx, px, py, dx, dy){
		// 別のキャンバスに描画する。必要に応じてクリッピングを掛ける。
		let ctx2 = sai_id_canvas_02.getContext('2d', { alpha: false });
		ctx2.save();
		SAI_draw_pic_2_sub(ctx2, 0, 0, dx, dy, true); // 外側を描画。
		SAI_draw_pic_2_sub(ctx2, 0, 0, dx, dy, false); // 内側を描画。
		ctx2.restore();

		// 透明度を適用したイメージを転送する。これでモーションブラーが適用される。
		ctx.globalAlpha = 1 - sai_id_range_motion_blur.value * 0.1; // モーションブラーを掛ける。
		ctx.drawImage(sai_id_canvas_02, 0, 0, dx, dy, px, py, dx, dy);
		ctx.globalAlpha = 1; // 元に戻す。

		// フォーカス矢印を描画する。
		let qx = px + dx / 2, qy = py + dy / 2;
		SAI_draw_focus_arrows(ctx, qx, qy, dx, dy);
	}

	// 映像「画3: 目が回る」の描画。
	// pic3: The Eyes
	const SAI_draw_pic_03_sub = function(ctx, px, py, dx, dy){
		ctx.save(); // 現在の座標系やクリッピングなどを保存する。

		// 画面中央の座標を計算する。
		let qx = px + dx / 2, qy = py + dy / 2;

		// 画面の辺の平均の長さ。
		let dxy = (dx + dy) / 2;

		// 長方形領域(px, py, dx, dy)をクリッピングする。
		SAI_clip_rect(ctx, px, py, dx, dy);

		// 白で長方形領域を塗りつぶす。
		ctx.fillStyle = 'white';
		ctx.fillRect(px, py, dx, dy);

		// 映像の進行を表す変数。
		let count2 = SAI_get_tick_count();
		let factor = count2 * 0.03;

		// 画面中央を原点とする。
		ctx.translate(qx, qy);

		// パイの一切れを塗りつぶす。
		let k = factor * 5;
		let r_delta = 30;
		let flag = (factor % 10) / 0.5;
		let flag2 = Math.sin(factor * 0.7) > -0.4;
		let cxy = Math.min(dx, dy) * 1.2;
		for(let r = 0; r < 360; ++k){
			let radian = r * Math.PI / 180 + factor; // 角度。

			// 三角形のパスを構築する。
			ctx.beginPath(); // パスを開始。
			ctx.moveTo(0, 0); // 原点に移動。
			let x0 = cxy * Math.cos(radian), y0 = cxy * Math.sin(radian);
			ctx.lineTo(x0, y0);
			r += r_delta;
			radian = r * Math.PI / 180 + factor;
			let x1 = cxy * Math.cos(radian), y1 = cxy * Math.sin(radian);
			ctx.lineTo(x1, y1);

			let factor2 = Math.abs(1 - Math.sin(factor * 8));
			if(flag2){ // 赤から黄色で。
				ctx.fillStyle = `rgb(255, ${factor2 * 50 + 55}, ${factor2 * 200 + 55})`;
			}else{ // さもなければ虹色。
				ctx.fillStyle = `hsl(${(k * 60) % 360}, 100%, 50%)`
			}

			// 三角形を塗りつぶす。
			ctx.fill();
		}

		// 放射状の線を描画する。
		k = factor * 5;
		for(let r = 0; r < 360;){
			let radian = r * Math.PI / 180 + factor;
			let x0 = cxy * Math.cos(radian);
			let y0 = cxy * Math.sin(radian);
			let factor2 = Math.abs(1 - Math.sin(factor * 8));
			ctx.beginPath();
			ctx.moveTo(0, 0);
			ctx.lineTo(x0, y0);
			ctx.strokeStyle = `rgb(255, 200, ${factor2 * 192}`;
			ctx.lineWidth = 10;
			ctx.stroke();
			r += r_delta / 2;
			++k;
		}

		// 画面の辺の最大値。
		dxy = Math.max(dx, dy);

		// 同心円状に広がる円を描画する。
		ctx.lineWidth = 10;
		let i = 0;
		ctx.strokeStyle = 'rgba(255, 0, 0, 50%)';
		for(let r = SAI_mod(count2 * 2, 100); r < cxy; r += 100){
			SAI_draw_circle(ctx, 0, 0, r, false);
			++i;
		}

		// 中央の目の開き具合。
		let opened = 1.0;
		let f = Math.sin(Math.abs(count2 * 0.1));
		if(f >= 0.8){
			opened = 0.6 + 0.4 * Math.abs(Math.sin(f * Math.PI));
		}

		// 中央の大きな目を描画する。
		let factor3 = (0.3 + Math.sin(count2 * 0.05) * 0.3);
		SAI_draw_eye_2(ctx, 0, 0, cxy / 8, (1.0 + factor3));
		ctx.fillStyle = '#f00';
		factor3 = 0.5 + Math.abs(factor3);
		SAI_draw_heart(ctx, 0, 0 - cxy / 25 * factor3, 0, cxy / 25 * factor3);

		// 周りの回転する４つの目を描画する。
		const N = 4;
		let radian = factor * 1.3;
		for(i = 0; i < N; ++i){
			let x = cxy * Math.cos(radian) * 0.3;
			let y = cxy * Math.sin(radian) * 0.3;
			SAI_draw_eye(ctx, x, y, cxy / 10, opened, 1.0, x >= 0); // 透過しない。

			radian += (2 * Math.PI) / N;
		}

		// その外側に９つの目を描画する。
		for(i = 0; i < 9; ++i){
			let x = 2 * cxy * Math.cos(1.5 * radian) * 0.3;
			let y = 2 * cxy * Math.sin(1.5 * radian) * 0.3;
			SAI_draw_eye(ctx, x, y, cxy / 10, opened, 1.0, x >= 0); // 透過しない。

			radian += (2 * Math.PI) / 9;
		}

		// 中央から離れるにつれ黄色を深めるグラデーション。
		let grd = ctx.createRadialGradient(0, 0, dxy * 0.25, 0, 0, dxy * 0.5);
		grd.addColorStop(0, 'rgba(255, 255, 255, 0.0)');
		grd.addColorStop(1, 'rgba(255, 255, 0, 0.8)');
		ctx.fillStyle = grd;
		SAI_draw_circle(ctx, 0, 0, dxy, true);

		ctx.restore(); // ctx.saveで保存した情報で元に戻す。
	}

	// 映像「画3: 目が回る」の描画。
	// pic3: The Eyes
	const SAI_draw_pic_03 = function(ctx, px, py, dx, dy){
		// 別のキャンバスに普通に描画する。
		let ctx2 = sai_id_canvas_02.getContext('2d', { alpha: false });
		ctx2.save();
		SAI_draw_pic_03_sub(ctx2, 0, 0, dx, dy);
		ctx2.restore();

		// 透明度を適用したイメージを転送する。これでモーションブラーが適用される。
		ctx.globalAlpha = 1 - sai_id_range_motion_blur.value * 0.1; // モーションブラーを掛ける。
		ctx.drawImage(sai_id_canvas_02, 0, 0, dx, dy, px, py, dx, dy);
		ctx.globalAlpha = 1; // 元に戻す。

		// フォーカス矢印を描画する。
		let qx = px + dx / 2, qy = py + dy / 2;
		SAI_draw_focus_arrows(ctx, qx, qy, dx, dy);
	}

	// 映像「画4: アルキメデスのらせん」の描画。
	// pic4: Archimedes' Spiral
	const SAI_draw_pic_04_sub = function(ctx, px, py, dx, dy){
		ctx.save(); // 現在の座標系やクリッピングなどを保存する。

		// 画面中央の座標を計算する。
		let qx = px + dx / 2, qy = py + dy / 2;

		// 画面の辺の平均の長さ。
		let dxy = (dx + dy) / 2;

		// 長方形領域(px, py, dx, dy)をクリッピングする。
		SAI_clip_rect(ctx, px, py, dx, dy);

		let count2 = SAI_get_tick_count();

		// 画面の寸法を使って計算する。
		let maxxy = Math.max(dx, dy), minxy = Math.min(dx, dy);
		let mxy = (maxxy + minxy) * 0.04;

		// 視覚的な酩酊感をもたらすために回転運動の中心点をすりこぎ運動させる。
		qx += mxy * Math.cos(count2 * 0.08);
		qy += mxy * Math.sin(count2 * 0.05);

		// 発散する渦巻きを描画する。
		let ci = 8; // これは偶数でなければならない。
		let lines = [];
		const a = 20;
		for(let i = 0; i < ci; ++i){
			let delta_theta = 2 * Math.PI * i / ci;
			// アルキメデスのらせんの公式に従って描画する。ただし偏角はdelta_thetaだけずらす。
			let line = [];
			line.push([qx, qy]);
			for(let theta = 0; theta <= 2 * Math.PI * 6; theta += 0.1){
				let r = a * theta;
				let t = theta + delta_theta;
				if (sai_id_select_vortex_direction.value == 'counterclockwise')
					t = -t;
				// 回転する。
				t += count2 * -0.25;
				let comp = new Complex({abs:r, arg:t});
				let x = comp.re, y = comp.im;
				// 画面中央を原点とする。
				x += qx;
				y += qy;
				line.push([x, y]);
			}
			lines.push(line);
		}

		// 線を描画する。
		let even = true;
		ctx.beginPath();
		ctx.moveTo(qx, qy);
		for(let i = 0; i < ci; ++i){
			let line = lines[i];
			if(even){ // 偶数回目はそのままの向き。
				for(let k = 0; k < line.length; ++k)
					ctx.lineTo(line[k][0], line[k][1]);
			}else{ // 奇数回目は逆向き。
				for(let k = line.length - 1; k >= 0; --k)
					ctx.lineTo(line[k][0], line[k][1]);
			}
			even = !even;
		}
		ctx.closePath();
		ctx.fillStyle = SAI_color_get_1st(); // 1番目の色で描画する。
		ctx.fill('evenodd');
		ctx.fillStyle = SAI_color_get_2nd(); // 2番目の色で塗りつぶす。
		ctx.rect(0, 0, dx, dy);
		ctx.fill('evenodd');

		ctx.restore(); // ctx.saveで保存した情報で元に戻す。
	}

	// 映像「画4: アルキメデスのらせん」の描画。
	// pic4: Archimedes' Spiral
	const SAI_draw_pic_04 = function(ctx, px, py, dx, dy){
		// 別のキャンバスに普通に描画する。
		let ctx2 = sai_id_canvas_02.getContext('2d', { alpha: false });
		ctx2.save();
		let shrink = 0.75;
		SAI_draw_pic_04_sub(ctx2, 0, 0, dx * shrink, dy * shrink);
		ctx2.restore();

		// 透明度を適用したイメージを転送する。これでモーションブラーが適用される。
		ctx.globalAlpha = 1 - sai_id_range_motion_blur.value * 0.1; // モーションブラーを掛ける。
		ctx.drawImage(sai_id_canvas_02, 0, 0, dx * shrink, dy * shrink, px, py, dx, dy);
		ctx.globalAlpha = 1; // 元に戻す。

		// フォーカス矢印を描画する。
		let count2 = SAI_get_tick_count();
		let maxxy = Math.max(dx, dy), minxy = Math.min(dx, dy);
		let mxy = (maxxy + minxy) * 0.04;
		let qx = px + dx / 2, qy = py + dy / 2;
		qx += mxy * Math.cos(count2 * 0.08);
		qy += mxy * Math.sin(count2 * 0.05);
		SAI_draw_focus_arrows(ctx, qx, qy, dx, dy);
	}

	// 映像「画5: 広がるハート」の描画。
	// pic5: Spreading Rainbow
	const SAI_draw_pic_05_sub = function(ctx, px, py, dx, dy){
		ctx.save(); // 現在の座標系やクリッピングなどを保存する。

		// 画面中央の座標を計算する。
		let qx = px + dx / 2, qy = py + dy / 2;

		// 画面の辺の平均の長さ。
		let dxy = (dx + dy) / 2;

		// 長方形領域(px, py, dx, dy)をクリッピングする。
		SAI_clip_rect(ctx, px, py, dx, dy);

		// 映像の進行を表す変数。
		let count2 = SAI_get_tick_count();
		let factor = count2 * 0.16;

		// 画面中央を少しずらす。
		if(SAI_screen_is_large(ctx)){
			qx += 60 * Math.cos(factor * 0.8);
			qy += 60 * Math.sin(factor * 0.8);
		}else{
			qx += 30 * Math.cos(factor * 0.8);
			qy += 30 * Math.sin(factor * 0.8);
		}

		// 画面中央を原点とする。
		ctx.translate(qx, qy);

		// 星形のレインボーを描画する。外側から順番に。
		let isLarge = SAI_screen_is_large(ctx);
		for(let radius = isLarge ? ((dx + dy) * 0.2) : ((dx + dy) * 0.4); radius >= 10; radius *= 0.92){
			// 虹色の指定はHSL色空間で。
			ctx.fillStyle = `hsl(${((dxy + factor * 0.3 - radius * 0.015) * 360) % 360}deg, 100%, 50%)`;

			let N0 = 20, N1 = 5;
			let i = 0;
			let oldx = null, oldy = null;
			for(let angle = 0; angle <= 360; angle += 360 / N0){
				// 角度を計算する。
				let radian = (angle + count2 * 2) * (Math.PI / 180.0);

				// 星形の一点を計算する。
				let factor2 = radius * (1 + 0.7 * Math.abs(Math.sin(N1 * i * Math.PI / N0)));
				if(isLarge)
					factor2 *= 2;
				let x = factor2 * Math.cos(radian), y = factor2 * Math.sin(radian);

				if(angle == 0){ // 角度がゼロならパスを開始する。
					ctx.beginPath();
					ctx.moveTo(x, y);
				}else{ // さもなければパスにベジエ曲線を追加する。
					if((i % 2) == 0){
						ctx.bezierCurveTo(oldx, oldy, (x + oldx) / 2, (y + oldy) / 2, x, y);
					}
				}

				// 古い座標を保存する。
				oldx = x;
				oldy = y;

				++i;
			}

			// できたパスを塗りつぶす。
			ctx.fill();
		}

		// 画面の辺の最大値。
		dxy = Math.max(dx, dy);

		// 外側に行くほど白っぽい、薄いグラデーションを掛ける。
		let grd = ctx.createRadialGradient(0, 0, dxy * 0.25, 0, 0, dxy * 0.5);
		grd.addColorStop(0, 'rgba(255, 255, 255, 0.0)');
		grd.addColorStop(1, 'rgba(255, 255, 255, 0.7)');
		ctx.fillStyle = grd;
		SAI_draw_circle(ctx, 0, 0, dxy, true);

		// 回転しながら広がるハート（複数）を描画する。
		let value = factor * 25 + 10;
		let value2 = SAI_mod(value, 191);
		ctx.fillStyle = `rgb(255,${value2},${value2})`;
		let M = 5;
		let heartSize = 30;
		for(let radius = SAI_mod((factor * 10), 100) + 30; radius < dxy; radius += 100){
			for(let angle = 0; angle < 360; angle += 360 / M){
				let radian = angle * (Math.PI / 180.0);
				let x0 = radius * Math.cos(radian + factor * 0.1 + radius / 100);
				let y0 = radius * Math.sin(radian + factor * 0.1 + radius / 100);
				SAI_draw_heart(ctx, x0, y0, x0, y0 + heartSize + SAI_mod(value, 191) / 12);
			}
			heartSize += 5;
		}

		ctx.restore(); // ctx.saveで保存した情報で元に戻す。
	}

	// 映像「画5: 広がるハート」の描画。
	// pic5: Spreading Rainbow
	const SAI_draw_pic_05 = function(ctx, px, py, dx, dy){
		// 別のキャンバスに普通に描画する。
		let ctx2 = sai_id_canvas_02.getContext('2d', { alpha: false });
		ctx2.save();
		SAI_draw_pic_05_sub(ctx2, 0, 0, dx, dy);
		ctx2.restore();

		// 透明度を適用したイメージを転送する。これでモーションブラーが適用される。
		ctx.globalAlpha = 1 - sai_id_range_motion_blur.value * 0.1; // モーションブラーを掛ける。
		ctx.drawImage(sai_id_canvas_02, 0, 0, dx, dy, px, py, dx, dy);
		ctx.globalAlpha = 1; // 元に戻す。

		// フォーカス矢印を描画する。
		let count2 = SAI_get_tick_count();
		let qx = px + dx / 2, qy = py + dy / 2;
		let factor = count2 * 0.16;
		if(SAI_screen_is_large(ctx)){
			qx += 60 * Math.cos(factor * 0.8);
			qy += 60 * Math.sin(factor * 0.8);
		}else{
			qx += 30 * Math.cos(factor * 0.8);
			qy += 30 * Math.sin(factor * 0.8);
		}
		SAI_draw_focus_arrows(ctx, qx, qy, dx, dy);
	}

	// 映像「画6: 五円玉」の描画。
	// pic6: 5-yen coin
	const SAI_draw_pic_06_sub = function(ctx, px, py, dx, dy){
		ctx.save(); // 現在の座標系やクリッピングなどを保存する。

		// 画面中央の座標を計算する。
		let qx = px + dx / 2, qy = py + dy / 2;

		// 画面の辺の平均の長さ。
		let dxy = (dx + dy) / 2;

		// 長方形領域(px, py, dx, dy)をクリッピングする。
		SAI_clip_rect(ctx, px, py, dx, dy);

		// 映像の進行を表す変数。
		let count2 = SAI_get_tick_count();
		const value = Math.sin(count2 * 0.05);

		// 指定した色で長方形領域を塗りつぶす。
		ctx.fillStyle = `rgb(${value * 30 + 40}, ${value * 20 + 80}, ${value * 80 + 180})`
		ctx.fillRect(px, py, dx, dy);

		// 空を漂う、小さな謎の丸い物体を描画する。
		for(let k = dxy; k > 0; k -= 160){
			const delta = 10000 / k;
			for(let i = 0; i < 360; i += delta){
				let x = qx + k * Math.cos(count2 / 200 + i * (Math.PI / 180));
				let y = qy + k * Math.sin(count2 / 200 + i * (Math.PI / 180));
				x += k * Math.cos(i) * 0.2;
				y += k * Math.sin(i) * 0.2;
				ctx.fillStyle = `rgba(${255 - i % 255}, 91, ${i % 255}, 0.75)`;
				SAI_draw_circle(ctx, x, y, i % 3 + 1);
			}
		}

		// 空を漂う宇宙基地？を描画する。
		if(true){
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
		}

		// 遠近法を処理するヘルパー関数。疑似3D。
		const focal = 100;
		function SAI_perspective(x, y, z){
			let w = focal / (focal + z);
			return [x * w, y * w];
		}

		// 3Dっぽい背景を描画する。市松模様のタイル。
		const y = 600, cx = 8000;
		const deltax = 300, deltaz = 100;
		let iz = 0;
		const color_1st = SAI_color_get_1st();
		const color_2nd = SAI_color_get_2nd();
		for(let z = 0; z <= 900; z += deltaz){
			let ix = 0;
			for(let x = -cx; x < cx; x += deltax){
				const [x0, y0] = SAI_perspective(x, y, z);
				const [x1, y1] = SAI_perspective(x + deltax, y, z);
				const [x2, y2] = SAI_perspective(x + deltax, y, z + deltaz);
				const [x3, y3] = SAI_perspective(x, y, z + deltaz);
				ctx.beginPath();
				ctx.moveTo(qx + x0, qy + y0);
				ctx.lineTo(qx + x1, qy + y1);
				ctx.lineTo(qx + x2, qy + y2);
				ctx.lineTo(qx + x3, qy + y3);
				ctx.fillStyle = ((ix + iz) & 1) ? color_1st : color_2nd;
				ctx.fill();
				++ix;
			}
			++iz;
		}

		// ヒモのついた五円玉を回転させて描画する。
		if(sai_coin_img.complete){
			ctx.translate(qx - sai_coin_img.width * 0.5, qy - sai_coin_img.height * 0.7);

			let angle = Math.PI * Math.sin(count2 * 0.1 - 0.05) * 0.078;
			ctx.rotate(angle);

			let ratio = 1;
			ctx.drawImage(sai_coin_img, 0, 0, sai_coin_img.width * ratio, sai_coin_img.height * ratio);
		}

		ctx.restore(); // ctx.saveで保存した情報で元に戻す。
	}

	// 映像「画6: 五円玉」の描画。
	// pic6: 5-yen coin
	const SAI_draw_pic_06 = function(ctx, px, py, dx, dy){
		// 別のキャンバスに普通に描画する。
		let ctx2 = sai_id_canvas_02.getContext('2d', { alpha: false });
		ctx2.save();
		SAI_draw_pic_06_sub(ctx2, 0, 0, dx, dy);
		ctx2.restore();

		// 透明度を適用したイメージを転送する。これでモーションブラーが適用される。
		ctx.globalAlpha = 1 - sai_id_range_motion_blur.value * 0.1; // モーションブラーを掛ける。
		ctx.drawImage(sai_id_canvas_02, 0, 0, dx, dy, px, py, dx, dy);
		ctx.globalAlpha = 1; // 元に戻す。

		// コインの位置を計算する。
		let count2 = SAI_get_tick_count();
		let angle = Math.PI * Math.sin(count2 * 0.1 - 0.05) * 0.078;
		let qx = px + dx / 2, qy = py + dy / 2;
		qx -= sai_coin_img.width * 0.1;
		qy -= sai_coin_img.height * 0.08;
		let ratio = 1;
		let wx = -sai_coin_img.width * ratio * Math.sin(angle) * 3.5;

		// 必要ならフォーカス矢印を描画。
		if(sai_id_checkbox_arrows.checked){
			let rx = qx + wx;
			ctx.fillStyle = 'yellow';
			SAI_draw_arrow(ctx, rx, qy, rx, qy + sai_coin_img.height * 0.08, 14);
			ctx.fillStyle = 'black';
			SAI_draw_arrow(ctx, rx, qy, rx, qy + sai_coin_img.height * 0.08, 5);
		}

		// 当たり判定を行って、sai_touching_coinに結果を格納する。
		sai_touching_coin = false;
		if(sai_touch_position){
			qx += wx;
			qy += sai_coin_img.height * 0.2;
			// (x0, y0)～(x1, y1)が当たり判定の対象。
			let x0 = sai_touch_position[0] - sai_coin_img.width * 0.6;
			let x1 = sai_touch_position[0] + sai_coin_img.width * 0.6;
			let y0 = sai_touch_position[1] - sai_coin_img.width * 0.6;
			let y1 = sai_touch_position[1] + sai_coin_img.width * 0.6;
			// 画面分割があるので、当たり判定がややこしいことになります。
			// ループを使って失敗したときのやり直しを行う。
			for (let i = 0; i < 3; ++i){
				if(false){ // デバッグ用。
					ctx.fillStyle = 'black';
					ctx.fillRect(x0, y0, x1 - x0, y1 - y0);
					ctx.fillStyle = 'green';
					ctx.fillRect(qx - 5, qy - 5, 10, 10);
				}
				if(x0 <= qx && qx <= x1 && y0 <= qy && qy <= y1){
					sai_touching_coin = true; // 当たり判定あり。
					break;
				}
				if(sai_screen_split == 1){ // 画面分割なし。
					break;
				}else{ // 画面２分割。
					// 座標を補正してやり直し。
					if(sai_screen_width >= sai_screen_height){ // 画面が横長。
						if(i == 0){
							qx += dx;
						}else{
							qx -= 2 * dx;
						}
					}else{ // 縦長。
						if(i == 0){
							qy += dy;
						}else{
							qy -= 2 * dy;
						}
					}
				}
			}
		}
	}

	// 映像「画7: 奇妙な渦巻き」の描画。
	// pic7: Strange Swirl
	const SAI_draw_pic_07_sub = function(ctx, px, py, dx, dy){
		ctx.save(); // 現在の座標系やクリッピングなどを保存する。

		// 画面中央の座標を計算する。
		let qx = px + dx / 2, qy = py + dy / 2;

		// 画面の辺の平均の長さ。
		let dxy = (dx + dy) / 2;

		// 長方形領域(px, py, dx, dy)をクリッピングする。
		SAI_clip_rect(ctx, px, py, dx, dy);

		// 映像の進行を表す変数。
		let count2 = SAI_get_tick_count();
		let factor1 = count2 * 0.01, factor2 = count2 * 0.07;

		const num_lines = 10; // これは偶数でなければならない。
		const a = 1, b = 1.1; // らせんの係数。

		// 発散する渦巻きを表す多角形の頂点を構築する。
		let lines = [];
		for(let i = 0; i < num_lines; ++i){
			let delta_theta = 2 * Math.PI * i / num_lines;
			let line = [[qx, qy]];
			for(let theta = 0; theta <= 2 * Math.PI * 1.2; theta += 0.02){
				let r = a * Math.exp(b * theta);
				let t = delta_theta + Math.sqrt(Math.sqrt(r)) * Math.sin(theta - factor2) + factor1;
				if (sai_id_select_vortex_direction.value == 'counterclockwise')
					t = -t;
				let comp = new Complex({abs:r, arg:t});
				let x = comp.re, y = comp.im;
				// 画面中央を原点とする。
				x += qx;
				y += qy;
				line.push([x, y]);
			}
			lines.push(line);
		}

		// 多角形を描画する。
		let even = true;
		ctx.beginPath();
		ctx.moveTo(qx, qy);
		for(let i = 0; i < num_lines; ++i){
			let line = lines[i];
			if(even){ // 偶数回目はそのままの向き。
				for(let k = 0; k < line.length; ++k){
					ctx.lineTo(line[k][0], line[k][1]);
				}
			}else{ // 奇数回目は逆向き。
				for(let k = line.length - 1; k >= 0; --k)
					ctx.lineTo(line[k][0], line[k][1]);
			}
			even = !even;
		}
		ctx.closePath();
		ctx.fillStyle = SAI_color_get_2nd(); // 2番目の色で塗りつぶす。
		ctx.fill('evenodd');
		ctx.rect(0, 0, dx, dy);
		ctx.fillStyle = SAI_color_get_1st(); // 1番目の色で塗りつぶす。
		ctx.fill('evenodd');

		ctx.restore(); // ctx.saveで保存した情報で元に戻す。
	}

	// 映像「画7: 奇妙な渦巻き」の描画。
	// pic7: Strange Swirl
	const SAI_draw_pic_07 = function(ctx, px, py, dx, dy){
		// 別のキャンバスに普通に描画する。
		let ctx2 = sai_id_canvas_02.getContext('2d', { alpha: false });
		ctx2.save();
		SAI_draw_pic_07_sub(ctx2, 0, 0, dx, dy);
		ctx2.restore();

		// 透明度を適用したイメージを転送する。これでモーションブラーが適用される。
		ctx.globalAlpha = 1 - sai_id_range_motion_blur.value * 0.1; // モーションブラーを掛ける。
		ctx.drawImage(sai_id_canvas_02, 0, 0, dx, dy, px, py, dx, dy);
		ctx.globalAlpha = 1; // 元に戻す。

		// フォーカス矢印を描画する。
		let qx = px + dx / 2, qy = py + dy / 2;
		SAI_draw_focus_arrows(ctx, qx, qy, dx, dy);
	}

	// 映像「画8: クレージーな色」の描画。
	// pic8: Crazy Colors
	const SAI_draw_pic_08_sub = function(ctx, px, py, dx, dy){
		ctx.save(); // 現在の座標系やクリッピングなどを保存する。

		// 画面中央の座標を計算する。
		let qx = px + dx / 2, qy = py + dy / 2;

		// 画面の辺の平均の長さ。
		let dxy = (dx + dy) / 2;

		// 長方形領域(px, py, dx, dy)をクリッピングする。
		SAI_clip_rect(ctx, px, py, dx, dy);

		// 黒で長方形領域を塗りつぶす。
		ctx.fillStyle = '#000';
		ctx.fillRect(px, py, dx, dy);

		// 映像の進行を表す変数。
		let count2 = SAI_get_tick_count();

		// 画面中央を少しずらす。
		qx += dxy * 0.1 * Math.cos(count2 * 0.08);
		qy += dxy * 0.1 * Math.sin(count2 * 0.08);

		// 画面中央を原点とする。
		ctx.translate(qx, qy);

		// 座標計算用のヘルパー関数。
		const rotation = 8, width = dxy * 0.1;
		let calc_point = function(radius, radian){
			if (sai_id_select_vortex_direction.value == 'counterclockwise')
				radian = -radian;
			return [radius * Math.cos(radian), radius * Math.sin(radian)];
		}

		// 虹色の渦巻きを描画する。アルキメデスのらせんの公式に従う。
		const colors = ['#f00', '#ff0', '#0f0', '#0ff', '#00c', '#f0f'];
		const factor = count2 * 0.5;
		for(let radian0 = -4.5; radian0 < rotation * 2 * Math.PI; radian0 += 0.12){
			const radian1 = radian0 + 0.15;
			const radius0 = width * radian0 / (2 * Math.PI);
			const radius1 = radius0 + width * 1.03;

			// 渦巻きの一部の座標を計算する。
			const [x0, y0] = calc_point(radius0, radian0 - factor);
			const [x1, y1] = calc_point(radius1, radian0 - factor);
			const [x2, y2] = calc_point(radius1, radian1 - factor);
			const [x3, y3] = calc_point(radius0, radian1 - factor);

			// 線形グラデーションを作成し適用する。
			let g = ctx.createLinearGradient(x0, y0, x1, y1);
			g.addColorStop(0 / 7, colors[0]);
			g.addColorStop(1 / 7, colors[1]);
			g.addColorStop(2 / 7, colors[2]);
			g.addColorStop(3 / 7, colors[3]);
			g.addColorStop(4 / 7, colors[4]);
			g.addColorStop(5 / 7, colors[5]);
			g.addColorStop(6 / 7, colors[0]);
			ctx.fillStyle = g;

			// 渦巻きの一部をグラデーションで塗りつぶす。
			ctx.beginPath();
			ctx.lineTo(x0, y0);
			ctx.lineTo(x1, y1);
			ctx.lineTo(x2, y2);
			ctx.lineTo(x3, y3);
			ctx.fill();
		}

		ctx.restore(); // ctx.saveで保存した情報で元に戻す。
	}

	// 映像「画8: クレージーな色」の描画。
	// pic8: Crazy Colors
	const SAI_draw_pic_08 = function(ctx, px, py, dx, dy){
		// 別のキャンバスに普通に描画する。
		let ctx2 = sai_id_canvas_02.getContext('2d', { alpha: false });
		ctx2.save();
		SAI_draw_pic_08_sub(ctx2, 0, 0, dx / 2, dy / 2);
		ctx2.restore();

		// 透明度を適用したイメージを転送する。これでモーションブラーが適用される。
		ctx.globalAlpha = 1 - sai_id_range_motion_blur.value * 0.1; // モーションブラーを掛ける。
		ctx.drawImage(sai_id_canvas_02, 0, 0, dx / 2, dy / 2, px, py, dx, dy);
		ctx.globalAlpha = 1; // 元に戻す。

		// フォーカス矢印を描画する。
		let qx = px + dx / 2, qy = py + dy / 2;
		let count2 = SAI_get_tick_count();
		let dxy = (dx + dy) / 2;
		qx += dxy * 0.1 * Math.cos(count2 * 0.08);
		qy += dxy * 0.1 * Math.sin(count2 * 0.08);
		SAI_draw_focus_arrows(ctx, qx, qy, dx, dy);
	}

	// 映像「画9: 対数らせん 2」の描画。
	// pic9: Logarithmic Spiral 2
	const SAI_draw_pic_09_sub = function(ctx, px, py, dx, dy){
		ctx.save(); // 現在の座標系やクリッピングなどを保存する。

		// 長方形領域(px, py, dx, dy)をクリッピングする。
		SAI_clip_rect(ctx, px, py, dx, dy);

		// 映像の進行を表す変数。
		let count2 = SAI_get_tick_count();

		// 画面の寸法を使って計算する。
		let qx = px + dx / 2, qy = py + dy / 2;
		let maxxy = Math.max(dx, dy), minxy = Math.min(dx, dy);
		let mxy = (maxxy + minxy) * 0.015;

		// 視覚的な酩酊感をもたらすために回転運動の中心点をすりこぎ運動させる。
		qx += mxy * Math.cos(count2 * 0.1);
		qy += mxy * Math.sin(count2 * 0.2);

		// 発散する渦巻きを描画する。
		let num_lines = 8; // これは偶数でなければならない。
		let lines = [];
		for(let i = 0; i < num_lines; ++i){
			let delta_theta = 2 * Math.PI * i / num_lines;
			// 黄金らせんの公式に従って描画する。ただしtheta_deltaだけ偏角をずらす。
			let a = 1, b = 0.3063489;
			let line = [[qx, qy]];
			for(let theta = 0; theta <= 2 * Math.PI * 5; theta += 0.125){
				let r = a * Math.exp(b * theta);
				let t = theta + delta_theta;
				t += -count2 * 0.23;
				if (sai_id_select_vortex_direction.value == 'counterclockwise')
					t = -t;
				let comp = new Complex({abs:r, arg:t});
				let x = comp.re, y = comp.im;
				// 画面中央を原点とする。
				x += qx;
				y += qy;
				line.push([x, y]);
			}
			lines.push(line);
		}

		// 多角形を描画する。
		let even = true;
		ctx.beginPath();
		ctx.moveTo(qx, qx);
		for(let i = 0; i < num_lines; ++i){
			let line = lines[i];
			if(even){ // 偶数回目はそのままの向き。
				for(let k = 0; k < line.length; ++k)
					ctx.lineTo(line[k][0], line[k][1]);
			}else{ // 奇数回目は逆向き。
				for(let k = line.length - 1; k >= 0; --k)
					ctx.lineTo(line[k][0], line[k][1]);
			}
			even = !even;
		}
		ctx.closePath();
		ctx.fillStyle = SAI_color_get_1st();
		ctx.fill('evenodd');
		ctx.rect(0, 0, dx, dy);
		ctx.fillStyle = SAI_color_get_2nd();
		ctx.fill('evenodd');

		ctx.restore(); // ctx.saveで保存した情報で元に戻す。
	}

	// 映像「画9: 対数らせん 2」の描画。
	// pic9: Logarithmic Spiral 2
	const SAI_draw_pic_09 = function(ctx, px, py, dx, dy){
		// 別のキャンバスに普通に描画する。
		let ctx2 = sai_id_canvas_02.getContext('2d', { alpha: false });
		ctx2.save();
		SAI_draw_pic_09_sub(ctx2, 0, 0, dx, dy);
		ctx2.restore();

		// 透明度を適用したイメージを転送する。これでモーションブラーが適用される。
		ctx.globalAlpha = 1 - sai_id_range_motion_blur.value * 0.1; // モーションブラーを掛ける。
		ctx.drawImage(sai_id_canvas_02, 0, 0, dx, dy, px, py, dx, dy);
		ctx.globalAlpha = 1; // 元に戻す。

		// フォーカス矢印を描画する。
		let count2 = SAI_get_tick_count();
		let qx = px + dx / 2, qy = py + dy / 2;
		let maxxy = Math.max(dx, dy), minxy = Math.min(dx, dy);
		let mxy = (maxxy + minxy) * 0.015;
		qx += mxy * Math.cos(count2 * 0.1);
		qy += mxy * Math.sin(count2 * 0.2);
		SAI_draw_focus_arrows(ctx, qx, qy, dx, dy);
	}

	// 映像「画10: アナログディスク」の描画。
	// pic10: Analog Disc
	const SAI_draw_pic_10_sub = function(ctx, px, py, dx, dy){
		ctx.save(); // 現在の座標系やクリッピングなどを保存する。

		// 画面中央の座標を計算する。
		let qx = px + dx / 2, qy = py + dy / 2;

		// 画面の寸法を使って計算する。
		let maxxy = Math.max(dx, dy), minxy = Math.min(dx, dy);

		// 映像の進行を表す変数。
		let count2 = SAI_get_tick_count();

		// 画面中央を原点とする。
		ctx.translate(qx, qy);

		// 上下に揺らす。
		let updown = minxy * Math.sin(count2 * 0.2) * 0.16;
		ctx.translate(0, updown);

		if(sai_spiral_img.complete){ // 渦巻きイメージの読み込みが完了していたら
			// 描画位置を計算。
			let x = -sai_spiral_img.width / 2, y = -sai_spiral_img.height / 2;

			// これから描画する図形を回転。
			ctx.rotate(-count2 * 0.3);

			// 拡大率を設定。
			let ratio = 2.5 * maxxy / (sai_spiral_img.width + sai_spiral_img.height);
			ctx.scale(ratio, ratio);

			ctx.drawImage(sai_spiral_img, x, y); // 渦巻きイメージを描画する。
		}

		ctx.restore(); // ctx.saveで保存した情報で元に戻す。
	}

	// 映像「画10: アナログディスク」の描画。
	// pic10: Analog Disc
	const SAI_draw_pic_10 = function(ctx, px, py, dx, dy){
		// 別のキャンバスに普通に描画する。
		let ctx2 = sai_id_canvas_02.getContext('2d', { alpha: false });
		ctx2.save();
		SAI_draw_pic_10_sub(ctx2, 0, 0, dx, dy);
		ctx2.restore();

		// 透明度を適用したイメージを転送する。これでモーションブラーが適用される。
		ctx.globalAlpha = 1 - sai_id_range_motion_blur.value * 0.1; // モーションブラーを掛ける。
		ctx.drawImage(sai_id_canvas_02, 0, 0, dx, dy, px, py, dx, dy);
		ctx.globalAlpha = 1; // 元に戻す。

		// フォーカス矢印を描画する。
		let qx = px + dx / 2, qy = py + dy / 2;
		let maxxy = Math.max(dx, dy), minxy = Math.min(dx, dy);
		let count2 = SAI_get_tick_count();
		let updown = minxy * Math.sin(count2 * 0.2) * 0.16;
		qy += updown;
		SAI_draw_focus_arrows(ctx, qx, qy, dx, dy);
	}

	function SAI_flower_graph(x, radius){
		return radius * Math.sin(x * Math.PI / radius / 2);
	}

	// 映像「画11: 奇妙な渦巻き 2」の描画。
	// pic11: Strange Swirl 2
	const SAI_draw_pic_11_sub = function(ctx, px, py, dx, dy){
		ctx.save(); // 現在の座標系やクリッピングなどを保存する。

		// 画面中央の座標を計算する。
		let qx = px + dx / 2, qy = py + dy / 2;

		// 画面の辺の平均の長さ。
		let dxy = (dx + dy) / 2;

		// 長方形領域(px, py, dx, dy)をクリッピングする。
		SAI_clip_rect(ctx, px, py, dx, dy);

		// 画面の寸法を使って計算する。
		let maxxy = Math.max(dx, dy), minxy = Math.min(dx, dy);

		// 映像の進行を表す変数。
		let count2 = SAI_get_tick_count();
		let factor1 = count2 * 0.03, factor2 = count2 * 0.06;

		const num_lines = 14; // これは偶数でなければならない。
		const a = 1, b = 1.01; // らせんの係数。

		// 発散する渦巻きを表す多角形の頂点を構築する。
		let lines = [];
		for(let i = 0; i < num_lines; ++i){
			let delta_theta = 2 * Math.PI * i / num_lines;
			let line = [[qx, qy]];
			for(let theta = 0; theta <= 2 * Math.PI * 1.2; theta += 0.02){
				let r = a * Math.exp(b * theta);
				let t = delta_theta + 2 * Math.sin(theta - factor2) + Math.sin(factor1) * Math.PI;
				if (sai_id_select_vortex_direction.value == 'counterclockwise')
					t = -t;
				let comp = new Complex({abs:r, arg:t});
				let x = comp.re, y = comp.im;
				// 画面中央を原点とする。
				x += qx;
				y += qy;
				line.push([x, y]);
			}
			lines.push(line);
		}

		// 多角形を描画する。
		let even = true;
		ctx.beginPath();
		ctx.moveTo(qx, qy);
		for(let i = 0; i < num_lines; ++i){
			let line = lines[i];
			if(even){ // 偶数回目はそのままの向き。
				for(let k = 0; k < line.length; ++k){
					ctx.lineTo(line[k][0], line[k][1]);
				}
			}else{ // 奇数回目は逆向き。
				for(let k = line.length - 1; k >= 0; --k)
					ctx.lineTo(line[k][0], line[k][1]);
			}
			even = !even;
		}
		ctx.closePath();
		ctx.fillStyle = SAI_color_get_2nd(); // 2番目の色で塗りつぶす。
		ctx.fill('evenodd');
		ctx.rect(0, 0, dx, dy);
		ctx.fillStyle = SAI_color_get_1st(); // 1番目の色で塗りつぶす。
		ctx.fill('evenodd');

		ctx.restore(); // ctx.saveで保存した情報で元に戻す。
	}

	// 映像「画11: 奇妙な渦巻き 2」の描画。
	// pic11: Strange Swirl 2
	const SAI_draw_pic_11 = function(ctx, px, py, dx, dy){
		// 別のキャンバスに普通に描画する。
		let ctx2 = sai_id_canvas_02.getContext('2d', { alpha: false });
		ctx2.save();
		SAI_draw_pic_11_sub(ctx2, 0, 0, dx, dy);
		ctx2.restore();

		// 透明度を適用したイメージを転送する。これでモーションブラーが適用される。
		ctx.globalAlpha = 1 - sai_id_range_motion_blur.value * 0.1; // モーションブラーを掛ける。
		ctx.drawImage(sai_id_canvas_02, 0, 0, dx, dy, px, py, dx, dy);
		ctx.globalAlpha = 1; // 元に戻す。

		// フォーカス矢印を描画する。
		let qx = px + dx / 2, qy = py + dy / 2;
		SAI_draw_focus_arrows(ctx, qx, qy, dx, dy);
	}

	// 万華鏡のソースの多角形を作成する。
	const SAI_create_kaleido_polygon = function(counter, x, y, radius){
		const ROTATE2 = true;
		return Kaleido_regular_polygon(3, {x:x, y:y}, radius, counter * 0.003);
	}

	// 円を描画する。
	const SAI_draw_circle_3 = function(ctx, counter, radius, center, velocity, fillStyle){
		velocity *= 0.1;
		let px = radius * Math.cos(counter * velocity) * 0.7;
		let py = radius * Math.sin(counter * velocity) * 0.7;
		let radius2 = radius * 0.75;
		if(false){
			SAI_draw_circle_2(ctx, px, py, radius2);
		}else{
			Kaleido_draw_circle(ctx, {x:px, y:py}, radius2);
			ctx.fillStyle = fillStyle;
			ctx.fill();
		}
	}

	// 万華鏡のソースを描画する。
	const draw_kaleido_source = function(ctx, px, py, dx, dy){
		// 現在の状態を保存する。
		ctx.save();

		// 映像の進行をつかさどる変数。
		let counter = SAI_get_tick_count_2() * 0.02;

		// 背景を塗りつぶす。
		ctx.fillStyle = `hsl(${(counter * 10) % 360}deg, 80%, 50%)`;
		ctx.fillRect(px, py, dx, dy);

		// 中心を原点とする。
		let cx = px + dx / 2, cy = py + dy / 2;
		ctx.translate(cx, cy);

		// 画面の寸法を使って計算する。
		let maxxy = Math.max(dx, dy), minxy = Math.min(dx, dy);
		let avgxy = (maxxy + minxy) / 2;

		// 画面が大きければ速くする。
		counter *= minxy * 0.0015;

		// 半径を振動させる。
		let r = sai_kaleido_radius * (0.8 + 0.4 * Math.sin(counter * 0.01));

		// 回転する。
		ctx.rotate(counter * 0.1);

		// 格子状の模様を描画する。
		const GRIDS = true;
		if(GRIDS){
			ctx.lineWidth = avgxy * 0.02;
			ctx.strokeStyle = "rgba(255, 0, 0, 75%)";
			let factor = Math.abs(Math.sin(counter * 0.003) + 3);
			const ROTATE1 = true;
			if(ROTATE1){
				ctx.rotate((counter * 0.0002 % 1) * 2 * Math.PI);
			}
			const dxy = avgxy * 0.2;
			ctx.fillStyle = "pink";
			for(let y = factor; y < dxy; y += 10 * factor){
				SAI_draw_line_2(ctx, -dx / 2, y, +dx / 2, y, 5);
				SAI_draw_line_2(ctx, -dx / 2, -y, +dx / 2, -y, 5);
			}
			for(let x = -factor; x < dxy; x += 10 * factor){
				SAI_draw_line_2(ctx, x, -dy / 2, x, +dy / 2, 5);
				SAI_draw_line_2(ctx, -x, -dy / 2, -x, +dy / 2, 5);
			}
		}

		// ポリゴンを構築する。
		let polygon = SAI_create_kaleido_polygon(counter, 0, 0, r);
		if(true){
			// ポリゴンを描画する。
			Kaleido_draw_polygon(ctx, polygon);
			ctx.stroke();
		}

		// 泡を描画する。
		const BUBBLES = true;
		if(BUBBLES){
			const s = r;
			const color1 = `hsla(${(counter * 15 + 2) % 360}deg, 100%, 50%, 60%)`;
			const color2 = `hsla(${(counter * 12 + 0.5) % 360}deg, 100%, 50%, 40%)`;
			const color3 = `hsla(${(counter * 11 + 1) % 360}deg, 100%, 50%, 60%)`;
			const color4 = `hsla(${(counter * 33 + 2.3) % 360}deg, 100%, 50%, 40%)`;
			const color5 = `hsla(${(counter * 14) % 360}deg, 0%, 100%, 30%)`;
			const color6 = `hsla(360deg, 100%, 0%, 60%)`;
			SAI_draw_circle_3(ctx, counter, s * 0.2, { x: s * 0.125 * 1, y: s * 0.125 * 5 }, 4, color1);
			SAI_draw_circle_3(ctx, counter, s * 0.3, { x: s * 0.125 * 4, y: s * 0.125 * 2 }, 3, color2);
			SAI_draw_circle_3(ctx, -counter, s * 0.1, { x: s * 0.125 * 5, y: s * 0.125 * 5 }, 5, color3);
			SAI_draw_circle_3(ctx, counter, s * 0.2, { x: s * 0.125 * 3, y: s * 0.125 * 7 }, 7, color4);
			SAI_draw_circle_3(ctx, -counter, s * 0.4, { x: s * 0.125 * 1, y: s * 0.125 * 2 }, 2, color3);
			SAI_draw_circle_3(ctx, counter, s * 0.1, { x: s * 0.120 * 2, y: s * 0.1 * 1 }, 1, color5);
			SAI_draw_circle_3(ctx, -counter, s * 0.3, { x: s * 0.120 * 2, y: s * 0.1 * 1 }, 5, color6);
		}

		ctx.restore();
	}

	// 映像「画12: 万華鏡」の描画。
	// pic12: Kaleidoscope
	const SAI_draw_pic_12_sub = function(ctx, px, py, dx, dy){
		ctx.save(); // 現在の座標系やクリッピングなどを保存する。

		if(false){
			// 万華鏡のソースを描画する。
			draw_kaleido_source(ctx, px, py, dx, dy);
		}else{
			// 黒色で長方形領域を塗りつぶす。
			ctx.fillStyle = 'black';
			ctx.fillRect(px, py, dx, dy);

			// 万華鏡のソースを描画する。
			sai_kaleido_canvas_1 = Kaleido_create_empty_canvas(sai_kaleido_canvas_1, dx, dy);
			let ctx1 = sai_kaleido_canvas_1.getContext('2d', { alpha: false });
			draw_kaleido_source(ctx1, 0, 0, dx, dy);

			// 中点を原点とする。
			ctx1.translate(dx / 2, dy / 2);

			// 画面の寸法を使って計算する。
			let maxxy = Math.max(dx, dy), minxy = Math.min(dx, dy);

			// 映像の進行をつかさどる変数。
			let counter = SAI_get_tick_count_2() * 0.35;

			// 半径を振動させる。
			let r = sai_kaleido_radius * (0.7 + 0.25 * Math.sin(counter * 0.0052));

			// 万華鏡のキャンバスを作成し、万華鏡を描画する。
			let polygon = SAI_create_kaleido_polygon(counter, 0, 0, r);
			sai_kaleido_canvas_2 =
				Kaleido_create_drawn_canvas(sai_kaleido_canvas_2,
					sai_kaleido_radius, dx, dy, ctx1, polygon);
			ctx.drawImage(sai_kaleido_canvas_2, 0, 0, dx, dy, px, py, dx, dy);
		}

		ctx.restore(); // ctx.saveで保存した情報で元に戻す。
	}

	// 映像「画12: 万華鏡」の描画。
	// pic12: Kaleidoscope
	const SAI_draw_pic_12 = function(ctx, px, py, dx, dy){
		// 別のキャンバスに普通に描画する。
		let ctx2 = sai_id_canvas_02.getContext('2d', { alpha: false });
		ctx2.save();
		SAI_draw_pic_12_sub(ctx2, 0, 0, dx, dy);
		ctx2.restore();

		// 透明度を適用したイメージを転送する。これでモーションブラーが適用される。
		ctx.globalAlpha = 1 - sai_id_range_motion_blur.value * 0.1; // モーションブラーを掛ける。
		ctx.drawImage(sai_id_canvas_02, 0, 0, dx, dy, px, py, dx, dy);
		ctx.globalAlpha = 1; // 元に戻す。

		// フォーカス矢印を描画する。
		let qx = px + dx / 2, qy = py + dy / 2;
		SAI_draw_focus_arrows(ctx, qx, qy, dx, dy);
	}

	// 映像「画13: 1番目の色の画面」の描画。
	// pic13: 1st color screen
	const SAI_draw_pic_13 = function(ctx, px, py, dx, dy){
		// 1番目の色で長方形領域を塗りつぶす。
		ctx.fillStyle = SAI_color_get_1st();
		ctx.fillRect(px, py, dx, dy);
	}

	// 映像「画14: 2番目の色の画面」の描画。
	// pic14: 2st color screen
	const SAI_draw_pic_14 = function(ctx, px, py, dx, dy){
		// 2番目の色で長方形領域を塗りつぶす。
		ctx.fillStyle = SAI_color_get_2nd();
		ctx.fillRect(px, py, dx, dy);
	}

	// 映像「画15: ただの黒い画面」の描画。
	// pic15: Black screen
	const SAI_draw_pic_15 = function(ctx, px, py, dx, dy){
		// 黒で長方形領域を塗りつぶす。
		ctx.fillStyle = '#000';
		ctx.fillRect(px, py, dx, dy);
	}

	// 映像「画16: ただの白い画面」の描画。
	// pic16: White screen
	const SAI_draw_pic_16 = function(ctx, px, py, dx, dy){
		// 白で長方形領域を塗りつぶす。
		ctx.fillStyle = '#fff';
		ctx.fillRect(px, py, dx, dy);
	}

	// カウントダウン映像の描画。
	const SAI_draw_pic_count_down = function(ctx, px, py, dx, dy){
		ctx.save(); // 現在の座標系やクリッピングなどを保存する。

		// 画面中央の座標を計算する。
		let qx = px + dx / 2, qy = py + dy / 2;

		// 画面の辺の平均の長さ。
		let dxy = (dx + dy) / 2;

		// 黒で長方形領域を塗りつぶす。
		ctx.fillStyle = '#000';
		ctx.fillRect(px, py, dx, dy);

		// 長方形領域(px, py, dx, dy)をクリッピングする。
		SAI_clip_rect(ctx, px, py, dx, dy);

		if(sai_count_down){ // カウントダウン変数が有効なら
			let new_time = (new Date()).getTime();
			let diff_time = (new_time - sai_count_down) / 1000.0;
			if(diff_time >= 3){ // 3秒経過したら
				// カウントダウンを終了する。
				sai_count_down = null;
				// 必要ならスピーチを開始する。
				if(sai_id_checkbox_speech_on_off.checked){
					SAI_speech_start(sai_message_text);
				}
				// 必要ならミュートを解除する。
				if(sai_sound_object && !sai_sound_object.paused)
					sai_sound_object.volume = sai_id_range_sound_volume.value / 100.0;
				// 必要なら再開する。
				if(sai_id_checkbox_auto_play_sound.checked)
					SAI_sound_start(true);
			}else{
				// 数字を画面中央に描画する。
				let value = Math.floor(diff_time);
				let text = (3 - value).toString();

				let cxy = Math.min(dx, dy) * 0.8;
				ctx.font = `${cxy * 0.6}px san-serif`;

				ctx.textAlign = 'center';
				ctx.textBaseline = 'middle';

				ctx.fillStyle = "white";
				ctx.fillText(text, px + dx / 2, py + dy / 2);

				let radian = (diff_time % 1) * Math.PI * 2;
				ctx.beginPath();
				ctx.arc(px + dx / 2, py + dy / 2, cxy * 0.5, -Math.PI / 2, radian);
				ctx.strokeStyle = "white";
				ctx.lineWidth = 8;
				ctx.stroke();
			}
		}

		ctx.restore(); // ctx.saveで保存した情報で元に戻す。
	}

	// 映像の描画を一手に引き受ける。
	const SAI_draw_pic = function(ctx, px, py, dx, dy){
		if(sai_count_down){
			SAI_draw_pic_count_down(ctx, px, py, dx, dy);
			return;
		}
		if(sai_hypnosis_releasing_time){
			SAI_draw_pic_minus_1(ctx, px, py, dx, dy);
			return;
		}
		switch (sai_pic_type){
		case 0:
			SAI_draw_pic_00(ctx, px, py, dx, dy);
			break;
		case 1:
			SAI_draw_pic_01(ctx, px, py, dx, dy);
			break;
		case 2:
			SAI_draw_pic_02(ctx, px, py, dx, dy);
			break;
		case 3:
			SAI_draw_pic_03(ctx, px, py, dx, dy);
			break;
		case 4:
			SAI_draw_pic_04(ctx, px, py, dx, dy);
			break;
		case 5:
			SAI_draw_pic_05(ctx, px, py, dx, dy);
			break;
		case 6:
			SAI_draw_pic_06(ctx, px, py, dx, dy);
			break;
		case 7:
			SAI_draw_pic_07(ctx, px, py, dx, dy);
			break;
		case 8:
			SAI_draw_pic_08(ctx, px, py, dx, dy);
			break;
		case 9:
			SAI_draw_pic_09(ctx, px, py, dx, dy);
			break;
		case 10:
			SAI_draw_pic_10(ctx, px, py, dx, dy);
			break;
		case 11:
			SAI_draw_pic_11(ctx, px, py, dx, dy);
			break;
		case 12:
			SAI_draw_pic_12(ctx, px, py, dx, dy);
			break;
		case 13:
			SAI_draw_pic_13(ctx, px, py, dx, dy);
			break;
		case 14:
			SAI_draw_pic_14(ctx, px, py, dx, dy);
			break;
		case 15:
			SAI_draw_pic_15(ctx, px, py, dx, dy);
			break;
		case 16:
			SAI_draw_pic_16(ctx, px, py, dx, dy);
			break;
		}
	}

	// 必要なら映像効果をつけて映像を描画。
	const SAI_draw_pic_with_effects = function(ctx, px, py, dx, dy){
		let drawing_config = !sai_id_page_config.classList.contains('sai_class_invisible');
		// 一定の条件で画面点滅（サブリミナル）を表示。
		if((!sai_stopping || drawing_config) && !sai_count_down && sai_blinking_interval != 0 && !sai_hypnosis_releasing_time){
			if(SAI_mod(sai_old_time / 1000, sai_blinking_interval) < (sai_blinking_interval * 0.3)){
				SAI_draw_subliminal(ctx, px, py, dx, dy);
				return;
			}
		}

		// 普通に描画する。
		SAI_draw_pic(ctx, px, py, dx, dy);
	}

	// メッセージテキストの位置をゆらゆら動かす。
	const SAI_message_set_position = function(id, px, py, dx, dy, counter){
		let x = px + dx / 2 - id.clientWidth / 2;
		let y = py + dy * 0.7 - id.clientHeight / 2 + (1 + 0.4 * Math.sin(counter * 0.1)) * dy * 0.1;
		id.style.left = x + 'px';
		id.style.top = y + 'px';
	}

	// 映像のキャプションを描画する。
	const draw_caption = function(ctx){
		ctx.save(); // 現在の座標系やクリッピングなどを保存する。

		// 映像の種類のテキストを取得。
		let text = trans_getSelectOptionText(sai_id_select_pic_type, sai_id_select_pic_type.value);

		// キャンバスのサイズを取得。
		const dx = ctx.canvas.width, dy = ctx.canvas.height;

		// 小さければ拡大する。
		let text_size = 10;
		let measure;
		for(;;){
			ctx.font = text_size.toString() + 'px san-serif';
			measure = ctx.measureText(text);
			if((measure.width >= 15 && measure.width >= dx * 0.8) ||
			   (measure.actualBoundingBoxAscent + measure.actualBoundingBoxDescent > 15 &&
				measure.actualBoundingBoxAscent + measure.actualBoundingBoxDescent > dx * 0.025)) break;
			text_size *= 1.1;
		}
		let x = dx / 2, y = dy * 0.15;

		let width = measure.width * 0.6;
		let height = (measure.actualBoundingBoxAscent + measure.actualBoundingBoxDescent);

		// 半透明の長方形を描く。
		ctx.beginPath();
		ctx.moveTo(x - width, y - height);
		ctx.lineTo(x + width, y - height);
		ctx.lineTo(x + width, y + height);
		ctx.lineTo(x - width, y + height);
		ctx.closePath();
		ctx.strokeStyle = '#fff';
		ctx.lineWidth = 2;
		ctx.stroke();
		ctx.fillStyle = "rgba(255, 255, 255, 30%)";
		ctx.fill();

		// 黒いテキストに白い外枠を付けて描画。
		ctx.textAlign = 'center';
		ctx.textBaseline = 'middle';
		ctx.fillStyle = "white";
		for(let dy = -3; dy <= 3; ++dy){
			for(let dx = -3; dx <= 3; ++dx){
				if(Math.abs(dx) > 2 || Math.abs(dy) > 2)
					ctx.fillText(text, x + dx, y + dy);
			}
		}
		ctx.fillStyle = "black";
		ctx.fillText(text, x, y);

		ctx.restore(); // ctx.saveで保存した情報で元に戻す。
	}

	// FPSを描画する。
	const draw_fps = function(ctx, diff_time){
		if(ctx.canvas != sai_id_canvas_01)
			return;

		ctx.save(); // 現在の座標系やクリッピングなどを保存する。

		// FPSを描画する。
		if(diff_time != 0){
			sai_FPS = 1 / Math.abs(diff_time);
			sai_FPS = Math.round(sai_FPS * 10) / 10;
		}
		let text = Math.round(sai_FPS).toString() + '.' + (sai_FPS * 10 % 10).toString();
		ctx.font = '32px san-serif';
		let measure = ctx.measureText(text);
		let width = measure.width;
		let height = measure.actualBoundingBoxAscent + measure.actualBoundingBoxDescent;
		ctx.fillStyle = "white";
		ctx.fillText(text, (sai_screen_width - width) / 2, height);

		ctx.restore(); // ctx.saveで保存した情報で元に戻す。
	}

	// 映像をすべて描画する。
	const SAI_draw_all = function(){
		// 描画対象は何か？
		let drawing_main = !sai_id_page_main.classList.contains('sai_class_invisible');
		let drawing_config = !sai_id_page_config.classList.contains('sai_class_invisible');

		// 描画対象のキャンバスは何か？
		let the_canvas;
		if (drawing_main)
			the_canvas = sai_id_canvas_01;
		else if(drawing_config)
			the_canvas = sai_id_canvas_preview;
		else
			the_canvas = null;

		// 二次元の描画コンテキスト。キャンバスは不透明。
		let ctx = the_canvas.getContext('2d', { alpha: false });

		// 画面のサイズ。
		const dx = ctx.canvas.width, dy = ctx.canvas.height;

		let splitted = false; // 画面分割したか？
		if(sai_screen_split == 1){ // 画面分割なし。
			SAI_draw_pic_with_effects(ctx, 0, 0, dx, dy);
			SAI_message_set_position(sai_id_text_floating_1, 0, 0, dx, dy, sai_counter);
		}else{ // 画面２分割。
			if(dx >= dy){ // 横長。
				SAI_draw_pic_with_effects(ctx, 0, 0, dx / 2, dy);
				//SAI_draw_pic_with_effects(ctx, dx / 2, 0, dx / 2, dy); // drawImageで描画時間を節約。
				ctx.drawImage(the_canvas, 0, 0, dx / 2, dy, dx / 2, 0, dx / 2, dy);
				SAI_message_set_position(sai_id_text_floating_1, 0, 0, dx / 2, dy, sai_counter);
				SAI_message_set_position(sai_id_text_floating_2, dx / 2, 0, dx / 2, dy, sai_counter);
			}else{ // 縦長。
				SAI_draw_pic_with_effects(ctx, 0, 0, dx, dy / 2);
				//SAI_draw_pic_with_effects(ctx, 0, dy / 2, dx, dy / 2); // drawImageで描画時間を節約。
				ctx.drawImage(the_canvas, 0, 0, dx, dy / 2, 0, dy / 2, dx, dy / 2);
				SAI_message_set_position(sai_id_text_floating_1, 0, 0, dx, dy / 2, sai_counter);
				SAI_message_set_position(sai_id_text_floating_2, 0, dy / 2, dx, dy / 2, sai_counter);
			}
			splitted = true; // 画面分割した。
		}

		// 浮遊するテキストを処理する。
		if(drawing_main){
			if(sai_stopping || sai_count_down || sai_hypnosis_releasing_time){
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
			// テキストが大きすぎるなら少し小さくする。
			let text_surface = sai_id_text_floating_1.clientWidth * sai_id_text_floating_1.clientHeight;
			if(text_surface >= sai_screen_width * sai_screen_height / (splitted ? 2 : 1) / 3){
				if(sai_message_size > 1){
					sai_message_size -= 1;
					SAI_message_set_size(sai_message_size);
				}
			}

			// きらめきを描画する。
			for(let iStar = 0; iStar < sai_stars.length; ++iStar){
				let star = sai_stars[iStar];
				if(star){
					// 黄色い光を描く。
					ctx.fillStyle = `rgb(255, 255, 0, 0.8)`;
					SAI_draw_light(ctx, star[0], star[1], star[2]);

					// きらめきの半径がだんだん小さくなる演出。
					if(star[2] > 1.0){
						star[2] *= 0.98;
					}
				}
			}
			// きらめきがだんだん消えうせる演出。
			sai_stars.shift();
			sai_stars.push(null);
		}

		// 画面サイズが変わっていればキャンバスをフィットさせる。
		if(window.innerWidth != sai_screen_width || window.innerHeight != sai_screen_height ||
		   window.innerWidth != sai_id_canvas_01.width || window.innerHeight != sai_id_canvas_01.height)
		{
			SAI_screen_fit();
		}

		// 時間の経過を計算。
		let new_time = (new Date()).getTime();
		let diff_time = (new_time - sai_old_time) / 1000.0;
		if(sai_rotation_type == 'counter')
			diff_time = -diff_time;
		if((sai_stopping && !drawing_config) || (sai_pic_type == 6 && sai_touching_coin))
			diff_time = 0;
		sai_counter += diff_time * sai_speed;
		sai_old_time = new_time;

		if(sai_speed_irregular){ // スピードが不規則なら
			sai_clock += diff_time;
			if(sai_clock >= sai_speed / 30.0){ // ときどき速度を変える。
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

		// デバッグ中ならFPSを描画する。
		if(sai_DEBUGGING){
			draw_fps(ctx, diff_time);
		}

		// 停止中なら映像のキャプションを表示する。
		if(sai_stopping && drawing_main){
			draw_caption(ctx);
		}

		// 時が過ぎたら催眠解除を完了する。
		if(SAI_is_hypno_released()){
			// 3秒待った。解除されたと仮定。画像のソースを更新。
			sai_hypno_releasing_img.src = trans_getText('TEXT_HYPNOSIS_RELEASED_IMG');
			sai_all_released_img.src = trans_getText('TEXT_ALL_RELEASED_IMG');
		}

		// 必要ならアニメーションを要求する。
		if(sai_request_anime){
			sai_request_anime = window.requestAnimationFrame(SAI_draw_all);
		}
	}

	// ローカルストレージから設定を読み込む。設定がなければ初期化する。
	const SAI_load_local_storage = function(){
		// ローカルストレージに催眠テキストがあれば読み込む。
		let saiminText = localStorage.getItem('saiminText');
		if(saiminText){
			SAI_message_set_text(saiminText);
		}

		// ローカルストレージに画面分割があれば読み込む。
		let saiminDivision = localStorage.getItem('saiminDivision');
		if(saiminDivision){
			SAI_screen_set_split(saiminDivision);
		}

		// ローカルストレージにカウントダウンがあれば読み込む。
		let saiminCountDown = localStorage.getItem('saiminCountDown');
		if(saiminCountDown){
			SAI_set_count_down(saiminCountDown);
		}

		// ローカルストレージに矢印表示の設定があれば読み込む。
		let saiminShowArrows = localStorage.getItem('saiminShowArrows');
		if(saiminShowArrows){
			SAI_set_arrows(saiminShowArrows);
		} else {
			SAI_set_arrows(true);
		}

		// ローカルストレージに音声の名前があれば読み込む。
		let saiminSoundName = localStorage.getItem('saiminSoundName');
		if(saiminSoundName){
			SAI_sound_set_name(saiminSoundName);
		}else{
			SAI_sound_set_name('Magic');
		}

		// ローカルストレージに効果音の音量の設定があれば読み込む。
		let saiminSoundVolume = localStorage.getItem('saiminSoundVolume');
		if(saiminSoundVolume){
			SAI_sound_set_volume(saiminSoundVolume);
		}else{
			SAI_sound_set_volume(100);
		}

		// ローカルストレージにスピーチの音量の設定があれば読み込む。
		let saiminMessageVolume = localStorage.getItem('saiminMessageVolume');
		if(saiminMessageVolume){
			SAI_message_set_voice_volume(saiminMessageVolume);
		}else{
			SAI_message_set_voice_volume(100);
		}

		// ローカルストレージにモーションブラーの設定があれば読み込む。
		let saiminMotionBlur = localStorage.getItem('saiminMotionBlur');
		if(saiminMotionBlur){
			SAI_set_motion_blur(saiminMotionBlur);
		}else{
			SAI_set_motion_blur(5);
		}

		// ローカルストレージに映像切り替えの種類があれば読み込む。
		let saiminSwitchSound = localStorage.getItem('saiminSwitchSound');
		if(saiminSwitchSound){
			SAI_set_type_sound(saiminSwitchSound);
		}

		// ローカルストレージにスピードの種類があれば読み込む。
		let saiminSpeedType = localStorage.getItem('saiminSpeedType');
		if(saiminSpeedType){
			SAI_speed_set_type(saiminSpeedType);
		}else{
			SAI_speed_set_type('normal');
		}

		// ローカルストレージに画面点滅の種類があれば読み込む。
		let saiminBlinkType = localStorage.getItem('saiminBlinkType');
		if(saiminBlinkType){
			SAI_blink_set_type(saiminBlinkType);
		}else{
			SAI_blink_set_type(0);
		}

		// ローカルストレージに回転の向きがあれば読み込む。
		let saiminRotation = localStorage.getItem('saiminRotation');
		if(saiminRotation){
			SAI_rotation_set(saiminRotation);
		}else{
			SAI_rotation_set('normal');
		}

		// ローカルストレージにメッセージのサイズがあれば読み込む。
		let saiminMessageSize = localStorage.getItem('saiminMessageSize');
		if(saiminMessageSize){
			SAI_message_set_size(saiminMessageSize);
		}else{
			SAI_message_set_size('normal');
		}

		// ローカルストレージに画面の明るさがあれば読み込む。
		let saiminScreenBrightness = localStorage.getItem('saiminScreenBrightness');
		if(saiminScreenBrightness){
			SAI_screen_set_brightness(saiminScreenBrightness);
		}else{
			SAI_screen_set_brightness('normal');
		}

		// ローカルストレージに渦の向きがあれば読み込む。
		let saiminVortexDirection = localStorage.getItem('saiminVortexDirection');
		if(saiminVortexDirection){
			SAI_set_vortex_direction(saiminVortexDirection);
		}else{
			SAI_set_vortex_direction('clockwise');
		}

		// ローカルストレージにスピーチがあれば読み込む。
		let saiminSpeech = localStorage.getItem('saiminSpeech');
		if(saiminSpeech){
			SAI_speech_set(saiminSpeech);
		}else{
			SAI_speech_set(false);
		}

		// ローカルストレージにメッセージリストがあれば読み込む。
		SAI_load_message_list();

		// 色を読み込む。
		let saimin1stColor = localStorage.getItem('saimin1stColor');
		if(saimin1stColor){
			sai_id_color_1st.value = saimin1stColor;
		}else{
			sai_id_color_1st.value = '#ff00ff';
		}
		let saimin2ndColor = localStorage.getItem('saimin2ndColor');
		if(saimin2ndColor){
			sai_id_color_2nd.value = saimin2ndColor;
		}else{
			sai_id_color_2nd.value = '#000000';
		}

		// ローカルストレージに自動再生の設定があれば読み込む。
		let saiminAutoPlay = localStorage.getItem('saiminAutoPlay');
		if(saiminAutoPlay){
			sai_id_checkbox_auto_play_sound.checked = true;
		}else{
			sai_id_checkbox_auto_play_sound.checked = false;
		}

		// 虹色の設定。
		let saimin1stColorRainbow = localStorage.getItem('saimin1stColorRainbow');
		if(saimin1stColorRainbow){
			sai_id_checkbox_color_1st_rainbow.checked = true;
		}else{
			sai_id_checkbox_color_1st_rainbow.checked = false;
		}
		let saimin2ndColorRainbow = localStorage.getItem('saimin2ndColorRainbow');
		if(saimin2ndColorRainbow){
			sai_id_checkbox_color_2nd_rainbow.checked = true;
		}else{
			sai_id_checkbox_color_2nd_rainbow.checked = false;
		}
	}

	// 必要ならば切り替え音を再生する。
	const SAI_sound_play_switch = function(){
		if(sai_switch_sound_type == 1 && sai_switch_sound_object && sai_id_checkbox_switching_sound.checked){
			sai_switch_sound_object.play();
		}
	}

	// キャンバスがクリックされた。
	const SAI_canvas_click = function(e){
		if(sai_stopping) // 停止中なら無視。
			return;

		// フルスクリーンモード、またはツールボタンが見えるか？
		if(!sai_id_checkbox_fullscreen.checked || SAI_are_tool_buttons_shown()){
			if(sai_hypnosis_releasing_time){ // 催眠解除の場合
				// ダミー画面に戻す。
				SAI_pic_set_type(0);
				// 催眠解除の音声を止める。
				if(sai_releasing_sound && !sai_releasing_sound.paused)
					sai_releasing_sound.pause();
			}
			// メインコントロール群を表示する。
			SAI_show_main_controls(true);
			// 映像の停止。
			sai_stopping = true;
			// 音声の停止。
			if(sai_sound_object && !sai_sound_object.paused){
				sai_sound_object.pause();
				sai_id_button_sound_play.classList.remove('sai_class_checked');
			}
			// カウントダウンを破棄する。
			sai_count_down = null;
			// スピーチをキャンセル。
			SAI_speech_cancel();
			// カウンターのリセット。
			sai_counter = 0;
		}else{
			// ツールボタンを表示する。ツールボタンは、sai_class_tool_buttonクラスを持つ要素。
			let tool_buttons = document.getElementsByClassName('sai_class_tool_button');
			for(let button of tool_buttons){
				button.classList.remove('sai_class_invisible');
			}
		}
	}

	// 音声を再生開始。
	const SAI_sound_start = function(is_loop = false){
		// 必要ならば音声を作成。
		if(!sai_sound_object)
			SAI_sound_create();
		// 音声なしなら
		if(!sai_sound_object){
			// UIを更新。
			sai_id_button_sound_play.classList.remove('sai_class_checked');
			sai_id_image_config_play_pause.classList.remove('playing');
			return;
		}

		// 音量と再生位置の設定。
		sai_sound_object.volume = sai_id_range_sound_volume.value / 100.0;
		sai_sound_object.currentTime = 0;

		// 必要ならループする。
		if(is_loop)
			sai_sound_object.loop = sai_id_checkbox_auto_repeat_sound.checked;
		else
			sai_sound_object.loop = false;

		// 再生を開始する。
		sai_sound_object.play();

		// UIを更新。
		sai_id_button_sound_play.classList.add('sai_class_checked');
		sai_id_image_config_play_pause.classList.add('playing');
	}

	// 音声の再生と停止を切り替える。
	const SAI_sound_toggle = function(is_loop = false){
		if(SAI_sound_is_playing()){
			SAI_sound_pause();
		}else{
			SAI_sound_start(is_loop);
		}
	}

	// 音声をミュート。
	const SAI_sound_mute = function(){
		if(sai_sound_object){
			sai_sound_object.volume = 0.0;
		}
	}

	// メッセージリストに追加する。
	const SAI_add_to_message_list = function(message){
		// 空文字列は追加しない。
		if(!message)
			return;
		// メッセージリストにあれば取り除く。
		let index = sai_user_message_list.indexOf(message);
		if(index >= 0)
			sai_user_message_list.splice(index, 1);
		// 配列の末尾に追加。
		sai_user_message_list.push(message);
		// 64項目までに制限。
		while(sai_user_message_list.length > 64)
			sai_user_message_list.shift();
	}

	// メッセージリストを読み込む。
	const SAI_load_message_list = function(){
		let saiminMessageCount = localStorage.getItem('saiminMessageCount');
		saiminMessageCount = parseInt(saiminMessageCount);
		sai_user_message_list = [];
		for(let i = 0; i < saiminMessageCount; ++i){
			let saiminMessage = localStorage.getItem('saiminMessage' + i.toString());
			sai_user_message_list.push(saiminMessage);
		}
	}

	// メッセージリストを保存する。
	const SAI_save_message_list = function(){
		localStorage.setItem('saiminMessageCount', sai_user_message_list.length.toString());
		let i = 0;
		for(let item of sai_user_message_list){
			localStorage.setItem('saiminMessage' + i.toString(), item);
			++i;
		}
	}

	// 画面のサイズが変わったときに呼び出される関数。
	const SAI_screen_resize = function(){
		console.log(`innerWidth:${window.innerWidth}, innerHeight:${window.innerHeight}`);
		sai_screen_width = window.innerWidth;
		sai_screen_height = window.innerHeight;
		// 万華鏡の半径。
		sai_kaleido_radius = (sai_screen_width + sai_screen_height) * 0.1;
	}

	// イベントリスナー群を登録する。
	const SAI_register_event_listeners = function(){
		// 「メッセージ」ボタン。
		sai_id_button_message.addEventListener('click', function(){
			if(sai_hypnosis_releasing_time)
				return; // 催眠解除中。
			// メッセージ文字列の入力を促す。
			let text = prompt(trans_getText('TEXT_INPUT_MESSAGE'), sai_message_text);
			if(text !== null){
				SAI_message_set_text(text);
			}
		});

		// 「バージョン情報」画面。
		sai_id_button_about.addEventListener('click', function(e){
			SAI_help_and_agreement();
			// 必要ならば切り替え音を再生する。
			SAI_sound_play_switch();
		});

		// 「設定」画面のOKボタン。
		sai_id_button_config_ok.addEventListener('click', function(e){
			// 画面遷移前に音声を停止。
			SAI_sound_pause();
			// 設定を閉じたことを覚えておく。
			localStorage.removeItem('saiminConfigShowing');
			// 画面遷移。
			SAI_choose_page(sai_id_page_main);
			// 必要ならば切り替え音を再生する。
			SAI_sound_play_switch();
		});

		// 「一つ前の映像」ボタン。
		sai_id_button_previous_image.addEventListener('click', function(e){
			let type = parseInt(sai_pic_type);
			type = (type + sai_NUM_TYPE - 1) % sai_NUM_TYPE;
			SAI_pic_set_type(type);
			// 必要ならば切り替え音を再生する。
			SAI_sound_play_switch();
		});
		// 「一つ次の映像」ボタン。
		sai_id_button_next_image.addEventListener('click', function(e){
			let type = parseInt(sai_pic_type);
			type = (type + 1) % sai_NUM_TYPE;
			SAI_pic_set_type(type);
			// 必要ならば切り替え音を再生する。
			SAI_sound_play_switch();
		});

		// 「催眠開始」ボタン。
		sai_id_button_start_hypnosis.addEventListener('click', function(e){
			// 映像を再開する。
			sai_stopping = false;
			// メインコントロール群を非表示にする。
			SAI_show_main_controls(false);
			// 必要ならカウントダウンを開始する。
			if(sai_id_checkbox_count_down.checked){
				sai_count_down = new Date().getTime();
				// 音声をミュートする。
				SAI_sound_mute();
			}else{
				// 必要ならスピーチを開始する。
				if(sai_id_checkbox_speech_on_off.checked){
					SAI_speech_start(sai_message_text);
				}
				// 再生中ではなく、自動再生なら
				if(!SAI_sound_is_playing() && sai_id_checkbox_auto_play_sound.checked){
					// 音声を再生する。
					SAI_sound_start(true);
				}
			}
		});
		// 「催眠解除」ボタン。
		sai_id_button_release_hypnosis.addEventListener('click', function(e){
			// 解除映像に切り替える。
			SAI_pic_set_type(-1);

			// 映像を再開する。
			sai_stopping = false;

			// メインコントロール群を非表示にする。
			SAI_show_main_controls(false);
		});

		// 「音声再生」ボタン。
		sai_id_button_sound_play.addEventListener('click', function(){
			if(sai_hypnosis_releasing_time){ // 催眠解除中？
				let lang = localStorage.getItem('saiminLanguage3');
				if(!sai_releasing_sound)
					sai_releasing_sound = new Audio(trans_getText('TEXT_MP3_RELEASED_HYPNOSIS'));
				if(sai_releasing_sound.paused){
					sai_releasing_sound.currentTime = 0;
					sai_releasing_sound.play();
				}else{
					sai_releasing_sound.pause();
				}
				return;
			}
			// 選択されている音声名があれば
			if(sai_sound_name != ''){
				// 必要ならば音声を作成。
				if(!sai_sound_object)
					SAI_sound_create();
				// 再生と停止を切り替える。
				SAI_sound_toggle(true);
			}else{
				SAI_config();
			}
		});

		// 「設定」ボタン。
		sai_id_button_config.addEventListener('click', function(){
			SAI_config();
			// 必要ならば切り替え音を再生する。
			SAI_sound_play_switch();
		});

		// 映像選択。
		sai_id_select_pic_type.addEventListener('change', function(){
			SAI_pic_set_type(parseInt(sai_id_select_pic_type.value));
		}, false);
		sai_id_select_pic_type.addEventListener('click', function(){
			SAI_pic_set_type(parseInt(sai_id_select_pic_type.value));
		}, false);

		// 言語選択。
		sai_id_select_language_1.addEventListener('change', function(){
			SAI_set_language(sai_id_select_language_1.value);
		}, false);

		// 「私は合意します」ボタン。
		sai_id_button_agree.addEventListener('click', function(e){
			localStorage.removeItem('saiminHelpShowing');
			localStorage.setItem('saiminUserAccepted', '1');
			SAI_choose_page(sai_id_page_main);
			sai_first_time = false;
			// 必要ならば切り替え音を再生する。
			SAI_sound_play_switch();
		});

		// メッセージサイズ選択。
		sai_id_select_message_size.addEventListener('input', function(){
			SAI_message_set_size(sai_id_select_message_size.value);
		}, false);

		sai_id_range_voice_volume.addEventListener('input', function(){
			SAI_message_set_voice_volume(sai_id_range_voice_volume.value);
		}, false);

		// モーションブラーの設定。
		sai_id_range_motion_blur.addEventListener('input', function(){
			SAI_set_motion_blur(sai_id_range_motion_blur.value);
		}, false);

		// 画面の明るさ選択。
		sai_id_select_brightness.addEventListener('change', function(){
			SAI_screen_set_brightness(sai_id_select_brightness.value, true);
		}, false);

		// 渦の向き選択。
		sai_id_select_vortex_direction.addEventListener('change', function(){
			SAI_set_vortex_direction(sai_id_select_vortex_direction.value);
		}, false);

		// 音声選択。
		sai_id_select_sound.addEventListener('change', function(){
			SAI_sound_set_name(sai_id_select_sound.value);
		}, false);
		sai_id_select_sound.addEventListener('click', function(){
			SAI_sound_set_name(sai_id_select_sound.value);
		}, false);

		// 設定の音声再生ボタン。
		sai_id_button_sound_config_play.addEventListener('click', function(){
			// 再生停止を切り替える。
			SAI_sound_toggle(false);
		}, false);

		// 映像切り替えの音声の有無に関するボタン。
		sai_id_checkbox_switching_sound.addEventListener('change', function(){
			SAI_set_type_sound(sai_id_checkbox_switching_sound.checked, true);
		}, false);
		sai_id_checkbox_switching_sound.addEventListener('click', function(){
			SAI_set_type_sound(sai_id_checkbox_switching_sound.checked, true);
		}, false);

		// 画面分割のチェックボックス。
		sai_id_checkbox_split.addEventListener('change', function(){
			SAI_screen_set_split(sai_id_checkbox_split.checked ? 2 : 1);
		}, false);
		sai_id_checkbox_split.addEventListener('click', function(){
			SAI_screen_set_split(sai_id_checkbox_split.checked ? 2 : 1);
		}, false);

		// カウントダウンの有無選択。
		sai_id_checkbox_count_down.addEventListener('change', function(e){
			SAI_set_count_down(sai_id_checkbox_count_down.checked);
		}, false);
		sai_id_checkbox_count_down.addEventListener('click', function(e){
			SAI_set_count_down(sai_id_checkbox_count_down.checked);
		}, false);

		// 矢印表示のチェックボックス。
		sai_id_checkbox_arrows.addEventListener('change', function(e){
			SAI_set_arrows(sai_id_checkbox_arrows.checked);
		}, false);
		sai_id_checkbox_arrows.addEventListener('click', function(e){
			SAI_set_arrows(sai_id_checkbox_arrows.checked);
		}, false);

		// 映像スピードの選択。
		sai_id_range_speed_type.addEventListener('input', function(){
			SAI_speed_set_type(sai_id_range_speed_type.value);
		}, false);

		// 映像スピードの「不規則」チェックボックス。
		sai_id_checkbox_speed_irregular.addEventListener('change', function(){
			if(sai_id_checkbox_speed_irregular.checked){
				SAI_speed_set_type('irregular');
			}else{
				SAI_speed_set_type('normal');
			}
		}, false);

		// 音量の選択。
		sai_id_range_sound_volume.addEventListener('input', function(e){
			SAI_sound_set_volume(sai_id_range_sound_volume.value);
		});

		// 「回転の向き」チェックボックス。
		sai_id_checkbox_rotation.addEventListener('change', function(){
			SAI_rotation_set(sai_id_checkbox_rotation.checked);
		}, false);

		// 「画面点滅」の種類選択。
		sai_id_range_blink_type.addEventListener('input', function(){
			SAI_blink_set_type(sai_id_range_blink_type.value);
		}, false);

		// 「メッセージをしゃべる」
		sai_id_checkbox_speech_on_off.addEventListener('click', function(e){
			SAI_speech_set(sai_id_checkbox_speech_on_off.checked);
		});

		// キャンバスのクリック。
		sai_id_canvas_01.addEventListener('click', function(e){
			if(!sai_not_click && sai_touch_time && ((new Date()).getTime() - sai_touch_time) < 500)
				SAI_canvas_click(e);
			sai_not_click = false;
			sai_touch_position = null;
		}, false);

		// キャンバスでマウス移動。
		sai_id_canvas_01.addEventListener('mousemove', function(e){
			SAI_star_add(e.clientX, e.clientY);
			if(sai_touchmoving){
				sai_touch_position = [e.clientX, e.clientY];
				sai_not_click = true;
			}
		}, false);

		// キャンバスでマウスボタンが押された。
		sai_id_canvas_01.addEventListener('mousedown', function(e){
			sai_touchmoving = true;
			sai_not_click = false;
			sai_touch_position = [e.clientX, e.clientY];
			sai_touch_time = new Date().getTime();
		}, false);
		// キャンバスでマウスボタンが離された。
		sai_id_canvas_01.addEventListener('mouseup', function(e){
			sai_touchmoving = false;
			sai_touch_position = null;
			sai_not_click = false;
		}, false);

		// キャンバスでタッチ操作。きらめきを表示。
		sai_id_canvas_01.addEventListener('touchstart', function(e){
			sai_touchmoving = true;
			sai_touch_time = new Date().getTime();
			let touches = e.touches;
			if(touches && touches.length == 1){
				sai_touch_position = [touches[0].clientX, touches[0].clientY];
			}
		}, {passive: true});
		sai_id_canvas_01.addEventListener('touchmove', function(e){
			if(sai_touchmoving){
				let touches = e.touches;
				if(touches && touches.length == 1){
					SAI_star_add(touches[0].clientX, touches[0].clientY);
					sai_touch_position = [touches[0].clientX, touches[0].clientY];
				}else{
					sai_touch_position = null;
				}
			}
		}, {passive: true});
		sai_id_canvas_01.addEventListener('touchend', function(e){
			sai_touchmoving = false;
			sai_touch_position = null;
		}, {passive: true});
		sai_id_canvas_01.addEventListener('touchcancel', function(e){
			sai_touchmoving = false;
			sai_touch_position = null;
		}, {passive: true});

		// キャンバスでマウスホイール回転。
		sai_id_canvas_01.addEventListener('wheel', function(e){
			e.preventDefault();
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

		// スピーチをクリック。
		sai_id_button_speech.addEventListener('click', function(e){
			if(sai_hypnosis_releasing_time)
				return; // 催眠解除中のときは反応しない。
			// メッセージリストダイアログを表示。
			SAI_choose_page(sai_id_page_message);
		});

		// ウィンドウのサイズ変更や画面の回転を検出する。
		window.addEventListener('resize', function(){
			SAI_screen_resize();
		}, false);
		SAI_screen_resize();

		// マイクボタンの実装。
		let mic_isInited = false;
		sai_id_button_microphone.addEventListener('click', function(e){
			if(!sai_id_button_microphone.classList.contains('sai_class_checked')){
				if(!mic_isInited){
					mic_setup();
					mic_isInited = true;
				}
				mic_connect();
				sai_id_button_microphone.classList.add('sai_class_checked');
			}else{
				mic_disconnect();
				sai_id_button_microphone.classList.remove('sai_class_checked');
			}
		});

		// 言語選択のOKボタン。
		sai_id_button_choose_language.addEventListener('click', function(e){
			SAI_set_language(sai_id_select_language_2.value);
			SAI_set_skin(trans_getDefaultSkin(), true);
			if(localStorage.getItem('saiminUserAccepted'))
				SAI_choose_page(sai_id_page_main);
			else
				SAI_help_and_agreement();
		});

		// フルスクリーンモード。
		sai_id_checkbox_fullscreen.addEventListener('click', function(e){
			SAI_screen_set_fullscreen_mode(sai_id_checkbox_fullscreen.checked);
		});

		// 音声の自動繰り返し。
		sai_id_checkbox_auto_repeat_sound.addEventListener('click', function(e){
			SAI_sound_set_auto_repeat(sai_id_checkbox_auto_repeat_sound.checked);
		});

		// メッセージをOK。
		sai_id_button_mesage_ok.addEventListener('click', function(e){
			// メッセージテキストを設定する。
			SAI_message_set_text(sai_id_text_message.value);
			// メッセージリストに追加する。
			SAI_add_to_message_list(sai_message_text);
			// メッセージリストを保存する。
			SAI_save_message_list();
			// しゃべるかしゃべらないかを設定。
			if(sai_id_checkbox_message_speech.checked){
				SAI_speech_set(true);
				if(!sai_stopping)
					SAI_speech_start(sai_message_text);
			}else{
				SAI_speech_set(false);
				SAI_speech_cancel();
			}
			// 現在のページが閉じたことをローカルストレージに設定。
			localStorage.removeItem('saiminMessageListShowing');
			// メインページに移動。
			SAI_choose_page(sai_id_page_main);
		});

		// メッセージをキャンセル。
		sai_id_button_mesage_cancel.addEventListener('click', function(e){
			localStorage.removeItem('saiminMessageListShowing');
			SAI_choose_page(sai_id_page_main);
		});

		// メッセージをリセット。
		sai_id_button_mesage_reset.addEventListener('click', function(e){
			SAI_message_set_text('');
			sai_user_message_list = [];
			SAI_save_message_list();
			localStorage.removeItem('saiminMessageListShowing');
			SAI_choose_page(sai_id_page_main);
		});

		// 「戻る」をクリック。
		sai_id_button_message_back.addEventListener('click', function(e){
			sai_id_button_mesage_ok.click();
		});
		sai_id_button_config_back.addEventListener('click', function(e){
			// 画面遷移前に音声を停止。
			SAI_sound_pause();
			// 設定を閉じたことを覚えておく。
			localStorage.removeItem('saiminConfigShowing');
			// 画面遷移。
			SAI_choose_page(sai_id_page_main);
		});
		sai_id_button_agreement_back.addEventListener('click', function(e){
			localStorage.removeItem('saiminHelpShowing');
			SAI_choose_page(sai_id_page_main);
		});

		// 色を保存。
		sai_id_color_1st.addEventListener('change', function(e){
			localStorage.setItem('saimin1stColor', sai_id_color_1st.value);
		});
		sai_id_color_2nd.addEventListener('change', function(e){
			localStorage.setItem('saimin2ndColor', sai_id_color_2nd.value);
		});
		sai_id_color_1st_reset.addEventListener('click', function(e){
			sai_id_color_1st.value = trans_getColor('COLOR_1ST');
			sai_id_checkbox_color_1st_rainbow.checked = false;
			localStorage.setItem('saimin1stColor', sai_id_color_1st.value);
		});
		sai_id_color_2nd_reset.addEventListener('click', function(e){
			sai_id_color_2nd.value = trans_getColor('COLOR_2ND');
			sai_id_checkbox_color_2nd_rainbow.checked = false;
			localStorage.setItem('saimin2ndColor', sai_id_color_2nd.value);
		});

		// アプリの初期化ボタン。
		sai_id_button_init_app.addEventListener('click', function(e){
			if(confirm(trans_getText('TEXT_INIT_APP'))){
				let text = trans_getText('TEXT_INITTED_APP');
				localStorage.clear();
				alert(text);
				location.reload();
			}
		});

		// 自動再生を保存。
		sai_id_checkbox_auto_play_sound.addEventListener('click', function(e){
			if(sai_id_checkbox_auto_play_sound.checked){
				localStorage.setItem('saiminAutoPlay', 'true');
			}else{
				localStorage.removeItem('saiminAutoPlay');
			}
		});

		// 虹色を保存。
		sai_id_checkbox_color_1st_rainbow.addEventListener('click', function(e){
			if(sai_id_checkbox_color_1st_rainbow.checked){
				localStorage.setItem('saimin1stColorRainbow', 'true');
			}else{
				localStorage.removeItem('saimin1stColorRainbow');
			}
		});
		sai_id_checkbox_color_2nd_rainbow.addEventListener('click', function(e){
			if(sai_id_checkbox_color_2nd_rainbow.checked){
				localStorage.setItem('saimin2ndColorRainbow', 'true');
			}else{
				localStorage.removeItem('saimin2ndColorRainbow');
			}
		});

		// スピーチの音量の設定
		sai_id_button_voice_play.addEventListener('click', function(e){
			SAI_speech_start(sai_message_text, true);
		});

		// プレビュー設定。
		sai_id_checkbox_preview.addEventListener('click', function(e){
			if (sai_id_checkbox_preview.checked)
				sai_id_canvas_preview.classList.remove('sai_class_invisible');
			else
				sai_id_canvas_preview.classList.add('sai_class_invisible');
		});

		// 顔認識のページに移動するボタン。
		sai_id_button_target.addEventListener('click', function(e){
			localStorage.setItem('saiminFaceGetterShowing', "1");
			SAI_choose_page(sai_id_page_face_getter);
		});

		// 顔認識のページをクリックしたら発火。
		sai_id_canvas_face.addEventListener('click', function(e){
			if(sai_face_getter)
				sai_face_getter.on_click(e);
		});

		// 顔認識のページの「ロックオン」ボタン。
		sai_id_button_lock_on.addEventListener('click', function(e){
			if(sai_face_getter)
				sai_face_getter.lock_unlock();
		});

		// 顔認識のページの「カメラの向き」ボタン。
		sai_id_button_side.addEventListener('click', function(){
			if(sai_face_getter)
				sai_face_getter.set_side();
		});

		// 顔認識のページの「戻る」ボタン。
		sai_id_button_face_getter_back.addEventListener('click', function(){
			localStorage.removeItem('saiminFaceGetterShowing');
			SAI_choose_page(sai_id_page_main);
		});

		// 顔認識のページの「閉じる」ボタン。
		sai_id_button_close.addEventListener('click', function(){
			localStorage.removeItem('saiminFaceGetterShowing');
			SAI_choose_page(sai_id_page_main);
		});

		// スキン。
		sai_id_select_skin.addEventListener('change', function(){
			SAI_set_skin(sai_id_select_skin.value, true);
		});
	}

	// キーボード操作を実装。
	const SAI_register_key_bindings = function(){
		document.body.addEventListener('keydown', function(e){
			if(e.ctrlKey || sai_id_page_main.classList.contains('sai_class_invisible'))
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
			if(e.key == 'p' || e.key == 'P'){ // Play/Pause
				sai_id_button_sound_play.click();
				return;
			}
			if(e.key == 'm' || e.key == 'M'){ // Microphone
				sai_id_button_microphone.click();
				return;
			}
			if(e.key == 't' || e.key == 'T'){ // Text
				sai_id_button_message.click();
				return;
			}
			if(e.key == 's' || e.key == 'S'){ // Speech
				sai_id_button_speech.click();
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
				if(sai_screen_split == 1){
					SAI_screen_set_split(2);
				}else{
					SAI_screen_set_split(1);
				}
				return;
			}
			if(e.key == 'b' || e.key == 'B'){ // buttons
				SAI_show_main_controls(sai_id_button_microphone.classList.contains('sai_class_invisible'));
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

	// ツールボタンが見えるかどうか？
	const SAI_are_tool_buttons_shown = function(){
		// ツールボタン群を取得する。ツールボタンは、sai_class_tool_buttonクラスを持つ要素。
		let tool_buttons = document.getElementsByClassName('sai_class_tool_button');
		for(let button of tool_buttons){
			if(!button.classList.contains('sai_class_invisible'))
				return true; // 見える。
		}
		return false; // 見えない。
	}

	// メインのボタン群を表示または非表示にする。
	const SAI_show_main_controls = function(show){
		// メインコントロール群を取得する。
		// メインコントロールはsai_class_button_main_controlクラスを持つ要素。
		let main_controls = document.getElementsByClassName('sai_class_button_main_control');

		// ツールボタン群を取得する。
		// ツールボタンは、sai_class_tool_buttonクラスを持つ要素。
		let tool_buttons = document.getElementsByClassName('sai_class_tool_button');

		// sai_class_invisibleクラスを除去または追加することで、コントロールボタンの表示を切り替える。
		if(show){
			for(let control of main_controls){
				control.classList.remove('sai_class_invisible');
			}
			for(let button of tool_buttons){
				button.classList.remove('sai_class_invisible');
			}
		}else{
			for(let control of main_controls){
				control.classList.add('sai_class_invisible');
			}
			if(sai_id_checkbox_fullscreen.checked){
				for(let button of tool_buttons){
					button.classList.add('sai_class_invisible');
				}
			}
		}
	}

	// メイン関数。
	const SAI_main = function(){
		const argc = arguments.length, argv = arguments;

		// スピーチをキャンセルする。
		SAI_speech_cancel();

		// キャンバスを画面にフィットさせる。
		SAI_screen_fit_canvas();

		// 五円玉の画像を読み込む。
		sai_coin_img.src = 'img/coin5yen.png';

		// スパイラルの画像も更新。
		if (sai_id_select_vortex_direction.value == 'counterclockwise')
			sai_spiral_img.src = 'img/spiral2.svg';
		else
			sai_spiral_img.src = 'img/spiral.svg';

		// 両目の画像を読み込む。
		sai_eye_left_img.src = 'img/eye-left.svg'
		sai_eye_right_img.src = 'img/eye-right.svg'

		// 設定をローカルストレージから読み込む。
		SAI_load_local_storage();

		// イベントリスナー群を登録する。
		SAI_register_event_listeners();

		// ネイティブアプリでなければネイティブオンリーの要素を隠す。
		if(!SAI_is_native_app()){
			let items = document.getElementsByClassName('sai_class_native_app_only');
			for(let item of items){
				item.classList.add('sai_class_invisible');
			}
		}

		// ローカルストレージに応じて処理を行う。
		let saiminUserAccepted = localStorage.getItem('saiminUserAccepted');
		let saiminLanguage3 = localStorage.getItem('saiminLanguage3');
		let saiminSkin = localStorage.getItem('saiminSkin');
		if(saiminUserAccepted && saiminLanguage3){ // すでにアダルトチェックが完了しているか？
			// 言語をセット。
			SAI_set_language(saiminLanguage3);
			// スキンをセット。
			SAI_set_skin(saiminSkin);

			// ユーザを受け入れる。
			SAI_user_accepted();
		}else if(!saiminLanguage3){ // まだ言語選択が出来ていない？
			// 言語選択ページに飛ばす。
			SAI_choose_page(sai_id_page_choose_langauge);

			// 言語の自動選択。
			SAI_language_choose();
		}else{ // 合意が必要。
			// 言語をセット。
			SAI_set_language(saiminLanguage3);
			// スキンをセット。
			SAI_set_skin(saiminSkin);

			// 合意ページに移動。
			SAI_help_and_agreement();
		}

		// 前回の画面状態を復元する。
		if(localStorage.getItem('saiminHelpShowing')){
			SAI_help_and_agreement();
		}else if(localStorage.getItem('saiminConfigShowing')){
			SAI_config();
		}else if(localStorage.getItem('saiminMessageListShowing')){
			SAI_message_list_show();
		}else if(localStorage.getItem('saiminFaceGetterShowing')){
			SAI_choose_page(sai_id_page_face_getter);
		}

		// フルスクリーンモードを復元する。
		let saiminFullscreen = localStorage.getItem('saiminFullscreen');
		if(saiminFullscreen == '0' || saiminFullscreen == '1'){
			SAI_screen_set_fullscreen_mode(saiminFullscreen);
		}else{
			SAI_screen_set_fullscreen_mode(false);
		}

		// 音声の自動繰り返しを復元する。
		let saiminSoundAutoRepeat = localStorage.getItem('saiminSoundAutoRepeat');
		if(saiminSoundAutoRepeat == '0' || saiminSoundAutoRepeat == '1'){
			SAI_sound_set_auto_repeat(saiminSoundAutoRepeat);
		}else{
			SAI_sound_set_auto_repeat(false);
		}

		// service worker
		if(location.host != '' && 'serviceWorker' in navigator){
			navigator.serviceWorker.register('./sw.js', {scope: './'})
			.then((registration) => {
				sai_service_worker_registration = registration;
				console.log('Service worker registered');
			});
		}

		// マイクロホン用の再読み込みなら、マイクを有効にする。
		if(localStorage.getItem('saiminAndroidMicrophoneOnReload')){
			mic_connect();
			localStorage.removeItem('saiminAndroidMicrophoneOnReload');
			sai_id_button_microphone.classList.add('sai_class_checked');
		}

		// キーボード操作を実装。
		SAI_register_key_bindings();
	}

	// メイン関数を呼び出す。
	SAI_main();
});
