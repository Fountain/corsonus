// root window
var win1 = Titanium.UI.createWindow({  
    navBarHidden: true,
    layout: 'vertical'
});

// title
var label1 = Titanium.UI.createLabel({
	color:'#999',
	text:'Corsonus:Four',
	font:{fontSize:22, fontFamily:'Helvetica Neue'},
	top: 20,
	textAlign:'center',
	width: 200
});
win1.add(label1);

// instructions
var instructionLabel = Titanium.UI.createLabel({
	color:'#999',
	text: "Please select an audio performance to download.  Wi-fi recommended.",
	font:{fontSize:15, fontFamily:'Helvetica Neue'},
	top: 15,
	textAlign:'center',
	width: 300
});
win1.add(instructionLabel);


var chosenTrack;

var onTrackClick = function(button, track){
	chosenTrack = track;
	DataStore.ensureDownloaded(track);
	// TODO change button state
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


Ti.App.addEventListener('app:remote.start', function(){
	// fall back to the default track if the chosen one hasn't been downloaded
	var track;
	if (chosenTrack && chosenTrack.file_path){
		Ti.API.info("Playing chosen track: " + chosenTrack.name);
	 	track = chosenTrack;
	} else {
		Ti.API.info("playing default track");
		track = DataStore.getDefaultTrack();
	}

	Player.playTrack(track);
});

