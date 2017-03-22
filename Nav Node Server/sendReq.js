/*
	This file illustrates how communication to the NavServer should be approached
*/

var request = require('request');

request.post(
    'http://127.0.0.1:5000/accept',
    { json: { start: 'JJ Theron Lecture Hall', end: 'Monastery Hall' } },
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