// Define all design elements to be displayed within the application
var fntFmly = "Arial";

var mainWin = Ti.UI.createWindow ({
	backgroundColor: "#ffffff",
	layout: "vertical"
});

var alertView = Ti.UI.createView ({
	backgroundColor: "#e60000",
	top: 20, left: 0, right: 0, height: 20
});
var alertText = Ti.UI.createLabel ({
	font: {fontSize: 12, fontFamily: fntFmly}
});
alertView.add(alertText);

var tempView = Ti.UI.createView ({
	left: 0, right: 0,
	backgroundColor: "#ededed",
	top: 20,
	layout: "vertical"
});

var refreshImg = Ti.UI.createImageView ({
	image: "images/refresh.png",
	height: 15, top: 5, right: 5
});
tempView.add(refreshImg);

var wthrImg = Ti.UI.createImageView ({
	image: "?",
	height: 50
});
tempView.add(wthrImg);

var tempText = Ti.UI.createLabel ({
	text: "?",
	top: 10,
	color: "#333333",
	font: {fontSize: 56, fontFamily: fntFmly}
});
tempView.add(tempText);

var locationText = Ti.UI.createLabel ({
	text: "?, ?",
	top: "#5c5c5c",
	font: {fontSize: 16, fontFamily: fntFmly}
});
tempView.add(locationText);

var alerts = require("alerts");

var updateView = function(response) {
	wthrImg.image = response.wthrImg;
	tempText.text = response.temp + "°";
	locationText.text = response.city + ", " + response.state;
	if (response.desc == "") {
		alertView.height = 0;
		alertView.top = 0;
	} else {
		alertText.text = response.desc;
		alertText.top = 2;
		alertView.height = 20;
		alertView.top = 20;
		tempView.top = 0;
		
		alertView.addEventListener("click", function(){
			alerts.infoWin.open();
			alerts.infoText.text = response.desc + response.msg;
		});
	}
};

// Refresh data
refreshImg.addEventListener('click', function(){
	if (Ti.Network.online) {
		// Connect to the API and send results to the Ui and DB
		var data = require("db");
		data.getGeo();
	} else {
		// Connect to the DB if the user has been opened the application before with internet
		alert("Please connect to the internet.");
	}
});

mainWin.add(alertView, tempView);
mainWin.open();
exports.updateView = updateView;