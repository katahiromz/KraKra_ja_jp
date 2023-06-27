/* jshint esversion: 8 */

const NUM_TYPE = 9;
const VERSION = '3.3.8';
let DEBUGGING = false;

// {{LANGUAGE_SPECIFIC}}
const NOTICE_EN = `=========================
催眠くらくら
Hypnosis KraKra
=========================

This software is an application to enjoy hypnotic moving pictures.
It generates hypnosis video in real time without using any video files.
How you use it is up to you.

* Source: https://github.com/katahiromz/KraKra_ja_jp
* Some OtoLogic audio material is used.
* You can modify this software under the Apache 2.0 License.

[(Precautions for use)]

- This software is a joke application and its operation is not guaranteed.
- Do not use this software if you have epilepsy symptoms.
- If your country, school, religion or region prohibits hypnosis, do not use this application.
- Acute schizophrenic patients should not use this software.
- Avoid driving a car immediately after using this software.
- People with trypophobia should not use this software.
- If you experience symptoms such as headache, dizzy, hyperpnea, nausea, gastrointestinal problems, or abnormal emotions, discontinue use immediately and consult a specialist.
- The Operator may terminate the Service at any time if any reason arises that makes it difficult to continue the Service.

[(How to use)]

- Basically, it is an application to enjoy looking at the screen.
- Tap/click on the screen to switch pictures.
- The 'pic' button allows you to set the video settings.
- Tap the 'microphone' button to use the microphone (it needs permission).
- Tapping the '♪' button makes a sound.
- The 'Aa' button allows you to set the message to be displayed.
- The 'bubble' button will speak the message.
- The 'gear' button will open Configuration.
- When you run your finger on the screen, the screen sparks to attract their attention.

[(Keyboard Operation)]

When a keyboard is connected, the following operations are available:

- Press [0] to [9] keys to switch pictures.
- Press [C] key to open the configuration.
- Press [H] key to open the version information.
- Press [A] key to open appearance settings.
- Press [P] key to play sound.
- Press [M] key to turn on/off the microphone (it needs permission).
- Press [T] key to open the message settings.
- Press [S] key to speak the current message automatically.
- Press [X] key to pause.
- Press [-] or [K] keys to kill hypnosis.
- Press [D] key to split the screen.
- Press [B] key to toggle display of the buttons.
- Press [G] key to turn on/off of Goggle Mode.

[(Goggle Mode)]

Goggle Mode is available with a connectable keyboard and goggles.
Goggle Mode can be toggled on and off by pressing [G] key.
Goggle Mode splits the screen in two and hides the control buttons.

Copyright (c) 2022-2023 Katayama Hirofumi MZ
Copyright (c) 2018 Robert Eisele
Copyright (c) 2007-2022 Akshay Nair
Copyright 2022 OpenJS Foundation and jQuery contributors.`;

// {{LANGUAGE_SPECIFIC}}
const NOTICE_JA = `=========================
催眠くらくら
Hypnosis KraKra
=========================

本ソフトウェアは、催眠っぽい映像を楽しむアプリです。
動画ファイルを一切使わず、リアルタイムで催眠映像を生成します。
使い方はあなた次第。

※ ソース: https://github.com/katahiromz/KraKra_ja_jp
※ 一部、OtoLogicの音声素材を使用。
※ 改造はApache 2.0ライセンスの下で自由に行えます。

【使用上の注意】

- 本ソフトウェアはジョークアプリであり、動作は無保証です。
- てんかんの症状のある方は使用しないで下さい。
- あなたの国・学校・宗教・地域が催眠を禁じている場合は、本アプリを使用しないで下さい。
- 急性期の統合失調症患者は使用禁止です。
- 使用直後は、自動車の運転を避けて下さい。
- 集合体恐怖症の人は使用しないで下さい。
- 頭痛、めまい、過呼吸、吐き気、胃腸の不具合、異常な感情などの症状が生じた場合は、速やかに使用を中止し、専門医の診断を受けて下さい。
- 運営者は、本サービスの継続が困難となる事由が生じた場合、いつでも本サービスを終了することができるものとします。

【使い方】

- 基本的に画面を見て楽しむためのアプリです。
- 画面をタップ／クリックすると映像が切り替わります。
- 「画」ボタンで映像の設定ができます。
- 「マイク」ボタンでマイクが使えます(権限が必要です)。
- 「♪」ボタンで音が鳴ります。
- 「字」ボタンで表示するメッセージを設定できます。
- 「ふきだし」ボタンでメッセージを自動音声でしゃべります。
- 「歯車」ボタンで全般設定ができます。
- 画面を指でなぞると、きらめきが表示され、相手の注意を引くことができます。

【キーボード操作】

キーボードを接続すると次のような操作ができます。

- 「0」～「9」キーを押すと、映像が切り替わります。
- 「C」キーを押すと全般設定が開きます。
- 「H」キーを押すとバージョン情報を開きます。
- 「A」キーを押すと見た目の設定を開きます。
- 「P」キーを押すと音を鳴らします。
- 「M」キーを押すとマイクのON/OFFを切り替えます(権限が必要です)。
- 「T」キーを押すとメッセージの設定を開きます。
- 「S」キーを押すと現在のメッセージを自動音声でしゃべります。
- 「X」キーを押すと一時停止します。
- 「-」キーか「K」キーを押すと催眠を消します。
- 「D」キーを押すと画面分割が切り替わります。
- 「B」キーを押すとボタンの表示が切り替わります。
- 「G」キーを押すとゴーグルモードが切り替わります。

【ゴーグルモード】

接続可能なキーボードとゴーグルがあれば、ゴーグルモードを利用できます。
「G」キーを押すとゴーグルモードのON/OFFの切り替えが可能です。
ゴーグルモードは、画面を２分割し、操作ボタンを隠します。

Copyright (c) 2022-2023 Katayama Hirofumi MZ
Copyright (c) 2018 Robert Eisele
Copyright (c) 2007-2022 Akshay Nair
Copyright 2022 OpenJS Foundation and jQuery contributors.`;

// {{LANGUAGE_SPECIFIC}}
const NOTICE_ZW_CN = `=========================
催眠克拉克拉
Hypnosis KraKra
=========================

本软件是一款欣赏催眠动态图片的应用程序。
它无需使用任何视频文件即可实时生成催眠视频。
如何使用它取决于您。

* 来源: https://github.com/katahiromz/KraKra_ja_jp
* 使用了一些 OtoLogic 音频材料。
* 您可以根据 Apache 2.0 许可证修改此软件。

【使用注意事项】

- 该软件是一个玩笑应用程序，不保证其运行。
- 如果您有癫痫症状，请勿使用本软件。
- 如果您的国家、学校、宗教或地区禁止催眠，请勿使用此应用程序。
- 急性精神分裂症患者不应使用此软件。
- 使用本软件后避免立即开车。
- 有密集恐惧症的人不应使用此软件。
- 如果出现头痛、头晕、呼吸急促、恶心、肠胃问题或情绪异常等症状，请立即停止使用并咨询专科医生。
- 如果出现任何原因导致难以继续提供服务，运营商可以随时终止服务。

【如何使用】

- 基本上，它是一个享受观看屏幕的应用程序。
- 点击/单击屏幕来切换图片。
- “图”按钮允许您设置视频设置。
- 点击“麦克风”按钮使用麦克风（需要许可）。
- 点击“♪”按钮会发出声音。
- “Aa”按钮允许您设置要显示的消息。
- “气泡”按钮将说出该消息。
- “齿轮”按钮将打开配置。
- 当你的手指在屏幕上运行时，屏幕会产生火花，吸引他们的注意力。

【键盘操作】

当连接键盘时，可以进行以下操作：

- 按[0]至[9]键切换图像。
- 按[C]键打开配置。
- 按[H]键打开版本信息。
- 按[A]键打开外观设置。
- 按[P]键播放声音。
- 按[M]键打开/关闭麦克风（需要许可）。
- 按[T]键打开消息设置。
- 按[S]键自动说出当前消息。
- 按[X]键暂停。
- 按[-]或[K]键终止催眠。
- 按[D]键分割屏幕。
- 按[B]键切换按钮的显示。
- 按[G]键打开/关闭护目镜模式。

【护目镜模式】

护目镜模式可通过可连接的键盘和护目镜使用。
按 [G] 键可以打开和关闭护目镜模式。
护目镜模式将屏幕一分为二并隐藏控制按钮。

Copyright (c) 2022-2023 片山博文MZ
Copyright (c) 2018 Robert Eisele
Copyright (c) 2007-2022 Akshay Nair
Copyright 2022 OpenJS Foundation and jQuery contributors.`;

