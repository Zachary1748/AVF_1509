// Check to see if the network is online

var start = function() {
	if (Ti.Network.online) {
		// Connect to the API and send results to the Ui and DB
		var api = require("api");
		api.getGeo();
	} else {
		// Connect to the DB if the user has been opened the application before with internet
		var localData = require("db");
		
		alert("Please connect to the internet.");
		localData.read();
	}
};

// exports.start = start;
start();

