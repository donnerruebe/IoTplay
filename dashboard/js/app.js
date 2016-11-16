var summitApp = angular.module('summitApp',['ngRoute']);

summitApp.config(function($routeProvider) {
  $routeProvider.when('/about', {
    controller: 'DefCtrl',
    templateUrl:'view/about.html'
  })
});
