var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var http=require('http');

var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://localhost:27017/NavgationDatabase';
var port = 5000;

var app = express();
app.use(bodyParser.json());

app.post('/accept', function(req, res) {
    'use strict';
	var start = req.body.start;
	var end = req.body.end;
	
	console.log("\nGet Route Request received: ");
	console.log("===============================");
	console.log("Start: " + start);
	console.log("End: " + end + "\n");
	console.log("Now retrieving route...");
	
	res.writeHead(100, {"Content-Type": "application/json"});
	res.end(retrieveRoute(start, end));
	
	console.log("===============================");
});

//this function is called from Access. Here we get route either from cache or from GIS
function retrieveRoute(inStart, inEnd) {
    /*
    	Here the client will (in the final draft) be communicating with either:
    	1) The DB to get the route if it already exists
    	2) The path finding algorithm to create a new path AND then store it to DB
		
		IMPORTANT:
		
		For now, retrieving cached routes does not work properly: it can retrieve route but route can't 
		be saved in persistant variable since MongoClient.connect is asynchronous
    */
	
	/*
    var json = JSON.stringify({
        start: inStart,
        middle: ["EMS Lecture Halls", "Conference Centre"],
        end: inEnd
    });
	*/
	
	checkForAvailableRoute(inStart, inEnd);		//this is OUR function to get route from cache
	//sendStartAndEndToGIS(inStart, inEnd);		//this is function to call GIS to give route

    console.log("Route successfully retrieved.");
	
    return sendStartAndEndToGIS(inStart, inEnd);		//this is function to call GIS to give route
}

//this function will send a get request to the gis with the json object containing end and start point
function sendStartAndEndToGIS(start_,end_){
    request.post(
		'http://127.0.0.1:5000/getJsonFromNav', 
        { json: { start: start_, end: end_ } },
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                //console.log(body)
                console.log("\Route received (from start to finish):\n");
                console.log("Start: "  + response.body.start);
                console.log("Middle: " + response.body.middle);
                console.log("End: " + response.body.end);
            }
        }
    );
}

//===========================================================================================================
//This is an example funciton of how GIS can receive the get request sent above
app.post('/getJsonFromNav', function(req, res) {
	'use strict';
	var start = req.body.start;
	var end = req.body.end;   
	
	console.log("\nRoute calculation Request received from Navigation: ");
	console.log("-------------------------------");
	console.log("Start: " + start);
	console.log("End: " + end);
	console.log("\nNow calculating route...");

	res.writeHead(200, { "Content-Type": "application/json" });
	res.end(calculateRoute(start, end));       //replace this with GIS route calculating function that returns JSON object
});

function calculateRoute(inStart, inEnd) {
	
	//{"_id":"58e3e097bea9a52e44fd20e6","routeID":"1","beginPoint":"Humanities","endPoint":"Law","waypoints":[{"name":"Piazza"},{"name":"TuksFm"},{"name":"Centenary"}]}
	
    var json = JSON.stringify({
        start: inStart,
        middle: ["Piazza", "TuksFm", "Centenary"],
        end: inEnd
    });

    console.log("Route successfully calculated HERE IN GIS.");
	
    return json;
}
//===========================================================================================================

//===========================================================================
//	CASHING CODE:
//===========================================================================

//-----------------------------------------------------------
//         Variables Needed For Cached Paths Searching
//-----------------------------------------------------------
var paths = [];
var resultsLength;
var cachedStatus = false;
// ----------------------------------------------------------

function checkForAvailableRoute(beginPointCordinate, endPointCoordinate) {
	//some test code
	getCachedRoutes(beginPointCordinate, endPointCoordinate);
	console.log("getCachedRoutes() called.\n");

	/*
	console.log("===========================================");
	console.log("The Path Returned");
	console.log("===========================================");
	console.log("Route available : " + cachedStatus);
	console.log("===========================================");
	console.log(paths); // This needs to be returned as local variable, but gets called before the async method and thus is set to undefied
	console.log("===========================================\n");
	*/
	
	//for now, return mock data, since caching doesn't fully work
    var json = JSON.stringify({
        start: beginPointCordinate,
        middle: ["Piazza", "TuksFm", "Centenary"],
        end: endPointCoordinate
    });

    return json;
}

function getCachedRoutes(beginPoint, endPoint) {
    searchRouteInCachedRoutes(beginPoint, endPoint);
    return cachedStatus; // Indicate if we have the route cached or not.
}

function searchRouteInCachedRoutes(beginPoint, endPoint) {
    MongoClient.connect(url, function(err, db) {
        db.collection('routes').find({ "beginPoint": beginPoint }).toArray(function(err, results) {
            try {
                //console.log(JSON.stringify(results));
                resultsLength = results.length;
                console.log("\nThe amount of results returned FROM CACHE are : " + resultsLength);

                for (var i = 0; i < resultsLength; i++) {
                    var bp = results[i]['beginPoint'];
                    var ep = results[i]['endPoint'];

                    if (beginPoint == bp && endPoint == ep) { // Traverse the results and see if any of them have the same start and endpoints as the requested ones.
                        cachedStatus = true;
                        paths.push(results[i]);
                    }
                }
                if (cachedStatus == true) {
                    console.log("We have the route cached."); // Indicate that we have a cached route available.
                    console.log("Route available : " + cachedStatus);
                    for (var i = 0; i < paths.length; i++) {
                        console.log(JSON.stringify(paths[i])); // Display the routes that are available based on the start and endpoint.
						
						/*
						request.post(
							'http://127.0.0.1:5000/getRouteFromCache',
							paths[i],
							function (error, response, body) {
								if (!error && response.statusCode == 100) {
								}
								else {
									return;
								}
							}
						);
						*/
                    }
	
                } else
                    console.log("The route was not cahced and needs to be calculated.");

            } catch (error) {
                console.log("No cached routes listed with specified starting point.");
            }
        });

        db.close();
		
    });
}

var server = app.listen(port, function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log("App listening", host, port)
})