// for iOS - note that the simulator is not capable of multitasking,
// so won't play sounds in the background
Ti.Media.setAudioSessionMode(Ti.Media.AUDIO_SESSION_MODE_PLAYBACK);

var Player = Ti.Media.createSound({
	allowBackground: true // for Android
});

exports.playTrack = function(track){
	Player.setUrl(track.file_path);
	Player.play();
};
