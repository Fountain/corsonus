var win1 = Titanium.UI.createWindow({  
    navBarHidden: true,
    layout: 'vertical'
});

//
// create base UI tab and root window
//
var label1 = Titanium.UI.createLabel({
	color:'#999',
	text:'Corsonus: alpha',
	font:{fontSize:22, fontFamily:'Helvetica Neue'},
	top: 20,
	textAlign:'center',
	width: 200
});
win1.add(label1);



var onTrackClick = function(button, track){
	var date = new Date();
	var prettyTime = String.formatDate(date) + " " + String.formatTime(date);
	Titanium.API.info("You clicked button at " + prettyTime);
	button.title = "Please Wait.";
	var millisecondsTillTopOfMinute = 60000 - (Date.now() % 60000);
	var secondsTillTopOfMinute = Math.floor(millisecondsTillTopOfMinute / 1000);
	Titanium.API.info(secondsTillTopOfMinute + " seconds till audio starts.");
	var button_timer = new Timer({
		m : 0,
		s : 3, //secondsTillTopOfMinute,
		fn_tick : function(remaining) {
			button.title = remaining;
		},
		fn_end : function() {
			Player.setUrl(track.file_path);
			Player.play();
		}
	});
	button_timer.start();
};


var rowSize = 0,
	row;

Ti.App.addEventListener('app:track.added', function(track){
	// Create Button
	var button = Titanium.UI.createButton({
	   title: track.name,
	   width: '46%',
	   height: 50,
	   left: 5
	});
	
	button.addEventListener('click', function(e){
		onTrackClick(button, track);
	});

	if (!row){
		row = Titanium.UI.createView({
			width: '90%',
			layout: 'horizontal',
			top: 20
		});
		win1.add(row);
	}
	
	row.add(button);
	
	if (rowSize == 2){
		rowSize = 0;
		row = null;
	}
});


var tab1 = Titanium.UI.createTab({  
    icon:'KS_nav_views.png',
    title:'Main',
    window:win1
});
