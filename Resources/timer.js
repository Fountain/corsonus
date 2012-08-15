module.exports = function(opts){
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
				if (self.total_sec > 0) {
					self.total_sec--;
					self.time = { m : parseInt(self.total_sec/60), s: (self.total_sec%60) };
					opts.fn_tick(self.total_sec);
				} else {
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
};
