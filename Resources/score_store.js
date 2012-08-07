var ScoreStore = {
	lastUpdated : undefined, // milliseconds since epoch
	manifestData : undefined, // the JSON returned from the server

	download : function(url, callback) {
		var start = Date.now(),
			userDir = Titanium.Filesystem.getApplicationDataDirectory();

		var client = Ti.Network.createHTTPClient({
			// function called when the response data is available
			onload : function(e) {
				Ti.API.info("Received file");

				var filename = url.match(/\/([^\/]+)$/)[1],
					writeFile = Titanium.Filesystem.getFile(userDir, filename);

				Ti.API.info("writing file");
				writeFile.write(this.responseData);
				Ti.API.info("file written");

				var elapsed = Date.now() - start;
				Ti.API.info("download time: " + elapsed);
				if (callback) callback(writeFile.getNativePath());
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

exports = ScoreStore;

