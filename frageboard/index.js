var express = require('express');
var bodyParser = require('body-parser');
var request = require("request");
var app = express();

const GATEWAY = "http://127.0.0.1:4567";

app.use("/fragen",express.static('static'));
app.use(bodyParser.json());

app.post('/rest/message', function(req,res) {
  var data = req.body;
  request({
      uri: GATEWAY+"/mailbox/question/",
      method: "PUT",
      timeout: 1000,
      json: data
  }, function(error, response, body) {

  });
  res.send();
});

app.get('/rest/message', function(req,res) {
  request({
      uri: GATEWAY+"/mailbox/mails/",
      method: "GET",
      timeout: 1000
  }, function(error, response, body) {
    if (error || !body) {
      res.send();
    return;
    }

    if (body.length>20){
      body = body.slice(Math.max(body.length - 20))
    }
    res.send(body);
  });
});

app.get('/rest/message/flag', function(req, res) {
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
})



var server = app.listen(80, function() {
    console.log('Example app listening on port 80!')
})

module.exports = server;
