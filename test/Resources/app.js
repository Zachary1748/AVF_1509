var win1 = Titanium.UI.createWindow({
    backgroundColor:'#fff',
    layout: "vertical"
});
var view = Ti.UI.createView({
	top: 0, left: 0, right: 0,
});

var label1 = Ti.UI.createLabel({
	color:'#999',
	text:'I am Window 1',
	font:{fontSize:20,fontFamily:'Helvetica Neue'},
});
var view2 = Ti.UI.createView({
	top: 0, left: 0, right: 0,
	backgroundColor: "#ededed"
});

var label2 = Ti.UI.createLabel({
	color:'#999',
	text:'I am Window 2',
	font:{fontSize:20,fontFamily:'Helvetica Neue'},
});
view.add(label1);
view2.add(label2);
win1.add(view);
win1.add(view2);
win1.open();