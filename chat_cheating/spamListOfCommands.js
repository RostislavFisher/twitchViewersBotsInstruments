var channelToSpam = "kotochyps"
require('dotenv').config();
function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}
const tmi = require('tmi.js-proxy');
const fs = require('fs');

var contents = fs.readFileSync('botlist', 'utf8');
var listOfCommands = fs.readFileSync('commands', 'utf8').split("\n");

var listOfClients = []
var timesleeps = [2000, 1000]


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
    while (true){
        await sleep(Math.floor(Math.random() * timesleeps.length))
        var person = listOfClients[Math.floor(Math.random() * listOfClients.length)]
        await sleep(timesleeps[Math.floor(Math.random() * timesleeps.length)])
        var command
        if(person.relationship===1){
            command = positive[Math.floor(Math.random() * positive.length)]

        }
        else{
            command = negative[Math.floor(Math.random() * negative.length)]

        }
        console.log(person.relationship+ " " + person.client.username + ">>>"+ command)
        person.client.say(channelToSpam, command);


    }

}

