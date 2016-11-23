summitApp.controller('ServoCtrl', function($scope,$rootScope,Restangular) {

    $rootScope.pageTitle = 'MAILBOX'

    $scope.mailboxTextArea = '';

    $scope.sendMessage = function() {
      if(!$scope.mailboxTextArea) return;
      var message = {
        'name':$scope.mailboxName,
        'text':$scope.mailboxTextArea
      }
      Restangular.all('servo').post(message).then(function(result) {
        console.log('done');
        $scope.mailboxTextArea = '';
      });
    }
});
