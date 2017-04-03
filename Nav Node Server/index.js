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

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(calculateRoute(start, end));

    console.log("-------------------------------");
});

function calculateRoute(inStart, inEnd) {
    /*
    	Here the client will (in the final draft) be communicating with either:
    	1) The DB to get the route if it already exists
    	2) The path finding algorithm to create a new path AND then store it to DB
    */

    console.log("Route successfully calculated.");

    var json = JSON.stringify({
        start: inStart,
        middle: ["EMS Lecture Halls", "Conference Centre"],
        end: inEnd
    });

    return json;
}

var server = app.listen(port, function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log("App listening", host, port)
})


function checkForAvailableRoute(beginPointCordinate, endPointCoordinate) {

}