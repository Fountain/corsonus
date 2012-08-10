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

// fetch performance data
DataStore.fetchLatest();
Remote.fetchStartTime();

tracksWindow.open({navBarHidden: true});
