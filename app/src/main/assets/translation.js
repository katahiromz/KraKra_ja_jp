// translation.js --- Hypnosis KraKra tranlation

let trans_currentLanguage = 'en-US';
let trans_skin = 'purple';

// {{LANGUAGE_SPECIFIC}}
const trans_standardizeLanguage = function(language){
	switch (language){
	case 'zh': case 'zh-CN': case 'zh-SG': case 'zh-cn': case 'zh-sg':
		return 'zh-CN'; // Chinese (Simplified)
	case 'zh-TW': case 'zh-HK': case 'zh-MO': case 'zh-tw': case 'zh-hk': case 'zh-mo':
		return 'zh-TW'; // Chinese (Traditional)
	case 'de': case 'de-DE': case 'de-de':
		return 'de-DE'; // German
	case 'it': case 'it-IT': case 'it-it':
		return 'it-IT'; // Italian
	case 'ja': case 'ja-JP': case 'ja-jp':
		return 'ja-JP'; // Japanese
	case 'ko': case 'kr': case 'ko-KR': case 'ko-kr':
		return 'ko-KR'; // Korean
	case 'es': case 'es-ES': case 'es-es':
		return 'es-ES'; // Spanish
	case 'ru': case 'ru-RU': case 'ru-ru': case 'os-RU': case 'os-ru': case 'ru-KZ':
	case 'ru-kz': case 'ru-UA': case 'ru-ua': case 'ru-BY': case 'ru-by': case 'ru-KG':
	case 'ru-kg': case 'ru-MD': case 'ru-md':
		return 'ru-RU'; // Russian
	default:
		return 'en-US'; // English
	}
};

// {{LANGUAGE_SPECIFIC}} {{COLOR_SPECIFIC}}
const trans_getDefaultSkin = function(){
	switch (trans_currentLanguage){
	case 'zh-CN':
	case 'zh-TW':
		return 'golden';
	case 'en-US':
		return 'blue';
	case 'de-DE':
	case 'ru-RU':
	default:
		return 'purple';
	case 'it-IT':
	case 'ko-KR':
		return 'red';
	case 'ja-JP':
		return 'pink';
	case 'es-ES':
		return 'darkgreen';
	}
};

// {{LANGUAGE_SPECIFIC}} {{COLOR_SPECIFIC}}
const trans_getStyleSheet = function(){
	if(trans_skin == 'blackwhite')
		trans_skin = 'black';
	switch (trans_skin){
	case 'golden':
		return 'css/golden.css';
	case 'purple':
	default:
		return 'css/purple.css';
	case 'blue':
		return 'css/blue.css';
	case 'pink':
		return 'css/pink.css';
	case 'red':
		return 'css/red.css';
	case 'darkgreen':
		return 'css/darkgreen.css';
	case 'white':
		return 'css/white.css';
	case 'black':
		return 'css/black.css';
	}
};

// {{LANGUAGE_SPECIFIC}} {{COLOR_SPECIFIC}}
const trans_getColor = function(colorName){
	switch (trans_skin){
	case 'blue':
		switch (colorName){
		case 'COLOR_DUMMYPAGECOLOR0': return 'rgba(255, 30, 92, 0.0)';
		case 'COLOR_DUMMYPAGECOLOR1': return 'rgba(92, 30, 255, 1.0)';
		case 'COLOR_1ST': return '#6600aa';
		case 'COLOR_2ND': return '#cc11cc';
		}
		break;
	case 'purple':
	default:
		switch (colorName){
		case 'COLOR_DUMMYPAGECOLOR0': return 'rgba(255, 30, 92, 0.0)';
		case 'COLOR_DUMMYPAGECOLOR1': return 'rgba(192, 30, 255, 1.0)';
		case 'COLOR_1ST': return '#cc19bb';
		case 'COLOR_2ND': return '#330099';
		}
		break;
	case 'golden':
		switch (colorName){
		case 'COLOR_DUMMYPAGECOLOR0': return 'rgba(91, 91, 91, 0.0)';
		case 'COLOR_DUMMYPAGECOLOR1': return 'rgba(255, 255, 0, 1.0)';
		case 'COLOR_1ST': return '#ffff00';
		case 'COLOR_2ND': return '#666600';
		}
		break;
	case 'pink':
		switch (colorName){
		case 'COLOR_DUMMYPAGECOLOR0': return 'rgba(255, 0, 255, 0.0)';
		case 'COLOR_DUMMYPAGECOLOR1': return 'rgba(255, 0, 255, 1.0)';
		case 'COLOR_1ST': return '#990034';
		case 'COLOR_2ND': return '#ff00ff';
		}
		break;
	case 'red':
		switch (colorName){
		case 'COLOR_DUMMYPAGECOLOR0': return 'rgba(255, 0, 90, 0.0)';
		case 'COLOR_DUMMYPAGECOLOR1': return 'rgba(255, 90, 90, 1.0)';
		case 'COLOR_1ST': return '#990066';
		case 'COLOR_2ND': return '#ff0000';
		}
		break;
	case 'darkgreen':
		switch (colorName){
		case 'COLOR_DUMMYPAGECOLOR0': return 'rgba(0, 0, 0, 0.0)';
		case 'COLOR_DUMMYPAGECOLOR1': return 'rgba(0, 191, 0, 1.0)';
		case 'COLOR_1ST': return '#003300';
		case 'COLOR_2ND': return '#009900';
		}
		break;
	case 'black':
		switch (colorName){
		case 'COLOR_DUMMYPAGECOLOR0': return 'rgba(190, 190, 190, 0.0)';
		case 'COLOR_DUMMYPAGECOLOR1': return 'rgba(10, 10, 10, 1.0)';
		case 'COLOR_1ST': return '#000000';
		case 'COLOR_2ND': return '#ffffff';
		}
		break;
	case 'white':
		switch (colorName){
		case 'COLOR_DUMMYPAGECOLOR0': return 'rgba(255, 255, 255, 0.0)';
		case 'COLOR_DUMMYPAGECOLOR1': return 'rgba(90, 90, 90, 1.0)';
		case 'COLOR_1ST': return '#ffffff';
		case 'COLOR_2ND': return '#000000';
		}
		break;
	}
};

// {{LANGUAGE_SPECIFIC}}
const trans_DEFAULT_MESSAGE_LIST_EN = [
	"It is dangerous. Run away quickly.",
	"It's a tsunami. Run to higher ground.",
	"I need help.",
	"I'm injured. Call an ambulance.",
	"They are unconscious. Call an ambulance.",
	"He's a pervert. Help me!",
	"Please take a bath",
	"Let's smell your armpits",
	"Let's go shopping",
	"Could you please go throw away the garbage?",
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
	"That hairstyle suits you",
	"I like that about you",
	"Time flies when you're having fun",
	"I feel at ease when I'm with you",
	"You did a great job today, too, XX-chan",
	"It looks like a game, but it's not a game.",
	"I'm going to bed now.",
	"How about tonight?",
];
const trans_DEFAULT_MESSAGE_LIST_KO_KR = [
	"위험합니다. 빨리 도망쳐.",
	"쓰나미입니다. 높은 곳으로 도망 가라.",
	"도움이 필요합니다.",
	"부상입니다. 구급차를 부르십시오.",
	"의식 불명입니다. 구급차를 부르십시오.",
	"그는 변태야. 도와줘!",
	"목욕을 해주세요.",
	"당신의 겨드랑이의 냄새를 맡겨 보자.",
	"쇼핑하러 가자",
	"쓰레기를 버리지 않겠습니까?",
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
	"그 헤어스타일, 어울리네", 
	"너의 그런 곳을 좋아해", 
	"즐거운 시간은 순식간이네", 
	"너와 있으면 진정해", 
	"오늘도 ○○짱 노력했어",
	"놀이처럼 놀지 마라.",
	"지금부터 침대에서 자고",
	"오늘 밤은 어때?",
];
const trans_DEFAULT_MESSAGE_LIST_JA = [
	"危険です。早く逃げて。",
	"津波です。高い場所に逃げろ。",
	"助けが必要です。",
	"怪我人がいます。救急車を呼んでください。",
	"意識不明の人がいます。救急車を呼んでください",
	"痴漢です。助けてください。",
	"お風呂に入ってください",
	"あなたの脇の臭いを嗅いでみましょう",
	"買い物に行きましょう",
	"ゴミを捨てに行ってくれませんか",
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
	"無理をしないでください",
	"緊張しないでください",
	"恥ずかしがらないで",
	"いじめたりしないよ",
	"怖がらないで",
	"落ち着いてください",
	"私と話し合おうよ",
	"その件は一緒に考えましょう",
	"何かご不満でもありますか？",
	"私を助けてください",
	"私の願いを叶えてください",
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
	"家事を手伝ってください",
	"疲れたので休みます",
	"その髪型、似合ってるね",
	"君のそんなところが好きだな",
	"楽しい時間ってあっという間だね",
	"君と居ると落ち着くよ",
	"今日も○○ちゃん頑張ったね",
	"遊びのようで遊びじゃねーんだよ",
	"今からベッドで寝ます",
	"今夜はどうですか",
];
const trans_DEFAULT_MESSAGE_LIST_ZH_CN = [
	"有危险。赶紧逃跑。",
	"这是一场海啸。跑向更高的地方。",
	"我需要帮助。",
	"有受伤人员。打电话叫救护车。",
	"有人失去了知觉。打电话叫救护车。",
	"是色狼，快来救救我！",
	"请洗澡",
	"让我们闻闻你的腋窝",
	"一起去购物吧",
	"你能去扔垃圾吗？",
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
	"那个发型很适合你",
	"我喜欢你这一点",
	"你玩得开心的时候时间过得真快",
	"和你在一起我很安心",
	"你今天也表现得很棒啊，XX酱",
	"它看起来像一个游戏，但它不是游戏。",
	"我现在要去睡觉了。",
	"今晚怎么样？",
];
const trans_DEFAULT_MESSAGE_LIST_ZH_TW = [
	"有危險。趕緊逃跑。",
	"這是一場海嘯。跑向更高的地方。",
	"我需要幫助。",
	"有受傷人員。打電話叫救護車。",
	"有人失去了知覺。打電話叫救護車。",
	"這是一名性騷擾者。幫我！",
	"請洗澡",
	"讓我們聞聞你的腋窩",
	"一起去購物吧",
	"你能去丟垃圾嗎？",
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
	"那個髮型很適合你",
	"我喜歡你這一點",
	"你玩得開心的時候時間過得真快",
	"和你在一起我很安心",
	"你今天也表現得很棒啊，XX醬",
	"它看起來像一個遊戲，但它不是遊戲。",
	"我現在就上床睡覺",
	"你今晚怎麼樣",
];
const trans_DEFAULT_MESSAGE_LIST_IT = [
	"È pericoloso. Scappare velocemente.",
	"È uno tsunami. Corri verso un terreno più elevato.",
	"Ho bisogno di aiuto.",
	"Ci sono persone ferite. Chiami un'ambulanza.",
	"Qualcuno è incosciente. Chiami un'ambulanza.",
	"È un molestatore. Aiutatemi!",
	"Per favore, fai un bagno",
	"Annusiamo le tue ascelle",
	"Andiamo a fare shopping",
	"Potresti andare a buttare la spazzatura, per favore?",
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
	"Quella pettinatura ti dona",
	"Mi piace questo di te",
	"Il tempo vola quando ti diverti",
	"Mi sento a mio agio quando sono con te",
	"Anche oggi hai fatto un ottimo lavoro, XX-chan",
	"Sembra un gioco, ma non lo è.",
	"Sto andando a letto ora.",
	"Che ne dici di stasera?",
];
const trans_DEFAULT_MESSAGE_LIST_DE = [
	"Es ist gefährlich. Lauf schnell weg.",
	"Es ist ein Tsunami. Laufen Sie auf eine höhere Ebene.",
	"Ich brauche Hilfe.",
	"Es gibt Verletzte. Rufen Sie einen Krankenwagen.",
	"Jemand ist bewusstlos. Rufen Sie einen Krankenwagen.",
	"Er ist ein Kinderschänder. Hilf mir!",
	"Bitte nimm ein Bad",
	"Lass uns an deinen Achseln riechen",
	"Gehen wir einkaufen",
	"Könntest du bitte den Müll wegwerfen?",
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
	"Die Frisur steht dir",
	"Das mag ich an dir",
	"Die Zeit vergeht wie im Flug, wenn man Spaß hat",
	"Ich fühle mich wohl, wenn ich mit dir zusammen bin",
	"Du hast heute auch tolle Arbeit geleistet, XX-chan",
	"Es sieht aus wie ein Spiel, ist aber keins.",
	"Ich gehe jetzt ins Bett.",
	"Wie wäre es mit heute Nacht?",
];
const trans_DEFAULT_MESSAGE_LIST_ES = [
	"Es peligroso. Huye rápidamente.",
	"Es un tsunami. Corre a un lugar más alto.",
	"Necesito ayuda.",
	"Hay gente herida. Llame una ambulancia.",
	"Hay una persona inconsciente. Llame una ambulancia.",
	"Es un abusador. ¡Ayúdenme!",
	"Por favor toma un baño",
	"Olemos tus axilas",
	"Vamos de compras",
	"¿Podrías ir a tirar la basura?",
	"Está bien.",
	"Te da sueño",
	"Quiero estudiar y sacar buenas notas",
	"Me gusta trabajar en la empresa",
	"Encantado de conocerlo",
	"Buen día",
	"Hola",
	"Buenas noches",
	"Gracias",
	"Mucho tiempo sin verlo",
	"Ahora me voy a trabajar",
	"Voy a la escuela",
	"Cuidarse",
	"Estoy en casa",
	"Lo siento, estoy arrepentido",
	"Lo siento por eso",
	"¿Necesito ayuda?",
	"¿Estás preocupado por algo?",
	"No te presiones",
	"No te pongas nervioso",
	"No seas tímido",
	"No te intimidaré",
	"No tengas miedo",
	"Por favor calmate",
	"Hablemos conmigo",
	"Pensemos en ello juntos",
	"¿Tiene alguna queja?",
	"Por favor, ayúdame",
	"Por favor haz mi deseo realidad",
	"Enamórate de mi",
	"No es nada",
	"Vamos a comer ahora",
	"Te compraré una lata de jugo",
	"Vamos a un restaurante",
	"Te doy esto",
	"Estaba delicioso",
	"Fue muy divertido",
	"Fue muy bueno",
	"Estudia más y saca mejores notas",
	"Trabaja más duro y obtén mejores calificaciones",
	"Eso es genial",
	"Eres hermoso",
	"Tu eres un amigo",
	"La cremallera esta abierta",
	"Vamos a divertirnos hoy",
	"Hay comida en la mesa",
	"Hay comida en la nevera.",
	"Por favor ayúdame con las tareas del hogar",
	"Estoy cansado así que voy a descansar",
	"Ese peinado te queda bien",
	"Me gusta eso de ti",
	"El tiempo vuela cuando te diviertes",
	"Me siento a gusto contigo",
	"Tú también lo hiciste muy bien hoy, XX-chan",
	"Parece un juego, pero no lo es.",
	"Voy a dormir en la cama ahora",
	"Que tal esta noche",
];
const trans_DEFAULT_MESSAGE_LIST_RU = [
	"Это опасно. Беги быстро.",
	"Это цунами. Бегите на более высокое место.",
	"Мне нужна помощь.",
	"Есть пострадавшие. Вызовите скорую.",
	"Есть человек без сознания. Вызовите скорую",
	"Это коррупция. Помоги мне!",
	"Пожалуйста, прими ванну",
	"Давай понюхаем твои подмышки",
	"Пойдем по магазинам",
	"Не могли бы вы пойти и выбросить мусор?",
	"все нормально.",
	"ты становишься сонным",
	"Я хочу учиться и получать хорошие оценки",
	"Мне нравится работать в компании",
	"Рад встрече",
	"Доброе утро",
	"Привет",
	"Добрый вечер",
	"Спасибо",
	"Давно не виделись",
	"Я собираюсь работать сейчас",
	"Я иду в школу",
	"Заботиться",
	"Я дома",
	"Мне очень жаль, я раскаиваюсь",
	"Простите за это",
	"Нужна помощь?",
	"Вы о чем-то беспокоитесь?",
	"Не заставляйте себя",
	"Не нервничай",
	"Не стесняйся",
	"Я не буду запугивать тебя",
	"Не бойтесь",
	"Пожалуйста, успокойся",
	"Давай поговорим со мной",
	"Давайте подумаем об этом вместе",
	"Есть ли у вас жалобы?",
	"Пожалуйста, помогите мне",
	"Пожалуйста, исполни мое желание",
	"Влюбиться в меня",
	"Ничего",
	"Пойдем поедим сейчас",
	"Я куплю тебе банку сока.",
	"Пойдем в ресторан",
	"Я дам это тебе",
	"Было очень вкусно",
	"Это было так весело",
	"Это было очень хорошо",
	"Учитесь больше и получайте более высокие оценки",
	"Работайте усерднее и получайте более высокие оценки.",
	"Это круто",
	"Ты красивый",
	"Ты друг",
	"Молния открыта",
	"Давай повеселимся сегодня",
	"На столе есть еда",
	"В холодильнике есть еда",
	"Пожалуйста, помогите мне с работой по дому",
	"Я устал, поэтому собираюсь отдохнуть",
	"Тебе идет эта прическа",
	"Мне это в тебе нравится",
	"Время летит, когда тебе весело",
	"Мне легко, когда я с тобой",
	"Ты тоже отлично поработала сегодня, XX-тян",
	"Это похоже на игру, но это не игра.",
	"Я сейчас пойду спать в кровати",
	"Как насчет сегодняшнего вечера",
];

