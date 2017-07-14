var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var messageSchema = new Schema({
  msgcontent: String
});

module.exports = mongoose.model('Message', messageSchema);