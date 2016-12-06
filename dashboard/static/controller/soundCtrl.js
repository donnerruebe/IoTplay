summitApp.controller('SoundCtrl', function($scope,UserService,$rootScope,$http,BASE_URL) {

    $rootScope.pageTitle = 'Sound';

    var promise = UserService.getPermission();
    promise.then(function (succ) {
      $scope.isAllowed = succ.permission.sound;
    }, function () {
      console.log("No response from the server");
    });
    $scope.play = function(){
      $http.get(BASE_URL+'/play').then(function(result) {
        console.log('done');
      });
    };

    $scope.stop = function(){
      $http.get(BASE_URL+'/stop').then(function(result) {
        console.log('done');
      });
    };
});
