// translation.js --- Hypnosis KraKra tranlation

let currentLanguage = 'en';

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
const NOTICE_KO_KR = `=========================
최면 크라크라
Hypnosis KraKra
=========================

이 소프트웨어는 최면 같은 영상을 즐기는 응용 프로그램입니다.
동영상 파일을 일절 사용하지 않고 실시간으로 최면 영상을 생성합니다.
사용법은 당신에게 달려 있습니다.

※ 소스 코드: https://github.com/katahiromz/KraKra_ja_jp
※ 일부, OtoLogic의 음성 소재를 사용.
※ 개조는 Apache 2.0 라이센스하에 자유롭게 할 수 있습니다.

【사용상의 주의】

- 본 소프트웨어는 농담 앱이며 동작은 무보증입니다.
- 간질 증상이 있는 분은 사용하지 마십시오.
- 귀하의 국가, 학교, 종교 및 지역이 최면을 금지하는 경우이 응용 프로그램을 사용하지 마십시오.
- 급성기 정신분열증 환자는 사용 금지입니다.
- 사용 직후에는 자동차 운전을 피하십시오.
- 집합체 공포증을 가진 사람은 사용하지 마십시오.
- 두통, 현기증, 과호흡, 메스꺼움, 위장 장애, 이상한 감정 등의 증상이 발생한 경우에는 신속하게 사용을 중지하고 전문의의 진단을 받으십시오.
- 운영자는 본 서비스의 계속이 곤란해지는 사유가 발생한 경우 언제든지 본 서비스를 종료할 수 있는 것으로 합니다.

【사용법】

- 기본적으로 화면을보고 즐길 수있는 응용 프로그램입니다.
- 화면을 탭/클릭하면 영상이 전환됩니다.
- "pic"버튼으로 영상을 설정할 수 있습니다.
- "마이크" 버튼으로 마이크를 사용할 수 있습니다 (권한이 필요합니다).
- 「♪」버튼으로 소리가 울립니다.
- "글자" 버튼으로 표시할 메시지를 설정할 수 있습니다.
- "후키다시"버튼으로 메시지를 자동 음성으로 말합니다.
- '기어' 버튼으로 일반 설정을 할 수 있습니다.
- 화면을 손가락으로 추적하면 반짝임이 표시되어 상대방의 주의를 끌 수 있습니다.

【키보드 조작】

키보드를 연결하면 다음과 같은 조작을 할 수 있습니다.

- "0"~"9" 키를 누르면 영상이 전환됩니다.
- "C" 키를 누르면 일반 설정이 열립니다.
- "H" 키를 누르면 버전 정보가 열립니다.
- "A" 키를 누르면 외형 설정을 엽니다.
- "P" 키를 누르면 소리가 납니다.
- 「M」키를 누르면 마이크의 ON/OFF를 전환합니다(권한이 필요합니다).
- "T" 키를 누르면 메시지 설정이 열립니다.
- "S" 키를 누르면 현재 메시지를 자동 음성으로 말합니다.
- “X” 키를 누르면 일시정지됩니다.
- "-" 키 또는 "K" 키를 누르면 최면을 끕니다.
- "D" 키를 누르면 화면 분할이 전환됩니다.
- "B" 키를 누르면 버튼 표시가 전환됩니다.
- "G" 키를 누르면 고글 모드가 전환됩니다.

【고글 모드】

연결 가능한 키보드와 고글이 있으면 고글 모드를 사용할 수 있습니다.
「G」키를 누르면 고글 모드의 ON/OFF의 전환이 가능합니다.
고글 모드는 화면을 2분할하고 조작 버튼을 숨깁니다.

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

// {{LANGUAGE_SPECIFIC}}
const NOTICE_IT = `=========================
Ipnosi KraKra
Hypnosis KraKra
=========================

Questo software è un'applicazione per godere di immagini in movimento ipnotiche.
Genera video di ipnosi in tempo reale senza utilizzare alcun file video.
Come lo usi dipende da te.

* Codice sorgente: https://github.com/katahiromz/KraKra_ja_jp
* Viene utilizzato del materiale audio OtoLogic.
* È possibile modificare questo software con la licenza Apache 2.0.

