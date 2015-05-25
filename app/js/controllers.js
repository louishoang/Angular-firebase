'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
  .controller('LandingPageController', [function() {

  }])
  .controller('WaitListController',
               ['$scope', 'partyService',
                'sendTextMessageService',
                 function($scope, partyService,
                           sendTextMessageService) {

    $scope.parties = partyService.parties; // Bind parties from partyService

    $scope.newParty = {name: '', phone: '', size: '', done: false, notified: "No"};  // similar to new action rails where we initialize an instance

    $scope.saveParty = function(){               //similar to create action in rails
      partyService.saveParty($scope.newParty);  // Add data to fire base using .$add
      $scope.newParty = {name: '', phone: '', size: '', done: false, notified: "No"};
    };

    // send message start
    $scope.sendTextMessage = function(party){
      var newTextMessage = {
        phoneNumber: party.phone,
        size: party.size,
        name: party.name
      };

      sendTextMessageService.saveTextMessage(newTextMessage);
      // Change notified status
      party.notified = "Yes";
      $scope.parties.$save(party.$id);
    };
  }])
  .controller('AuthController',
               ['$scope', 'authService',
                function($scope, authService){

    $scope.user = {email: '', password: ''};

    $scope.register = function(){
      authService.register($scope.user);
    };

    $scope.login = function(){
      authService.login($scope.user);
    };

    $scope.logout = function(){
      authService.logout();
    };
  }]);
