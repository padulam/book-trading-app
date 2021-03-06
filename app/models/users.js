var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema({
  twitter:{
    id: String,
    username: String,
    displayName: String
  },
  firstName: String,
  lastName: String,
  address: String,
  city: String,
  state: String,
  zip: String,
  created: Date,
  myTrades: Array
});

module.exports = mongoose.model('User', User);