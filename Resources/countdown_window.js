var countdownWindow = Titanium.UI.createWindow({
    navBarHidden: true,
    layout: 'vertical'
});

// title
var titleLabel = Titanium.UI.createLabel({
	color:'#999',
	text:'Your Corsonus experience will begin in',
	font:{fontSize:22, fontFamily:'Helvetica Neue'},
	top: 30,
	textAlign:'center',
	width: 275
});

var countdownLabel = Titanium.UI.createLabel({
	color:'#999',
	font:{fontSize:22, fontFamily:'Helvetica Neue'},
	top: 15,
	textAlign:'center',
	width: 275
});

var instructionsLabel = Titanium.UI.createLabel({
	color:'#999',
	text:'Make sure your app is open just before the performance beigns.',
	font:{fontSize:15, fontFamily:'Helvetica Neue'},
	top: 15,
	textAlign:'center',
	width: 275
});


Ti.App.addEventListener('app:remote.tick', function(e){
	countdownLabel.setText(e.remaining);
});

countdownWindow.add(titleLabel);
countdownWindow.add(countdownLabel);
countdownWindow.add(instructionsLabel);

exports = countdownWindow;
