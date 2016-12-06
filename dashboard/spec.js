var request = require('supertest');

describe('loading express', function () {

  var server;
  beforeEach(function () {
    server = require('./apiserver');
  });

  afterEach(function () {
    server.close();
  });

  //Site respond Test. Just in case something goes wrong.

  it('responds to /', function testSlash(done) {
  request(server)
    .get('/')
    .expect(200, done);
  });

  it('responds to /#/SENSOR', function testSlash(done) {
  request(server)
    .get('/#/SENSOR')
    .expect(200, done);
  });

  it('responds to /#/SERVO', function testSlash(done) {
  request(server)
    .get('/#/SERVO')
    .expect(200, done);
  });

  it('responds to /#/HOME', function testSlash(done) {
  request(server)
    .get('/#/HOME')
    .expect(200, done);
  });

  it('responds to /#/MESSSAGE', function testSlash(done) {
  request(server)
    .get('/#/MESSSAGE')
    .expect(200, done);
  });

  it('responds to /#/KEKSE', function testSlash(done) {
  request(server)
    .get('/#/KEKSE')
    .expect(200, done);
  });

  it('responds to /#/SOUND', function testSlash(done) {
  request(server)
    .get('/#/SOUND')
    .expect(200, done);
  });

  it('404 everything else', function testPath(done) {
    request(server)
      .get('/foo/bar')
      .expect(404, done);
  });

//End of Site request Test

//Begin API Server test

it('responds to /talk/folie/:msg', function testSlash(done) {
  var message = 'hi';
request(server)
  .get('/talk/folie/'+message)
  .expect(200, done);
});

it('responds to /rest/data/', function testSlash(done) {
  var message = 'hi';
request(server)
  .get('/rest/data/')
  .expect(200, done);
});

it('responds to /rest/data/latest', function testSlash(done) {
  var message = 'hi';
request(server)
  .get('/rest/data/latest')
  .expect(200, done);
});

it('responds to /rest/led/rgb', function testSlash(done) {
  var message = 'hi';
request(server)
  .post('/rest/led/rgb')
  .expect(200, done);
});

it('responds to /rest/led/switch', function testSlash(done) {
  var message = 'hi';
request(server)
  .post('/rest/led/switch')
  .expect(200, done);
});

});