const trans_message_list = function(){
	// {{LANGUAGE_SPECIFIC}}
	switch (trans_currentLanguage){
	case 'ja-JP': // Japanese
		return trans_DEFAULT_MESSAGE_LIST_JA;
	case 'zh-CN': // Chinese (Simplified)
		return trans_DEFAULT_MESSAGE_LIST_ZH_CN;
	case 'zh-TW': // Chinese (Traditional)
		return trans_DEFAULT_MESSAGE_LIST_ZH_TW;
	case 'ko-KR': // Korean
		return trans_DEFAULT_MESSAGE_LIST_KO_KR;
	case 'it-IT': // Italian
		return trans_DEFAULT_MESSAGE_LIST_IT;
	case 'de-DE': // German
		return trans_DEFAULT_MESSAGE_LIST_DE;
	case 'es-ES': // Spanish
		return trans_DEFAULT_MESSAGE_LIST_ES;
	case 'ru-RU': // Russian
		return trans_DEFAULT_MESSAGE_LIST_RU;
	default: // English is default
		return trans_DEFAULT_MESSAGE_LIST_EN;
	}
}

// {{LANGUAGE_SPECIFIC}}
const trans_NOTICE_EN = `=========================
催眠くらくら
Hypnosis KraKra
=========================

"Hypnosis KraKra" is a full-fledged joke app equipped with 19 types of videos, 20 types of audio, microphone input, and face recognition.
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

- This software is a joke app, and there is no guarantee that it will work.
- This software may contain images that cause epilepsy. Epilepsy is a disease caused by abnormal electrical signals in the brain, and in the worst case, can lead to death. It is believed that young children, teenagers, and the elderly are more likely to develop epilepsy. Therefore, this software should never be used on these age groups.
- Do not use this app if your country, school, religion, or region prohibits hypnosis.
- Patients with acute schizophrenia are prohibited from using this app.
- Avoid driving a car or operating dangerous machinery immediately after use.
- Do not use this app if you suffer from phobia of clusters.
- If you experience symptoms such as headaches, dizziness, hyperventilation, nausea, gastrointestinal problems, or abnormal emotions, immediately discontinue use and consult a specialist.
- The operator may terminate this service at any time if a reason arises that makes it difficult to continue this service.
- Do not hypnotize others without their consent.
- This app is not for medical use. For sick people, we recommend standard medical treatment that is medically effective.
- This app is not for sleeping. If you are not feeling well, please refrain from using it.
- Hypnosis that tries to make the subject do things that they do not know the meaning or method of, or that are impossible to perform, is ineffective.
- If you use this app continuously for a long period of time, your device may become overheated.

[(How to use)]

- Basically, it is an application to enjoy looking at the screen.
- Tap the 'microphone' button to use the microphone (it needs permission).
- Tapping the 'musical note' button makes a sound.
- The 'bubble' button will display the message.
- The 'gear' button will open Configuration.
- When you run your finger on the screen, the screen sparks to attract their attention.

Copyright (c) 2022-2025 Katayama Hirofumi MZ
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

"최면 크라크라" 는 19종의 동영상, 20종의 오디오, 마이크 입력, 얼굴 인식 기능을 갖춘 본격적인 농담 앱입니다.
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
- 본 소프트웨어는 간질을 일으키는 영상을 포함할지도 모릅니다. 간질이란 뇌의 전기신호의 이상으로 인한 병이며, 최악의 경우 죽음에 이르게 됩니다.
- 귀하의 국가, 학교, 종교 및 지역이 최면을 금지하는 경우이 응용 프로그램을 사용하지 마십시오.
- 급성기 정신 분열증 환자는 사용 금지입니다.
- 사용 직후에는 자동차의 운전이나 위험이 있는 기계의 조작 등을 피해 주십시오.
- 집합체 공포증을 가진 사람은 사용하지 마십시오.
- 두통, 현기증, 과호흡, 메스꺼움, 위장 장애, 이상한 감정 등의 증상이 발생한 경우에는 신속하게 사용을 중지하고 전문의의 진단을 받으십시오.
- 운영자는 본 서비스의 계속이 곤란해지는 사유가 발생한 경우 언제든지 본 서비스를 종료할 수 있는 것으로 합니다.
- 타인에게 동의없이 최면을 걸지 마십시오.
- 이 앱은 의료용이 아닙니다. 아픈 사람에게는 의학적으로 효과가 있는 표준 의료를 권장합니다.
- 이 앱은 수면용이 아닙니다.
- 피험자가 의미나 방법을 모르는 것, 실행의 불가능한 일을 하려고 하는 최면은 효과가 없습니다.
- 본 앱을 장시간 연속 사용하면 단말기가 고열이 될 수 있습니다.

【사용법】

- 기본적으로 화면을보고 즐길 수있는 응용 프로그램입니다.
- '마이크' 버튼으로 마이크를 사용할 수 있습니다 (권한이 필요합니다).
- '음표' 버튼으로 소리가 울립니다.
- '버블'버튼에 메시지가 표시됩니다.
- "후키다시"버튼으로 메시지를 자동 음성으로 말합니다.
- '기어' 버튼으로 일반 설정을 할 수 있습니다.
- 화면을 손가락으로 추적하면 반짝임이 표시되어 상대방의 주의를 끌 수 있습니다.

Copyright (c) 2022-2025 Katayama Hirofumi MZ
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

「催眠くらくら」は、19種類の映像と20種類の音声、マイク入力、顔認証を搭載した本格的なジョークアプリです。
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

- このアプリ『催眠くらくら』（以下「本アプリ」と呼称します）はジョークアプリであり、動作は無保証です。
- 本アプリは、てんかんを引き起こす映像を含むかもしれません。てんかんとは、脳の電気信号の異常によって起こる病気であり、最悪の場合、死に至ります。幼児、思春期の若者、高齢者はてんかんを発症しやすいと考えられています。よって、これらの年齢層に本アプリを使用することは絶対にしないでください。
- あなたの国・学校・宗教・地域が催眠を禁じている場合は、本アプリを使用しないでください。
- 急性期の統合失調症患者は本アプリを使用してはいけません。
- 本アプリの使用中と使用直後は、自動車の運転や、危険の伴う機械の操作などを避けてください。
- 集合体恐怖症の人は本アプリを使用しないでください。
- 本アプリの使用に伴って、頭痛、めまい、過呼吸、吐き気、胃腸の不具合、異常な感情などの症状が生じた場合は、速やかに本アプリの使用を中止し、専門医の診断を受けてください。
- 運営者は、本アプリのサービスの継続が困難となる事由が生じた場合、いつでも本アプリのサービスを終了することができるものとします。
- 他人に同意なく催眠を掛けないでください。
- 本アプリは医療用ではありません。病気の人には医学的に効果のある標準医療を推奨します。
- 本アプリは睡眠用ではありません。体調がすぐれない人はご利用をひかえてください。
- 被験者が意味または方法を知らないこと、実行の不可能なことをさせようとする催眠は効果がありません。
- 本アプリを長時間連続して使用すると、端末が高熱になることがあります。

【使い方】

- 基本的に画面を見て楽しむためのアプリです。
- 「マイク」ボタンでマイクが使えます(権限が必要です)。
- 「音符」ボタンで音が鳴ります。
- 「ふきだし」ボタンでメッセージを表示します。
- 「歯車」ボタンで全般設定ができます。
- 画面を指でなぞると、きらめきが表示され、相手の注意を引くことができます。

Copyright (c) 2022-2025 Katayama Hirofumi MZ
Copyright (c) 2023 Murayama Akira
Copyright (c) 2023 TT
Copyright (c) 2021 Nenad Markuš
Copyright (c) 2018 Robert Eisele
`

// {{LANGUAGE_SPECIFIC}}
const trans_NOTICE_ZH_CN = `=========================
催眠克拉克拉
Hypnosis KraKra
=========================

《催眠克拉克拉》是一款成熟的笑话应用程序，配备19种视频、20种音频、麦克风输入和面部识别。
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

- 该软件是一个笑话应用程序，不能保证它会起作用。
- 该软件可能包含可能导致癫痫的图像。癫痫是一种由大脑异常电信号引起的疾病，严重时可能致命。人们认为幼儿、青少年和老年人更容易患上癫痫。因此，这个年龄段的人绝对不应该使用该软件。
- 如果您的国家、学校、宗教或地区禁止催眠，请不要使用此应用程序。
- 患有急性精神分裂症的患者不可以使用。
- 使用后立即避免驾驶汽车或操作危险机械。
- 如果您患有幽闭恐惧症，请勿使用。
- 如果您出现以下任何症状，请停止使用并咨询医疗专业人员：头痛、头晕、过度换气、恶心、胃肠道问题或情绪异常。
- 如果情况导致继续提供服务困难，运营商保留随时终止服务的权利。
- 未经他人同意，请勿对他人实施催眠。
- 此应用程序不可用于医疗用途。为患病者推荐医学上有效的标准护理。
- 此应用程序不适用于睡觉。如果您感觉不适，请不要使用该设施。
- 如果催眠试图让受试者做一些他不知道其意义或如何做，或不可能做的事情，那么催眠是不会起作用的。
- 如果您长时间连续使用此应用程序，您的设备可能会过热。

【如何使用】

- 基本上，它是一个享受观看屏幕的应用程序。
- 点击“麦克风”按钮使用麦克风（需要许可）。
- 点击“音符”按钮会发出声音。
- “气泡”按钮将显示消息。
- “齿轮”按钮将打开配置。
- 当你的手指在屏幕上运行时，屏幕会产生火花，吸引他们的注意力。

Copyright (c) 2022-2025 片山博文MZ
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

《催眠克拉克拉》是一款成熟的笑話應用程序，配備19種視頻、20種音頻、麥克風輸入和麵部識別。
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

- 該軟體是一個笑話應用程序，不能保證它會起作用。
- 該軟體可能包含可能導致癲癇的圖像。癲癇是一種由大腦異常電訊號引起的疾病，嚴重時可能致命。人們認為幼兒、青少年和老年人更容易患上癲癇。因此，這個年齡層的人絕對不應該使用該軟體。
- 如果您的國家、學校、宗教或地區禁止催眠，請不要使用此應用程式。
- 患有急性精神分裂症的患者不可以使用。
- 使用後立即避免駕駛汽車或操作危險機械。
- 若您患有幽閉恐懼症，請勿使用。
- 如果您有以下任何症狀，請停止使用並諮詢醫療專業人員：頭痛、頭暈、過度換氣、噁心、胃腸道問題或情緒異常。
- 如果情況導致繼續提供服務困難，營運商保留隨時終止服務的權利。
- 未經他人同意，請勿對他人實施催眠。
- 此應用程式不可用於醫療用途。為患病者推薦醫學上有效的標準護理。
- 此應用程式不適用於睡覺。如果您感覺不適，請不要使用該設施。
- 如果催眠試圖讓受試者做一些他不知道其意義或如何做，或不可能做的事情，那麼催眠是不會起作用的。
- 如果您長時間連續使用此應用程序，您的裝置可能會過熱。

【用法】

- 它基本上是一個欣賞屏幕的應用程序。
- 您可以通過“麥克風”按鈕使用麥克風（需要許可）。
- “音符”按鈕會發出聲音。
- “氣泡”按鈕將顯示消息。
- 用於常規設置的“齒輪”按鈕。
- 在屏幕上滑動手指即可顯示閃爍的光芒，吸引對手的注意力。

Copyright (c) 2022-2025 片山博文MZ
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

"Ipnosi KraKra" è un'app per scherzi completa dotata di 19 tipi di video, 20 tipi di audio, ingresso microfono e riconoscimento facciale.
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

- Questo software è un'app scherzosa e non vi è alcuna garanzia che funzioni.
- Questo software potrebbe contenere immagini che potrebbero causare epilessia. L'epilessia è una malattia causata da segnali elettrici anomali nel cervello e, nei casi gravi, può essere fatale. Si ritiene che i bambini piccoli, gli adolescenti e gli anziani siano più predisposti a sviluppare l'epilessia. Pertanto, questo software non dovrebbe mai essere utilizzato da persone di questa fascia d'età.
- Se l'ipnosi è proibita nel tuo Paese, nella tua scuola, nella tua religione o nella tua regione, ti preghiamo di non utilizzare questa app.
- Non adatto all'uso da parte di pazienti affetti da schizofrenia acuta.
- Subito dopo l'uso, evitare di guidare veicoli o di utilizzare macchinari pericolosi.
- Non utilizzare se si soffre di claustrofobia.
- Se si verifica uno qualsiasi dei seguenti sintomi, interrompere l'uso e consultare un medico: mal di testa, vertigini, iperventilazione, nausea, problemi gastrointestinali o emozioni anomale.
- L'Operatore si riserva il diritto di interrompere il Servizio in qualsiasi momento qualora le circostanze rendessero difficile la continuazione del Servizio.
- Non ipnotizzare gli altri senza il loro consenso.
- Questa app non è destinata all'uso medico. Consigliare cure standard efficaci dal punto di vista medico ai malati.
- Questa app non è adatta per dormire. Se non vi sentite bene, vi preghiamo di astenervi dall'utilizzare la struttura.
- L'ipnosi non funziona se cerca di indurre il soggetto a fare qualcosa di cui non sa il significato o come fare, oppure che è impossibile da realizzare.
- Se utilizzi questa app ininterrottamente per un lungo periodo di tempo, il tuo dispositivo potrebbe surriscaldarsi.

[(Come usare)]

- Fondamentalmente, è un'applicazione per divertirsi guardando lo schermo.
- Tocca il pulsante "microfono" per utilizzare il microfono (è necessaria l'autorizzazione).
- Toccando il pulsante 'nota musicale' si emette un suono.
- Il pulsante "Bubble" visualizzerà il messaggio.
- Il pulsante "ingranaggio" aprirà Configurazione.
- Quando fai scorrere il dito sullo schermo, lo schermo si illumina per attirare la loro attenzione.

Copyright (c) 2022-2025 Katayama Hirofumi MZ
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

„Hypnose KraKra“ ist eine vollwertige Scherz-App, die mit 19 Arten von Videos, 20 Arten von Audio, Mikrofoneingang und Gesichtserkennung ausgestattet ist.
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

- Diese Software ist eine Scherz-App und es gibt keine Garantie, dass sie funktioniert.
- Diese Software kann Bilder enthalten, die Epilepsie verursachen können. Epilepsie ist eine Krankheit, die durch abnorme elektrische Signale im Gehirn verursacht wird und in schweren Fällen tödlich sein kann. Kleine Kinder, Jugendliche und ältere Menschen gelten als anfälliger für die Entwicklung einer Epilepsie. Daher sollte diese Software niemals von Personen dieser Altersgruppe verwendet werden.
- Wenn Hypnose in Ihrem Land, Ihrer Schule, Religion oder Region verboten ist, verwenden Sie diese App bitte nicht.
- Nicht zur Anwendung bei Patienten mit akuter Schizophrenie.
- Vermeiden Sie unmittelbar nach der Anwendung das Autofahren oder die Bedienung gefährlicher Maschinen.
- Nicht verwenden, wenn Sie unter Klaustrophobie leiden.
- Wenn eines der folgenden Symptome bei Ihnen auftritt, beenden Sie die Anwendung und suchen Sie einen Arzt auf: Kopfschmerzen, Schwindel, Hyperventilation, Übelkeit, Magen-Darm-Probleme oder abnorme Emotionen.
- Der Betreiber behält sich das Recht vor, den Dienst jederzeit zu beenden, wenn die Umstände eine Fortsetzung des Dienstes erschweren.
- Hypnotisieren Sie andere nicht ohne deren Zustimmung.
- Diese App ist nicht für medizinische Zwecke bestimmt. Empfehlen Sie medizinisch wirksame Standardbehandlungen für Kranke.
- Diese App ist nicht zum Schlafen gedacht. Sollten Sie sich unwohl fühlen, bitten wir Sie, von der Nutzung der Anlage abzusehen.
- Hypnose funktioniert nicht, wenn sie versucht, den Probanden dazu zu bringen, etwas zu tun, dessen Bedeutung oder Vorgehensweise er nicht kennt oder was unmöglich auszuführen ist.
- Wenn Sie diese App über einen längeren Zeitraum ununterbrochen verwenden, kann Ihr Gerät überhitzen.

[(Wie benutzt man)]

- Im Grunde handelt es sich um eine Anwendung, mit der man gerne auf den Bildschirm schaut.
- Tippen Sie auf die Schaltfläche „Mikrofon“, um das Mikrofon zu verwenden (es erfordert eine Genehmigung).
- Durch Tippen auf die Schaltfläche „die Musiknote“ ertönt ein Ton.
- Die Schaltfläche "Blasen" zeigt die Nachricht an.
- Die Schaltfläche „Zahnrad“ öffnet die Konfiguration.
- Wenn Sie mit dem Finger über den Bildschirm fahren, erzeugt der Bildschirm Funken, um ihre Aufmerksamkeit zu erregen.

Copyright (c) 2022-2025 Katayama Hirofumi MZ
Copyright (c) 2023 Murayama Akira
Copyright (c) 2023 TT
Copyright (c) 2021 Nenad Markuš
Copyright (c) 2018 Robert Eisele
`

