fragenApp.controller('MainCtrl', function ($scope,$rootScope,$http,BASE_URL) {
  $rootScope.pageTitle = "Stell uns deine Frage";

  $scope.hasData = false;
  $scope.messages = [];

  $scope.sendMessage = function() {
      if((!$scope.mailboxTextArea) || !$scope.mailboxEmail || !$scope.mailboxSubject) return;
      var message = {
        sender:$scope.mailboxEmail,
        subject:$scope.mailboxSubject,
        message:$scope.mailboxTextArea,
        timestamp:Date.now()
      }
      $http.post(BASE_URL+'/message', message).then(function(result) {
        console.log('done');
        $scope.mailboxEmail = "";
        $scope.mailboxTextArea = "";
        $scope.mailboxSubject = "";

        $scope.updateMessages();
      });
    }
    $scope.updateMessages = function() {
      $http.get(BASE_URL+'/message').then(function(result) {
        var data = result.data;
        if(Array.isArray(data) &&  data.length>0){
          $scope.hasData = true;
          $scope.messages = data;

        }
      });
    }

    $scope.updateMessages();

});
