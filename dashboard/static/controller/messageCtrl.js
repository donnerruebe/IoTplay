summitApp.controller('MessageCtrl', function($scope,$rootScope,Restangular) {

    $rootScope.pageTitle = 'MESSAGE BOARD';
    $scope.messageTextArea = '';

    $scope.sendMessage = function() {
      if(!$scope.messageTextArea) return;
      var message = {
        'text':$scope.messageTextArea
      }
      Restangular.all('message').post(message).then(function(result) {
        console.log('done');
        $scope.messageTextArea = '';
      });
    }
});
