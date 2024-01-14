const prompts = require('prompts');

require('dotenv').config();
const tmi = require('tmi.js');
const fs = require('fs');
var channelToSpam = fs.readFileSync('nick', 'utf8')
var contents = fs.readFileSync('botlist', 'utf8');
var listOfCommands = fs.readFileSync('commands', 'utf8').split("\n");

var listOfClients = []


var positive =[]
var negative =[]

class account {
    constructor(client, relationship) {
        this.client = client
        this.relationship = parseInt(relationship)
    }
}

for(var comment in listOfCommands){
    if (parseInt(listOfCommands[comment].split(":_")[0])===1){
        console.log(listOfCommands[comment].split("1_:_")[0] + " positive")
        positive.push(listOfCommands[comment].split("_:_")[1])
    }
    if (parseInt(listOfCommands[comment].split(":_")[0])===-1){
        console.log(listOfCommands[comment].split("1_:_")[0] + " negative")

        negative.push(listOfCommands[comment].split("_:_")[1])
    }
}

console.log(positive)
console.log(negative)

for (var value in contents.split("\n")) {
    console.log(contents.split("\n")[value])
    const client = new tmi.Client({
        connection: {
            reconnect: true
        },
        channels: [
            channelToSpam
        ],
        identity: {
            username: contents.split("\n")[value].split("_:_")[1].split(":")[0],
            password: contents.split("\n")[value].split("_:_")[1].split(":")[1]
        }
    });

    client.connect();
    listOfClients.push(new account(client, contents.split("\n")[value].split("_:_")[0]))

}
init()

async function init() {
    for (var user in listOfClients) {
        console.log(user + ". " + listOfClients[user].client.opts.identity.username)
    }
    while (true){
        const userID = await prompts({
            type: 'number',
            name: 'value',
            message: 'user ID',
        });
        const response = await prompts({
            type: 'text',
            name: 'value',
            message: 'text',
        });
        var person = listOfClients[parseInt(userID.value)]
        person.client.say(channelToSpam, response.value);


    }

}


