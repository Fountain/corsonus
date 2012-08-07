var ScoreStore = {
	lastUpdated : undefined, // milliseconds since epoch
	manifestData : undefined, // the JSON returned from the server

	download : function(url, callback) {
		var userDir = Titanium.Filesystem.getApplicationDataDirectory();

		var client = Ti.Network.createHTTPClient({
			// function called when the response data is available
			onload : function(e) {
				Ti.API.info("Received file");
				alert('success');

				var filename = url.match(/\/([^\/]+)$/)[1],
					writeFile = Titanium.Filesystem.getFile(userDir, filename);

				writeFile.write(this.responseData);
				writeFile.close();

				if (callback) callback(json);
			},
			// function called when an error occurs, including a timeout
			onerror : function(e) {
				Ti.API.debug(e.error);
				alert('error');
			},
			timeout : 10000 // in milliseconds
		});
		// Prepare the connection.
		client.open('GET', url);
		// Send the request.
		client.send();
	}
};

ScoreStore.download('http://corsonus.com/audio/0001/track_01.mp3');
