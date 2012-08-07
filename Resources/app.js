// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');
Titanium.UI.setBackgroundImage('images/splash~iphone.png');


//
// create base UI tab and root window
//

Ti.include('home.js');
Ti.include('local_data.js');
var ScoreStore = require('score_store');
var DataStore = require('data_store');
var Player = require('player');
Ti.include('admin_data.js');
Ti.include('timer.js');


DataStore.fetchLatest(function(json){
	var tracks = json.tracks;
	for (var i = 0; i < tracks.length; i++){
		ScoreStore.fetchOrDownload(tracks[i].audio_url);
	}
});

// ScoreStore.fetchOrDownload('http://corsonus.com/audio/0001/track_01.mp3', function(audioFile){
	// var path = audioFile.getNativePath();
	// Ti.API.info("time to play: ", path);
	// Player.setUrl(path);
	// Player.play();
// });


// create tab group
var tabGroup = Titanium.UI.createTabGroup();

win1.open({navBarHidden: true});

//  add tabs to tabgroup
tabGroup.addTab(tab1);  
tabGroup.addTab(tab2);
tabGroup.addTab(tab3);

// open tab group
tabGroup.open();

