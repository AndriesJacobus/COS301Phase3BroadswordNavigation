const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create preference Schema & model
const PreferenceSchema = new Schema({
    userID: {
      type: String,
      required: [true, 'Name field is required']
    },

    stairs: {type: Boolean},
    elevator:{type: Boolean},
    genderMale:{type: Boolean},
    mostPopular:{type: Boolean},
    leastTraffic:{type: Boolean},
    shortestPath:{type: Boolean}

});

const Preference = mongoose.model('preference', PreferenceSchema);

module.exports = Preference;
