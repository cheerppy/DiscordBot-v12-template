'use strict'
const botName = "template";
const test = true;
const valid = true;


const discord = require('discord.js-12');
const client = new discord.Client({allowedMentions: {repliedUser: true}});
require("./inlineReply");
const {
  reTime, reTimeEx, filter, option, sendReply, sendMsg, embMsg,
  promMsg, wait, collect, getJst, strJst, sort, dice 
} = require("./module");

var black = '\u001b[30m';var red = '\u001b[31m';var green = '\u001b[32m';var yellow = '\u001b[33m';var blue = '\u001b[34m';var magenta = '\u001b[35m';var cyan = '\u001b[36m';var white = '\u001b[37m';var gray = '\u001b[90m';var reset = '\u001b[0m';
const consolelog = console.log;console.log = (...a) => consolelog(strJst(getJst()), ...a);const consoleerror = console.error;console.error = (...a) => consoleerror(strJst(getJst()), ...a);

const http = require('http'); const https = require("https");
const querystring = require('querystring');
const config = require('./config.json');
const src = require("../../src/src.js");
const share = src.twitter.share;
const guilds = src.guilds;
const sqlite = require("sqlite3").verbose();
const db = new sqlite.Database(config.db);
const twitter = require("twitter");
require("dotenv").config();

const twitterTokens = {
  "consumer_key":process.env.consumer_key,
  "consumer_secret":process.env.consumer_secret,
  "access_token_key":process.env.access_token_key,
  "access_token_secret":process.env.access_token_secret
}
const Twitter = new twitter(twitterTokens);

const pref = config.prefix;
const mainId = config.testId;

http.createServer(function(req, res){if (req.method == 'POST'){var data = "";req.on('data', function(chunk){data += chunk;});req.on('end', function(){if(!data){console.log("No post data");res.end();return;}var dataObject = querystring.parse(data);console.log("post:" + dataObject.type);res.end();});}else if (req.method == 'GET'){res.writeHead(200, {'Content-Type': 'text/plain'});res.end(botName + ' is active now\ntest is ' + test + "\nvalidity is " + valid);}}).listen(3000);

client.on('ready', message =>{
 consolelog(cyan + strJst(getJst()), 'Bot準備完了～', reset);
 if(test){
  client.user.setPresence({  activity: {name: 'test'}, status: "idle"  }); return;
 }
 client.user.setPresence({  activity: {
   name: 'template',
   type: 'WATCHING'
  } });
});

client.on('message', message =>{
 if (message.author.id == client.user.id){return;}
 if (message.author.bot)return;
 if (!message.mentions.has(message.guild.defaultRole) && message.mentions.has(client.user)){
  sendReply(message, "なぁに？");
  return;
}
 if (message.content.match(/nya/)){
   let text = "にゃ～ん";
   sendMsg(message.channel, text);
   return;
 }
});

client.on('message', message =>{
  if (!message.content.startsWith(pref)) return;
  if (message.author.id == client.user.id || message.author.bot) return;
  const [com, ...args] = message.content.slice(pref.length).split(' ');
  const here = message.channel;
  const ch = getCh(mainId);
  
  if(com === "test"){
    sendMsg(ch, "test");
  }
  if(com === "get"){
    sendMsg(here, here.id);
  }
  
  
})

if(process.env.DISCORD_BOT_TOKEN == undefined){
console.log('DISCORD_BOT_TOKENが設定されていません。');
process.exit(0);
}

if(valid){client.login( process.env.DISCORD_BOT_TOKEN );}else{console.log("invalid");}

function getCh(channelId){
  return client.channels.cache.get(channelId);
}

