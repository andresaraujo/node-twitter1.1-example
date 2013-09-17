'use strict';

angular.module('NgAppApp', ['services.twitter'])
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/', {
            templateUrl: 'views/main.html',
            controller: 'MainCtrl'
        })
      .otherwise({
            redirectTo: '/'
        });
}]);