// {{LANGUAGE_SPECIFIC}}
const trans_NOTICE_ES = `=========================
Hipnótico KraKra
Hypnosis KraKra
=========================

"Hipnótico KraKra" es una aplicación de broma completa equipada con 19 tipos de vídeos, 20 tipos de audio, entrada de micrófono y reconocimiento facial.
Brindamos entretenimiento real donde podrás disfrutar de imágenes y sonidos hipnóticos.

- Muestra imágenes cautivadoras para llenar toda la pantalla. No hay anuncios molestos.
- Puedes fijar el objetivo con reconocimiento facial.
- La entrada de micrófono transmite su voz al objetivo.
- Agita las emociones de tu objetivo reproduciendo audio.
- Muestra el mensaje que deseas transmitir en la pantalla y la aplicación hablará.

* Fuente: https://github.com/katahiromz/KraKra_ja_jp
* Se utilizan algunos materiales de audio de OtoLogic.
* Se pueden realizar modificaciones libremente bajo la licencia Apache 2.0.

[(Precauciones de uso)]

- Este software es una aplicación de broma y no hay garantía de que funcione.
- Este software puede contener imágenes que pueden causar epilepsia. La epilepsia es una enfermedad causada por señales eléctricas anormales en el cerebro y, en casos graves, puede ser mortal. Se cree que los niños pequeños, los adolescentes y los ancianos son más susceptibles a desarrollar epilepsia. Por lo tanto, este software nunca debe ser utilizado por ninguna persona en este grupo de edad.
- Si la hipnosis está prohibida en tu país, escuela, religión o región, no uses esta aplicación.
- No debe utilizarse en pacientes con esquizofrenia aguda.
- Inmediatamente después de su uso, evite conducir un vehículo o manejar maquinaria peligrosa.
- No usar si sufre de claustrofobia.
- Si experimenta alguno de los siguientes síntomas, suspenda su uso y consulte a un profesional médico: dolor de cabeza, mareos, hiperventilación, náuseas, problemas gastrointestinales o emociones anormales.
- El Operador se reserva el derecho de terminar el Servicio en cualquier momento si las circunstancias dificultan la continuación del Servicio.
- No hipnotice a otros sin su consentimiento.
- Esta aplicación no es para uso médico. Recomendar cuidados estándar médicamente efectivos para aquellos que están enfermos.
- Esta aplicación no es para dormir. Si no se siente bien, absténgase de utilizar las instalaciones.
- La hipnosis no funciona si intenta que el sujeto haga algo que no sabe el significado o cómo hacer, o que es imposible de realizar.
- Si utiliza esta aplicación continuamente durante un largo periodo de tiempo, su dispositivo podría sobrecalentarse.

[(Cómo utilizar)]

- Esta es básicamente una aplicación para disfrutar viendo la pantalla.
- Puede utilizar el micrófono con el botón "Micrófono" (se requieren permisos).
- Presione el botón "la nota musical" para emitir un sonido.
- Mostrar un mensaje con el botón "bocadillo".
- Los ajustes generales se pueden realizar utilizando el botón "engranaje".
- Pasa el dedo por la pantalla y aparecerá un brillo para atraer la atención de la otra persona.

Copyright (c) 2022-2025 Katayama Hirofumi MZ
Copyright (c) 2023 Murayama Akira
Copyright (c) 2023 TT
Copyright (c) 2021 Nenad Markuš
Copyright (c) 2018 Robert Eisele
`

