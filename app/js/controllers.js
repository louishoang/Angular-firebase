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
    $scope.parties = $firebase(partiesRef);

    $scope.newParty = {name: '', phone: '', size: '', done: false, notified: "No"};

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

      // Notified?
      party.notified = "Yes";
      $scope.parties.$save(party.$id);
    };
  }]);
