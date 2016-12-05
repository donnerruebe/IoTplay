summitApp.controller('MessageCtrl', function($scope,$rootScope,$http,BASE_URL) {

    $rootScope.pageTitle = 'MESSAGE BOARD';
    $scope.messageTextArea = '';

    $scope.sendMessage = function() {
      if(!$scope.messageTextArea) return;
      var message = {
        'text':$scope.messageTextArea
      }
      $http.post(BASE_URL+'/message',message).then(function(result) {
        console.log('done');
        $scope.messageTextArea = '';
      });
    }
});
