var userDir = Titanium.Filesystem.getApplicationDataDirectory();

var getAudioFile = function(url){
	var filename = url.match(/\/([^\/]+)$/)[1];
	return Titanium.Filesystem.getFile(userDir, filename);
}

exports.download = function(url, callback){
	var start = Date.now(),
		audioFile = getAudioFile(url);

	var client = Ti.Network.createHTTPClient({
		// function called when the response data is available
		onload : function(e) {
			Ti.API.info("Received file");

			Ti.API.info("writing file");
			audioFile.write(this.responseData);
			Ti.API.info("file written");

			var elapsed = Date.now() - start;
			Ti.API.info("download time: " + elapsed);
			if (callback) callback(audioFile);
		},
		// function called when an error occurs, including a timeout
		onerror : function(e){
			Ti.API.debug(e.error);
			alert('error');
		},
		timeout : 10000 // in milliseconds
	});
	// Prepare the connection.
	client.open('GET', url);
	// Send the request.
	client.send();
};

exports.fetchOrDownload = function(url, callback){
	var audioFile = getAudioFile(url);
	if (audioFile.exists()){
		Ti.API.info('file exists');
		callback(audioFile);
	} else {
		exports.download(url, callback);
	}
};

