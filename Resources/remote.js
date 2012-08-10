var startTime, timer;

var msRemaining = function(){
	return startTime ? (startTime.getTime() - Date.now()) : undefined;
};

var startCoundown = function(msTilStart){
	if (timer){
		// cancel prior countdown
		timer.stop();
	}
	
	Ti.App.fireEvent('app:remote.countdown');

	timer = new Timer({
		m: 0,
		s: Math.floor(msTilStart / 1000),
		fn_tick: function(remaining){
			Ti.API.info("Remaining time: " + remaining);
			Ti.App.fireEvent('app:remote.tick', {
				remaining: remaining
			});
		},
		fn_end: function(){
			Ti.App.fireEvent('app:remote.start');
		}
	});
	timer.start();
};

var updateStartTime = function(newStart){
	if (!startTime || newStart.getTime() !== startTime.getTime()){
		startTime = newStart;
		Ti.API.info("Updated start time: " + startTime.toString());

		var msTilStart = msRemaining();
		if (msTilStart > 0){
			startCoundown(msTilStart);
		} else {
			// no upcoming performance
		}
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
