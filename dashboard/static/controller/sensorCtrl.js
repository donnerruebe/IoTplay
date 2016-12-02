summitApp.controller('SensorCtrl', function($scope, $rootScope, $interval, SensorService) {
    $rootScope.pageTitle = 'Sensor';

    $scope.labels = SensorService.xAxis;
    $scope.data = SensorService.yAxis;
    $scope.series = SensorService.series;
    $scope.onClick = function(points, evt) {
        console.log(points, evt);
    };
    /*
    $scope.$on('$destroy', function() {
        // Make sure that the interval is destroyed too
        $scope.stopRefresh();
    });*/
});
