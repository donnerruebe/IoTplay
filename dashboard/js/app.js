<<<<<<< HEAD
var summitApp = angular.module('summitApp',['ngRoute']);
<<<<<<< .merge_file_a10844
=======
=======
var summitApp = angular.module('summitApp',['ngRoute','restangular','chart.js']);
>>>>>>> afcd1756d7ba3ceffe5adb242b963e234f16877a

summitApp.config(function($routeProvider, $locationProvider) {
  $routeProvider.when('/KEKSE', {
    templateUrl: 'view/about.html',
    controller: 'AboutCtrl'
  })
  .when('/LED', {
    templateUrl: 'view/led.html',
    controller: 'LedCtrl'
  })
  .when('/SERVO', {
    templateUrl: 'view/servo.html',
    controller: 'ServoCtrl'
  })
  .when('/MESSAGE', {
    templateUrl: 'view/message.html',
    controller: 'MessageCtrl'
  })
  .when('/SOUND', {
    templateUrl: 'view/sound.html',
    controller: 'SoundCtrl'
  })
  .when('/SENSOR', {
    templateUrl: 'view/sensor.html',
    controller: 'SensorCtrl'
  })
  .otherwise({
    controller: 'HomeCtrl',
    templateUrl: 'view/home.html'
  });
  $locationProvider.html5Mode(true);
});
<<<<<<< HEAD
>>>>>>> .merge_file_a10984
=======

summitApp.config(['ChartJsProvider', function (ChartJsProvider) {
    // Configure all charts
    ChartJsProvider.setOptions({
      chartColors: ['#007BB6', '#017CB7'],
      responsive: true
    });
    // Configure all line charts
    ChartJsProvider.setOptions('line', {
      showLines: true
    });
  }]);

summitApp.config(function(RestangularProvider) {
      RestangularProvider.setBaseUrl(
          'http://localhost:4567');
          // Note that we run everything on the localhost
  });
>>>>>>> afcd1756d7ba3ceffe5adb242b963e234f16877a
