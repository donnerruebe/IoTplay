summitApp.controller('SoundCtrl', function($scope,UserService,$rootScope,$http,BASE_URL,$timeout) {

    $rootScope.pageTitle = 'Sound';

    $scope.buttonSongs = [
  "AlecEmpire.mp3",
  "FaunFederkleid.mp3",
  "GladiatorTheme.mp3",
  "InExtremo.mp3"
];

 $scope.allSongs = [];

    var promise = UserService.getPermission();
    promise.then(function (succ) {
      $scope.isAllowed = succ.permission.sound;
    }, function () {
      console.log("No response from the server");
    });

    $scope.play = function(value){
      if(value == undefined || !(Number.isInteger(value)) || !(value <= 4 && value >=0  ) ){
        return;
      }
      var songname;
      if (value > 3) {
        if($scope.select == undefined){
        return;
        }
        songname = $scope.select;

      } else {
        songname = $scope.buttonSongs[value];
      }
      console.log(songname);
      $http.post(BASE_URL+'/play/',{titel:songname}).then(function(result) {
        console.log('done');
      });
    };

    $scope.stop = function(){
      $http.get(BASE_URL+'/stop').then(function(result) {
        console.log('done');
      });
    };

    $scope.updateDropdown = function() {
      console.log("Hi");
      $http.get(BASE_URL+'/play/list').then(function(result) {
        console.log(result.data);
        $scope.allSongs = result.data;
      });
    }

    $timeout(function () {
        $('select').material_select();
    });

    $scope.updateDropdown();
});
