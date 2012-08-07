var Player = Ti.Media.createSound({
	allowBackground: true, // for Android
	audioSessionMode: Ti.Media.AUDIO_SESSION_MODE_PLAYBACK // for iOS
});


exports = Player;
