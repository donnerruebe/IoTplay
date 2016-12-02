
var summitApp = angular.module('summitApp',['ngRoute','chart.js','mp.colorPicker' ]);

summitApp.constant('BASE_URL','/rest');

summitApp.config(function($routeProvider, $locationProvider) {
  $routeProvider.when('/KEKSE', {
    templateUrl: 'view/about.html',
    controller: 'AboutCtrl'
  })
  .when('/LED', {
    templateUrl: 'view/led.html',
    controller: 'LedCtrl'
  })
  .when('/SERVO', {
    templateUrl: 'view/servo.html',
    controller: 'ServoCtrl'
  })
  .when('/MESSAGE', {
    templateUrl: 'view/message.html',
    controller: 'MessageCtrl'
  })
  .when('/SOUND', {
    templateUrl: 'view/sound.html',
    controller: 'SoundCtrl'
  })
  .when('/SENSOR', {
    templateUrl: 'view/sensor.html',
    controller: 'SensorCtrl'
  })
  .otherwise({
    controller: 'HomeCtrl',
    templateUrl: 'view/home.html'
  });
  //$locationProvider.html5Mode(true);
});

summitApp.config(['ChartJsProvider', function (ChartJsProvider) {
    // Configure all charts
    ChartJsProvider.setOptions({
      chartColors: ['#0024FF','#007BB6', '#00FcFF'],
      responsive: true,
      animation : false
    });
    // Configure all line charts
    ChartJsProvider.setOptions('line', {
      showLines: true
    });
    ChartJsProvider.setOptions('legend', {
      display:true
    });
  }]);

summitApp.factory('SensorService', function($interval,$http,BASE_URL){
  var sensorData = {};
  sensorData.xAxis = [0];
  sensorData.yAxis = [[0],[0],[0]];
  sensorData.MAX_DATASETS = 30;
  sensorData.series = ['Temperatur', 'Luftfeuchtigkeit', 'Lichtstärke'];

  sensorData.initSensorData = function() {
    $http.get(BASE_URL+'/data').then(function(res){
      var data = res.data;
      if(!data){
        return;
      }
      var k = 0;
      if(k<data.length){
        sensorData.xAxis = [];
        sensorData.yAxis = [[],[],[]];
      }
      while(k<data.length){
        var elem = data[k];
        var time = sensorData.dateFormatter(elem.time);
          //if(time.slice(-1) != "0"){time="";}// zeigt nur volle 10 Sekunden labels
          if(elem.infos.temp && elem.infos.feucht && elem.infos.licht && time){

            sensorData.xAxis.push(time);
            sensorData.yAxis[0].push(elem.infos.temp);
            sensorData.yAxis[1].push(elem.infos.feucht);
            sensorData.yAxis[2].push(elem.infos.licht);

            if (sensorData.xAxis.length > sensorData.MAX_DATASETS) {
              sensorData.xAxis.shift();
              sensorData.yAxis[0].shift();
              sensorData.yAxis[1].shift();
              sensorData.yAxis[2].shift();
            }
          }
        k++;
      }
    });
  }

  sensorData.initSensorData();

  sensorData.dateFormatter = function(timestamp) {
      var t = new Date(timestamp);
      var hh = t.getHours();
      var mm = t.getMinutes();
      var ss = t.getSeconds();

      hh = hh < 10 ? "0" + hh : hh;
      mm = mm < 10 ? "0" + mm : mm;
      ss = ss < 10 ? "0" + ss : ss;
      return hh + ":" + mm + ":" + ss;
  }


  sensorData.refreshData = function() {
    $http.get(BASE_URL+"/data/latest")
      .then(function(res) {
        res = res.data;
        var time = sensorData.dateFormatter(res.time);
          //if(time.slice(-1) != "0"){time="";}// zeigt nur volle 10 Sekunden labels

          console.log(res);
          if(res.infos.temp && res.infos.feucht && res.infos.licht && time){

            sensorData.xAxis.push(time);
            sensorData.yAxis[0].push(res.infos.temp);
            sensorData.yAxis[1].push(res.infos.feucht);
            sensorData.yAxis[2].push(res.infos.licht);

            if (sensorData.xAxis.length > sensorData.MAX_DATASETS) {
              sensorData.xAxis.shift();
              sensorData.yAxis[0].shift();
              sensorData.yAxis[1].shift();
              sensorData.yAxis[2].shift();
            }
          }


      });

  }

  sensorData.startIntervall = function() {
      if (angular.isDefined(this.dataInterval)) return;
      sensorData.dataInterval = $interval(function() {
          sensorData.refreshData();
      }, 1000);
  }

  sensorData.stopRefresh = function() {
      if (angular.isDefined(this.dataInterval)) {
          $interval.cancel(this.dataInterval);
          this.dataInterval = undefined;
      }
  };
  sensorData.startIntervall();
  return sensorData;
});
