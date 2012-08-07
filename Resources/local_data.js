//
// get the demo JSON file and load it into a window
//
var tab2;

(function(){
	var DataStore = {
		lastUpdated: undefined, // milliseconds since epoch
		manifestData: undefined, // the JSON returned from the server
		
		fetchLatest: function(callback) {
			var self = this;
			var client = Ti.Network.createHTTPClient({
				// function called when the response data is available
				onload : function(e) {
					Ti.API.info("Received text: " + this.responseText);
					alert('success');
					
					var json = JSON.parse(this.responseText);
					self.lastUpdated = Date.now();
					self.manifestData = json;
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
		}
	};
	
	DataStore.fetchLatest();
	
	var file = Titanium.Filesystem.getFile('events/default.json');
	var event1 = JSON.parse(file.read().text);
	
	var win2 = Titanium.UI.createWindow({  
	    title:'Data',
	    layout: 'vertical'
	});
	
	tab2 = Titanium.UI.createTab({
	    icon:'KS_nav_ui.png',
	    title: 'Data',
	    window:win2
	});
	
	var eventTitle = Titanium.UI.createLabel({
		color:'#FFF',
		text: event1.title,
		font:{fontSize:20,fontFamily:'Helvetica Neue'},
		textAlign:'left',
		top: 10,
		width:'90%'
	});
	
	var eventDescription = Titanium.UI.createLabel({
	    text: event1.description,
	    height: 75,
	    width:'90%',
	    font:{fontSize:12,fontFamily:'Helvetica Neue', fontWeight:'bold'},
	    color:'#fff',
	    textAlign:'left',
	    top: 10,
	    opacity:0.7,
	    backgroundColor:'#000',
	    editable:false,
	    touchEnabled: false,
	});
	
	win2.add(eventTitle);
	win2.add(eventDescription);
})();
