var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://localhost:27017/NavgationDatabase';

// --------------------------------------------------------------------------------------
//                 VARIABLES TO BE USED 

var paths = [];
var resultsLength;

// --------------------------------------------------------------------------------------


//=======================================================================================
var displaySpecificRoute = function(db, callback) {
    var cursor = db.collection('routes').find({ "routeID": "1" });
    cursor.each(function(err, doc) {
        assert.equal(err, null);
    });
};
//=======================================================================================

searchRouteInCachedRoutes("Humanities", "Law");

function searchRouteInCachedRoutes(beginPoint, endPoint) {
    console.log("searchRouteInCachedRoutes called.");

    //=================================================================================================
    MongoClient.connect(url, function(err, db) {
        // displaySpecificRoute(db, function() {});

        db.collection('routes').find({ "routeID": "1" }).toArray(function(err, results) {
            // console.log(JSON.stringify(results));
            resultsLength = results.length;
            //console.log("The amount of results returned are : " + resultsLength);
            var bp = results[0]['beginPoint'];
            var ep = results[0]['endPoint'];
            if (beginPoint == bp && endPoint == ep)
                console.log("We have the route cached.");
            else
                console.log("The route was not cahced and needs to be calculated.");
        });

        db.close();

    });
    //=================================================================================================


}