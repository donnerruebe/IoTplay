summitApp.controller('ServoCtrl', function($scope,UserService,$rootScope,$http,BASE_URL) {

    $rootScope.pageTitle = 'MAILBOX'

    $scope.mailboxTextArea = '';
    var promise = UserService.getPermission();
    promise.then(function (succ) {
      $scope.isAllowed = succ.permission.servo;
    }, function () {
      console.log("No response from the server");
    });
    $scope.sendMessage = function() {
      if(!$scope.mailboxTextArea) return;
      var message = {
        'name':$scope.mailboxName,
        'text':$scope.mailboxTextArea
      }
      $http.post(BASE_URL+'/servo', message).then(function(result) {
        console.log('done');
        $scope.mailboxTextArea = '';
      });
    }
});