// {{LANGUAGE_SPECIFIC}}
const NOTICE_TW_CN = `=========================
催眠克拉克拉
Hypnosis KraKra
=========================

該軟件是一款可以讓您享受催眠圖像的應用程序。
無需使用任何視頻文件即可實時生成催眠視頻。
如何使用它取決於您。

※ 源代碼: https://github.com/katahiromz/KraKra_ja_jp
※ 部分使用 OtoLogic 音頻材料。
※ 根據 Apache 2.0 許可證，可以免費進行修改。

【使用注意事項】

- 該軟件是一個玩笑應用程序，不保證其運行。
- 如果您患有癲癇症，請勿使用。
- 如果您的國家/學校/宗教/地區禁止催眠，請不要使用此應用程序。
- 請勿用於急性精神分裂症患者。
- 使用後避免立即開車。
- 如果您有廣場恐懼症，請勿使用。
- 如果出現頭痛、頭暈、換氣過度、噁心、腸胃不適或情緒異常等症狀，請立即停止使用並諮詢專科醫生。
- 如果有理由難以繼續提供該服務，運營商可以隨時終止該服務。

【用法】

- 它基本上是一個欣賞屏幕的應用程序。
- 點擊/單擊屏幕切換視頻。
- 您可以使用“圖”按鈕設置圖像。
- 您可以通過“麥克風”按鈕使用麥克風（需要許可）。
- “♪”按鈕會發出聲音。
- 您可以設置要使用“字母”按鈕顯示的消息。
- 使用“語音氣泡”按鈕通過自動語音說出消息。
- 用於常規設置的“齒輪”按鈕。
- 在屏幕上滑動手指即可顯示閃爍的光芒，吸引對手的注意力。

【鍵盤操作】

連接鍵盤後，您可以執行以下操作。

- 按“0”至“9”鍵切換圖像。
- 按“C”鍵打開常規設置。
- 按“H”鍵打開版本信息。
- 按“A”鍵打開外觀設置。
- 按“P”鍵播放聲音。
- 按“M”鍵打開/關閉麥克風（需要許可）。
- 按“T”鍵打開消息設置。
- 按“S”鍵以自動語音說出當前消息。
- 按“X”鍵暫停。
- 按“-”或“K”關閉催眠。
- 按“D”鍵在屏幕分割之間切換。
- 按“B”鍵切換按鈕顯示。
- 按“G”鍵切換護目鏡模式。

【護目鏡模式】

如果您有可連接的鍵盤和護目鏡，則可以使用護目鏡模式。
按“G”鍵可打開/關閉護目鏡模式。
護目鏡模式將屏幕分為兩部分並隱藏操作按鈕。

Copyright (c) 2022-2023 片山博文MZ
Copyright (c) 2018 Robert Eisele
Copyright (c) 2007-2022 Akshay Nair
Copyright 2022 OpenJS Foundation and jQuery contributors.`;

function AndroidMicrophoneOnReload(){
	localStorage.setItem('AndroidMicrophoneOnReload', '1');
	location.reload();
}

