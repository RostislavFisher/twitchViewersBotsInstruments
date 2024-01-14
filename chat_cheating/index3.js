require('dotenv').config();
const inquirer = require('inquirer')

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
        const prompt = require("prompt-sync")({ sigint: true });
        const name = prompt("What is your name?");
        var client = listOfClients[Math.floor(Math.random() * listOfClients.length)]
        client.say("vizer_61", name)



    }

}


