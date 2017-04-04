// "C:\Program Files\MongoDB\Server\3.4\bin\mongod.exe"
const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/test");

mongoose.connection.once('open', function(){
	console.log("Connection successful.");
}).on('error', function(){
	console.log("Connnection failed.")
});