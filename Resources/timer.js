var startTime = 60000 - (Date.now() % 60000);
// get # of seconds till startTime
var secondsRemaining = Math.floor(startTime / 1000);

var countDown = function(opts){
	return {
		total_sec: opts.m * 60 + opts.s,
		timer:this.timer,
		set: function(m,s) {
			this.total_sec = parseInt(m) * 60 + parseInt(s);
			this.time = {m:m, s:s};
			return this;
		},
		start: function() {
			var self = this;
			this.timer = setInterval( function() {
				if (self.total_sec) {
					self.total_sec--;
					self.time = { m : parseInt(self.total_sec/60), s: (self.total_sec%60) };
					opts.fn_tick();
				}
				else {
					self.stop();
					opts.fn_end();
				}
				}, 1000 );
			return this;
		},
		stop: function() {
			clearInterval(this.timer)
			this.time = {m:0,s:0};
			this.total_sec = 0;
			return this;
		}
	}
}

function countdownTimer() {
	var counter = setInterval(function() {
				var millisecondsTillTopOfMinute = 60000 - (Date.now() % 60000);
				var secondsTillTopOfMinute = Math.floor(millisecondsTillTopOfMinute / 1000);
				Titanium.API.info(secondsTillTopOfMinute + " seconds till audio starts.");
				if (secondsTillTopOfMinute === 0) {
					clearInterval(counter);
				}
				updateButton(secondsTillTopOfMinute) ;
			}, 1000)
}

