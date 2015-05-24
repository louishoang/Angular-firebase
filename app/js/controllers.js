'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
  .controller('LandingPageController', [function() {

  }])
  .controller('WaitListController',
               ['$scope', '$firebase',
                'FIREBASE_URL',
                 function($scope, $firebase, FIREBASE_URL) {

    // Etablish connection to firebase server
    var partiesRef = new Firebase(FIREBASE_URL + 'parties');

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
               ['$scope', '$firebaseSimpleLogin', '$location',
                'FIREBASE_URL',
                function($scope, $firebaseSimpleLogin,
                         $location, FIREBASE_URL){
    var authRef = new Firebase(FIREBASE_URL);

    var auth = $firebaseSimpleLogin(authRef);

    $scope.user = {email: '', password: ''};

    $scope.register = function(){
      auth.$createUser($scope.user.email, $scope.user.password)
          .then(function(data){
            console.log(data);
            $scope.login();
      });
    };


    $scope.login = function(){
      auth.$login('password', $scope.user)
      //return promise
          .then(function(data){
            console.log(data);
        //Redirect user to /waitlist
        $location.path('/waitlist');
      });
    };

    $scope.logout = function(){
      auth.$logout();
      // Redirect user to home page
        $location.path('/');
    };
  }]);
