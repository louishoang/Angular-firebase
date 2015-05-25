'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
  .controller('LandingPageController', [function() {

  }])
  .controller('WaitListController',
               ['$scope', 'partyService',
                 function($scope, partyService) {

    // Bind parties from partyService
    $scope.parties = partyService.parties;

    // similar to new action rails where we initialize an instance
    $scope.newParty = {name: '', phone: '', size: '', done: false, notified: "No"};

    //similar to create action in rails
    $scope.saveParty = function(){
      // Add data to fire base using .$add
      partyService.saveParty($scope.newParty);
      $scope.newParty = {name: '', phone: '', size: '', done: false, notified: "No"};
    };

    // send message start
    $scope.sendTextMessage = function(party){
      var textMessageRef = new Firebase(FIREBASE_URL + 'textMessages');
      var textMessages = $firebase(textMessageRef);
      var newTextMessage = {
        phoneNumber: party.phone,
        size: party.size,
        name: party.name
      };
      textMessages.$add(newTextMessage);

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
