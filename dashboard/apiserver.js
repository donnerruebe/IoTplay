var express = require('express')
var request = require("request");
var app = express()

app.use(express.static('static'))

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


app.listen(8080, function() {
    console.log('Example app listening on port 8080!')
})
