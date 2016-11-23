var express = require('express');
var bodyParser = require('body-parser');
var request = require("request");
var app = express()

app.use(express.static('static'));
app.use(bodyParser.json());

app.get('/', function(req, res) {
    res.send('Hello World!')
})


app.get('/rest/data/', function(req, res) {
  request({
  uri: "http://127.0.0.1:4567/data",
  method: "GET",
  timeout: 1000,
}, function(error, response, body) {
  res.send(body);
  //console.log(body);
});
})

app.get('/rest/data/latest', function(req, res) {
  request({
  uri: "http://127.0.0.1:4567/data",
  method: "GET",
  timeout: 1000,
}, function(error, response, body) {
  var obj=JSON.parse(body);
  res.send(obj[obj.length-1]);
  //console.log(obj[obj.length-1]);
});
})

app.post('/rest/led/', function(req, res) {
  console.log(req.body);
  request({
  uri: "http://127.0.0.1:4567/ledCube/color",
  method: "PUT",
  timeout: 1000,
  formData:{r:1,g:2,b:3}
  }, function(error, response, body) {
  //var obj=JSON.parse(body);
  //console.log(obj[obj.length-1]);
});

res.send('ok');
})


app.listen(8080, function() {
    console.log('Example app listening on port 8080!')
})
