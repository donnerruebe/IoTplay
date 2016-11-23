var express = require('express');
var request = require("request");
//var cors = require('express-cors');
var low = require('lowdb')
var bodyParser = require('body-parser');
var player = require('play-sound')(opts = {})
const PORT = 4567;
const DATA_LENGTH = 50;
const DB_NAME = 'data';

var audio;
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


var devices={};

devices.LEDCUBE={url:"127.0.0.1:1000"};

const db = low();
db.set(DB_NAME,[]).value();

/**
* for application to get data
*/
app.get('/data', function (req, res) {
  var data = db.get(DB_NAME).value();
  if(data.length > DATA_LENGTH){
    data = data.slice(Math.max(data.length - DATA_LENGTH, 1));
  }
  res.send(data);
});

/**
* For sensor to store data
*/
app.post('/data',function(req, res) {
  var data = {
    'time':Date.now(),
    'infos':req.body
  }

  console.log(data);
  db.get(DB_NAME).push(data).value();
  res.send();
});

app.post('/message', function(req, res){
  console.log(req.body);
  res.send();
});

app.post('/servo', function(req, res){
  console.log(req.body);
  res.send();
});

app.post('/led', function(req, res){
  console.log(req.body);
  res.send();
});

app.put('/ledCube/color', function(req, res){
  console.log(req.body);
  res.send();
  r=req.body.r||0;
  g=req.body.g||0;
  b=req.body.b||0;
  param="r="+r+",g="+g+",b="+b;
  request({
  uri: "http://"+devices.LEDCUBE.url+"/rgb?"+param,
  method: "GET",
  timeout: 1000,
}, function(error, response, body) {
  console.log(error||response);
  //console.log(obj[obj.length-1]);
});
});

app.put('/ledCube/switch', function(req, res){
  console.log(req.body);
  res.send();
  var state="off";
  if(req.body.state=="on"){
    state="on";
  }
  request({
  uri: "http://"+devices.LEDCUBE.url+"/"+state,
  method: "GET",
  timeout: 1000,
}, function(error, response, body) {
  var obj=JSON.parse(body);
  res.send(obj[obj.length-1]);
  //console.log(obj[obj.length-1]);
});
});

app.get('/play',function(req, res){
  if(audio){
    audio.kill();
  }
  audio = player.play('foo.mp3', function(err){
    if (err) console.log('Error, but it shouldn\'t be bad at all');
  });
  res.send();
});

app.get('/stop',function(req, res){
  if(audio){
    audio.kill();
    audio = null;
  }
  res.send();
});

app.listen(PORT, function () {
  console.log('This app is listening on port '+PORT);
});
