const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create preference Schema & model
const PreferenceSchema = new Schema({
    userID: {
      type: String,
      required: [true, 'Name field is required']
    },
    preferenceName: {
      type: String
    },
    preferenceDescription: {
      type: String
    }
});

const Preference = mongoose.model('preference', PreferenceSchema);

module.exports = Preference;
