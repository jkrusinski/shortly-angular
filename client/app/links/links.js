angular.module('shortly.links', [])

.controller('LinksController', function ($scope, Links, Auth, $location) {
  if (!Auth.isAuth()) {
    $location.path('signin');
  }

  $scope.data = {};

  Links.getAll().then(function(links) {
    $scope.data.links = links;
  });

  $scope.signout = Auth.signout;
});
