'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
  .controller('LandingPageController', [function() {

  }])
  .controller('WaitListController',
               ['$scope', 'partyService',
                'sendTextMessageService',
                'authService',
                 function($scope, partyService,
                           sendTextMessageService, authService) {

    authService.getCurrentUser().then(function(user){
      if(user){
        $scope.parties = partyService.getPartiesByUserId(user.id);
      }
    });

    $scope.newParty = {name: '', phone: '', size: '', done: false, notified: "No"};  // similar to new action rails where we initialize an instance

    $scope.saveParty = function(){               //similar to create action in rails
      partyService.saveParty($scope.newParty, $scope.currentUser.id);  // Add data to fire base using .$add
      $scope.newParty = {name: '', phone: '', size: '', done: false, notified: "No"};
    };

    // send message start
    $scope.sendTextMessage = function(party){
      sendTextMessageService.saveTextMessage(party, $scope.currentUser.id);
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
