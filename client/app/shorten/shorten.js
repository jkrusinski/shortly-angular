angular.module('shortly.shorten', [])

.controller('ShortenController', function ($scope, $location, Links, Auth) {
  if (!Auth.isAuth()) {
    $location.path('signin');
  }

  $scope.link = {url: ''};
  $scope.loading = false;
  $scope.inputWarning = 'clean';
  $scope.validUrl = false;
  $scope.showWarning = false;

  $scope.signout = Auth.signout;

  var urlClean = function(bool) {
    $scope.inputWarning = bool ? 'clean' : 'error';
    $scope.showWarning = !bool;
  };

  $scope.addLink = function() {
    if ($scope.validUrl) {
      $scope.disabled = true;

      Links.addOne($scope.link).then(function() {
        $scope.link.url = '';
        $scope.disabled = false;
      });

    } else {
      urlClean(false);
    }
  };

  $scope.validate = function() {
    $scope.validUrl = !!$scope.link.url.match(/^(?!mailto:)(?:(?:https?|ftp):\/\/)?(?:\S+(?::\S*)?@)?(?:(?:(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[0-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))|localhost)(?::\d{2,5})?(?:\/[^\s]*)?$/i);
    urlClean($scope.validUrl || $scope.link.url === '');
  };


});
