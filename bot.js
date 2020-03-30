var Discord = require('discord.js');
var auth = require('./auth.json');
var api = require('./api.js');

var client = new Discord.Client();

client.once('ready', () => {
	console.log('Ready!');
});

client.login(auth.token);

client.on('message', async function (message) {
    if (message.content.substring(0, 1) == '!') {
        var args = message.content.substring(1).split(' ');
        var cmd = args[0];
       if (['help', 'info', 'information', 'cases', 'locations', 'testing', 'stats', 'statistics'].indexOf(cmd) > -1) {
        args = args.splice(1);
        message.channel.startTyping();
        switch(cmd) {
            case 'help':
                message.channel.send(new Discord.MessageEmbed()
                .setColor('#00aad2')
                .setTitle('Help')
                .addFields(
                    { name: '!info / !information', value: 'hyperlink to official website'},
                    { name: '!cases / !locations', value: 'view number of cases and their locations'},
                    { name: '!stats / !statistics', value: 'hyperlink to official statistics website'},
                    { name: '!testing', value: 'overview of testing in Alberta'}
                ));
                break;
            case 'info':
            case 'information':
                message.channel.send(new Discord.MessageEmbed()
                .setColor('#00aad2')
                .setTitle('Information')
                .setDescription('Hyperlink to offical website')
                .setURL('https://www.alberta.ca/coronavirus-info-for-albertans.aspx')
                );
                break;
            case 'cases':
            case 'locations':
                message.channel.send( await api.getLocationsEmbed());
                break;
            case 'testing':
                message.channel.send( await api.getTestingEmbed());
                break;
            case 'stats':
            case 'statistics':
                message.channel.send(new Discord.MessageEmbed()
                .setColor('#00aad2')
                .setTitle('Statistics')
                .setDescription('Hyperlink to offical statistics website.')
                .setURL('https://covid19stats.alberta.ca/')
                );
                break;
        }
        message.channel.stopTyping();
       }
     }
});

//for glitch.com hosting
// const fetch = require('node-fetch');
// const express = require('express');
// const app = express();
// app.get("/", (request, response) => {
//   console.log(Date.now() + " Ping Received");
//   response.sendStatus(200);
// });
// app.listen(process.env.PORT);
// setInterval(() => {
//   fetch(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
// }, 280000);
