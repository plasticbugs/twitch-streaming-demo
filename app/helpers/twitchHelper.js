import tmi from 'tmi.js';

var client = new tmi.client({
  identity: {
    username: process.env.TWITCH_USERNAME,
    password: process.env.TWITCH_CHAT_TOKEN
  }
});
client.connect();

module.exports = client;