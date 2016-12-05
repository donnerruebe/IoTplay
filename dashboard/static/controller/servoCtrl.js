summitApp.controller('ServoCtrl', function($scope,$rootScope,$http,BASE_URL) {

    $rootScope.pageTitle = 'MAILBOX'

    $scope.mailboxTextArea = '';

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
