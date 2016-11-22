summitApp.controller('SoundCtrl', function($scope,$rootScope,Restangular) {

    $rootScope.pageTitle = 'Sound';

    $scope.play = function(){
      Restangular.all('play').getList().then(function(result) {
        console.log('done');
      });
    };

    $scope.stop = function(){
      Restangular.all('stop').getList().then(function(result) {
        console.log('done');
      });
    };
});
