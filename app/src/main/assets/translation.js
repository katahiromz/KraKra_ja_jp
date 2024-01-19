// translation.js --- Hypnosis KraKra tranlation

let trans_currentLanguage = 'en';

// {{LANGUAGE_SPECIFIC}}
const trans_DEFAULT_MESSAGE_LIST_EN = [
	"It is dangerous. Run away quickly.",
	"It's a tsunami. Run to higher ground.",
	"I need help.",
	"I'm injured. Call an ambulance.",
	"They are unconscious. Call an ambulance.",
	"It's a molester.",
	"it's okay.",
	"You are getting sleepier and sleepier...",
	"I want to study and get good grades...",
	"You'll love working for the company...",
	"I am glad to meet you.",
	"Good morning!",
	"Hello.",
	"Good evening!",
	"Thank you.",
	"It's been a while.",
	"I'm going to the office now.",
	"I'm going to school.",
	"Have a good day.",
	"I'm home!",
	"I'm sorry.",
	"I beg your pardon.",
	"Can I help you?",
	"Are you worried about something?",
	"Please do not overdo...",
	"Don't be nervous.",
	"Don't be shy.",
	"I won't bully you.",
	"Don't be afraid.",
	"Calm down, please.",
	"Come and talk to me.",
	"We'll work with you on that one.",
	"Do you have any complaints?",
	"Please help me, please...",
	"Make my wish come true...",
	"You're going to love me...",
	"It's nothing.",
	"Let's go out to dinner now.",
	"I'll buy you a can of juice.",
	"Let's go to the restaurant.",
	"I'll give you this.",
	"It was delicious.",
	"It was a lot of fun.",
	"It was very good.",
	"You need to learn more.",
	"Work harder and get better grades.",
	"It's cool.",
	"You're beautiful.",
	"You're my friend.",
	"Your zipper's open.",
	"Let's have fun today.",
	"There's food on the table.",
	"There's food in the fridge.",
	"Help me with the housework.",
	"I'm tired, so I'm going to rest.",
	"I'm going to bed now.",
	"How about tonight?",
];
const trans_DEFAULT_MESSAGE_LIST_KO_KR = [
	"위험합니다. 빨리 도망쳐.",
	"쓰나미입니다. 높은 곳으로 도망 가라.",
	"도움이 필요합니다.",
	"부상입니다. 구급차를 부르십시오.",
	"의식 불명입니다. 구급차를 부르십시오.",
	"치한.",
	"괜찮아.",
	"너는 점점 졸린다",
	"공부하고 좋은 성적을 얻고 싶어진다",
	"회사에서 일하는 것을 좋아한다",
	"만나서 반갑습니다",
	"좋은 아침",
	"안녕하세요",
	"안녕하세요",
	"고마워요",
	"오랜만입니다",
	"지금부터 회사로 이동",
	"학교에 갈거야",
	"가자",
	"지금",
	"미안해, 반성해",
	"그것은 무례했습니다",
	"뭔가 곤란해도?",
	"뭔가 불안해?",
	"무리하지 마십시오",
	"긴장하지 마십시오",
	"부끄러워하지 마라",
	"괴롭히지 마라",
	"두려워하지 마라",
	"진정하십시오",
	"나와 토론하자",
	"그 문제는 함께 생각합시다",
	"뭔가 불만이 있습니까?",
	"저를 도와주세요",
	"내 소원을 실현하십시오",
	"나를 좋아해",
	"아무것도 아니야",
	"지금부터 식사하러 가자",
	"캔 주스를 사주세요",
	"레스토랑에 가자",
	"이거 줘",
	"맛있었습니다",
	"매우 재미있었습니다",
	"매우 좋았습니다",
	"더 공부하고 성적을 올려주세요",
	"더 많은 일을하고 성적을 올리십시오",
	"멋지다",
	"너는 아름답다",
	"너는 친구야",
	"척이 열려 있습니다",
	"오늘은 즐기자",
	"테이블에 요리가 있습니다",
	"냉장고에 요리가 있습니다",
	"가사를 도와주세요",
	"피곤해서 쉬고",
	"지금부터 침대에서 자고",
	"오늘 밤은 어때?",
];
const trans_DEFAULT_MESSAGE_LIST_JA = [
	"危険です。早く逃げて。",
	"津波です。高い場所に逃げろ。",
	"助けが必要です。",
	"怪我人がいます。救急車を呼んで下さい。",
	"意識不明の人がいます。救急車を呼んで下さい",
	"痴漢です。",
	"大丈夫です。",
	"あなたはだんだん眠くなーる",
	"勉強して良い成績を取りたくなーる",
	"会社で働くのが好きになーる",
	"はじめまして",
	"おはようございます",
	"こんにちは",
	"こんばんは",
	"ありがとうございます",
	"お久しぶりですね",
	"今から会社へ行きます",
	"学校へ行ってきます",
	"いってらっしゃい",
	"ただいま",
	"ごめんなさい、反省してます",
	"それは失礼しました",
	"何かお困りでも？",
	"何か不安でもありますか？",
	"無理をしないで下さい",
	"緊張しないで下さい",
	"恥ずかしがらないで",
	"いじめたりしないよ",
	"怖がらないで",
	"落ち着いて下さい",
	"私と話し合おうよ",
	"その件は一緒に考えましょう",
	"何かご不満でもありますか？",
	"私を助けて下さい",
	"私の願いを叶えて下さい",
	"私のことが好きになーる",
	"なんでもないよ",
	"今から食事に行こうよ",
	"缶ジュース買ってあげる",
	"レストランへ行きましょう",
	"これ、あげる",
	"美味しかったよ",
	"とっても楽しかった",
	"とってもよかった",
	"もっと勉強して成績上げてね",
	"もっと仕事を頑張って成績を上げてね",
	"カッコイイじゃん",
	"君はきれいだね",
	"君は友だちだよ",
	"チャックが開いてるよ",
	"今日は楽しもうぜ",
	"テーブルに料理があるよ",
	"冷蔵庫に料理があるよ",
	"家事を手伝って下さい",
	"疲れたので休みます",
	"今からベッドで寝ます",
	"今夜はどうですか",
];
const trans_DEFAULT_MESSAGE_LIST_ZW_CN = [
	"有危险。赶紧逃跑。",
	"这是一场海啸。跑向更高的地方。",
	"我需要帮助。",
	"有受伤人员。打电话叫救护车。",
	"有人失去了知觉。打电话叫救护车。",
	"这是一个猥亵者。",
	"没关系。",
	"你越来越困了...",
	"我想学习并取得好成绩...",
	"你会喜欢为公司工作...",
	"我很高兴见到你。",
	"早晨好!",
	"你好。",
	"晚上好!",
	"谢谢你。",
	"已经有一段时间了。",
	"我现在要去办公室了。",
	"我要去上学了。",
	"祝你有个愉快的一天。",
	"我回来了!",
	"我很抱歉。",
	"请您原谅。",
	"我可以帮你吗？",
	"你在担心什么吗？",
	"请不要过度...",
	"不要紧张。",
	"不要害羞。",
	"我不会欺负你。",
	"不要害怕。",
	"冷静下来，请。",
	"来和我谈谈吧。",
	"我们将与你一起工作。",
	"你有什么抱怨吗？",
	"请帮助我，请...",
	"让我的愿望成真...",
	"你将会爱上我...",
	"这没什么。",
	"我们现在出去吃饭吧。",
	"我给你买一罐果汁。",
	"我们去餐厅吧。",
	"我给你这个。",
	"这很美味。",
	"这是很有趣的。",
	"这是非常好的。",
	"你需要学习更多。",
	"更加努力工作，取得更好的成绩。",
	"这很好。",
	"你很美。",
	"你是我的朋友。",
	"你的拉链已经打开。",
	"今天让我们玩得开心点。",
	"桌子上有食物。",
	"冰箱里有食物。",
	"帮我做家务。",
	"我很累了，所以我要休息了。",
	"我现在要去睡觉了。",
	"今晚怎么样？",
];
const trans_DEFAULT_MESSAGE_LIST_ZH_TW = [
	"有危險。趕緊逃跑。",
	"這是一場海嘯。跑向更高的地方。",
	"我需要幫助。",
	"有受傷人員。打電話叫救護車。",
	"有人失去了知覺。打電話叫救護車。",
	"這是一個猥褻者。",
	"沒關係。",
	"你越來越困了。。。",
	"我想學習並取得好成績。。。",
	"熱愛在公司工作。。。",
	"很高興見到你",
	"早上好",
	"你好",
	"晚上好",
	"謝謝",
	"好久不見",
	"我現在去上班",
	"我要去學校了",
	"小心",
	"我在家",
	"對不起，我正在反思",
	"對此感到抱歉",
	"有什麼麻煩嗎？",
	"你擔心什麼嗎？",
	"不要強迫自己",
	"別緊張",
	"別害羞",
	"我不會欺負你",
	"不要害怕",
	"冷靜下來",
	"跟我說話",
	"我們一起想一想",
	"您有什麼抱怨嗎？",
	"請幫我",
	"請讓我的願望成真",
	"越來越喜歡我",
	"沒有什麼",
	"我們現在去吃飯吧",
	"我給你買一罐果汁",
	"我們去餐廳吧",
	"我把這個給你",
	"很美味",
	"很有趣",
	"非常好",
	"多學習，取得更好的成績",
	"更加努力，取得更好的成績",
	"這很酷",
	"你很美麗",
	"你是我的朋友",
	"卡盤打開",
	"今天我們玩得開心吧",
	"桌子上有食物",
	"我冰箱裡有食物",
	"幫我做家務",
	"我累了所以我要休息",
	"我現在就上床睡覺",
	"你今晚怎麼樣",
];
const trans_DEFAULT_MESSAGE_LIST_IT = [
	"È pericoloso. Scappare velocemente.",
	"È uno tsunami. Corri verso un terreno più elevato.",
	"Ho bisogno di aiuto.",
	"Ci sono persone ferite. Chiami un'ambulanza.",
	"Qualcuno è incosciente. Chiami un'ambulanza.",
	"E' un molestatore.",
	"Va bene.",
	"Stai diventando sempre più assonnato...",
	"Voglio studiare e prendere bei voti...",
	"Ti piacerà lavorare per l'azienda...",
	"Sono felice di incontrarvi.",
	"Buongiorno!",
	"Ciao.",
	"Buonasera!",
	"Grazie.",
	"È passato un po 'di tempo.",
	"Adesso vado in ufficio.",
	"Io vado a scuola.",
	"Buona giornata.",
	"Sono a casa!",
	"Mi dispiace.",
	"Chiedo scusa.",
	"Posso aiutarla?",
	"Sei preoccupato per qualcosa?",
	"Mi raccomando non esagerare...",
	"Non essere nervoso.",
	"Non essere timido.",
	"Non ti farò il prepotente.",
	"Non aver paura.",
	"Calma per favore.",
	"Vieni a parlare con me.",
	"Lavoreremo con te su quello.",
	"Hai qualche lamentela?",
	"Per favore aiutami, per favore...",
	"Realizza il mio desiderio...",
	"Mi amerai...",
	"Non è niente.",
	"Andiamo a cena fuori adesso.",
	"Ti comprerò una lattina di succo.",
	"Andiamo al ristorante.",
	"Ti darò questo.",
	"È stato delizioso.",
	"E 'stato molto divertente.",
	"Era molto buono.",
	"Devi saperne di più.",
	"Lavora di più e ottieni voti migliori.",
	"È fantastico.",
	"Sei bello.",
	"Tu sei mio amico.",
	"La tua cerniera è aperta.",
	"Divertiamoci oggi.",
	"C'è del cibo sul tavolo.",
	"C'è del cibo in frigo.",
	"Aiutami con le faccende domestiche.",
	"Sono stanco, quindi vado a riposare.",
	"Sto andando a letto ora.",
	"Che ne dici di stasera?",
];
const trans_DEFAULT_MESSAGE_LIST_DE = [
	"Es ist gefährlich. Lauf schnell weg.",
	"Es ist ein Tsunami. Laufen Sie auf eine höhere Ebene.",
	"Ich brauche Hilfe.",
	"Es gibt Verletzte. Rufen Sie einen Krankenwagen.",
	"Jemand ist bewusstlos. Rufen Sie einen Krankenwagen.",
	"Es ist ein Perverser.",
	"Es ist okay.",
	"Du wirst immer schläfriger...",
	"Ich möchte lernen und gute Noten bekommen...",
	"Sie werden es lieben, für das Unternehmen zu arbeiten...",
	"Ich freue mich, Sie kennen zu lernen.",
	"Guten Morgen!",
	"Hallo.",
	"Guten Abend!",
	"Danke schön.",
	"Es ist eine Weile her.",
	"Ich gehe jetzt ins Büro.",
	"Ich gehe zur Schule.",
	"Haben Sie einen guten Tag.",
	"Ich bin zuhause!",
	"Es tut mir Leid.",
	"Wie bitte.",
	"Kann ich Ihnen helfen?",
	"Machst du dir wegen etwas Sorgen?",
	"Bitte übertreiben Sie es nicht...",
	"Seien Sie nicht nervös.",
	"Seien Sie nicht schüchtern.",
	"Ich werde dich nicht schikanieren.",
	"Hab keine Angst.",
	"Beruhige dich bitte.",
	"Komm und rede mit mir.",
	"Wir werden mit Ihnen daran arbeiten.",
	"Haben Sie Beschwerden?",
	"Bitte helfen Sie mir, bitte...",
	"Erfülle meinen Wunsch...",
	"Du wirst mich lieben...",
	"Schon gut.",
	"Lass uns jetzt zum Abendessen ausgehen.",
	"Ich kaufe dir eine Dose Saft.",
	"Lass uns zum Restaurant gehen.",
	"Ich gebe dir das.",
	"Es hat sehr gut geschmeckt.",
	"Es war viel Spaß.",
	"Es war sehr gut.",
	"Sie müssen mehr lernen.",
	"Arbeite härter und bekomme bessere Noten.",
	"Es ist cool.",
	"Du bist wunderschön.",
	"Du bist mein Freund.",
	"Dein Reißverschluss ist offen.",
	"Lasst uns heute Spaß haben.",
	"Es gibt Essen auf dem Tisch.",
	"Es gibt Essen im Kühlschrank.",
	"Hilf mir bei der Hausarbeit.",
	"Ich bin müde, also werde ich mich ausruhen.",
	"Ich gehe jetzt ins Bett.",
	"Wie wäre es mit heute Nacht?",
];

