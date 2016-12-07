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

/* IOT SYNC

const dgram = require('dgram');
const server = dgram.createSocket('udp4');

server.on('error', (err) => {
  console.log(`server error:\n${err.stack}`);
  server.close();
});

server.on('message', (msg, rinfo) => {
  console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
});

server.on('listening', () => {
  var address = server.address();
  console.log(`server listening ${address.address}:${address.port}`);
});

server.bind(8239);
// server listening 0.0.0.0:8239

// END IOTSYNC*/

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


var devices={};

devices.LEDCUBE={url:"192.168.137.44"};

const db = low();
db.set(DB_NAME,[]).value();

app.use(function (req, res, next) {
  console.log('Time: %d', Date.now(), "from",req.host);
  next();
});

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

app.get('/sensor/data',function(req, res) {
  if(req.query){
  var data = {
    'time':Date.now(),
    'infos':{}
  }
  data.infos.temp=req.query.temp;
  data.infos.feucht=req.query.humid;
  data.infos.licht=req.query.light*0.01;

  console.log(data);
  db.get(DB_NAME).push(data).value();
  res.send("OK");}else{res.send("NOT-OK");}
});

app.post('/messagedisplay', function(req, res){
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
  r=req.body.r||0;
  g=req.body.g||0;
  b=req.body.b||0;
  param="r="+r+"&g="+g+"&b="+b;
  console.log("http://"+devices.LEDCUBE.url+"/rgb?"+param);
  request({
  uri: "http://"+devices.LEDCUBE.url+"/led/rgb?"+param,
  method: "GET",
  timeout: 1000,
}, function(error, response, body) {
  //console.log(error||response);
  //console.log(obj[obj.length-1]);
  res.send();
});
});

app.put('/ledCube/switch', function(req, res){
  conapp.put('/ledCube/switch', function(req, res) {sole.log(req.body);
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
