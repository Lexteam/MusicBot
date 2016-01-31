var fs = require('fs');
var config = require('./config.json');
var DiscordClient = require('discord.io');
var youtubedl = require('youtube-dl');

var bot = new DiscordClient(config);

bot.on('message', function(user, userID, channelID, message, rawEvent) {
    if (message[0] === '!') {
        // it's a command handle it.
        
        // commands: help, play
    }
}
