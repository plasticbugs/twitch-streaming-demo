var api = require('twitch-api-v5');

api.clientID = process.env.TWITCH_CLIENT_ID;

module.exports.findChannel = (req,res) => {
  api.search.channels({query: req.body.channelname}, (err, response) => {
    console.log(response);
    res.sendStatus(200);
  })
}