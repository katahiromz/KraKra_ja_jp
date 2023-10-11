// 催眠アプリ「催眠くらくら」のJavaScriptのメインコード。
// 暗号名はKraKra。

const sai_VERSION = '3.4.8'; // KraKraバージョン番号。
const sai_DEBUGGING = false; // デバッグ中か？
let sai_FPS = 0; // 実測フレームレート。
let sai_stopping = true; // 停止中か？

// 【KraKra JavaScript 命名規則】
//
// - 関数名の頭に SAI_ を付ける。
// - 変数名・定数名の頭に sai_ を付ける。
// - 要素IDの頭に sai_id_ を付ける。
// - CSSクラスの頭に sai_class_ を付ける。
//
// ※ 言語特有の記述が必要な個所は「{{LANGUAGE_SPECIFIC}}」というコメントを付けること。

// Androidアプリにおいて、システムバーが変更された場合に呼び出される関数。
function SAI_OnAndroidSystemBarsChanged(sysBarsVisible){
	// ツールボタンを取得する。ツールボタンは、sai_class_tool_buttonクラスを持つ要素。
	let tool_buttons = document.getElementsByClassName('sai_class_tool_button');
	if(sysBarsVisible || sai_stopping || !sai_id_checkbox_fullscreen.checked){
		for(let button of tool_buttons){
			button.classList.remove('sai_class_invisible');
		}
	}else{
		for(let button of tool_buttons){
			button.classList.add('sai_class_invisible');
		}
	}
}

