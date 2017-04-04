var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://localhost:27017/NavgationDatabase';
var async = require('asyncawait/async');
var await = require('asyncawait/await');

// --------------------------------------------------------------------------------------
//                 VARIABLES TO BE USED 

var paths = [];
var resultsLength;
var cachedStatus = false;
// --------------------------------------------------------------------------------------


//=======================================================================================
var displaySpecificRoute = function(db, callback) {
    var cursor = db.collection('routes').find({ "routeID": "1" });
    cursor.each(function(err, doc) {
        assert.equal(err, null);
    });
};
//=======================================================================================


getCachedRoutes("Humanities", "Law");

console.log("===========================================");
console.log("The Path Returned");
console.log("===========================================");
console.log("Route available : " + cachedStatus);
console.log("===========================================");
console.log(paths); // This needs to be returned as local variable, but gets called before the async method and thus is set to undefied
console.log("===========================================");

function getCachedRoutes(beginPoint, endPoint) {
    searchRouteInCachedRoutes("Humanities", "Law");
}

function searchRouteInCachedRoutes(beginPoint, endPoint) {
    //=================================================================================================
    MongoClient.connect(url, function(err, db) {

        db.collection('routes').find({ "beginPoint": beginPoint }).toArray(function(err, results) {
            try {
                //console.log(JSON.stringify(results));
                resultsLength = results.length;
                console.log("The amount of results returned are : " + resultsLength);

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
                    for (var i = 0; i < paths.length; i++) {
                        console.log(JSON.stringify(paths[i])); // Display the routes that are available based on the start and endpoint.
                    }

                } else
                    console.log("The route was not cahced and needs to be calculated.");

            } catch (error) {
                console.log("No cached routes listed with specified starting point.");
            }
        });

        db.close();

    });
    //=================================================================================================

}