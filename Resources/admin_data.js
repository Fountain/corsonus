//
// create controls tab and root window for admin page
//
var win3 = Titanium.UI.createWindow({  
    title:'Admin',
    layout: 'vertical'
});
var tab3 = Titanium.UI.createTab({  
    icon:'KS_nav_ui.png',
    title:'Admin',
    window:win3
});

var label3 = Titanium.UI.createLabel({
	color:'#FFF',
	text:'Admin Functions Go Here',
	top: 10,
	font:{fontSize:20,fontFamily:'Helvetica Neue'},
	textAlign:'center',
	width:'auto'
});

win3.add(label3);
