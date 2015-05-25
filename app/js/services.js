'use strict';

/* Services */

angular.module('myApp.services', [])
  .value('FIREBASE_URL', 'https://waitandeat-louishoan.firebaseio.com/')
  .factory('dataService', function($firebase, FIREBASE_URL){
    var dataRef = new Firebase(FIREBASE_URL);
    var fireData = $firebase(dataRef);

    return fireData;
  })
  .factory('authService',
             function($firebaseSimpleLogin, $location,
                      FIREBASE_URL, $rootScope){

    var authRef = new Firebase(FIREBASE_URL);
    var auth = $firebaseSimpleLogin(authRef);

    var authServiceObject = {
      register: function(user){
        auth.$createUser(user.email, user.password)
            .then(function(data){
              console.log(data);
              authServiceObject.login(user);
        });
      },
      login: function(user){
        auth.$login('password', user)
          // return promise
            .then(function(data){
              console.log(data);
          //Redirect user to /waitlist
          $location.path('/waitlist');
        });
      },
      logout: function(){
         auth.$logout();
        // Redirect user to home page
        $location.path('/');
      },
      getCurrentUser: function(){
        return auth.$getCurrentUser();
      }
    };

    $rootScope.$on("$firebaseSimpleLogin:login", function(e, user){
      // Save currentUser on our rootScope.
      $rootScope.currentUser = user;
    });

    $rootScope.$on("$firebaseSimpleLogin:logout", function(){
      $rootScope.currentUser = null;
    });

    return authServiceObject;
  })
  .factory('partyService', function(dataService){
    var users = dataService.$child('users');

    var partyServiceObject = {
      saveParty: function(party, userId){
        users.$child(userId).$child('parties').$add(party);
      },
      getPartiesByUserId: function(userId){
        return users.$child(userId).$child('parties');
      }
    };

    return partyServiceObject;
  })
  .factory('sendTextMessageService',
             function(dataService, partyService){

    var textMessages = dataService.$child('textMessages');

    var msgObject = {
      saveTextMessage: function(party){
        var newTextMessage = {
          phoneNumber: party.phone,
          size: party.size,
          name: party.name
        };
        textMessages.$add(newTextMessage);
        // Change notified status
        party.notified = "Yes";
        partyService.parties.$save(party.$id);
      }
    };

    return msgObject;
  });
