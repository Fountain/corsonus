var nextStart = undefined;

exports.update = function(){
	var client = Ti.Network.createHTTPClient({
		// function called when the response data is available
		onload : function(e) {
			var json = JSON.parse(this.responseText);
			// start time is in milliseconds
			nextStart = new Date(json.start_time);
			
			Ti.API.info("Updated start time: " + nextStart.toString());
		},
		// function called when an error occurs, including a timeout
		onerror : function(e){
			Ti.API.debug(e.error);
			alert('error');
		},
		timeout : 3000 // in milliseconds
	});
	
	// Prepare the connection.
	Ti.API.info('updating start time');
	client.open('GET', 'http://api.corsonus.com/start.json');
	// Send the request.
	client.send();
};

// var interval = setInterval(function(){
// 	
// }, 5000);

// Ti.App.fireEvent('app:remote.start');
