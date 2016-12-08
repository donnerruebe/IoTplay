summitApp.controller('ServoCtrl', function($scope,UserService,$rootScope,$http,BASE_URL) {

    $rootScope.pageTitle = 'MAILBOX'

    $scope.mailboxTextArea = '';
    var promise = UserService.getPermission();
    promise.then(function (succ) {
      $scope.isAllowed = succ.permission.servo;
    }, function () {
      console.log("No response from the server");
    });
    $scope.hasData = false;
  $scope.messages = [];

  $scope.sendMessage = function() {
      if((!$scope.mailboxTextArea) || !$scope.mailboxEmail || !$scope.mailboxSubject) return;
      var message = {
        sender:$scope.mailboxEmail,
        subject:$scope.mailboxSubject,
        text:$scope.mailboxTextArea,
        timestamp:Date.now()
      }
      $http.post(BASE_URL+'/servo', message).then(function(result) {
        console.log('done');
        $scope.mailboxEmail = "";
        $scope.mailboxTextArea = "";
        $scope.mailboxSubject = "";

        $scope.updateMessages();
      });
    }
    $scope.updateMessages = function() {
      $http.get(BASE_URL+'/servo').then(function(result) {
        var data = result.data;
        if(Array.isArray(data) &&  data.length>0){
          $scope.hasData = true;
          $scope.messages = data;

        }
      });
    }

    $scope.updateMessages();
});
