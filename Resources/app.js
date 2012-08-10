// this sets the background color of the master UIView (when there are no windows on it)
Titanium.UI.setBackgroundColor('#000');
Titanium.UI.setBackgroundImage('images/splash~iphone.png');

Ti.include('lib/underscore.js');
Ti.include('home.js');
var ScoreStore = require('score_store');
var DataStore = require('data_store');
var Player = require('player');
var Timer = require('timer');
var Remote = require('remote');
var introWindow = require('intro_window');

introWindow.open({navBarHidden: true});

// fetch performance data
DataStore.fetchLatest();
Remote.fetchStartTime();


// delay hiding the intro window
setTimeout(function(){
	Ti.App.addEventListener('app:remote.tick', function(e){
		// show the Tracks window if the performance is within an hour
		Ti.API.info('ticking ' + e.remaining);
		if (e.remaining < 60 * 60){
			introWindow.close();
			tracksWindow.open({navBarHidden: true});
		}
	});
}, 6000);

Ti.App.addEventListener('app:remote.start', function(){
	tracksWindow.close();
	// tracksWindow.setVisible(false);
});
