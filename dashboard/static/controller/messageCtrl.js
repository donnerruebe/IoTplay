summitApp.controller('MessageCtrl', function($scope,UserService,$rootScope,$http,BASE_URL) {

    $rootScope.pageTitle = 'MESSAGE BOARD';
    $scope.messageTextArea = '';
    var promise = UserService.getPermission();
    promise.then(function (succ) {
      $scope.isAllowed = succ.permission.message;
    }, function () {
      console.log("No response from the server");
    });
    $scope.sendMessage = function() {
      if(!$scope.messageTextArea) return;
      var message = {
        text:$scope.messageTextArea
      }
      $http.post(BASE_URL+'/message',message).then(function(result) {
        console.log('done');
        $scope.messageTextArea = '';
      });
    }
});
