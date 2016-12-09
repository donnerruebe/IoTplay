var express = require('express');
var router = express.Router();

var low = require('lowdb');
var request = require("request");

const DATA_LENGTH = 50;
const DB_NAME = 'DB_Mailbox';

//db.get(DB_NAME).push(data).value();

//var data = db.get(DB_NAME).value();

const db = low();
db.set(DB_NAME, []).value();

var init= function(){
  db.get(DB_NAME).push({
    sender: "SummitTest",
    subject: "subjektiv",
    message: "eine tolle Lange Nachricht an den CHef"
  }).value();
  console.log(db.get(DB_NAME).value());
}

init();
// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});
// define the home page route
router.get('/', function(req, res) {
  res.send('Birds home page');
});
// define the about route
router.get('/about', function(req, res) {
  res.send('About birds');
});

var printMessage = function(sender,subject,message){
  printData="sender="+sender+"&subject="+subject+"&message="+message;
  request({
  uri: "http://"+MailBox.IP+"/print/?"+printData,
  method: "GET",
  timeout: 1000,
}, function(error, response, body) {
  console.log(error||response);
  //console.log(obj[obj.length-1]);
});
}

router.put('/question', function(req, res) {
  sender = req.body.sender || "ANONYMOUS";
  subject = "FRAGE: " +(req.body.subject || "NO-SUBJECT");
  message = req.body.message || "MESSAGE LOST";
  db.get(DB_NAME).push({
    sender: sender,
    subject: subject,
    message: message
  }).value();
  res.send('Danke für die Frage');
});

router.put('/mail', function(req, res) {
  sender = req.body.sender || "ANONYMOUS";
  subject = (req.body.subject || "NO-SUBJECT");
  message = req.body.message || "MESSAGE LOST";
  db.get(DB_NAME).push({
    sender: sender,
    subject: subject,
    message: message
  }).value();
  res.send('Mail was sent!');
});

router.get('/mails', function(req, res) {
  console.log("MailAbfrage");
  var data = db.get(DB_NAME).value();
  res.send(data);
});

router.get('/flag', function(req, res) {
  res.send(flagstate ? "on" : "off");
});

router.put('/flag/:state', function(req, res) {
  flagstate = (req.param.state == "on") ? true : false;
  res.send('Danke für die Frage');
});


var MailBox = {};

MailBox.IP = "0.0.0.0";

MailBox.setIP = function(IP) {
  MailBox.IP = IP;
}

module.exports = {
  router: router,
  object: MailBox
};
