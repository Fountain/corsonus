// this sets the background color of the master UIView (when there are no windows on it)
Titanium.UI.setBackgroundColor('#000');
Titanium.UI.setBackgroundImage('images/splash~iphone.png');

Ti.include('home.js');
var ScoreStore = require('score_store');
var DataStore = require('data_store');
var Player = require('player');
var Timer = require('timer');
var Remote = require('remote');
var introWindow = require('intro_window');
var countdownWindow = require('countdown_window');
var creditsWindow = require('credits_window');

introWindow.open();

// fetch performance data
DataStore.fetchLatest();
Remote.fetchStartTime();

var dataFetchInterval = setInterval(function(){
	// fetch performance data
	Ti.API.info('fetching new data');
	DataStore.fetchLatest();
	Remote.fetchStartTime();
}, 10000);


var onTrackChosen = function(){
	introWindow.close();
	tracksWindow.close();
	countdownWindow.open();
	creditsWindow.close();
};


// delay hiding the intro window
setTimeout(function(){
	Ti.App.addEventListener('app:remote.tick', function(e){
		// show the Tracks window if the performance is within an hour
		if (chosenTrack){ // global
			onTrackChosen();
		} else if (e.remaining < 60 * 60){
			introWindow.close();
			tracksWindow.open();
			countdownWindow.close();
			creditsWindow.close();
		}
	});
}, 6000);


Ti.App.addEventListener('app:track.choose', onTrackChosen);


var onMusicPlay = function(){
	clearInterval(dataFetchInterval);
	
	introWindow.close();
	tracksWindow.close();
	countdownWindow.close();
	creditsWindow.close();
};

Ti.App.addEventListener('app:remote.start', onMusicPlay);
Ti.App.addEventListener('app:player.resume', onMusicPlay);

Ti.App.addEventListener('app:player.complete', function(){
	introWindow.close();
	tracksWindow.close();
	countdownWindow.close();
	creditsWindow.open();
});

