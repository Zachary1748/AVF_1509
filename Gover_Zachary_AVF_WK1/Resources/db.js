// Define the database connection; connect, read and save

var send = function(response) {
	// Send all of the saved data into the users view
	var ui = require("ui");
	console.log(response);
	ui.updateView(response);
};

var apiConnection = function (lat, lng) {
	// Connect to the Wunderground API and store the needed objects
	Ti.API.info("apiConnection");
	var url = "http://api.wunderground.com/api/1ca3f32c8865e443/geolookup/conditions/alerts/forecast/hourly/q/" + lat + "," + lng + ".json";
	var xhrRequest = Ti.Network.createHTTPClient ({
		onload : function(e) {
			var json = JSON.parse(this.responseText);
			var response = {
				// Weather data
				ctry	: json.location.country,
				state	: json.location.state,
				city	: json.location.city,
				zip		: json.location.zip,
				wthrImg	: json.current_observation.icon_url,
				wthr	: json.current_observation.weather,
				temp	: Math.round(json.current_observation.temp_f),
				// Alerts
				desc	: json.alerts[0].description,
				msg		: json.alerts[0].message
			};
			save(response);
			read();
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

var getGeo = function() {
	// Retreive the users current location
	Ti.Geolocation.getCurrentPosition(function(e) {
		if (!e.success || e.error) {
			console.log(e.error);
			alert("Sorry there was an error getting your current location.");
		} else {
			var lat = e.coords.latitude;
			var lng = e.coords.longitude;
			apiConnection(lat, lng);
		}
	});
};

var read = function() {
	// Read the saved data in case the user has lost connection
	var db = Ti.Database.open("weather_db");
	var dbResult = db.execute("SELECT * FROM weather_data");
	
	while (dbResult.isValidRow()) {
		var response = {
			// Weather data
			id		: dbResult.fieldByName("id"),
			ctry	: dbResult.fieldByName("ctry"),
			state	: dbResult.fieldByName("state"),
			city	: dbResult.fieldByName("city"),
			zip		: dbResult.fieldByName("zip"),
			wthrImg	: dbResult.fieldByName("wthrImg"),
			wthr	: dbResult.fieldByName("wthr"),
			temp	: Math.round(dbResult.fieldByName("temp")),
			// Alerts
			desc	: dbResult.fieldByName("desc"),
			msg		: dbResult.fieldByName("msg")
		};
		dbResult.next();
	}
	
	dbResult.close();
	db.close();
	send(response);
};

var save = function(arg) {
	// Save the new data that has been fetched into the the Database
	var db = Ti.Database.open("weather_db");
	db.execute("DROP TABLE IF EXISTS weather_data");
	db.execute("CREATE TABLE IF NOT EXISTS weather_data (id INTEGER PRIMARY KEY, ctry TEXT, state TEXT, city TEXT, zip INTEGER, wthrImg TEXT, wthr TEXT, temp INTEGER, desc TEXT, msg TEXT)");
	db.execute("DELETE FROM weather_data");
	db.execute("INSERT INTO weather_data (ctry, state, city, zip, wthrImg, wthr, temp, desc, msg) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)", arg.ctry, arg.state, arg.city, arg.zip, arg.wthrImg, arg.wthr, arg.temp, arg.desc, arg.msg);
	db.close();
};

exports.getGeo = getGeo;
exports.read = read;