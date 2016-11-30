summitApp.controller('HomeCtrl', function($scope,$rootScope,SensorService) {
    $rootScope.pageTitle = 'Home, sweet home..'


    $scope.labels = angular.copy(SensorService.xAxis);
    $scope.data = angular.copy(SensorService.yAxis);
    $scope.series = angular.copy(SensorService.series);
});
