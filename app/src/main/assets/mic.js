// mic.js --- マイク入力からスピーカー出力をするだけのライブラリ。
// Copyright (C) 2023 katahiromz.

var mic_audio = null;
var mic_microphone = null;

const mic_setup = function(){
	navigator.mediaDevices = navigator.mediaDevices || ((navigator.mozGetUserMedia || navigator.webkitGetUserMedia) ? {
		getUserMedia: function(c){
			return new Promise(function(y, n){
				(navigator.mozGetUserMedia || navigator.webkitGetUserMedia).call(navigator, c, y, n);
			});
		}
	} : null);
	if (!navigator.mediaDevices){
		console.log('!navigator.mediaDevices');
		return false;
	}
	return true;
}

const mic_connect = function(){
	if (mic_audio){
		mic_microphone.connect(mic_audio.destination);
		return true;
	}
	var constraints = window.constraints = { 
		audio: {
			autoGainControl: true,
			channelCount: 1,
			echoCancellation: true,
			noiseSuppression: false,
			volume: {ideal: 3.0, min: 1.0},
			echoCancellationType : 'system'
		}
	};
	navigator.mediaDevices.getUserMedia(constraints).then(function(stream){
		mic_audio = new AudioContext();
		mic_microphone = mic_audio.createMediaStreamSource(stream);
		mic_microphone.connect(mic_audio.destination);
	}).catch(function(err){
		console.log(err.message);
	});
	return true;
}

const mic_disconnect = function(){
	if (mic_microphone){
		mic_microphone.disconnect();
	}
	return true;
}
