var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Book = new Schema({
  name: String,
  authors: Array,
  description: String,
  thumbnailImage: String,
  owner: String,
  trades: Array,
  temporaryOwner: String
});

module.exports = mongoose.model('Book', Book);