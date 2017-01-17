var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Book = new Schema({
  name: String,
  author: String,
  description: String,
  thumbnailImage: String,
  owner: String,
  pendingTrades: Array,
  temporaryOwner: String
});

module.exports = mongoose.model('Book', Book);