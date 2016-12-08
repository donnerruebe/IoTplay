var express = require('express');
var router = express.Router();

var low = require('lowdb');

const DATA_LENGTH = 50;
const DB_NAME = 'DB_Sensordaten';

const db = low();
db.set(DB_NAME,[]).value();

var init= function(){
  var data = {
    'time':Date.now(),
    'infos':{}
  }
data.infos.temp=25;
data.infos.feucht=25;
data.infos.licht=100*0.01;

console.log(data);
db.get(DB_NAME).push(data).value();
}

init();

router.get('/', function (req, res) {
  res.send("SENSOR");
});

/**
* for application to get data
*/
router.get('/data', function (req, res) {
  var data = db.get(DB_NAME).value();
  if(data.length > DATA_LENGTH){
    data = data.slice(Math.max(data.length - DATA_LENGTH, 1));
  }
  res.send(data);
});

/**
* For sensor to store data
*/
router.post('/data',function(req, res) {
  var data = {
    'time':Date.now(),
    'infos':req.body
  }

  console.log(data);
  db.get(DB_NAME).push(data).value();
  res.send();
});

router.get('/set/data',function(req, res) {
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

var Sensor={};

Sensor.IP="0.0.0.0";

Sensor.setIP = function(IP){
  Sensor.IP=IP;
}

module.exports = {router:router,object:Sensor};
