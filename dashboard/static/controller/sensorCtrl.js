summitApp.controller('SensorCtrl', function($scope, $rootScope, $interval, SensorService) {
    $rootScope.pageTitle = 'Sensor';

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
    /*
    $scope.$on('$destroy', function() {
        // Make sure that the interval is destroyed too
        $scope.stopRefresh();
    });*/
});
