// for iOS - note that the simulator is not capable of multitasking,
// so won't play sounds in the background
Ti.Media.setAudioSessionMode(Ti.Media.AUDIO_SESSION_MODE_PLAYBACK);

var sound = Ti.Media.createSound({
	allowBackground: true // for Android
});

sound.playTrack = function(track){
	sound.setUrl(track.file_path);
	sound.play();
};

sound.addEventListener('complete', function(){
	sound.release();
});


exports = sound;
