// Create audio player and load mp3
var audioPlayer1 = Ti.Media.createSound({ 
    url: 'audio/countdown.mp3',
    preload: true
});

var startTime = 60000 - (Date.now() % 60000);
// get # of seconds till startTime
var secondsRemaining = Math.floor(startTime / 1000);

var countDown =  function( m , s, fn_tick, fn_end  ) {
	return {
		total_sec:m*60+s,
		timer:this.timer,
		set: function(m,s) {
			this.total_sec = parseInt(m)*60+parseInt(s);
			this.time = {m:m,s:s};
			return this;
		},
		start: function() {
			var self = this;
			this.timer = setInterval( function() {
				if (self.total_sec) {
					self.total_sec--;
					self.time = { m : parseInt(self.total_sec/60), s: (self.total_sec%60) };
					fn_tick();
				}
				else {
					self.stop();
					fn_end();
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

function playAudio1() {
	Titanium.API.info("Playing Audio One");
	audioPlayer1.play();
	audioPlayer1.addEventListener('complete', function() {
	button1.title = "Audio One";
	});   
}
