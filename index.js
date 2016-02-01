var fs = require('fs');
var config = require('./config.json');
var Discord = require('discord.js');
var youtubedl = require('youtube-dl');

var bot = new Discord.Client();

bot.on('message', function (message) {
    if (message.content.indexOf('!') === 0) {
        var args = message.content.split(' ');
        
        if (args[0] === '!help') {
            bot.sendMessage(message.channel, 'A help page will be availiable soon.');
        } else if (args[0] === '!summon') {
            bot.joinVoiceChannel(message.author.voiceChannel);
        }
    }
});

bot.login(config.email, config.password);
