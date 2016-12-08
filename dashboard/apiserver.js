var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var request = require("request");
var crypto = require('crypto');
var app = express()

var userRights = {
  led:false,
  age:false,
  servo:true,
  data:false,
  sound:false,
  changeRights:false
}

var adminRights = {
    led:true,
    age:true,
    servo:true,
    data:true,
    sound:true,
    changeRights:true
}
userRights=adminRights;

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
  var msg = req.params.msg;
  request({
    uri:GATEWAY+'/messageboard/text',
    method:'PUT',
    timeout:1000,
    json:{
      text:msg
    }
  }, function(error,response,body) {
      if (error) {
        console.log(error);
      }
  })
  console.log(req.params);
  res.send(req.params);
})

app.get('/rest/data/', function(req, res) {
  if (!((isAdmin(req) && adminRights.data) || userRights.data)) {
    res.status(418).send('I’m a teapot');
    return;
  }

    request({
        uri: GATEWAY+"/sensor/data",
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
        uri: GATEWAY+"/sensor/data",
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
    res.send();
});

app.get('/rest/led/rgb', function(req, res) {

  if (!((isAdmin(req) && adminRights.led) || userRights.led)) {
    res.status(418).send('I’m a teapot');
    return;
  }
    request({
        uri: GATEWAY+"/ledCube/color",
        method: "GET",
        timeout: 1000
    }, function(error, response, body) {
      if (error) {
        res.send();
        return;
      }
      res.send(body);
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
        method: "POST",
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
      uri: GATEWAY+"/player/stop",
      method: "POST",
      timeout: 1000
  }, function(error, response, body) {
      //var obj=JSON.parse(body);
      //console.log(obj[obj.length-1]);
  });
  res.send();
});

app.get('/rest/play/:titel',function(req,res) {
  if (!((isAdmin(req) && adminRights.sound)  || userRights.sound)) {
    res.status(418).send('I’m a teapot');
    return;
  }
  var titel = req.params.titel;
  request({
      uri: GATEWAY+"/player/play",
      method: "POST",
      timeout: 1000,
      data:{
        track:titel
      }
  }, function(error, response, body) {
      //var obj=JSON.parse(body);
      //console.log(obj[obj.length-1]);
  });
  res.send();
});

app.get('/rest/play/list', function(req,res) {

    if (!((isAdmin(req) && adminRights.sound)  || userRights.sound)) {
      res.status(418).send('I’m a teapot');
      return;
    }
  request({
      uri: GATEWAY+"/player/liste",
      method: "POST",
      timeout: 1000
  }, function(error, response, body) {
      if (error) {
        res.send();
        return;
      }
      res.send(body);
  });
})

app.post('/rest/message', function(req,res) {
  var data = req.body;
  request({
      uri: GATEWAY+"/messageboard/text/",
      method: "PUT",
      timeout: 1000,
      json: data
  }, function(error, response, body) {
      //var obj=JSON.parse(body);
      //console.log(obj[obj.length-1]);
  });
  res.send();
});

app.delete('/rest/message', function(req,res) {
  request({
      uri: GATEWAY+"/messageboard/all",
      method: "DELETE",
      timeout: 1000
  }, function(error, response, body) {
      //var obj=JSON.parse(body);
      //console.log(obj[obj.length-1]);
  });
  res.send();
});

app.post('/rest/servo', function(req,res) {
  var data = req.body;
  console.log(data);
  request({
      uri: GATEWAY+"/mailbox/question/",
      method: "PUT",
      timeout: 1000,
      json: data
  }, function(error, response, body) {
    if (error) {
      console.log(error);
    }
  });
  res.send();
})

app.get('/rest/servo', function(req,res) {
  request({
      uri: GATEWAY+"/mailbox/mails/",
      method: "GET",
      timeout: 1000
  }, function(error, response, body) {
    if (error || !body) {
      res.send();
      return;
    }
    body=JSON.parse(body);
    if (body.length>20){
      body = body.slice(Math.max(body.length - 20))
    }
    res.send(body);
  });
});

app.get('/rest/servo/flag', function(req, res) {
  request({
      uri: GATEWAY+"/mailbox/flag/",
      method: "GET",
      timeout: 1000
  }, function(error, response, body) {
    if (err || !body) {
      res.send();
      return;
    }
    res.send({flag:body});
  });
});

  app.get('/rest/servo/flag', function(req, res) {
    var data = req.body;
    request({
        uri: GATEWAY+"/mailbox/flag/",
        method: "PUT",
        timeout: 1000,
        data:data
    }, function(error, response, body) {
    });
    res.send();
});

var server = app.listen(8080, function() {
    console.log('Example app listening on port 8080!')
})

module.exports = server;