const trans_message_list = function(){
	// {{LANGUAGE_SPECIFIC}}
	if(trans_currentLanguage == 'ja' || trans_currentLanguage == 'ja-JP') // Japanese
		return trans_DEFAULT_MESSAGE_LIST_JA;
	else if(trans_currentLanguage == 'zh-CN') // Chinese (Simplified)
		return trans_DEFAULT_MESSAGE_LIST_ZH_CN;
	else if(trans_currentLanguage == 'zh-TW') // Chinese (Traditional)
		return trans_DEFAULT_MESSAGE_LIST_ZH_TW;
	else if(trans_currentLanguage == 'ko-KR') // Korean
		return trans_DEFAULT_MESSAGE_LIST_KO_KR;
	else if(trans_currentLanguage == 'it' || trans_currentLanguage == 'it-IT') // Italian
		return trans_DEFAULT_MESSAGE_LIST_IT;
	else if(trans_currentLanguage == 'de' || trans_currentLanguage == 'de-DE') // German
		return trans_DEFAULT_MESSAGE_LIST_DE;
	else // English is default
		return trans_DEFAULT_MESSAGE_LIST_EN;
}

const trans_message_placefolder = function(){
	// {{LANGUAGE_SPECIFIC}}
	if(trans_currentLanguage == 'ja' || trans_currentLanguage == 'ja-JP') // Japanese
		return "メッセージを入力";
	else if(trans_currentLanguage == 'zh-CN') // Chinese (Simplified)
		return "输入您的留言";
	else if(trans_currentLanguage == 'zh-TW') // Chinese (Traditional)
		return "輸入您的留言";
	else if(trans_currentLanguage == 'ko-KR') // Korean
		return "메시지 입력";
	else if(trans_currentLanguage == 'it' || trans_currentLanguage == 'it-IT') // Italian
		return "Inserisci il tuo messaggio";
	else if(trans_currentLanguage == 'de' || trans_currentLanguage == 'de-DE') // German
		return "Gib deine Nachricht ein";
	else // English is default
		return "Input message";
}

// {{LANGUAGE_SPECIFIC}}
const trans_NOTICE_EN = `=========================
催眠くらくら
Hypnosis KraKra
=========================

"Hypnosis KraKra" is a full-fledged joke app equipped with 16 types of videos, 20 types of audio, microphone input, and face recognition.
We provide real entertainment where you can enjoy hypnotic images and sounds.

- It displays captivating images to fill the entire screen. There are no annoying ads.
- You can lock on to the target with face recognition.
- It delivers your voice to the target with microphone input.
- Let's shake up your target's emotions by playing audio.
- It displays the message you want to convey on the screen, and the app itself will speak.

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
- Please do not hypnotize others without their consent.

[(How to use)]

- Basically, it is an application to enjoy looking at the screen.
- Tap the 'microphone' button to use the microphone (it needs permission).
- Tapping the '♪' button makes a sound.
- The 'bubble' button will display the message.
- The 'gear' button will open Configuration.
- When you run your finger on the screen, the screen sparks to attract their attention.

Copyright (c) 2022-2024 Katayama Hirofumi MZ
Copyright (c) 2023 Murayama Akira
Copyright (c) 2023 TT
Copyright (c) 2021 Nenad Markuš
Copyright (c) 2018 Robert Eisele
`

// {{LANGUAGE_SPECIFIC}}
const trans_NOTICE_KO_KR = `=========================
최면 크라크라
Hypnosis KraKra
=========================

"최면 크라크라" 는 16종의 동영상, 20종의 오디오, 마이크 입력, 얼굴 인식 기능을 갖춘 본격적인 농담 앱입니다.
최면에 걸린 영상과 사운드를 즐길 수 있는 리얼 엔터테인먼트를 제공합니다.

- 전체 화면이 가득한 매력적인 이미지를 표시합니다. 성가신 광고는 없습니다.
- 얼굴인식으로 대상을 락온할 수 있습니다.
- 마이크 입력을 통해 대상에게 음성을 전달합니다.
- 오디오를 재생하여 대상의 감정을 움직입니다.
- 전달하고 싶은 메시지를 화면에 표시하고, 앱 자체가 말을 하게 됩니다.

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
- 타인에게 동의없이 최면을 걸지 마십시오.

【사용법】

- 기본적으로 화면을보고 즐길 수있는 응용 프로그램입니다.
- '마이크' 버튼으로 마이크를 사용할 수 있습니다 (권한이 필요합니다).
- '♪' 버튼으로 소리가 울립니다.
- '버블'버튼에 메시지가 표시됩니다.
- "후키다시"버튼으로 메시지를 자동 음성으로 말합니다.
- '기어' 버튼으로 일반 설정을 할 수 있습니다.
- 화면을 손가락으로 추적하면 반짝임이 표시되어 상대방의 주의를 끌 수 있습니다.

Copyright (c) 2022-2024 Katayama Hirofumi MZ
Copyright (c) 2023 Murayama Akira
Copyright (c) 2023 TT
Copyright (c) 2021 Nenad Markuš
Copyright (c) 2018 Robert Eisele
`

// {{LANGUAGE_SPECIFIC}}
const trans_NOTICE_JA = `=========================
催眠くらくら
Hypnosis KraKra
=========================

「催眠くらくら」は、16種類の映像と20種類の音声、マイク入力、顔認証を搭載した本格的なジョークアプリです。
催眠っぽい映像や音声を楽しめる本物のエンターテインメントを提供します。

- 画面いっぱいに魅惑の映像を表示します。邪魔な広告はありません。
- 顔認証でターゲットをロックオンできます。
- マイク入力であなたの声をターゲットに届けます。
- 音声再生でターゲットの気持ちを揺さぶります。
- 伝えたいメッセージを画面に表示し、アプリ自身がしゃべります。

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
- 他人に同意なく催眠を掛けないで下さい。

【使い方】

- 基本的に画面を見て楽しむためのアプリです。
- 「マイク」ボタンでマイクが使えます(権限が必要です)。
- 「♪」ボタンで音が鳴ります。
- 「ふきだし」ボタンでメッセージを表示します。
- 「歯車」ボタンで全般設定ができます。
- 画面を指でなぞると、きらめきが表示され、相手の注意を引くことができます。

Copyright (c) 2022-2024 Katayama Hirofumi MZ
Copyright (c) 2023 Murayama Akira
Copyright (c) 2023 TT
Copyright (c) 2021 Nenad Markuš
Copyright (c) 2018 Robert Eisele
`

// {{LANGUAGE_SPECIFIC}}
const trans_NOTICE_ZW_CN = `=========================
催眠克拉克拉
Hypnosis KraKra
=========================

《催眠克拉克拉》是一款成熟的笑话应用程序，配备16种视频、20种音频、麦克风输入和面部识别。
我们提供真正的娱乐，您可以享受催眠的图像和声音。

- 它显示迷人的图像以填满整个屏幕。 没有烦人的广告。
- 您可以通过人脸识别锁定目标。
- 它通过麦克风输入将您的声音传递给目标。
- 让我们通过播放音频来动摇目标的情绪。
- 它会在屏幕上显示您想要传达的消息，并且应用程序本身会说话。

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
- 未经他人同意，请勿催眠他人。

【如何使用】

- 基本上，它是一个享受观看屏幕的应用程序。
- 点击“麦克风”按钮使用麦克风（需要许可）。
- 点击“♪”按钮会发出声音。
- “气泡”按钮将显示消息。
- “齿轮”按钮将打开配置。
- 当你的手指在屏幕上运行时，屏幕会产生火花，吸引他们的注意力。

Copyright (c) 2022-2024 片山博文MZ
Copyright (c) 2023 Murayama Akira
Copyright (c) 2023 TT
Copyright (c) 2021 Nenad Markuš
Copyright (c) 2018 Robert Eisele
`

// {{LANGUAGE_SPECIFIC}}
const trans_NOTICE_ZH_TW = `=========================
催眠克拉克拉
Hypnosis KraKra
=========================

《催眠克拉克拉》是一款成熟的笑話應用程序，配備16種視頻、20種音頻、麥克風輸入和麵部識別。
我們提供真正的娛樂，您可以享受催眠的圖像和聲音。

- 它顯示迷人的圖像以填滿整個螢幕。 沒有煩人的廣告。
- 您可以透過人臉辨識鎖定目標。
- 它透過麥克風輸入將您的聲音傳遞給目標。
- 讓我們透過播放音訊來動搖目標的情緒。
- 它會在螢幕上顯示您想要傳達的訊息，並且應用程式本身會說話。

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
- 未經他人同意，請勿催眠他人。

【用法】

- 它基本上是一個欣賞屏幕的應用程序。
- 您可以通過“麥克風”按鈕使用麥克風（需要許可）。
- “♪”按鈕會發出聲音。
- “氣泡”按鈕將顯示消息。
- 用於常規設置的“齒輪”按鈕。
- 在屏幕上滑動手指即可顯示閃爍的光芒，吸引對手的注意力。

Copyright (c) 2022-2024 片山博文MZ
Copyright (c) 2023 Murayama Akira
Copyright (c) 2023 TT
Copyright (c) 2021 Nenad Markuš
Copyright (c) 2018 Robert Eisele
`

// {{LANGUAGE_SPECIFIC}}
const trans_NOTICE_IT = `=========================
Ipnosi KraKra
Hypnosis KraKra
=========================

"Ipnosi KraKra" è un'app per scherzi completa dotata di 16 tipi di video, 20 tipi di audio, ingresso microfono e riconoscimento facciale.
Forniamo un vero intrattenimento in cui puoi goderti immagini e suoni ipnotici.

- Visualizza immagini accattivanti per riempire l'intero schermo. Non ci sono annunci fastidiosi.
- Puoi agganciare il bersaglio con il riconoscimento facciale.
- Fornisce la tua voce al bersaglio con l'ingresso del microfono.
- Scuotiamo le emozioni del tuo bersaglio riproducendo l'audio.
- Visualizza sullo schermo il messaggio che vuoi trasmettere e l'app stessa parlerà.

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
- Per favore non ipnotizzare gli altri senza il loro consenso.

[(Come usare)]

- Fondamentalmente, è un'applicazione per divertirsi guardando lo schermo.
- Tocca il pulsante "microfono" per utilizzare il microfono (è necessaria l'autorizzazione).
- Toccando il pulsante '♪' si emette un suono.
- Il pulsante "Bubble" visualizzerà il messaggio.
- Il pulsante "ingranaggio" aprirà Configurazione.
- Quando fai scorrere il dito sullo schermo, lo schermo si illumina per attirare la loro attenzione.

Copyright (c) 2022-2024 Katayama Hirofumi MZ
Copyright (c) 2023 Murayama Akira
Copyright (c) 2023 TT
Copyright (c) 2021 Nenad Markuš
Copyright (c) 2018 Robert Eisele
`

