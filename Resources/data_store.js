var lastUpdated, // milliseconds since epoch
	manifestData = {}, // the JSON returned from the server
	tracksByUrl = {};

// Track structure
// {
//   audio_url: "http://corsonus.com/audio/0001/track_01.mp3",
//   file_path: "file://...",  // unset until downloaded
//   name: "Blue",
//   artist_name: "Reggie Watts"
// }

exports.getTrackByUrl = function(url){
	return tracksByUrl[url];
};

var addTrack = function(track){
	var audioUrl = track.audio_url,
		existingTrack = exports.getTrackByUrl(audioUrl);

	if (existingTrack){
		// overwrite with new data
		// TODO 'change' events?
		_.extend(existingTrack, track);
		track = existingTrack;
	} else {
		// add to index
		tracksByUrl[audioUrl] = track;
	}

	if (!existingTrack){
		Ti.App.fireEvent('app:track.added', track);
	}
};


var walkerFile = Titanium.Filesystem.getFile('audio/corsonus-walker-001.mp3');

var defaultTrack = {
  audio_url: "http://corsonus.com/audio/0001/corsonus-walker-001.mp3",
  file_path: walkerFile.getNativePath(),
  name: "Orange",
  artist_name: "Tyler Walker"
};
addTrack(defaultTrack);

exports.getDefaultTrack = function(){
	return defaultTrack;
};


exports.fetchLatest = function(callback) {
	var client = Ti.Network.createHTTPClient({
		// function called when the response data is available
		onload : function(e) {
			Ti.API.info("Received JSON");
			
			lastUpdated = Date.now();
			var json = JSON.parse(this.responseText);
			manifestData = json;
			json.tracks.forEach(function(track){
				addTrack(track);
			});
			
			if (callback) callback(json);
		},
		// function called when an error occurs, including a timeout
		onerror : function(e) {
			Ti.API.debug(e.error);
			alert('error');
		},
		timeout : 5000 // in milliseconds
	});
	// Prepare the connection.
	client.open('GET', 'http://corsonus.com/programs/corsonus-1.json');
	// Send the request.
	client.send();
};

exports.ensureDownloaded = function(track){
	if (!track.file_path){
		// download the file
		ScoreStore.fetchOrDownload(track.audio_url, function(audioFile){
			track.file_path = audioFile.getNativePath();
			Ti.API.info(JSON.stringify(track));
			Ti.App.fireEvent('app:track.downloaded', track);
		});
	}
};

exports.getTrackByUrl = function(url){
	return tracksByUrl[url];
};

