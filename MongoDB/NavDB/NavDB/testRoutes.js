var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://localhost:27017/NavgationDatabase';


//-----------------------------------------------------------
//         Variables Needed For Cached Paths Searching
//-----------------------------------------------------------
var pathResolve;
var cachedRouteAvalilable = false; // Default to no route available in cache.


var localPatths = new Promise((resolve, reject) => {
    pathResolve = resolve;
});
//-----------------------------------------------------------

checkForCahcedRoute("Humanities", "Law");

function checkForCahcedRoute(beginPoint, endPoint) {

    MongoClient.connect(url, function(err, db) {
        db.collection('routes').find({ "beginPoint": beginPoint }).toArray(function(err, results) {
            try {
                var paths = [];
                paths.push(results);
                pathResolve(paths);
            } catch (error) {
                console.log("========================================================");
                console.log("Catch error occured when connecting to MongoClient to get query results");
                console.log("========================================================");
                console.log(error);
                console.log("========================================================");
            }
        });
        db.close(); // Close the DB connection
    });

    pathConsumer(beginPoint, endPoint);

}

function pathConsumer(bp, ep) {
    console.log("Within pathConsumer Function");
    localPatths.then(pathsArray => {
        pathsArray.forEach(path => {

            var beginPoint = path[0]['beginPoint'];
            var endPoint = path[0]['endPoint'];

            if (beginPoint == bp && endPoint == ep) {
                console.log("We have your path");
                return pathResolve;

            }



        })
    })
}