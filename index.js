require('dotenv').config();
var fs = require("fs");
const Discord = require('discord.js');
const bot = new Discord.Client();
const TOKEN = process.env.TOKEN;

bot.login(TOKEN);

bot.on('ready', () => {
  console.info(`Logged in as ${bot.user.tag}!`);
});

bot.on('message', msg => {
  if (msg.content === '!ship') {
    var members = msg.guild.members
    msg.channel.send('<@' + members.random(2)[0].user.id + "> <3 " + "<@" + members.random(2)[1].user.id + ">")

  } else if (msg.content === '!dare') {
    var members = msg.guild.members.filter(member => member.user.username != "shipper-bot")
    var textByLine = fs.readFileSync('dares.txt').toString().split("\r\n");
    var count = textByLine.length
    msg.channel.send('<@' + members.random().user.id + "> " + textByLine[Math.floor(Math.random()*count)])

  } else if (msg.content.startsWith('!add')) {
    const text = msg.content.substring(5,msg.content.length)
    fs.appendFile('dares.txt', text+'\r\n' , function (err) {
      if (err) return console.log(err);
      msg.channel.send("You added <" + text + "> to the dare list")
   });
  }
});
