summitApp.controller('RightCtrl', function ($scope,$rootScope,UserService,$http,BASE_URL) {
  $rootScope.pageTitle = 'Rechte Verteilung';

  var promise = UserService;
  promise.then(function (succ) {
    $scope.isAllowed = succ.permission.changeRights;
  }, function () {
    console.log("No response from the server");
  })

    $http.get(BASE_URL+'/user/rights').then(function(res) {
      $scope.permission = res.data;
      console.log(res.data);
      console.log("Done");
    }, function() {
      console.log("Hm.. the server didn't respond :(");
    });

  $scope.sendData = function() {
    $http.post(BASE_URL+'/user/rights',$scope.permission).then(function(res) {
      console.log("Done");
    }, function() {
      console.log("Hm.. the server didn't respond :(");
    });
  }
});
