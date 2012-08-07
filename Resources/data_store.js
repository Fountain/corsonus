var lastUpdated, // milliseconds since epoch
	manifestData; // the JSON returned from the server

exports.fetchLatest = function(callback) {
	var client = Ti.Network.createHTTPClient({
		// function called when the response data is available
		onload : function(e) {
			Ti.API.info("Received JSON");
			
			lastUpdated = Date.now();
			var json = JSON.parse(this.responseText);
			manifestData = json;
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
