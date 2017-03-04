angular.module('shortly.links', [])

.controller('LinksController', function ($scope, Links, Auth, $location) {
  $scope.data = {};

  Links.getAll().then(function(links) {
    if (!Auth.isAuth()) {
      $location.path('signin');
    }

    $scope.data.links = links;
  });
});
