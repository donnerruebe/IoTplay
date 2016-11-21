// We need this to build our post string
var querystring = require('querystring');
var http = require('http');

const TEMP_MIN = 12;
const TEMP_MAX = 33;
const FEUCHT_MIN = 0;
const FEUCHT_MAX = 101;
const LICHT_MIN = 50;
const LICHT_MAX = 110;
var n = 0;

function postData() {
  // Build the post string from an object
  var post_data = querystring.stringify({
      'temp': Math.floor(Math.random() * (TEMP_MAX - TEMP_MIN)) + TEMP_MIN,
      'feucht': Math.floor(Math.random() * (FEUCHT_MAX - FEUCHT_MIN)) + FEUCHT_MIN,
      'licht': Math.floor(Math.random() * (LICHT_MAX - LICHT_MIN)) + LICHT_MIN
  });

  // An object of options to indicate where to post to
  var post_options = {
      host: 'localhost',
      port: '4567',
      path: '/data',
      method: 'POST',
      headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Content-Length': Buffer.byteLength(post_data)
      }
  };

  // Set up the request
  var post_req = http.request(post_options, function(res) {
      res.setEncoding('utf8');
      res.on('data', function (chunk) {
          console.log('Response: ' + chunk);
      });
  });

  // post the data
  post_req.write(post_data);
  post_req.end();

  n++;
  console.log("Posted "+n+" times");
}


setInterval(postData,100);
