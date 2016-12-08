var express = require('express');
var router = express.Router();

var request = require("request");

var Color = {r:0,g:0,b:0};

// define the home page route
router.get('/', function(req, res) {
  res.send('LED-CUBE');
});
// define the about route
router.get('/about', function(req, res) {
  res.send('LED-CUBE');
});

router.get('/color', function(req, res){
  //console.log(req.body);
  res.send(Color);
});

router.put('/color', function(req, res){
  console.log(req.body);
  Color.r=req.body.r||0;
  Color.g=req.body.g||0;
  Color.b=req.body.b||0;
  param="r="+Color.r+"&g="+Color.g+"&b="+Color.b;
  console.log("http://"+devices.LEDCUBE.url+"/rgb?"+param);
  request({
  uri: "http://"+devices.LEDCUBE.url+"/led/rgb?"+param,
  method: "GET",
  timeout: 1000,
}, function(error, response, body) {
  //console.log(error||response);
  //console.log(obj[obj.length-1]);
  res.send(Color);
});
});

router.post('/switch', function(req, res) {
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


var LedCube={};

LedCube.IP="0.0.0.0";

LedCube.setIP = function(IP){
  LedCube.IP=IP;
}

module.exports = {router:router,object:LedCube};
