var summitApp = angular.module('summitApp',['ngRoute']);

summitApp.config(function($routeProvider, $locationProvider) {
  $routeProvider.when('/ABOUT', {
    templateUrl: 'view/about.html',
    controller: 'DefCtrl'
  })
  .when('/LED', {
    templateUrl: 'view/led.html',
    controller: 'DefCtrl'
  })
  .when('/SERVO', {
    templateUrl: 'view/servo.html',
    controller: 'DefCtrl'
  })
  .when('/MESSAGE', {
    templateUrl: 'view/message.html',
    controller: 'DefCtrl'
  })
  .when('/SOUND', {
    templateUrl: 'view/sound.html',
    controller: 'DefCtrl'
  })
  .otherwise({
    templateUrl: 'view/home.html'
  });
  $locationProvider.html5Mode(true);
});
