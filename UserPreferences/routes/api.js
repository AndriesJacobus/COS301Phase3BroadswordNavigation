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

//Allows ability to import in index
module.exports = router;
