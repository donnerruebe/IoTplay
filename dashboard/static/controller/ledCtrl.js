summitApp.controller('LedCtrl', function($scope, $rootScope,$http,BASE_URL) {

    $rootScope.pageTitle = 'CUBE'
    $scope.red = 0;
    $scope.green = 123;
    $scope.blue = 182;

    $scope.customStyle = {};

    var checkColor = function(color) {
        if ((!Number.isInteger(color)) || color > 255) {
            return 0;
        }
        if (color < 0) {
            return 255;
        }
        return color;
    }

    function hex2rgba_convert(hex) {
        hex = hex.replace('#', '');
        r = parseInt(hex.substring(0, 2), 16);
        g = parseInt(hex.substring(2, 4), 16);
        b = parseInt(hex.substring(4, 6), 16);

        result = {
            r: r,
            g: g,
            b: b,
        }
        return result;
    }
    $scope.$watch('color', function(newValue, oldValue) {
        if (newValue) {
            var rgb = hex2rgba_convert(newValue);
            $scope.red = rgb.r;
            $scope.green = rgb.g;
            $scope.blue = rgb.b;

            console.log(rgb);
            $scope.changeColor();
        }
    });

    $scope.changeColor = function() {
        var red = 0;
        var blue = 0;
        var green = 0;
        if ($scope.red) {
            red = checkColor($scope.red);
            $scope.red = red;
        }
        if ($scope.blue) {
            blue = checkColor($scope.blue);
            $scope.blue = blue;
        }
        if ($scope.green) {
            green = checkColor($scope.green);
            $scope.green = green;
        }
        $scope.customStyle.style = {
            "color": 'rgb(' + red + ',' + green + ',' + blue + ')'
        };
    };

    $scope.sendColor = function(led) {
        var message = {
            'red': checkColor($scope.red),
            'green': checkColor($scope.green),
            'blue': checkColor($scope.blue)
        }
        $http.post(BASE_URL+'/led/rgb', message).then(function(result) {
            console.log('done');
        });
    };



    $scope.changeColor();

});
