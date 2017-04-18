// var MongoClient = require('mongodb').MongoClient;
// var assert = require('assert');
// var ObjectId = require('mongodb').ObjectID;
// var url = 'mongodb://localhost:27017/NavgationDatabase';

var data = {
  "data": [
    {
      "type": "locations",
      "id": "1",
      "attributes": {
        "location_type": "Venue",
        "room": "2-27",
        "building": "IT",
        "lng": -25.75599,
        "lat": 28.233137,
        "level": 2,
        "ground": 2
      }
    },
    {
      "type": "locations",
      "id": "2",
      "attributes": {
        "location_type": "Entrance",
        "room": "N/A",
        "building": "IT",
        "lng": -25.755869,
        "lat": 28.233144,
        "level": 2,
        "ground": 2
      }
    },
    {
      "type": "locations",
      "id": "3",
      "attributes": {
        "location_type": "Point",
        "room": "N/A",
        "building": "N/A",
        "lng": -25.755836,
        "lat": 28.233162,
        "level": 0,
        "ground": 0
      }
    },
    {
      "type": "locations",
      "id": "4",
      "attributes": {
        "location_type": "Point",
        "room": "N/A",
        "building": "N/A",
        "lng": -25.755811,
        "lat": 28.233266,
        "level": 0,
        "ground": 0
      }
    },
    {
      "type": "locations",
      "id": "5",
      "attributes": {
        "location_type": "Point",
        "room": "N/A",
        "building": "N/A",
        "lng": -25.755712,
        "lat": 28.233275,
        "level": 0,
        "ground": 0
      }
    },
    {
      "type": "locations",
      "id": "6",
      "attributes": {
        "location_type": "Point",
        "room": "N/A",
        "building": "N/A",
        "lng": -25.755623,
        "lat": 28.233404,
        "level": 0,
        "ground": 0
      }
    },
    {
      "type": "locations",
      "id": "7",
      "attributes": {
        "location_type": "Point",
        "room": "N/A",
        "building": "N/A",
        "lng": -25.755567,
        "lat": 28.233193,
        "level": 0,
        "ground": 0
      }
    },
    {
      "type": "locations",
      "id": "8",
      "attributes": {
        "location_type": "Point",
        "room": "N/A",
        "building": "N/A",
        "lng": -25.755528,
        "lat": 28.233166,
        "level": 0,
        "ground": 0
      }
    },
    {
      "type": "locations",
      "id": "9",
      "attributes": {
        "location_type": "Point",
        "room": "N/A",
        "building": "N/A",
        "lng": -25.755358,
        "lat": 28.233218,
        "level": 0,
        "ground": 0
      }
    },
    {
      "type": "locations",
      "id": "10",
      "attributes": {
        "location_type": "Entrance",
        "room": "N/A",
        "building": "EMB",
        "lng": -25.755391,
        "lat": 28.233297,
        "level": 2,
        "ground": 2
      }
    }
  ]
}


data = JSON.stringify(data);

// console.log(data);


/************************************************************************************
*   This function formats the route data received from GIS
*   This function takes one parameter jsonData being the JSON string received
*   This function extracts the latitude and longitude and calls the helper
*   function to calculate the distance. The start point, end point and distance
*   is then added to the JSON object which is then returned
************************************************************************************/
function formatData(jsonData)
{
    // console.log(jsonData);
}

/*************************************************************************************
*   This function calculates the distance between 2 coordinates.
*   lat1, lat2 = the decimal latitudinal value
*   lon1, lon2 = the decumal longitudinal value
*   this function returns the distance in metres
*************************************************************************************/
function distance(lat1, lon1, lat2, lon2) 
{
    var radlat1 = Math.PI * lat1/180
    var radlat2 = Math.PI * lat2/180
    var theta = lon1-lon2
    var radtheta = Math.PI * theta/180
    var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    dist = Math.acos(dist)
    dist = dist * 180/Math.PI
    dist = dist * 60 * 1.1515
    dist = dist * 1.609344
    dist = dist * 1000;
    return dist
}

// var addRoute = function(startPoint, endPoint, jsonData, db, callback)
// {
//     jsonData = parseData(jsonData);

//     db.collection('routes').insertOne(jsonData,
//         function(err, results) {
//             console.log(results);
//             callback();
//         }
//     );
// }

parseData(data);

// MongoClient.connect(url, function(err, db) {
//     assert.equal(null, err);
//     addRoute(data, db, function() {});

//     db.close();
// });