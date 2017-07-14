var User = require('../models/users');

module.exports.saveMessage = (req, res) => {
  console.log(req.body);
  res.sendStatus(200)
}