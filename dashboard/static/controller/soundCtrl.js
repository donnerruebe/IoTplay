summitApp.controller('SoundCtrl', function($scope,$rootScope,$http,BASE_URL) {

    $rootScope.pageTitle = 'Sound';

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
