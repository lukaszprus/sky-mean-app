'use strict';

angular.module('skyMeanAppApp.controllers', ['skyMeanAppApp.services'])
  .controller('MainController', ['$scope', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  }])
  .controller('SignInFormController', ['$scope', 'Session', 'AlertMessagesService', function ($scope, Session, AlertMessagesService) {
    $scope.word = /^\s*\w*\s*$/;
    $scope.loginAttempts = [];
    $scope.user = {
      username: '',
      password: ''
    };

    $scope.submit = function () {
      $scope.loginAttempts.push(angular.copy($scope.user));

      Session.start($scope.user, function (message) {
        AlertMessagesService.push({
          type: 'success',
          message: message
        });
      }, function (message) {
        AlertMessagesService.push({
          type: 'danger',
          message: message
        });

        $scope.user.username = '';
        $scope.user.password = '';
        $scope.signInForm.$setPristine();

      });

    };

  }])
  .controller('RestrictedContentController', ['$scope', '$http', 'AlertMessagesService', function ($scope, $http, AlertMessagesService) {

    $http.get('http://localhost:3000/restricted-content')
      .success(function (content) {
        $scope.content = content;
      })
      .error(function (message) {
        AlertMessagesService.push({
          type: 'danger',
          message: message
        });
      });

  }])
  .controller('AlertMessagesController', ['$scope', 'AlertMessagesService',
    function ($scope, AlertMessagesService) {
      $scope.alerts = AlertMessagesService.alerts;
      $scope.dismiss = function (alert) {
        AlertMessagesService.delete(alert);
      };
    }
  ])
  .controller('MenuController', ['$scope', '$location', 'Session', 'AlertMessagesService',
    function ($scope, $location, Session, AlertMessagesService) {

      $scope.signOut = function () {
        Session.destroy(function (message) {
          AlertMessagesService.push({
            type: 'success',
            message: message
          });
          $location.path('/sign-in');
        }, function (message) {
          AlertMessagesService.push({
            type: 'danger',
            message: message
          });
        });
      };
    }
  ]);


/*var injector = angular.injector(['ng', 'skyMeanAppApp']);

injector.invoke(function(Session) {
  Session.start({username: 'bbgrfs', password: 'bbgrfs'}, function() {
    console.log('success');
  }, function() {
    console.log('error');
  });
});

injector.invoke(function(Session) {
  Session.destroy(function() {
    console.log('success');
  }, function() {
    console.log('error');
  });
});*/
