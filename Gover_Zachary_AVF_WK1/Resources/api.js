var dbFile = require("db");

var getGeo = function() {
	// Retreive the users current location
	if (Ti.Platform.osname === "android") {
		var lat = 37.776289;
		var lng = -122.395234;
		apiConnection(lat, lng);
	} else {
		Ti.Geolocation.getCurrentPosition(function(e) {
			if (!e.success || e.error) {
				console.log(e.error);
				alert("Sorry, you must allow location services for us to obtain the current weather information.");
				// dbFile.read();
			} else {
				var lat = e.coords.latitude;
				var lng = e.coords.longitude;
				apiConnection(lat, lng);
			}
		});
	}
};

var apiConnection = function (lat, lng) {
	// Connect to the Wunderground API and store the needed objects
	Ti.API.info("apiConnection");
	var url = "http://api.wunderground.com/api/1ca3f32c8865e443/geolookup/conditions/alerts/forecast/hourly/q/" + lat + "," + lng + ".json";
	var xhrRequest = Ti.Network.createHTTPClient ({
		onload : function(e) {
			var json = JSON.parse(this.responseText);
			for (i=0; i < json.alerts.length; i++) {
				var alertDesc = json.alerts[i].description;
				var alertMsg = json.alerts[i].message;
			}
			var response = {
				// Weather data
				"ctry"		: json.location.country,
				"state"		: json.location.state,
				"city"		: json.location.city,
				"zip"		: json.location.zip,
				"wthrImg"	: json.current_observation.icon_url,
				"wthr"		: json.current_observation.weather,
				"temp"		: Math.round(json.current_observation.temp_f),
				// Alerts
				"desc"		: alertDesc,
				"msg"		: alertMsg
			};
			
			var hourlyResponse = {
				// Hour One
				"hourOneImage" : json.hourly_forecast[1].icon_url,
				"hourOneText" : json.hourly_forecast[1].FCTTIME.civil + " " + json.hourly_forecast[1].temp.english + "°",
				// Hour Two
				"hourTwoImage" : json.hourly_forecast[2].icon_url,
				"hourTwoText" : json.hourly_forecast[2].FCTTIME.civil + " " + json.hourly_forecast[2].temp.english + "°",
				// Hour Three
				"hourThreeImage" : json.hourly_forecast[3].icon_url,
				"hourThreeText" : json.hourly_forecast[3].FCTTIME.civil + " " + json.hourly_forecast[3].temp.english + "°",
				// Hour Four
				"hourFourImage" : json.hourly_forecast[4].icon_url,
				"hourFourText" : json.hourly_forecast[4].FCTTIME.civil + " " + json.hourly_forecast[4].temp.english + "°",
			};
			
			var dailyResponse = {
				// Day One
				"dayOneImage" : json.forecast.simpleforecast.forecastday[0].icon_url,
				"dayOneText" : json.forecast.simpleforecast.forecastday[0].date.weekday_short + " " + json.forecast.simpleforecast.forecastday[0].high.fahrenheit + "°" + "/" + json.forecast.simpleforecast.forecastday[0].low.fahrenheit + "°",
				// Day Two
				"dayTwoImage" : json.forecast.simpleforecast.forecastday[1].icon_url,
				"dayTwoText" : json.forecast.simpleforecast.forecastday[1].date.weekday_short + " " + json.forecast.simpleforecast.forecastday[1].high.fahrenheit + "°" + "/" + json.forecast.simpleforecast.forecastday[1].low.fahrenheit + "°",
				// Day Three
				"dayThreeImage" : json.forecast.simpleforecast.forecastday[2].icon_url,
				"dayThreeText" : json.forecast.simpleforecast.forecastday[2].date.weekday_short + " " + json.forecast.simpleforecast.forecastday[2].high.fahrenheit + "°" + "/" + json.forecast.simpleforecast.forecastday[2].low.fahrenheit + "°",
			};
			
			console.log(dailyResponse);
			dbFile.save(response, hourlyResponse, dailyResponse);
			dbFile.read();
		},
		onerror : function(e) {
			console.log(e);
			alert("There was an error while retreiving the weather data.");
		},
		timeout : 5000
	});
	
	xhrRequest.open("GET", url);
	xhrRequest.send();
};

exports.getGeo = getGeo;