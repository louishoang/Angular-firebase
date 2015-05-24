'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
  .controller('LandingPageController', [function() {

  }])
  .controller('WaitListController',
               ['$scope', '$firebase',
                 function($scope, $firebase) {

    // Etablish connection to firebase server
    var partiesRef = new Firebase('https://waitandeat-louishoan.firebaseio.com/parties');

    // Get data from firebase SERVICE;
    // This will print out a collection of data from database,
    // similar to index action on rails
    $scope.parties = $firebase(partiesRef);

    // similar to new action rails where we initialize an instance
    $scope.newParty = {name: '', phone: '', size: '', done: false, notified: "No"};

    //similar to create action in rails
    $scope.saveParty = function(){
      // Add data to fire base using .$add
      $scope.parties.$add($scope.newParty);
      $scope.newParty = {name: '', phone: '', size: '', done: false, notified: "No"};
    };



    // send message start
    $scope.sendTextMessage = function(party){
      var textMessageRef = new Firebase('https://waitandeat-louishoan.firebaseio.com/textMessages');
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
  }]);
