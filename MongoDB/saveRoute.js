// var db = require('/connection');

// "C:\Program Files\MongoDB\Server\3.4\bin\mongod.exe"
const mongoose = require('mongoose');
var jsonRoute = require('./route.json');
var mongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/NavgationDatabase';

// mongoose.connect("mongodb://localhost/Routes");

// mongoose.connection.once('open', function(){
// 	console.log("Connection successful.");
// }).on('error', function(){
// 	console.log("Connnection failed.")
// });

var err, db;
var waiting = [];

mongoClient.connect(url,  function(error, database) {
	err = error
	db = database;

	waiting.forEach(function(callback){
		callback(err, database);
	});
});

// module.exports = function(callback) {
// 	if(db || err) {
// 		callback(err, db);
// 	}
// 	else{
// 		waiting.push(callback);
// 	}
// }

var route = function addRoute(db, callback)
{
	db.collection('routes').insertOne({ 
		"data": [
	    {
	      "type": "locations",
	      "id": "58d0f6d13843f43a2c43768d",
	      "attributes": {
	      "location_type": "Venue",
	      "room": "4-150",
	      "building": "EMB",
	      "lng": -29.364,
	      "lat": 144.207,
	      "level": 4,
	      "ground": 2
	    }
	    },
	    {
	      "type": "locations",
	      "id": "58d0f6b92503f43a2c43768d",
	      "attributes": {
	      "location_type": "Walkway",
	      "room": "none",
	      "building": "IT/EMB",
	      "lng": -30.785,
	      "lat": 155.317,
	      "level": 4,
	      "ground": 2
	    }
	    },
	    {
	    "type": "locations",
	    "id": "67dff6b92503f43a2c43768d",
	    "attributes": {
	    "location_type": "Venue",
	    "room": "4-4",
	    "building": "IT",
	    "lng": -31.544,
	    "lat": 157.244,
	    "level": 4,
	    "ground": 2
	    }
	    },
	    {
	    "type": "locations",
	    "id": "58d0f6b92503f43a2c43768d",
	    "attributes": {
	    "location_type": "Venue",
	    "room": "4-4",
	    "building": "IT",
	    "lng": -32.364,
	    "lat": 153.207,
	    "level": 4,
	    "ground": 2
	    }
	    },
	    {
	    "type": "locations",
	    "id": "58d0f6b92503f43a2c879634",
	    "attributes": {
	    "location_type": "Venue",
	    "room": "4-5",
	    "building": "IT",
	    "lng": -33.475,
	    "lat": 154.145,
	    "level": 4,
	    "ground": 2
	    }
	    }
	  ]
	},
        function(err, results) {
            console.log(results);
            callback();
        }
    );
}

// addRoute('Routes', 'RouteCollection', '/route.json');