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

    $scope.newParty = {name: '', phone: '', size: ''};

    $scope.saveParty = function(){
      // Add data to fire base using .$add
      $scope.parties.$add($scope.newParty);
      $scope.newParty = {name: '', phone: '', size: ''};
    };

    // send message start
    $scope.sendTextMessage = function(phoneNumber){
      var textMessageRef = new Firebase('https://waitandeat-louishoan.firebaseio.com/textMessages');
      var textMessages = $firebase(textMessageRef);

      textMessages.$add({phoneNumber: phoneNumber});
    };
  }]);
