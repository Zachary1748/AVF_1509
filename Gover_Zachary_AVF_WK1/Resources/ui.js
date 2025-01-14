// Define all design elements to be displayed within the application
var fntFmly = "Arial";

var mainWin = Ti.UI.createWindow ({
	title: "Weather",
	backgroundColor: "#ededed",
	layout: "vertical"
});

if (!Ti.Platform.osname === "android") {
	var statusBar = Ti.UI.createView({
		height: 20, left: 0, right: 0, top: 0,
		backgroundColor: "#ededed"
	});
	
	mainWin.add(statusBar);
}

var alertView = Ti.UI.createView ({
	backgroundColor: "#e60000",
	left: 0, right: 0, top: 20
});
var alertText = Ti.UI.createLabel ({
	color: "#FFFFFF",
	font: {fontSize: 12, fontFamily: fntFmly}
});
alertView.add(alertText);

var tempView = Ti.UI.createView ({
	left: 0, right: 0, height: "45%",
	backgroundColor: "#ffffff",
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

var weatherStatus = Ti.UI.createLabel ({
	text: "--",
	color: "#A6A6A6", top: 0,
	font: {fontFamily: fntFmly, fontSize: 14}
});
tempView.add(weatherStatus);

var tempText = Ti.UI.createLabel ({
	text: "--",
	top: 10,
	color: "#333333",
	font: {fontSize: 66, fontFamily: fntFmly}
});
tempView.add(tempText);

var locationText = Ti.UI.createLabel ({
	text: "City, St. \n Zip, Country",
	top: 5,
	color: "#5c5c5c",
	font: {fontSize: 16, fontFamily: fntFmly},
	textAlign: "center"
});
tempView.add(locationText);

var forecast = Ti.UI.createView({
	height: "55%",
	backgroundColor: "#FFFFFF",
	layout: "vertical"
});

var hourlyForecast = Ti.UI.createView({
	left: 0, right: 0, bottom: 0, top: 0, height: "40%",
	layout: "horizontal", //borderColor: "#ff000"
});

var hourlyView = Ti.UI.createView({
	backgroundColor: "#efefef",
	left: 0, right: 0, top: 0, height: 30, bottom: "10%"
});

var hourlyLabel = Ti.UI.createLabel ({
	text: "Hourly Forecast",
	font: {fontFamily: fntFmly, fontSize: 16},
	color: "#000000"
});
hourlyView.add(hourlyLabel);
hourlyForecast.add(hourlyView);

// Hour One
var hourOneView = Ti.UI.createView ({
	left: 0,
	width: "25%",
	layout: "vertical"
});
var hourOneImage = Ti.UI.createImageView ({
	image: "?",
	height: 30
});
hourOneView.add(hourOneImage);

var hourOneText = Ti.UI.createLabel({
	text: "?",
	font: {fontSize: 11, fontFamily: fntFmly},
	color: "#000000"
});
hourOneView.add(hourOneText);

// Hour Two
var hourTwoView = Ti.UI.createView ({
	left: 0,
	width: "25%",
	layout: "vertical"
});
var hourTwoImage = Ti.UI.createImageView ({
	image: "?",
	height: 30
});
hourTwoView.add(hourTwoImage);

var hourTwoText = Ti.UI.createLabel({
	text: "?",
	font: {fontSize: 11, fontFamily: fntFmly},
	color: "#000000"
});
hourTwoView.add(hourTwoText);

// Hour Three
var hourThreeView = Ti.UI.createView ({
	left: 0,
	width: "25%",
	layout: "vertical"
});
var hourThreeImage = Ti.UI.createImageView ({
	image: "?",
	height: 30
});
hourThreeView.add(hourThreeImage);

var hourThreeText = Ti.UI.createLabel({
	text: "?",
	font: {fontSize: 11, fontFamily: fntFmly},
	color: "#000000"
});
hourThreeView.add(hourThreeText);

// Hour Four
var hourFourView = Ti.UI.createView ({
	left: 0,
	width: "25%",
	layout: "vertical"
});
var hourFourImage = Ti.UI.createImageView ({
	image: "?",
	height: 30
});
hourFourView.add(hourFourImage);

var hourFourText = Ti.UI.createLabel({
	text: "?",
	font: {fontSize: 11, fontFamily: fntFmly},
	color: "#000000"
});
hourFourView.add(hourFourText);

hourlyForecast.add(hourOneView);
hourlyForecast.add(hourTwoView);
hourlyForecast.add(hourThreeView);
hourlyForecast.add(hourFourView);
forecast.add(hourlyForecast);

var dailyForecast = Ti.UI.createView({
	left: 0, right: 0, bottom: 20, top: 0, height: "50%",
	layout: "horizontal", //borderColor: "blue"
});

var dailyView = Ti.UI.createView({
	backgroundColor: "#efefef",
	left: 0, right: 0, top: 10, height: 30, bottom: "10%"
});

var dailyLabel = Ti.UI.createLabel ({
	text: "Daily Forecast",
	font: {fontFamily: fntFmly, fontSize: 16},
	color: "#000000"
});
dailyView.add(dailyLabel);
dailyForecast.add(dailyView);

// Day One
var dayOneView = Ti.UI.createView ({
	top: 0, left: 0,
	width: "32%",
	layout: "vertical"
});
var dayOneImage = Ti.UI.createImageView ({
	image: "?",
	height: 50, top: 0
});
dayOneView.add(dayOneImage);

var dayOneText = Ti.UI.createLabel({
	text: "?",
	top: 0,
	font: {fontSize: 14, fontFamily: fntFmly},
	color: "#000000"
});
dayOneView.add(dayOneText);

// Day Two
var dayTwoView = Ti.UI.createView ({
	top: 0, left: 0,
	width: "32%",
	layout: "vertical"
});
var dayTwoImage = Ti.UI.createImageView ({
	image: "?",
	height: 50, top: 0
});
dayTwoView.add(dayTwoImage);

var dayTwoText = Ti.UI.createLabel({
	text: "?",
	top: 0,
	font: {fontSize: 14, fontFamily: fntFmly},
	color: "#000000"
});
dayTwoView.add(dayTwoText);

// Day Three
var dayThreeView = Ti.UI.createView ({
	top: 0, left: 0,
	width: "32%",
	layout: "vertical"
});
var dayThreeImage = Ti.UI.createImageView ({
	image: "?",
	height: 50, top: 0
});
dayThreeView.add(dayThreeImage);

var dayThreeText = Ti.UI.createLabel({
	text: "?",
	top: 0,
	font: {fontSize: 14, fontFamily: fntFmly},
	color: "#000000"
});
dayThreeView.add(dayThreeText);

dailyForecast.add(dayOneView);
dailyForecast.add(dayTwoView);
dailyForecast.add(dayThreeView);
forecast.add(dailyForecast);

var alerts = require("alerts");

var updateView = function(response) {
	wthrImg.image = response.wthrImg;
	weatherStatus.text = response.wthr;
	tempText.text = response.temp + "°";
	locationText.text = response.city + ", " + response.state + "\n" + response.zip + ", " + response.ctry;
	
	// Hourly Forecast
	hourOneImage.image = response.hourOneImage;
	hourOneText.text = response.hourOneText;
	
	hourTwoImage.image = response.hourTwoImage;
	hourTwoText.text = response.hourTwoText;
	
	hourThreeImage.image = response.hourThreeImage;
	hourThreeText.text = response.hourThreeText;
	
	hourFourImage.image = response.hourFourImage;
	hourFourText.text = response.hourFourText;
	
	// Daily Forecast
	dayOneImage.image = response.dayOneImage;
	dayOneText.text = response.dayOneText;
	
	dayTwoImage.image = response.dayTwoImage;
	dayTwoText.text = response.dayTwoText;
	
	dayThreeImage.image = response.dayThreeImage;
	dayThreeText.text = response.dayThreeText;
	
	if (response.desc == null) {
		alertView.height = 0;
	} else {
		alertText.text = response.desc;
		alertText.top = 2;
		alertView.height = 20;
		
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
		var api = require("api");
		api.getGeo();
	} else {
		// Connect to the DB if the user has been opened the application before with internet
		var localData = require("db");
		
		alert("Please connect to the internet.");
		localData.read();
	}
});

if (Ti.Platform.osname === "android") {
	alertView.top = 0;
}

mainWin.add(alertView);
mainWin.add(tempView);
mainWin.add(forecast);
mainWin.open();
exports.updateView = updateView;
