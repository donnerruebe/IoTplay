var summitApp = angular.module('summitApp',['ngRoute']);
<<<<<<< .merge_file_a10844
=======

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
>>>>>>> .merge_file_a10984
