// API Connection

var apiConnection = function (searchVal) {
	// Connect to the pixabay api
	Ti.API.info("apiConnection");
	var url = "https://pixabay.com/api/?username=Zachary1748&key=552c904285618cf4cf20&q=" + encodeURIComponent(searchVal) + "&image_type=photo";
	var xhrRequest = Ti.Network.createHTTPClient ({
		onload : function(e) {
			var json = JSON.parse(this.responseText);
			var response = json.hits;
			//console.log(response);
			if (response == null || response.length <= 0) {
				alert("There are no results");
			} else {
				var db = require("db");
				db.save(response);	
			}
		},
		onerror : function(e) {
			console.log(e.error);
			alert("There was an error while retreiving the search data.");
		},
		timeout : 5000
	});
	
	xhrRequest.open("GET", url);
	xhrRequest.send();
};

exports.apiConnection = apiConnection;