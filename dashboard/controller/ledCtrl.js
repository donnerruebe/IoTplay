summitApp.controller('LedCtrl', function($scope,$rootScope,Restangular) {

  $rootScope.pageTitle = 'CUBE1'
  $scope.red = 0;
  $scope.green = 123;
  $scope.blue = 182;

  $scope.customStyle = {};

  var checkColor = function(color){
    if(( ! Number.isInteger(color)) || color > 255){
      return 0;
    }
    if(color < 0){
      return 255;
    }
    return color;
  }

  $scope.changeColor = function (){
    var red = 0;
    var blue = 0;
    var green = 0;
    if($scope.red){
      red = checkColor($scope.red);
      $scope.red = red;
    }
    if($scope.blue){
      blue = checkColor($scope.blue);
      $scope.blue = blue;
    }
    if($scope.green){
      green = checkColor($scope.green);
      $scope.green = green;
    }
     $scope.customStyle.style = {"color":'rgb('+red+','+green+','+blue+')'};
  }

  $scope.sendColor = function (led){
    if((! Number.isInteger(led)) || led > 4 || led < 0){
      return;
    }
    var message= {
      'id':led,
      'red': checkColor($scope.red),
      'green': checkColor($scope.green),
      'blue': checkColor($scope.blue)
    }
    Restangular.all('led').post(message).then(function(result) {
      console.log('done');
    });
  }



  $scope.changeColor();

});
