var express = require('express');
var router = express.Router();

var player = require('play-sound')(opts = {})
var audio;

var track    = {track:"",position:0.1};
var playlist = ["foo.mp3"];

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});
// define the home page route
router.get('/', function(req, res) {
  res.send('AudioPlayer');
});
// define the about route
router.get('/about', function(req, res) {
  res.send('### AudioPlayer'+
   '- [GET] player/liste;;["filename",...] //Liste der Dateien?'+
   '- [GET] player/play;;{track:"filename",position:(float 0-1.0)} //evtl. WiedergabeInfos'+
   '- [POST]player/play;{track:"filename"};'+
   '- [POST]player/pause'+
   '- [POST]player/stop');
});

router.get('/liste',function(req, res){
  res.send(playlist);
});

router.get('/play',function(req, res){
  res.send(track);
});

router.post('/play',function(req, res){
  var track = req.body.track;
  if(-1==playlist.indexOf(track)){
    res.send("Track not available!");
    return;
  }
  if(audio){
    audio.kill();
  }
  audio = player.play('foo.mp3', function(err){
    if (err) console.log('Error, but it shouldn\'t be bad at all');
  });

  res.send("play "+track);
});

router.post('/play',function(req, res){
  res.send(track);
});

router.get('/stop',function(req, res){
  if(audio){
    audio.kill();
    audio = null;
  }
  res.send();
});


module.exports = router;
