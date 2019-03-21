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
    var commands = ['hi', 'help', 'joke', 'gn'];
    var formattedList = "\n";

    commands.sort();

    let i = 0;
    for (i; i < commands.length; i++) {
        formattedList += '**~' + commands[i] + "**\n";
    }

    return formattedList;
 } 

 function getRPSCommand(userRps) {
    var emotes = [':left_facing_fist:', ':v:', ':raised_back_of_hand:'];
    var options = ['rock', 'paper', 'seissors'];
    let minimum = 0;
    let winner = 'bot';
    var userOption = userRps.split('_')[1];
    var emote;
    var messageWin = ':fire: YOU WIN! :fire:';
    var messageLose = ':poop: *you lose* :poop:';
    var message = '';
    var messageEqual = ':raised_hands: **Tied** :raised_hands:';
    let botOption = options[Math.floor(Math.random() * (options.length - minimum + 1)) + minimum];

    console.log('bot=' + botOption  + ', user=' + userOption);

    if (userOption == 'rock') {
        if (botOption == 'paper') {
            emote = emotes[1];
            message = messageLose; 
        }
        else if (botOption == 'seissors') {
            emote = emotes[2];
            message = messageWin; 
        } 
        else {
            emote = emotes[0];
            message = messageEqual; 
        }
    }
    else if (userOption == 'paper') {
        if (botOption == 'paper') {
            emote = emotes[1];
            message = messageEqual; 
        }
        else if (botOption == 'seissors') {
            emote = emotes[2];
            message = messageLose; 
        } 
        else {
            emote = emotes[0];
            message = messageWin; 
        }
    }
    else {
        if (botOption == 'paper') {
            emote = emotes[1];
            message = messageWin; 
        }
        else if (botOption == 'seissors') {
            emote = emotes[2];
            message = messageEqual; 
        } 
        else {
            emote = emotes[0];
            message = messageLose; 
        }
    }

    return emote + '\n\n' + message;
 }


 function getMoodCompliment() {
    var compliments = ['hi', 'help'];
 }

 function getRandomJoke() {
    let minimum = 0;
    var jokes = [
        "What do you call a fake noodle? An Impasta.", 
        "Want to hear a joke about paper? Nevermind it's tearable.",
        "Why did the coffee file a police report? It got mugged.",
        "Dad, did you get a haircut? No I got them all cut.",
        "What do you call a Mexican who has lost his car? Carlos.",
        "Dad, can you put my shoes on? No, I don't think they'll fit me",
        "Why don't skeletons ever go trick or treating? Because they have no body to go with.",
        "What do you call an elephant that doesn't matter? An irrelephant",
        "Want to hear a joke about construction? I'm still working on it",
        "What do you call a fat psychic? A four-chin teller."
    ];

    return jokes[Math.floor(Math.random() * (jokes.length - minimum + 1)) + minimum];
 }

 function getRandomGN() {
    let minimum = 0;
    var gn = [
        "Don't fear, today monsters won't visit you as I will protect your sleep.", 
        "Let the silence of the night be disrupted only by your measured breathing, sleep well",
        "GO TO SLEEEEP!!!! GOOD NIGHT, SLEEP TIGHT! :relaxed:"
    ];
    return gn[Math.floor(Math.random() * (gn.length - minimum + 1)) + minimum];
 }
bot.on('message', function (user, userID, channelID, message, evt) {

    if (message.substring(0, 1) == '~') {
        var args = message.substring(1).split(' ');
        var cmd = (args[0]).toLowerCase();
       
        args = args.splice(1);
        let stringMessage = '';

        switch(cmd) {
            case 'hi':  
                stringMessage = 'Hi ' + user + '. I hope you are having a good day! :relaxed:'
            break;
            case 'help':
                stringMessage = user + ', here is the list of commands I currently understand:' + listOfCommands()
            break;
            case 'joke':
                stringMessage = getRandomJoke();
            break;
            case 'gn':
                stringMessage = getRandomGN();
            break;
            case 'rps_rock':
            case 'rps_paper':
            case 'rps_seissors':
                stringMessage = getRPSCommand(cmd);
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