// {{LANGUAGE_SPECIFIC}}
const trans_NOTICE_RU = `=========================
Гипнотическая КраКра
Hypnosis KraKra
=========================

«Гипнотическая КраКра» — полноценное приложение-шутка, оснащенное 19 типами видео, 20 типами звука, микрофонным входом и распознаванием лиц.
Мы предоставляем настоящее развлечение, где вы сможете насладиться гипнотическими изображениями и звуками.

- Отображение захватывающих изображений на весь экран. Назойливой рекламы нет.
- Вы можете зафиксировать цель с помощью распознавания лиц.
- Вход микрофона доставляет ваш голос к цели.
- Встряхните эмоции цели, воспроизведя звук.
- Отобразите сообщение, которое вы хотите передать, на экране, и приложение само заговорит.

* Источник: https://github.com/kathiromz/KraKra_ja_jp.
* Использованы некоторые аудиоматериалы от OtoLogic.
* Изменения могут вноситься свободно по лицензии Apache 2.0.

[(Меры предосторожности при использовании)]

- Это программное обеспечение является шуточным приложением, и нет никаких гарантий, что оно будет работать.
- Данное программное обеспечение может содержать изображения, способные вызвать эпилепсию. Эпилепсия — это заболевание, вызванное аномальными электрическими сигналами в мозге, которое в тяжелых случаях может привести к летальному исходу. Считается, что маленькие дети, подростки и пожилые люди более подвержены развитию эпилепсии. Поэтому данное программное обеспечение ни в коем случае не должно использоваться лицами этой возрастной группы.
- Если гипноз запрещён в вашей стране, школе, религии или регионе, пожалуйста, не используйте это приложение.
- Не предназначено для пациентов с острой шизофренией.
- Сразу после использования воздержитесь от вождения автомобиля или управления опасными механизмами.
- Не используйте, если вы страдаете клаустрофобией.
- Если у вас возникнут какие-либо из следующих симптомов, прекратите использование и обратитесь к врачу: головная боль, головокружение, гипервентиляция, тошнота, желудочно-кишечные проблемы или ненормальные эмоции.
- Оператор оставляет за собой право прекратить оказание Услуги в любое время, если обстоятельства затрудняют продолжение оказания Услуги.
- Не гипнотизируйте других без их согласия.
- Это приложение не предназначено для медицинского использования. Рекомендовать эффективные с медицинской точки зрения стандартные методы лечения для больных.
- Это приложение не для сна. Если вы плохо себя чувствуете, пожалуйста, воздержитесь от посещения учреждения.
- Гипноз не работает, если он пытается заставить субъекта сделать что-то, смысла или способа сделать что-то, что он не знает, или что невозможно выполнить.
- Если вы используете это приложение непрерывно в течение длительного периода времени, ваше устройство может перегреться.

[(Как использовать)]

- По сути, это приложение для удовольствия от просмотра экрана.
- Вы можете использовать микрофон с помощью кнопки «Микрофон» (требуются разрешения).
- Нажмите кнопку «музыкальная нота», чтобы издать звук.
- Отображение сообщения с помощью кнопки «речевой пузырь».
- Общие настройки можно произвести с помощью кнопки «шестеренка».
- Проведите пальцем по экрану, и появится искорка, привлекающая внимание собеседника.

Copyright (c) 2022-2025 Katayama Hirofumi MZ
Copyright (c) 2023 Murayama Akira
Copyright (c) 2023 TT
Copyright (c) 2021 Nenad Markuš
Copyright (c) 2018 Robert Eisele
`
// {{LANGUAGE_SPECIFIC}}
trans_trans = {
	'ja-JP': { // Japanese
		'TEXT_OK': 'OK',
		'TEXT_CANCEL': 'キャンセル',
		'TEXT_YES': 'はい',
		'TEXT_NO': 'いいえ',
		'TEXT_CHOOSE_LANGUAGE': '言語選択 (Choose a language)',
		'TEXT_ABOUT_APP': 'バージョン情報',
		'TEXT_INIT_APP': 'このアプリを初期化しますか？',
		'TEXT_INITTED_APP': 'アプリを初期化しました。',
		'TEXT_INPUT_MESSAGE': 'メッセージ文字列を入力してください。',
		'TEXT_FULLWIDTH_SPACE': '　',
		'TEXT_PERIOD': '。',
		'TEXT_PERIOD_SPACE': '。',
		'TEXT_RELEASE_HYPNOSIS': '催眠解除',
		'TEXT_HYPNOSIS_RELEASED': '催眠解除。',
		'TEXT_KILLING_HYPNOSIS_IMG': 'img/killing-hypnosis_ja.svg',
		'TEXT_HYPNOSIS_RELEASED_IMG': 'img/hypnosis-released_ja.svg',
		'TEXT_ALL_RELEASED_IMG': 'img/all-released_ja.svg',
		'TEXT_NO_BLINKING': '点滅なし',
		'TEXT_LOGO': 'img/logo_ja.svg',
		'TEXT_TAP_HERE': 'img/please-tap-here_ja.svg',
		'TEXT_MP3_RELEASED_HYPNOSIS': 'sn/ReleasedHypnosis_ja.mp3',
		'TEXT_I_AGREE': '私は同意します',
		'TEXT_SIZE_SMALL': '小さい',
		'TEXT_SIZE_NORMAL': '普通',
		'TEXT_SIZE_LARGE': '大きい',
		'TEXT_SIZE_HUGE': '巨大',
		'TEXT_SPEED_ZERO': '停止',
		'TEXT_SPEED_SLOW': '遅い',
		'TEXT_SPEED_NORMAL': '普通',
		'TEXT_SPEED_FAST': '速い',
		'TEXT_SPEED_SUPER_FAST': '超速い',
		'TEXT_SPEED_IRREGULAR': '不規則',
		'TEXT_RAINBOW': '虹色',
		'TEXT_FACE_GETTER': '顔認識',
		'TEXT_TAP_ON_TARGET': 'ターゲットをタップしてください',
		'TEXT_CAN_LOCK_ON': 'ロックオンできます',
		'TEXT_CANT_FIND_FACE': '顔が見つかりません',
		'TEXT_LOCK_ON': 'ロックオン',
		'TEXT_UNLOCK': 'ロック解除',
		'TEXT_GO_BACK': '戻る',
		'TEXT_NO_WEBCONNECT': 'ネット接続が利用できません',
		'TEXT_INPUTMESSAGE': 'メッセージを入力',
		'TEXT_NOTICE': trans_NOTICE_JA,
		'TEXT_LANGUAGE': '言語 (Language):',
		'TEXT_LANGUAGE_ZH_CN': 'Chinese (Simplified) (简体中文)',
		'TEXT_LANGUAGE_ZH_TW': 'Chinese (Traditional) (繁體中文)',
		'TEXT_LANGUAGE_EN': 'English (英語)',
		'TEXT_LANGUAGE_ES': 'Spanish (Español)',
		'TEXT_LANGUAGE_DE': 'German (Deutsch)',
		'TEXT_LANGUAGE_IT': 'Italian (Italiano)',
		'TEXT_LANGUAGE_JA_JP': 'Japanese (日本語)',
		'TEXT_LANGUAGE_KO_KR': 'Korean (한국어)',
		'TEXT_LANGUAGE_RU': 'Russian (Русский)',
		'TEXT_PIC_TYPE': '映像の種類:',
		'TEXT_PIC_0': '動画 0：ダミー画面（練習用）',
		'TEXT_PIC_1': '動画 1：対数らせん',
		'TEXT_PIC_2': '動画 2：同心円状',
		'TEXT_PIC_3': '動画 3：目が回る',
		'TEXT_PIC_4': '動画 4：アルキメデスのらせん',
		'TEXT_PIC_5': '動画 5：広がるハート',
		'TEXT_PIC_6': '動画 6：五円玉',
		'TEXT_PIC_7': '動画 7：奇妙な渦巻き',
		'TEXT_PIC_8': '動画 8：クレージーな色',
		'TEXT_PIC_9': '動画 9：対数らせん 2',
		'TEXT_PIC_10': '動画 10：アナログディスク',
		'TEXT_PIC_11': '動画 11：奇妙な渦巻き 2',
		'TEXT_PIC_12': '動画 12：万華鏡',
		'TEXT_PIC_13': '動画 13：1番目の色の画面',
		'TEXT_PIC_14': '動画 14：2番目の色の画面',
		'TEXT_PIC_15': '動画 15：ただの黒い画面',
		'TEXT_PIC_16': '動画 16：ただの白い画面',
		'TEXT_PIC_17': '動画 17：ヘビの回転',
		'TEXT_PIC_18': '動画 18：ひずみ放射',
		'TEXT_PIC_19': '動画 19：ランダムな波',
		'TEXT_SPLIT': '画面分割:',
		'TEXT_SPEED': 'スピード:',
		'TEXT_ROTATION': '逆再生:',
		'TEXT_VORTEX_DIRECTION': '渦の向き:',
		'TEXT_BLINKING': '画面点滅:',
		'TEXT_FULLSCREN_MODE': 'フルスクリーン モード:',
		'TEXT_MESSAGE': 'メッセージ',
		'TEXT_RESET': 'リセット',
		'TEXT_MESSAGE_SIZE': 'メッセージの大きさ:',
		'TEXT_NOTE': '音符ボタン:',
		'TEXT_MOTION_BLUR': 'モーション ブラー:',
		'TEXT_NONE': '(なし)',
		'TEXT_SOUND_CATTISH': 'ネコっぽい',
		'TEXT_SOUND_HORROR': '恐怖',
		'TEXT_SOUND_HUNTING': '狩人',
		'TEXT_SOUND_LONGING': 'あこがれ',
		'TEXT_SOUND_LOVELY': '愛らしい',
		'TEXT_SOUND_MAGIC': '魔術',
		'TEXT_SOUND_ORA_SAIMIN': 'おら! 催眠!',
		'TEXT_SOUND_NOISE': '雑音',
		'TEXT_SOUND_432HZ': '432Hz±4Hz',
		'TEXT_SOUND_HELI': 'ヘリコプター',
		'TEXT_SOUND_PACHI': 'パチ',
		'TEXT_SOUND_WAHWAH': 'ワウワウ',
		'TEXT_SOUND_MECHANICAL': '機械音',
		'TEXT_SOUND_WATER_DROP': '水の音',
		'TEXT_SOUND_PSYCHO': '猟奇',
		'TEXT_SOUND_MYANMYAN': 'みゃんみゃん',
		'TEXT_SOUND_PATROL': 'パトロール',
		'TEXT_SOUND_SPIRAL': 'スパイラル',
		'TEXT_SOUND_VOLUME': '音量:',
		'TEXT_SOUND_AUTO_PLAY': '音声の自動再生:',
		'TEXT_SOUND_AUTO_REPEAT': '音声の自動繰り返し:',
		'TEXT_SOUND_SWITCH': '切り替え音:',
		'TEXT_BRIGHTNESS': '画面の明るさ:',
		'TEXT_BRIGHTNESS_NORMAL': '普通',
		'TEXT_BRIGHTNESS_BRIGHTER': '明るくする',
		'TEXT_CLOCKWISE': '時計回り',
		'TEXT_COUNTERCLOCKWISE': '反時計回り',
		'TEXT_CONFIG': '設定',
		'TEXT_MESSAGE_TEXT': 'メッセージ テキスト:',
		'TEXT_MESSAGE_BUTTON': 'メッセージ...',
		'TEXT_START_HYPNOSIS': '<nobr>催眠</nobr><nobr>スタート</nobr>',
		'TEXT_RELEASE_HYPNOSIS_BUTTON': '催眠解除',
		'TEXT_COUNT_DOWN': 'カウントダウン:',
		'TEXT_ARROWS': '矢印:',
		'TEXT_MESSAGE_SPEECH_LABEL': 'メッセージをしゃべる:',
		'TEXT_MESSAGE_SPEECH': 'メッセージをしゃべる',
		'TEXT_COLOR_1ST': '1番目の色:',
		'TEXT_COLOR_2ND': '2番目の色:',
		'TEXT_INIT_APP_BUTTON': '初期化',
		'TEXT_MESSAGE_VOLUME': 'メッセージボイスの音量:',
		'TEXT_MESSAGE_SKIN': 'スキン:',
		'TEXT_VIBRATOR': '振動:',
		'TEXT_VIBRATOR_START_STOP': '開始 / 停止',
		'TEXT_GOLDEN': '金色',
		'TEXT_PURPLE': '紫色',
		'TEXT_BLUE': '青色',
		'TEXT_PINK': 'ピンク色',
		'TEXT_DARKGREEN': '深緑色',
		'TEXT_RED': '赤色',
		'TEXT_BLACK': '黒色',
		'TEXT_WHITE': '白色',
	},
	'zh-CN': { // Chinese (Simplified)
		'TEXT_OK': '確定',
		'TEXT_CANCEL': '取消',
		'TEXT_YES': '是',
		'TEXT_NO': '否',
		'TEXT_CHOOSE_LANGUAGE': '语言选择 (Choose a language)',
		'TEXT_ABOUT_APP': '关于这个应用程序',
		'TEXT_INIT_APP': '您想初始化这个应用程序吗？',
		'TEXT_INITTED_APP': '初始化了应用程序。',
		'TEXT_INPUT_MESSAGE': '请输入消息文本。',
		'TEXT_FULLWIDTH_SPACE': '　',
		'TEXT_PERIOD': '。',
		'TEXT_PERIOD_SPACE': '。',
		'TEXT_RELEASE_HYPNOSIS': '去催眠',
		'TEXT_HYPNOSIS_RELEASED': '我取消了催眠。',
		'TEXT_KILLING_HYPNOSIS_IMG': 'img/killing-hypnosis_zh-CN.svg',
		'TEXT_HYPNOSIS_RELEASED_IMG': 'img/hypnosis-released_zh-CN.svg',
		'TEXT_ALL_RELEASED_IMG': 'img/all-released_zh-CN.svg',
		'TEXT_NO_BLINKING': '无闪光灯',
		'TEXT_LOGO': 'img/logo_zh-CN.svg',
		'TEXT_TAP_HERE': 'img/please-tap-here_zh-CN.svg',
		'TEXT_MP3_RELEASED_HYPNOSIS': 'sn/ReleasedHypnosis_zh-CN.mp3',
		'TEXT_I_AGREE': '我同意',
		'TEXT_SIZE_SMALL': '小的',
		'TEXT_SIZE_NORMAL': '普通的',
		'TEXT_SIZE_LARGE': '大的',
		'TEXT_SIZE_HUGE': '巨大的',
		'TEXT_SPEED_ZERO': '停止',
		'TEXT_SPEED_SLOW': '慢的',
		'TEXT_SPEED_NORMAL': '普通的',
		'TEXT_SPEED_FAST': '快速地',
		'TEXT_SPEED_SUPER_FAST': '超级快',
		'TEXT_SPEED_IRREGULAR': '不规律的',
		'TEXT_RAINBOW': '彩虹色',
		'TEXT_FACE_GETTER': '人脸识别',
		'TEXT_TAP_ON_TARGET': '请点击目标',
		'TEXT_CAN_LOCK_ON': '可以锁定',
		'TEXT_CANT_FIND_FACE': '未找到面孔',
		'TEXT_LOCK_ON': '锁上',
		'TEXT_UNLOCK': '开锁',
		'TEXT_GO_BACK': '返回',
		'TEXT_NO_WEBCONNECT': '无法连接互联网。',
		'TEXT_INPUTMESSAGE': '输入您的留言',
		'TEXT_NOTICE': trans_NOTICE_ZH_CN,
		'TEXT_LANGUAGE': '语言 (Language):',
		'TEXT_LANGUAGE_ZH_CN': 'Chinese (Simplified) (简体中文)',
		'TEXT_LANGUAGE_ZH_TW': 'Chinese (Traditional) (繁體中文)',
		'TEXT_LANGUAGE_EN': 'English (英语)',
		'TEXT_LANGUAGE_ES': 'Spanish (Español)',
		'TEXT_LANGUAGE_DE': 'German (Deutsch)',
		'TEXT_LANGUAGE_IT': 'Italian (Italiano)',
		'TEXT_LANGUAGE_JA_JP': 'Japanese (日本語)',
		'TEXT_LANGUAGE_KO_KR': 'Korean (한국어)',
		'TEXT_LANGUAGE_RU': 'Russian (Русский)',
		'TEXT_PIC_TYPE': '视频类型：',
		'TEXT_PIC_0': '电影0：虚拟屏幕（用于练习）',
		'TEXT_PIC_1': '电影1：对数螺线',
		'TEXT_PIC_2': '电影2：同心圆',
		'TEXT_PIC_3': '电影3：旋转的眼',
		'TEXT_PIC_4': '电影4：阿基米德螺旋线',
		'TEXT_PIC_5': '电影5：扩展的心',
		'TEXT_PIC_6': '电影6：5日元硬币',
		'TEXT_PIC_7': '电影7：奇怪的漩涡',
		'TEXT_PIC_8': '电影8：疯狂的颜色',
		'TEXT_PIC_9': '电影9：对数螺线 2',
		'TEXT_PIC_10': '电影10：模拟光盘',
		'TEXT_PIC_11': '电影11：奇怪的漩涡 2',
		'TEXT_PIC_12': '电影12：万花筒',
		'TEXT_PIC_13': '电影13：第一个彩色屏幕',
		'TEXT_PIC_14': '电影14：第二个彩色屏幕',
		'TEXT_PIC_15': '电影15：只是黑屏',
		'TEXT_PIC_16': '电影16：只是白屏',
		'TEXT_PIC_17': '电影17：旋转蛇',
		'TEXT_PIC_18': '电影18：畸变辐射',
		'TEXT_PIC_19': '电影19：随机波',
		'TEXT_SPLIT': '分屏：',
		'TEXT_SPEED': '速度：',
		'TEXT_ROTATION': '倒放：',
		'TEXT_VORTEX_DIRECTION': '涡流方向：',
		'TEXT_BLINKING': '屏幕闪烁：',
		'TEXT_FULLSCREN_MODE': '全屏模式：',
		'TEXT_MESSAGE': '信息',
		'TEXT_RESET': '重置',
		'TEXT_MESSAGE_SIZE': '消息大小：',
		'TEXT_NOTE': '声音按钮：',
		'TEXT_MOTION_BLUR': '运动模糊：',
		'TEXT_NONE': '(无)',
		'TEXT_SOUND_CATTISH': '像猫一样',
		'TEXT_SOUND_HORROR': '害怕',
		'TEXT_SOUND_HUNTING': '猎人',
		'TEXT_SOUND_LONGING': '渴望',
		'TEXT_SOUND_LOVELY': '可爱的',
		'TEXT_SOUND_MAGIC': '巫术',
		'TEXT_SOUND_ORA_SAIMIN': '天啊！ 催眠！',
		'TEXT_SOUND_NOISE': '噪音',
		'TEXT_SOUND_432HZ': '432Hz±4Hz',
		'TEXT_SOUND_HELI': '直升机',
		'TEXT_SOUND_PACHI': '弹珠',
		'TEXT_SOUND_WAHWAH': '哇哇',
		'TEXT_SOUND_MECHANICAL': '机械声',
		'TEXT_SOUND_WATER_DROP': '水声',
		'TEXT_SOUND_PSYCHO': '惊魂记',
		'TEXT_SOUND_MYANMYAN': '缅缅',
		'TEXT_SOUND_PATROL': '巡逻',
		'TEXT_SOUND_SPIRAL': '螺旋',
		'TEXT_SOUND_VOLUME': '音量：',
		'TEXT_SOUND_AUTO_PLAY': '自动播放音频：',
		'TEXT_SOUND_AUTO_REPEAT': '自动重复音频：',
		'TEXT_SOUND_SWITCH': '切换声音：',
		'TEXT_BRIGHTNESS': '屏幕亮度：',
		'TEXT_BRIGHTNESS_NORMAL': '通常',
		'TEXT_BRIGHTNESS_BRIGHTER': '明亮',
		'TEXT_CLOCKWISE': '顺时针',
		'TEXT_COUNTERCLOCKWISE': '逆时针',
		'TEXT_CONFIG': '配置',
		'TEXT_MESSAGE_TEXT': '留言内容：',
		'TEXT_MESSAGE_BUTTON': '信息...',
		'TEXT_START_HYPNOSIS': '<nobr>开始</nobr><nobr>催眠</nobr>',
		'TEXT_RELEASE_HYPNOSIS_BUTTON': '释放催眠',
		'TEXT_COUNT_DOWN': '倒数：',
		'TEXT_ARROWS': '箭：',
		'TEXT_MESSAGE_SPEECH_LABEL': '留言演讲：',
		'TEXT_MESSAGE_SPEECH': '留言演讲',
		'TEXT_COLOR_1ST': '第一种颜色：',
		'TEXT_COLOR_2ND': '第二种颜色：',
		'TEXT_INIT_APP_BUTTON': '初始化',
		'TEXT_MESSAGE_VOLUME': '留言音量：',
		'TEXT_MESSAGE_SKIN': '皮肤：',
		'TEXT_VIBRATOR': '振动器：',
		'TEXT_VIBRATOR_START_STOP': '开始 / 停止',
		'TEXT_GOLDEN': '金的',
		'TEXT_PURPLE': '紫色的',
		'TEXT_BLUE': '蓝色的',
		'TEXT_PINK': '粉色',
		'TEXT_DARKGREEN': '深绿色',
		'TEXT_RED': '红色的',
		'TEXT_BLACK': '黑色',
		'TEXT_WHITE': '白色的',
	},
	'zh-TW': { // Chinese (Traditional)
		'TEXT_OK': '確定',
		'TEXT_CANCEL': '取消',
		'TEXT_YES': '是',
		'TEXT_NO': '否',
		'TEXT_CHOOSE_LANGUAGE': '語言選擇 (Choose a language)',
		'TEXT_ABOUT_APP': '版本信息',
		'TEXT_INIT_APP': '您想初始化這個應用程式嗎？',
		'TEXT_INITTED_APP': '初始化了應用程序。',
		'TEXT_INPUT_MESSAGE': '請輸入消息字符串。',
		'TEXT_FULLWIDTH_SPACE': '　',
		'TEXT_PERIOD': '。',
		'TEXT_PERIOD_SPACE': '。',
		'TEXT_RELEASE_HYPNOSIS': '催眠釋放',
		'TEXT_HYPNOSIS_RELEASED': '催眠釋放。',
		'TEXT_KILLING_HYPNOSIS_IMG': 'img/killing-hypnosis_zh-TW.svg',
		'TEXT_HYPNOSIS_RELEASED_IMG': 'img/hypnosis-released_zh-TW.svg',
		'TEXT_ALL_RELEASED_IMG': 'img/all-released_zh-TW.svg',
		'TEXT_NO_BLINKING': '無閃光燈',
		'TEXT_LOGO': 'img/logo_zh-TW.svg',
		'TEXT_TAP_HERE': 'img/please-tap-here_zh-TW.svg',
		'TEXT_MP3_RELEASED_HYPNOSIS': 'sn/ReleasedHypnosis_zh-TW.mp3',
		'TEXT_I_AGREE': '我同意',
		'TEXT_SIZE_SMALL': '小的',
		'TEXT_SIZE_NORMAL': '普通的',
		'TEXT_SIZE_LARGE': '大的',
		'TEXT_SIZE_HUGE': '巨大的',
		'TEXT_SPEED_ZERO': '停止',
		'TEXT_SPEED_SLOW': '慢的',
		'TEXT_SPEED_NORMAL': '普通的',
		'TEXT_SPEED_FAST': '快速地',
		'TEXT_SPEED_SUPER_FAST': '超快',
		'TEXT_SPEED_IRREGULAR': '不規律的',
		'TEXT_RAINBOW': '彩虹色',
		'TEXT_FACE_GETTER': '人臉辨識',
		'TEXT_TAP_ON_TARGET': '請點選目標',
		'TEXT_CAN_LOCK_ON': '可以鎖定',
		'TEXT_CANT_FIND_FACE': '未找到臉孔',
		'TEXT_LOCK_ON': '鎖上',
		'TEXT_UNLOCK': '開鎖',
		'TEXT_GO_BACK': '返回',
		'TEXT_NO_WEBCONNECT': '無法連接網路。',
		'TEXT_INPUTMESSAGE': '輸入您的留言',
		'TEXT_NOTICE': trans_NOTICE_ZH_TW,
		'TEXT_LANGUAGE': '語言 (Language):',
		'TEXT_LANGUAGE_ZH_CN': 'Chinese (Simplified) (简体中文)',
		'TEXT_LANGUAGE_ZH_TW': 'Chinese (Traditional) (繁體中文)',
		'TEXT_LANGUAGE_EN': 'English (英語)',
		'TEXT_LANGUAGE_ES': 'Spanish (Español)',
		'TEXT_LANGUAGE_DE': 'German (Deutsch)',
		'TEXT_LANGUAGE_IT': 'Italian (Italiano)',
		'TEXT_LANGUAGE_JA_JP': 'Japanese (日本語)',
		'TEXT_LANGUAGE_KO_KR': 'Korean (한국어)',
		'TEXT_LANGUAGE_RU': 'Russian (Русский)',
		'TEXT_PIC_TYPE': '視頻類型：',
		'TEXT_PIC_0': '電影0：虛擬螢幕（用於練習）',
		'TEXT_PIC_1': '電影1：對數螺線',
		'TEXT_PIC_2': '電影2：同心圆',
		'TEXT_PIC_3': '電影3：旋轉的眼',
		'TEXT_PIC_4': '電影4：阿基米德螺旋線',
		'TEXT_PIC_5': '電影5：擴展的心',
		'TEXT_PIC_6': '電影6：5日元硬幣',
		'TEXT_PIC_7': '電影7：奇怪的漩渦',
		'TEXT_PIC_8': '電影8：瘋狂的顏色',
		'TEXT_PIC_9': '電影9：對數螺線 2',
		'TEXT_PIC_10': '電影10：類比光碟',
		'TEXT_PIC_11': '電影11：奇怪的漩渦 2',
		'TEXT_PIC_12': '電影12：萬花筒',
		'TEXT_PIC_13': '電影13：第一个彩色屏幕',
		'TEXT_PIC_14': '電影14：第二个彩色屏幕',
		'TEXT_PIC_15': '電影15：只是黑屏',
		'TEXT_PIC_16': '電影16：只是白屏',
		'TEXT_PIC_17': '電影17：旋轉蛇',
		'TEXT_PIC_18': '電影18：畸變輻射',
		'TEXT_PIC_19': '電影19：隨機波',
		'TEXT_SPLIT': '分屏：',
		'TEXT_SPEED': '速度：',
		'TEXT_ROTATION': '倒放：',
		'TEXT_VORTEX_DIRECTION': '渦流方向：',
		'TEXT_BLINKING': '螢幕閃爍：',
		'TEXT_FULLSCREN_MODE': '全螢幕模式：',
		'TEXT_MESSAGE': '資訊',
		'TEXT_RESET': '重置',
		'TEXT_MESSAGE_SIZE': '消息大小：',
		'TEXT_NOTE': '聲音按鈕：',
		'TEXT_MOTION_BLUR': '運動模糊：',
		'TEXT_NONE': '(無)',
		'TEXT_SOUND_CATTISH': '像貓一樣',
		'TEXT_SOUND_HORROR': '害怕',
		'TEXT_SOUND_HUNTING': '獵人',
		'TEXT_SOUND_LONGING': '渴望',
		'TEXT_SOUND_LOVELY': '可愛的',
		'TEXT_SOUND_MAGIC': '巫術',
		'TEXT_SOUND_ORA_SAIMIN': '天啊！ 催眠！',
		'TEXT_SOUND_NOISE': '噪音',
		'TEXT_SOUND_432HZ': '432Hz±4Hz',
		'TEXT_SOUND_HELI': '直升機',
		'TEXT_SOUND_PACHI': '彈珠',
		'TEXT_SOUND_WAHWAH': '哇哇',
		'TEXT_SOUND_MECHANICAL': '機械聲',
		'TEXT_SOUND_WATER_DROP': '水聲',
		'TEXT_SOUND_PSYCHO': '驚魂記',
		'TEXT_SOUND_MYANMYAN': '緬緬',
		'TEXT_SOUND_PATROL': '巡邏',
		'TEXT_SOUND_SPIRAL': '螺旋',
		'TEXT_SOUND_VOLUME': '音量：',
		'TEXT_SOUND_AUTO_PLAY': '自動播放音訊：',
		'TEXT_SOUND_AUTO_REPEAT': '自動重複音訊：',
		'TEXT_SOUND_SWITCH': '切換聲音：',
		'TEXT_BRIGHTNESS': '屏幕亮度：',
		'TEXT_BRIGHTNESS_NORMAL': '正常亮度',
		'TEXT_BRIGHTNESS_BRIGHTER': '提亮',
		'TEXT_CLOCKWISE': '順時針',
		'TEXT_COUNTERCLOCKWISE': '逆時針',
		'TEXT_CONFIG': '配置',
		'TEXT_MESSAGE_TEXT': '留言內容：',
		'TEXT_MESSAGE_BUTTON': '訊息...',
		'TEXT_START_HYPNOSIS': '<nobr>開始</nobr><nobr>催眠</nobr>',
		'TEXT_RELEASE_HYPNOSIS_BUTTON': '釋放催眠',
		'TEXT_COUNT_DOWN': '倒數：',
		'TEXT_ARROWS': '箭頭：',
		'TEXT_MESSAGE_SPEECH_LABEL': '留言演講：',
		'TEXT_MESSAGE_SPEECH': '留言演講',
		'TEXT_COLOR_1ST': '第一種顏色：',
		'TEXT_COLOR_2ND': '第二種顏色：',
		'TEXT_INIT_APP_BUTTON': '初始化',
		'TEXT_MESSAGE_VOLUME': '留言音量：',
		'TEXT_MESSAGE_SKIN': '皮膚：',
		'TEXT_VIBRATOR': '振動器：',
		'TEXT_VIBRATOR_START_STOP': '開始 / 停止',
		'TEXT_GOLDEN': '金的',
		'TEXT_PURPLE': '紫色的',
		'TEXT_BLUE': '藍色的',
		'TEXT_PINK': '粉紅色',
		'TEXT_DARKGREEN': '深綠色',
		'TEXT_RED': '紅色的',
		'TEXT_BLACK': '黑色',
		'TEXT_WHITE': '白色的',
	},
	'ko-KR': { // Korean
		'TEXT_OK': 'OK',
		'TEXT_CANCEL': '취소',
		'TEXT_YES': '예',
		'TEXT_NO': '아니오',
		'TEXT_CHOOSE_LANGUAGE': '언어 선택 (Choose a language)',
		'TEXT_ABOUT_APP': '버전 정보',
		'TEXT_INIT_APP': '이 앱을 초기화하시겠습니까?',
		'TEXT_INITTED_APP': '앱을 초기화했습니다.',
		'TEXT_INPUT_MESSAGE': '메시지 문자열을 입력하십시오.',
		'TEXT_FULLWIDTH_SPACE': '　',
		'TEXT_PERIOD': '. ',
		'TEXT_PERIOD_SPACE': '. ',
		'TEXT_RELEASE_HYPNOSIS': '최면 해제',
		'TEXT_HYPNOSIS_RELEASED': '최면 해제.',
		'TEXT_KILLING_HYPNOSIS_IMG': 'img/killing-hypnosis_ko-KR.svg',
		'TEXT_HYPNOSIS_RELEASED_IMG': 'img/hypnosis-released_ko-KR.svg',
		'TEXT_ALL_RELEASED_IMG': 'img/all-released_ko-KR.svg',
		'TEXT_NO_BLINKING': '깜박임 없음',
		'TEXT_LOGO': 'img/logo_ko-KR.svg',
		'TEXT_TAP_HERE': 'img/please-tap-here_ko-KR.svg',
		'TEXT_MP3_RELEASED_HYPNOSIS': 'sn/ReleasedHypnosis_ko-KR.mp3',
		'TEXT_I_AGREE': '동의합니다',
		'TEXT_SIZE_SMALL': '작은',
		'TEXT_SIZE_NORMAL': '정상',
		'TEXT_SIZE_LARGE': '크기가 큰',
		'TEXT_SIZE_HUGE': '거대한',
		'TEXT_SPEED_ZERO': '정지중',
		'TEXT_SPEED_SLOW': '느린',
		'TEXT_SPEED_NORMAL': '정상',
		'TEXT_SPEED_FAST': '빠른',
		'TEXT_SPEED_SUPER_FAST': '매우 빠른',
		'TEXT_SPEED_IRREGULAR': '불규칙한',
		'TEXT_RAINBOW': '무지개 색',
		'TEXT_FACE_GETTER': '얼굴 인식',
		'TEXT_TAP_ON_TARGET': '타겟을 탭해주세요',
		'TEXT_CAN_LOCK_ON': '잠글 수 있습니다',
		'TEXT_CANT_FIND_FACE': '얼굴을 찾을 수 없음',
		'TEXT_LOCK_ON': '잠금',
		'TEXT_UNLOCK': '잠금 해제',
		'TEXT_GO_BACK': '뒤로',
		'TEXT_NO_WEBCONNECT': '인터넷 연결을 사용할 수 없습니다.',
		'TEXT_INPUTMESSAGE': '메시지 입력',
		'TEXT_NOTICE': trans_NOTICE_KO_KR,
		'TEXT_LANGUAGE': '언어 (Language):',
		'TEXT_LANGUAGE_ZH_CN': 'Chinese (Simplified) (简体中文)',
		'TEXT_LANGUAGE_ZH_TW': 'Chinese (Traditional) (繁體中文)',
		'TEXT_LANGUAGE_EN': 'English (영어)',
		'TEXT_LANGUAGE_ES': 'Spanish (Español)',
		'TEXT_LANGUAGE_DE': 'German (Deutsch)',
		'TEXT_LANGUAGE_IT': 'Italian (Italiano)',
		'TEXT_LANGUAGE_JA_JP': 'Japanese (日本語)',
		'TEXT_LANGUAGE_KO_KR': 'Korean (한국어)',
		'TEXT_LANGUAGE_RU': 'Russian (Русский)',
		'TEXT_PIC_TYPE': '그림 유형:',
		'TEXT_PIC_0': '동영상 0：더미 화면 (연습용)',
		'TEXT_PIC_1': '동영상 1：로그 나선',
		'TEXT_PIC_2': '동영상 2：동심원형',
		'TEXT_PIC_3': '동영상 3：회전하는 눈',
		'TEXT_PIC_4': '동영상 4：아르키메데스의 나선',
		'TEXT_PIC_5': '동영상 5：퍼지는 하트들',
		'TEXT_PIC_6': '동영상 6：오엔 구슬',
		'TEXT_PIC_7': '동영상 7：이상한 소용돌이',
		'TEXT_PIC_8': '동영상 8：미친 색',
		'TEXT_PIC_9': '동영상 9：로그 나선 2',
		'TEXT_PIC_10': '동영상 10：아날로그 디스크',
		'TEXT_PIC_11': '동영상 11：이상한 소용돌이 2',
		'TEXT_PIC_12': '동영상 12：만화경',
		'TEXT_PIC_13': '동영상 13：첫 번째 컬러 화면',
		'TEXT_PIC_14': '동영상 14：두 번째 색상 화면',
		'TEXT_PIC_15': '동영상 15：그냥 검은 화면',
		'TEXT_PIC_16': '동영상 16：그냥 흰색 화면',
		'TEXT_PIC_17': '동영상 17：뱀 회전',
		'TEXT_PIC_18': '동영상 18：스트레인 방사',
		'TEXT_PIC_19': '동영상 19：무작위 파동',
		'TEXT_SPLIT': '화면 분할:',
		'TEXT_SPEED': '속도:',
		'TEXT_ROTATION': '역 재생:',
		'TEXT_VORTEX_DIRECTION': '소용돌이 방향:',
		'TEXT_BLINKING': '화면 깜박임:',
		'TEXT_FULLSCREN_MODE': '전체 화면 모드:',
		'TEXT_MESSAGE': '메시지',
		'TEXT_RESET': '초기화',
		'TEXT_MESSAGE_SIZE': '메시지 크기:',
		'TEXT_NOTE': '사운드 버튼:',
		'TEXT_MOTION_BLUR': '모션 블러:',
		'TEXT_NONE': '(없음)',
		'TEXT_SOUND_CATTISH': '고양이 같은',
		'TEXT_SOUND_HORROR': '공포',
		'TEXT_SOUND_HUNTING': '사냥꾼',
		'TEXT_SOUND_LONGING': '동경',
		'TEXT_SOUND_LOVELY': '사랑스러운',
		'TEXT_SOUND_MAGIC': '마술',
		'TEXT_SOUND_ORA_SAIMIN': '오! 최면!',
		'TEXT_SOUND_NOISE': '소음',
		'TEXT_SOUND_432HZ': '432Hz±4Hz',
		'TEXT_SOUND_HELI': '헬리콥터',
		'TEXT_SOUND_PACHI': '파칭',
		'TEXT_SOUND_WAHWAH': '와와',
		'TEXT_SOUND_MECHANICAL': '기계음',
		'TEXT_SOUND_WATER_DROP': '물 소리',
		'TEXT_SOUND_PSYCHO': '사이코',
		'TEXT_SOUND_MYANMYAN': '미안',
		'TEXT_SOUND_PATROL': '순찰',
		'TEXT_SOUND_SPIRAL': '나선형',
		'TEXT_SOUND_VOLUME': '사운드 볼륨:',
		'TEXT_SOUND_AUTO_PLAY': '오디오 자동 재생:',
		'TEXT_SOUND_AUTO_REPEAT': '음성 자동 반복:',
		'TEXT_SOUND_SWITCH': '전환음:',
		'TEXT_BRIGHTNESS': '화면 밝기:',
		'TEXT_BRIGHTNESS_NORMAL': '일반 밝기',
		'TEXT_BRIGHTNESS_BRIGHTER': '밝게 하다',
		'TEXT_CLOCKWISE': '시계 방향',
		'TEXT_COUNTERCLOCKWISE': '반시계 방향',
		'TEXT_CONFIG': '구성',
		'TEXT_MESSAGE_TEXT': '메시지 텍스트:',
		'TEXT_MESSAGE_BUTTON': '메시지...',
		'TEXT_START_HYPNOSIS': '<nobr>최면</nobr><nobr>시작</nobr>',
		'TEXT_RELEASE_HYPNOSIS_BUTTON': '최면 해제',
		'TEXT_COUNT_DOWN': '카운트다운:',
		'TEXT_ARROWS': '화살표:',
		'TEXT_MESSAGE_SPEECH_LABEL': '메시지 연설:',
		'TEXT_MESSAGE_SPEECH': '메시지 연설',
		'TEXT_COLOR_1ST': '첫 번째 색상:',
		'TEXT_COLOR_2ND': '두 번째 색상:',
		'TEXT_INIT_APP_BUTTON': '앱 재설정',
		'TEXT_MESSAGE_VOLUME': '메시지 음성 음량:',
		'TEXT_MESSAGE_SKIN': '스킨:',
		'TEXT_VIBRATOR': '진동기:',
		'TEXT_VIBRATOR_START_STOP': '시작 / 정지',
		'TEXT_GOLDEN': '황금',
		'TEXT_PURPLE': '보라색',
		'TEXT_BLUE': '청색',
		'TEXT_PINK': '핑크색',
		'TEXT_DARKGREEN': '다크 그린',
		'TEXT_RED': '빨간색',
		'TEXT_BLACK': '검은색',
		'TEXT_WHITE': '백색',
	},
	'it-IT': { // Italian
		'TEXT_OK': 'OK',
		'TEXT_CANCEL': 'Annulla',
		'TEXT_YES': 'SÌ',
		'TEXT_NO': 'No',
		'TEXT_CHOOSE_LANGUAGE': 'Scegli una lingua (Choose a language)',
		'TEXT_ABOUT_APP': 'Informazioni sull\'app',
		'TEXT_INIT_APP': 'Vuoi inizializzare questa app?',
		'TEXT_INITTED_APP': 'Inizializzata l\'app.',
		'TEXT_INPUT_MESSAGE': 'Inserisci il testo del messaggio.',
		'TEXT_FULLWIDTH_SPACE': '　',
		'TEXT_PERIOD': '.',
		'TEXT_PERIOD_SPACE': '. ',
		'TEXT_RELEASE_HYPNOSIS': 'Uccidi l\'ipnosi',
		'TEXT_HYPNOSIS_RELEASED': 'Ipnosi liberata.',
		'TEXT_KILLING_HYPNOSIS_IMG': 'img/killing-hypnosis_it.svg',
		'TEXT_HYPNOSIS_RELEASED_IMG': 'img/hypnosis-released_it.svg',
		'TEXT_ALL_RELEASED_IMG': 'img/all-released_it.svg',
		'TEXT_NO_BLINKING': 'Senza il flash',
		'TEXT_LOGO': 'img/logo_it.svg',
		'TEXT_TAP_HERE': 'img/please-tap-here_it.svg',
		'TEXT_MP3_RELEASED_HYPNOSIS': 'sn/ReleasedHypnosis_it.mp3',
		'TEXT_I_AGREE': 'Sono d\'accordo',
		'TEXT_SIZE_SMALL': 'Piccola',
		'TEXT_SIZE_NORMAL': 'Normale',
		'TEXT_SIZE_LARGE': 'Grande',
		'TEXT_SIZE_HUGE': 'Enorme',
		'TEXT_SPEED_ZERO': 'Fermato',
		'TEXT_SPEED_SLOW': 'Lento',
		'TEXT_SPEED_NORMAL': 'Normale',
		'TEXT_SPEED_FAST': 'Veloce',
		'TEXT_SPEED_SUPER_FAST': 'Super Veloce',
		'TEXT_SPEED_IRREGULAR': 'Irregolare',
		'TEXT_RAINBOW': 'Arcobaleno',
		'TEXT_FACE_GETTER': 'Riconoscimento Facciale',
		'TEXT_TAP_ON_TARGET': 'Per favore tocca il bersaglio',
		'TEXT_CAN_LOCK_ON': 'Può essere bloccato',
		'TEXT_CANT_FIND_FACE': 'Volto non trovato',
		'TEXT_LOCK_ON': 'Blocco su',
		'TEXT_UNLOCK': 'Sbloccare',
		'TEXT_GO_BACK': 'Ritorno',
		'TEXT_NO_WEBCONNECT': 'La connessione Internet non è disponibile.',
		'TEXT_INPUTMESSAGE': 'Inserisci il tuo messaggio',
		'TEXT_NOTICE': trans_NOTICE_IT,
		'TEXT_LANGUAGE': 'Lingua (Language):',
		'TEXT_LANGUAGE_ZH_CN': 'Chinese (Simplified) (简体中文)',
		'TEXT_LANGUAGE_ZH_TW': 'Chinese (Traditional) (繁體中文)',
		'TEXT_LANGUAGE_EN': 'English (Inglese)',
		'TEXT_LANGUAGE_ES': 'Spanish (Español)',
		'TEXT_LANGUAGE_DE': 'German (Deutsch)',
		'TEXT_LANGUAGE_IT': 'Italian (Italiano)',
		'TEXT_LANGUAGE_JA_JP': 'Japanese (日本語)',
		'TEXT_LANGUAGE_KO_KR': 'Korean (한국어)',
		'TEXT_LANGUAGE_RU': 'Russian (Русский)',
		'TEXT_PIC_TYPE': 'Il tipo di immagine:',
		'TEXT_PIC_0': 'Film 0: Schermata fittizia (per esercitarsi)',
		'TEXT_PIC_1': 'Film 1: Spirale Logaritmica',
		'TEXT_PIC_2': 'Film 2: Cerchi concentrici',
		'TEXT_PIC_3': 'Film 3: Gli occhi',
		'TEXT_PIC_4': 'Film 4: Spirale di Archimede',
		'TEXT_PIC_5': 'Film 5: Cuori che si diffondono',
		'TEXT_PIC_6': 'Film 6: Moneta da 5 Yen',
		'TEXT_PIC_7': 'Film 7: Strano Turbinio',
		'TEXT_PIC_8': 'Film 8: Colori Pazzi',
		'TEXT_PIC_9': 'Film 9: Spirale Logaritmica 2',
		'TEXT_PIC_10': 'Film 10: Disco Analogico',
		'TEXT_PIC_11': 'Film 11: Strano Turbinio 2',
		'TEXT_PIC_12': 'Film 12: Caleidoscopio',
		'TEXT_PIC_13': 'Film 13: 1° schermo a colori',
		'TEXT_PIC_14': 'Film 14: 2° schermo a colori',
		'TEXT_PIC_15': 'Film 15: Solo uno schermo nero',
		'TEXT_PIC_16': 'Film 16: Solo uno schermo bianco',
		'TEXT_PIC_17': 'Film 17: Serpente rotante',
		'TEXT_PIC_18': 'Film 18: Radiazione di distorsione',
		'TEXT_PIC_19': 'Film 19：Onde Casuali',
		'TEXT_SPLIT': 'Divisione dello schermo:',
		'TEXT_SPEED': 'Velocità:',
		'TEXT_ROTATION': 'Riproduzione inversa:',
		'TEXT_VORTEX_DIRECTION': 'Direzione del vortice:',
		'TEXT_BLINKING': 'Schermo lampeggiante:',
		'TEXT_FULLSCREN_MODE': 'Modalità schermo intero:',
		'TEXT_MESSAGE': 'Messaggio',
		'TEXT_RESET': 'Ripristina',
		'TEXT_MESSAGE_SIZE': 'Dimensione del messaggio:',
		'TEXT_NOTE': 'Pulsante audio:',
		'TEXT_MOTION_BLUR': 'Sfocatura movimento:',
		'TEXT_NONE': '(Nessuno)',
		'TEXT_SOUND_CATTISH': 'Simile a un gatto',
		'TEXT_SOUND_HORROR': 'Paura',
		'TEXT_SOUND_HUNTING': 'A caccia',
		'TEXT_SOUND_LONGING': 'Desiderio',
		'TEXT_SOUND_LOVELY': 'Adorabile',
		'TEXT_SOUND_MAGIC': 'Stregoneria',
		'TEXT_SOUND_ORA_SAIMIN': 'Ora! Saimin!',
		'TEXT_SOUND_NOISE': 'Rumore',
		'TEXT_SOUND_432HZ': '432Hz±4Hz',
		'TEXT_SOUND_HELI': 'Elicottero',
		'TEXT_SOUND_PACHI': 'Pachi',
		'TEXT_SOUND_WAHWAH': 'WahWah',
		'TEXT_SOUND_MECHANICAL': 'Meccanico',
		'TEXT_SOUND_WATER_DROP': '水の音',
		'TEXT_SOUND_PSYCHO': 'Psicopatico',
		'TEXT_SOUND_MYANMYAN': 'Myan Myan',
		'TEXT_SOUND_PATROL': 'Pattuglia',
		'TEXT_SOUND_SPIRAL': 'Spirale',
		'TEXT_SOUND_VOLUME': 'Volume del suono:',
		'TEXT_SOUND_AUTO_PLAY': 'Riproduzione automatica dell\'audio:',
		'TEXT_SOUND_AUTO_REPEAT': 'Ripetere l\'audio:',
		'TEXT_SOUND_SWITCH': 'Suono di commutazione:',
		'TEXT_BRIGHTNESS': 'Luminosità:',
		'TEXT_BRIGHTNESS_NORMAL': 'Normale',
		'TEXT_BRIGHTNESS_BRIGHTER': 'Più luminoso',
		'TEXT_CLOCKWISE': 'Senso Orario',
		'TEXT_COUNTERCLOCKWISE': 'Antiorario',
		'TEXT_CONFIG': 'Configurazione',
		'TEXT_MESSAGE_TEXT': 'Messaggio di testo:',
		'TEXT_MESSAGE_BUTTON': 'Messaggio...',
		'TEXT_START_HYPNOSIS': 'Inizia l\'ipnosi',
		'TEXT_RELEASE_HYPNOSIS_BUTTON': 'Rilascia l\'ipnosi',
		'TEXT_COUNT_DOWN': 'Conto alla rovescia:',
		'TEXT_ARROWS': 'Frecce:',
		'TEXT_MESSAGE_SPEECH_LABEL': 'Discorso del messaggio:',
		'TEXT_MESSAGE_SPEECH': 'Discorso del messaggio',
		'TEXT_COLOR_1ST': '1° colore:',
		'TEXT_COLOR_2ND': '2° colore:',
		'TEXT_INIT_APP_BUTTON': 'Inizializzare',
		'TEXT_MESSAGE_VOLUME': 'Volume della voce:',
		'TEXT_MESSAGE_SKIN': 'Pelle:',
		'TEXT_VIBRATOR': 'Vibratore:',
		'TEXT_VIBRATOR_START_STOP': 'Avvio / Arresto',
		'TEXT_GOLDEN': 'd\'Oro',
		'TEXT_PURPLE': 'Viola',
		'TEXT_BLUE': 'Blu',
		'TEXT_PINK': 'Colore Rosa',
		'TEXT_DARKGREEN': 'Verde Scuro',
		'TEXT_RED': 'Rosso',
		'TEXT_BLACK': 'Colore nero',
		'TEXT_WHITE': 'Bianco',
	},
	'de-DE': { // German
		'TEXT_OK': 'OK',
		'TEXT_CANCEL': 'Abbrechen',
		'TEXT_YES': 'Ja',
		'TEXT_NO': 'Nein',
		'TEXT_CHOOSE_LANGUAGE': 'Wähle eine Sprache (Choose a language)',
		'TEXT_ABOUT_APP': 'Über diese App',
		'TEXT_INIT_APP': 'Möchten Sie diese App initialisieren?',
		'TEXT_INITTED_APP': 'Initialisierte die App.',
		'TEXT_INPUT_MESSAGE': 'Bitte geben Sie einen Nachrichtentext ein.',
		'TEXT_FULLWIDTH_SPACE': '　',
		'TEXT_PERIOD': '.',
		'TEXT_PERIOD_SPACE': '. ',
		'TEXT_RELEASE_HYPNOSIS': 'Töte Hypnose',
		'TEXT_HYPNOSIS_RELEASED': 'Hypnose freigegeben.',
		'TEXT_KILLING_HYPNOSIS_IMG': 'img/killing-hypnosis_de.svg',
		'TEXT_HYPNOSIS_RELEASED_IMG': 'img/hypnosis-released_de.svg',
		'TEXT_ALL_RELEASED_IMG': 'img/all-released_de.svg',
		'TEXT_NO_BLINKING': 'Kein Blitz',
		'TEXT_LOGO': 'img/logo_de.svg',
		'TEXT_TAP_HERE': 'img/please-tap-here_de.svg',
		'TEXT_MP3_RELEASED_HYPNOSIS': 'sn/ReleasedHypnosis_de.mp3',
		'TEXT_I_AGREE': 'Ich stimme zu',
		'TEXT_SIZE_SMALL': 'Klein',
		'TEXT_SIZE_NORMAL': 'Normal',
		'TEXT_SIZE_LARGE': 'Groß',
		'TEXT_SIZE_HUGE': 'Riesig',
		'TEXT_SPEED_ZERO': 'Gestoppt',
		'TEXT_SPEED_SLOW': 'Langsam',
		'TEXT_SPEED_NORMAL': 'Normal',
		'TEXT_SPEED_FAST': 'Schnell',
		'TEXT_SPEED_SUPER_FAST': 'Super Schnell',
		'TEXT_SPEED_IRREGULAR': 'Irregulär',
		'TEXT_RAINBOW': 'Regenbogen',
		'TEXT_FACE_GETTER': 'Gesichtserkennung',
		'TEXT_TAP_ON_TARGET': 'Bitte tippen Sie auf das Ziel',
		'TEXT_CAN_LOCK_ON': 'Abschließbar',
		'TEXT_CANT_FIND_FACE': 'Gesicht nicht gefunden',
		'TEXT_LOCK_ON': 'Sperren',
		'TEXT_UNLOCK': 'Freischalten',
		'TEXT_GO_BACK': 'Zurückkehren',
		'TEXT_NO_WEBCONNECT': 'Die Internetverbindung ist nicht verfügbar.',
		'TEXT_INPUTMESSAGE': 'Gib deine Nachricht ein',
		'TEXT_NOTICE': trans_NOTICE_DE,
		'TEXT_LANGUAGE': 'Sprache (Language):',
		'TEXT_LANGUAGE_ZH_CN': 'Chinese (Simplified) (简体中文)',
		'TEXT_LANGUAGE_ZH_TW': 'Chinese (Traditional) (繁體中文)',
		'TEXT_LANGUAGE_EN': 'English (Englisch)',
		'TEXT_LANGUAGE_ES': 'Spanish (Español)',
		'TEXT_LANGUAGE_DE': 'German (Deutsch)',
		'TEXT_LANGUAGE_IT': 'Italian (Italiano)',
		'TEXT_LANGUAGE_JA_JP': 'Japanese (日本語)',
		'TEXT_LANGUAGE_KO_KR': 'Korean (한국어)',
		'TEXT_LANGUAGE_RU': 'Russian (Русский)',
		'TEXT_PIC_TYPE': 'Die Art des Bildes:',
		'TEXT_PIC_0': 'Film 0: Dummy-Bildschirm (zum Üben)',
		'TEXT_PIC_1': 'Film 1: Logarithmische Spirale',
		'TEXT_PIC_2': 'Film 2: Konzentrische Kreise',
		'TEXT_PIC_3': 'Film 3: Die Augen',
		'TEXT_PIC_4': 'Film 4: Die Spirale des Archimedes',
		'TEXT_PIC_5': 'Film 5: Herzen verbreiten',
		'TEXT_PIC_6': 'Film 6: 5-Yen-Münze',
		'TEXT_PIC_7': 'Film 7: Seltsamer Wirbel',
		'TEXT_PIC_8': 'Film 8: Verrückte Farben',
		'TEXT_PIC_9': 'Film 9: Logarithmische Spirale 2',
		'TEXT_PIC_10': 'Film 10: Analoge Scheibe',
		'TEXT_PIC_11': 'Film 11: Seltsamer Wirbel 2',
		'TEXT_PIC_12': 'Film 12: Kaleidoskop',
		'TEXT_PIC_13': 'Film 13: Erster Farbbildschirm',
		'TEXT_PIC_14': 'Film 14: Zweiter Farbbildschirm',
		'TEXT_PIC_15': 'Film 15: Nur ein schwarzer Bildschirm',
		'TEXT_PIC_16': 'Film 16: Nur ein weißer Bildschirm',
		'TEXT_PIC_17': 'Film 17: Rotierende Schlange',
		'TEXT_PIC_18': 'Film 18: Verzerrungsstrahlung',
		'TEXT_PIC_19': 'Film 19：Zufällige Wellen',
		'TEXT_SPLIT': 'Bildschirmaufteilung:',
		'TEXT_SPEED': 'Geschwindigkeit:',
		'TEXT_ROTATION': 'Rückwärtswiedergabe:',
		'TEXT_VORTEX_DIRECTION': 'Wirbelrichtung:',
		'TEXT_BLINKING': 'Bildschirm blinkt:',
		'TEXT_FULLSCREN_MODE': 'Vollbildmodus:',
		'TEXT_MESSAGE': 'Nachricht',
		'TEXT_RESET': 'Zurücksetzen',
		'TEXT_MESSAGE_SIZE': 'Größe der Nachricht:',
		'TEXT_NOTE': 'Sound-Taste:',
		'TEXT_MOTION_BLUR': 'Bewegungsunschärfe:',
		'TEXT_NONE': '(Kein)',
		'TEXT_SOUND_CATTISH': 'Katzenartig',
		'TEXT_SOUND_HORROR': 'Furcht',
		'TEXT_SOUND_HUNTING': 'Jagd',
		'TEXT_SOUND_LONGING': 'Sehnsucht',
		'TEXT_SOUND_LOVELY': 'Liebenswert',
		'TEXT_SOUND_MAGIC': 'Hexerei',
		'TEXT_SOUND_ORA_SAIMIN': 'Ora! Saimin!',
		'TEXT_SOUND_NOISE': 'Lärm',
		'TEXT_SOUND_432HZ': '432Hz±4Hz',
		'TEXT_SOUND_HELI': 'Hubschrauber',
		'TEXT_SOUND_PACHI': 'Pachi',
		'TEXT_SOUND_WAHWAH': 'WahWah',
		'TEXT_SOUND_MECHANICAL': 'Mechanischer',
		'TEXT_SOUND_WATER_DROP': 'Il suono dell\'acqua',
		'TEXT_SOUND_PSYCHO': 'Psycho',
		'TEXT_SOUND_MYANMYAN': 'Myan Myan',
		'TEXT_SOUND_PATROL': 'Patrouillieren',
		'TEXT_SOUND_SPIRAL': 'Spiral',
		'TEXT_SOUND_VOLUME': 'Lautstärke:',
		'TEXT_SOUND_AUTO_PLAY': 'Audio automatisch abspielen:',
		'TEXT_SOUND_AUTO_REPEAT': 'Sich Wiederholender Ton:',
		'TEXT_SOUND_SWITCH': 'Schaltgeräusch:',
		'TEXT_BRIGHTNESS': 'Helligkeit:',
		'TEXT_BRIGHTNESS_NORMAL': 'Normal',
		'TEXT_BRIGHTNESS_BRIGHTER': 'Heller',
		'TEXT_CLOCKWISE': 'im Uhrzeigersinn',
		'TEXT_COUNTERCLOCKWISE': 'Gegen den Uhrzeigersinn',
		'TEXT_CONFIG': 'Aufbau',
		'TEXT_MESSAGE_TEXT': 'Nachrichtentext:',
		'TEXT_MESSAGE_BUTTON': 'Nachricht...',
		'TEXT_START_HYPNOSIS': 'Hypnose beginnen',
		'TEXT_RELEASE_HYPNOSIS_BUTTON': 'Hypnose loslassen',
		'TEXT_COUNT_DOWN': 'Countdown:',
		'TEXT_ARROWS': 'Pfeile:',
		'TEXT_MESSAGE_SPEECH_LABEL': 'Nachrichtenansprache:',
		'TEXT_MESSAGE_SPEECH': 'Nachrichtenansprache',
		'TEXT_COLOR_1ST': '1. Farbe:',
		'TEXT_COLOR_2ND': '2. Farbe:',
		'TEXT_INIT_APP_BUTTON': 'Initialisieren',
		'TEXT_MESSAGE_VOLUME': 'Stimmen Lautstärke:',
		'TEXT_MESSAGE_SKIN': 'Haut:',
		'TEXT_VIBRATOR': 'Vibrator:',
		'TEXT_VIBRATOR_START_STOP': 'Start / Stop',
		'TEXT_GOLDEN': 'Golden',
		'TEXT_PURPLE': 'Lila',
		'TEXT_BLUE': 'Blau',
		'TEXT_PINK': 'Pinke Farbe',
		'TEXT_DARKGREEN': 'Dunkelgrün',
		'TEXT_RED': 'Rot',
		'TEXT_BLACK': 'Schwarz',
		'TEXT_WHITE': 'Weiß',
	},
	'es-ES': { // Spanish
		'TEXT_OK': 'OK',
		'TEXT_CANCEL': 'Cancelar',
		'TEXT_YES': 'Sí',
		'TEXT_NO': 'No',
		'TEXT_CHOOSE_LANGUAGE': 'Elige un idioma (Choose a language)',
		'TEXT_ABOUT_APP': 'Información de versión',
		'TEXT_INIT_APP': '¿Quieres inicializar esta aplicación?',
		'TEXT_INITTED_APP': 'La aplicación se ha inicializado.',
		'TEXT_INPUT_MESSAGE': 'Por favor ingrese la cadena del mensaje.',
		'TEXT_FULLWIDTH_SPACE': '　',
		'TEXT_PERIOD': '. ',
		'TEXT_PERIOD_SPACE': '。',
		'TEXT_RELEASE_HYPNOSIS': 'Dehipnosis',
		'TEXT_HYPNOSIS_RELEASED': 'Liberé la hipnosis.',
		'TEXT_KILLING_HYPNOSIS_IMG': 'img/killing-hypnosis_es.svg',
		'TEXT_HYPNOSIS_RELEASED_IMG': 'img/hypnosis-released_es.svg',
		'TEXT_ALL_RELEASED_IMG': 'img/all-released_es.svg',
		'TEXT_NO_BLINKING': 'Sin parpadeo',
		'TEXT_LOGO': 'img/logo_es.svg',
		'TEXT_TAP_HERE': 'img/please-tap-here_es.svg',
		'TEXT_MP3_RELEASED_HYPNOSIS': 'sn/ReleasedHypnosis_es.mp3',
		'TEXT_I_AGREE': 'Estoy de acuerdo',
		'TEXT_SIZE_SMALL': 'Pequeño',
		'TEXT_SIZE_NORMAL': 'Talla normal',
		'TEXT_SIZE_LARGE': 'Grande',
		'TEXT_SIZE_HUGE': 'Enorme',
		'TEXT_SPEED_ZERO': 'Detener',
		'TEXT_SPEED_SLOW': 'Lento',
		'TEXT_SPEED_NORMAL': 'Velocidad normal',
		'TEXT_SPEED_FAST': 'Rápido',
		'TEXT_SPEED_SUPER_FAST': 'Súper rápido',
		'TEXT_SPEED_IRREGULAR': 'Irregular',
		'TEXT_RAINBOW': 'Color del arco iris',
		'TEXT_FACE_GETTER': 'Reconocimiento facial',
		'TEXT_TAP_ON_TARGET': 'Toca el objetivo',
		'TEXT_CAN_LOCK_ON': 'Se puede bloquear',
		'TEXT_CANT_FIND_FACE': 'Cara no encontrada',
		'TEXT_LOCK_ON': 'Bloqueo',
		'TEXT_UNLOCK': 'Desbloquear',
		'TEXT_GO_BACK': 'Devolver',
		'TEXT_NO_WEBCONNECT': 'La conexión a Internet no está disponible.',
		'TEXT_INPUTMESSAGE': 'Ingrese su mensaje',
		'TEXT_NOTICE': trans_NOTICE_ES,
		'TEXT_LANGUAGE': '言語 (Language):',
		'TEXT_LANGUAGE_ZH_CN': 'Chinese (Simplified) (简体中文)',
		'TEXT_LANGUAGE_ZH_TW': 'Chinese (Traditional) (繁體中文)',
		'TEXT_LANGUAGE_EN': 'Inglés (English)',
		'TEXT_LANGUAGE_ES': 'Spanish (Español)',
		'TEXT_LANGUAGE_DE': 'German (Deutsch)',
		'TEXT_LANGUAGE_IT': 'Italian (Italiano)',
		'TEXT_LANGUAGE_JA_JP': 'Japanese (日本語)',
		'TEXT_LANGUAGE_KO_KR': 'Korean (한국어)',
		'TEXT_LANGUAGE_RU': 'Russian (Русский)',
		'TEXT_PIC_TYPE': 'Tipo de vídeo:',
		'TEXT_PIC_0': 'Película 0: Pantalla ficticia (para practicar)',
		'TEXT_PIC_1': 'Película 1: Espiral logarítmica',
		'TEXT_PIC_2': 'Película 2: Círculos concéntricos',
		'TEXT_PIC_3': 'Película 3: Ojos giratorios',
		'TEXT_PIC_4': 'Película 4: Espiral de Arquímedes',
		'TEXT_PIC_5': 'Película 5: Corazón en expansión',
		'TEXT_PIC_6': 'Película 6: Moneda de cinco yenes',
		'TEXT_PIC_7': 'Película 7: Extraño Remolino',
		'TEXT_PIC_8': 'Película 8: Colores locos',
		'TEXT_PIC_9': 'Película 9: Espiral logarítmica 2',
		'TEXT_PIC_10': 'Película 10: Disco analógico',
		'TEXT_PIC_11': 'Película 11: Extraño Remolino 2',
		'TEXT_PIC_12': 'Película 12: Caleidoscopio',
		'TEXT_PIC_13': 'Película 13: Primera pantalla a color',
		'TEXT_PIC_14': 'Película 14: Segunda pantalla a color',
		'TEXT_PIC_15': 'Película 15: Sólo una pantalla negra',
		'TEXT_PIC_16': 'Película 16: Sólo una pantalla blanca',
		'TEXT_PIC_17': 'Película 17: Serpiente giratoria',
		'TEXT_PIC_18': 'Película 18: Radiación de distorsión',
		'TEXT_PIC_19': 'Película 19：Ondas Aleatorias',
		'TEXT_SPLIT': 'Pantalla dividida:',
		'TEXT_SPEED': 'Velocidad:',
		'TEXT_ROTATION': 'Reproducción inversa:',
		'TEXT_VORTEX_DIRECTION': 'Dirección del vórtice:',
		'TEXT_BLINKING': 'Pantalla parpadeando:',
		'TEXT_FULLSCREN_MODE': 'Modo de pantalla completa:',
		'TEXT_MESSAGE': 'Mensaje',
		'TEXT_RESET': 'Reiniciar',
		'TEXT_MESSAGE_SIZE': 'Tamaño del mensaje:',
		'TEXT_NOTE': 'Botón de nota musical:',
		'TEXT_MOTION_BLUR': 'Desenfoque de movimiento:',
		'TEXT_NONE': '(Ninguno)',
		'TEXT_SOUND_CATTISH': 'Felino',
		'TEXT_SOUND_HORROR': 'Miedo',
		'TEXT_SOUND_HUNTING': 'Cazador',
		'TEXT_SOUND_LONGING': 'Anhelar',
		'TEXT_SOUND_LOVELY': 'Adorable',
		'TEXT_SOUND_MAGIC': 'Magia',
		'TEXT_SOUND_ORA_SAIMIN': 'Ora! Saimin!',
		'TEXT_SOUND_NOISE': 'Ruido',
		'TEXT_SOUND_432HZ': '432Hz±4Hz',
		'TEXT_SOUND_HELI': 'Helicóptero',
		'TEXT_SOUND_PACHI': 'Pachi',
		'TEXT_SOUND_WAHWAH': 'Wah Wah',
		'TEXT_SOUND_MECHANICAL': 'Mecánico',
		'TEXT_SOUND_WATER_DROP': 'El sonido del agua',
		'TEXT_SOUND_PSYCHO': 'Psicópata',
		'TEXT_SOUND_MYANMYAN': 'Myanmar Myanmar',
		'TEXT_SOUND_PATROL': 'Patrulla',
		'TEXT_SOUND_SPIRAL': 'Espiral',
		'TEXT_SOUND_VOLUME': 'Volumen:',
		'TEXT_SOUND_AUTO_PLAY': 'Reproducción automática de audio:',
		'TEXT_SOUND_AUTO_REPEAT': 'Audio de repetición automática:',
		'TEXT_SOUND_SWITCH': 'Sonido de conmutación:',
		'TEXT_BRIGHTNESS': 'Brillo de la pantalla:',
		'TEXT_BRIGHTNESS_NORMAL': 'Brillo normal',
		'TEXT_BRIGHTNESS_BRIGHTER': 'Aclarar',
		'TEXT_CLOCKWISE': 'Agujas del reloj',
		'TEXT_COUNTERCLOCKWISE': 'Sinistrórsum',
		'TEXT_CONFIG': 'Configuración',
		'TEXT_MESSAGE_TEXT': 'Mensaje de texto:',
		'TEXT_MESSAGE_BUTTON': 'Mensaje...',
		'TEXT_START_HYPNOSIS': 'Iniciar la hipnosis',
		'TEXT_RELEASE_HYPNOSIS_BUTTON': 'Iiberar hipnosis',
		'TEXT_COUNT_DOWN': 'Cuenta regresiva:',
		'TEXT_ARROWS': 'Flechas:',
		'TEXT_MESSAGE_SPEECH_LABEL': 'Di el mensaje:',
		'TEXT_MESSAGE_SPEECH': 'Di el mensaje',
		'TEXT_COLOR_1ST': '1er color:',
		'TEXT_COLOR_2ND': 'Segundo color:',
		'TEXT_INIT_APP_BUTTON': 'Inicialización',
		'TEXT_MESSAGE_VOLUME': 'Volumen de voz del mensaje:',
		'TEXT_MESSAGE_SKIN': 'Piel:',
		'TEXT_VIBRATOR': 'Vibrador:',
		'TEXT_VIBRATOR_START_STOP': 'Iniciar / Detener',
		'TEXT_GOLDEN': 'Dorado',
		'TEXT_PURPLE': 'Púrpura',
		'TEXT_BLUE': 'Azul',
		'TEXT_PINK': 'Color rosa',
		'TEXT_DARKGREEN': 'Verde oscuro',
		'TEXT_RED': 'Rojo',
		'TEXT_BLACK': 'Negro',
		'TEXT_WHITE': 'Blanco',
	},
	'ru-RU': {
		'TEXT_OK': 'Хорошо',
		'TEXT_CANCEL': 'Отмена',
		'TEXT_YES': 'Да',
		'TEXT_NO': 'Нет',
		'TEXT_CHOOSE_LANGUAGE': '言語選択 (Choose a language)',
		'TEXT_ABOUT_APP': 'Информация о версии',
		'TEXT_INIT_APP': 'Вы хотите инициализировать это приложение?',
		'TEXT_INITTED_APP': 'Приложение инициализировано.',
		'TEXT_INPUT_MESSAGE': 'Пожалуйста, введите строку сообщения.',
		'TEXT_FULLWIDTH_SPACE': '　',
		'TEXT_PERIOD': '.',
		'TEXT_PERIOD_SPACE': '. ',
		'TEXT_RELEASE_HYPNOSIS': 'Освободиться от гипноза',
		'TEXT_HYPNOSIS_RELEASED': 'Я выпустил гипноз.',
		'TEXT_KILLING_HYPNOSIS_IMG': 'img/killing-hypnosis_ru.svg',
		'TEXT_HYPNOSIS_RELEASED_IMG': 'img/hypnosis-released_ru.svg',
		'TEXT_ALL_RELEASED_IMG': 'img/all-released_ru.svg',
		'TEXT_NO_BLINKING': 'Нет мигания',
		'TEXT_LOGO': 'img/logo_ru.svg',
		'TEXT_TAP_HERE': 'img/please-tap-here_ru.svg',
		'TEXT_MP3_RELEASED_HYPNOSIS': 'sn/ReleasedHypnosis_ru.mp3',
		'TEXT_I_AGREE': 'Я согласен',
		'TEXT_SIZE_SMALL': 'Маленький',
		'TEXT_SIZE_NORMAL': 'Нормальный размер',
		'TEXT_SIZE_LARGE': 'Большой',
		'TEXT_SIZE_HUGE': 'Огромный',
		'TEXT_SPEED_ZERO': 'Остановлено',
		'TEXT_SPEED_SLOW': 'Медленный',
		'TEXT_SPEED_NORMAL': 'Нормальная скорость',
		'TEXT_SPEED_FAST': 'Быстрый',
		'TEXT_SPEED_SUPER_FAST': 'Сверх быстрый',
		'TEXT_SPEED_IRREGULAR': 'Нерегулярный',
		'TEXT_RAINBOW': 'Радужный',
		'TEXT_FACE_GETTER': 'Распознавание лица',
		'TEXT_TAP_ON_TARGET': 'Коснитесь цели',
		'TEXT_CAN_LOCK_ON': 'Можно заблокировать',
		'TEXT_CANT_FIND_FACE': 'Лицо не найдено',
		'TEXT_LOCK_ON': 'Блокировка',
		'TEXT_UNLOCK': 'Разблокировать',
		'TEXT_GO_BACK': 'Возвращаться',
		'TEXT_NO_WEBCONNECT': 'Подключение к Интернету недоступно.',
		'TEXT_INPUTMESSAGE': 'Введите ваше сообщение',
		'TEXT_NOTICE': trans_NOTICE_RU,
		'TEXT_LANGUAGE': '言語 (Language):',
		'TEXT_LANGUAGE_ZH_CN': 'Chinese (Simplified) (简体中文)',
		'TEXT_LANGUAGE_ZH_TW': 'Chinese (Traditional) (繁體中文)',
		'TEXT_LANGUAGE_EN': 'English (英語)',
		'TEXT_LANGUAGE_ES': 'Spanish (Español)',
		'TEXT_LANGUAGE_DE': 'German (Deutsch)',
		'TEXT_LANGUAGE_IT': 'Italian (Italiano)',
		'TEXT_LANGUAGE_JA_JP': 'Japanese (日本語)',
		'TEXT_LANGUAGE_KO_KR': 'Korean (한국어)',
		'TEXT_LANGUAGE_RU': 'Russian (Русский)',
		'TEXT_PIC_TYPE': 'Тип видео:',
		'TEXT_PIC_0': 'Фильм 0: Пустой экран (для практики)',
		'TEXT_PIC_1': 'Фильм 1: Логарифмическая спираль',
		'TEXT_PIC_2': 'Фильм 2: Концентрические круги',
		'TEXT_PIC_3': 'Фильм 3: Вращающиеся глаза',
		'TEXT_PIC_4': 'Фильм 4: Спираль Архимеда',
		'TEXT_PIC_5': 'Фильм 5: Расширяющееся сердце',
		'TEXT_PIC_6': 'Фильм 6: Монета пять иен',
		'TEXT_PIC_7': 'Фильм 7: Странный Водоворот',
		'TEXT_PIC_8': 'Фильм 8: Сумасшедшие цвета',
		'TEXT_PIC_9': 'Фильм 9: Логарифмическая спираль 2',
		'TEXT_PIC_10': 'Фильм 10: Аналоговый диск',
		'TEXT_PIC_11': 'Фильм 11: Странный Водоворот 2',
		'TEXT_PIC_12': 'Фильм 12: Калейдоскоп',
		'TEXT_PIC_13': 'Фильм 13: Первый цветной экран',
		'TEXT_PIC_14': 'Фильм 14: Второй цветной экран',
		'TEXT_PIC_15': 'Фильм 15: Просто черный экран',
		'TEXT_PIC_16': 'Фильм 16: Просто белый экран',
		'TEXT_PIC_17': 'Фильм 17: Вращающаяся змея',
		'TEXT_PIC_18': 'Фильм 18: Искажающее излучение',
		'TEXT_PIC_19': 'Фильм 19：Случайные Волны',
		'TEXT_SPLIT': 'Разделенный экран:',
		'TEXT_SPEED': 'Скорость:',
		'TEXT_ROTATION': 'Обратное воспроизведение:',
		'TEXT_VORTEX_DIRECTION': 'Направление вихря:',
		'TEXT_BLINKING': 'Мигание экрана:',
		'TEXT_FULLSCREN_MODE': 'Полноэкранный режим:',
		'TEXT_MESSAGE': 'Сообщение',
		'TEXT_RESET': 'Перезагрузить',
		'TEXT_MESSAGE_SIZE': 'Размер сообщения:',
		'TEXT_NOTE': 'Кнопка музыкальной ноты:',
		'TEXT_MOTION_BLUR': 'Размытость:',
		'TEXT_NONE': '(Никто)',
		'TEXT_SOUND_CATTISH': 'Кошачий',
		'TEXT_SOUND_HORROR': 'Страх',
		'TEXT_SOUND_HUNTING': 'Охотник',
		'TEXT_SOUND_LONGING': 'Стремятся к',
		'TEXT_SOUND_LOVELY': 'Восхитительный',
		'TEXT_SOUND_MAGIC': 'Магия',
		'TEXT_SOUND_ORA_SAIMIN': 'Ora! Saimin!',
		'TEXT_SOUND_NOISE': 'Шум',
		'TEXT_SOUND_432HZ': '432Hz±4Hz',
		'TEXT_SOUND_HELI': 'Вертолет',
		'TEXT_SOUND_PACHI': 'Пачи',
		'TEXT_SOUND_WAHWAH': 'ВахВах',
		'TEXT_SOUND_MECHANICAL': 'Механический',
		'TEXT_SOUND_WATER_DROP': 'Шум воды',
		'TEXT_SOUND_PSYCHO': 'Психо',
		'TEXT_SOUND_MYANMYAN': 'Мьян Мьян',
		'TEXT_SOUND_PATROL': 'Патруль',
		'TEXT_SOUND_SPIRAL': 'Спираль',
		'TEXT_SOUND_VOLUME': 'Объем:',
		'TEXT_SOUND_AUTO_PLAY': 'Автовоспроизведение звука:',
		'TEXT_SOUND_AUTO_REPEAT': 'Автоповтор аудио:',
		'TEXT_SOUND_SWITCH': 'Переключение звука:',
		'TEXT_BRIGHTNESS': 'Яркость экрана:',
		'TEXT_BRIGHTNESS_NORMAL': 'Нормальная яркость',
		'TEXT_BRIGHTNESS_BRIGHTER': 'Украсить',
		'TEXT_CLOCKWISE': 'По часовой стрелке',
		'TEXT_COUNTERCLOCKWISE': 'Против часовой',
		'TEXT_CONFIG': 'Параметр',
		'TEXT_MESSAGE_TEXT': 'Текст сообщения:',
		'TEXT_MESSAGE_BUTTON': 'Сообщение...',
		'TEXT_START_HYPNOSIS': 'Начать гипноз',
		'TEXT_RELEASE_HYPNOSIS_BUTTON': 'Освободиться от гипноза',
		'TEXT_COUNT_DOWN': 'Обратный отсчет:',
		'TEXT_ARROWS': 'Стрелки:',
		'TEXT_MESSAGE_SPEECH_LABEL': 'Произнесите сообщение:',
		'TEXT_MESSAGE_SPEECH': 'Произнесите сообщение',
		'TEXT_COLOR_1ST': '1-й цвет:',
		'TEXT_COLOR_2ND': 'Второй цвет:',
		'TEXT_INIT_APP_BUTTON': 'Инициализация',
		'TEXT_MESSAGE_VOLUME': 'Громкость голоса сообщения:',
		'TEXT_MESSAGE_SKIN': 'Кожа:',
		'TEXT_VIBRATOR': 'Вибратор:',
		'TEXT_VIBRATOR_START_STOP': 'Старт / Стоп',
		'TEXT_GOLDEN': 'Золотой',
		'TEXT_PURPLE': 'Фиолетовый',
		'TEXT_BLUE': 'Синий',
		'TEXT_PINK': 'Розовый цвет',
		'TEXT_DARKGREEN': 'Темно-зеленый',
		'TEXT_RED': 'Красный',
		'TEXT_BLACK': 'Черный',
		'TEXT_WHITE': 'Blanco',
	},
	'en-US': {
		'TEXT_OK': 'OK',
		'TEXT_CANCEL': 'Cancel',
		'TEXT_YES': 'Yes',
		'TEXT_NO': 'No',
		'TEXT_CHOOSE_LANGUAGE': 'Choose a language (言語選択)',
		'TEXT_ABOUT_APP': 'About this app',
		'TEXT_INIT_APP': 'Do you want to initialize this app?',
		'TEXT_INITTED_APP': 'Initialized the app.',
		'TEXT_INPUT_MESSAGE': 'Please enter a message text.',
		'TEXT_FULLWIDTH_SPACE': '　',
		'TEXT_PERIOD': '.',
		'TEXT_PERIOD_SPACE': '. ',
		'TEXT_RELEASE_HYPNOSIS': 'Kill hypnosis',
		'TEXT_HYPNOSIS_RELEASED': 'Hypnosis released.',
		'TEXT_KILLING_HYPNOSIS_IMG': 'img/killing-hypnosis_en.svg',
		'TEXT_HYPNOSIS_RELEASED_IMG': 'img/hypnosis-released_en.svg',
		'TEXT_ALL_RELEASED_IMG': 'img/all-released_en.svg',
		'TEXT_NO_BLINKING': 'No blinking',
		'TEXT_LOGO': 'img/logo_en.svg',
		'TEXT_TAP_HERE': 'img/please-tap-here_en.svg',
		'TEXT_MP3_RELEASED_HYPNOSIS': 'sn/ReleasedHypnosis_en.mp3',
		'TEXT_I_AGREE': 'I agree',
		'TEXT_SIZE_SMALL': 'Small',
		'TEXT_SIZE_NORMAL': 'Normal',
		'TEXT_SIZE_LARGE': 'Large',
		'TEXT_SIZE_HUGE': 'Huge',
		'TEXT_SPEED_ZERO': 'Stopped',
		'TEXT_SPEED_SLOW': 'Slow',
		'TEXT_SPEED_NORMAL': 'Normal',
		'TEXT_SPEED_FAST': 'Fast',
		'TEXT_SPEED_SUPER_FAST': 'Super Fast',
		'TEXT_SPEED_IRREGULAR': 'Irregular',
		'TEXT_RAINBOW': 'Rainbow',
		'TEXT_FACE_GETTER': 'Face Recognition',
		'TEXT_TAP_ON_TARGET': 'Please tap on the target',
		'TEXT_CAN_LOCK_ON': 'Ready to lock on',
		'TEXT_CANT_FIND_FACE': 'Face not found',
		'TEXT_LOCK_ON': 'Lock on',
		'TEXT_UNLOCK': 'Unlock',
		'TEXT_GO_BACK': 'Go back',
		'TEXT_NO_WEBCONNECT': 'Internet connection is unavailable.',
		'TEXT_INPUTMESSAGE': 'Input message',
		'TEXT_NOTICE': trans_NOTICE_EN,
		'TEXT_LANGUAGE': 'Language (言語):',
		'TEXT_LANGUAGE_ZH_CN': 'Chinese (Simplified) (简体中文)',
		'TEXT_LANGUAGE_ZH_TW': 'Chinese (Traditional) (繁體中文)',
		'TEXT_LANGUAGE_EN': 'English (英語)',
		'TEXT_LANGUAGE_ES': 'Spanish (Español)',
		'TEXT_LANGUAGE_DE': 'German (Deutsch)',
		'TEXT_LANGUAGE_IT': 'Italian (Italiano)',
		'TEXT_LANGUAGE_JA_JP': 'Japanese (日本語)',
		'TEXT_LANGUAGE_KO_KR': 'Korean (한국어)',
		'TEXT_LANGUAGE_RU': 'Russian (Русский)',
		'TEXT_PIC_TYPE': 'The type of picture:',
		'TEXT_PIC_0': 'Movie 0: Dummy Screen (for practice)',
		'TEXT_PIC_1': 'Movie 1: Logarithmic Spiral',
		'TEXT_PIC_2': 'Movie 2: Concentric Circles',
		'TEXT_PIC_3': 'Movie 3: The Eyes',
		'TEXT_PIC_4': 'Movie 4: Archimedes\' Spiral',
		'TEXT_PIC_5': 'Movie 5: Spreading Hearts',
		'TEXT_PIC_6': 'Movie 6: 5-Yen Coin',
		'TEXT_PIC_7': 'Movie 7: Strange Swirl',
		'TEXT_PIC_8': 'Movie 8: Crazy Colors',
		'TEXT_PIC_9': 'Movie 9: Logarithmic Spiral 2',
		'TEXT_PIC_10': 'Movie 10: Analog Disc',
		'TEXT_PIC_11': 'Movie 11: Strange Swirl 2',
		'TEXT_PIC_12': 'Movie 12: Kaleidoscope',
		'TEXT_PIC_13': 'Movie 13: 1st color screen',
		'TEXT_PIC_14': 'Movie 14: 2st color screen',
		'TEXT_PIC_15': 'Movie 15: Just a black screen',
		'TEXT_PIC_16': 'Movie 16: Just a white screen',
		'TEXT_PIC_17': 'Movie 17: Rotating snake',
		'TEXT_PIC_18': 'Movie 18: Distortion Radiation',
		'TEXT_PIC_19': 'Movie 19：Random Waves',
		'TEXT_SPLIT': 'Screen splitting:',
		'TEXT_SPEED': 'Speed:',
		'TEXT_ROTATION': 'Reverse playback:',
		'TEXT_VORTEX_DIRECTION': 'Direction of vortex:',
		'TEXT_BLINKING': 'Screen flashing:',
		'TEXT_FULLSCREN_MODE': 'Fullscreen mode:',
		'TEXT_MESSAGE': 'Message',
		'TEXT_RESET': 'Reset',
		'TEXT_MESSAGE_SIZE': 'Size of message:',
		'TEXT_NOTE': 'Sound button:',
		'TEXT_MOTION_BLUR': 'Motion Blur:',
		'TEXT_NONE': '(None)',
		'TEXT_SOUND_CATTISH': 'Cattish',
		'TEXT_SOUND_HORROR': 'Horror',
		'TEXT_SOUND_HUNTING': 'Hunting',
		'TEXT_SOUND_LONGING': 'Longing',
		'TEXT_SOUND_LOVELY': 'Lovely',
		'TEXT_SOUND_MAGIC': 'Magic',
		'TEXT_SOUND_ORA_SAIMIN': 'Ora! Saimin!',
		'TEXT_SOUND_NOISE': 'Noise',
		'TEXT_SOUND_432HZ': '432Hz±4Hz',
		'TEXT_SOUND_HELI': 'Helicopter',
		'TEXT_SOUND_PACHI': 'Pachi',
		'TEXT_SOUND_WAHWAH': 'WahWah',
		'TEXT_SOUND_MECHANICAL': 'Mechanical',
		'TEXT_SOUND_WATER_DROP': 'The sound of water',
		'TEXT_SOUND_PSYCHO': 'Psycho',
		'TEXT_SOUND_MYANMYAN': 'Myan Myan',
		'TEXT_SOUND_PATROL': 'Patrol',
		'TEXT_SOUND_SPIRAL': 'Spiral',
		'TEXT_SOUND_VOLUME': 'Sound volume:',
		'TEXT_SOUND_AUTO_PLAY': 'Auto-play audio:',
		'TEXT_SOUND_AUTO_REPEAT': 'Repeating audio:',
		'TEXT_SOUND_SWITCH': 'Switching sound:',
		'TEXT_BRIGHTNESS': 'Brightness:',
		'TEXT_BRIGHTNESS_NORMAL': 'Normal',
		'TEXT_BRIGHTNESS_BRIGHTER': 'Brighter',
		'TEXT_CLOCKWISE': 'Clockwise',
		'TEXT_COUNTERCLOCKWISE': 'Counterclockwise',
		'TEXT_CONFIG': 'Configuration',
		'TEXT_MESSAGE_TEXT': 'Message Text:',
		'TEXT_MESSAGE_BUTTON': 'Message...',
		'TEXT_START_HYPNOSIS': 'Start Hypnosis',
		'TEXT_RELEASE_HYPNOSIS_BUTTON': 'Release Hypnosis',
		'TEXT_COUNT_DOWN': 'Count Down:',
		'TEXT_ARROWS': 'Arrows:',
		'TEXT_MESSAGE_SPEECH_LABEL': 'Message Speech:',
		'TEXT_MESSAGE_SPEECH': 'Message Speech',
		'TEXT_COLOR_1ST': '1st color:',
		'TEXT_COLOR_2ND': '2nd color:',
		'TEXT_INIT_APP_BUTTON': 'Initialize',
		'TEXT_MESSAGE_VOLUME': 'Message voice volume:',
		'TEXT_MESSAGE_SKIN': 'Skin:',
		'TEXT_VIBRATOR': 'Vibrator:',
		'TEXT_VIBRATOR_START_STOP': 'Start / Stop',
		'TEXT_GOLDEN': 'Golden',
		'TEXT_PURPLE': 'Purple',
		'TEXT_BLUE': 'Blue',
		'TEXT_PINK': 'Pink',
		'TEXT_DARKGREEN': 'Darkgreen',
		'TEXT_RED': 'Red',
		'TEXT_BLACK': 'Black',
		'TEXT_WHITE': 'White',
	},
};

