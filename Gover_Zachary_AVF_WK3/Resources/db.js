// Database Connection (Read, Save)
var read = function(){
	// Read the saved data in case the user has lost connection
	Ti.API.info("Read Function!!!!!!!!");
	var db = Ti.Database.open("image_db");
	var dbResult = db.execute("SELECT * FROM image_data");
	var endResult = [];
	while (dbResult.isValidRow()) {
		var currentRow = {
			"id": dbResult.fieldByName("id"),
			"preview": dbResult.fieldByName("preview"),
			"fullImage": dbResult.fieldByName("fullImage")
		};
		endResult.push(currentRow);
		dbResult.next();
	}
	dbResult.close();
	db.close();
	
	var imageView = require("imageView");
	imageView.buildUi(endResult);
};

var save = function(response) {
	// Save the new data that has been fetched into the the Database
	Ti.API.info("Save Function!!!!!!!!");
	var db = Ti.Database.open("image_db");
	db.execute("CREATE TABLE IF NOT EXISTS image_data (id INTEGER PRIMARY KEY, preview TEXT, fullImage TEXT)");
	db.execute("DELETE FROM image_data");
	for (i=0; i<response.length; i++) {
		db.execute("INSERT INTO image_data (preview, fullImage) VALUES (?, ?)", response[i].previewURL, response[i].webformatURL);
	}
	db.close();
	read();
};

exports.read = read;
exports.save = save;