summitApp.controller('HomeCtrl', function($scope,$rootScope,SensorService) {
    $rootScope.pageTitle = 'Home, sweet home..'
    $scope.labels = angular.copy(SensorService.xAxis);
    $scope.data = angular.copy(SensorService.yAxis);
    $scope.series = angular.copy(SensorService.series);

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
var luftG = document.getElementById('luftgauge'); // your canvas element
var luftgauge = new Gauge(luftG).setOptions(opts); // create sexy gauge!
luftgauge.maxValue = 3000; // set max gauge value
luftgauge.animationSpeed = 32; // set animation speed (32 is default value)
luftgauge.set(1250); // set actual value

var tempG = document.getElementById('tempgauge'); // your canvas element
var tempgauge = new Gauge(tempG).setOptions(opts); // create sexy gauge!
tempgauge.maxValue = 3000; // set max gauge value
tempgauge.animationSpeed = 32; // set animation speed (32 is default value)
tempgauge.set(1250); // set actual value

var lichtG = document.getElementById('lichtgauge'); // your canvas element
var lichtgauge = new Gauge(lichtG).setOptions(opts); // create sexy gauge!
lichtgauge.maxValue = 3000; // set max gauge value
lichtgauge.animationSpeed = 32; // set animation speed (32 is default value)
lichtgauge.set(1250); // set actual value

});
