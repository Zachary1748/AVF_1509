var infoWin = Ti.UI.createWindow({
	backgroundColor: "#FFFFFF"
});

var infoView = Ti.UI.createScrollView({
	backgroundColor: "#ededed",
	left: 0, right: 0,
	layout: "vertical",
	width: "100%",
	height: "90%",
	contentWidth: "100%",
	showVerticalIndicator: true
});

var infoText = Ti.UI.createLabel({
	text: "",
	left: 20, right: 20, top: 20,
	color: "#333333"
});
infoView.add(infoText);

var closeView = Ti.UI.createView({
	backgroundColor: "#333333",
	height: "10%", bottom: 0, left: 0, right: 0
});

var closeText = Ti.UI.createLabel({
	top: "35%",
	text: "Close",
	color: "#FFFFFF",
	font: {fontWeight: "bold"}
});
closeView.add(closeText);

closeView.addEventListener("click", function(){
	infoWin.close();
});

if (!Ti.Platform.osname === "android") {
	infoView.top = 20;
}

infoWin.add(infoView);
infoWin.add(closeView);
exports.infoWin = infoWin;
exports.infoText = infoText;