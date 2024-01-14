require('dotenv').config();
function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}
const prompt = require('prompt-sync')();

const tmi = require('tmi.js');
const fs = require('fs');
var contents = fs.readFileSync('botlist', 'utf8');

var listOfClients = []


var num = 0
for (var value in contents.split("\n")) {
    num+=1
    const client = new tmi.Client({
        connection: {
            reconnect: true
        },
        channels: [
            'vizer_61'
        ],
        identity: {
            username: contents.split("\n")[value].split(":")[0],
            password: contents.split("\n")[value].split(":")[1]
        }
    });
    console.log(num + "." + contents.split("\n")[value].split(":")[0])

    client.connect();
    listOfClients.push(client)

}

init()

function init() {
    while (true){


        var id = prompt('Who are you? >>> ');
        var text = prompt('What would you say? >>> ');
        console.log(text)
        listOfClients[parseInt(id)].say('vizer_61', text)
        console.log(listOfClients[parseInt(id)])

    }

}


