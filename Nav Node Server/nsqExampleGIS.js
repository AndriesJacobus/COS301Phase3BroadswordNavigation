/*
	This file is sample code FOR GIS to
	- get route request from navigation and
	- send route to navigation

	!!!IMPORTANT!!!

		"queryType" MUST BE "gisReceiveRoutes"

	!!!!!!!!!!!!!!!
*/

var nsq = require('nsqjs');

var reader = new nsq.Reader('gis', 'navup', { lookupdHTTPAddresses : '127.0.0.1:4161', nsqdTCPAddresses : 'localhost:4150' });
var w = new nsq.Writer('127.0.0.1', 4150);

reader.connect();

reader.on('message', function(msg) {

	try {
		var inJSON = JSON.parse(msg.body.toString());
	}
	catch (e)
	{
		msg.finish();
		return;
	}

	console.log('Received message in GIS [%s] : %s', msg.id, msg.body.toString());

	var qType = inJSON.queryType;
	console.log('\nQuery Type : %s', qType);

	if (qType == "gisGetRoutes")
	{
		console.log('Start location : %s', inJSON.content.begin);
		console.log('End location : %s', inJSON.content.end);

		//call GIS OR cache function here
		calculateRoute(inJSON.content.begin, inJSON.content.end);
	}

	msg.finish();
});


/*
	@Todo: send routes to nav
*/

function calculateRoute(inStart, inEnd) {
	
	//{"_id":"58e3e097bea9a52e44fd20e6","routeID":"1","beginPoint":"Humanities","endPoint":"Law","waypoints":[{"name":"Piazza"},{"name":"TuksFm"},{"name":"Centenary"}]}

	//Do all the GIS calculation stuff...
	//calculating...

    console.log("\nRoute successfully calculated HERE IN GIS.");

    var request = '{"src": "Gis", "dest": "Navigation", "msgType": "request", "queryType": "gisReceiveRoutes", "content": {"begin": "Humanities", "end": "Law", "middle": ["Piazza", "TuksFm", "Centenary"]}}';

	w.connect();

	w.on('ready', function () {
		//# Simple publish method call. Publishes to users topic

		console.log('Writer opened');
		w.publish('navigation', request);
		console.log('Route request sent to navigation...');

		w.close();
	});

	w.on('closed', function () {
		console.log('Writer closed');
	});
}