// ドキュメントの読み込みが完了（DOMContentLoaded）されたら無名関数が呼び出される。
document.addEventListener('DOMContentLoaded', function(){
	// 変数を保護するため、関数内部に閉じ込める。
	const sai_NUM_TYPE = 11; // 「画」の個数。
	let sai_screen_width = 0; // スクリーンの幅（ピクセル単位）を覚えておく。
	let sai_screen_height = 0; // スクリーンの高さ（ピクセル単位）を覚えておく。
	let sai_old_time = (new Date()).getTime(); // 処理フレームの時刻を覚えておく。
	let sai_counter = 0; // 映像を動かす変数。
	let sai_clock = 0; // スピードが不規則のときに映像の速さを変化させる変数。
	let sai_ready = false; // 準備完了か？
	let sai_message_text = ''; // メッセージテキスト。
	let sai_screen_split = 1; // 画面分割の分割数。
	let sai_speed = 45.0; // 映像のスピード。
	let sai_sound_object = null; // 音声オブジェクト。
	let sai_sound_name = 'Magic'; // 音声の名前。ファイル名の一部。
	let sai_kirakira_sound_object = null; // 映像切り替えの音声のオブジェクト。
	let sai_kirakira_sound_type = 1; // 映像切り替えの音声の種類。
	let sai_stars = new Array(32); // 画面を指でなぞったときのきらめきを保存する。
	let sai_touchmoving = false; // 画面を指でなぞっているかどうか？
	let sai_service_worker_registration = null; // サービスワーカーの登録。
	let sai_coin_img = new Image(); // 五円玉のイメージ。
	let sai_rotation_type = 'normal'; // 回転の種類。
	let sai_hypnosis_released = false; // 催眠術を解放したか？
	let sai_logo_img = new Image(); // KraKraのロゴ。
	let sai_tap_here_img = new Image(); // 「ここをタップ」の画像。
	let sai_hypno_releasing_img = new Image(); // 「催眠術を解放中」の画像。
	let sai_all_released_img = new Image(); // 「催眠術を解放しました」の画像。
	let sai_speed_irregular = false; // 映像スピードが不規則か？
	let sai_pic_type = 0; // 映像の種類を表す整数値。
	let sai_old_pic_type = 0; // 古い映像の種類。
	let sai_blinking_interval = 0; // 画面点滅（サブリミナル）の間隔（秒）。
	let sai_first_time = false; // 初回か？
	let sai_request_anime = null; // アニメーションの要求。
	let sai_count_down = null; // カウントダウンの時刻またはnull。
	let sai_spiral_img = new Image();

	// このアプリはネイティブアプリか？
	function SAI_is_native_app(){
		return navigator.userAgent.indexOf('/KraKra-native-app/') != -1;
	}

	// ネイティブアプリならバージョン番号を取得する。
	function SAI_get_native_app_version(){
		let results = navigator.userAgent.match(/\/KraKra-native-app\/([\d\.]+)\//);
		if(results)
			return results[1];
		return false;
	}

	// ページを選択。
	function SAI_choose_page(page_id){
		// まず、すべてのページを隠す。
		let pages = document.getElementsByClassName('sai_class_page');
		for(let page of pages){
			page.classList.add('sai_class_invisible');
		}

		// 一つのページを表示する。
		if(typeof(page_id) == 'string')
			page_id = document.getElementById(page_id);
		page_id.classList.remove('sai_class_invisible');

		if (page_id == sai_id_page_main){ // メインページなら
			// 準備がまだなら、ユーザを受け入れる。
			if (!sai_ready)
				SAI_user_accepted();
			// 必要ならアニメーションを要求する。
			if(!sai_request_anime){
				sai_request_anime = window.requestAnimationFrame(SAI_draw_all);
			}
		}else{
			// アニメーションをキャンセルする。
			window.cancelAnimationFrame(sai_request_anime);
			sai_request_anime = null;
		}

		if (page_id == sai_id_page_config){ // 「設定」ページなら
			// 100ミリ秒後に一番上にスクロールする。
			setTimeout(function(){
				sai_id_config_scrollable.scrollLeft = sai_id_config_scrollable.scrollTop = 0;
			}, 100);
		}
	}

	// 負の浮動小数点数に対応した剰余（modular; 余り）関数。
	function SAI_mod(x, y){
		return (x*y < 0) * y + x % y;
	}

	// きらめきに新しい星を追加する。
	function SAI_star_add(x, y){
		sai_stars.shift(); // 古い星を消す。

		if(SAI_display_is_large()){ // 画面が大きければ
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
	function SAI_speech_cancel(){
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
	function SAI_speech_set(value){
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
	function SAI_blink_set_type(value){
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
		sai_id_text_blink_output.innerText = text;

		// ローカルストレージに点滅タイプを記憶。
		localStorage.setItem('saiminBlinkType', value);
	}

	// KraKraの言語をセットして、UIをローカライズする。
	function SAI_set_language(lang){
		// 言語が指定されてなければとりあえず英語。
		if(!lang)
			lang = 'en';

		// ローカライズ。translation.jsを参照。
		trans_localize(lang);

		// 「バージョン情報」テキストを一番上にスクロール。
		sai_id_text_notice.scrollLeft = sai_id_text_notice.scrollTop = 0;

		// 「催眠解除中」の画像を更新。
		sai_hypno_releasing_img = new Image();
		if(sai_hypnosis_released){
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

		// スパイラルの画像も更新。
		sai_spiral_img = new Image();
		sai_spiral_img.src = "images/spiral.svg";

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

	// スピーチに対応するために、テキストを調整する。
	function SAI_adjust_text_for_speech(text){
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
	async function SAI_speech_start(text){
		console.log('SAI_speech_start');

		// 開始する前にいったんキャンセルする。
		SAI_speech_cancel();

		// スピーチ用にテキストを調整する。
		text = SAI_adjust_text_for_speech(text);

		try{
			// Android側のスピーチを開始する。Androidでなければ失敗。
			android.speechLoop(text);
		}catch(error){ // Androidではない。Web側のスピーチを開始する。
			if(window.speechSynthesis){ // 音声合成に対応していれば
				text = text.repeat(32); // 32回繰り返す。
				let speech = new SpeechSynthesisUtterance(text);
				speech.pitch = 0.6; // 音声の高さ。
				speech.rate = 0.4; // 音声の速さ。
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
				else // English is default
					speech.lang = 'en-US';
				// 実際にスピーチを開始する。
				window.speechSynthesis.speak(speech);
				console.log('speech');
			}
		}
	}

	// 大きな画面か？
	function SAI_display_is_large(){
		return sai_screen_width >= 1200 || sai_screen_height >= 1200;
	}

	// 音声の名前をセットし、音声オブジェクトを作成する。設定を保存する。
	function SAI_sound_set_name(value){
		// 音声のバリデーション。
		if(value.indexOf('sn') == 0)
			value = '';

		// 変数に音声の名前を記憶。
		sai_sound_name = value;

		// 必要なら音声オブジェクトを作成するか、破棄する。
		if(sai_sound_name != ''){
			console.log('sn/' + sai_sound_name + '.mp3');
			sai_sound_object = new Audio('sn/' + sai_sound_name + '.mp3');
		}else{
			sai_sound_object = null;
		}

		// 音声の選択を更新。
		sai_id_select_sound.value = value;

		// ローカルストレージに記憶する。
		localStorage.setItem('saiminSoundName', sai_sound_name);
	}

	// 映像切り替えの音の有無をセットする。
	function SAI_set_type_sound(value, test = false){
		// ローカルストレージから来た値は文字列かもしれない。正規化。
		if(value === true || value == "true")
			value = 1;
		if(value === false || value == "false")
			value = 0;

		// 映像切り替えの種類を整数値でセットする。
		sai_kirakira_sound_type = parseInt(value);

		// UIを更新する。
		if(sai_id_checkbox_pic_change_sound.checked != !!value)
			sai_id_checkbox_pic_change_sound.checked = !!value;

		// ローカルストレージに記憶する。
		localStorage.setItem('saiminTypeSound', value);

		// テストならば実際に音を出す。
		if(test && sai_kirakira_sound_type == 1 && sai_kirakira_sound_object){
			sai_kirakira_sound_object.play();
		}
	}

	// 画面の明るさをセットする。
	function SAI_screen_set_brightness(value){
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

	// メッセージの表示サイズをセットする。
	function SAI_message_set_size(value){
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
		case 'small':
		case '1':
			sai_id_text_floating_1.classList.add('sai_class_font_size_small');
			sai_id_text_floating_2.classList.add('sai_class_font_size_small');
			value = '1';
			text = trans_getText('TEXT_SIZE_SMALL');
			break;
		case 'normal':
		case '2':
		default:
			sai_id_text_floating_1.classList.add('sai_class_font_size_normal');
			sai_id_text_floating_2.classList.add('sai_class_font_size_normal');
			value = '2';
			text = trans_getText('TEXT_SIZE_NORMAL');
			break;
		case 'large':
		case '3':
			sai_id_text_floating_1.classList.add('sai_class_font_size_large');
			sai_id_text_floating_2.classList.add('sai_class_font_size_large');
			value = '3';
			text = trans_getText('TEXT_SIZE_LARGE');
			break;
		case 'huge':
		case '4':
			sai_id_text_floating_1.classList.add('sai_class_font_size_huge');
			sai_id_text_floating_2.classList.add('sai_class_font_size_huge');
			value = '4';
			text = trans_getText('TEXT_SIZE_HUGE');
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
	function SAI_speed_set_type(value){
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
			if (sai_speed == 0){
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
		sai_id_text_speed_output.innerText = text;

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
	function SAI_screen_set_split(value){
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
	function SAI_set_count_down(value){
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

	// 映像の進行を支配する関数。
	function SAI_get_tick_count(){
		return sai_counter;
	}

	// 映像の種類を取得する。
	function SAI_pic_get_type(){
		return sai_pic_type;
	};

	// 映像の種類の整数値をセットする。
	function SAI_pic_set_type(value){
		sai_pic_type = parseInt(value); // 整数に変換して変数に記憶。
		if(sai_pic_type == -1){ // 「催眠解除」の場合。
			// スピーチをキャンセル。
			SAI_speech_cancel();
			sai_id_button_speech.classList.remove('sai_class_checked');

			// 「催眠解除中」の変数を更新。
			sai_hypnosis_released = false;

			// 催眠解除クラスを追加。
			sai_id_button_sound.classList.add('sai_class_releasing');
			sai_id_button_message.classList.add('sai_class_releasing');
			sai_id_button_speech.classList.add('sai_class_releasing');

			// 催眠解除の画像のソースを更新。
			sai_hypno_releasing_img.src = trans_getText('TEXT_KILLING_HYPNOSIS_IMG');

			// 催眠解除まで時間がかかる。
			setTimeout(function(){
				// 3秒待った。解除されたと仮定。画像のソースを更新。
				sai_hypno_releasing_img.src = trans_getText('TEXT_HYPNOSIS_RELEASED_IMG');
				sai_all_released_img.src = trans_getText('TEXT_ALL_RELEASED_IMG');
				// 解放された！
				sai_hypnosis_released = true;
			}, 3000);
		}else{
			if(sai_old_pic_type == -1){ // 「催眠解除中」か？
				sai_message_text = ''; // メッセージテキストをクリア。

				// スピーチをキャンセル。
				sai_id_button_speech.classList.remove('sai_class_checked');
				SAI_speech_cancel();
			}

			// 「催眠解除中」ではない。
			sai_id_button_sound.classList.remove('sai_class_releasing');
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
		sai_old_pic_type = sai_pic_type;
	};

	// メッセージテキストをセットする。
	function SAI_message_set_text(txt){
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
	function SAI_rotation_set(value){
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
	function SAI_screen_set_fullscreen_mode(value){
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

	// スクリーンのサイズをセットする。必要ならキャンバスのサイズも変更する。
	function SAI_screen_fit_canvas(){
		console.log('SAI_screen_fit_canvas');
		sai_screen_width = sai_id_canvas_01.width = window.innerWidth;
		sai_screen_height = sai_id_canvas_01.height = window.innerHeight;
	}

	// スクリーンのサイズをセットし、必要なら画面を復帰する。
	function SAI_screen_fit(){
		SAI_screen_fit_canvas();
		let position = { my: 'center', at: 'center', of: window };
		if(localStorage.getItem('saiminHelpShowing')){
			SAI_choose_page(sai_id_page_agreement);
		}else if(localStorage.getItem('saiminConfigShowing')){
			SAI_config();
		}
	}

	// 「バージョン情報」にバージョン番号をセットする。
	function SAI_update_version_display(){
		let nativeVersion = SAI_get_native_app_version();
		let text = sai_id_text_version.innerText;
		if(nativeVersion){
			text = text.replace('[[VERSION]]', nativeVersion + '(native) / ' + sai_VERSION + '(web)');
		}else{
			text = text.replace('[[VERSION]]', sai_VERSION + '(web)');
		}
		sai_id_text_version.innerText = text;
	}

	// ユーザを受け入れる。
	function SAI_user_accepted(){
		// ローカルストレージに記憶。
		localStorage.setItem('saiminAdultCheck3', '1');

		// メインコントロール群を表示する。
		SAI_show_main_controls(true);

		// 「バージョン情報」の表示を更新する。
		SAI_update_version_display();

		if(!sai_ready){
			// 映像の種類を初期化する。
			let type = localStorage.getItem('saiminType');
			if(type && type != -1){
				SAI_pic_set_type(type);
			}else{
				SAI_pic_set_type(0);
			}

			// 必要ならアニメーションを要求する。
			if (!sai_request_anime)
				sai_request_anime = window.requestAnimationFrame(SAI_draw_all);

			// 準備完了。
			sai_ready = true;

			// メインページに飛ばす。
			SAI_choose_page(sai_id_page_main);
		}
	}

	// 初期時の言語選択を自動化する。
	function SAI_language_choose(){
		// ローカルストレージから言語を取得。
		let lang = localStorage.getItem('saiminLanguage3');
		if(!lang){ // 取得できなければブラウザからデフォルトの言語を取得。
			lang = trans_getDefaultLanguage();
			sai_first_time = true; // これは初回時。
		}
		sai_id_select_language_2.value = lang; // UIを更新。
	}

	// 「バージョン情報」ダイアログ。
	function SAI_help_and_agreement(){
		// テキストの一番上にスクロール。
		setTimeout(function(){
			sai_id_text_notice.scrollLeft = sai_id_text_notice.scrollTop = 0;
		}, 100);

		// ローカルストレージに表示状態を記憶。
		localStorage.setItem('saiminHelpShowing', '1');

		// 初回かそれ以外か？ ボタンのテキストを変える。
		if(sai_first_time){
			trans_setHtmlText(sai_id_button_agree, trans_getText('TEXT_I_AGREE'));
		}else{
			trans_setHtmlText(sai_id_button_agree, trans_getText('TEXT_OK'));
		}

		// 同意ページに移動。
		SAI_choose_page(sai_id_page_agreement);
	}

	// 「設定」ダイアログ。
	function SAI_config(){
		// ローカルストレージに表示状態を記憶。
		localStorage.setItem('saiminConfigShowing', '1');

		// 「設定」ページに飛ばす。
		SAI_choose_page(sai_id_page_config);
	}

	// 円の描画。
	function SAI_draw_circle(ctx, x, y, radius, is_fill = true){
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
	function SAI_draw_circle_2(ctx, x, y, radius, is_fill = true, N = 16){
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
	function SAI_draw_line(ctx, x0, y0, x1, y1, lineWidth){
		ctx.lineWidth = lineWidth;
		ctx.beginPath();
		ctx.moveTo(x0, y0);
		ctx.lineTo(x1, y1);
		ctx.stroke();
	}

	// 線分の描画２。
	// いくつかの環境ではSAI_draw_lineでかなり太い線を描くと時間がかかる。
	// こちらの関数は自前で線をレンダリングする。
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

	// ハート形の描画。
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

	// 目の描画。
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

	// 目の描画２。
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

	// きらめきの描画。
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

	// 長方形領域(px, py, dx, dy)をクリッピングする。
	function SAI_clip_rect(ctx, px, py, dx, dy){
		ctx.beginPath();
		ctx.moveTo(px, py);
		ctx.lineTo(px + dx, py);
		ctx.lineTo(px + dx, py + dy);
		ctx.lineTo(px, py + dy);
		ctx.closePath();
		ctx.clip();
	}

	// サブリミナルの描画。
	function SAI_draw_subliminal(ctx, px, py, dx, dy){
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

	// 映像の描画。pic-1: Release Hyponosis
	function SAI_draw_pic_minus_1(ctx, px, py, dx, dy){
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

		if(sai_hypnosis_released)
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
		if(sai_hypnosis_released && sai_all_released_img.complete){
			let x = px + (dx - sai_all_released_img.width) / 2;
			let y = py + (dy - sai_all_released_img.height) / 2 + dy * 0.2;
			ctx.drawImage(sai_all_released_img, x, y);
		}

		ctx.restore(); // ctx.saveで保存した情報で元に戻す。
	}

	// 映像の描画。pic0: Dummy Screen (for practice)
	function SAI_draw_pic_0(ctx, px, py, dx, dy){
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
		grd.addColorStop(0, 'rgba(255, 0, 255, 0.0)');
		grd.addColorStop(1, 'rgba(255, 0, 255, 1.0)');
		ctx.fillStyle = grd;
		SAI_draw_circle(ctx, qx, qy, dxy, true);

		if(sai_logo_img.complete){ // ロゴイメージの読み込みが完了されたか？
			// 寸法を調整する。
			let width = sai_logo_img.width, height = sai_logo_img.height;
			if (width > sai_screen_width){
				width *= 0.75;
				height *= 0.75;
			}else{
				if(SAI_display_is_large() &&
					sai_screen_width * 2 < width &&
					sai_screen_height * 2 < height)
				{
					width *= 2;
					height *= 2;
				}
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

		ctx.restore(); // ctx.saveで保存した情報で元に戻す。
	}

	// 映像の描画。pic1: Spiral
	function SAI_draw_pic_1(ctx, px, py, dx, dy){
		ctx.save(); // 現在の座標系やクリッピングなどを保存する。

		// 画面中央の座標を計算する。
		let qx = px + dx / 2, qy = py + dy / 2;

		// 長方形領域(px, py, dx, dy)をクリッピングする。
		SAI_clip_rect(ctx, px, py, dx, dy);

		// 黒で塗りつぶす。
		ctx.fillStyle = '#000';
		ctx.fillRect(px, py, dx, dy);

		// 寸法を計算する。
		let minxy = Math.min(dx, dy), maxxy = Math.min(dx, dy);

		// 画面中央を原点とする。
		ctx.translate(qx, qy);

		// 映像の進行を表す。
		let count2 = -SAI_get_tick_count();

		// 原点を中心として、これから描画する図形を回転する。
		ctx.rotate(-count2 * 0.12);

		// 少し回転のずれを表現する。
		ctx.translate(25 * Math.cos(count2 * 0.01), 25 * Math.sin(count2 * 0.05));
		ctx.rotate(count2 * 0.02);

		ctx.fillStyle = '#f0f'; // ショッキングピンクで描画する。

		// 発散する渦巻きを描画する。
		let ci = 8;
		for(let i = 0; i <= ci; ++i){
			let delta_theta = 2 * Math.PI * i / ci;
			// 対数らせんの公式に従って描画する。ただし偏角はdelta_thetaだけずらす。
			let a = 1, b = 1.1, oldx = 0, oldy = 0;
			for(let theta = 0; theta <= Math.PI * 2 * 10; theta += 0.2){
				let r = a * Math.exp(b * theta);
				let comp = new Complex({abs:r, arg:theta + delta_theta});
				let x = comp.re, y = comp.im;

				// 線を描画する。
				SAI_draw_line_2(ctx, oldx, oldy, x, y, r * 1.8 / ci);

				// 古い(x, y)を記憶する。
				oldx = x;
				oldy = y;
			}
		}

		ctx.restore(); // ctx.saveで保存した情報で元に戻す。
	}

	// 映像の描画。pic2: Concentric Circles
	function SAI_draw_pic_2(ctx, px, py, dx, dy, flag=true){
		ctx.save(); // 現在の座標系やクリッピングなどを保存する。

		// 画面中央の座標を計算する。
		let qx = px + dx / 2, qy = py + dy / 2;

		// 画面の辺の平均の長さ。
		let dxy = (dx + dy) / 2;

		// 映像の進行を表す変数。
		let count2 = SAI_get_tick_count();
		let factor = (0.99 + Math.abs(Math.sin(count2 * 0.2)) * 0.01);

		// クリッピングする。!flagならば円形に切り抜く。円形の半径は時刻により変動する。
		if(flag){
			SAI_clip_rect(ctx, px, py, dx, dy);
		}else{
			ctx.beginPath();
			let value = 0.2 + 0.2 * Math.abs(Math.sin(count2 * 0.02));
			ctx.arc(qx, qy, Math.abs(dxy) * value, 0, 2 * Math.PI);
			ctx.closePath();
			ctx.clip();
		}

		// 白で長方形領域を塗りつぶす。
		ctx.fillStyle = '#fff';
		ctx.fillRect(px, py, dx, dy);

		// さまざまな計算をする。
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

		// 同心円状に描画する。
		let size = (dx + dy) * 0.4;
		for(; radius < size; radius += dr0){
			SAI_draw_circle(ctx, qx, qy, radius, false);
		}

		ctx.restore(); // ctx.saveで保存した情報で元に戻す。
	}

	// 映像の描画。pic3: The Eyes
	function SAI_draw_pic_3(ctx, px, py, dx, dy){
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
			let x = cxy * Math.cos(radian + 0.4) * 0.3, y = cxy * Math.sin(radian + 0.4) * 0.3;
			SAI_draw_eye(ctx, x, y, cxy / 10, opened, 0.25); // アルファ値0.25により透過する。

			x = cxy * Math.cos(radian + 0.2) * 0.3;
			y = cxy * Math.sin(radian + 0.2) * 0.3;
			SAI_draw_eye(ctx, x, y, cxy / 10, opened, 0.65); // アルファ値0.65により透過する。

			x = cxy * Math.cos(radian) * 0.3;
			y = cxy * Math.sin(radian) * 0.3;
			SAI_draw_eye(ctx, x, y, cxy / 10, opened); // 透過しない。

			// 目の中にハート型を描画する。
			ctx.fillStyle = '#f00';
			SAI_draw_heart(ctx, x, y - cxy * opened / 50, x, y + cxy * opened / 50);

			radian += (2 * Math.PI) / N;
		}

		// 中央から離れるにつれ黄色を深めるグラデーション。
		let grd = ctx.createRadialGradient(0, 0, dxy * 0.25, 0, 0, dxy * 0.5);
		grd.addColorStop(0, 'rgba(255, 255, 255, 0.0)');
		grd.addColorStop(1, 'rgba(255, 255, 0, 0.8)');
		ctx.fillStyle = grd;
		SAI_draw_circle(ctx, 0, 0, dxy, true);

		ctx.restore(); // ctx.saveで保存した情報で元に戻す。
	}

	// 映像の描画。pic4: Black/White Spiral
	function SAI_draw_pic_4(ctx, px, py, dx, dy){
		ctx.save(); // 現在の座標系やクリッピングなどを保存する。

		// 画面中央の座標を計算する。
		let qx = px + dx / 2, qy = py + dy / 2;

		// 画面の辺の平均の長さ。
		let dxy = (dx + dy) / 2;

		// 長方形領域(px, py, dx, dy)をクリッピングする。
		SAI_clip_rect(ctx, px, py, dx, dy);

		// 黒で長方形領域を塗りつぶす。
		ctx.fillStyle = 'white';
		ctx.fillRect(px, py, dx, dy);

		// 画面中央を原点とする。
		ctx.translate(qx, qy);

		// 映像の進行を表す変数。
		let factor = SAI_get_tick_count() * 0.4;

		// 原点を中心に発散する渦巻きを描画する。
		let radius = 1; // 半径。
		ctx.fillStyle = 'rgba(0, 0, 0, 33%)';
		for(let radian = 0; radian < 120;){ // 角度によりループ。
			const radian2 = radian - factor;

			// 線の始点。
			const x0 = radius * Math.cos(-radian2), y0 = radius * Math.sin(-radian2);

			radius *= 1.009; // 半径は単純増加。
			radian += 0.08; // 角度も単純増加。
			const radian3 = radian - factor;

			// 線の終点。
			const x1 = radius * Math.cos(-radian3), y1 = radius * Math.sin(-radian3);

			// 線を描画する。
			SAI_draw_line_2(ctx, x0, y0, x1, y1, radius * 0.325);
		}

		ctx.restore(); // ctx.saveで保存した情報で元に戻す。
	}

	// 映像の描画。pic5: Spreading Rainbow
	function SAI_draw_pic_5(ctx, px, py, dx, dy){
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
		if(SAI_display_is_large()){
			qx += 60 * Math.cos(factor * 0.8);
			qy += 60 * Math.sin(factor * 0.8);
		}else{
			qx += 30 * Math.cos(factor * 0.8);
			qy += 30 * Math.sin(factor * 0.8);
		}

		// 画面中央を原点とする。
		ctx.translate(qx, qy);

		// 星形のレインボーを描画する。外側から順番に。
		let isLarge = SAI_display_is_large();
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

	// 映像の描画。pic6: 5-yen coin
	function SAI_draw_pic_6(ctx, px, py, dx, dy){
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
		ctx.fillStyle = `rgb(${value * 30 + 40}, ${value * 20 + 80}, ${value * 15 + 80})`
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
				ctx.fillStyle = ((ix + iz) & 1) ? '#333' : '#833';
				ctx.fill();
				++ix;
			}
			++iz;
		}

		// ヒモのついた五円玉を回転させて描画する。
		if(sai_coin_img.complete){
			ctx.translate(qx - sai_coin_img.width * 0.5, qy - sai_coin_img.height * 0.75);

			let angle = Math.PI * Math.sin(count2 * 0.1 - 0.05) * 0.078;
			ctx.rotate(angle);

			let ratio = SAI_display_is_large() ? 1.4 : 1;
			ctx.drawImage(sai_coin_img, 0, 0, sai_coin_img.width * ratio, sai_coin_img.height * ratio);
		}

		ctx.restore(); // ctx.saveで保存した情報で元に戻す。
	}

	// 映像の描画。pic7: Clamor Clamor
	function SAI_draw_pic_7(ctx, px, py, dx, dy){
		ctx.save(); // 現在の座標系やクリッピングなどを保存する。

		// 画面中央の座標を計算する。
		let qx = px + dx / 2, qy = py + dy / 2;

		// 画面の辺の平均の長さ。
		let dxy = (dx + dy) / 2;

		// 長方形領域(px, py, dx, dy)をクリッピングする。
		SAI_clip_rect(ctx, px, py, dx, dy);

		// 映像の進行を表す変数。
		let count2 = SAI_get_tick_count();
		let factor1 = count2 * 0.13, factor2 = count2 * 0.075;

		// 画面中央を少しずらす。
		if(SAI_display_is_large()){
			qx += 60 * Math.cos(count2 * 0.1);
			qy += 60 * Math.sin(count2 * 0.1);
		}else{
			qx += 30 * Math.cos(count2 * 0.1);
			qy += 30 * Math.sin(count2 * 0.1);
		}

		// 黒で長方形領域を塗りつぶす。
		ctx.fillStyle = '#000';
		ctx.fillRect(px, py, dx, dy);

		// 画面中央を原点とする。
		ctx.translate(qx, qy);

		// アスタリスクのような星形？を描画する。外側から順番に描画する。
		let i = 0;
		const delta = dxy * 0.015 + 1;
		for(let radius = (Math.floor(dxy * 0.35 / delta) + 1) * delta; radius > 0; radius -= delta){
			// 塗りつぶしの色を選ぶ。
			switch (i & 3){
			case 0: ctx.fillStyle = '#f00'; break;
			case 1: ctx.fillStyle = '#ff0'; break;
			case 2: ctx.fillStyle = '#f90'; break;
			case 3: ctx.fillStyle = '#300'; break;
			}

			// パスを構築する。
			ctx.beginPath();
			for(let angle = 0; angle <= 360; angle += 5){
				let radian = angle * (Math.PI / 180);
				let zoom = (1.0 * Math.abs(Math.sin(radian * 3)) + Math.cos(factor1) + 2);
				let x = (radius + 2) * Math.cos(radian + factor2) * zoom;
				let y = (radius + 2) * Math.sin(radian + factor2) * zoom;
				if(angle == 0){ // 角度がゼロなら最初の点。
					ctx.moveTo(x, y);
				}else{
					ctx.lineTo(x, y);
				}
			}

			// 出来たパスを塗りつぶす。
			ctx.fill();

			// 色選択に使う変数を更新する。
			++i;
		}

		// 外側に行くほど白くなる円形グラデーションを掛ける。
		let grd = ctx.createRadialGradient(0, 0, 0, 0, 0, dxy * 0.75);
		grd.addColorStop(0, 'rgba(255, 255, 255, 0.0)');
		grd.addColorStop(1, 'rgba(255, 255, 255, 1.0)');
		ctx.fillStyle = grd;
		SAI_draw_circle(ctx, 0, 0, dxy, true);

		ctx.restore(); // ctx.saveで保存した情報で元に戻す。
	}

	// 映像の描画。pic8: Crazy Colors
	function SAI_draw_pic_8(ctx, px, py, dx, dy){
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
		if(SAI_display_is_large()){
			qx += 40 * Math.cos(count2 * 0.08);
			qy += 40 * Math.sin(count2 * 0.08);
		}else{
			qx += 20 * Math.cos(count2 * 0.08);
			qy += 20 * Math.sin(count2 * 0.08);
		}

		// 画面中央を原点とする。
		ctx.translate(qx, qy);

		// 座標計算用のヘルパー関数。
		const rotation = 8, width = dxy * 0.1;
		let calc_point = function(radius, radian){
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

	// 映像の描画。pic9: Golden Spiral
	function SAI_draw_pic_9(ctx, px, py, dx, dy){
		ctx.save(); // 現在の座標系やクリッピングなどを保存する。

		// 画面中央の座標を計算する。
		let qx = px + dx / 2, qy = py + dy / 2;

		// 画面の寸法を使って計算する。
		let maxxy = Math.max(dx, dy), minxy = Math.min(dx, dy);

		// 黒で長方形領域を塗りつぶす。
		ctx.fillStyle = '#000';
		ctx.fillRect(px, py, dx, dy);

		// 長方形領域(px, py, dx, dy)をクリッピングする。
		SAI_clip_rect(ctx, px, py, dx, dy);

		// 映像の進行を表す変数。
		let count2 = SAI_get_tick_count();

		// 画面中央を原点とする。
		ctx.translate(qx, qy);

		// 回転させる。
		ctx.rotate(-count2 * 0.23);

		// 黄色で塗る。
		ctx.fillStyle = '#ff0';

		// 黄金らせんの公式に従って描画する。ただしtheta_deltaだけ偏角をずらす。
		const b = 0.3063489, ci = 3;
		for(let i = 0; i < ci; ++i){
			let oldx = 0, oldy = 0;
			let theta_delta = 2 * Math.PI * i / ci;
			for(let theta = 0; theta <= Math.PI * 2 * 10; theta += 0.13){
				let r = Math.exp(b * theta);
				let comp = new Complex({abs:r, arg:theta + theta_delta});
				let x = comp.re, y = comp.im;

				// 線を描画する。
				SAI_draw_line_2(ctx, oldx, oldy, x, y, r * 0.8 / ci);

				// 古い(x, y)を記憶する。
				oldx = x;
				oldy = y;
			}
		}

		ctx.restore(); // ctx.saveで保存した情報で元に戻す。
	}

	// 映像の描画。pic10: Analog Disc
	function SAI_draw_pic_10(ctx, px, py, dx, dy){
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
		let updown = minxy * Math.sin(count2 * 0.2) * 0.1;
		ctx.translate(0, updown);

		if (sai_spiral_img.complete){ // 渦巻きイメージの読み込みが完了していたら
			// 描画位置を計算。
			let x = -sai_spiral_img.width / 2, y = -sai_spiral_img.height / 2;

			// これから描画する図形を回転。
			ctx.rotate(-count2 * 0.12);

			// 拡大率を設定。
			let ratio = 2.2 * maxxy / (sai_spiral_img.width + sai_spiral_img.height);
			ctx.scale(ratio, ratio);

			ctx.drawImage(sai_spiral_img, x, y); // 渦巻きイメージを描画する。
		}

		ctx.restore(); // ctx.saveで保存した情報で元に戻す。
	}

	// カウントダウン映像の描画。
	function SAI_draw_pic_count_down(ctx, px, py, dx, dy){
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

		if(sai_count_down){ // カウントダウン変数が有効なら
			let new_time = (new Date()).getTime();
			let diff_time = (new_time - sai_count_down) / 1000.0;
			if (diff_time >= 3){ // 3秒経過したら
				// カウントダウンを終了する。
				sai_count_down = null;
				// 必要ならスピーチを開始する。
				if(sai_id_checkbox_speech_on_off.checked){
					SAI_speech_start(sai_message_text);
				}
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
	function SAI_draw_pic(ctx, px, py, dx, dy){
		if(sai_count_down){
			SAI_draw_pic_count_down(ctx, px, py, dx, dy);
			return;
		}
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
		case 10:
			SAI_draw_pic_10(ctx, px, py, dx, dy);
			break;
		}
	}

	// 必要なら映像効果をつけて映像を描画。
	function SAI_draw_pic_with_effects(ctx, px, py, dx, dy){
		// 一定の条件で画面点滅（サブリミナル）を表示。
		if(!sai_stopping && !sai_count_down && sai_blinking_interval != 0 && sai_pic_type != -1){
			if(SAI_mod(sai_old_time / 1000, sai_blinking_interval) < (sai_blinking_interval * 0.3)){
				SAI_draw_subliminal(ctx, px, py, dx, dy);
				return;
			}
		}

		if(sai_pic_type == 8){
			// pic8の場合は描画に時間がかかるので、解像度の低い映像としてレンダリングする。
			if(!sai_count_down){
				let ratio = 0.5;
				sai_id_canvas_02.width = dx * ratio;
				sai_id_canvas_02.height = dy * ratio;
				let ctx2 = sai_id_canvas_02.getContext('2d', { alpha: false });
				SAI_draw_pic(ctx2, 0, 0, dx * ratio, dy * ratio);
				ctx.drawImage(sai_id_canvas_02, 0, 0, dx * ratio, dy * ratio, px, py, dx, dy);
			}else{
				SAI_draw_pic(ctx, px, py, dx, dy);
			}
		}else{
			// それ以外は普通に描画する。
			SAI_draw_pic(ctx, px, py, dx, dy);
		}
	}

	// メッセージテキストの位置をゆらゆら動かす。
	function SAI_message_set_position(id, px, py, dx, dy, counter){
		let x = px + dx / 2 - id.clientWidth / 2;
		let y = py + dy * 0.7 - id.clientHeight / 2 + (1 + 0.4 * Math.sin(counter * 0.1)) * dy * 0.1;
		id.style.left = x + 'px';
		id.style.top = y + 'px';
	}

	// 映像をすべて描画する。
	function SAI_draw_all(){
		// 二次元の描画コンテキスト。キャンバスは不透明。
		let ctx = sai_id_canvas_01.getContext('2d', { alpha: false });

		// 画面のサイズ。
		let cx = sai_screen_width, cy = sai_screen_height;

		let splitted = false; // 画面分割したか？
		if(sai_screen_split == 1){ // 画面分割なし。
			SAI_draw_pic_with_effects(ctx, 0, 0, cx, cy);
			SAI_message_set_position(sai_id_text_floating_1, 0, 0, cx, cy, sai_counter);
		}else if(sai_screen_split == -1){ // 画面分割自動。
			if(cx >= cy * 1.75){ // 充分に横長。
				SAI_draw_pic_with_effects(ctx, 0, 0, cx / 2, cy);
				//SAI_draw_pic_with_effects(ctx, cx / 2, 0, cx / 2, cy); // drawImageで描画時間を節約。
				ctx.drawImage(sai_id_canvas_01, 0, 0, cx / 2, cy, cx / 2, 0, cx / 2, cy);
				SAI_message_set_position(sai_id_text_floating_1, 0, 0, cx / 2, cy, sai_counter);
				SAI_message_set_position(sai_id_text_floating_2, cx / 2, 0, cx / 2, cy, sai_counter);
				splitted = true; // 画面分割した。
			}else if(cy >= cx * 1.75){ // 充分に縦長。
				SAI_draw_pic_with_effects(ctx, 0, 0, cx, cy / 2);
				//SAI_draw_pic_with_effects(ctx, 0, cy / 2, cx, cy / 2); // drawImageで描画時間を節約。
				ctx.drawImage(sai_id_canvas_01, 0, 0, cx, cy / 2, 0, cy / 2, cx, cy / 2);
				SAI_message_set_position(sai_id_text_floating_1, 0, 0, cx, cy / 2, sai_counter);
				SAI_message_set_position(sai_id_text_floating_2, 0, cy / 2, cx, cy / 2, sai_counter);
				splitted = true; // 画面分割した。
			}else{ // それ以外は分割しない。
				SAI_draw_pic_with_effects(ctx, 0, 0, cx, cy);
				SAI_message_set_position(sai_id_text_floating_1, 0, 0, cx, cy, sai_counter);
			}
		}else{ // 画面２分割。
			if(cx >= cy){ // 横長。
				SAI_draw_pic_with_effects(ctx, 0, 0, cx / 2, cy);
				//SAI_draw_pic_with_effects(ctx, cx / 2, 0, cx / 2, cy); // drawImageで描画時間を節約。
				ctx.drawImage(sai_id_canvas_01, 0, 0, cx / 2, cy, cx / 2, 0, cx / 2, cy);
				SAI_message_set_position(sai_id_text_floating_1, 0, 0, cx / 2, cy, sai_counter);
				SAI_message_set_position(sai_id_text_floating_2, cx / 2, 0, cx / 2, cy, sai_counter);
			}else{ // 縦長。
				SAI_draw_pic_with_effects(ctx, 0, 0, cx, cy / 2);
				//SAI_draw_pic_with_effects(ctx, 0, cy / 2, cx, cy / 2); // drawImageで描画時間を節約。
				ctx.drawImage(sai_id_canvas_01, 0, 0, cx, cy / 2, 0, cy / 2, cx, cy / 2);
				SAI_message_set_position(sai_id_text_floating_1, 0, 0, cx, cy / 2, sai_counter);
				SAI_message_set_position(sai_id_text_floating_2, 0, cy / 2, cx, cy / 2, sai_counter);
			}
			splitted = true; // 画面分割した。
		}

		// 浮遊するテキストを処理する。
		if(sai_stopping || sai_count_down){
			sai_id_text_floating_1.classList.add('sai_class_invisible');
			sai_id_text_floating_2.classList.add('sai_class_invisible');
		}else if(sai_pic_type == -1){
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
		if(sai_stopping)
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

		if(sai_DEBUGGING){ // デバッグ中なら
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
			ctx.fillStyle = "red";
			ctx.fillText(text, (sai_screen_width - width) / 2, height);
		}

		if(sai_stopping){ // 停止中なら映像の種類を描画する。
			// 映像の種類のテキストを取得。
			let text = trans_getSelectOptionText(sai_id_select_pic_type, sai_id_select_pic_type.value);

			// {{LANGUAGE_SPECIFIC}}: 言語に応じてテキストサイズを設定。
			let text_size;
			switch (sai_id_select_language_1.value){
			case 'en':
			case 'de':
			case 'it':
			default:
				text_size = 14;
				break;
			case 'zh-CN':
			case 'zh-TW':
				text_size = 21;
				break;
			case 'ja':
			case 'ko-KR':
				text_size = 23;
				break;
			}
			ctx.font = text_size.toString() + 'px san-serif';

			// 小さければ拡大する。
			let measure = ctx.measureText(text);
			if(measure.width * 2 < sai_screen_width){
				text_size *= 1.8;
				ctx.font = text_size.toString() + 'px san-serif';
			}

			// テキストに枠を付けて描画。
			ctx.textAlign = 'center';
			ctx.textBaseline = 'middle';
			ctx.fillStyle = "white";
			let x = sai_screen_width / 2, y = sai_screen_height * 0.15;
			ctx.fillText(text, x - 1, y - 1);
			ctx.fillText(text, x + 1, y + 1);
			ctx.fillText(text, x - 2, y);
			ctx.fillText(text, x + 2, y);
			ctx.fillText(text, x, y - 2);
			ctx.fillText(text, x, y + 2);
			ctx.fillStyle = "black";
			ctx.fillText(text, x, y);
		}

		// 必要ならアニメーションを要求する。
		if(sai_request_anime){
			sai_request_anime = window.requestAnimationFrame(SAI_draw_all);
		}
	}

	// ローカルストレージから設定を読み込む。設定がなければ初期化する。
	function SAI_load_local_storage(){
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

		// ローカルストレージに音声の名前があれば読み込む。
		let saiminSoundName = localStorage.getItem('saiminSoundName');
		if(saiminSoundName){
			SAI_sound_set_name(saiminSoundName);
		}else{
			SAI_sound_set_name('Magic');
		}

		// ローカルストレージに映像切り替えの種類があれば読み込む。
		let saiminTypeSound = localStorage.getItem('saiminTypeSound');
		if(saiminTypeSound){
			SAI_set_type_sound(saiminTypeSound);
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

		// ローカルストレージにスピーチがあれば読み込む。
		let saiminSpeech = localStorage.getItem('saiminSpeech');
		if(saiminSpeech){
			SAI_speech_set(saiminSpeech);
		}else{
			SAI_speech_set(false);
		}
	}

	// キャンバスがクリックされた。
	function SAI_canvas_click(e){
		if(!sai_ready)
			return;
		if(0){
			if(e.shiftKey){
				SAI_pic_set_type((sai_pic_type + sai_NUM_TYPE - 1) % sai_NUM_TYPE);
			}else{
				SAI_pic_set_type((sai_pic_type + 1) % sai_NUM_TYPE);
			}
			sai_id_select_pic_type.value = sai_pic_type.toString();
			if(sai_kirakira_sound_type == 1 && sai_kirakira_sound_object && sai_id_checkbox_pic_change_sound.checked){
				let kirakira = new Audio('sn/kirakira.mp3');
				kirakira.play();
			}
		}
		// 停止中か？
		if(!sai_stopping){
			// フルスクリーンモード、またはツールボタンが見えるか？
			if(!sai_id_checkbox_fullscreen.checked || SAI_are_tool_buttons_shown()){
				// 催眠解除の場合、ダミー画面に戻す。
				if(sai_pic_type == -1)
					SAI_pic_set_type(0);
				// メインコントロール群を表示する。
				SAI_show_main_controls(true);
				// 映像の停止。
				sai_stopping = true;
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
	}

	// イベントリスナー群を登録する。
	function SAI_register_event_listeners(){
		// 「メッセージ」ボタン。
		sai_id_button_message.addEventListener('click', function(){
			if(sai_pic_type == -1)
				return;
			let text = prompt(trans_getText('TEXT_INPUT_MESSAGE'), sai_message_text);
			if(text !== null){
				SAI_message_set_text(text);
			}
		});

		// 「バージョン情報」画面。
		sai_id_button_about.addEventListener('click', function(e){
			SAI_help_and_agreement();
		});

		// 「設定」画面のOKボタン。
		sai_id_button_config_ok.addEventListener('click', function(e){
			localStorage.removeItem('saiminConfigShowing');
			SAI_choose_page(sai_id_page_main);
		});

		// 「一つ前の映像」ボタン。
		sai_id_button_previous_image.addEventListener('click', function(e){
			let type = parseInt(sai_pic_type);
			type = (type + sai_NUM_TYPE - 1) % sai_NUM_TYPE;
			SAI_pic_set_type(type);
			if(sai_kirakira_sound_type == 1 && sai_kirakira_sound_object && sai_id_checkbox_pic_change_sound.checked){
				let kirakira = new Audio('sn/kirakira.mp3');
				kirakira.play();
			}
		});
		// 「一つ次の映像」ボタン。
		sai_id_button_next_image.addEventListener('click', function(e){
			let type = parseInt(sai_pic_type);
			type = (type + 1) % sai_NUM_TYPE;
			SAI_pic_set_type(type);
			if(sai_kirakira_sound_type == 1 && sai_kirakira_sound_object && sai_id_checkbox_pic_change_sound.checked){
				let kirakira = new Audio('sn/kirakira.mp3');
				kirakira.play();
			}
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
			}else{
				// 必要ならスピーチを開始する。
				if(sai_id_checkbox_speech_on_off.checked){
					SAI_speech_start(sai_message_text);
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
		sai_id_button_sound.addEventListener('click', function(){
			if(sai_pic_type == -1){
				let releasing_sound = null;
				let lang = localStorage.getItem('saiminLanguage3');
				releasing_sound = new Audio(trans_getText('TEXT_MP3_RELEASED_HYPNOSIS'));
				releasing_sound.play();
				return;
			}
			if(sai_sound_name != ''){
				if(sai_sound_object){
					let s = new Audio('sn/' + sai_sound_name + '.mp3');
					s.play();
				}
			}else{
				SAI_config();
			}
		});

		// 「設定」ボタン。
		sai_id_button_config.addEventListener('click', function(){
			SAI_config();
		});

		// 映像選択。
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

		// 言語選択。
		sai_id_select_language_1.addEventListener('change', function(){
			if(!sai_ready)
				return;
			SAI_set_language(sai_id_select_language_1.value);
		}, false);

		// 「私は合意します」ボタン。
		sai_id_button_agree.addEventListener('click', function(e){
			localStorage.removeItem('saiminHelpShowing');
			SAI_choose_page(sai_id_page_main);
			sai_first_time = false;
		});

		// メッセージサイズ選択。
		sai_id_select_message_size.addEventListener('input', function(){
			if(!sai_ready)
				return;
			SAI_message_set_size(sai_id_select_message_size.value, true);
		}, false);

		// 画面の明るさ選択。
		sai_id_select_brightness.addEventListener('change', function(){
			if(!sai_ready)
				return;
			SAI_screen_set_brightness(sai_id_select_brightness.value, true);
		}, false);

		// 音声選択。
		sai_id_select_sound.addEventListener('change', function(){
			if(!sai_ready)
				return;
			SAI_sound_set_name(sai_id_select_sound.value);
		}, false);
		sai_id_select_sound.addEventListener('click', function(){
			if(!sai_ready)
				return;
			SAI_sound_set_name(sai_id_select_sound.value);
		}, false);

		// 音声再生ボタン。
		sai_id_button_sound_play.addEventListener('click', function(){
			if(!sai_ready)
				return;
			if(sai_sound_name != '' && sai_sound_object){
				let s = new Audio('sn/' + sai_sound_name + '.mp3');
				s.play();
			}
		}, false);

		// 映像切り替えの音声の有無に関するボタン。
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

		// 画面分割のチェックボックス。
		sai_id_checkbox_split.addEventListener('change', function(){
			if(!sai_ready)
				return;
			SAI_screen_set_split(sai_id_checkbox_split.checked ? 2 : 1);
		}, false);
		sai_id_checkbox_split.addEventListener('click', function(){
			if(!sai_ready)
				return;
			SAI_screen_set_split(sai_id_checkbox_split.checked ? 2 : 1);
		}, false);

		// カウントダウンの有無選択。
		sai_id_checkbox_count_down.addEventListener('change', function(e){
			if(!sai_ready)
				return;
			SAI_set_count_down(sai_id_checkbox_count_down.checked);
		}, false);
		sai_id_checkbox_count_down.addEventListener('click', function(e){
			if(!sai_ready)
				return;
			SAI_set_count_down(sai_id_checkbox_count_down.checked);
		}, false);

		// 映像スピードの選択。
		sai_id_range_speed_type.addEventListener('input', function(){
			if(!sai_ready)
				return;
			SAI_speed_set_type(sai_id_range_speed_type.value);
		}, false);

		// 映像スピードの「不規則」チェックボックス。
		sai_id_checkbox_speed_irregular.addEventListener('change', function(){
			if(!sai_ready)
				return;
			if(sai_id_checkbox_speed_irregular.checked){
				SAI_speed_set_type('irregular');
			}else{
				SAI_speed_set_type('normal');
			}
		}, false);

		// 「回転の向き」チェックボックス。
		sai_id_checkbox_rotation.addEventListener('change', function(){
			if(!sai_ready)
				return;
			SAI_rotation_set(sai_id_checkbox_rotation.checked);
		}, false);

		// 「画面点滅」の種類選択。
		sai_id_range_blink_type.addEventListener('input', function(){
			if(!sai_ready)
				return;
			SAI_blink_set_type(sai_id_range_blink_type.value);
		}, false);

		// 「メッセージをしゃべる」
		sai_id_checkbox_speech_on_off.addEventListener('click', function(e){
			if(!sai_ready)
				return;
			SAI_speech_set(sai_id_checkbox_speech_on_off.checked);
		});

		// キャンバスのクリック。
		sai_id_canvas_01.addEventListener('click', function(e){
			SAI_canvas_click(e);
		}, false);

		// キャンバスでマウス移動。
		sai_id_canvas_01.addEventListener('mousemove', function(e){
			if(!sai_ready)
				return;
			SAI_star_add(e.clientX, e.clientY);
		}, false);

		// キャンバスでタッチ操作。きらめきを表示。
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

		// キャンバスでマウスホイール回転。
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

		// スピーチをクリック。
		sai_id_button_speech.addEventListener('click', function(e){
			console.log('sai_id_button_speech');
			sai_id_button_message.click();
		});

		// ウィンドウのサイズ変更や画面の回転を検出する。
		window.addEventListener('resize', function(){
			if(location.hostname == '' || SAI_is_native_app()){
				if(localStorage.getItem('saiminHelpShowing')){ // ヘルプが表示中なら
					// 映像の種類をローカルストレージに記憶して、再読み込み。
					localStorage.setItem('saiminType', sai_pic_type);
					location.reload();
				}else{
					SAI_screen_fit();
				}
			}else{
				// 映像の種類をローカルストレージに記憶して、再読み込み。
				localStorage.setItem('saiminType', sai_pic_type);
				location.reload();
			}
		}, false);

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
			SAI_choose_page(sai_id_page_main);
			if(sai_first_time){
				SAI_help_and_agreement();
			}
		});

		// フルスクリーンモード。
		sai_id_checkbox_fullscreen.addEventListener('click', function(e){
			SAI_screen_set_fullscreen_mode(sai_id_checkbox_fullscreen.checked);
		});
	}

	// キーボード操作を実装。
	function SAI_register_key_bindings(){
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
			if(e.key == 'p' || e.key == 'P'){ // Play/Pause
				sai_id_button_sound.click();
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
				}else if(sai_screen_split == 2){
					SAI_screen_set_split(1);
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
	function SAI_are_tool_buttons_shown(){
		// ツールボタン群を取得する。ツールボタンは、sai_class_tool_buttonクラスを持つ要素。
		let tool_buttons = document.getElementsByClassName('sai_class_tool_button');
		for(let button of tool_buttons){
			if(!button.classList.contains('sai_class_invisible'))
				return true; // 見える。
		}
		return false; // 見えない。
	}

	// メインのボタン群を表示または非表示にする。
	function SAI_show_main_controls(show){
		// メインコントロール群を取得する。
		// メインコントロールはsai_class_button_main_controlクラスを持つ要素。
		let main_controls = document.getElementsByClassName('sai_class_button_main_control');

		// ツールボタン群を取得する。
		// ツールボタンは、sai_class_tool_buttonクラスを持つ要素。
		let tool_buttons = document.getElementsByClassName('sai_class_tool_button');

		if(show){
			for(let control of main_controls){
				control.classList.remove('sai_class_invisible');
			}
			for(let button of tool_buttons){
				button.classList.remove('sai_class_invisible');
			}
			try{
				android.showNaviBar(true);
			}catch(error){
				;
			}
		}else{
			for(let control of main_controls){
				control.classList.add('sai_class_invisible');
			}
			if (sai_id_checkbox_fullscreen.checked){
				for(let button of tool_buttons){
					button.classList.add('sai_class_invisible');
				}
				try{
					android.showNaviBar(false);
				}catch(error){
					;
				}
			}
		}
	}

	// メイン関数。
	function SAI_main(){
		const argc = arguments.length, argv = arguments;

		// スピーチをキャンセルする。
		SAI_speech_cancel();

		// キャンバスを画面にフィットさせる。
		SAI_screen_fit_canvas();

		// 五円玉を読み込む。
		sai_coin_img.src = 'images/coin5yen.png';

		// 映像切り替え音声を読み込む。
		sai_kirakira_sound_object = new Audio('sn/kirakira.mp3');

		// 設定をローカルストレージから読み込む。
		SAI_load_local_storage();

		// イベントリスナー群を登録する。
		SAI_register_event_listeners();

		// ネイティブアプリでなければネイティブオンリーの要素を隠す。
		if (!SAI_is_native_app()){
			let items = document.getElementsByClassName('sai_class_native_app_only');
			for(let item of items){
				item.classList.add('sai_class_invisible');
			}
		}

		// ローカルストレージに応じて処理を行う。
		let saiminAdultCheck3 = localStorage.getItem('saiminAdultCheck3');
		let saiminLanguage3 = localStorage.getItem('saiminLanguage3');
		if(saiminAdultCheck3 && saiminLanguage3){ // すでにアダルトチェックが完了しているか？
			// 言語をセット。
			SAI_set_language(saiminLanguage3);

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

			// 合意ページに移動。
			SAI_help_and_agreement();
		}

		// 前回の画面状態を復元する。
		if(localStorage.getItem('saiminHelpShowing')){
			SAI_help_and_agreement();
		}else if(localStorage.getItem('saiminConfigShowing')){
			SAI_config();
		}

		// フルスクリーンモードを復元する。
		let saiminFullscreen = localStorage.getItem('saiminFullscreen');
		if(saiminFullscreen == '0' || saiminFullscreen == '1'){
			SAI_screen_set_fullscreen_mode(saiminFullscreen);
		}else{
			SAI_screen_set_fullscreen_mode(false);
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