// {{LANGUAGE_SPECIFIC}}
const trans_NOTICE_DE = `=========================
Hypnose KraKra
Hypnosis KraKra
=========================

„Hypnose KraKra“ ist eine vollwertige Scherz-App, die mit 16 Arten von Videos, 20 Arten von Audio, Mikrofoneingang und Gesichtserkennung ausgestattet ist.
Wir bieten echte Unterhaltung, bei der Sie hypnotische Bilder und Töne genießen können.

- Es zeigt fesselnde Bilder an, die den gesamten Bildschirm ausfüllen. Es gibt keine störende Werbung.
- Sie können das Ziel mithilfe der Gesichtserkennung erfassen.
- Es überträgt Ihre Stimme über den Mikrofoneingang an das Ziel.
- Lassen Sie uns die Emotionen Ihres Ziels wecken, indem wir Audio abspielen.
- Die Nachricht, die Sie übermitteln möchten, wird auf dem Bildschirm angezeigt und die App selbst spricht.

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
- Bitte hypnotisieren Sie andere nicht ohne deren Zustimmung.

[(Wie benutzt man)]

- Im Grunde handelt es sich um eine Anwendung, mit der man gerne auf den Bildschirm schaut.
- Tippen Sie auf die Schaltfläche „Mikrofon“, um das Mikrofon zu verwenden (es erfordert eine Genehmigung).
- Durch Tippen auf die Schaltfläche „♪“ ertönt ein Ton.
- Die Schaltfläche "Blasen" zeigt die Nachricht an.
- Die Schaltfläche „Zahnrad“ öffnet die Konfiguration.
- Wenn Sie mit dem Finger über den Bildschirm fahren, erzeugt der Bildschirm Funken, um ihre Aufmerksamkeit zu erregen.

Copyright (c) 2022-2024 Katayama Hirofumi MZ
Copyright (c) 2023 Murayama Akira
Copyright (c) 2023 TT
Copyright (c) 2021 Nenad Markuš
Copyright (c) 2018 Robert Eisele
`

// {{LANGUAGE_SPECIFIC}}
const trans_getText = function(str_id){
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
		case 'TEXT_INIT_APP': return 'このアプリを初期化しますか？';
		case 'TEXT_INITTED_APP': return 'アプリを初期化しました。';
		case 'TEXT_CONFIGURATION': return '全般設定';
		case 'TEXT_APPEARANCE': return '見た目の設定';
		case 'TEXT_INPUT_MESSAGE': return 'メッセージ文字列を入力して下さい。';
		case 'TEXT_FULLWIDTH_SPACE': return '　';
		case 'TEXT_PERIOD': return '。';
		case 'TEXT_PERIOD_SPACE': return '。';
		case 'TEXT_RELEASE_HYPNOSIS': return '催眠解除';
		case 'TEXT_HYPNOSIS_RELEASED': return '催眠解除。';
		case 'TEXT_KILLING_HYPNOSIS_IMG': return 'img/killing-hypnosis_ja.svg';
		case 'TEXT_HYPNOSIS_RELEASED_IMG': return 'img/hypnosis-released_ja.svg';
		case 'TEXT_ALL_RELEASED_IMG': return 'img/all-released_ja.svg';
		case 'TEXT_NO_BLINKING': return '点滅なし';
		case 'TEXT_LOGO': return 'img/logo_ja.svg';
		case 'TEXT_TAP_HERE': return 'img/please-tap-here_ja.svg';
		case 'TEXT_MP3_RELEASED_HYPNOSIS': return 'sn/ReleasedHypnosis_ja.mp3';
		case 'TEXT_I_AGREE': return '私は同意します';
		case 'TEXT_SIZE_SMALL': return '小さい';
		case 'TEXT_SIZE_NORMAL': return '普通';
		case 'TEXT_SIZE_LARGE': return '大きい';
		case 'TEXT_SIZE_HUGE': return '巨大';
		case 'TEXT_SPEED_ZERO': return '停止';
		case 'TEXT_SPEED_SLOW': return '遅い';
		case 'TEXT_SPEED_NORMAL': return '普通';
		case 'TEXT_SPEED_FAST': return '速い';
		case 'TEXT_SPEED_SUPER_FAST': return '超速い';
		case 'TEXT_SPEED_IRREGULAR': return '不規則';
		case 'TEXT_RAINBOW': return '虹色';
		case 'TEXT_FACE_GETTER': return '顔認識';
		case 'TEXT_TAP_ON_TARGET': return 'ターゲットをタップして下さい';
		case 'TEXT_CAN_LOCK_ON': return 'ロックオンできます';
		case 'TEXT_CANT_FIND_FACE': return '顔が見つかりません';
		case 'TEXT_LOCK_ON': return 'ロックオン';
		case 'TEXT_UNLOCK': return 'ロック解除';
		case 'TEXT_CLOSE': return '閉じる';
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
		case 'TEXT_INIT_APP': return '您想初始化这个应用程序吗？';
		case 'TEXT_INITTED_APP': return '初始化了应用程序。';
		case 'TEXT_CONFIGURATION': return '配置';
		case 'TEXT_APPEARANCE': return '外貌';
		case 'TEXT_INPUT_MESSAGE': return '请输入消息文本。';
		case 'TEXT_FULLWIDTH_SPACE': return '　';
		case 'TEXT_PERIOD': return '。';
		case 'TEXT_PERIOD_SPACE': return '。';
		case 'TEXT_RELEASE_HYPNOSIS': return '去催眠';
		case 'TEXT_HYPNOSIS_RELEASED': return '我取消了催眠。';
		case 'TEXT_KILLING_HYPNOSIS_IMG': return 'img/killing-hypnosis_zh-CN.svg';
		case 'TEXT_HYPNOSIS_RELEASED_IMG': return 'img/hypnosis-released_zh-CN.svg';
		case 'TEXT_ALL_RELEASED_IMG': return 'img/all-released_zh-CN.svg';
		case 'TEXT_NO_BLINKING': return '无闪光灯';
		case 'TEXT_LOGO': return 'img/logo_zh-CN.svg';
		case 'TEXT_TAP_HERE': return 'img/please-tap-here_zh-CN.svg';
		case 'TEXT_MP3_RELEASED_HYPNOSIS': return 'sn/ReleasedHypnosis_zh-CN.mp3';
		case 'TEXT_I_AGREE': return '我同意';
		case 'TEXT_SIZE_SMALL': return '小的';
		case 'TEXT_SIZE_NORMAL': return '普通的';
		case 'TEXT_SIZE_LARGE': return '大的';
		case 'TEXT_SIZE_HUGE': return '巨大的';
		case 'TEXT_SPEED_ZERO': return '停止';
		case 'TEXT_SPEED_SLOW': return '慢的';
		case 'TEXT_SPEED_NORMAL': return '普通的';
		case 'TEXT_SPEED_FAST': return '快速地';
		case 'TEXT_SPEED_SUPER_FAST': return '超级快';
		case 'TEXT_SPEED_IRREGULAR': return '不规律的';
		case 'TEXT_RAINBOW': return '彩虹色';
		case 'TEXT_FACE_GETTER': return '人脸识别';
		case 'TEXT_TAP_ON_TARGET': return '请点击目标';
		case 'TEXT_CAN_LOCK_ON': return '可以锁定';
		case 'TEXT_CANT_FIND_FACE': return '未找到面孔';
		case 'TEXT_LOCK_ON': return '锁上';
		case 'TEXT_UNLOCK': return '开锁';
		case 'TEXT_CLOSE': return '关闭';
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
		case 'TEXT_INIT_APP': return '您想初始化這個應用程式嗎？';
		case 'TEXT_INITTED_APP': return '初始化了應用程序。';
		case 'TEXT_CONFIGURATION': return '常規設置';
		case 'TEXT_APPEARANCE': return '外觀設置';
		case 'TEXT_INPUT_MESSAGE': return '請輸入消息字符串。';
		case 'TEXT_FULLWIDTH_SPACE': return '　';
		case 'TEXT_PERIOD': return '。';
		case 'TEXT_PERIOD_SPACE': return '。';
		case 'TEXT_RELEASE_HYPNOSIS': return '催眠釋放';
		case 'TEXT_HYPNOSIS_RELEASED': return '催眠釋放。';
		case 'TEXT_KILLING_HYPNOSIS_IMG': return 'img/killing-hypnosis_zh-TW.svg';
		case 'TEXT_HYPNOSIS_RELEASED_IMG': return 'img/hypnosis-released_zh-TW.svg';
		case 'TEXT_ALL_RELEASED_IMG': return 'img/all-released_zh-TW.svg';
		case 'TEXT_NO_BLINKING': return '無閃光燈';
		case 'TEXT_LOGO': return 'img/logo_zh-TW.svg';
		case 'TEXT_TAP_HERE': return 'img/please-tap-here_zh-TW.svg';
		case 'TEXT_MP3_RELEASED_HYPNOSIS': return 'sn/ReleasedHypnosis_zh-TW.mp3';
		case 'TEXT_I_AGREE': return '我同意';
		case 'TEXT_SIZE_SMALL': return '小的';
		case 'TEXT_SIZE_NORMAL': return '普通的';
		case 'TEXT_SIZE_LARGE': return '大的';
		case 'TEXT_SIZE_HUGE': return '巨大的';
		case 'TEXT_SPEED_ZERO': return '停止';
		case 'TEXT_SPEED_SLOW': return '慢的';
		case 'TEXT_SPEED_NORMAL': return '普通的';
		case 'TEXT_SPEED_FAST': return '快速地';
		case 'TEXT_SPEED_SUPER_FAST': return '超快';
		case 'TEXT_SPEED_IRREGULAR': return '不規律的';
		case 'TEXT_RAINBOW': return '彩虹色';
		case 'TEXT_FACE_GETTER': return '人臉辨識';
		case 'TEXT_TAP_ON_TARGET': return '請點選目標';
		case 'TEXT_CAN_LOCK_ON': return '可以鎖定';
		case 'TEXT_CANT_FIND_FACE': return '未找到臉孔';
		case 'TEXT_LOCK_ON': return '鎖上';
		case 'TEXT_UNLOCK': return '開鎖';
		case 'TEXT_CLOSE': return '關閉';
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
		case 'TEXT_INIT_APP': return '이 앱을 초기화하시겠습니까?';
		case 'TEXT_INITTED_APP': return '앱을 초기화했습니다.';
		case 'TEXT_CONFIGURATION': return '구성';
		case 'TEXT_APPEARANCE': return '모습';
		case 'TEXT_INPUT_MESSAGE': return '메시지 문자열을 입력하십시오.';
		case 'TEXT_FULLWIDTH_SPACE': return '　';
		case 'TEXT_PERIOD': return '. ';
		case 'TEXT_PERIOD_SPACE': return '. ';
		case 'TEXT_RELEASE_HYPNOSIS': return '최면 해제';
		case 'TEXT_HYPNOSIS_RELEASED': return '최면 해제.';
		case 'TEXT_KILLING_HYPNOSIS_IMG': return 'img/killing-hypnosis_ko-KR.svg';
		case 'TEXT_HYPNOSIS_RELEASED_IMG': return 'img/hypnosis-released_ko-KR.svg';
		case 'TEXT_ALL_RELEASED_IMG': return 'img/all-released_ko-KR.svg';
		case 'TEXT_NO_BLINKING': return '깜박임 없음';
		case 'TEXT_LOGO': return 'img/logo_ko-KR.svg';
		case 'TEXT_TAP_HERE': return 'img/please-tap-here_ko-KR.svg';
		case 'TEXT_MP3_RELEASED_HYPNOSIS': return 'sn/ReleasedHypnosis_ko-KR.mp3';
		case 'TEXT_I_AGREE': return '동의합니다';
		case 'TEXT_SIZE_SMALL': return '작은';
		case 'TEXT_SIZE_NORMAL': return '정상';
		case 'TEXT_SIZE_LARGE': return '크기가 큰';
		case 'TEXT_SIZE_HUGE': return '거대한';
		case 'TEXT_SPEED_ZERO': return '정지중';
		case 'TEXT_SPEED_SLOW': return '느린';
		case 'TEXT_SPEED_NORMAL': return '정상';
		case 'TEXT_SPEED_FAST': return '빠른';
		case 'TEXT_SPEED_SUPER_FAST': return '매우 빠른';
		case 'TEXT_SPEED_IRREGULAR': return '불규칙한';
		case 'TEXT_RAINBOW': return '무지개 색';
		case 'TEXT_FACE_GETTER': return '얼굴 인식';
		case 'TEXT_TAP_ON_TARGET': return '타겟을 탭해주세요';
		case 'TEXT_CAN_LOCK_ON': return '잠글 수 있습니다';
		case 'TEXT_CANT_FIND_FACE': return '얼굴을 찾을 수 없음';
		case 'TEXT_LOCK_ON': return '잠금';
		case 'TEXT_UNLOCK': return '잠금 해제';
		case 'TEXT_CLOSE': return '닫다';
		}
	}else if(lang == 'it' || lang == 'it-IT'){ // Italian
		switch(str_id){
		case 'TEXT_PIC': return 'pic';
		case 'TEXT_OK': return 'OK';
		case 'TEXT_CANCEL': return 'Annulla';
		case 'TEXT_YES': return 'SÌ';
		case 'TEXT_NO': return 'No';
		case 'TEXT_CHOOSE_LANGUAGE': return 'Scegli una lingua (Choose a language)';
		case 'TEXT_ABOUT_APP': return 'Informazioni sull\'app';
		case 'TEXT_INIT_APP': return 'Vuoi inizializzare questa app?';
		case 'TEXT_INITTED_APP': return 'Inizializzata l\'app.';
		case 'TEXT_CONFIGURATION': return 'Configurazione';
		case 'TEXT_APPEARANCE': return 'Aspetto';
		case 'TEXT_INPUT_MESSAGE': return 'Inserisci il testo del messaggio.';
		case 'TEXT_FULLWIDTH_SPACE': return '　';
		case 'TEXT_PERIOD': return '.';
		case 'TEXT_PERIOD_SPACE': return '. ';
		case 'TEXT_RELEASE_HYPNOSIS': return 'Uccidi l\'ipnosi';
		case 'TEXT_HYPNOSIS_RELEASED': return 'Ipnosi liberata.';
		case 'TEXT_KILLING_HYPNOSIS_IMG': return 'img/killing-hypnosis_it.svg';
		case 'TEXT_HYPNOSIS_RELEASED_IMG': return 'img/hypnosis-released_it.svg';
		case 'TEXT_ALL_RELEASED_IMG': return 'img/all-released_it.svg';
		case 'TEXT_NO_BLINKING': return 'Senza il flash';
		case 'TEXT_LOGO': return 'img/logo_it.svg';
		case 'TEXT_TAP_HERE': return 'img/please-tap-here_it.svg';
		case 'TEXT_MP3_RELEASED_HYPNOSIS': return 'sn/ReleasedHypnosis_it.mp3';
		case 'TEXT_I_AGREE': return 'Sono d\'accordo';
		case 'TEXT_SIZE_SMALL': return 'Piccola';
		case 'TEXT_SIZE_NORMAL': return 'Normale';
		case 'TEXT_SIZE_LARGE': return 'Grande';
		case 'TEXT_SIZE_HUGE': return 'Enorme';
		case 'TEXT_SPEED_ZERO': return 'Fermato';
		case 'TEXT_SPEED_SLOW': return 'Lento';
		case 'TEXT_SPEED_NORMAL': return 'Normale';
		case 'TEXT_SPEED_FAST': return 'Veloce';
		case 'TEXT_SPEED_SUPER_FAST': return 'Super Veloce';
		case 'TEXT_SPEED_IRREGULAR': return 'Irregolare';
		case 'TEXT_RAINBOW': return 'Arcobaleno';
		case 'TEXT_FACE_GETTER': return 'Riconoscimento Facciale';
		case 'TEXT_TAP_ON_TARGET': return 'Per favore tocca il bersaglio';
		case 'TEXT_CAN_LOCK_ON': return 'Può essere bloccato';
		case 'TEXT_CANT_FIND_FACE': return 'Volto non trovato';
		case 'TEXT_LOCK_ON': return 'Blocco su';
		case 'TEXT_UNLOCK': return 'Sbloccare';
		case 'TEXT_CLOSE': return 'Vicino';
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
		case 'TEXT_INIT_APP': return 'Möchten Sie diese App initialisieren?';
		case 'TEXT_INITTED_APP': return 'Initialisierte die App.';
		case 'TEXT_CONFIGURATION': return 'Aufbau';
		case 'TEXT_APPEARANCE': return 'Aussehen';
		case 'TEXT_INPUT_MESSAGE': return 'Bitte geben Sie einen Nachrichtentext ein.';
		case 'TEXT_FULLWIDTH_SPACE': return '　';
		case 'TEXT_PERIOD': return '.';
		case 'TEXT_PERIOD_SPACE': return '. ';
		case 'TEXT_RELEASE_HYPNOSIS': return 'Töte Hypnose';
		case 'TEXT_HYPNOSIS_RELEASED': return 'Hypnose freigegeben.';
		case 'TEXT_KILLING_HYPNOSIS_IMG': return 'img/killing-hypnosis_de.svg';
		case 'TEXT_HYPNOSIS_RELEASED_IMG': return 'img/hypnosis-released_de.svg';
		case 'TEXT_ALL_RELEASED_IMG': return 'img/all-released_de.svg';
		case 'TEXT_NO_BLINKING': return 'Kein Blitz';
		case 'TEXT_LOGO': return 'img/logo_de.svg';
		case 'TEXT_TAP_HERE': return 'img/please-tap-here_de.svg';
		case 'TEXT_MP3_RELEASED_HYPNOSIS': return 'sn/ReleasedHypnosis_de.mp3';
		case 'TEXT_I_AGREE': return 'Ich stimme zu';
		case 'TEXT_SIZE_SMALL': return 'Klein';
		case 'TEXT_SIZE_NORMAL': return 'Normal';
		case 'TEXT_SIZE_LARGE': return 'Groß';
		case 'TEXT_SIZE_HUGE': return 'Riesig';
		case 'TEXT_SPEED_ZERO': return 'Gestoppt';
		case 'TEXT_SPEED_SLOW': return 'Langsam';
		case 'TEXT_SPEED_NORMAL': return 'Normal';
		case 'TEXT_SPEED_FAST': return 'Schnell';
		case 'TEXT_SPEED_SUPER_FAST': return 'Super Schnell';
		case 'TEXT_SPEED_IRREGULAR': return 'Irregulär';
		case 'TEXT_RAINBOW': return 'Regenbogen';
		case 'TEXT_FACE_GETTER': return 'Gesichtserkennung';
		case 'TEXT_TAP_ON_TARGET': return 'Bitte tippen Sie auf das Ziel';
		case 'TEXT_CAN_LOCK_ON': return 'Abschließbar';
		case 'TEXT_CANT_FIND_FACE': return 'Gesicht nicht gefunden';
		case 'TEXT_LOCK_ON': return 'Sperren';
		case 'TEXT_UNLOCK': return 'Freischalten';
		case 'TEXT_CLOSE': return 'Schließen';
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
		case 'TEXT_INIT_APP': return 'Do you want to initialize this app?';
		case 'TEXT_INITTED_APP': return 'Initialized the app.';
		case 'TEXT_CONFIGURATION': return 'Configuration';
		case 'TEXT_APPEARANCE': return 'Appearance';
		case 'TEXT_INPUT_MESSAGE': return 'Please enter a message text.';
		case 'TEXT_FULLWIDTH_SPACE': return '　';
		case 'TEXT_PERIOD': return '.';
		case 'TEXT_PERIOD_SPACE': return '. ';
		case 'TEXT_RELEASE_HYPNOSIS': return 'Kill hypnosis';
		case 'TEXT_HYPNOSIS_RELEASED': return 'Hypnosis released.';
		case 'TEXT_KILLING_HYPNOSIS_IMG': return 'img/killing-hypnosis_en.svg';
		case 'TEXT_HYPNOSIS_RELEASED_IMG': return 'img/hypnosis-released_en.svg';
		case 'TEXT_ALL_RELEASED_IMG': return 'img/all-released_en.svg';
		case 'TEXT_NO_BLINKING': return 'No blinking';
		case 'TEXT_LOGO': return 'img/logo_en.svg';
		case 'TEXT_TAP_HERE': return 'img/please-tap-here_en.svg';
		case 'TEXT_MP3_RELEASED_HYPNOSIS': return 'sn/ReleasedHypnosis_en.mp3';
		case 'TEXT_I_AGREE': return 'I agree';
		case 'TEXT_SIZE_SMALL': return 'Small';
		case 'TEXT_SIZE_NORMAL': return 'Normal';
		case 'TEXT_SIZE_LARGE': return 'Large';
		case 'TEXT_SIZE_HUGE': return 'Huge';
		case 'TEXT_SPEED_ZERO': return 'Stopped';
		case 'TEXT_SPEED_SLOW': return 'Slow';
		case 'TEXT_SPEED_NORMAL': return 'Normal';
		case 'TEXT_SPEED_FAST': return 'Fast';
		case 'TEXT_SPEED_SUPER_FAST': return 'Super Fast';
		case 'TEXT_SPEED_IRREGULAR': return 'Irregular';
		case 'TEXT_RAINBOW': return 'Rainbow';
		case 'TEXT_FACE_GETTER': return 'Face Recognition';
		case 'TEXT_TAP_ON_TARGET': return 'Please tap on the target';
		case 'TEXT_CAN_LOCK_ON': return 'Ready to lock on';
		case 'TEXT_CANT_FIND_FACE': return 'Face not found';
		case 'TEXT_LOCK_ON': return 'Lock on';
		case 'TEXT_UNLOCK': return 'Unlock';
		case 'TEXT_CLOSE': return 'Close';
		}
	}
}

