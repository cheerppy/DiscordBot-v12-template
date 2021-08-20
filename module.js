'use strict'

const discord = require('discord.js-12')
const client = new discord.Client();
require("./inlineReply");

const reTime = new RegExp(/^([0-9]|[01][0-9]|2[0-8]):[0-5][0-9]$/);
const reTimeEx = /^([01][0-9]|2[0-8])[0-5][0-9]$/;


function filter(m){return !m.author.bot;}
function option(x = 10){return { max: 1, time: x * 1000 };};

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
  return jst.getFullYear() + "/" + (jst.getMonth() + 1) + "/" + jst.getDate() + " " + jst.getHours() + ":" + ("0" + jst.getMinutes()).slice(-2) + ":" + ("0" + jst.getSeconds()).slice(-2) + ""
}

function sort(arr){
  return Array.from(new Set(arr.sort((a,b)=> {return a-b})));
}

function dice(max) {
  return Math.floor(Math.random() * max) + 1;
}

module.exports = {
  reTime, reTimeEx, filter, option, sendReply, getCh, sendMsg, embMsg,
  promMsg, wait, collect, getJst, strJst, sort, dice 
}