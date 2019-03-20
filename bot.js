var Discord = require('discord.io');
var logger = require('winston');
// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';
// Initialize Discord Bot
var bot = new Discord.Client({
   token: process.env.token,
   autorun: true
});
bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});

function listOfCommands() {
    var commands = ['hi', 'help'];
    var formattedList = "\n";

    commands.sort();

    let i = 0;
    for (i; i < commands.length; i++) {
        formattedList += '**~' + commands[i] + "**\n";
    }

    return formattedList;
 } 

bot.on('message', function (user, userID, channelID, message, evt) {

    if (message.substring(0, 1) == '~') {
        var args = message.substring(1).split(' ');
        var cmd = (args[0]).toLowerCase();
       
        args = args.splice(1);
        let stringMessage = '';
        let user1 = message.mentions.users.first();

        switch(cmd) {
            case 'hi':  
                stringMessage = 'Hi ' + user + '. I hope you are having a good day! :relaxed:'
            break;
            case 'help':
                stringMessage = user + ', here is the list of commands I currently understand:' + listOfCommands()
            break;
            case 'mention':
                stringMessage = user1;
            break;
            default:
                stringMessage = ':confused: ... I do not understand that command right now, but I am upgrading so I will probably understand it in the future. :nerd:'
         }

         bot.sendMessage({
            to: channelID,
            message: stringMessage
        });
     }
});