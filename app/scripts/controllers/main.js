'use strict';

angular.module('NgAppApp')
  .controller('MainCtrl', ['$scope', '$window', 'TwitterSvc', function ($scope, $window, TwitterSvc) {
    $scope.twits = [];
    $scope.isAuth=false;
    $scope.query={
    	q:"#angularjs",
    };

    TwitterSvc.isAuth().then(function(data){
    	if(data.err){
    		$scope.isAuth=false;
    		//$window.location.href='/auth/twitter';
    	}else{
    		$scope.isAuth=true;
    	}
    });
    $scope.searchTwits= function(){
    	$scope.twits.length = 0;
    	TwitterSvc.search($scope.query).then(function(data){
	        angular.forEach(data, function(value, key){
	            $scope.twits.push(value);
	        });
	        
    	});
    };
}]);
