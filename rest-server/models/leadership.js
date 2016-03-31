var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var leardshipSchema = new Schema({
  name : {
    type: String,
    required: true
  },
  image : {
    type: String
  },
  designation: {
    type: String,
    required: true
  },
  abbr: {
    type: String,
    required: true
  },
  description: {
    type: String
  }
});

var Leaderships = mongoose.model('Leadership', leardshipSchema);

module.exports = Leaderships;
