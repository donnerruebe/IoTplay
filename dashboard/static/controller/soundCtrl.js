summitApp.controller('SoundCtrl', function($scope,UserService,$rootScope,$http,BASE_URL) {

    $rootScope.pageTitle = 'Sound';

    var promise = UserService.getPermission();
    promise.then(function (succ) {
      $scope.isAllowed = succ.permission.sound;
    }, function () {
      console.log("No response from the server");
    });
    $scope.play = function(value){
      if(value == undefined || !(Number.isInteger(value)) || !(value <= 3 && value >=0  ) ){
        return;
      }
      $http.get(BASE_URL+'/play/'+value).then(function(result) {
        console.log('done');
      });
    };

    $scope.stop = function(){
      $http.get(BASE_URL+'/stop').then(function(result) {
        console.log('done');
      });
    };
});