const trans_getText = function(str_id){
	let lang = localStorage.getItem('saiminLanguage3');
	if(!lang || !trans_trans[lang])
		lang = 'en-US';
	return trans_trans[lang][str_id] || trans_trans['en-US'][str_id];
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
	return '';
}

const trans_setImageSrc = function(id, src){
	if(typeof(id) == 'string')
		id = document.getElementById(id);
	id.src = src;
}

const trans_getDefaultLanguage = function(){
	return trans_standardizeLanguage(navigator.language);
}

// {{LANGUAGE_SPECIFIC}}
const trans_localize = function(lang){
	trans_currentLanguage = trans_standardizeLanguage(lang);
	localStorage.setItem('saiminLanguage3', trans_currentLanguage);

	trans_setHtmlText(sai_id_text_notice, trans_getText('TEXT_NOTICE'));
	trans_setHtmlText(sai_id_text_language, trans_getText('TEXT_LANGUAGE'));

	trans_setSelectOptionText(sai_id_select_language_1, 'zh-CN', trans_getText('TEXT_LANGUAGE_ZH_CN'));
	trans_setSelectOptionText(sai_id_select_language_1, 'zh-TW', trans_getText('TEXT_LANGUAGE_ZH_TW'));
	trans_setSelectOptionText(sai_id_select_language_1, 'en-US', trans_getText('TEXT_LANGUAGE_EN'));
	trans_setSelectOptionText(sai_id_select_language_1, 'es-ES', trans_getText('TEXT_LANGUAGE_ES'));
	trans_setSelectOptionText(sai_id_select_language_1, 'de-DE', trans_getText('TEXT_LANGUAGE_DE'));
	trans_setSelectOptionText(sai_id_select_language_1, 'it-IT', trans_getText('TEXT_LANGUAGE_IT'));
	trans_setSelectOptionText(sai_id_select_language_1, 'ja-JP', trans_getText('TEXT_LANGUAGE_JA_JP'));
	trans_setSelectOptionText(sai_id_select_language_1, 'ko-KR', trans_getText('TEXT_LANGUAGE_KO_KR'));
	trans_setSelectOptionText(sai_id_select_language_1, 'ru-RU', trans_getText('TEXT_LANGUAGE_RU'));

	trans_setSelectOptionText(sai_id_select_language_2, 'zh-CN', trans_getText('TEXT_LANGUAGE_ZH_CN'));
	trans_setSelectOptionText(sai_id_select_language_2, 'zh-TW', trans_getText('TEXT_LANGUAGE_ZH_TW'));
	trans_setSelectOptionText(sai_id_select_language_2, 'en-US', trans_getText('TEXT_LANGUAGE_EN'));
	trans_setSelectOptionText(sai_id_select_language_2, 'es-ES', trans_getText('TEXT_LANGUAGE_ES'));
	trans_setSelectOptionText(sai_id_select_language_2, 'de-DE', trans_getText('TEXT_LANGUAGE_DE'));
	trans_setSelectOptionText(sai_id_select_language_2, 'it-IT', trans_getText('TEXT_LANGUAGE_IT'));
	trans_setSelectOptionText(sai_id_select_language_2, 'ja-JP', trans_getText('TEXT_LANGUAGE_JA_JP'));
	trans_setSelectOptionText(sai_id_select_language_2, 'ko-KR', trans_getText('TEXT_LANGUAGE_KO_KR'));
	trans_setSelectOptionText(sai_id_select_language_2, 'ru-RU', trans_getText('TEXT_LANGUAGE_RU'));

	trans_setHtmlText(sai_id_pic_type, trans_getText('TEXT_PIC_TYPE'));
	trans_setSelectOptionText(sai_id_select_pic_type, '0', trans_getText('TEXT_PIC_0'));
	trans_setSelectOptionText(sai_id_select_pic_type, '1', trans_getText('TEXT_PIC_1'));
	trans_setSelectOptionText(sai_id_select_pic_type, '2', trans_getText('TEXT_PIC_2'));
	trans_setSelectOptionText(sai_id_select_pic_type, '3', trans_getText('TEXT_PIC_3'));
	trans_setSelectOptionText(sai_id_select_pic_type, '4', trans_getText('TEXT_PIC_4'));
	trans_setSelectOptionText(sai_id_select_pic_type, '5', trans_getText('TEXT_PIC_5'));
	trans_setSelectOptionText(sai_id_select_pic_type, '6', trans_getText('TEXT_PIC_6'));
	trans_setSelectOptionText(sai_id_select_pic_type, '7', trans_getText('TEXT_PIC_7'));
	trans_setSelectOptionText(sai_id_select_pic_type, '8', trans_getText('TEXT_PIC_8'));
	trans_setSelectOptionText(sai_id_select_pic_type, '9', trans_getText('TEXT_PIC_9'));
	trans_setSelectOptionText(sai_id_select_pic_type, '10', trans_getText('TEXT_PIC_10'));
	trans_setSelectOptionText(sai_id_select_pic_type, '11', trans_getText('TEXT_PIC_11'));
	trans_setSelectOptionText(sai_id_select_pic_type, '12', trans_getText('TEXT_PIC_12'));
	trans_setSelectOptionText(sai_id_select_pic_type, '13', trans_getText('TEXT_PIC_13'));
	trans_setSelectOptionText(sai_id_select_pic_type, '14', trans_getText('TEXT_PIC_14'));
	trans_setSelectOptionText(sai_id_select_pic_type, '15', trans_getText('TEXT_PIC_15'));
	trans_setSelectOptionText(sai_id_select_pic_type, '16', trans_getText('TEXT_PIC_16'));
	trans_setSelectOptionText(sai_id_select_pic_type, '17', trans_getText('TEXT_PIC_17'));
	trans_setSelectOptionText(sai_id_select_pic_type, '18', trans_getText('TEXT_PIC_18'));
	trans_setSelectOptionText(sai_id_select_pic_type, '19', trans_getText('TEXT_PIC_19'));

	trans_setHtmlText(sai_id_text_split, trans_getText('TEXT_SPLIT'));
	trans_setHtmlText(sai_id_text_speed, trans_getText('TEXT_SPEED'));
	trans_setHtmlText(speed_irregular_label, trans_getText('TEXT_SPEED_IRREGULAR'));
	trans_setHtmlText(sai_id_text_rotation, trans_getText('TEXT_ROTATION'));
	trans_setHtmlText(sai_id_text_vortex_direction, trans_getText('TEXT_VORTEX_DIRECTION'));
	trans_setHtmlText(sai_id_text_blinking, trans_getText('TEXT_BLINKING'));
	trans_setHtmlText(sai_id_text_fullscreen_mode, trans_getText('TEXT_FULLSCREN_MODE'));
	trans_setHtmlText(sai_id_page_message_header, trans_getText('TEXT_MESSAGE'));
	trans_setHtmlText(sai_id_button_mesage_reset, trans_getText('TEXT_RESET'));
	trans_setHtmlText(sai_id_color_1st_reset, trans_getText('TEXT_RESET'));
	trans_setHtmlText(sai_id_color_2nd_reset, trans_getText('TEXT_RESET'));
	trans_setHtmlText(sai_id_button_mesage_cancel, trans_getText('TEXT_CANCEL'));
	trans_setHtmlText(sai_id_button_mesage_ok, trans_getText('TEXT_OK'));
	trans_setHtmlText(sai_id_text_message_size, trans_getText('TEXT_MESSAGE_SIZE'));
	trans_setHtmlText(sai_id_text_note, trans_getText('TEXT_NOTE'));
	trans_setHtmlText(sai_id_text_motion_blur, trans_getText('TEXT_MOTION_BLUR'));

	trans_setSelectOptionText(sai_id_select_sound, '', trans_getText('TEXT_NONE'));
	trans_setSelectOptionText(sai_id_select_sound, 'Cattish', trans_getText('TEXT_SOUND_CATTISH'));
	trans_setSelectOptionText(sai_id_select_sound, 'Horror', trans_getText('TEXT_SOUND_HORROR'));
	trans_setSelectOptionText(sai_id_select_sound, 'Hunting', trans_getText('TEXT_SOUND_HUNTING'));
	trans_setSelectOptionText(sai_id_select_sound, 'Longing', trans_getText('TEXT_SOUND_LONGING'));
	trans_setSelectOptionText(sai_id_select_sound, 'Lovely', trans_getText('TEXT_SOUND_LOVELY'));
	trans_setSelectOptionText(sai_id_select_sound, 'Magic', trans_getText('TEXT_SOUND_MAGIC'));
	trans_setSelectOptionText(sai_id_select_sound, 'OraSaimin', trans_getText('TEXT_SOUND_ORA_SAIMIN'));
	trans_setSelectOptionText(sai_id_select_sound, 'Noise', trans_getText('TEXT_SOUND_NOISE'));
	trans_setSelectOptionText(sai_id_select_sound, '432Hz±4Hz', trans_getText('TEXT_SOUND_432HZ'));
	trans_setSelectOptionText(sai_id_select_sound, 'Heli', trans_getText('TEXT_SOUND_HELI'));
	trans_setSelectOptionText(sai_id_select_sound, 'Pachi', trans_getText('TEXT_SOUND_PACHI'));
	trans_setSelectOptionText(sai_id_select_sound, 'WahWah', trans_getText('TEXT_SOUND_WAHWAH'));
	trans_setSelectOptionText(sai_id_select_sound, 'Mechanical', trans_getText('TEXT_SOUND_MECHANICAL'));
	trans_setSelectOptionText(sai_id_select_sound, 'WaterDrop', trans_getText('TEXT_SOUND_WATER_DROP'));
	trans_setSelectOptionText(sai_id_select_sound, 'Psycho', trans_getText('TEXT_SOUND_PSYCHO'));
	trans_setSelectOptionText(sai_id_select_sound, 'MyanMyan', trans_getText('TEXT_SOUND_MYANMYAN'));
	trans_setSelectOptionText(sai_id_select_sound, 'Patrol', trans_getText('TEXT_SOUND_PATROL'));
	trans_setSelectOptionText(sai_id_select_sound, 'Spiral', trans_getText('TEXT_SOUND_SPIRAL'));

	trans_setHtmlText(sai_id_text_sound_volume, trans_getText('TEXT_SOUND_VOLUME'));
	trans_setHtmlText(sai_id_text_auto_play_sound, trans_getText('TEXT_SOUND_AUTO_PLAY'));
	trans_setHtmlText(sai_id_text_auto_repeat_sound, trans_getText('TEXT_SOUND_AUTO_REPEAT'));
	trans_setHtmlText(sai_id_text_switch_sound, trans_getText('TEXT_SOUND_SWITCH'));
	trans_setHtmlText(sai_id_text_brightness, trans_getText('TEXT_BRIGHTNESS'));
	trans_setSelectOptionText(sai_id_select_brightness, 'normal', trans_getText('TEXT_BRIGHTNESS_NORMAL'));
	trans_setSelectOptionText(sai_id_select_brightness, 'brighter', trans_getText('TEXT_BRIGHTNESS_BRIGHTER'));
	trans_setSelectOptionText(sai_id_select_vortex_direction, 'clockwise', trans_getText('TEXT_CLOCKWISE'));
	trans_setSelectOptionText(sai_id_select_vortex_direction, 'counterclockwise', trans_getText('TEXT_COUNTERCLOCKWISE'));
	trans_setHtmlText(sai_id_page_config_header, trans_getText('TEXT_CONFIG'));
	trans_setHtmlText(sai_id_text_label_message_text, trans_getText('TEXT_MESSAGE_TEXT'));
	trans_setHtmlText(sai_id_button_message, trans_getText('TEXT_MESSAGE_BUTTON'));

	sai_id_button_start_hypnosis.innerHTML = trans_getText('TEXT_START_HYPNOSIS');
	trans_setHtmlText(sai_id_button_release_hypnosis, trans_getText('TEXT_RELEASE_HYPNOSIS_BUTTON'));
	trans_setHtmlText(sai_id_text_count_down, trans_getText('TEXT_COUNT_DOWN'));
	trans_setHtmlText(sai_id_text_arrows, trans_getText('TEXT_ARROWS'));
	trans_setHtmlText(sai_id_text_label_message_speech, trans_getText('TEXT_MESSAGE_SPEECH_LABEL'));
	trans_setHtmlText(sai_id_text_message_speech, trans_getText('TEXT_MESSAGE_SPEECH'));
	trans_setHtmlText(sai_id_text_color_1st, trans_getText('TEXT_COLOR_1ST'));
	trans_setHtmlText(sai_id_text_color_2nd, trans_getText('TEXT_COLOR_2ND'));
	trans_setHtmlText(sai_id_button_init_app, trans_getText('TEXT_INIT_APP_BUTTON'));
	trans_setHtmlText(sai_id_text_label_message_volume, trans_getText('TEXT_MESSAGE_VOLUME'));
	trans_setHtmlText(sai_id_text_skin, trans_getText('TEXT_MESSAGE_SKIN'));
	trans_setHtmlText(sai_id_text_vibrator, trans_getText('TEXT_VIBRATOR'));
	trans_setHtmlText(sai_id_button_vibrator_start_stop, trans_getText('TEXT_VIBRATOR_START_STOP'));

	trans_setSelectOptionText(sai_id_select_skin, 'golden', trans_getText('TEXT_GOLDEN'));
	trans_setSelectOptionText(sai_id_select_skin, 'purple', trans_getText('TEXT_PURPLE'));
	trans_setSelectOptionText(sai_id_select_skin, 'blue', trans_getText('TEXT_BLUE'));
	trans_setSelectOptionText(sai_id_select_skin, 'pink', trans_getText('TEXT_PINK'));
	trans_setSelectOptionText(sai_id_select_skin, 'darkgreen', trans_getText('TEXT_DARKGREEN'));
	trans_setSelectOptionText(sai_id_select_skin, 'red', trans_getText('TEXT_RED'));
	trans_setSelectOptionText(sai_id_select_skin, 'black', trans_getText('TEXT_BLACK'));
	trans_setSelectOptionText(sai_id_select_skin, 'white', trans_getText('TEXT_WHITE'));

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
