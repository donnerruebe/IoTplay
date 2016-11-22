summitApp.controller('SensorCtrl', function($scope,$rootScope,Restangular,$interval) {
    $rootScope.pageTitle = 'Sensor';
    var stop;
    $scope.refreshData = function(){
      Restangular.all('data').getList().then(function(result) {
        $scope.tasks = result;
        var xAxisData = [];
        var yAxisData = [];
        var tempArr = [];
        var feuchtArr = [];
        var lichtArr = [];
        var k = 0;
        while(k<result.length){
          var task = result[k]
          var date = new Date(task.time);
          var seconds = date.getSeconds();
          var minutes = date.getMinutes();
          var hours = date.getHours();
          if(seconds<10){
            seconds = "0"+seconds;
          }
          if(minutes<10){
            minutes = "0"+minutes;
          }
          if((k % 10) == 0){
            //xAxisData.push(hours+":"+minutes+":"+seconds);
          } else {
            //xAxisData.push('');
          }
          xAxisData.push(result.length-k);
          tempArr.push(task.infos.temp);
          feuchtArr.push(task.infos.feucht);
          lichtArr.push(task.infos.licht);
          k++;
        }
        yAxisData.push(tempArr);
        yAxisData.push(feuchtArr);
        yAxisData.push(lichtArr);

        $scope.labels = xAxisData;
        $scope.data = yAxisData;
    });
  }
  $scope.refreshData();
  $scope.startIntervall = function() {
    if ( angular.isDefined(stop) ) return;
    stop = $interval(function() {
      $scope.refreshData();
    }, 5000);
  }
  $scope.stopRefresh = function() {
          if (angular.isDefined(stop)) {
            $interval.cancel(stop);
            stop = undefined;
          }
  };
  $scope.series = ['Temperatur', 'Luftfeuchtigkeit','Lichtstärke'];
  $scope.onClick = function (points, evt) {
    console.log(points, evt);
  };
  $scope.startIntervall();
  $scope.$on('$destroy', function() {
            // Make sure that the interval is destroyed too
            $scope.stopRefresh();
  });
});
