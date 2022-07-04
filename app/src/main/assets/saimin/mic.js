var mic_context = null;
var mic_gainNode = null;
var mic_biquadFilter = null;
var mic_source = null;
var mic_analyser = null;

function mic_setup(){
  if (navigator.mediaDevices === undefined){
    navigator.mediaDevices = {};
  }

  if (navigator.mediaDevices.getUserMedia === undefined){
    navigator.mediaDevices.getUserMedia = function(constraints){
      let getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
      if (!getUserMedia){
        return Promise.reject(new Error('getUserMedia is not implemented in this browser'));
      }
      return new Promise(function(resolve, reject){
        getUserMedia.call(navigator, constraints, resolve, reject);
      });
    }
  }
}

function mic_connect(){
  mic_context = new (window.AudioContext || window.webkitAudioContext)();
  mic_analyser = mic_context.createAnalyser();
  mic_analyser.minDecibels = -90;
  mic_analyser.maxDecibels = -10;
  mic_analyser.smoothingTimeConstant = 0.85;
  mic_gainNode = mic_context.createGain();
  mic_biquadFilter = mic_context.createBiquadFilter();

  if (navigator.mediaDevices.getUserMedia){
    navigator.mediaDevices.getUserMedia({
      audio: {
        autoGainControl: true
      }
    })
    .then(
      function(stream){
        mic_source = mic_context.createMediaStreamSource(stream);
        mic_source.connect(mic_biquadFilter);
        mic_biquadFilter.connect(mic_gainNode);
        mic_gainNode.connect(mic_analyser);
        mic_analyser.connect(mic_context.destination);
        mic_biquadFilter.gain.setTargetAtTime(0, mic_context.currentTime, 0);
    })
    .catch(function(err){
      console.log('The following gUM error occured: ' + err);
    })
  } else {
     console.log('getUserMedia not supported on your browser!');
  }

  mic_gainNode.value = 2.0;
  mic_biquadFilter.gain.setTargetAtTime(0, mic_context.currentTime, 0)
  mic_biquadFilter.disconnect(0);
  mic_biquadFilter.connect(mic_gainNode);
  mic_biquadFilter.type = "lowpass";
  mic_biquadFilter.frequency.value = 310;
}

function mic_disconnect(){
  if (mic_source){
    mic_source.disconnect(0);
    mic_source = null;
  }
  if (mic_gainNode){
    mic_gainNode.disconnect(0);
    mic_gainNode = null;
  }
  if (mic_analyser){
    mic_analyser.disconnect(0);
    mic_analyser = null;
  }
  if (mic_biquadFilter){
    mic_biquadFilter.disconnect(0);
    mic_biquadFilter = null;
  }
  mic_context = null;
}
