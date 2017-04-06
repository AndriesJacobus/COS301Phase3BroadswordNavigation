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

var nsq = require('nsqjs');
var reader = new nsq.Reader('navigation', 'navup', { lookupdHTTPAddresses : '127.0.0.1:4161', nsqdTCPAddresses : 'localhost:4150' });
var w1 = new nsq.Writer('127.0.0.1', 4150);
var w2 = new nsq.Writer('127.0.0.1', 4150);

/*
	This function gets a request from access
*/

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

	console.log('Received message [%s] : %s', msg.id, inJSON);

	var qType = inJSON.queryType;
	console.log('Query Type : %s', qType);

	if (qType == "getRoutes")
	{
		console.log('Start location : %s', inJSON.content.begin);
		console.log('End location : %s', inJSON.content.end);

		//call GIS OR cache function here
		retrieveRoute(inJSON.content.begin, inJSON.content.end);
	}
	else if (qType == "gisReceiveRoutes")
	{
		console.log('\nReceived route from GIS!\n');
		console.log('Start location of route: %s', inJSON.content.begin);
		console.log('End location of route: %s', inJSON.content.end);
		console.log('Middle / path of route: %s', inJSON.content.middle);

		console.log('\nNow sending GIS route back to Access...\n');

		var array = (inJSON.content.middle.toString()).split(',');
		var middleString = '["';

		for (i = 0; i < array.length; i++)
		{
			if (i == array.length - 1)
			{
				middleString += array[i] + '"]';
			}
			else
			{
				middleString += array[i] + '", "';
			}
		}

		console.log('Middle string: %s', middleString);

		var request = '{"src": "Navigation", "dest": "Access", "msgType": "request", "queryType": "navRoutes", "content": {"begin": "Humanities", "end": "Law", "middle": ' + middleString + '}}';

		w2.connect();

		w2.on('ready', function () {
		  //# Simple publish method call. Publishes to users topic
		  
			console.log('\nNav Writer opened');
			w2.publish('access', request);
			console.log('Route request sent to ACCESS...');

		});

		w2.on('closed', function () {
			console.log('Nav Writer closed\n');
		});
	}

	msg.finish();
});

//this function is called from by Access. Here we get route either from cache or from GIS
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
	
	//checkForAvailableRoute(inStart, inEnd);		//this is OUR function to get route from cache

	sendStartAndEndToGIS(inStart, inEnd);
}

/*
	@Todo: sendStartAndEndToGIS sends a request to GIS with the json object containing end and start point

	!!!IMPORTANT!!!

		"queryType" MUST BE "gisGetRoutes"

	!!!!!!!!!!!!!!!
*/

function sendStartAndEndToGIS(start_, end_) {
	console.log('\nSending route request to GIS...');

	var request = '{"src": "Navigation", "dest": "Gis", "msgType": "request", "queryType": "gisGetRoutes", "content": {"begin": "' + start_ +'", "end": "' + end_ + '"}}';

	w1.connect();

	w1.on('ready', function () {
	  //# Simple publish method call. Publishes to users topic
	  
		console.log('Nav Writer opened');
		w1.publish('gis', request);
		console.log('Route request sent to GIS...');

		w1.close();
	});

	w1.on('closed', function () {
		console.log('Nav Writer closed\n');
	});
}

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