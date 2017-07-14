var api = require('twitch-api-v5');

api.clientID = process.env.TWITCH_CLIENT_ID;

module.exports.findChannel = (req,res) => {
  api.search.channels({query: req.body.channelname}, (err, response) => {
    if(err) {
      console.log("API error: ", err);
      res.sendStatus(501);
      throw(err);
    } else {
      res.send(response);
    }
  })
}