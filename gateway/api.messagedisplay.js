var express = require('express');
var router = express.Router();

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

router.put('/text', function(req, res){
  console.log(req.body);
  console.log("printing to LED-Display ",req.body.text);
  res.send();
});

router.delete('/all', function(req, res){
  console.log(req.body);
  console.log("clear all LED-Display ");
  res.send();
});

var Display={};

Display.IP="0.0.0.0";

Display.setIP = function(IP){
  Display.IP=IP;
}

module.exports = {router:router,object:Display};
