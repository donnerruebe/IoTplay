summitApp.controller('HomeCtrl', function($scope,$rootScope,UserService,SensorService,$interval,UserService) {
    $rootScope.pageTitle = 'Home, sweet home..'

    var opts = {
      lines: 12, // The number of lines to draw
      angle: 0.15, // The length of each line
      lineWidth: 0.44, // The line thickness
      pointer: {
        length: 0.9, // The radius of the inner circle
        strokeWidth: 0.035, // The rotation offset
        color: '#000000' // Fill color
      },
      limitMax: 'false',   // If true, the pointer will not go past the end of the gauge
      colorStart: '#6FADCF',   // Colors
      colorStop: '#8FC0DA',    // just experiment with them
      strokeColor: '#E0E0E0',   // to see which ones work best for you
      generateGradient: true
};

var promise = UserService.getPermission();
promise.then(function(success) {
  $scope.permission = success.permission;
}, function(err) {
  console.log(err);
});

var luftG = document.getElementById('luftgauge'); // your canvas element
$scope.luftgauge = new Gauge(luftG).setOptions(opts); // create sexy gauge!
$scope.luftgauge.maxValue = 100; // set max gauge value
$scope.luftgauge.animationSpeed = 1; // set animation speed (32 is default value)
$scope.luftgauge.set(SensorService.lastFeucht); // set actual value

var tempG = document.getElementById('tempgauge'); // your canvas element
$scope.tempgauge = new Gauge(tempG).setOptions(opts); // create sexy gauge!
$scope.tempgauge.maxValue = 60; // set max gauge value
$scope.tempgauge.animationSpeed = 1; // set animation speed (32 is default value)
$scope.tempgauge.set(SensorService.lastTemp); // set actual value

var lichtG = document.getElementById('lichtgauge'); // your canvas element
$scope.lichtgauge = new Gauge(lichtG).setOptions(opts); // create sexy gauge!
$scope.lichtgauge.maxValue = 1000; // set max gauge value
$scope.lichtgauge.animationSpeed = 1; // set animation speed (32 is default value)
$scope.lichtgauge.set(SensorService.lastLicht); // set actual value


$scope.labels = SensorService.xAxis;
$scope.data = SensorService.yAxis;
$scope.series = SensorService.series;

$scope.refreshData = function () {
  $scope.lichtLatest = SensorService.lastLicht;
  $scope.feuchtLatest = SensorService.lastFeucht;
  $scope.tempLatest = SensorService.lastTemp;
  $scope.lichtgauge.set(SensorService.lastLicht); // set actual value
  $scope.luftgauge.set(SensorService.lastFeucht); // set actual value
  $scope.tempgauge.set(SensorService.lastTemp); // set actual value
}

$scope.startIntervall = function() {
    if (angular.isDefined($scope.dataInterval)) return;
    $scope.dataInterval = $interval(function() {
        $scope.refreshData();
    }, 1000);
}

$scope.stopRefresh = function() {
    if (angular.isDefined($scope.dataInterval)) {
        $interval.cancel($scope.dataInterval);
        $scope.dataInterval = undefined;
    }
};
$scope.startIntervall();
});
