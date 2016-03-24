var mongoose = require('mongoose');

var LocationSchema = new mongoose.Schema({
  name: {
    type: String
  },
  location : {
    type: {
      type: String,
      default: 'Point'
    },
    coordinates: [Number]
  }
});

LocationSchema.index({ "location" : '2dsphere' });

var Location = mongoose.model('Location', LocationSchema);

module.exports = Location;