jQuery(function($){
	let cxScreen = 0, cyScreen = 0;
	let old_cxScreen = null, old_cyScreen = null;
	let old_time = (new Date()).getTime();
	let picType = 0;
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
	let speedType = 'normal';
	let coin_img = new Image();
	let rotationType = 'normal';
	let stopping = false;
	let released = false;
	let logo_img = new Image();
	let please_tap_here_img = new Image();
	let hypnosis_releasing_img = new Image();
	let all_released_img = new Image();

	coin_img.src = 'images/coin5yen.png';

	function isNativeApp(){
		return navigator.userAgent.indexOf('/KraKra-native-app/') != -1;
	}

	function getNativeAppVersion(){
		let results = navigator.userAgent.match(/\/KraKra-native-app\/([\d\.]+)\//);
		if (results)
			return results[1];
		return false;
	}

	function neg_mod(x, y){
		if (x > 0) return x % y;
		return neg_mod(x + 99999 * y, y);
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

	// {{LANGUAGE_SPECIFIC}}
	function getStr(str_id){
		let lang = localStorage.getItem('saiminLanguage3');
		if (!lang)
			lang = 'en';
		if (lang == 'ja' || lang == 'jp'){ // Japanese
			switch(str_id){
			case 'TEXT_PIC': return '画';
			case 'TEXT_OK': return 'OK';
			case 'TEXT_CANCEL': return 'キャンセル';
			case 'TEXT_YES': return 'はい';
			case 'TEXT_NO': return 'いいえ';
			case 'TEXT_CHOOSE_LANGUAGE': return 'Choose a language (语言)';
			case 'TEXT_ABOUT_APP': return 'バージョン情報';
			case 'TEXT_INIT_APP': return 'アプリの初期化';
			case 'TEXT_INITTED_APP': return 'アプリを初期化しました。';
			case 'TEXT_CONFIGURATION': return '全般設定';
			case 'TEXT_APPEARANCE': return '見た目の設定';
			case 'TEXT_INPUT_MESSAGE': return 'メッセージ文字列を入力して下さい。';
			case 'TEXT_FULLWIDTH_SPACE': return '　';
			case 'TEXT_PERIOD': return '。';
			case 'TEXT_PERIOD_SPACE': return '。';
			case 'TEXT_RELEASE_HYPNOSIS': return '催眠解除';
			case 'TEXT_HYPNOSIS_RELEASED': return '催眠解除。';
			case 'TEXT_KILLING_HYPNOSIS_IMG': return 'images/killing-hypnosis_ja.svg';
			case 'TEXT_HYPNOSIS_RELEASED_IMG': return 'images/hypnosis-released_ja.svg';
			case 'TEXT_ALL_RELEASED_IMG': return 'images/all-released_ja.svg';
			}
		}else if (lang == 'zh-CN' || lang == 'cn'){ // Chinese (Simplified)
			switch(str_id){
			case 'TEXT_PIC': return '图';
			case 'TEXT_OK': return '確定';
			case 'TEXT_CANCEL': return '取消';
			case 'TEXT_YES': return '是';
			case 'TEXT_NO': return '否';
			case 'TEXT_CHOOSE_LANGUAGE': return 'Choose a language (语言)';
			case 'TEXT_ABOUT_APP': return '关于这个应用程序';
			case 'TEXT_INIT_APP': return '初始化应用程序';
			case 'TEXT_INITTED_APP': return '初始化了应用程序。';
			case 'TEXT_CONFIGURATION': return '配置';
			case 'TEXT_APPEARANCE': return '外貌';
			case 'TEXT_INPUT_MESSAGE': return '请输入消息文本。';
			case 'TEXT_FULLWIDTH_SPACE': return '　';
			case 'TEXT_PERIOD': return '。';
			case 'TEXT_PERIOD_SPACE': return '。';
			case 'TEXT_RELEASE_HYPNOSIS': return '去催眠';
			case 'TEXT_HYPNOSIS_RELEASED': return '我取消了催眠。';
			case 'TEXT_KILLING_HYPNOSIS_IMG': return 'images/killing-hypnosis_zh-CN.svg';
			case 'TEXT_HYPNOSIS_RELEASED_IMG': return 'images/hypnosis-released_zh-CN.svg';
			case 'TEXT_ALL_RELEASED_IMG': return 'images/all-released_zh-CN.svg';
			}
		}else if (lang == 'zh-TW'){ // Chinese (Traditional)
			switch(str_id){
			case 'TEXT_PIC': return '圖';
			case 'TEXT_OK': return '確定';
			case 'TEXT_CANCEL': return '取消';
			case 'TEXT_YES': return '是';
			case 'TEXT_NO': return '否';
			case 'TEXT_CHOOSE_LANGUAGE': return 'Choose a language (语言)';
			case 'TEXT_ABOUT_APP': return '版本信息';
			case 'TEXT_INIT_APP': return '應用程序初始化';
			case 'TEXT_INITTED_APP': return '初始化了應用程序。';
			case 'TEXT_CONFIGURATION': return '常規設置';
			case 'TEXT_APPEARANCE': return '外觀設置';
			case 'TEXT_INPUT_MESSAGE': return '請輸入消息字符串。';
			case 'TEXT_FULLWIDTH_SPACE': return '　';
			case 'TEXT_PERIOD': return '。';
			case 'TEXT_PERIOD_SPACE': return '。';
			case 'TEXT_RELEASE_HYPNOSIS': return '催眠釋放';
			case 'TEXT_HYPNOSIS_RELEASED': return '催眠釋放。';
			case 'TEXT_KILLING_HYPNOSIS_IMG': return 'images/killing-hypnosis_zh-CN.svg';
			case 'TEXT_HYPNOSIS_RELEASED_IMG': return 'images/hypnosis-released_zh-CN.svg';
			case 'TEXT_ALL_RELEASED_IMG': return 'images/all-released_zh-CN.svg';
			}
		} else { // English is default
			switch(str_id){
			case 'TEXT_PIC': return 'pic';
			case 'TEXT_OK': return 'OK';
			case 'TEXT_CANCEL': return 'Cancel';
			case 'TEXT_YES': return 'Yes';
			case 'TEXT_NO': return 'No';
			case 'TEXT_CHOOSE_LANGUAGE': return 'Choose a language (语言)';
			case 'TEXT_ABOUT_APP': return 'About this app';
			case 'TEXT_INIT_APP': return 'Initialize app';
			case 'TEXT_INITTED_APP': return 'Initialized the app.';
			case 'TEXT_CONFIGURATION': return 'Configuration';
			case 'TEXT_APPEARANCE': return 'Appearance';
			case 'TEXT_INPUT_MESSAGE': return 'Please enter a message text.';
			case 'TEXT_FULLWIDTH_SPACE': return '　';
			case 'TEXT_PERIOD': return '.';
			case 'TEXT_PERIOD_SPACE': return '. ';
			case 'TEXT_RELEASE_HYPNOSIS': return 'Kill hypnosis';
			case 'TEXT_HYPNOSIS_RELEASED': return 'Hypnosis released.';
			case 'TEXT_KILLING_HYPNOSIS_IMG': return 'images/killing-hypnosis_en.svg';
			case 'TEXT_HYPNOSIS_RELEASED_IMG': return 'images/hypnosis-released_en.svg';
			case 'TEXT_ALL_RELEASED_IMG': return 'images/all-released_en.svg';
			}
		}
	}

	let currentLanguage = 'en';

	// {{LANGUAGE_SPECIFIC}}
	function localizeSaimin(lang){
		currentLanguage = lang;
		if (lang == 'ja' || lang == 'jp'){ // Japanese
			$('#notice_text').text(NOTICE_JA);
			$('#mic_img').attr('src', 'images/mic.png');
			$('#type_select_button').text(getStr('TEXT_PIC') + type_select.value);
			$('#sound_img').attr('src', 'images/sound.png');
			$('#char_img').attr('src', 'images/text_ja.png');
			$('#speech_img').attr('src', 'images/speak.png');
			$('#gear_img').attr('src', 'images/gear.png');
			$('#question_img').attr('src', 'images/question.png');
			$('#config_language').text('Language (言語):');
			$('#language_select option[value="en"]').text('English');
			$('#language_select option[value="ja"]').text('Japanese');
			$('#language_select option[value="zh-CN"]').text('Chinese (Simplified)');
			$('#language_select option[value="zh-TW"]').text('Chinese (Traditional)');
			$('#config_language2').text('Language:');
			$('#language_select2 option[value="en"]').text('English');
			$('#language_select2 option[value="ja"]').text('Japanese');
			$('#language_select2 option[value="zh-CN"]').text('Chinese (Simplified)');
			$('#language_select2 option[value="zh-TW"]').text('Chinese (Traditional)');
			$('#appearance_type').text('映像の種類:');
			$('#type_select option[value="-1"]').text('画-1: 催眠解除');
			$('#type_select option[value="0"]').text('画0: 初期画面');
			$('#type_select option[value="1"]').text('画1: ピンク色の渦巻き');
			$('#type_select option[value="2"]').text('画2: 同心円状');
			$('#type_select option[value="3"]').text('画3: 回る目玉');
			$('#type_select option[value="4"]').text('画4: 白黒の渦巻き');
			$('#type_select option[value="5"]').text('画5: 広がる虹色(ハート)');
			$('#type_select option[value="6"]').text('画6: 五円玉');
			$('#type_select option[value="7"]').text('画7: ぼわんぼわん');
			$('#type_select option[value="8"]').text('画8: 狂気の色');
			$('#type_select option[value="9"]').text('画9: ミックス渦巻き');
			$('#appearance_division').text('画面分割:');
			$('#division_select option[value="-1"]').text('自動');
			$('#division_select option[value="1"]').text('分割なし');
			$('#division_select option[value="2"]').text('2分割');
			$('#appearance_speed').text('スピード:');
			$('#speed_type_select option[value="slow"]').text('遅い');
			$('#speed_type_select option[value="normal"]').text('普通');
			$('#speed_type_select option[value="fast"]').text('速い');
			$('#speed_type_select option[value="irregular"]').text('不規則');
			$('#appearance_rotation').text('回転の向き:');
			$('#rotation_select option[value="normal"]').text('普通');
			$('#rotation_select option[value="counter"]').text('逆回転');
			$('#config_size').text('メッセージの大きさ:');
			$('#message_size_select option[value="small"]').text('小さい');
			$('#message_size_select option[value="normal"]').text('普通');
			$('#message_size_select option[value="large"]').text('大きい');
			$('#message_size_select option[value="huge"]').text('特大');
			$('#config_note').text('音符ボタン:');
			$('#sound_select option[value=""]').text('(なし)');
			$('#sound_select option[value="Robot"]').text('Robot');
			$('#sound_select option[value="Keen"]').text('Keen');
			$('#sound_select option[value="Horror"]').text('Horror');
			$('#sound_select option[value="Hunting"]').text('Hunting');
			$('#sound_select option[value="Lonely"]').text('Lonely');
			$('#sound_select option[value="Longing"]').text('Longing');
			$('#sound_select option[value="Lovely"]').text('Lovely');
			$('#sound_select option[value="Magic"]').text('Magic');
			$('#sound_select option[value="Miracle"]').text('Miracle');
			$('#config_switch_sound').text('切り替え音:');
			$('#type_sound_select option[value="0"]').text('なし');
			$('#type_sound_select option[value="1"]').text('あり');
			$('#config_brightness').text('画面の明るさ:');
			$('#screen_brightness option[value="normal"]').text('普通');
			$('#screen_brightness option[value="brighter"]').text('明るくする');
			$('#version_text').text('催眠くらくら Version ' + VERSION);
			logo_img = new Image();
			logo_img.src = 'images/logo_ja.png';
			please_tap_here_img = new Image();
			please_tap_here_img.src = 'images/please-tap-here_ja.svg';
			if (released){
				hypnosis_releasing_img.src = getStr('TEXT_HYPNOSIS_RELEASED_IMG');
			}else{
				hypnosis_releasing_img.src = getStr('TEXT_KILLING_HYPNOSIS_IMG');
			}
		}else if (lang == 'zh-CN' || lang == 'cn'){ // Chinese (Simplified)
			$('#notice_text').text(NOTICE_ZW_CN);
			$('#mic_img').attr('src', 'images/mic.png');
			$('#type_select_button').text(getStr('TEXT_PIC') + type_select.value);
			$('#sound_img').attr('src', 'images/sound.png');
			$('#char_img').attr('src', 'images/text_zh-CN.png');
			$('#speech_img').attr('src', 'images/speak.png');
			$('#gear_img').attr('src', 'images/gear.png');
			$('#question_img').attr('src', 'images/question.png');
			$('#config_language').text('Language:');
			$('#language_select option[value="en"]').text('English');
			$('#language_select option[value="ja"]').text('Japanese');
			$('#language_select option[value="zh-CN"]').text('Chinese (Simplified)');
			$('#language_select option[value="zh-TW"]').text('Chinese (Traditional)');
			$('#config_language2').text('Language:');
			$('#language_select2 option[value="en"]').text('English');
			$('#language_select2 option[value="ja"]').text('Japanese');
			$('#language_select2 option[value="zh-CN"]').text('Chinese (Simplified)');
			$('#language_select2 option[value="zh-TW"]').text('Chinese (Traditional)');
			$('#appearance_type').text('视频类型：');
			$('#type_select option[value="-1"]').text('图-1: 释放催眠');
			$('#type_select option[value="0"]').text('图0: 初始屏幕');
			$('#type_select option[value="1"]').text('图1: 粉红色漩涡');
			$('#type_select option[value="2"]').text('图2: 同心圆');
			$('#type_select option[value="3"]').text('图3: 旋转的眼');
			$('#type_select option[value="4"]').text('图4: 黑色和白色的漩涡');
			$('#type_select option[value="5"]').text('图5: 传播彩虹色（心）');
			$('#type_select option[value="6"]').text('图6: 5日元硬币');
			$('#type_select option[value="7"]').text('图7: 头晕 头晕');
			$('#type_select option[value="8"]').text('图8: 疯狂的颜色');
			$('#type_select option[value="9"]').text('图9: 混合漩涡');
			$('#appearance_division').text('分屏：');
			$('#division_select option[value="-1"]').text('自动的');
			$('#division_select option[value="1"]').text('没有分屏');
			$('#division_select option[value="2"]').text('分屏');
			$('#appearance_speed').text('速度：');
			$('#speed_type_select option[value="slow"]').text('慢的');
			$('#speed_type_select option[value="normal"]').text('正常速度');
			$('#speed_type_select option[value="fast"]').text('快速');
			$('#speed_type_select option[value="irregular"]').text('不规律的');
			$('#appearance_rotation').text('旋转方向：');
			$('#rotation_select option[value="normal"]').text('正常旋转');
			$('#rotation_select option[value="counter"]').text('反向旋转');
			$('#config_size').text('消息大小：');
			$('#message_size_select option[value="small"]').text('小的');
			$('#message_size_select option[value="normal"]').text('正常尺寸');
			$('#message_size_select option[value="large"]').text('大的');
			$('#message_size_select option[value="huge"]').text('超大的');
			$('#config_note').text('声音按钮：');
			$('#sound_select option[value=""]').text('(无)');
			$('#sound_select option[value="Robot"]').text('Robot');
			$('#sound_select option[value="Keen"]').text('Keen');
			$('#sound_select option[value="Horror"]').text('Horror');
			$('#sound_select option[value="Hunting"]').text('Hunting');
			$('#sound_select option[value="Lonely"]').text('Lonely');
			$('#sound_select option[value="Longing"]').text('Longing');
			$('#sound_select option[value="Lovely"]').text('Lovely');
			$('#sound_select option[value="Magic"]').text('Magic');
			$('#sound_select option[value="Miracle"]').text('Miracle');
			$('#config_switch_sound').text('开关声音：');
			$('#type_sound_select option[value="0"]').text('无');
			$('#type_sound_select option[value="1"]').text('有');
			$('#config_brightness').text('屏幕亮度：');
			$('#screen_brightness option[value="normal"]').text('通常');
			$('#screen_brightness option[value="brighter"]').text('明亮');
			$('#version_text').text('催眠克拉克拉 Version ' + VERSION);
			logo_img = new Image();
			logo_img.src = 'images/logo_zh-CN.svg';
			please_tap_here_img = new Image();
			please_tap_here_img.src = 'images/please-tap-here_zh-CN.svg';
			if (released){
				hypnosis_releasing_img.src = getStr('TEXT_HYPNOSIS_RELEASED_IMG');
			}else{
				hypnosis_releasing_img.src = getStr('TEXT_KILLING_HYPNOSIS_IMG');
			}
		}else if (lang == 'zh-TW'){ // Chinese (Traditional)
			$('#notice_text').text(NOTICE_TW_CN);
			$('#mic_img').attr('src', 'images/mic.png');
			$('#type_select_button').text(getStr('TEXT_PIC') + type_select.value);
			$('#sound_img').attr('src', 'images/sound.png');
			$('#char_img').attr('src', 'images/text_zh-TW.png');
			$('#speech_img').attr('src', 'images/speak.png');
			$('#gear_img').attr('src', 'images/gear.png');
			$('#question_img').attr('src', 'images/question.png');
			$('#config_language').text('Language (言語):');
			$('#language_select option[value="en"]').text('English');
			$('#language_select option[value="ja"]').text('Japanese');
			$('#language_select option[value="zh-CN"]').text('Chinese (Simplified)');
			$('#language_select option[value="zh-TW"]').text('Chinese (Traditional)');
			$('#config_language2').text('Language:');
			$('#language_select2 option[value="en"]').text('English');
			$('#language_select2 option[value="ja"]').text('Japanese');
			$('#language_select2 option[value="zh-CN"]').text('Chinese (Simplified)');
			$('#language_select2 option[value="zh-TW"]').text('Chinese (Traditional)');
			$('#appearance_type').text('視頻類型：');
			$('#type_select option[value="-1"]').text('圖-1: 催眠釋放');
			$('#type_select option[value="0"]').text('圖0: 初始屏幕');
			$('#type_select option[value="1"]').text('圖1: 粉紅色漩渦');
			$('#type_select option[value="2"]').text('圖2: 同心圆');
			$('#type_select option[value="3"]').text('圖3: 旋轉的眼');
			$('#type_select option[value="4"]').text('圖4: 黑色和白色漩渦');
			$('#type_select option[value="5"]').text('圖5: 傳播彩虹色（心）');
			$('#type_select option[value="6"]').text('圖6: 5日元硬幣');
			$('#type_select option[value="7"]').text('圖7: 頭暈 頭暈');
			$('#type_select option[value="8"]').text('圖8: 瘋狂的顏色');
			$('#type_select option[value="9"]').text('圖9: 混合漩渦');
			$('#appearance_division').text('分屏：');
			$('#division_select option[value="-1"]').text('自動的');
			$('#division_select option[value="1"]').text('沒有劃分');
			$('#division_select option[value="2"]').text('分成兩部分');
			$('#appearance_speed').text('速度：');
			$('#speed_type_select option[value="slow"]').text('慢的');
			$('#speed_type_select option[value="normal"]').text('正常的速度');
			$('#speed_type_select option[value="fast"]').text('快速');
			$('#speed_type_select option[value="irregular"]').text('不規律的');
			$('#appearance_rotation').text('旋轉方向：');
			$('#rotation_select option[value="normal"]').text('正常旋轉');
			$('#rotation_select option[value="counter"]').text('反向旋轉');
			$('#config_size').text('消息大小：');
			$('#message_size_select option[value="small"]').text('小的');
			$('#message_size_select option[value="normal"]').text('正常尺寸');
			$('#message_size_select option[value="large"]').text('大的');
			$('#message_size_select option[value="huge"]').text('超大的');
			$('#config_note').text('聲音按鈕：');
			$('#sound_select option[value=""]').text('(無)');
			$('#sound_select option[value="Robot"]').text('Robot');
			$('#sound_select option[value="Keen"]').text('Keen');
			$('#sound_select option[value="Horror"]').text('Horror');
			$('#sound_select option[value="Hunting"]').text('Hunting');
			$('#sound_select option[value="Lonely"]').text('Lonely');
			$('#sound_select option[value="Longing"]').text('Longing');
			$('#sound_select option[value="Lovely"]').text('Lovely');
			$('#sound_select option[value="Magic"]').text('Magic');
			$('#sound_select option[value="Miracle"]').text('Miracle');
			$('#config_switch_sound').text('開關聲音：');
			$('#type_sound_select option[value="0"]').text('無');
			$('#type_sound_select option[value="1"]').text('有');
			$('#config_brightness').text('屏幕亮度：');
			$('#screen_brightness option[value="normal"]').text('正常亮度');
			$('#screen_brightness option[value="brighter"]').text('提亮');
			$('#version_text').text('催眠克拉克拉 Version ' + VERSION);
			logo_img = new Image();
			logo_img.src = 'images/logo_zh-TW.svg';
			please_tap_here_img = new Image();
			please_tap_here_img.src = 'images/please-tap-here_zh-TW.svg';
			if (released){
				hypnosis_releasing_img.src = getStr('TEXT_HYPNOSIS_RELEASED_IMG');
			}else{
				hypnosis_releasing_img.src = getStr('TEXT_KILLING_HYPNOSIS_IMG');
			}
		}else{ // English is default
			$('#notice_text').text(NOTICE_EN);
			$('#mic_img').attr('src', 'images/mic.png');
			$('#type_select_button').text(getStr('TEXT_PIC') + type_select.value);
			$('#sound_img').attr('src', 'images/sound.png');
			$('#char_img').attr('src', 'images/text_en.png');
			$('#speech_img').attr('src', 'images/speak.png');
			$('#gear_img').attr('src', 'images/gear.png');
			$('#question_img').attr('src', 'images/question.png');
			$('#config_language').text('Language:');
			$('#language_select option[value="en"]').text('English');
			$('#language_select option[value="ja"]').text('Japanese');
			$('#language_select option[value="zh-CN"]').text('Chinese (Simplified)');
			$('#language_select option[value="zh-TW"]').text('Chinese (Traditional)');
			$('#config_language2').text('Language:');
			$('#language_select2 option[value="en"]').text('English');
			$('#language_select2 option[value="ja"]').text('Japanese');
			$('#language_select2 option[value="zh-CN"]').text('Chinese (Simplified)');
			$('#language_select2 option[value="zh-TW"]').text('Chinese (Traditional)');
			$('#appearance_type').text('The type of picture:');
			$('#type_select option[value="-1"]').text('pic-1: Release Hypnosis');
			$('#type_select option[value="0"]').text('pic0: Initial Screen');
			$('#type_select option[value="1"]').text('pic1: Pink Spiral');
			$('#type_select option[value="2"]').text('pic2: Concentric Circles');
			$('#type_select option[value="3"]').text('pic3: The Eyes');
			$('#type_select option[value="4"]').text('pic4: Black and White Spiral');
			$('#type_select option[value="5"]').text('pic5: Spreading Rainbow (Hearts)');
			$('#type_select option[value="6"]').text('pic6: 5-Yen Coin');
			$('#type_select option[value="7"]').text('pic7: Clamor Clamor');
			$('#type_select option[value="8"]').text('pic8: Crazy Colors');
			$('#type_select option[value="9"]').text('pic9: Mixed Spirals');
			$('#appearance_division').text('Screen splitting:');
			$('#division_select option[value="-1"]').text('Auto');
			$('#division_select option[value="1"]').text('No splitting');
			$('#division_select option[value="2"]').text('Split in 2');
			$('#appearance_speed').text('Speed:');
			$('#speed_type_select option[value="slow"]').text('Slow');
			$('#speed_type_select option[value="normal"]').text('Normal');
			$('#speed_type_select option[value="fast"]').text('Fast');
			$('#speed_type_select option[value="irregular"]').text('Irregular');
			$('#appearance_rotation').text('Rotation:');
			$('#rotation_select option[value="normal"]').text('Normal');
			$('#rotation_select option[value="counter"]').text('Counterrotation');
			$('#config_size').text('Size of message:');
			$('#message_size_select option[value="small"]').text('Small');
			$('#message_size_select option[value="normal"]').text('Normal');
			$('#message_size_select option[value="large"]').text('Large');
			$('#message_size_select option[value="huge"]').text('Huge');
			$('#config_note').text('Note button:');
			$('#sound_select option[value=""]').text('(None)');
			$('#sound_select option[value="Robot"]').text('Robot');
			$('#sound_select option[value="Keen"]').text('Keen');
			$('#sound_select option[value="Horror"]').text('Horror');
			$('#sound_select option[value="Hunting"]').text('Hunting');
			$('#sound_select option[value="Lonely"]').text('Lonely');
			$('#sound_select option[value="Longing"]').text('Longing');
			$('#sound_select option[value="Lovely"]').text('Lovely');
			$('#sound_select option[value="Magic"]').text('Magic');
			$('#sound_select option[value="Miracle"]').text('Miracle');
			$('#config_switch_sound').text('Pic change sound:');
			$('#type_sound_select option[value="0"]').text('No');
			$('#type_sound_select option[value="1"]').text('Yes');
			$('#config_brightness').text('Brightness:');
			$('#screen_brightness option[value="normal"]').text('Normal');
			$('#screen_brightness option[value="brighter"]').text('Brighter');
			$('#version_text').text('Hyponosis KraKra Version ' + VERSION);
			logo_img = new Image();
			logo_img.src = 'images/logo_en.png';
			please_tap_here_img = new Image();
			please_tap_here_img.src = 'images/please-tap-here_en.svg';
			if (released){
				hypnosis_releasing_img.src = getStr('TEXT_HYPNOSIS_RELEASED_IMG');
			}else{
				hypnosis_releasing_img.src = getStr('TEXT_KILLING_HYPNOSIS_IMG');
			}
		}
		all_released_img = new Image();
		all_released_img.src = getStr('TEXT_ALL_RELEASED_IMG');
		$('#notice_text').scrollTop(0);
	}

	function setLanguage(lang){
		if (!lang)
			lang = 'en';
		localStorage.setItem('saiminLanguage3', lang);
		localizeSaimin(lang);
		language_select.value = lang;
		try{
			android.setLanguage(lang);
		}catch(error){
			;
		}
	}

	function adjustText(text){
		// {{language-specific}}
		text = text.replace(getStr('TEXT_FULLWIDTH_SPACE'), '  ').trim();
		if (text == '')
			return text;
		while (text.slice(-1) == getStr('TEXT_PERIOD'))
			text = text.slice(0, -1);
		if (text == '')
			return text;
		text += getStr('TEXT_PERIOD_SPACE');
		return text;
	}

	async function playSpeech(text){
		cancelSpeech();
		text = adjustText(text);
		try{
			android.speechLoop(text);
		}catch(error){
			if (window.speechSynthesis){
				text = text.repeat(32);
				let speech = new SpeechSynthesisUtterance(text);
				speech.pitch = 0.6;
				speech.rate = 0.4;
				// {{LANGUAGE_SPECIFIC}}
				if (currentLanguage == 'ja' || currentLanguage == 'ja-JP') // Japanese
					speech.lang = 'ja-JP';
				else if (currentLanguage == 'zh-CN') // Chinese (Simplified)
					speech.lang = 'zh-CN';
				else if (currentLanguage == 'zh-TW') // Chinese (Traditional)
					speech.lang = 'zh-TW';
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
		sound_select.value = value;
		localStorage.setItem('saiminSoundName', soundName);
	}

	function setTypeSound(value, test = false){
		typeSound = parseInt(value);
		type_sound_select.value = value;
		localStorage.setItem('saiminTypeSound', value);
		if (test && typeSound == 1 && kirakira_sound){
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
		switch (value){
		case 'small':
			floating_text1.classList.add('font_size_small');
			floating_text2.classList.add('font_size_small');
			break;
		case 'normal':
		default:
			floating_text1.classList.add('font_size_normal');
			floating_text2.classList.add('font_size_normal');
			break;
		case 'large':
			floating_text1.classList.add('font_size_large');
			floating_text2.classList.add('font_size_large');
			break;
		case 'huge':
			floating_text1.classList.add('font_size_huge');
			floating_text2.classList.add('font_size_huge');
			break;
		}
		message_size_select.value = value;
		localStorage.setItem('saiminMessageSize', value);
	}

	function setSpeedType(value){
		switch (value){
		case 'slow':
			speed = 27.5;
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
		speed_type_select.value = value;
		localStorage.setItem('saiminSpeedType', value);
	}

	function setDivision(value){
		division = parseInt(value);
		division_select.value = division;
		localStorage.setItem('saiminDivision', division.toString());
	}

	function getCount(){
		return counter;
	}

	let oldPicType = 0;

	function setPicType(value){
		picType = parseInt(value);
		if (picType == -1){
			cancelSpeech();
			speech_checkbox.checked = false;
			speech_label.classList.remove('checked');
			released = false;
			sound_button.classList.add('releasing');
			text_button.classList.add('releasing');
			speech_label.classList.add('releasing');
			hypnosis_releasing_img.src = getStr('TEXT_KILLING_HYPNOSIS_IMG');
			setTimeout(function(){
				hypnosis_releasing_img.src = getStr('TEXT_HYPNOSIS_RELEASED_IMG');
				all_released_img.src = getStr('TEXT_ALL_RELEASED_IMG');
				released = true;
			}, 3000);
		} else {
			if (oldPicType == -1){
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
		type_select_button.innerText = getStr('TEXT_PIC') + picType.toString();
		localStorage.setItem('saiminType', picType.toString());
		oldPicType = picType;
	}

	function setText(txt){
		theText = txt.replace(getStr('TEXT_FULLWIDTH_SPACE'), '  ').trim();
		localStorage.setItem('saiminText', theText);
		if (speech_checkbox.checked){
			playSpeech(theText);
		}
		floating_text1.innerText = theText;
		floating_text2.innerText = theText;
	}

	function setRotation(value){
		rotation_select.value = value.toString();
		localStorage.setItem('saiminRotation', value.toString());
		rotationType = value.toString();
	}

	function fitCanvas(){
		let ctx = saimin_canvas.getContext('2d', { alpha: false });
		cxScreen = ctx.canvas.width = window.innerWidth;
		cyScreen = ctx.canvas.height = window.innerHeight;
	}

	function fit(){
		fitCanvas();
		let position = { my: 'center', at: 'center', of: window };
		if (localStorage.getItem('saiminHelpShowing')){
			$('#about_dialog').dialog('option', 'position', position);
		}else if (localStorage.getItem('saiminAppearanceShowing')){
			$('#appearance_dialog').dialog('option', 'position', position);
		}else if (localStorage.getItem('saiminConfigShowing')){
			$('#config_dialog').dialog('option', 'position', position);
		}
	}

	function updateVersionDisplay(){
		let nativeVersion = getNativeAppVersion();
		let text = version_text.innerText;
		if (nativeVersion){
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
		if (!ready){
			let reset = localStorage.getItem('saiminReset');
			if (reset){
				localStorage.removeItem('saiminReset');
				setPicType(reset);
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
		if (!lang){
			// {{LANGUAGE_SPECIFIC}}
			switch (navigator.language){
			case 'ja':
			case 'ja-JP':
			case 'ja-jp':
				// Japanese
				lang = 'ja';
				break;
			case 'zh':
			case 'zh-CN':
			case 'zh-SG':
			case 'zh-cn':
			case 'zh-sg':
				// Chinese (Simplified)
				lang = 'zh-CN';
				break;
			case 'zh-TW':
			case 'zh-HK':
			case 'zh-MO':
			case 'zh-tw':
			case 'zh-hk':
			case 'zh-mo':
				// Chinese (Traditional)
				lang = 'zh-TW';
				break;
			default:
				// English
				lang = 'en';
				break;
			}
			first_time = true;
		}
		language_select2.value = lang;
		let dialogContainer = $('#choose_language_dialog');
		dialogContainer.dialog({
			dialogClass: 'no-close',
			title: getStr('TEXT_CHOOSE_LANGUAGE'),
			buttons: [{
				text: getStr('TEXT_OK'),
				click: function(){
					setLanguage(language_select2.value);
					dialogContainer.dialog('close');
					if (first_time)
						help();
				},
			},{
				text: getStr('TEXT_CANCEL'),
				click: function(){
					dialogContainer.dialog('close');
					if (first_time && !localStorage.getItem('saiminLanguage3')){
						setLanguage('en');
						help();
					}
				},
			}],
			// Workaround against slowness
			draggable: false,
			resizable: false,
		});
		$('#choose_language_dialog').on('dialogclose', function(event){
			if (first_time && !localStorage.getItem('saiminLanguage3')){
				setLanguage('en');
				help();
			}
		});
	}

	function help(){
		$('#notice_text').width(window.innerWidth * 2 / 3).height(window.innerHeight * 2 / 5);
		setTimeout(function(){
			$('#notice_text').scrollTop(0);
		}, 200);
		localStorage.setItem('saiminHelpShowing', '1');
		let dialogContainer = $('#about_dialog');
		dialogContainer.dialog({
			dialogClass: 'no-close',
			title: getStr('TEXT_ABOUT_APP'),
			buttons: [{
				text: getStr('TEXT_INIT_APP'),
				click: function(){
					try{
						android.clearSettings();
					}catch(error){
						;
					}
					localStorage.clear();
					if (theRegistration){
						theRegistration.unregister();
					}
					alert(getStr('TEXT_INITTED_APP'));
					location.reload();
				},
			},{
				text: getStr('TEXT_OK'),
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
		dialogContainer.on('dialogclose', function(event){
			localStorage.removeItem('saiminHelpShowing');
			accepted();
		});
	}

	function apperance(){
		let old_type_value = type_select.value;
		let old_division_value = division_select.value;
		let old_speed_type_value = speed_type_select.value;
		let old_rotation_value = rotation_select.value;
		localStorage.setItem('saiminAppearanceShowing', '1');
		let dialogContainer = $('#appearance_dialog');
		dialogContainer.dialog({
			dialogClass: 'no-close',
			title: getStr('TEXT_APPEARANCE'),
			buttons: [
				{
					text: getStr('TEXT_RELEASE_HYPNOSIS'),
					click: function(){
						dialogContainer.dialog('close');
						setPicType(-1);
					},
				},{
					text: getStr('TEXT_OK'),
					click: function(){
						dialogContainer.dialog('close');
						if (picType == -1)
							setPicType(picType);
					},
				},{
					text: getStr('TEXT_CANCEL'),
					click: function(){
						setPicType(old_type_value);
						setDivision(old_division_value);
						setSpeedType(old_speed_type_value);
						setRotation(old_rotation_value);
						dialogContainer.dialog('close');
					},
				}
			],
			// Workaround against slowness
			draggable: false,
			resizable: false,
		});
		dialogContainer.on('dialogclose', function(event){
			localStorage.removeItem('saiminAppearanceShowing');
		});
	}

	function config(){
		let old_language = localStorage.getItem('saiminLanguage3');
		let old_message_size_value = message_size_select.value;
		let old_sound_value = sound_select.value;
		let old_type_sound_value = type_sound_select.value;
		let old_screen_brightness = screen_brightness.value;
		localStorage.setItem('saiminConfigShowing', '1');
		let dialogContainer = $('#config_dialog');
		dialogContainer.dialog({
			dialogClass: 'no-close',
			title: getStr('TEXT_CONFIGURATION'),
			buttons: [
				{
					text: getStr('TEXT_OK'),
					click: function(){
						dialogContainer.dialog('close');
					},
				},{
					text: getStr('TEXT_CANCEL'),
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
		dialogContainer.on('dialogclose', function(event){
			localStorage.removeItem('saiminConfigShowing');
		});
	}

	function circle(ctx, x, y, radius, is_fill = true){
		ctx.beginPath();
		ctx.arc(x, y, Math.abs(radius), 0, 2 * Math.PI);
		ctx.closePath();
		if (is_fill)
			ctx.fill();
		else
			ctx.stroke();
	}

	function circle2(ctx, x, y, radius, is_fill = true, N = 16){
		ctx.beginPath();
		for (let i = 0; i < N; ++i){
			let x0 = x + radius * Math.cos(2 * Math.PI * i / N);
			let y0 = y + radius * Math.sin(2 * Math.PI * i / N);
			if (i == 0){
				ctx.moveTo(x0, y0);
			}else{
				ctx.lineTo(x0, y0);
			}
		}
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

	function eye(ctx, x0, y0, r, opened = 1.0){
		ctx.beginPath();
		ctx.moveTo(x0 - r, y0);
		const r025 = r * 0.25;
		const r05 = r025 * 2 * opened;
		ctx.bezierCurveTo(x0 - r025, y0 - r05, x0 + r025, y0 - r05, x0 + r, y0);
		ctx.bezierCurveTo(x0 + r025, y0 + r05, x0 - r025, y0 + r05, x0 - r, y0);
		ctx.closePath();
		ctx.strokeStyle = "#000";
		ctx.lineWidth = r * 0.15;
		ctx.stroke();

		ctx.fillStyle = "#000";
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
		ctx.fillStyle = "#fcc";
		ctx.fill();
		ctx.strokeStyle = "#c66";
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

		if (released)
			factor = 1.0;

		let grd = ctx.createRadialGradient(qx, qy, 0, qx, qy, dxy * factor);
		grd.addColorStop(0, 'rgba(255, 255, 0, 1.0)');
		grd.addColorStop(1, 'rgba(255, 255, 255, 1.0)');
		ctx.fillStyle = grd;
		circle(ctx, qx, qy, dxy, true);

		ctx.strokeStyle = "black";
		ctx.lineWidth = 10;
		circle(ctx, qx, qy, (dx + dy + 10) / 5 * factor + dxy * 0.2, false);

		if (hypnosis_releasing_img.complete){
			let x = px + (dx - hypnosis_releasing_img.width) / 2;
			let y = py + (dy - hypnosis_releasing_img.height) / 2 - dy * 0.1;
			ctx.drawImage(hypnosis_releasing_img, x, y);
		}

		if (released && all_released_img.complete){
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

		if (logo_img.complete){
			let x = px + (dx - logo_img.width) / 2;
			let y = py + (dy - logo_img.height) / 2 - dy * 0.1;
			ctx.drawImage(logo_img, x, y);
		}

		if (please_tap_here_img.complete){
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
		if (isLargeDisplay()){
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
		if (flag){
			ctx.moveTo(px, py);
			ctx.lineTo(px + dx, py);
			ctx.lineTo(px + dx, py + dy);
			ctx.lineTo(px, py + dy);
		} else {
			let value = 0.2 + 0.2 * Math.abs(Math.sin(count2 * 0.02));
			ctx.arc(qx, qy, Math.abs(dxy) * value, 0, 2 * Math.PI);
		}
		ctx.closePath();
		ctx.clip();

		ctx.fillStyle = '#fff';
		ctx.fillRect(px, py, dx, dy);

		let size = (dx + dy) * 0.4;

		let dr0 = 30;
		if (isLargeDisplay()){
			dr0 *= 2;
			count2 *= 2;
			ctx.lineWidth = 30;
		} else {
			ctx.lineWidth = 15;
		}
		let dr = dr0 / 2 * factor;
		let radius = neg_mod(count2 * 4, dr0);
		if (flag)
			radius = dr0 - radius;

		for (; radius < size; radius += dr0){
			circle(ctx, qx, qy, radius, false);
		}

		ctx.restore();
	}

	function hsv2rgb(h, s, v)
	{
		let r, g, b;
		r = g = b = v;
		if (s > 0)
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
			if (flag2){
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
		for (let r = neg_mod(count2 * 2, 100); r < cxy; r += 100){
			circle(ctx, qx, qy, r, false);
			++i;
		}

		let opened = 1.0;
		let f = Math.sin(Math.abs(count2 * 0.1));
		if (f >= 0.8){
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
			let x = qx + cxy * Math.cos(radian) * 0.3;
			let y = qy + cxy * Math.sin(radian) * 0.3;
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

		if (isLargeDisplay()){
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
				if (isLarge)
					factor2 *= 2;
				let x = qx + factor2 * Math.cos(radian);
				let y = qy + factor2 * Math.sin(radian);
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

		let grd = ctx.createRadialGradient(qx, qy, dxy * 0.25, qx, qy, dxy * 0.5);
		grd.addColorStop(0, 'rgba(255, 255, 255, 0.0)');
		grd.addColorStop(1, 'rgba(255, 255, 255, 0.7)');
		ctx.fillStyle = grd;
		circle(ctx, qx, qy, dxy, true);

		let value = factor * 25 + 10;
		let value2 = neg_mod(value, 191);
		ctx.fillStyle = `rgb(255,${value2},${value2})`;
		let M = 5;
		let heartSize = 30;
		for (let radius = neg_mod((factor * 10), 100) + 30; radius < dxy; radius += 100){
			for (let angle = 0; angle < 360; angle += 360 / M){
				let radian = angle * (Math.PI / 180.0);
				let x0 = qx + radius * Math.cos(radian + factor * 0.1 + radius / 100);
				let y0 = qy + radius * Math.sin(radian + factor * 0.1 + radius / 100);
				heart(ctx, x0, y0, x0, y0 + heartSize + neg_mod(value, 191) / 12);
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
		} while(0);

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

		if (coin_img.complete){
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
		if (isLargeDisplay()){
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
		if (division == 1){
			drawPicBlur(ctx, 0, 0, cx, cy);
			setTextPos(floating_text1, 0, 0, cx, cy, counter);
			y += cy / 4;
		} else if (division == -1){
			if (cx >= cy * 1.75){
				drawPicBlur(ctx, 0, 0, cx / 2, cy);
				//drawPicBlur(ctx, cx / 2, 0, cx / 2, cy);
				ctx.drawImage(saimin_canvas, 0, 0, cx / 2, cy, cx / 2, 0, cx / 2, cy);
				setTextPos(floating_text1, 0, 0, cx / 2, cy, counter);
				setTextPos(floating_text2, cx / 2, 0, cx / 2, cy, counter);
				splitted = true;
			}else if (cy >= cx * 1.75){
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
		} else {
			if (cx >= cy){
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

		if (picType == -1){
			floating_text1.classList.add('invisible');
			floating_text2.classList.add('invisible');
		}else if (theText != ''){
			if (splitted){
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

		if (old_cxScreen !== null && old_cyScreen !== null){
			if (window.innerWidth != old_cxScreen || window.innerHeight != old_cyScreen){
				fit();
			}
		}
		old_cxScreen = window.innerWidth;
		old_cyScreen = window.innerHeight;

		let new_time = (new Date()).getTime();
		let diff = (new_time - old_time) / 1000.0;
		if (rotationType == 'counter')
			diff = -diff;
		if (stopping)
			diff = 0;
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

		if (DEBUGGING){
			if (diff != 0){
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

	function init(){
		cancelSpeech();
		fitCanvas();

		let saiminText = localStorage.getItem('saiminText');
		if (saiminText){
			setText(saiminText);
		}

		let saiminDivision = localStorage.getItem('saiminDivision');
		if (saiminDivision){
			setDivision(saiminDivision);
		}

		let saiminSoundName = localStorage.getItem('saiminSoundName');
		if (saiminSoundName){
			setSoundName(saiminSoundName);
		}else{
			setSoundName('Magic');
		}

		let saiminTypeSound = localStorage.getItem('saiminTypeSound');
		if (saiminTypeSound){
			setTypeSound(saiminTypeSound);
		}

		let saiminSpeedType = localStorage.getItem('saiminSpeedType');
		if (saiminSpeedType){
			setSpeedType(saiminSpeedType);
		}else{
			setSpeedType('normal');
		}

		let saiminRotation = localStorage.getItem('saiminRotation');
		if (saiminRotation){
			setRotation(saiminRotation);
		}else{
			setRotation('normal');
		}

		let saiminMessageSize = localStorage.getItem('saiminMessageSize');
		if (saiminMessageSize){
			setMessageSizeType(saiminMessageSize);
		}else{
			setMessageSizeType('normal');
		}

		let saiminScreenBrightness = localStorage.getItem('saiminScreenBrightness');
		if (saiminScreenBrightness){
			setScreenBrightness(saiminScreenBrightness);
		}else{
			setScreenBrightness('normal');
		}

		text_button.addEventListener('click', function(){
			if (picType == -1)
				return;
			let text = prompt(getStr('TEXT_INPUT_MESSAGE'), theText);
			if (text !== null){
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
			if (picType == -1){
				let releasing_sound = null;
				// {{LANGUAGE_SPECIFIC}}
				if (localStorage.getItem('saiminLanguage3') == 'ja'){ // Japanese
					releasing_sound = new Audio('sn/ReleasedHypnosis_ja.mp3');
				}else if (localStorage.getItem('saiminLanguage3') == 'zh-CN'){ // Chinese (Simplified)
					releasing_sound = new Audio('sn/ReleasedHypnosis_zh-CN.mp3');
				}else if (localStorage.getItem('saiminLanguage3') == 'zh-TW'){ // Chinese (Traditional)
					releasing_sound = new Audio('sn/ReleasedHypnosis_zh-TW.mp3');
				}else{ // English is default
					releasing_sound = new Audio('sn/ReleasedHypnosis_en.mp3');
				}
				releasing_sound.play();
				return;
			}
			if (soundName != ''){
				if (sound){
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
			if (!ready)
				return;
			setPicType(parseInt(type_select.value));
		}, false);
		type_select.addEventListener('click', function(){
			if (!ready)
				return;
			setPicType(parseInt(type_select.value));
		}, false);

		language_select.addEventListener('change', function(){
			if (!ready)
				return;
			setLanguage(language_select.value);
		}, false);

		message_size_select.addEventListener('change', function(){
			if (!ready)
				return;
			setMessageSizeType(message_size_select.value, true);
		}, false);

		screen_brightness.addEventListener('change', function(){
			if (!ready)
				return;
			setScreenBrightness(screen_brightness.value, true);
		}, false);

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

		speed_type_select.addEventListener('change', function(){
			if (!ready)
				return;
			setSpeedType(speed_type_select.value);
		}, false);

		rotation_select.addEventListener('change', function(){
			if (!ready)
				return;
			setRotation(rotation_select.value);
		}, false);

		function canvasClick(e){
			if (!ready)
				return;
			if (e.shiftKey){
				setPicType((picType + (NUM_TYPE + 1) - 1) % (NUM_TYPE + 1));
			}else{
				setPicType((picType + 1) % (NUM_TYPE + 1));
			}
			type_select.value = picType.toString();
			if (typeSound == 1){
				if (kirakira_sound){
					let kirakira = new Audio('sn/kirakira.mp3');
					kirakira.play();
				}
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
			if (!ready)
				return;
			addStar(e.clientX, e.clientY);
		}, false);

		saimin_canvas.addEventListener('touchstart', function(e){
			if (!ready)
				return;
			touchmoving = true;
		}, {passive: true});
		saimin_canvas.addEventListener('touchmove', function(e){
			if (!ready)
				return;
			if (touchmoving){
				let touches = e.touches;
				if (touches && touches.length == 1){
					addStar(touches[0].clientX, touches[0].clientY);
				}
			}
		}, {passive: true});
		saimin_canvas.addEventListener('touchend', function(e){
			if (!ready)
				return;
			touchmoving = false;
		}, {passive: true});
		saimin_canvas.addEventListener('touchcancel', function(e){
			if (!ready)
				return;
			touchmoving = false;
		}, {passive: true});

		saimin_canvas.addEventListener('wheel', function(e){
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

		let saiminAdultCheck3 = localStorage.getItem('saiminAdultCheck3');
		let saiminLanguage3 = localStorage.getItem('saiminLanguage3');
		if (saiminAdultCheck3 && saiminLanguage3){
			setLanguage(saiminLanguage3);
			accepted();
		}else{
			if (!saiminLanguage3){
				chooseLanguage();
			} else {
				setLanguage(saiminLanguage3);
				if (!saiminAdultCheck3){
					help();
				}
			}
		}

		speech_checkbox.addEventListener('click', function(e){
			if (picType == -1) {
				if (speech_checkbox.checked){
					playSpeech(getStr('TEXT_HYPNOSIS_RELEASED'));
					speech_label.classList.add('checked');
				}else{
					cancelSpeech();
					speech_label.classList.remove('checked');
				}
				return;
			}
			if (speech_checkbox.checked){
				playSpeech(theText);
				speech_label.classList.add('checked');
			} else {
				cancelSpeech();
				speech_label.classList.remove('checked');
			}
		});

		let mic_isInited = false;
		microphone.addEventListener('click', function(e){
			if (microphone.checked){
				if (!mic_isInited){
					mic_setup();
					mic_isInited = true;
				}
				mic_connect();
				microphone_label.classList.add('checked');
			} else {
				mic_disconnect();
				microphone_label.classList.remove('checked');
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
			if (location.hostname == '' || isNativeApp()){
				if (localStorage.getItem('saiminHelpShowing')){
					localStorage.setItem('saiminReset', picType);
					location.reload();
				}else{
					fit();
				}
			} else {
				localStorage.setItem('saiminReset', picType);
				location.reload();
			}
		}, false);

		if (localStorage.getItem('AndroidMicrophoneOnReload')){
			localStorage.removeItem('AndroidMicrophoneOnReload');
			mic_connect();
			microphone_label.classList.add('checked');
		}

		function showButtons(enabled){
			if (enabled){
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
			if (!ready || e.ctrlKey)
				return;
			if ('0' <= e.key && e.key <= '9'){ // pic0...pic9
				setPicType(e.key);
				return;
			}
			if (e.key == 'c' || e.key == 'C'){ // Configuration
				config_button.click();
				return;
			}
			if (e.key == 'h' || e.key == 'H'){ // Help
				about_button.click();
				return;
			}
			if (e.key == 'a' || e.key == 'A'){ // Appearance
				e.preventDefault();
				type_select_button.click();
				return;
			}
			if (e.key == 'p' || e.key == 'P'){ // Play/Pause
				sound_button.click();
				return;
			}
			if (e.key == 'm' || e.key == 'M'){ // Microphone
				microphone.click();
				return;
			}
			if (e.key == 't' || e.key == 'T'){ // Text
				text_button.click();
				return;
			}
			if (e.key == 's' || e.key == 'S'){ // Speech
				speech_checkbox.click();
				return;
			}
			if (e.key == 'x' || e.key == 'X'){ // Pause
				stopping = !stopping;
				return;
			}
			if (e.key == '-' || e.key == 'k' || e.key == 'K'){ // Kill hypnosis
				setPicType(-1);
				return;
			}
			if (e.key == 'd' || e.key == 'D'){ // Division (screen split)
				if(division == 1){
					setDivision(2);
				}else if(division == 2){
					setDivision(1);
				}else{
					setDivision(1);
				}
				return;
			}
			if (e.key == 'g' || e.key == 'G'){ // Goggle Mode
				if (division == 1){
					setDivision(2);
				}else{
					setDivision(1);
				}
				showButtons(division == 1);
				return;
			}
			if (e.key == 'b' || e.key == 'B'){ // buttons
				showButtons(microphone_label.classList.contains('invisible'));
				return;
			}
			if (e.key == 'w' || e.key == 'W'){ // Speed Slow
				setSpeedType('slow');
				return;
			}
			if (e.key == 'n' || e.key == 'N'){ // Speed Normal
				setSpeedType('normal');
				return;
			}
			if (e.key == 'f' || e.key == 'F'){ // Speed Fast
				setSpeedType('fast');
				return;
			}
			if (e.key == 'i' || e.key == 'I'){ // Speed Irregular
				setSpeedType('irregular');
				return;
			}
			if (e.key == 'u' || e.key == 'U'){ // Debugging
				DEBUGGING = !DEBUGGING;
				return;
			}
			if (e.key == 'r' || e.key == 'R'){ // Reload
				localStorage.setItem('saiminReset', picType);
				location.reload();
				return;
			}
			// {{LANGUAGE_SPECIFIC}}
			if (e.key == 'e' || e.key == 'E'){ // English
				setLanguage('en');
				return;
			}
			if (e.key == 'z' || e.key == 'Z'){ // Chinese (Simplified)
				setLanguage('zh-CN');
				return;
			}
			if (e.key == 'j' || e.key == 'J'){ // Japanese
				setLanguage('ja');
				return;
			}
			//alert(e.key);
		});
	}

	init();
});
