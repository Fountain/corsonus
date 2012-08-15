var creditsWindow = Titanium.UI.createWindow({
    navBarHidden: true,
    layout: 'vertical'
});

var creditsScroller = Ti.UI.createScrollView({
	contentWidth: 'auto',
	scrollType: 'vertical',
	showVerticalScrollIndicator: true,
	height: '100%',
	width: '100%'
});

var creditsLabel = Titanium.UI.createLabel({
	color:'#999',
	text: DataStore.getCredits(),
	font:{fontSize:15, fontFamily:'Helvetica Neue'},
	top: 20,
	textAlign:'center',
	width: 275
});

creditsScroller.add(creditsLabel);
creditsWindow.add(creditsScroller);


module.exports = creditsWindow;
