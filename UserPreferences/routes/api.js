const express = require('express');
const router = express.Router();
const Preference = require('../models/preference')

//get a list of users preferences from the database
router.get('/preferences/:id', function(req, res, next){
    Preference.find({userID: req.params.id}).then(function(preferences){
      res.send(preferences);
    });
});

//add new user preference to the db
router.post('/preferences', function(req, res, next){
    //var preference = new Preference(req.body);
    //preference.save();
    //**above 2 lines are replaced by the one below
    Preference.create(req.body).then(function(preference){
      res.send(preference);
    }).catch(next);
});

//update a users preference in the db
router.put('/preferences/:id', function(req, res, next){
  Preference.findByIdAndUpdate({_id: req.params.id}, req.body).then(function(){
    Preference.findOne({_id: req.params.id}).then(function(preference){
      res.send(preference);
    });
  });
});

//delete a users preference from the db
router.delete('/preferences/:id', function(req, res, next){
    Preference.findByIdAndRemove({_id: req.params.id}).then(function(preference){
      res.send(preference);
    });
});

  // attempt to make template for nsq
  // if (qType == "getPreferences")
  // {
  //   console.log('userID : %s', inJSON.content.userID);
  //   getUserPreferences(inJSON.content.userID);
  // }
  // else if(qType == "createUserPreference")
  // {
  //   console.log('userID : %s', inJSON.content.preferenceObject);
  //   createUserPreference(inJSON.content.preferenceObject);
  // }
  // else if(qType == "updateUserPreference")
  // {
  //   console.log('userID : %s', inJSON.content.preferenceObject);
  //   updateUserPreference(inJSON.content.preferenceObject);
  // }
  // else if(qType == "deleteUserPreference")
  // {
  //   console.log('userID : %s', inJSON.content.preferenceID);
  //   getUserPreferences(inJSON.content.preferenceID);
  // }


//Allows ability to import in index
module.exports = router;
