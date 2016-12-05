summitApp.controller('SensorCtrl', function($scope, $rootScope, Restangular, $interval) {
    $rootScope.pageTitle = 'Sensor';
    var stop;
    var MAX_DATASETS = 50;
    var dateFormatter = function(timestamp) {
        var t = new Date(timestamp);
        var hh = t.getHours();
        var mm = t.getMinutes();
        var ss = t.getSeconds();

<<<<<<< HEAD
        hh = hh < 10 ? "0" + hh : hh;
        mm = mm < 10 ? "0" + mm : mm;
        ss = ss < 10 ? "0" + ss : ss;
        return hh + ":" + mm + ":" + ss;
    }

    $scope.refreshData = function() {
        Restangular.one("data").one("latest").get().then(function(res) {
          var time = dateFormatter(res.time);
            //if(time.slice(-1) != "0"){time="";}// zeigt nur volle 10 Sekunden labels

            if(res.infos.temp && res.infos.humid && res.infos.light && time){

              $scope.labels.push(time);
              $scope.data[0].push(res.infos.temp);
              $scope.data[1].push(res.infos.humid);
              $scope.data[2].push(res.infos.light);

              if ($scope.labels.length > MAX_DATASETS) {
                $scope.labels.shift();
                $scope.data[0].shift();
                $scope.data[1].shift();
                $scope.data[2].shift();
              }
            }


        });

    }
    $scope.initData = function() {
        Restangular.all('data').getList().then(function(result) {
            //$scope.tasks = result;
            var labels = [];
            var yAxisData = [];
            var tempArr = [];
            var feuchtArr = [];
            var lichtArr = [];
            var i=0;
            while (i<result.length){
                var item = result[i];
                var time = dateFormatter(item.time);
                //if(time.slice(-1) != "0"){time="";}// zeigt nur volle 10 Sekunden labels
                labels.push(time);
                tempArr.push(item.infos.temp);
                feuchtArr.push(item.infos.humid);
                lichtArr.push(item.infos.light);
                i++;
            }


            yAxisData[0]=(tempArr);
            yAxisData[1]=(feuchtArr);
            yAxisData[2]=(lichtArr);
            if (labels.length == 0) {
              labels = [0];
              yAxisData = [[0],[0],[0]]
            }
            $scope.labels = labels;
            $scope.data = yAxisData;
        });
    }
    $scope.initData();
    $scope.startIntervall = function() {
        if (angular.isDefined(stop)) return;
        stop = $interval(function() {
            $scope.refreshData();
        }, 1000);
    }
    $scope.stopRefresh = function() {
        if (angular.isDefined(stop)) {
            $interval.cancel(stop);
            stop = undefined;
        }
    };
    $scope.series = ['Temperatur', 'Luftfeuchtigkeit', 'Lichtstärke'];
=======
    $scope.labels = SensorService.xAxis;
    $scope.data2 = [SensorService.yAxis[1]];
    $scope.series2 = [SensorService.series[1]];


    $scope.labels = SensorService.xAxis;
    $scope.data1 = [SensorService.yAxis[0]];
    $scope.series1 = [SensorService.series[0]];


    $scope.labels = SensorService.xAxis;
    $scope.data3 = [SensorService.yAxis[2]];
    $scope.series3 = [SensorService.series[2]];
>>>>>>> 3c2be1381be9ee494292c8a880c98fa8a5a28902
    $scope.onClick = function(points, evt) {
        console.log(points, evt);
    };
    $scope.startIntervall();
    $scope.$on('$destroy', function() {
        // Make sure that the interval is destroyed too
        $scope.stopRefresh();
    });
});
