// for iOS - note that the simulator is not capable of multitasking,
// so won't play sounds in the background
var platform = Ti.Platform.getOsname();
if (platform === 'iphone' || platform === 'ipad'){
	Ti.Media.setAudioSessionMode(Ti.Media.AUDIO_SESSION_MODE_PLAYBACK);
}

var sound;
exports.playTrack = function(track){
	Ti.API.info('playing track + ' + track.file_path);
	if (sound){
		sound.release();
	}
	
	sound = Ti.Media.createSound({
		allowBackground: true, // for Android
		url: track.file_path
	});
	
	sound.addEventListener('resume', function(){
		Ti.App.fireEvent('app:player.resume');
	});
	
	sound.addEventListener('complete', function(){
		sound.release();
		Ti.App.fireEvent('app:player.complete');
	});

	sound.play();
};
