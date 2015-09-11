// Define the database connection; connect, read and save

var send = function(response) {
	// Send all of the saved data into the users view
	var ui = require("ui");
	console.log(response);
	ui.updateView(response);
};

var read = function() {
	// Read the saved data in case the user has lost connection
	var db = Ti.Database.open("weather_db");
	var dbResult = db.execute("SELECT * FROM weather_data");
	
	while (dbResult.isValidRow()) {
		var response = {
			// Weather data
			"id"		: dbResult.fieldByName("id"),
			"ctry"		: dbResult.fieldByName("ctry"),
			"state"		: dbResult.fieldByName("state"),
			"city"		: dbResult.fieldByName("city"),
			"zip"		: dbResult.fieldByName("zip"),
			"wthrImg"	: dbResult.fieldByName("wthrImg"),
			"wthr"		: dbResult.fieldByName("wthr"),
			"temp"		: Math.round(dbResult.fieldByName("temp")),
			// Alerts
			"desc"		: dbResult.fieldByName("desc"),
			"msg"		: dbResult.fieldByName("msg")
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

exports.read = read;
exports.save = save;