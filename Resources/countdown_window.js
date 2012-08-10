var countdownWindow = Titanium.UI.createWindow({
    navBarHidden: true,
    layout: 'vertical'
});

// title
var countdownLabel = Titanium.UI.createLabel({
	color:'#999',
	text:'Your Corsonus experience will begin in...',
	font:{fontSize:22, fontFamily:'Helvetica Neue'},
	top: 30,
	textAlign:'center',
	width: 200
});

Ti.App.addEventListener('app:remote.tick', function(e){
	countdownLabel.setText(e.remaining);
});

countdownWindow.add(countdownLabel);

exports = countdownWindow;
