require('dotenv').config();

const tmi = require('tmi.js');
const fs = require('fs');

fs.readFile('botlist', 'utf8', function(err, contents) {
    for (var value in contents.split("\n")) {
        console.log(value)

    }
});

const client = new tmi.Client({
    connection: {
        reconnect: true
    },
    channels: [
        'keley72456'
    ],
    identity: {
        username: value.split(":")[0],
        password: value.split(":")[1]
    }
});

client.connect();

client.on('message', async (channel, context, message) => {
    client.say(channel, "123");

});