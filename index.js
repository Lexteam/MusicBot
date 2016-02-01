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
            if (message.author.voiceChannel == null) {
                bot.sendMessage(message.channel, 'That user is not in a voice channel!');
            } else {
                bot.joinVoiceChannel(message.author.voiceChannel);
                bot.sendMessage(message.channel, 'Joined voice channel successfully.');
            }
        } else if (args[0] === '!play') {
            if (args[1] == null) {
                bot.sendMessage(message.channel, 'Usage: !play <url>');
                return;
            }
            
            var video = youtubedl(args[1]);
            video.on('info', function(info) {
                if (!fs.exists("./audio_cache/" + info.id + ".mp3")) {
                    video.pipe(fs.createWriteStream("./audio_cache/" + info.id + ".mp3"));
                }
                //bot.voiceConnection.playFile("./audio_cache/" + info.id + ".mp3");
            });
        }
    }
});

bot.login(config.email, config.password);
