var fs = require('fs');
var config = require('./config.json');
var DiscordClient = require('discord.io');
var youtubedl = require('youtube-dl');

var bot = new DiscordClient(config);

bot.on('message', function(user, userID, channelID, message, rawEvent) {
    if (message[0] === '!') {
        // it's a command handle it.
        // commands: help, play
        
        var commandSplit = message.split(' ');
        if (commandSplit[0] === '!help') {
            bot.sendMessage({
                to: channelID,
                message: 'A help page will be availiable soon.'
            });
        } else if (commandSplit[0] == '!play') {
            if (commandSplit[1] === null || commandSplit[1] === '') {
                bot.sendMessage({
                    to: channelID,
                    message: 'Usage: !play <youtube_url>'
                });
            } else {
                var video = youtubedl(commandSplit[1]);
                video.pipe(fs.createWriteStream('audio_cache/' + commandSplit[1] + '.mp4'));
                
                bot.getAudioContext(channelID, function(stream) {
                    stream.playAudioFile('audio_cache/' + commandSplit[1] + '.mp4');
                });
            }
        }
    }
}
