var startTime, timer;

var updateStartTime = function(newStart){
	if (!startTime || newStart.getTime() !== startTime.getTime()){
		if (timer){
			// cancel prior countdown
			timer.stop();
		}
		
		startTime = newStart;
		Ti.API.info("Updated start time: " + startTime.toString());
		var msTilStart = startTime.getTime() - Date.now();
		
		timer = new Timer({
			m: 0,
			s: Math.floor(msTilStart / 1000),
			fn_tick: function(remaining){
				Ti.API.info("Remaining time: " + remaining);
			}
		});
		timer.start();
	}
};

exports.fetchStartTime = function(){
	var client = Ti.Network.createHTTPClient({
		// function called when the response data is available
		onload : function(e) {
			var json = JSON.parse(this.responseText);
			// start time is in milliseconds
			newStart = new Date(json.start_time);
			updateStartTime(newStart);
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
