// Check to see if the network is online
var data = require("db");

if (Ti.Network.online) {
	// Connect to the API and send results to the Ui and DB
	data.getGeo();
} else {
	// Connect to the DB if the user has been opened the application before with internet
	alert("Please connect to the internet.");
	data.read();
}