const trans_setHtmlText = function(id, text){
	if(typeof(id) == 'string')
		id = document.getElementById(id);
	id.textContent = text;
}

const trans_setSelectOptionText = function(id, value, text){
	if(typeof(id) == 'string')
		id = document.getElementById(id);
	value = value.toString();
	let options = id.options;
	for(let i = 0; i < options.length; ++i){
		if(options[i].value == value){
			options[i].text = text;
			break;
		}
	}
}

const trans_getSelectOptionText = function(id, value){
	if(typeof(id) == 'string')
		id = document.getElementById(id);
	value = value.toString();
	let options = id.options;
	for(let i = 0; i < options.length; ++i){
		if(options[i].value == value){
			return options[i].text;
		}
	}
	return "";
}

const trans_setImageSrc = function(id, src){
	if(typeof(id) == 'string')
		id = document.getElementById(id);
	id.src = src;
}

// {{LANGUAGE_SPECIFIC}}
const trans_getDefaultLanguage = function(){
	switch (navigator.language){
	case 'zh':
	case 'zh-CN':
	case 'zh-SG':
	case 'zh-cn':
	case 'zh-sg':
		return 'zh-CN'; // Chinese (Simplified)
	case 'zh-TW':
	case 'zh-HK':
	case 'zh-MO':
	case 'zh-tw':
	case 'zh-hk':
	case 'zh-mo':
		return 'zh-TW'; // Chinese (Traditional)
	case 'de':
	case 'de-DE':
	case 'de-de':
		return 'de-DE'; // German
	case 'it':
	case 'it-IT':
	case 'it-it':
		return 'it-IT'; // Italian
	case 'ja':
	case 'ja-JP':
	case 'ja-jp':
		return 'ja'; // Japanese
	case 'ko':
	case 'kr':
	case 'ko-KR':
	case 'ko-kr':
		return 'ko-KR'; // Korean
	default:
		return 'en'; // English
	}
}

