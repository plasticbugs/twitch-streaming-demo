var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  username: String,
  messages : [{ type: Schema.Types.ObjectId, ref: 'Message' }]
});

module.exports = mongoose.model('User', userSchema);