// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');
Titanium.UI.setBackgroundImage('images/splash~iphone.png');


//
// create base UI tab and root window
//

Ti.include('lib/underscore.js');
Ti.include('home.js');
Ti.include('local_data.js');
var ScoreStore = require('score_store');
var DataStore = require('data_store');
var Player = require('player');
var Remote = require('remote');
Ti.include('admin_data.js');
Ti.include('timer.js');


DataStore.fetchLatest();
Remote.fetchStartTime();


// create tab group
var tabGroup = Titanium.UI.createTabGroup();

win1.open({navBarHidden: true});

//  add tabs to tabgroup
tabGroup.addTab(tab1);  
tabGroup.addTab(tab2);
tabGroup.addTab(tab3);

// open tab group
tabGroup.open();

