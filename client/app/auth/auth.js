// do not tamper with this code in here, study it, but do not touch
// this Auth controller is responsible for our client side authentication
// in our signup/signin forms using the injected Auth service
angular.module('shortly.auth', [])

.controller('AuthController', function ($scope, $window, $location, Auth) {

  $scope.user = {username: '', password: ''};
  $scope.passCheck = '';
  $scope.messgae = '';
  $scope.showWarning = false;

  var warn = function(message) {
    if (!message) {
      $scope.message = '';
      $scope.showWarning = false;
    } else {
      $scope.message = message;
      $scope.showWarning = true;
    }
  };

  $scope.validateCreds = function () {
    if ($scope.user.username.length < 8 && !!$scope.user.username) {
      warn('Username must be at least 8 characters long.');
    } else if ($scope.user.password.length < 8 && !!$scope.user.password) {
      warn('Password must be at least 8 characters long.');
    } else if ($scope.user.password !== $scope.passCheck && !!$scope.passCheck) {
      warn('Passwords do not match.');
    } else {
      warn(false);
    }
  };

  $scope.signin = function () {

    Auth.signin($scope.user)
      .then(function (token) {
        $window.localStorage.setItem('com.shortly', token);
        $location.path('/links');
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  var signup = function(user) {

    Auth.signup(user)
      .then(function (token) {
        $window.localStorage.setItem('com.shortly', token);
        $location.path('/links');
      })
      .catch(function (error) {
        $scope.user = {username: '', password: ''};
        $scoep.passCheck = '';
        warn('There was an unexpected error.');
        console.error(error);
      });
  };

  $scope.validateSignup = function () {
    var validForm = !$scope.message
      && !!$scope.user.username
      && !!$scope.user.password
      && !!$scope.passCheck;

    if (validForm) {

      Auth.userExists($scope.user.username)
        .then(function(exists) {

          if (exists) {
            warn('Username already exists.');
          } else {
            warn(false);
            signup($scope.user);
          }
        });

    } else {
      warn('Please fill in all fields.');
    }
  };
});
