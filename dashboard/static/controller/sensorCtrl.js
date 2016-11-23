summitApp.controller('SensorCtrl', function($scope, $rootScope, Restangular, $interval) {
    $rootScope.pageTitle = 'Sensor';
    var stop;
    var dateFormatter = function(timestamp) {
        var t = new Date(timestamp);
        var hh = t.getHours();
        var mm = t.getMinutes();
        var ss = t.getSeconds();

        hh = hh < 10 ? "0" + hh : hh;
        mm = mm < 10 ? "0" + mm : mm;
        ss = ss < 10 ? "0" + ss : ss;
        return hh + ":" + mm + ":" + ss;
    }

    $scope.refreshData = function() {
        Restangular.one("data").one("latest").get().then(function(res) {
          var time = dateFormatter(res.time);
            if(time.slice(-1) != "0"){time="";}// zeigt nur volle 10 Sekunden labels
            $scope.labels.push(time);
            $scope.data[0].push(res.infos.temp);
            $scope.data[1].push(res.infos.feucht);
            $scope.data[2].push(res.infos.licht);

            $scope.labels.shift();
            $scope.data[0].shift();
            $scope.data[1].shift();
            $scope.data[2].shift();

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
                if(time.slice(-1) != "0"){time="";}// zeigt nur volle 10 Sekunden labels
                labels.push(time);
                tempArr.push(item.infos.temp);
                feuchtArr.push(item.infos.feucht);
                lichtArr.push(item.infos.licht);
                i++;
            }


            yAxisData[0]=(tempArr);
            yAxisData[1]=(feuchtArr);
            yAxisData[2]=(lichtArr);
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
    $scope.onClick = function(points, evt) {
        console.log(points, evt);
    };
    $scope.startIntervall();
    $scope.$on('$destroy', function() {
        // Make sure that the interval is destroyed too
        $scope.stopRefresh();
    });
});
