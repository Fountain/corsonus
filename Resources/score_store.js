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
			Ti.API.info("Received file", url);

			audioFile.write(this.responseData);

			var elapsed = (Date.now() - start) / 1000;
			Ti.API.info('download time for ' + url + ' - ' + elapsed + ' seconds');
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
	Ti.API.info('downloading', url);
	client.open('GET', url);
	// Send the request.
	client.send();
};

exports.fetchOrDownload = function(url, callback){
	var audioFile = getAudioFile(url);
	if (audioFile.exists()){
		Ti.API.info(url + ' exists');
		if (callback) callback(audioFile);
	} else {
		exports.download(url, callback);
	}
};

