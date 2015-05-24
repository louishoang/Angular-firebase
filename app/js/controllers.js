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
    // similar to what index action does in rails
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
  }])
  .controller('AuthController',
               ['$scope', '$firebaseSimpleLogin',
                function($scope, $firebaseSimpleLogin){
    var authRef = new Firebase('https://waitandeat-louishoan.firebaseio.com/');

    var auth = $firebaseSimpleLogin(authRef);

    $scope.user = {email: '', password: ''};

    $scope.register = function(){
      auth.$createUser($scope.user.email, $scope.user.password)
          .then(function(data){
            // console.log(data);
            auth.$login('password', $scope.user);
      });
    };


    $scope.login = function(){
      auth.$login('password', $scope.user)
          .then(function(data){
            console.log(data);
      });
    };
  }]);
