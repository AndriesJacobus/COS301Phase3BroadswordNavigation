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

module.exports = function(callback) {
	if(db || err) {
		callback(err, db);
	}
	else{
		waiting.push(callback);
	}
}