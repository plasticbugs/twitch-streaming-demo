var User = require('../models/users');
var Message = require('../models/messages');

module.exports.saveMessage = (req, res) => {
  var message = new Message({
    msgcontent: req.body.message
  });
  message.save(success => {
    User.findOne({ username: req.body.user}, (err, user) => {
      if(err) {
        throw(err)
      }
      if(user) {
        user.messages.push(message);
        user.save();
      } else {
        user = new User({
          username: req.body.user
        });
        user.messages.push(message);
        user.save();
      }
    })
  });
  res.sendStatus(200)
}

module.exports.showMessagesForUser = (req, res) => {
  User.findOne({ username: req.query.user})
  .populate({ path: 'messages'})
  .exec((err, result) => {
    if(err) {
      throw(err)
    } else {
      res.send(result);
    }
  })
}