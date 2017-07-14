var tmi = require("tmi.js");

var client = new tmi.client({
    identity: {
        username: process.env.TWITCH_USERNAME,
        password: process.env.TWITCH_CHAT_TOKEN
    },
    channels: ["#schmoopiie"]
});

// Connect the client to the server..
client.connect();