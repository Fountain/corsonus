var introWindow = Titanium.UI.createWindow({
    navBarHidden: true,
    layout: 'vertical'
});

// title
var titleLabel = Titanium.UI.createLabel({
	color:'#999',
	text:'Corsonus:Four',
	font:{fontSize:22, fontFamily:'Helvetica Neue'},
	top: 20,
	textAlign:'center',
	width: 200
});
introWindow.add(titleLabel);

// body
var bodyLabel = Titanium.UI.createLabel({
	color:'#999',
	text: "Welcome to Corsonus. This application has been designed to accompany a live theatrical performance. If you are attending the performance, hang tight, otherwise please visit corsonus.com for more details.",
	font:{fontSize:16, fontFamily:'Helvetica Neue'},
	top: 20,
	textAlign:'center',
	width: 290
});
introWindow.add(bodyLabel);


module.exports = introWindow;
