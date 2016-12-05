summitApp.controller('SensorCtrl', function($scope, $rootScope, Restangular, $interval,SensorService) {
    $rootScope.pageTitle = 'Sensor';
    var stop;
    var MAX_DATASETS = 50;
    var dateFormatter = function(timestamp) {
        var t = new Date(timestamp);
        var hh = t.getHours();
        var mm = t.getMinutes();
        var ss = t.getSeconds();

    $scope.labels = SensorService.xAxis;
    $scope.data2 = [SensorService.yAxis[1]];
    $scope.series2 = [SensorService.series[1]];


    $scope.labels = SensorService.xAxis;
    $scope.data1 = [SensorService.yAxis[0]];
    $scope.series1 = [SensorService.series[0]];


    $scope.labels = SensorService.xAxis;
    $scope.data3 = [SensorService.yAxis[2]];
    $scope.series3 = [SensorService.series[2]];

    $scope.onClick = function(points, evt) {
        console.log(points, evt);
    };
});
