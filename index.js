'use strict'
const botName = "template";
const test = true;
const valid = true;


const http = require('http');
const querystring = require('querystring');
const discord = require('discord.js-12');
const client = new discord.Client({allowedMentions: {repliedUser: true}});
const config = require('./config.json');
const sqlite = require("sqlite3").verbose();
const db = new sqlite.Database(config.db);
const twitter = require("twitter")
const Twitter = new twitter(config.twitter);
require("./inlineReply");
require("dotenv").config();


const reTime = new RegExp(/^([0-9]|[01][0-9]|2[0-8]):[0-5][0-9]$/);
const reTimeEx = /^([01][0-9]|2[0-8])[0-5][0-9]$/;
const filter = m => !m.author.bot;
const option = function(x = 10){return { max: 1, time: x * 1000 };};
const pref = config.prefix;

http.createServer(function(req, res){if (req.method == 'POST'){var data = "";req.on('data', function(chunk){data += chunk;});req.on('end', function(){if(!data){console.log("No post data");res.end();return;}var dataObject = querystring.parse(data);console.log("post:" + dataObject.type);res.end();});}else if (req.method == 'GET'){res.writeHead(200, {'Content-Type': 'text/plain'});res.end(botName + ' is active now\ntest is ' + test + "\nvalidity is " + valid);}}).listen(3000);

client.on('ready', message =>{
 console.log('Bot準備完了～');
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
 if (message.mentions.has(client.user)){
   sendReply(message, "呼びましたか？");
   return;
 }
 if (message.content.match(/にゃ～ん|にゃーん|nya/)){
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
  
})

if(process.env.DISCORD_BOT_TOKEN == undefined){
console.log('DISCORD_BOT_TOKENが設定されていません。');
process.exit(0);
}

if(valid){client.login( process.env.DISCORD_BOT_TOKEN );}else{console.log("invalid")}

function sendReply(message, text){
 const m = message.inlineReply(text)
   .then(console.log("リプライ送信: " + text))
   .catch(console.error);
  return m;
}

function getCh(channelId){
  return client.channels.cache.get(channelId);
}

function sendMsg(channel, text, option={}){
 const m = channel.send(text, option)
   .then(console.log("メッセージ送信: " + text + JSON.stringify(option)))
   .catch(console.error);
  return m
}

function embMsg(ch, title, text,...fields){
  fields = fields.map(field=>{return {"name": field[0], "value": field[1], "inline": field[2] || false};})
  const emb = new discord.MessageEmbed()
   .setColor("#0099ff")
   .setTitle(title)
   .setDescription(text)
   .addFields(fields);
  const m = ch.send(emb)
   .then(console.log("埋め込みメッセージ送信: 【" + title + "】" + text ))
   .catch(console.error);
  return m;
}

function promMsg(ch, text, opt = {}){
  return new Promise(res=>{
   const m = sendMsg(ch, text, opt);
    return res(m);
  });
}

function wait(s){
 return new Promise(res=>setTimeout(res, s * 1000));
}

function collect(channel, x){
 return new Promise(res => {channel.startTyping(); channel.awaitMessages(filter,option(x)).then(
   msg=>{if(msg.first()){console.log("メッセージ収集: " + msg.first().content);} channel.stopTyping(); res(msg);}
 )});
}

function getJst(){
   const jst = new Date(Date.now() + ((new Date().getTimezoneOffset() + (9 * 60)) * 60 * 1000));
   return jst
}

function strJst(jst){
  return jst.getFullYear() + "/" + (jst.getMonth() + 1) + "/" + jst.getDate() + " " + jst.getHours() + ":" + jst.getMinutes() + ":" + jst.getSeconds() + ""
}

function sort(arr){
  return Array.from(new Set(arr.sort((a,b)=> {return a-b})));
};