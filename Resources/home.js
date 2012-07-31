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

var row1 = Titanium.UI.createView({
	width: '90%',
	layout: 'horizontal',
	top: 20
});

// Create Button 1
var button1 = Titanium.UI.createButton({
   title: 'Audio One',
   width: '46%',
   height: 50
});

button1.addEventListener('click',function(e)
	{
		var date = new Date();
  		var prettyTime = String.formatDate(date) + " " + String.formatTime(date);
   		Titanium.API.info("You clicked button one at " + prettyTime);
   		button1.title = "Please Wait.";
   		var millisecondsTillTopOfMinute = 60000 - (Date.now() % 60000);
		var secondsTillTopOfMinute = Math.floor(millisecondsTillTopOfMinute / 1000);
		Titanium.API.info(secondsTillTopOfMinute + " seconds till audio starts.");
   		var button1_timer = new countDown(0, secondsTillTopOfMinute, function(){
   			button1.title = button1_timer.time.s;
   		}, playAudio1);
   		button1_timer.start();  
	});

// Create Button 2
var button2 = Titanium.UI.createButton({
   title: 'Audio Two',
   width: '46%',
   height: 50,
   left: 20
});

button2.addEventListener('click',function(e)
	{
   		var date = new Date();
  		var prettyTime = String.formatDate(date) + " " + String.formatTime(date);
   		Titanium.API.info("You clicked button two at " + prettyTime);
   		button2.title = "Audio Playing";
   		var player2 = Ti.Media.createSound({url:"/audio/countdown.mp3"});
		player2.play();
		player2.addEventListener('complete', function() {
			button2.title = "Audio Two";
		});
    
});
	
// create row for buttons 3 & 4
var row2 = Titanium.UI.createView({
	width: '90%',
	layout: 'horizontal',
	top: 20
});

// Create Button 3
var button3 = Titanium.UI.createButton({
   title: 'Audio Three',
   width: '46%',
   top: 20,
   height: 50
});

button3.addEventListener('click',function(e)
	{
   		Titanium.API.info("You clicked button three");
   		button3.title = "Please Wait.";
   		playScheduledAudio(startTime, audioPlayer1);     
	});

// Create Button 4
var button4 = Titanium.UI.createButton({
   title: 'Audio Four',
   width: '46%',
   height: 50,
   top: 20,
   left: 20
});

button4.addEventListener('click',function(e)
	{
   		Titanium.API.info("You clicked button four");
   		button4.title = "Please Wait.";
   		playScheduledAudio(startTime, audioPlayer1);   		
	});

row1.add(button1);
row1.add(button2);
row1.add(button3);
row1.add(button4);
win1.add(label1);
win1.add(row1);

// win1.add(button1);
// win1.add(button2);
// win1.add(button3);
// win1.add(button4);


var tab1 = Titanium.UI.createTab({  
    icon:'KS_nav_views.png',
    title:'Main',
    window:win1
});
