var express = require('express');
var router = express.Router();

var request = require("request");

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});
/*
### MessageDisplay
 - [PUT] messageboard/text/;{text:str};          //schreibt den Text auf's Display
 - [DELETE] messageboard/all;;                   //Löscht das Display
*/
// define the home page route
router.get('/', function(req, res) {
  res.send('Birds home page');
});
// define the about route
router.get('/about', function(req, res) {
  res.send('About birds');
});

var setDisplay = function(textMsg,cb){
  reqUrl="http://"+Display.IP+"/text?t0="+textMsg;
  console.log(reqUrl)
  request({
  uri: "http://"+Display.IP+"/matrix/text?t0="+textMsg,
  method: "GET",
  timeout: 1000,
  }, function(error, response, body) {
    //console.log(error||response);
    //console.log(obj[obj.length-1]);
    cb("OK");
  });

};

router.put('/text', function(req, res){
  console.log(req.body);
  var textMsg = req.body.text;
  console.log("printing to LED-Display ",textMsg);
  setDisplay(textMsg,function(re){res.send(re)})
});

router.delete('/all', function(req, res){
  console.log(req.body);
  console.log("clear all LED-Display ");
  setDisplay("",function(re){res.send(re)});
});

var Display={};

Display.IP="0.0.0.0";

Display.setIP = function(IP){
  console.log("LEDMATRIX IP = ",IP);
  Display.IP=IP;
}

module.exports = {router:router,object:Display};