// {{LANGUAGE_SPECIFIC}}
const trans_localize = function(lang){
	localStorage.setItem('saiminLanguage3', lang);
	trans_currentLanguage = lang;
	if(lang == 'ja' || lang == 'jp'){ // Japanese
		trans_setHtmlText(sai_id_text_notice, trans_NOTICE_JA);
		trans_setHtmlText(sai_id_text_language, '言語 (Language):');
		trans_setSelectOptionText(sai_id_select_language_1, 'zh-CN', 'Chinese (Simplified) (简体中文)');
		trans_setSelectOptionText(sai_id_select_language_1, 'zh-TW', 'Chinese (Traditional) (繁體中文)');
		trans_setSelectOptionText(sai_id_select_language_1, 'en', 'English (英語)');
		trans_setSelectOptionText(sai_id_select_language_1, 'de', 'German (Deutsch)');
		trans_setSelectOptionText(sai_id_select_language_1, 'it', 'Italian (Italiano)');
		trans_setSelectOptionText(sai_id_select_language_1, 'ja', 'Japanese (日本語)');
		trans_setSelectOptionText(sai_id_select_language_1, 'ko-KR', 'Korean (한국어)');
		trans_setSelectOptionText(sai_id_select_language_2, 'zh-CN', 'Chinese (Simplified) (简体中文)');
		trans_setSelectOptionText(sai_id_select_language_2, 'zh-TW', 'Chinese (Traditional) (繁體中文)');
		trans_setSelectOptionText(sai_id_select_language_2, 'en', 'English (英語)');
		trans_setSelectOptionText(sai_id_select_language_2, 'de', 'German (Deutsch)');
		trans_setSelectOptionText(sai_id_select_language_2, 'it', 'Italian (Italiano)');
		trans_setSelectOptionText(sai_id_select_language_2, 'ja', 'Japanese (日本語)');
		trans_setSelectOptionText(sai_id_select_language_2, 'ko-KR', 'Korean (한국어)');
		trans_setHtmlText(sai_id_pic_type, '映像の種類:');
		trans_setSelectOptionText(sai_id_select_pic_type, '0', '画0: ダミー画面（練習用）');
		trans_setSelectOptionText(sai_id_select_pic_type, '1', '画1: 対数らせん');
		trans_setSelectOptionText(sai_id_select_pic_type, '2', '画2: 同心円状');
		trans_setSelectOptionText(sai_id_select_pic_type, '3', '画3: 目が回る');
		trans_setSelectOptionText(sai_id_select_pic_type, '4', '画4: アルキメデスのらせん');
		trans_setSelectOptionText(sai_id_select_pic_type, '5', '画5: 広がるハート');
		trans_setSelectOptionText(sai_id_select_pic_type, '6', '画6: 五円玉');
		trans_setSelectOptionText(sai_id_select_pic_type, '7', '画7: ぼわんぼわん');
		trans_setSelectOptionText(sai_id_select_pic_type, '8', '画8: クレージーな色');
		trans_setSelectOptionText(sai_id_select_pic_type, '9', '画9: 対数らせん2');
		trans_setSelectOptionText(sai_id_select_pic_type, '10', '画10: アナログディスク');
		trans_setSelectOptionText(sai_id_select_pic_type, '11', '画11: ミックス渦巻き');
		trans_setSelectOptionText(sai_id_select_pic_type, '12', '画12: 万華鏡');
		trans_setSelectOptionText(sai_id_select_pic_type, '13', '画13: 1番目の色の画面');
		trans_setSelectOptionText(sai_id_select_pic_type, '14', '画14: 2番目の色の画面');
		trans_setSelectOptionText(sai_id_select_pic_type, '15', '画15: ただの黒い画面');
		trans_setSelectOptionText(sai_id_select_pic_type, '16', '画16: ただの白い画面');
		trans_setHtmlText(sai_id_text_split, '画面分割:');
		trans_setHtmlText(sai_id_text_speed, 'スピード:');
		trans_setHtmlText(speed_irregular_label, '不規則');
		trans_setHtmlText(sai_id_text_rotation, '逆回転:');
		trans_setHtmlText(sai_id_text_blinking, '画面点滅:');
		trans_setHtmlText(sai_id_text_fullscreen_mode, 'フルスクリーン モード:');
		trans_setHtmlText(sai_id_page_message_header, 'メッセージ');
		trans_setHtmlText(sai_id_button_mesage_reset, 'リセット');
		trans_setHtmlText(sai_id_color_1st_reset, 'リセット');
		trans_setHtmlText(sai_id_color_2nd_reset, 'リセット');
		trans_setHtmlText(sai_id_button_mesage_cancel, 'キャンセル');
		trans_setHtmlText(sai_id_button_mesage_ok, 'OK');
		trans_setHtmlText(sai_id_text_message_size, 'メッセージの大きさ:');
		trans_setHtmlText(sai_id_text_note, '音符ボタン:');
		trans_setSelectOptionText(sai_id_select_sound, '', '(なし)');
		trans_setSelectOptionText(sai_id_select_sound, 'Cattish', 'ネコっぽい');
		trans_setSelectOptionText(sai_id_select_sound, 'Exciting', '興奮');
		trans_setSelectOptionText(sai_id_select_sound, 'Horror', '恐怖');
		trans_setSelectOptionText(sai_id_select_sound, 'Hunting', '狩人');
		trans_setSelectOptionText(sai_id_select_sound, 'Longing', 'あこがれ');
		trans_setSelectOptionText(sai_id_select_sound, 'Lovely', '愛らしい');
		trans_setSelectOptionText(sai_id_select_sound, 'Magic', '魔術');
		trans_setSelectOptionText(sai_id_select_sound, 'OraSaimin', 'おら! 催眠!');
		trans_setSelectOptionText(sai_id_select_sound, 'Noise', '雑音');
		trans_setSelectOptionText(sai_id_select_sound, '432Hz', '432Hz');
		trans_setSelectOptionText(sai_id_select_sound, 'Heli', 'ヘリコプター');
		trans_setSelectOptionText(sai_id_select_sound, 'HeliPlus432Hz', 'ヘリ+432Hz');
		trans_setHtmlText(sai_id_text_sound_volume, '音量:');
		trans_setHtmlText(sai_id_text_auto_play_sound, '音声の自動再生:');
		trans_setHtmlText(sai_id_text_auto_repeat_sound, '音声の自動繰り返し:');
		trans_setHtmlText(sai_id_text_switch_sound, '切り替え音:');
		trans_setHtmlText(sai_id_text_brightness, '画面の明るさ:');
		trans_setSelectOptionText(sai_id_select_brightness, 'normal', '普通');
		trans_setSelectOptionText(sai_id_select_brightness, 'brighter', '明るくする');
		trans_setHtmlText(sai_id_page_config_header, '設定');
		trans_setHtmlText(sai_id_text_label_message_text, 'メッセージ テキスト:');
		trans_setHtmlText(sai_id_button_message, 'メッセージ...');
		trans_setHtmlText(sai_id_button_start_hypnosis, '催眠開始...');
		trans_setHtmlText(sai_id_button_release_hypnosis, '催眠解除');
		trans_setHtmlText(sai_id_text_count_down, 'カウントダウン:');
		trans_setHtmlText(sai_id_text_label_message_speech, 'メッセージをしゃべる:');
		trans_setHtmlText(sai_id_text_color_1st, "1番目の色:");
		trans_setHtmlText(sai_id_text_color_2nd, "2番目の色:");
		trans_setHtmlText(sai_id_button_init_app, "初期化");
		trans_setHtmlText(sai_id_text_label_message_volume, "メッセージボイスの音量:");
	}else if(lang == 'zh-CN' || lang == 'cn'){ // Chinese (Simplified)
		trans_setHtmlText(sai_id_text_notice, trans_NOTICE_ZW_CN);
		trans_setHtmlText(sai_id_text_language, '语言 (Language):');
		trans_setSelectOptionText(sai_id_select_language_1, 'zh-CN', 'Chinese (Simplified) (简体中文)');
		trans_setSelectOptionText(sai_id_select_language_1, 'zh-TW', 'Chinese (Traditional) (繁體中文)');
		trans_setSelectOptionText(sai_id_select_language_1, 'en', 'English (英语)');
		trans_setSelectOptionText(sai_id_select_language_1, 'de', 'German (Deutsch)');
		trans_setSelectOptionText(sai_id_select_language_1, 'it', 'Italian (Italiano)');
		trans_setSelectOptionText(sai_id_select_language_1, 'ja', 'Japanese (日本語)');
		trans_setSelectOptionText(sai_id_select_language_1, 'ko-KR', 'Korean (한국어)');
		trans_setSelectOptionText(sai_id_select_language_2, 'zh-CN', 'Chinese (Simplified) (简体中文)');
		trans_setSelectOptionText(sai_id_select_language_2, 'zh-TW', 'Chinese (Traditional) (繁體中文)');
		trans_setSelectOptionText(sai_id_select_language_2, 'en', 'English (英语)');
		trans_setSelectOptionText(sai_id_select_language_2, 'de', 'German (Deutsch)');
		trans_setSelectOptionText(sai_id_select_language_2, 'it', 'Italian (Italiano)');
		trans_setSelectOptionText(sai_id_select_language_2, 'ja', 'Japanese (日本語)');
		trans_setSelectOptionText(sai_id_select_language_2, 'ko-KR', 'Korean (한국어)');
		trans_setHtmlText(sai_id_pic_type, '视频类型：');
		trans_setSelectOptionText(sai_id_select_pic_type, '0', '图0: 虚拟屏幕（用于练习）');
		trans_setSelectOptionText(sai_id_select_pic_type, '1', '图1: 对数螺线');
		trans_setSelectOptionText(sai_id_select_pic_type, '2', '图2: 同心圆');
		trans_setSelectOptionText(sai_id_select_pic_type, '3', '图3: 旋转的眼');
		trans_setSelectOptionText(sai_id_select_pic_type, '4', '图4: 阿基米德螺旋线');
		trans_setSelectOptionText(sai_id_select_pic_type, '5', '图5: 扩展的心');
		trans_setSelectOptionText(sai_id_select_pic_type, '6', '图6: 5日元硬币');
		trans_setSelectOptionText(sai_id_select_pic_type, '7', '图7: 头晕 头晕');
		trans_setSelectOptionText(sai_id_select_pic_type, '8', '图8: 疯狂的颜色');
		trans_setSelectOptionText(sai_id_select_pic_type, '9', '图9: 对数螺线 2');
		trans_setSelectOptionText(sai_id_select_pic_type, '10', '图10: 模拟光盘');
		trans_setSelectOptionText(sai_id_select_pic_type, '11', '图11: ミックス渦巻き');
		trans_setSelectOptionText(sai_id_select_pic_type, '12', '图12: 万花筒');
		trans_setSelectOptionText(sai_id_select_pic_type, '13', '图13: 第一个彩色屏幕');
		trans_setSelectOptionText(sai_id_select_pic_type, '14', '图14: 第二个彩色屏幕');
		trans_setSelectOptionText(sai_id_select_pic_type, '15', '图15：只是黑屏');
		trans_setSelectOptionText(sai_id_select_pic_type, '16', '图16：只是白屏');
		trans_setHtmlText(sai_id_text_split, '分屏：');
		trans_setHtmlText(sai_id_text_speed, '速度：');
		trans_setHtmlText(speed_irregular_label, '不规律的');
		trans_setHtmlText(sai_id_text_rotation, '反向旋转：');
		trans_setHtmlText(sai_id_text_blinking, '屏幕闪烁：');
		trans_setHtmlText(sai_id_text_fullscreen_mode, '全屏模式：');
		trans_setHtmlText(sai_id_page_message_header, '信息');
		trans_setHtmlText(sai_id_button_mesage_reset, '重置');
		trans_setHtmlText(sai_id_color_1st_reset, '重置');
		trans_setHtmlText(sai_id_color_2nd_reset, '重置');
		trans_setHtmlText(sai_id_button_mesage_cancel, '取消');
		trans_setHtmlText(sai_id_button_mesage_ok, 'OK');
		trans_setHtmlText(sai_id_text_message_size, '消息大小：');
		trans_setHtmlText(sai_id_text_note, '声音按钮：');
		trans_setSelectOptionText(sai_id_select_sound, '', '(无)');
		trans_setSelectOptionText(sai_id_select_sound, 'Cattish', '像猫一样');
		trans_setSelectOptionText(sai_id_select_sound, 'Exciting', '激发');
		trans_setSelectOptionText(sai_id_select_sound, 'Horror', '害怕');
		trans_setSelectOptionText(sai_id_select_sound, 'Hunting', '猎人');
		trans_setSelectOptionText(sai_id_select_sound, 'Longing', '渴望');
		trans_setSelectOptionText(sai_id_select_sound, 'Lovely', '可爱的');
		trans_setSelectOptionText(sai_id_select_sound, 'Magic', '巫术');
		trans_setSelectOptionText(sai_id_select_sound, 'OraSaimin', '天啊！ 催眠！');
		trans_setSelectOptionText(sai_id_select_sound, 'Noise', '噪音');
		trans_setSelectOptionText(sai_id_select_sound, '432Hz', '432Hz');
		trans_setSelectOptionText(sai_id_select_sound, 'Heli', '直升机');
		trans_setSelectOptionText(sai_id_select_sound, 'HeliPlus432Hz', '直升机+432Hz');
		trans_setHtmlText(sai_id_text_sound_volume, '音量：');
		trans_setHtmlText(sai_id_text_auto_play_sound, '自动播放音频：');
		trans_setHtmlText(sai_id_text_auto_repeat_sound, '自动重复音频：');
		trans_setHtmlText(sai_id_text_switch_sound, '切换声音');
		trans_setHtmlText(sai_id_text_brightness, '屏幕亮度：');
		trans_setSelectOptionText(sai_id_select_brightness, 'normal', '通常');
		trans_setSelectOptionText(sai_id_select_brightness, 'brighter', '明亮');
		trans_setHtmlText(sai_id_page_config_header, '配置');
		trans_setHtmlText(sai_id_text_label_message_text, '留言内容：');
		trans_setHtmlText(sai_id_button_message, '信息...');
		trans_setHtmlText(sai_id_button_start_hypnosis, '开始催眠...');
		trans_setHtmlText(sai_id_button_release_hypnosis, '释放催眠');
		trans_setHtmlText(sai_id_text_count_down, '倒数：');
		trans_setHtmlText(sai_id_text_label_message_speech, '留言演讲：');
		trans_setHtmlText(sai_id_text_color_1st, "第一种颜色：");
		trans_setHtmlText(sai_id_text_color_2nd, "第二种颜色：");
		trans_setHtmlText(sai_id_button_init_app, "初始化");
		trans_setHtmlText(sai_id_text_label_message_volume, "留言音量：");
	}else if(lang == 'zh-TW'){ // Chinese (Traditional)
		trans_setHtmlText(sai_id_text_notice, trans_NOTICE_ZH_TW);
		trans_setHtmlText(sai_id_text_language, '語言 (Language):');
		trans_setSelectOptionText(sai_id_select_language_1, 'zh-CN', 'Chinese (Simplified) (简体中文)');
		trans_setSelectOptionText(sai_id_select_language_1, 'zh-TW', 'Chinese (Traditional) (繁體中文)');
		trans_setSelectOptionText(sai_id_select_language_1, 'en', 'English (英語)');
		trans_setSelectOptionText(sai_id_select_language_1, 'de', 'German (Deutsch)');
		trans_setSelectOptionText(sai_id_select_language_1, 'it', 'Italian (Italiano)');
		trans_setSelectOptionText(sai_id_select_language_1, 'ja', 'Japanese (日本語)');
		trans_setSelectOptionText(sai_id_select_language_1, 'ko-KR', 'Korean (한국어)');
		trans_setSelectOptionText(sai_id_select_language_2, 'zh-CN', 'Chinese (Simplified) (简体中文)');
		trans_setSelectOptionText(sai_id_select_language_2, 'zh-TW', 'Chinese (Traditional) (繁體中文)');
		trans_setSelectOptionText(sai_id_select_language_2, 'en', 'English (英語)');
		trans_setSelectOptionText(sai_id_select_language_2, 'de', 'German (Deutsch)');
		trans_setSelectOptionText(sai_id_select_language_2, 'it', 'Italian (Italiano)');
		trans_setSelectOptionText(sai_id_select_language_2, 'ja', 'Japanese (日本語)');
		trans_setSelectOptionText(sai_id_select_language_2, 'ko-KR', 'Korean (한국어)');
		trans_setHtmlText(sai_id_pic_type, '視頻類型：');
		trans_setSelectOptionText(sai_id_select_pic_type, '0', '圖0: 虛擬螢幕（用於練習）');
		trans_setSelectOptionText(sai_id_select_pic_type, '1', '圖1: 對數螺線');
		trans_setSelectOptionText(sai_id_select_pic_type, '2', '圖2: 同心圆');
		trans_setSelectOptionText(sai_id_select_pic_type, '3', '圖3: 旋轉的眼');
		trans_setSelectOptionText(sai_id_select_pic_type, '4', '圖4: 阿基米德螺旋線');
		trans_setSelectOptionText(sai_id_select_pic_type, '5', '圖5: 擴展的心');
		trans_setSelectOptionText(sai_id_select_pic_type, '6', '圖6: 5日元硬幣');
		trans_setSelectOptionText(sai_id_select_pic_type, '7', '圖7: 頭暈 頭暈');
		trans_setSelectOptionText(sai_id_select_pic_type, '8', '圖8: 瘋狂的顏色');
		trans_setSelectOptionText(sai_id_select_pic_type, '9', '圖9: 對數螺線 2');
		trans_setSelectOptionText(sai_id_select_pic_type, '10', '圖10: 類比光碟');
		trans_setSelectOptionText(sai_id_select_pic_type, '11', '圖11: 混合漩涡');
		trans_setSelectOptionText(sai_id_select_pic_type, '12', '圖12: 萬花筒');
		trans_setSelectOptionText(sai_id_select_pic_type, '13', '圖13: 第一个彩色屏幕');
		trans_setSelectOptionText(sai_id_select_pic_type, '14', '圖14: 第二个彩色屏幕');
		trans_setSelectOptionText(sai_id_select_pic_type, '15', '圖15: 只是黑屏');
		trans_setSelectOptionText(sai_id_select_pic_type, '16', '圖16: 只是白屏');
		trans_setHtmlText(sai_id_text_split, '分屏：');
		trans_setHtmlText(sai_id_text_speed, '速度：');
		trans_setHtmlText(speed_irregular_label, '不規律的');
		trans_setHtmlText(sai_id_text_rotation, '反向旋轉：');
		trans_setHtmlText(sai_id_text_blinking, '螢幕閃爍：');
		trans_setHtmlText(sai_id_text_fullscreen_mode, '全螢幕模式：');
		trans_setHtmlText(sai_id_page_message_header, '資訊');
		trans_setHtmlText(sai_id_button_mesage_reset, '重置');
		trans_setHtmlText(sai_id_color_1st_reset, '重置');
		trans_setHtmlText(sai_id_color_2nd_reset, '重置');
		trans_setHtmlText(sai_id_button_mesage_cancel, '取消');
		trans_setHtmlText(sai_id_button_mesage_ok, 'OK');
		trans_setHtmlText(sai_id_text_message_size, '消息大小：');
		trans_setHtmlText(sai_id_text_note, '聲音按鈕：');
		trans_setSelectOptionText(sai_id_select_sound, '', '(無)');
		trans_setSelectOptionText(sai_id_select_sound, 'Cattish', '像貓一樣');
		trans_setSelectOptionText(sai_id_select_sound, 'Exciting', '激發');
		trans_setSelectOptionText(sai_id_select_sound, 'Horror', '害怕');
		trans_setSelectOptionText(sai_id_select_sound, 'Hunting', '獵人');
		trans_setSelectOptionText(sai_id_select_sound, 'Longing', '渴望');
		trans_setSelectOptionText(sai_id_select_sound, 'Lovely', '可愛的');
		trans_setSelectOptionText(sai_id_select_sound, 'Magic', '巫術');
		trans_setSelectOptionText(sai_id_select_sound, 'OraSaimin', '天啊！ 催眠！');
		trans_setSelectOptionText(sai_id_select_sound, 'Noise', '噪音');
		trans_setSelectOptionText(sai_id_select_sound, '432Hz', '432Hz');
		trans_setSelectOptionText(sai_id_select_sound, 'Heli', '直升機');
		trans_setSelectOptionText(sai_id_select_sound, 'HeliPlus432Hz', '直升機+432Hz');
		trans_setHtmlText(sai_id_text_sound_volume, '音量：');
		trans_setHtmlText(sai_id_text_auto_play_sound, '自動播放音訊：');
		trans_setHtmlText(sai_id_text_auto_repeat_sound, '自動重複音訊：');
		trans_setHtmlText(sai_id_text_switch_sound, '切換聲音：');
		trans_setHtmlText(sai_id_text_brightness, '屏幕亮度：');
		trans_setSelectOptionText(sai_id_select_brightness, 'normal', '正常亮度');
		trans_setSelectOptionText(sai_id_select_brightness, 'brighter', '提亮');
		trans_setHtmlText(sai_id_page_config_header, '配置');
		trans_setHtmlText(sai_id_text_label_message_text, '留言內容：');
		trans_setHtmlText(sai_id_button_message, '訊息...');
		trans_setHtmlText(sai_id_button_start_hypnosis, '開始催眠...');
		trans_setHtmlText(sai_id_button_release_hypnosis, '釋放催眠');
		trans_setHtmlText(sai_id_text_count_down, '倒數：');
		trans_setHtmlText(sai_id_text_label_message_speech, '留言演講：');
		trans_setHtmlText(sai_id_text_color_1st, "第一種顏色：");
		trans_setHtmlText(sai_id_text_color_2nd, "第二種顏色：");
		trans_setHtmlText(sai_id_button_init_app, "初始化");
		trans_setHtmlText(sai_id_text_label_message_volume, "留言音量：");
	}else if(lang == 'kr' || lang == 'ko' || lang == 'ko-KR'){ // Korean
		trans_setHtmlText(sai_id_text_notice, trans_NOTICE_KO_KR);
		trans_setHtmlText(sai_id_text_language, '언어 (Language):');
		trans_setSelectOptionText(sai_id_select_language_1, 'zh-CN', 'Chinese (Simplified) (简体中文)');
		trans_setSelectOptionText(sai_id_select_language_1, 'zh-TW', 'Chinese (Traditional) (繁體中文)');
		trans_setSelectOptionText(sai_id_select_language_1, 'en', 'English (영어)');
		trans_setSelectOptionText(sai_id_select_language_1, 'de', 'German (Deutsch)');
		trans_setSelectOptionText(sai_id_select_language_1, 'it', 'Italian (Italiano)');
		trans_setSelectOptionText(sai_id_select_language_1, 'ja', 'Japanese (日本語)');
		trans_setSelectOptionText(sai_id_select_language_1, 'ko-KR', 'Korean (한국어)');
		trans_setSelectOptionText(sai_id_select_language_2, 'zh-CN', 'Chinese (Simplified) (简体中文)');
		trans_setSelectOptionText(sai_id_select_language_2, 'zh-TW', 'Chinese (Traditional) (繁體中文)');
		trans_setSelectOptionText(sai_id_select_language_2, 'en', 'English (영어)');
		trans_setSelectOptionText(sai_id_select_language_2, 'de', 'German (Deutsch)');
		trans_setSelectOptionText(sai_id_select_language_2, 'it', 'Italian (Italiano)');
		trans_setSelectOptionText(sai_id_select_language_2, 'ja', 'Japanese (日本語)');
		trans_setSelectOptionText(sai_id_select_language_2, 'ko-KR', 'Korean (한국어)');
		trans_setHtmlText(sai_id_pic_type, '그림 유형:');
		trans_setSelectOptionText(sai_id_select_pic_type, '0', 'pic0: 더미 화면 (연습용)');
		trans_setSelectOptionText(sai_id_select_pic_type, '1', 'pic1: 로그 나선');
		trans_setSelectOptionText(sai_id_select_pic_type, '2', 'pic2: 동심원형');
		trans_setSelectOptionText(sai_id_select_pic_type, '3', 'pic3: 회전하는 눈');
		trans_setSelectOptionText(sai_id_select_pic_type, '4', 'pic4: 아르키메데스의 나선');
		trans_setSelectOptionText(sai_id_select_pic_type, '5', 'pic5: 퍼지는 하트들');
		trans_setSelectOptionText(sai_id_select_pic_type, '6', 'pic6: 오엔 구슬');
		trans_setSelectOptionText(sai_id_select_pic_type, '7', 'pic7: 보완 보완');
		trans_setSelectOptionText(sai_id_select_pic_type, '8', 'pic8: 미친 색');
		trans_setSelectOptionText(sai_id_select_pic_type, '9', 'pic9: 로그 나선 2');
		trans_setSelectOptionText(sai_id_select_pic_type, '10', 'pic10: 아날로그 디스크');
		trans_setSelectOptionText(sai_id_select_pic_type, '11', 'pic11: 믹스 소용돌이');
		trans_setSelectOptionText(sai_id_select_pic_type, '12', 'pic12: 만화경');
		trans_setSelectOptionText(sai_id_select_pic_type, '13', 'pic13: 첫 번째 컬러 화면');
		trans_setSelectOptionText(sai_id_select_pic_type, '14', 'pic14: 두 번째 색상 화면');
		trans_setSelectOptionText(sai_id_select_pic_type, '15', 'pic15: 그냥 검은 화면');
		trans_setSelectOptionText(sai_id_select_pic_type, '16', 'pic16: 그냥 흰색 화면');
		trans_setHtmlText(sai_id_text_split, '화면 분할:');
		trans_setHtmlText(sai_id_text_speed, '속도:');
		trans_setHtmlText(speed_irregular_label, '불규칙');
		trans_setHtmlText(sai_id_text_rotation, '역회전:');
		trans_setHtmlText(sai_id_text_blinking, '화면 깜박임:');
		trans_setHtmlText(sai_id_text_fullscreen_mode, '전체 화면 모드:');
		trans_setHtmlText(sai_id_page_message_header, '메시지');
		trans_setHtmlText(sai_id_button_mesage_reset, '초기화');
		trans_setHtmlText(sai_id_color_1st_reset, '초기화');
		trans_setHtmlText(sai_id_color_2nd_reset, '초기화');
		trans_setHtmlText(sai_id_button_mesage_cancel, '취소');
		trans_setHtmlText(sai_id_button_mesage_ok, 'OK');
		trans_setHtmlText(sai_id_text_message_size, '메시지 크기:');
		trans_setHtmlText(sai_id_text_note, '사운드 버튼:');
		trans_setSelectOptionText(sai_id_select_sound, '', '(없음)');
		trans_setSelectOptionText(sai_id_select_sound, 'Cattish', '고양이 같은');
		trans_setSelectOptionText(sai_id_select_sound, 'Exciting', '일으키다');
		trans_setSelectOptionText(sai_id_select_sound, 'Horror', '공포');
		trans_setSelectOptionText(sai_id_select_sound, 'Hunting', '사냥꾼');
		trans_setSelectOptionText(sai_id_select_sound, 'Longing', '동경');
		trans_setSelectOptionText(sai_id_select_sound, 'Lovely', '사랑스러운');
		trans_setSelectOptionText(sai_id_select_sound, 'Magic', '마술');
		trans_setSelectOptionText(sai_id_select_sound, 'OraSaimin', '오! 최면!');
		trans_setSelectOptionText(sai_id_select_sound, 'Noise', '소음');
		trans_setSelectOptionText(sai_id_select_sound, '432Hz', '432Hz');
		trans_setSelectOptionText(sai_id_select_sound, 'Heli', '헬리콥터');
		trans_setSelectOptionText(sai_id_select_sound, 'HeliPlus432Hz', '헬리콥터+432Hz');
		trans_setHtmlText(sai_id_text_sound_volume, '사운드 볼륨:');
		trans_setHtmlText(sai_id_text_auto_play_sound, '오디오 자동 재생:');
		trans_setHtmlText(sai_id_text_auto_repeat_sound, '음성 자동 반복:');
		trans_setHtmlText(sai_id_text_switch_sound, '전환음:');
		trans_setHtmlText(sai_id_text_brightness, '화면 밝기:');
		trans_setSelectOptionText(sai_id_select_brightness, 'normal', '일반 밝기');
		trans_setSelectOptionText(sai_id_select_brightness, 'brighter', '밝게 하다');
		trans_setHtmlText(sai_id_page_config_header, '구성');
		trans_setHtmlText(sai_id_text_label_message_text, '메시지 텍스트:');
		trans_setHtmlText(sai_id_button_message, '메시지...');
		trans_setHtmlText(sai_id_button_start_hypnosis, '최면 시작...');
		trans_setHtmlText(sai_id_button_release_hypnosis, '최면 해제');
		trans_setHtmlText(sai_id_text_count_down, '카운트다운:');
		trans_setHtmlText(sai_id_text_label_message_speech, '메시지 연설:');
		trans_setHtmlText(sai_id_text_color_1st, "첫 번째 색상:");
		trans_setHtmlText(sai_id_text_color_2nd, "두 번째 색상:");
		trans_setHtmlText(sai_id_button_init_app, "앱 재설정");
		trans_setHtmlText(sai_id_text_label_message_volume, "메시지 음성 음량:");
	}else if(lang == 'it' || lang == 'it-IT'){ // Italian
		trans_setHtmlText(sai_id_text_notice, trans_NOTICE_IT);
		trans_setHtmlText(sai_id_text_language, 'Lingua (Language):');
		trans_setSelectOptionText(sai_id_select_language_1, 'zh-CN', 'Chinese (Simplified) (简体中文)');
		trans_setSelectOptionText(sai_id_select_language_1, 'zh-TW', 'Chinese (Traditional) (繁體中文)');
		trans_setSelectOptionText(sai_id_select_language_1, 'en', 'English (Inglese)');
		trans_setSelectOptionText(sai_id_select_language_1, 'de', 'German (Deutsch)');
		trans_setSelectOptionText(sai_id_select_language_1, 'it', 'Italian (Italiano)');
		trans_setSelectOptionText(sai_id_select_language_1, 'ja', 'Japanese (日本語)');
		trans_setSelectOptionText(sai_id_select_language_1, 'ko-KR', 'Korean (한국어)');
		trans_setSelectOptionText(sai_id_select_language_2, 'zh-CN', 'Chinese (Simplified) (简体中文)');
		trans_setSelectOptionText(sai_id_select_language_2, 'zh-TW', 'Chinese (Traditional) (繁體中文)');
		trans_setSelectOptionText(sai_id_select_language_2, 'en', 'English (Inglese)');
		trans_setSelectOptionText(sai_id_select_language_2, 'de', 'German (Deutsch)');
		trans_setSelectOptionText(sai_id_select_language_2, 'it', 'Italian (Italiano)');
		trans_setSelectOptionText(sai_id_select_language_2, 'ja', 'Japanese (日本語)');
		trans_setSelectOptionText(sai_id_select_language_2, 'ko-KR', 'Korean (한국어)');
		trans_setHtmlText(sai_id_pic_type, 'Il tipo di immagine:');
		trans_setSelectOptionText(sai_id_select_pic_type, '0', 'pic0: Schermata fittizia (per esercitarsi)');
		trans_setSelectOptionText(sai_id_select_pic_type, '1', 'pic1: Spirale Logaritmica');
		trans_setSelectOptionText(sai_id_select_pic_type, '2', 'pic2: Cerchi concentrici');
		trans_setSelectOptionText(sai_id_select_pic_type, '3', 'pic3: Gli occhi');
		trans_setSelectOptionText(sai_id_select_pic_type, '4', 'pic4: Spirale di Archimede');
		trans_setSelectOptionText(sai_id_select_pic_type, '5', 'pic5: Cuori che si diffondono');
		trans_setSelectOptionText(sai_id_select_pic_type, '6', 'pic6: Moneta da 5 Yen');
		trans_setSelectOptionText(sai_id_select_pic_type, '7', 'pic7: Clamore Clamore');
		trans_setSelectOptionText(sai_id_select_pic_type, '8', 'pic8: Colori Pazzi');
		trans_setSelectOptionText(sai_id_select_pic_type, '9', 'pic9: Spirale Logaritmica 2');
		trans_setSelectOptionText(sai_id_select_pic_type, '10', 'pic10: Disco Analogico');
		trans_setSelectOptionText(sai_id_select_pic_type, '11', 'pic11: Mescolare il turbinio');
		trans_setSelectOptionText(sai_id_select_pic_type, '12', 'pic12: Caleidoscopio');
		trans_setSelectOptionText(sai_id_select_pic_type, '13', 'pic13: 1° schermo a colori');
		trans_setSelectOptionText(sai_id_select_pic_type, '14', 'pic14: 2° schermo a colori');
		trans_setSelectOptionText(sai_id_select_pic_type, '15', 'pic15: Solo uno schermo nero');
		trans_setSelectOptionText(sai_id_select_pic_type, '16', 'pic16: Solo uno schermo bianco');
		trans_setHtmlText(sai_id_text_split, 'Divisione dello schermo:');
		trans_setHtmlText(sai_id_text_speed, 'Velocità:');
		trans_setHtmlText(speed_irregular_label, 'Irregolare');
		trans_setHtmlText(sai_id_text_rotation, 'Controrotazione:');
		trans_setHtmlText(sai_id_text_blinking, 'Schermo lampeggiante:');
		trans_setHtmlText(sai_id_text_fullscreen_mode, 'Modalità schermo intero:');
		trans_setHtmlText(sai_id_page_message_header, 'Messaggio');
		trans_setHtmlText(sai_id_button_mesage_reset, 'Ripristina');
		trans_setHtmlText(sai_id_color_1st_reset, 'Ripristina');
		trans_setHtmlText(sai_id_color_2nd_reset, 'Ripristina');
		trans_setHtmlText(sai_id_button_mesage_cancel, 'Annulla');
		trans_setHtmlText(sai_id_button_mesage_ok, 'OK');
		trans_setHtmlText(sai_id_text_message_size, 'Dimensione del messaggio:');
		trans_setHtmlText(sai_id_text_note, 'Pulsante audio:');
		trans_setSelectOptionText(sai_id_select_sound, '', '(Nessuno)');
		trans_setSelectOptionText(sai_id_select_sound, 'Cattish', 'Simile a un gatto');
		trans_setSelectOptionText(sai_id_select_sound, 'Exciting', 'Eccitare');
		trans_setSelectOptionText(sai_id_select_sound, 'Horror', 'Paura');
		trans_setSelectOptionText(sai_id_select_sound, 'Hunting', 'A caccia');
		trans_setSelectOptionText(sai_id_select_sound, 'Longing', 'Desiderio');
		trans_setSelectOptionText(sai_id_select_sound, 'Lovely', 'Adorabile');
		trans_setSelectOptionText(sai_id_select_sound, 'Magic', 'Stregoneria');
		trans_setSelectOptionText(sai_id_select_sound, 'OraSaimin', 'Ora! Saimin!');
		trans_setSelectOptionText(sai_id_select_sound, 'Noise', 'Rumore');
		trans_setSelectOptionText(sai_id_select_sound, '432Hz', '432Hz');
		trans_setSelectOptionText(sai_id_select_sound, 'Heli', 'Elicottero');
		trans_setSelectOptionText(sai_id_select_sound, 'HeliPlus432Hz', 'Elicottero+432Hz');
		trans_setHtmlText(sai_id_text_sound_volume, 'Volume del suono:');
		trans_setHtmlText(sai_id_text_auto_play_sound, 'Riproduzione automatica dell\'audio:');
		trans_setHtmlText(sai_id_text_auto_repeat_sound, 'Ripetere l\'audio:');
		trans_setHtmlText(sai_id_text_switch_sound, 'Suono di commutazione:');
		trans_setHtmlText(sai_id_text_brightness, 'Luminosità:');
		trans_setSelectOptionText(sai_id_select_brightness, 'normal', 'Normale');
		trans_setSelectOptionText(sai_id_select_brightness, 'brighter', 'Più luminoso');
		trans_setHtmlText(sai_id_page_config_header, 'Configurazione');
		trans_setHtmlText(sai_id_text_label_message_text, 'Messaggio di testo:');
		trans_setHtmlText(sai_id_button_message, 'Messaggio...');
		trans_setHtmlText(sai_id_button_start_hypnosis, 'Inizia l\'ipnosi...');
		trans_setHtmlText(sai_id_button_release_hypnosis, 'Rilascia l\'ipnosi');
		trans_setHtmlText(sai_id_text_count_down, 'Conto alla rovescia:');
		trans_setHtmlText(sai_id_text_label_message_speech, 'Discorso del messaggio:');
		trans_setHtmlText(sai_id_text_color_1st, "1° colore:");
		trans_setHtmlText(sai_id_text_color_2nd, "2° colore:");
		trans_setHtmlText(sai_id_button_init_app, "Inizializzare");
		trans_setHtmlText(sai_id_text_label_message_volume, "Volume della voce:");
	}else if(lang == 'de' || lang == 'de-DE'){ // German
		trans_setHtmlText(sai_id_text_notice, trans_NOTICE_DE);
		trans_setHtmlText(sai_id_text_language, 'Sprache (Language):');
		trans_setSelectOptionText(sai_id_select_language_1, 'zh-CN', 'Chinese (Simplified) (简体中文)');
		trans_setSelectOptionText(sai_id_select_language_1, 'zh-TW', 'Chinese (Traditional) (繁體中文)');
		trans_setSelectOptionText(sai_id_select_language_1, 'en', 'English (Englisch)');
		trans_setSelectOptionText(sai_id_select_language_1, 'de', 'German (Deutsch)');
		trans_setSelectOptionText(sai_id_select_language_1, 'it', 'Italian (Italiano)');
		trans_setSelectOptionText(sai_id_select_language_1, 'ja', 'Japanese (日本語)');
		trans_setSelectOptionText(sai_id_select_language_1, 'ko-KR', 'Korean (한국어)');
		trans_setSelectOptionText(sai_id_select_language_2, 'zh-CN', 'Chinese (Simplified) (简体中文)');
		trans_setSelectOptionText(sai_id_select_language_2, 'zh-TW', 'Chinese (Traditional) (繁體中文)');
		trans_setSelectOptionText(sai_id_select_language_2, 'en', 'English (Englisch)');
		trans_setSelectOptionText(sai_id_select_language_2, 'de', 'German (Deutsch)');
		trans_setSelectOptionText(sai_id_select_language_2, 'it', 'Italian (Italiano)');
		trans_setSelectOptionText(sai_id_select_language_2, 'ja', 'Japanese (日本語)');
		trans_setSelectOptionText(sai_id_select_language_2, 'ko-KR', 'Korean (한국어)');
		trans_setHtmlText(sai_id_pic_type, 'Die Art des Bildes:');
		trans_setSelectOptionText(sai_id_select_pic_type, '0', 'pic0: Dummy-Bildschirm (zum Üben)');
		trans_setSelectOptionText(sai_id_select_pic_type, '1', 'pic1: Logarithmische Spirale');
		trans_setSelectOptionText(sai_id_select_pic_type, '2', 'pic2: Konzentrische Kreise');
		trans_setSelectOptionText(sai_id_select_pic_type, '3', 'pic3: Die Augen');
		trans_setSelectOptionText(sai_id_select_pic_type, '4', 'pic4: Die Spirale des Archimedes');
		trans_setSelectOptionText(sai_id_select_pic_type, '5', 'pic5: Herzen verbreiten');
		trans_setSelectOptionText(sai_id_select_pic_type, '6', 'pic6: 5-Yen-Münze');
		trans_setSelectOptionText(sai_id_select_pic_type, '7', 'pic7: Lärm, Lärm');
		trans_setSelectOptionText(sai_id_select_pic_type, '8', 'pic8: Verrückte Farben');
		trans_setSelectOptionText(sai_id_select_pic_type, '9', 'pic9: Logarithmische Spirale 2');
		trans_setSelectOptionText(sai_id_select_pic_type, '10', 'pic10: Analoge Scheibe');
		trans_setSelectOptionText(sai_id_select_pic_type, '11', 'pic11: Mischwirbel');
		trans_setSelectOptionText(sai_id_select_pic_type, '12', 'pic12: Kaleidoskop');
		trans_setSelectOptionText(sai_id_select_pic_type, '13', 'pic13: 1. Farbbildschirm');
		trans_setSelectOptionText(sai_id_select_pic_type, '14', 'pic14: Zweiter Farbbildschirm');
		trans_setSelectOptionText(sai_id_select_pic_type, '15', 'pic15: Nur ein schwarzer Bildschirm');
		trans_setSelectOptionText(sai_id_select_pic_type, '16', 'pic16: Nur ein weißer Bildschirm');
		trans_setHtmlText(sai_id_text_split, 'Bildschirmaufteilung:');
		trans_setHtmlText(sai_id_text_speed, 'Geschwindigkeit:');
		trans_setHtmlText(speed_irregular_label, 'Irregulär');
		trans_setHtmlText(sai_id_text_rotation, 'Gegenrotation:');
		trans_setHtmlText(sai_id_text_blinking, 'Bildschirm blinkt:');
		trans_setHtmlText(sai_id_text_fullscreen_mode, 'Vollbildmodus:');
		trans_setHtmlText(sai_id_page_message_header, 'Nachricht');
		trans_setHtmlText(sai_id_button_mesage_reset, 'Zurücksetzen');
		trans_setHtmlText(sai_id_color_1st_reset, 'Zurücksetzen');
		trans_setHtmlText(sai_id_color_2nd_reset, 'Zurücksetzen');
		trans_setHtmlText(sai_id_button_mesage_cancel, 'Stornieren');
		trans_setHtmlText(sai_id_button_mesage_ok, 'OK');
		trans_setHtmlText(sai_id_text_message_size, 'Größe der Nachricht:');
		trans_setHtmlText(sai_id_text_note, 'Sound-Taste:');
		trans_setSelectOptionText(sai_id_select_sound, '', '(Kein)');
		trans_setSelectOptionText(sai_id_select_sound, 'Cattish', 'Katzenartig');
		trans_setSelectOptionText(sai_id_select_sound, 'Exciting', 'Anregen');
		trans_setSelectOptionText(sai_id_select_sound, 'Horror', 'Furcht');
		trans_setSelectOptionText(sai_id_select_sound, 'Hunting', 'Jagd');
		trans_setSelectOptionText(sai_id_select_sound, 'Longing', 'Sehnsucht');
		trans_setSelectOptionText(sai_id_select_sound, 'Lovely', 'Liebenswert');
		trans_setSelectOptionText(sai_id_select_sound, 'Magic', 'Hexerei');
		trans_setSelectOptionText(sai_id_select_sound, 'OraSaimin', 'Ora! Saimin!');
		trans_setSelectOptionText(sai_id_select_sound, 'Noise', 'Lärm');
		trans_setSelectOptionText(sai_id_select_sound, '432Hz', '432Hz');
		trans_setSelectOptionText(sai_id_select_sound, 'Heli', 'Hubschrauber');
		trans_setSelectOptionText(sai_id_select_sound, 'HeliPlus432Hz', 'Hubschrauber+432Hz');
		trans_setHtmlText(sai_id_text_sound_volume, 'Lautstärke:');
		trans_setHtmlText(sai_id_text_auto_play_sound, 'Audio automatisch abspielen:');
		trans_setHtmlText(sai_id_text_auto_repeat_sound, 'Sich Wiederholender Ton:');
		trans_setHtmlText(sai_id_text_switch_sound, 'Schaltgeräusch:');
		trans_setHtmlText(sai_id_text_brightness, 'Helligkeit:');
		trans_setSelectOptionText(sai_id_select_brightness, 'normal', 'Normal');
		trans_setSelectOptionText(sai_id_select_brightness, 'brighter', 'Heller');
		trans_setHtmlText(sai_id_page_config_header, 'Aufbau');
		trans_setHtmlText(sai_id_text_label_message_text, 'Nachrichtentext:');
		trans_setHtmlText(sai_id_button_message, 'Nachricht...');
		trans_setHtmlText(sai_id_button_start_hypnosis, 'Beginnen Sie mit der Hypnose...');
		trans_setHtmlText(sai_id_button_release_hypnosis, 'Hypnose loslassen');
		trans_setHtmlText(sai_id_text_count_down, 'Countdown:');
		trans_setHtmlText(sai_id_text_label_message_speech, 'Nachrichtenansprache:');
		trans_setHtmlText(sai_id_text_color_1st, "1. Farbe:");
		trans_setHtmlText(sai_id_text_color_2nd, "2. Farbe:");
		trans_setHtmlText(sai_id_button_init_app, "Initialisieren");
		trans_setHtmlText(sai_id_text_label_message_volume, "Stimmen Lautstärke:");
	}else{ // English is default
		trans_setHtmlText(sai_id_text_notice, trans_NOTICE_EN);
		trans_setHtmlText(sai_id_text_language, 'Language (言語):');
		trans_setSelectOptionText(sai_id_select_language_1, 'zh-CN', 'Chinese (Simplified) (简体中文)');
		trans_setSelectOptionText(sai_id_select_language_1, 'zh-TW', 'Chinese (Traditional) (繁體中文)');
		trans_setSelectOptionText(sai_id_select_language_1, 'en', 'English (英語)');
		trans_setSelectOptionText(sai_id_select_language_1, 'de', 'German (Deutsch)');
		trans_setSelectOptionText(sai_id_select_language_1, 'it', 'Italian (Italiano)');
		trans_setSelectOptionText(sai_id_select_language_1, 'ja', 'Japanese (日本語)');
		trans_setSelectOptionText(sai_id_select_language_1, 'ko-KR', 'Korean (한국어)');
		trans_setSelectOptionText(sai_id_select_language_2, 'zh-CN', 'Chinese (Simplified) (简体中文)');
		trans_setSelectOptionText(sai_id_select_language_2, 'zh-TW', 'Chinese (Traditional) (繁體中文)');
		trans_setSelectOptionText(sai_id_select_language_2, 'en', 'English');
		trans_setSelectOptionText(sai_id_select_language_2, 'de', 'German (Deutsch)');
		trans_setSelectOptionText(sai_id_select_language_2, 'it', 'Italian (Italiano)');
		trans_setSelectOptionText(sai_id_select_language_2, 'ja', 'Japanese (日本語)');
		trans_setSelectOptionText(sai_id_select_language_2, 'ko-KR', 'Korean (한국어)');
		trans_setHtmlText(sai_id_pic_type, 'The type of picture:');
		trans_setSelectOptionText(sai_id_select_pic_type, '0', 'pic0: Dummy Screen (for practice)');
		trans_setSelectOptionText(sai_id_select_pic_type, '1', 'pic1: Logarithmic Spiral');
		trans_setSelectOptionText(sai_id_select_pic_type, '2', 'pic2: Concentric Circles');
		trans_setSelectOptionText(sai_id_select_pic_type, '3', 'pic3: The Eyes');
		trans_setSelectOptionText(sai_id_select_pic_type, '4', 'pic4: Archimedes\' Spiral');
		trans_setSelectOptionText(sai_id_select_pic_type, '5', 'pic5: Spreading Hearts');
		trans_setSelectOptionText(sai_id_select_pic_type, '6', 'pic6: 5-Yen Coin');
		trans_setSelectOptionText(sai_id_select_pic_type, '7', 'pic7: Clamor Clamor');
		trans_setSelectOptionText(sai_id_select_pic_type, '8', 'pic8: Crazy Colors');
		trans_setSelectOptionText(sai_id_select_pic_type, '9', 'pic9: Logarithmic Spiral 2');
		trans_setSelectOptionText(sai_id_select_pic_type, '10', 'pic10: Analog Disc');
		trans_setSelectOptionText(sai_id_select_pic_type, '11', 'pic11: Mixed Spiral');
		trans_setSelectOptionText(sai_id_select_pic_type, '12', 'pic12: Kaleidoscope');
		trans_setSelectOptionText(sai_id_select_pic_type, '13', 'pic13: 1st color screen');
		trans_setSelectOptionText(sai_id_select_pic_type, '14', 'pic14: 2st color screen');
		trans_setSelectOptionText(sai_id_select_pic_type, '15', 'pic15: Just a black screen');
		trans_setSelectOptionText(sai_id_select_pic_type, '16', 'pic16: Just a white screen');
		trans_setHtmlText(sai_id_text_split, 'Screen splitting:');
		trans_setHtmlText(sai_id_text_speed, 'Speed:');
		trans_setHtmlText(speed_irregular_label, 'Irregular');
		trans_setHtmlText(sai_id_text_rotation, 'Counterrotation:');
		trans_setHtmlText(sai_id_text_blinking, 'Screen flashing:');
		trans_setHtmlText(sai_id_text_fullscreen_mode, 'Fullscreen mode:');
		trans_setHtmlText(sai_id_page_message_header, 'Message');
		trans_setHtmlText(sai_id_button_mesage_reset, 'Reset');
		trans_setHtmlText(sai_id_color_1st_reset, 'Reset');
		trans_setHtmlText(sai_id_color_2nd_reset, 'Reset');
		trans_setHtmlText(sai_id_button_mesage_cancel, 'Cancel');
		trans_setHtmlText(sai_id_button_mesage_ok, 'OK');
		trans_setHtmlText(sai_id_text_message_size, 'Size of message:');
		trans_setHtmlText(sai_id_text_note, 'Sound button:');
		trans_setSelectOptionText(sai_id_select_sound, '', '(None)');
		trans_setSelectOptionText(sai_id_select_sound, 'Cattish', 'Cattish');
		trans_setSelectOptionText(sai_id_select_sound, 'Exciting', 'Exciting');
		trans_setSelectOptionText(sai_id_select_sound, 'Horror', 'Horror');
		trans_setSelectOptionText(sai_id_select_sound, 'Hunting', 'Hunting');
		trans_setSelectOptionText(sai_id_select_sound, 'Longing', 'Longing');
		trans_setSelectOptionText(sai_id_select_sound, 'Lovely', 'Lovely');
		trans_setSelectOptionText(sai_id_select_sound, 'Magic', 'Magic');
		trans_setSelectOptionText(sai_id_select_sound, 'OraSaimin', 'Ora! Saimin!');
		trans_setSelectOptionText(sai_id_select_sound, 'Noise', 'Noise');
		trans_setSelectOptionText(sai_id_select_sound, '432Hz', '432Hz');
		trans_setSelectOptionText(sai_id_select_sound, 'Heli', 'Helicopter');
		trans_setSelectOptionText(sai_id_select_sound, 'HeliPlus432Hz', 'Heli+432Hz');
		trans_setHtmlText(sai_id_text_sound_volume, 'Sound volume:');
		trans_setHtmlText(sai_id_text_auto_play_sound, 'Auto-play audio:');
		trans_setHtmlText(sai_id_text_auto_repeat_sound, 'Repeating audio:');
		trans_setHtmlText(sai_id_text_switch_sound, 'Switching sound:');
		trans_setHtmlText(sai_id_text_brightness, 'Brightness:');
		trans_setSelectOptionText(sai_id_select_brightness, 'normal', 'Normal');
		trans_setSelectOptionText(sai_id_select_brightness, 'brighter', 'Brighter');
		trans_setHtmlText(sai_id_page_config_header, 'Configuration');
		trans_setHtmlText(sai_id_text_label_message_text, 'Message Text:');
		trans_setHtmlText(sai_id_button_message, 'Message...');
		trans_setHtmlText(sai_id_button_start_hypnosis, 'Start Hypnosis...');
		trans_setHtmlText(sai_id_button_release_hypnosis, 'Release Hypnosis');
		trans_setHtmlText(sai_id_text_count_down, 'Count Down:');
		trans_setHtmlText(sai_id_text_label_message_speech, 'Message Speech:');
		trans_setHtmlText(sai_id_text_color_1st, "1st color:");
		trans_setHtmlText(sai_id_text_color_2nd, "2nd color:");
		trans_setHtmlText(sai_id_button_init_app, "Initialize");
		trans_setHtmlText(sai_id_text_label_message_volume, "Message voice volume:");
	}

	trans_setHtmlText(sai_id_page_agreement_header_1, trans_getText('TEXT_ABOUT_APP'));
	trans_setHtmlText(sai_id_button_agree, trans_getText('TEXT_I_AGREE'));

	// 設定画面のロゴ画像をセットする。
	let logo_imgs = document.getElementsByClassName('sai_class_img_config_logo');
	for (let img of logo_imgs){
		trans_setImageSrc(img, trans_getText('TEXT_LOGO'));
	}

	let rainbows = document.getElementsByClassName('sai_class_rainbow');
	for (let span of rainbows){
		trans_setHtmlText(span, trans_getText('TEXT_RAINBOW'));
	}
}
