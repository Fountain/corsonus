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

exports.fetchLatest = function(callback) {
	var client = Ti.Network.createHTTPClient({
		// function called when the response data is available
		onload : function(e) {
			Ti.API.info("Received JSON");
			
			lastUpdated = Date.now();
			var json = JSON.parse(this.responseText);
			manifestData = json;
			json.tracks.forEach(function(track){
				tracksByUrl[track.audio_url] = track;

				// download the file
				ScoreStore.fetchOrDownload(track.audio_url, function(audioFile){
					track.file_path = audioFile.getNativePath();
					Ti.API.info(JSON.stringify(track));
					Ti.App.fireEvent('app:track.downloaded', track);
				});
				
				Ti.App.fireEvent('app:track.added', track);
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

exports.getTrackByUrl = function(url){
	return tracksByUrl[url];
};