[(Precauzioni per l'uso)]

- Questo software è un'applicazione scherzosa e il suo funzionamento non è garantito.
- Non utilizzare questo software se si hanno sintomi di epilessia.
- Se il tuo paese, scuola, religione o regione vieta l'ipnosi, non utilizzare questa applicazione.
- I pazienti schizofrenici acuti non dovrebbero utilizzare questo software.
- Evita di guidare un'auto subito dopo aver utilizzato questo software.
- Le persone con tripofobia non dovrebbero usare questo software.
- Se si verificano sintomi come mal di testa, vertigini, iperpnea, nausea, problemi gastrointestinali o emozioni anormali, interrompere immediatamente l'uso e consultare uno specialista.
- L'Operatore può interrompere il Servizio in qualsiasi momento se si verifica un motivo che rende difficile continuare il Servizio.

[(Come usare)]

- Fondamentalmente, è un'applicazione per divertirsi guardando lo schermo.
- Tocca / fai clic sullo schermo per cambiare le immagini.
- Il pulsante 'pic' consente di configurare le impostazioni video.
- Tocca il pulsante "microfono" per utilizzare il microfono (è necessaria l'autorizzazione).
- Toccando il pulsante '♪' si emette un suono.
- Il pulsante 'Aa' consente di impostare il messaggio da visualizzare.
- Il pulsante "bolla" pronuncerà il messaggio.
- Il pulsante "ingranaggio" aprirà Configurazione.
- Quando fai scorrere il dito sullo schermo, lo schermo si illumina per attirare la loro attenzione.

[(Funzionamento della tastiera)]

Quando è collegata una tastiera, sono disponibili le seguenti operazioni:

- Premere i tasti da [0] a [9] per cambiare immagine.
- Premere il tasto [C] per aprire la configurazione.
- Premere il tasto [H] per aprire le informazioni sulla versione.
- Premere il tasto [A] per aprire le impostazioni dell'aspetto.
- Premere il tasto [P] per riprodurre il suono.
- Premere il tasto [M] per accendere/spegnere il microfono (è necessario il permesso).
- Premere il tasto [T] per aprire le impostazioni del messaggio.
- Premere il tasto [S] per pronunciare automaticamente il messaggio corrente.
- Premere il tasto [X] per mettere in pausa.
- Premi i tasti [-] o [K] per eliminare l'ipnosi.
- Premere il tasto [D] per dividere lo schermo.
- Premere il tasto [B] per alternare la visualizzazione dei pulsanti.
- Premere il tasto [G] per attivare/disattivare la modalità Goggle.

[(Modalità occhiali)]

La modalità Goggle è disponibile con tastiera e occhiali collegabili.
La modalità Goggle può essere attivata e disattivata premendo il tasto [G].
La modalità Goggle divide lo schermo in due e nasconde i pulsanti di controllo.

Copyright (c) 2022-2023 Katayama Hirofumi MZ
Copyright (c) 2018 Robert Eisele
Copyright (c) 2007-2022 Akshay Nair
Copyright 2022 OpenJS Foundation and jQuery contributors.`;

// {{LANGUAGE_SPECIFIC}}
const NOTICE_DE = `=========================
Hypnose KraKra
Hypnosis KraKra
=========================

Diese Software ist eine Anwendung zum Genießen hypnotischer bewegter Bilder.
Es generiert Hypnosevideos in Echtzeit, ohne dass Videodateien verwendet werden müssen.
Wie Sie es nutzen, bleibt Ihnen überlassen.

* Quellcode: https://github.com/katahiromz/KraKra_ja_jp
* Es wird teilweise Audiomaterial von OtoLogic verwendet.
* Sie können diese Software unter der Apache 2.0-Lizenz ändern.

[(Vorsichtsmaßnahmen für den Gebrauch)]

- Bei dieser Software handelt es sich um eine Scherzanwendung, für deren Funktionsfähigkeit keine Garantie übernommen wird.
- Verwenden Sie diese Software nicht, wenn Sie Epilepsiesymptome haben.
- Wenn Ihr Land, Ihre Schule, Religion oder Region Hypnose verbietet, verwenden Sie diese Anwendung nicht.
- Patienten mit akuter Schizophrenie sollten diese Software nicht verwenden.
- Vermeiden Sie es, unmittelbar nach der Verwendung dieser Software Auto zu fahren.
- Personen mit Trypophobie sollten diese Software nicht verwenden.
- Wenn bei Ihnen Symptome wie Kopfschmerzen, Schwindel, Hyperpnoe, Übelkeit, Magen-Darm-Probleme oder abnormale Emotionen auftreten, brechen Sie die Anwendung sofort ab und konsultieren Sie einen Spezialisten.
- Der Betreiber kann den Dienst jederzeit beenden, wenn ein Grund vorliegt, der die Fortsetzung des Dienstes erschwert.

[(Wie benutzt man)]

- Im Grunde handelt es sich um eine Anwendung, mit der man gerne auf den Bildschirm schaut.
- Tippen/klicken Sie auf den Bildschirm, um die Bilder zu wechseln.
- Mit der Schaltfläche „pic“ können Sie die Videoeinstellungen festlegen.
- Tippen Sie auf die Schaltfläche „Mikrofon“, um das Mikrofon zu verwenden (es erfordert eine Genehmigung).
- Durch Tippen auf die Schaltfläche „♪“ ertönt ein Ton.
- Mit der Schaltfläche „Aa“ können Sie die anzuzeigende Meldung festlegen.
- Mit der „Sprechblase“-Taste wird die Nachricht vorgelesen.
- Die Schaltfläche „Zahnrad“ öffnet die Konfiguration.
- Wenn Sie mit dem Finger über den Bildschirm fahren, erzeugt der Bildschirm Funken, um ihre Aufmerksamkeit zu erregen.

[(Tastaturbedienung)]

Wenn eine Tastatur angeschlossen ist, stehen folgende Vorgänge zur Verfügung:

- Drücken Sie die Tasten [0] bis [9], um zwischen den Bildern zu wechseln.
- Drücken Sie die Taste [C], um die Konfiguration zu öffnen.
- Drücken Sie die Taste [H], um die Versionsinformationen zu öffnen.
- Drücken Sie die Taste [A], um die Darstellungseinstellungen zu öffnen.
- Drücken Sie die Taste [P], um den Ton abzuspielen.
- Drücken Sie die Taste [M], um das Mikrofon ein-/auszuschalten (es erfordert eine Genehmigung).
- Drücken Sie die Taste [T], um die Nachrichteneinstellungen zu öffnen.
- Drücken Sie die Taste [S], um die aktuelle Nachricht automatisch vorzulesen.
- Drücken Sie die Taste [X], um zu pausieren.
- Drücken Sie die Tasten [-] oder [K], um die Hypnose zu beenden.
- Drücken Sie die Taste [D], um den Bildschirm zu teilen.
- Drücken Sie die Taste [B], um die Anzeige der Schaltflächen umzuschalten.
- Drücken Sie die Taste [G], um den Brillenmodus ein-/auszuschalten.

[(Brillenmodus)]

Der Goggle-Modus ist mit einer anschließbaren Tastatur und einer Schutzbrille verfügbar.
Der Brillenmodus kann durch Drücken der Taste [G] ein- und ausgeschaltet werden.
Der Goggle-Modus teilt den Bildschirm in zwei Teile und verbirgt die Steuertasten.

Copyright (c) 2022-2023 Katayama Hirofumi MZ
Copyright (c) 2018 Robert Eisele
Copyright (c) 2007-2022 Akshay Nair
Copyright 2022 OpenJS Foundation and jQuery contributors.`;

// {{LANGUAGE_SPECIFIC}}
function getStr(str_id){
	let lang = localStorage.getItem('saiminLanguage3');
	if(!lang)
		lang = 'en';
	if(lang == 'ja' || lang == 'jp'){ // Japanese
		switch(str_id){
		case 'TEXT_PIC': return '画';
		case 'TEXT_OK': return 'OK';
		case 'TEXT_CANCEL': return 'キャンセル';
		case 'TEXT_YES': return 'はい';
		case 'TEXT_NO': return 'いいえ';
		case 'TEXT_CHOOSE_LANGUAGE': return '言語選択 (Choose a language)';
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
		case 'TEXT_NO_BLINKING': return '点滅なし';
		case 'TEXT_LOGO': return 'images/logo_ja.svg';
		case 'TEXT_TAP_HERE': return 'images/please-tap-here_ja.svg';
		}
	}else if(lang == 'zh-CN' || lang == 'cn'){ // Chinese (Simplified)
		switch(str_id){
		case 'TEXT_PIC': return '图';
		case 'TEXT_OK': return '確定';
		case 'TEXT_CANCEL': return '取消';
		case 'TEXT_YES': return '是';
		case 'TEXT_NO': return '否';
		case 'TEXT_CHOOSE_LANGUAGE': return '语言选择 (Choose a language)';
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
		case 'TEXT_NO_BLINKING': return '无闪光灯';
		case 'TEXT_LOGO': return 'images/logo_zh-CN.svg';
		case 'TEXT_TAP_HERE': return 'images/please-tap-here_zh-CN.svg';
		}
	}else if(lang == 'zh-TW'){ // Chinese (Traditional)
		switch(str_id){
		case 'TEXT_PIC': return '圖';
		case 'TEXT_OK': return '確定';
		case 'TEXT_CANCEL': return '取消';
		case 'TEXT_YES': return '是';
		case 'TEXT_NO': return '否';
		case 'TEXT_CHOOSE_LANGUAGE': return '語言選擇 (Choose a language)';
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
		case 'TEXT_KILLING_HYPNOSIS_IMG': return 'images/killing-hypnosis_zh-TW.svg';
		case 'TEXT_HYPNOSIS_RELEASED_IMG': return 'images/hypnosis-released_zh-TW.svg';
		case 'TEXT_ALL_RELEASED_IMG': return 'images/all-released_zh-TW.svg';
		case 'TEXT_NO_BLINKING': return '無閃光燈';
		case 'TEXT_LOGO': return 'images/logo_zh-TW.svg';
		case 'TEXT_TAP_HERE': return 'images/please-tap-here_zh-TW.svg';
		}
	}else if(lang == 'ko' || lang == 'kr' || lang == 'ko-KR'){ // Korean
		switch(str_id){
		case 'TEXT_PIC': return 'pic';
		case 'TEXT_OK': return 'OK';
		case 'TEXT_CANCEL': return '취소';
		case 'TEXT_YES': return '예';
		case 'TEXT_NO': return '아니오';
		case 'TEXT_CHOOSE_LANGUAGE': return '언어 선택 (Choose a language)';
		case 'TEXT_ABOUT_APP': return '버전 정보';
		case 'TEXT_INIT_APP': return '앱 초기화';
		case 'TEXT_INITTED_APP': return '앱을 초기화했습니다.';
		case 'TEXT_CONFIGURATION': return '구성';
		case 'TEXT_APPEARANCE': return '모습';
		case 'TEXT_INPUT_MESSAGE': return '메시지 문자열을 입력하십시오.';
		case 'TEXT_FULLWIDTH_SPACE': return '　';
		case 'TEXT_PERIOD': return '. ';
		case 'TEXT_PERIOD_SPACE': return '. ';
		case 'TEXT_RELEASE_HYPNOSIS': return '최면 해제';
		case 'TEXT_HYPNOSIS_RELEASED': return '최면 해제.';
		case 'TEXT_KILLING_HYPNOSIS_IMG': return 'images/killing-hypnosis_ko-KR.svg';
		case 'TEXT_HYPNOSIS_RELEASED_IMG': return 'images/hypnosis-released_ko-KR.svg';
		case 'TEXT_ALL_RELEASED_IMG': return 'images/all-released_ko-KR.svg';
		case 'TEXT_NO_BLINKING': return '깜박임 없음';
		case 'TEXT_LOGO': return 'images/logo_ko-KR.svg';
		case 'TEXT_TAP_HERE': return 'images/please-tap-here_ko-KR.svg';
		}
	}else if(lang == 'it' || lang == 'it-IT'){ // Italian
		switch(str_id){
		case 'TEXT_PIC': return 'pic';
		case 'TEXT_OK': return 'OK';
		case 'TEXT_CANCEL': return 'Annulla';
		case 'TEXT_YES': return 'SÌ';
		case 'TEXT_NO': return 'No';
		case 'TEXT_CHOOSE_LANGUAGE': return 'Scegli una lingua (Choose a language)';
		case 'TEXT_ABOUT_APP': return 'Informazioni su questa app';
		case 'TEXT_INIT_APP': return 'Inizializza l\'app';
		case 'TEXT_INITTED_APP': return 'Inizializzata l\'app.';
		case 'TEXT_CONFIGURATION': return 'Configurazione';
		case 'TEXT_APPEARANCE': return 'Aspetto';
		case 'TEXT_INPUT_MESSAGE': return 'Inserisci il testo del messaggio.';
		case 'TEXT_FULLWIDTH_SPACE': return '　';
		case 'TEXT_PERIOD': return '.';
		case 'TEXT_PERIOD_SPACE': return '. ';
		case 'TEXT_RELEASE_HYPNOSIS': return 'Uccidi l\'ipnosi';
		case 'TEXT_HYPNOSIS_RELEASED': return 'Ipnosi liberata.';
		case 'TEXT_KILLING_HYPNOSIS_IMG': return 'images/killing-hypnosis_it.svg';
		case 'TEXT_HYPNOSIS_RELEASED_IMG': return 'images/hypnosis-released_it.svg';
		case 'TEXT_ALL_RELEASED_IMG': return 'images/all-released_it.svg';
		case 'TEXT_NO_BLINKING': return 'Senza il flash';
		case 'TEXT_LOGO': return 'images/logo_it.svg';
		case 'TEXT_TAP_HERE': return 'images/please-tap-here_it.svg';
		}
	}else if(lang == 'de' || lang == 'de-DE'){ // German
		switch(str_id){
		case 'TEXT_PIC': return 'pic';
		case 'TEXT_OK': return 'OK';
		case 'TEXT_CANCEL': return 'Abbrechen';
		case 'TEXT_YES': return 'Ja';
		case 'TEXT_NO': return 'Nein';
		case 'TEXT_CHOOSE_LANGUAGE': return 'Wähle eine Sprache (Choose a language)';
		case 'TEXT_ABOUT_APP': return 'Über diese App';
		case 'TEXT_INIT_APP': return 'App initialisieren';
		case 'TEXT_INITTED_APP': return 'Initialisierte die App.';
		case 'TEXT_CONFIGURATION': return 'Aufbau';
		case 'TEXT_APPEARANCE': return 'Aussehen';
		case 'TEXT_INPUT_MESSAGE': return 'Bitte geben Sie einen Nachrichtentext ein.';
		case 'TEXT_FULLWIDTH_SPACE': return '　';
		case 'TEXT_PERIOD': return '.';
		case 'TEXT_PERIOD_SPACE': return '. ';
		case 'TEXT_RELEASE_HYPNOSIS': return 'Töte Hypnose';
		case 'TEXT_HYPNOSIS_RELEASED': return 'Hypnose freigegeben.';
		case 'TEXT_KILLING_HYPNOSIS_IMG': return 'images/killing-hypnosis_de.svg';
		case 'TEXT_HYPNOSIS_RELEASED_IMG': return 'images/hypnosis-released_de.svg';
		case 'TEXT_ALL_RELEASED_IMG': return 'images/all-released_de.svg';
		case 'TEXT_NO_BLINKING': return 'Kein Blitz';
		case 'TEXT_LOGO': return 'images/logo_de.svg';
		case 'TEXT_TAP_HERE': return 'images/please-tap-here_de.svg';
		}
	}else{ // English is default
		switch(str_id){
		case 'TEXT_PIC': return 'pic';
		case 'TEXT_OK': return 'OK';
		case 'TEXT_CANCEL': return 'Cancel';
		case 'TEXT_YES': return 'Yes';
		case 'TEXT_NO': return 'No';
		case 'TEXT_CHOOSE_LANGUAGE': return 'Choose a language (言語選択)';
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
		case 'TEXT_NO_BLINKING': return 'No blinking';
		case 'TEXT_LOGO': return 'images/logo_en.svg';
		case 'TEXT_TAP_HERE': return 'images/please-tap-here_en.svg';
		}
	}
}

// {{LANGUAGE_SPECIFIC}}
function localizeSaimin(lang){
	localStorage.setItem('saiminLanguage3', lang);
	currentLanguage = lang;
	if(lang == 'ja' || lang == 'jp'){ // Japanese
		$('#notice_text').text(NOTICE_JA);
		$('#mic_img').attr('src', 'images/mic.png');
		$('#type_select_button').text(getStr('TEXT_PIC') + type_select.value);
		$('#sound_img').attr('src', 'images/sound.png');
		$('#char_img').attr('src', 'images/text_ja.png');
		$('#speech_img').attr('src', 'images/speak.png');
		$('#gear_img').attr('src', 'images/gear.png');
		$('#question_img').attr('src', 'images/question.png');
		$('#config_language').text('言語 (Language):');
		$('#language_select option[value="zh-CN"]').text('Chinese (Simplified) (简体中文)');
		$('#language_select option[value="zh-TW"]').text('Chinese (Traditional) (繁體中文)');
		$('#language_select option[value="en"]').text('English (英語)');
		$('#language_select option[value="de"]').text('German (Deutsch)');
		$('#language_select option[value="it"]').text('Italian (Italiano)');
		$('#language_select option[value="ja"]').text('Japanese (日本語)');
		$('#language_select option[value="ko-KR"]').text('Korean (한국어)');
		$('#language_select2 option[value="zh-CN"]').text('Chinese (Simplified) (简体中文)');
		$('#language_select2 option[value="zh-TW"]').text('Chinese (Traditional) (繁體中文)');
		$('#language_select2 option[value="en"]').text('English (英語)');
		$('#language_select2 option[value="de"]').text('German (Deutsch)');
		$('#language_select2 option[value="it"]').text('Italian (Italiano)');
		$('#language_select2 option[value="ja"]').text('Japanese (日本語)');
		$('#language_select2 option[value="ko-KR"]').text('Korean (한국어)');
		$('#appearance_type').text('映像の種類:');
		$('#type_select option[value="-1"]').text('画-1: 催眠解除');
		$('#type_select option[value="0"]').text('画0: 初期画面');
		$('#type_select option[value="1"]').text('画1: ピンク色の渦巻き');
		$('#type_select option[value="2"]').text('画2: 同心円状');
		$('#type_select option[value="3"]').text('画3: 目が回る');
		$('#type_select option[value="4"]').text('画4: 白黒の渦巻き');
		$('#type_select option[value="5"]').text('画5: 広がるハート');
		$('#type_select option[value="6"]').text('画6: 五円玉');
		$('#type_select option[value="7"]').text('画7: ぼわんぼわん');
		$('#type_select option[value="8"]').text('画8: クレージーな色');
		$('#type_select option[value="9"]').text('画9: ミックス渦巻き');
		$('#appearance_division').text('画面分割:');
		$('#appearance_speed').text('スピード:');
		$('#speed_irregular_label').text('不規則');
		$('#appearance_rotation').text('逆回転:');
		$('#appearance_blinking').text('点滅:');
		$('#config_size').text('メッセージの大きさ:');
		$('#config_note').text('音符ボタン:');
		$('#sound_select option[value=""]').text('(なし)');
		$('#sound_select option[value="Cattish"]').text('ネコっぽい');
		$('#sound_select option[value="Drill"]').text('ドリル');
		$('#sound_select option[value="Exciting"]').text('興奮');
		$('#sound_select option[value="Horror"]').text('恐怖');
		$('#sound_select option[value="Hunting"]').text('狩人');
		$('#sound_select option[value="Lonely"]').text('さびしさ');
		$('#sound_select option[value="Longing"]').text('あこがれ');
		$('#sound_select option[value="Lovely"]').text('愛らしい');
		$('#sound_select option[value="Magic"]').text('魔術');
		$('#sound_select option[value="OraSaimin"]').text('おら! 催眠!');
		$('#config_switch_sound').text('切り替え音:');
		$('#config_brightness').text('画面の明るさ:');
		$('#screen_brightness option[value="normal"]').text('普通');
		$('#screen_brightness option[value="brighter"]').text('明るくする');
		$('#version_text').text('催眠くらくら Version ' + VERSION);
	}else if(lang == 'zh-CN' || lang == 'cn'){ // Chinese (Simplified)
		$('#notice_text').text(NOTICE_ZW_CN);
		$('#mic_img').attr('src', 'images/mic.png');
		$('#type_select_button').text(getStr('TEXT_PIC') + type_select.value);
		$('#sound_img').attr('src', 'images/sound.png');
		$('#char_img').attr('src', 'images/text_zh-CN.png');
		$('#speech_img').attr('src', 'images/speak.png');
		$('#gear_img').attr('src', 'images/gear.png');
		$('#question_img').attr('src', 'images/question.png');
		$('#config_language').text('语言 (Language):');
		$('#language_select option[value="zh-CN"]').text('Chinese (Simplified) (简体中文)');
		$('#language_select option[value="zh-TW"]').text('Chinese (Traditional) (繁體中文)');
		$('#language_select option[value="en"]').text('English (英语)');
		$('#language_select option[value="de"]').text('German (Deutsch)');
		$('#language_select option[value="it"]').text('Italian (Italiano)');
		$('#language_select option[value="ja"]').text('Japanese (日本語)');
		$('#language_select option[value="ko-KR"]').text('Korean (한국어)');
		$('#language_select2 option[value="zh-CN"]').text('Chinese (Simplified) (简体中文)');
		$('#language_select2 option[value="zh-TW"]').text('Chinese (Traditional) (繁體中文)');
		$('#language_select2 option[value="en"]').text('English (英语)');
		$('#language_select2 option[value="de"]').text('German (Deutsch)');
		$('#language_select2 option[value="it"]').text('Italian (Italiano)');
		$('#language_select2 option[value="ja"]').text('Japanese (日本語)');
		$('#language_select2 option[value="ko-KR"]').text('Korean (한국어)');
		$('#appearance_type').text('视频类型：');
		$('#type_select option[value="-1"]').text('图-1: 释放催眠');
		$('#type_select option[value="0"]').text('图0: 初始屏幕');
		$('#type_select option[value="1"]').text('图1: 粉红色漩涡');
		$('#type_select option[value="2"]').text('图2: 同心圆');
		$('#type_select option[value="3"]').text('图3: 旋转的眼');
		$('#type_select option[value="4"]').text('图4: 黑色和白色的漩涡');
		$('#type_select option[value="5"]').text('图5: 扩展的心');
		$('#type_select option[value="6"]').text('图6: 5日元硬币');
		$('#type_select option[value="7"]').text('图7: 头晕 头晕');
		$('#type_select option[value="8"]').text('图8: 疯狂的颜色');
		$('#type_select option[value="9"]').text('图9: 混合漩涡');
		$('#appearance_division').text('分屏：');
		$('#appearance_speed').text('速度：');
		$('#speed_irregular_label').text('不规律的');
		$('#appearance_rotation').text('反向旋转：');
		$('#appearance_blinking').text('闪烁：');
		$('#config_size').text('消息大小：');
		$('#config_note').text('声音按钮：');
		$('#sound_select option[value=""]').text('(无)');
		$('#sound_select option[value="Cattish"]').text('像猫一样');
		$('#sound_select option[value="Drill"]').text('钻头');
		$('#sound_select option[value="Exciting"]').text('激发');
		$('#sound_select option[value="Horror"]').text('害怕');
		$('#sound_select option[value="Hunting"]').text('猎人');
		$('#sound_select option[value="Lonely"]').text('孤独');
		$('#sound_select option[value="Longing"]').text('渴望');
		$('#sound_select option[value="Lovely"]').text('可爱的');
		$('#sound_select option[value="Magic"]').text('巫术');
		$('#sound_select option[value="OraSaimin"]').text('天啊！ 催眠！');
		$('#config_switch_sound').text('开关声音：');
		$('#config_brightness').text('屏幕亮度：');
		$('#screen_brightness option[value="normal"]').text('通常');
		$('#screen_brightness option[value="brighter"]').text('明亮');
		$('#version_text').text('催眠克拉克拉 Version ' + VERSION);
	}else if(lang == 'zh-TW'){ // Chinese (Traditional)
		$('#notice_text').text(NOTICE_TW_CN);
		$('#mic_img').attr('src', 'images/mic.png');
		$('#type_select_button').text(getStr('TEXT_PIC') + type_select.value);
		$('#sound_img').attr('src', 'images/sound.png');
		$('#char_img').attr('src', 'images/text_zh-TW.png');
		$('#speech_img').attr('src', 'images/speak.png');
		$('#gear_img').attr('src', 'images/gear.png');
		$('#question_img').attr('src', 'images/question.png');
		$('#config_language').text('語言 (Language):');
		$('#language_select option[value="zh-CN"]').text('Chinese (Simplified) (简体中文)');
		$('#language_select option[value="zh-TW"]').text('Chinese (Traditional) (繁體中文)');
		$('#language_select option[value="en"]').text('English (英語)');
		$('#language_select option[value="de"]').text('German (Deutsch)');
		$('#language_select option[value="it"]').text('Italian (Italiano)');
		$('#language_select option[value="ja"]').text('Japanese (日本語)');
		$('#language_select option[value="ko-KR"]').text('Korean (한국어)');
		$('#language_select2 option[value="zh-CN"]').text('Chinese (Simplified) (简体中文)');
		$('#language_select2 option[value="zh-TW"]').text('Chinese (Traditional) (繁體中文)');
		$('#language_select2 option[value="en"]').text('English (英語)');
		$('#language_select2 option[value="de"]').text('German (Deutsch)');
		$('#language_select2 option[value="it"]').text('Italian (Italiano)');
		$('#language_select2 option[value="ja"]').text('Japanese (日本語)');
		$('#language_select2 option[value="ko-KR"]').text('Korean (한국어)');
		$('#appearance_type').text('視頻類型：');
		$('#type_select option[value="-1"]').text('圖-1: 催眠釋放');
		$('#type_select option[value="0"]').text('圖0: 初始屏幕');
		$('#type_select option[value="1"]').text('圖1: 粉紅色漩渦');
		$('#type_select option[value="2"]').text('圖2: 同心圆');
		$('#type_select option[value="3"]').text('圖3: 旋轉的眼');
		$('#type_select option[value="4"]').text('圖4: 黑色和白色漩渦');
		$('#type_select option[value="5"]').text('圖5: 擴展的心');
		$('#type_select option[value="6"]').text('圖6: 5日元硬幣');
		$('#type_select option[value="7"]').text('圖7: 頭暈 頭暈');
		$('#type_select option[value="8"]').text('圖8: 瘋狂的顏色');
		$('#type_select option[value="9"]').text('圖9: 混合漩渦');
		$('#appearance_division').text('分屏：');
		$('#appearance_speed').text('速度：');
		$('#speed_irregular_label').text('不規律的');
		$('#appearance_rotation').text('反向旋轉：');
		$('#appearance_blinking').text('閃爍：');
		$('#config_size').text('消息大小：');
		$('#config_note').text('聲音按鈕：');
		$('#sound_select option[value=""]').text('(無)');
		$('#sound_select option[value="Cattish"]').text('像貓一樣');
		$('#sound_select option[value="Drill"]').text('鑽頭');
		$('#sound_select option[value="Exciting"]').text('激發');
		$('#sound_select option[value="Horror"]').text('害怕');
		$('#sound_select option[value="Hunting"]').text('獵人');
		$('#sound_select option[value="Lonely"]').text('孤獨');
		$('#sound_select option[value="Longing"]').text('渴望');
		$('#sound_select option[value="Lovely"]').text('可愛的');
		$('#sound_select option[value="Magic"]').text('巫術');
		$('#sound_select option[value="OraSaimin"]').text('天啊！ 催眠！');
		$('#config_switch_sound').text('開關聲音：');
		$('#config_brightness').text('屏幕亮度：');
		$('#screen_brightness option[value="normal"]').text('正常亮度');
		$('#screen_brightness option[value="brighter"]').text('提亮');
		$('#version_text').text('催眠克拉克拉 Version ' + VERSION);
	}else if(lang == 'kr' || lang == 'ko' || lang == 'ko-KR'){ // Korean
		$('#notice_text').text(NOTICE_KO_KR);
		$('#mic_img').attr('src', 'images/mic.png');
		$('#type_select_button').text(getStr('TEXT_PIC') + type_select.value);
		$('#sound_img').attr('src', 'images/sound.png');
		$('#char_img').attr('src', 'images/text_ko-KR.png');
		$('#speech_img').attr('src', 'images/speak.png');
		$('#gear_img').attr('src', 'images/gear.png');
		$('#question_img').attr('src', 'images/question.png');
		$('#config_language').text('언어 (Language):');
		$('#language_select option[value="zh-CN"]').text('Chinese (Simplified) (简体中文)');
		$('#language_select option[value="zh-TW"]').text('Chinese (Traditional) (繁體中文)');
		$('#language_select option[value="en"]').text('English (영어)');
		$('#language_select option[value="de"]').text('German (Deutsch)');
		$('#language_select option[value="it"]').text('Italian (Italiano)');
		$('#language_select option[value="ja"]').text('Japanese (日本語)');
		$('#language_select option[value="ko-KR"]').text('Korean (한국어)');
		$('#language_select2 option[value="zh-CN"]').text('Chinese (Simplified) (简体中文)');
		$('#language_select2 option[value="zh-TW"]').text('Chinese (Traditional) (繁體中文)');
		$('#language_select2 option[value="en"]').text('English (영어)');
		$('#language_select2 option[value="de"]').text('German (Deutsch)');
		$('#language_select2 option[value="it"]').text('Italian (Italiano)');
		$('#language_select2 option[value="ja"]').text('Japanese (日本語)');
		$('#language_select2 option[value="ko-KR"]').text('Korean (한국어)');
		$('#appearance_type').text('그림 유형:');
		$('#type_select option[value="-1"]').text('pic-1: 최면 해제');
		$('#type_select option[value="0"]').text('pic0: 초기 화면');
		$('#type_select option[value="1"]').text('pic1: 핑크색 소용돌이');
		$('#type_select option[value="2"]').text('pic2: 동심원형');
		$('#type_select option[value="3"]').text('pic3: 회전하는 눈');
		$('#type_select option[value="4"]').text('pic4: 흑백 소용돌이');
		$('#type_select option[value="5"]').text('pic5: 퍼지는 하트들');
		$('#type_select option[value="6"]').text('pic6: 오엔 구슬');
		$('#type_select option[value="7"]').text('pic7: 보완 보완');
		$('#type_select option[value="8"]').text('pic8: 미친 색');
		$('#type_select option[value="9"]').text('pic9: 믹스 소용돌이');
		$('#appearance_division').text('화면 분할:');
		$('#appearance_speed').text('속도:');
		$('#speed_irregular_label').text('불규칙');
		$('#appearance_rotation').text('역회전:');
		$('#appearance_blinking').text('깜박임:');
		$('#config_size').text('메시지 크기:');
		$('#config_note').text('사운드 버튼:');
		$('#sound_select option[value=""]').text('(없음)');
		$('#sound_select option[value="Cattish"]').text('고양이 같은');
		$('#sound_select option[value="Drill"]').text('드릴');
		$('#sound_select option[value="Exciting"]').text('일으키다');
		$('#sound_select option[value="Horror"]').text('공포');
		$('#sound_select option[value="Hunting"]').text('사냥꾼');
		$('#sound_select option[value="Lonely"]').text('녹슬다');
		$('#sound_select option[value="Longing"]').text('동경');
		$('#sound_select option[value="Lovely"]').text('사랑스러운');
		$('#sound_select option[value="Magic"]').text('마술');
		$('#sound_select option[value="OraSaimin"]').text('오! 최면!');
		$('#config_switch_sound').text('전환 사운드:');
		$('#config_brightness').text('화면 밝기:');
		$('#screen_brightness option[value="normal"]').text('일반 밝기');
		$('#screen_brightness option[value="brighter"]').text('밝게 하다');
		$('#version_text').text('최면 크라크라 Version ' + VERSION);
	}else if(lang == 'it' || lang == 'it-IT'){ // Italian
		$('#notice_text').text(NOTICE_IT);
		$('#mic_img').attr('src', 'images/mic.png');
		$('#type_select_button').text(getStr('TEXT_PIC') + type_select.value);
		$('#sound_img').attr('src', 'images/sound.png');
		$('#char_img').attr('src', 'images/text_it.png');
		$('#speech_img').attr('src', 'images/speak.png');
		$('#gear_img').attr('src', 'images/gear.png');
		$('#question_img').attr('src', 'images/question.png');
		$('#config_language').text('Lingua (Language):');
		$('#language_select option[value="zh-CN"]').text('Chinese (Simplified) (简体中文)');
		$('#language_select option[value="zh-TW"]').text('Chinese (Traditional) (繁體中文)');
		$('#language_select option[value="en"]').text('English (Inglese)');
		$('#language_select option[value="de"]').text('German (Deutsch)');
		$('#language_select option[value="it"]').text('Italian (Italiano)');
		$('#language_select option[value="ja"]').text('Japanese (日本語)');
		$('#language_select option[value="ko-KR"]').text('Korean (한국어)');
		$('#language_select2 option[value="zh-CN"]').text('Chinese (Simplified) (简体中文)');
		$('#language_select2 option[value="zh-TW"]').text('Chinese (Traditional) (繁體中文)');
		$('#language_select2 option[value="en"]').text('English (Inglese)');
		$('#language_select2 option[value="de"]').text('German (Deutsch)');
		$('#language_select2 option[value="it"]').text('Italian (Italiano)');
		$('#language_select2 option[value="ja"]').text('Japanese (日本語)');
		$('#language_select2 option[value="ko-KR"]').text('Korean (한국어)');
		$('#appearance_type').text('Il tipo di immagine:');
		$('#type_select option[value="-1"]').text('pic-1: Liberare l\'ipnosi');
		$('#type_select option[value="0"]').text('pic0: Schermata iniziale');
		$('#type_select option[value="1"]').text('pic1: Spirale Rosa');
		$('#type_select option[value="2"]').text('pic2: Cerchi concentrici');
		$('#type_select option[value="3"]').text('pic3: Gli occhi');
		$('#type_select option[value="4"]').text('pic4: Spirale in bianco e nero');
		$('#type_select option[value="5"]').text('pic5: Cuori che si diffondono');
		$('#type_select option[value="6"]').text('pic6: Moneta da 5 Yen');
		$('#type_select option[value="7"]').text('pic7: Clamore Clamore');
		$('#type_select option[value="8"]').text('pic8: Colori pazzi');
		$('#type_select option[value="9"]').text('pic9: Spirali miste');
		$('#appearance_division').text('Divisione dello schermo:');
		$('#appearance_speed').text('Velocità:');
		$('#speed_irregular_label').text('Irregolare');
		$('#appearance_rotation').text('Controrotazione:');
		$('#appearance_blinking').text('Lampeggiante:');
		$('#config_size').text('Dimensione del messaggio:');
		$('#config_note').text('Pulsante audio:');
		$('#sound_select option[value=""]').text('(Nessuno)');
		$('#sound_select option[value="Cattish"]').text('Simile a un gatto');
		$('#sound_select option[value="Drill"]').text('Trapano');
		$('#sound_select option[value="Exciting"]').text('Eccitare');
		$('#sound_select option[value="Horror"]').text('Paura');
		$('#sound_select option[value="Hunting"]').text('A caccia');
		$('#sound_select option[value="Lonely"]').text('Solitudine');
		$('#sound_select option[value="Longing"]').text('Desiderio');
		$('#sound_select option[value="Lovely"]').text('Adorabile');
		$('#sound_select option[value="Magic"]').text('Stregoneria');
		$('#sound_select option[value="OraSaimin"]').text('Ora! Saimin!');
		$('#config_switch_sound').text('Suono cambio foto:');
		$('#config_brightness').text('Luminosità:');
		$('#screen_brightness option[value="normal"]').text('Normale');
		$('#screen_brightness option[value="brighter"]').text('Più luminoso');
		$('#version_text').text('Ipnosi KraKra Version ' + VERSION);
	}else if(lang == 'de' || lang == 'de-DE'){ // German
		$('#notice_text').text(NOTICE_DE);
		$('#mic_img').attr('src', 'images/mic.png');
		$('#type_select_button').text(getStr('TEXT_PIC') + type_select.value);
		$('#sound_img').attr('src', 'images/sound.png');
		$('#char_img').attr('src', 'images/text_de.png');
		$('#speech_img').attr('src', 'images/speak.png');
		$('#gear_img').attr('src', 'images/gear.png');
		$('#question_img').attr('src', 'images/question.png');
		$('#config_language').text('Sprache (Language):');
		$('#language_select option[value="zh-CN"]').text('Chinese (Simplified) (简体中文)');
		$('#language_select option[value="zh-TW"]').text('Chinese (Traditional) (繁體中文)');
		$('#language_select option[value="en"]').text('English (Englisch)');
		$('#language_select option[value="de"]').text('German (Deutsch)');
		$('#language_select option[value="it"]').text('Italian (Italiano)');
		$('#language_select option[value="ja"]').text('Japanese (日本語)');
		$('#language_select option[value="ko-KR"]').text('Korean (한국어)');
		$('#language_select2 option[value="zh-CN"]').text('Chinese (Simplified) (简体中文)');
		$('#language_select2 option[value="zh-TW"]').text('Chinese (Traditional) (繁體中文)');
		$('#language_select2 option[value="en"]').text('English (Englisch)');
		$('#language_select2 option[value="de"]').text('German (Deutsch)');
		$('#language_select2 option[value="it"]').text('Italian (Italiano)');
		$('#language_select2 option[value="ja"]').text('Japanese (日本語)');
		$('#language_select2 option[value="ko-KR"]').text('Korean (한국어)');
		$('#appearance_type').text('Die Art des Bildes:');
		$('#type_select option[value="-1"]').text('pic-1: Hypnose loslassen');
		$('#type_select option[value="0"]').text('pic0: Einstiegsbild');
		$('#type_select option[value="1"]').text('pic1: Rosa Spirale');
		$('#type_select option[value="2"]').text('pic2: Konzentrische Kreise');
		$('#type_select option[value="3"]').text('pic3: Die Augen');
		$('#type_select option[value="4"]').text('pic4: Schwarz-Weiß-Spirale');
		$('#type_select option[value="5"]').text('pic5: Herzen verbreiten');
		$('#type_select option[value="6"]').text('pic6: 5-Yen-Münze');
		$('#type_select option[value="7"]').text('pic7: Lärm, Lärm');
		$('#type_select option[value="8"]').text('pic8: Verrückte Farben');
		$('#type_select option[value="9"]').text('pic9: Gemischte Spiralen');
		$('#appearance_division').text('Bildschirmaufteilung:');
		$('#appearance_speed').text('Geschwindigkeit:');
		$('#speed_irregular_label').text('Irregulär');
		$('#appearance_rotation').text('Gegenrotation:');
		$('#appearance_blinking').text('Blinken:');
		$('#config_size').text('Größe der Nachricht:');
		$('#config_note').text('Sound-Taste:');
		$('#sound_select option[value=""]').text('(Kein)');
		$('#sound_select option[value="Cattish"]').text('Katzenartig');
		$('#sound_select option[value="Drill"]').text('Bohren');
		$('#sound_select option[value="Exciting"]').text('Anregen');
		$('#sound_select option[value="Horror"]').text('Furcht');
		$('#sound_select option[value="Hunting"]').text('Jagd');
		$('#sound_select option[value="Lonely"]').text('Einsamkeit');
		$('#sound_select option[value="Longing"]').text('Sehnsucht');
		$('#sound_select option[value="Lovely"]').text('Liebenswert');
		$('#sound_select option[value="Magic"]').text('Hexerei');
		$('#sound_select option[value="OraSaimin"]').text('Ora! Saimin!');
		$('#config_switch_sound').text('Bildwechselton:');
		$('#config_brightness').text('Helligkeit:');
		$('#screen_brightness option[value="normal"]').text('Normal');
		$('#screen_brightness option[value="brighter"]').text('Heller');
		$('#version_text').text('Hypnose KraKra Version ' + VERSION);
	}else{ // English is default
		$('#notice_text').text(NOTICE_EN);
		$('#mic_img').attr('src', 'images/mic.png');
		$('#type_select_button').text(getStr('TEXT_PIC') + type_select.value);
		$('#sound_img').attr('src', 'images/sound.png');
		$('#char_img').attr('src', 'images/text_en.png');
		$('#speech_img').attr('src', 'images/speak.png');
		$('#gear_img').attr('src', 'images/gear.png');
		$('#question_img').attr('src', 'images/question.png');
		$('#config_language').text('Language (言語):');
		$('#language_select option[value="zh-CN"]').text('Chinese (Simplified) (简体中文)');
		$('#language_select option[value="zh-TW"]').text('Chinese (Traditional) (繁體中文)');
		$('#language_select option[value="en"]').text('English (英語)');
		$('#language_select option[value="de"]').text('German (Deutsch)');
		$('#language_select option[value="it"]').text('Italian (Italiano)');
		$('#language_select option[value="ja"]').text('Japanese (日本語)');
		$('#language_select option[value="ko-KR"]').text('Korean (한국어)');
		$('#language_select2 option[value="zh-CN"]').text('Chinese (Simplified) (简体中文)');
		$('#language_select2 option[value="zh-TW"]').text('Chinese (Traditional) (繁體中文)');
		$('#language_select2 option[value="en"]').text('English');
		$('#language_select2 option[value="de"]').text('German (Deutsch)');
		$('#language_select2 option[value="it"]').text('Italian (Italiano)');
		$('#language_select2 option[value="ja"]').text('Japanese (日本語)');
		$('#language_select2 option[value="ko-KR"]').text('Korean (한국어)');
		$('#appearance_type').text('The type of picture:');
		$('#type_select option[value="-1"]').text('pic-1: Release Hypnosis');
		$('#type_select option[value="0"]').text('pic0: Initial Screen');
		$('#type_select option[value="1"]').text('pic1: Pink Spiral');
		$('#type_select option[value="2"]').text('pic2: Concentric Circles');
		$('#type_select option[value="3"]').text('pic3: The Eyes');
		$('#type_select option[value="4"]').text('pic4: Black and White Spiral');
		$('#type_select option[value="5"]').text('pic5: Spreading Hearts');
		$('#type_select option[value="6"]').text('pic6: 5-Yen Coin');
		$('#type_select option[value="7"]').text('pic7: Clamor Clamor');
		$('#type_select option[value="8"]').text('pic8: Crazy Colors');
		$('#type_select option[value="9"]').text('pic9: Mixed Spirals');
		$('#appearance_division').text('Screen splitting:');
		$('#appearance_speed').text('Speed:');
		$('#speed_irregular_label').text('Irregular');
		$('#appearance_rotation').text('Counterrotation:');
		$('#appearance_blinking').text('Blinking:');
		$('#config_size').text('Size of message:');
		$('#config_note').text('Sound button:');
		$('#sound_select option[value=""]').text('(None)');
		$('#sound_select option[value="Cattish"]').text('Cattish');
		$('#sound_select option[value="Drill"]').text('Drill');
		$('#sound_select option[value="Exciting"]').text('Exciting');
		$('#sound_select option[value="Horror"]').text('Horror');
		$('#sound_select option[value="Hunting"]').text('Hunting');
		$('#sound_select option[value="Lonely"]').text('Lonely');
		$('#sound_select option[value="Longing"]').text('Longing');
		$('#sound_select option[value="Lovely"]').text('Lovely');
		$('#sound_select option[value="Magic"]').text('Magic');
		$('#sound_select option[value="OraSaimin"]').text('Ora! Saimin!');
		$('#config_switch_sound').text('Pic change sound:');
		$('#config_brightness').text('Brightness:');
		$('#screen_brightness option[value="normal"]').text('Normal');
		$('#screen_brightness option[value="brighter"]').text('Brighter');
		$('#version_text').text('Hyponosis KraKra Version ' + VERSION);
	}
	$('#notice_text').scrollTop(0);
}
