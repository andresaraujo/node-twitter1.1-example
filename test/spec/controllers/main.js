'use strict';

describe('Controller: MainCtrl', function () {
  var MainCtrl;
  var scope;
  var fakeFactory, q, deferred;
  var mockService;
  //mock Application to allow us to inject our own dependencies
  beforeEach(module('NgAppApp'));

  beforeEach(function () {
          mockService = {
              search: function () {
                  deferred = q.defer();
                  // Place the fake return object here
                  deferred.resolve([{
                    "id": 10101010101011,
                    "text": "Fake twit",
                    "screen_name": "amarokaz"
                  }]);
                  return deferred.promise;
              },
              isAuth: function () {
                  deferred = q.defer();
                  // Place the fake return object here
                  var result={};
                  result.err="Verification failed";
                  deferred.resolve(result);
                  return deferred.promise;
              }

          };
          spyOn(mockService, 'search').andCallThrough();
          spyOn(mockService, 'isAuth').andCallThrough();
      });

  // Initialize the controller
  beforeEach(inject(function ($controller, $rootScope, $q) {

    //create an empty scope
    scope = $rootScope.$new();

    q = $q;

    //Declare controller with mock objects
    MainCtrl = $controller('MainCtrl', {
      $scope: scope,
      TwitterSvc: mockService
    });
  }));

  it('Array twits Should have be defined and have zero objects', function () {
        // Before $apply is called the promise hasn't resolved
        expect(scope.twits).toBeDefined();
        expect(scope.twits.length).toBe(0);
  });
  it('Array twits Should have be defined and have one objects', function () {
        // This propagates the changes to the models
        // This happens itself when you're on a web page, but not in a unit test framework
        scope.searchTwits();
        scope.$apply();
        expect(scope.twits).toBeDefined();
        expect(scope.twits.length).toBe(1);
  });

});
