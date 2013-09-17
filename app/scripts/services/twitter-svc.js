'use strict';
//Declare twitter service resource
angular.module('services.twitter', []);

angular.module('services.twitter').factory('TwitterSvc', ['$http', function ($http){
    var service={
        search:
        function(data){
            var params=data||{};
            var promise = $http.get('/api/search', {params: params}).then(function(response) {
                console.log(response);
                return response.data;
            });
            return promise;
        },
        isAuth:
        function(){
            var params={};
            var promise = $http.get('/api/auth', {params: params}).then(function(response) {
                console.log(response);
                return response.data;
            });
            return promise;
        }

    };
    return service;
}]);

