var express = require('express');
var bodyParser = require('body-parser');
var request = require("request");
var app = express()

app.use(express.static('static'));
app.use("/folien",express.static('../doc/reveal'));
app.use(bodyParser.json());

app.get('/', function(req, res) {
    res.send('Hello World!')
})

app.get('/talk/folie/:msg', function(req, res) {
  console.log(req.params);
  res.send(req.params);
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
    console.log(req.body);
    var c = req.body
    request({
        uri: "http://127.0.0.1:4567/ledCube/color",
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

app.post('/rest/led/switch', function(req, res) {
    console.log(req.body);
    var state = req.body.state;
    request({
        uri: "http://127.0.0.1:4567/ledCube/switch",
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
})


app.listen(8080, function() {
    console.log('Example app listening on port 8080!')
})
