var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://localhost:27017/NavgationDatabase';

//====================================================================================================

var addUserPreferences = function(db, callback) {
    db.collection('userpreferences').insertOne({
        "userID": "14307317",
        "preferences": [{
                "type": "stairs",
                "preferred": "false"
            },
            {
                "type": "shortestroute",
                "preferred": "true"
            },
            {
                "type": "minimaltraffic",
                "preferred": "true"
            }
        ]
    }, function(err, result) {
        assert.equal(err, null);
        console.log("User preferences have been saved.");
        callback();
    });
};

//====================================================================================================

var findUser = function(db, callback) {
    var cursor = db.collection('userpreferences').find();
    cursor.each(function(err, doc) {
        assert.equal(err, null);
        if (doc != null) {
            console.dir(doc);
        } else {
            callback();
        }
    });
};

//====================================================================================================

var findSpecificUser = function(db, callback) {
    var cursor = db.collection('userpreferences').find({ "userID": "14307317" });
    cursor.each(function(err, doc) {
        assert.equal(err, null);
        if (doc != null) {
            console.dir(doc);
        } else {
            callback();
        }
    });
};

//====================================================================================================


var updateUserPreference = function(db, callback) {
    db.collection('userpreferences').updateOne({ "userID": "14307317" }, {
        $set: { "preferences": "" }
    }, function(err, results) {
        console.log(results);
        callback();
    });
};

//====================================================================================================
var removeUserData = function(db, callback) {
    db.collection('userpreferences').deleteOne({ "userID": "14307317" },
        function(err, results) {
            console.log(results);
            callback();
        }
    );
};
//====================================================================================================

//====================================================================================================
MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    addUserPreferences(db, function() {}); // This will be used to insert a new User with preferences into the DataBase
    findUser(db, function() {}); // This will return all the users in the UserPreferences collection
    findSpecificUser(db, function() {}); // This will return a specific user and their preferences.

    //updateUserPreference(db, function() {});
    removeUserData(db, function() {}); // Delete a user and all their data.

    db.close();
});