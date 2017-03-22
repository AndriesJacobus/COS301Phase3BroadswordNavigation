var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var port = 5000;

var app = express();
app.use(bodyParser.json());

app.post('/accept', function(req, res) {
    'use strict';
    //console.log("JSON received: " + req.body);
	var start = req.body.start;
	var end = req.body.end;
	console.log("\nNavigation Request received: ");
	console.log("-------------------------------");
    console.log("Start: " + start);
    console.log("End: " + end);
	console.log("Now calculating route...");
	
	res.writeHead(200, {"Content-Type": "application/json"});
	res.end(calculateRoute(start, end));
	
	console.log("-------------------------------");
});

function calculateRoute(inStart, inEnd)
{
	console.log("Route successfully calculated.");
	
	var json = JSON.stringify(
	{ 
		start: inStart, 
		middle:[ "EMS Lecture Halls", "Conference Centre"], 
		end: inEnd
	});
	
	return json;
}

var server = app.listen(port, function ()
{
	var host = server.address().address;
	var port = server.address().port;

	console.log("App listening", host, port)
})