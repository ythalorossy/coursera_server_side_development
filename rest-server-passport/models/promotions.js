var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
// Will add the Currency type to the Mongoose Schema types
require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;

var promotionSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  image: {
    type: String
  },
  label: {
    type: String,
    default: ""
  },
  price: {
    type: Currency,
    required: true
  },
  description: {
    type: String
  }
});

var Promotions = mongoose.model('Promotion', promotionSchema);

module.exports = Promotions;
