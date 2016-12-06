var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var request = require("request");
var crypto = require('crypto');
var app = express()

var userRights = {
  led:false,
  message:false,
  servo:false,
  data:false,
  sound:false,
  changeRights:false
}

var adminRights = {
    led:true,
    message:true,
    servo:true,
    data:true,
    sound:true,
    changeRights:true
}

var adminCookies = [];
const COOKIE_NAME = 'summadmin';
const GATEWAY = "http://127.0.0.1:4567";

app.use(cookieParser());
app.use(express.static('static'));
app.use("/folien",express.static('../doc/reveal'));
app.use(bodyParser.json());

function isAdmin(req) {
  if(req.cookies.summadmin){
    var cookie = req.cookies.summadmin;
    if((adminCookies.indexOf(cookie)>=0)){
      return true;
    }
  }
  return false;
}

function sha256(data) {
    return crypto.createHash("sha256").update(data).digest("base64");
}

app.get('/', function(req, res) {
    res.send('Hello World!')
})

app.get('/talk/folie/:msg', function(req, res) {
  if (!(isAdmin(req) || userRights.changeRights)) {
    res.status(418).send('I’m a teapot');
    return;
  }
  console.log(req.params);
  res.send(req.params);
})

app.get('/rest/data/', function(req, res) {
  if (!((isAdmin(req) && adminRights.data) || userRights.data)) {
    res.status(418).send('I’m a teapot');
    return;
  }

    request({
        uri: GATEWAY+"/data",
        method: "GET",
        timeout: 1000,
    }, function(error, response, body) {
        res.send(body);
        //console.log(body);
    });
})

app.get('/rest/data/latest', function(req, res) {
  if (!((isAdmin(req) && adminRights.data) || userRights.data)) {
    res.status(418).send('I’m a teapot');
    return;
  }


    request({
        uri: GATEWAY+"/data",
        method: "GET",
        timeout: 1000,
    }, function(error, response, body) {
      var result = {};
        if (body) {
          obj = JSON.parse(body);
          result = obj[obj.length - 1];
        }
        res.send(result);
        //console.log(obj[obj.length-1]);
    });
});

app.post('/rest/led/rgb', function(req, res) {

  if (!((isAdmin(req) && adminRights.led) || userRights.led)) {
    res.status(418).send('I’m a teapot');
    return;
  }

    console.log(req.body);
    var c = req.body
    request({
        uri: GATEWAY+"/ledCube/color",
        method: "PUT",
        timeout: 1000,
        json: {
            r: c.red,
            g: c.green,
            b: c.blue
        }
    }, function(error, response, body) {
        //var obj=JSON.parse(body);
        //console.log(obj[obj.length-1]);
    });
});

app.get('/rest/soeren/hicookie',function(req,res) {
  var cookie = sha256(Date.now().toString());
  adminCookies.push(cookie);
  res.cookie(COOKIE_NAME,cookie, { maxAge: 900000, httpOnly: true });
  res.redirect('/');
});

app.post('/rest/led/switch', function(req, res) {

  if (!((isAdmin(req) && adminRights.led) || userRights.led)) {
    res.status(418).send('I’m a teapot');
    return;
  }
    console.log(req.body);
    var state = req.body.state;
    request({
        uri: GATEWAY+"/ledCube/switch",
        method: "PUT",
        timeout: 1000,
        json: {
            state: state
        }
    }, function(error, response, body) {
        //var obj=JSON.parse(body);
        //console.log(obj[obj.length-1]);
    });

    res.send('ok');
});

app.get('/rest/isAllowed', function(req,res){
  if (isAdmin(req)) {
    res.send(adminRights);
  } else {
    res.send(userRights);
  }
});

app.get('/rest/user/rights', function(req,res){
    res.send(userRights);
});

app.post('/rest/user/rights', function(req,res){
  if (!((isAdmin(req) && adminRights.changeRights)  || userRights.changeRights)) {
    res.status(418).send('I’m a teapot');
    return;
  }
  var data = req.body;
  if(data){
    userRights = data;
  }
  res.send();
});

app.get('/rest/stop', function(req,res) {
  request({
      uri: GATEWAY+"/stopMusic",
      method: "GET",
      timeout: 1000
  }, function(error, response, body) {
      //var obj=JSON.parse(body);
      //console.log(obj[obj.length-1]);
  });
  res.send();
});

app.get('/rest/play/:num',function(req,res) {
  var num = req.params.num;
  request({
      uri: GATEWAY+"/playMusic/"+num,
      method: "GET",
      timeout: 1000
  }, function(error, response, body) {
      //var obj=JSON.parse(body);
      //console.log(obj[obj.length-1]);
  });
  res.send();
})

app.post('/rest/message', function(req,res) {
  var data = req.body;
  request({
      uri: GATEWAY+"/messageboard",
      method: "POST",
      timeout: 1000,
      data: data
  }, function(error, response, body) {
      //var obj=JSON.parse(body);
      //console.log(obj[obj.length-1]);
  });
  res.send();
})

app.post('/rest/servo', function(req,res) {
  var data = req.body;
  request({
      uri: GATEWAY+"/mailbox",
      method: "POST",
      timeout: 1000,
      data: data
  }, function(error, response, body) {
      //var obj=JSON.parse(body);
      //console.log(obj[obj.length-1]);
  });
  res.send();
})

var server = app.listen(8080, function() {
    console.log('Example app listening on port 8080!')
})

module.exports = server;
