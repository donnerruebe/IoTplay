var express = require('express');
var low = require('lowdb')
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = low();
db.set('data',[]).value();

/**
* for application to get data
*/
app.get('/data', function (req, res) {
  var data = db.get('data').value();
  if(data.length > 100){
    data = data.slice(Math.max(data.length - 100, 1));
  }
  res.send(data);
});

/**
* For sensor to store data
*/
app.post('/data',function(req, res) {
  console.log(req.body);
  db.get('data').push(req.body).value();
  res.send();
});

app.listen(4567, function () {
  console.log('This app is listening on port 4567!');
});
