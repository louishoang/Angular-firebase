'use strict';

/* Services */

angular.module('myApp.services', [])
  .value('FIREBASE_URL', 'https://waitandeat-louishoan.firebaseio.com/')
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
  .factory('partyService', function($firebase, FIREBASE_URL){
    // Etablish connection to firebase server
    var partiesRef = new Firebase(FIREBASE_URL + 'parties');

    // Get data from firebase SERVICE;
    // This will print out a collection of data from database,
    // similar to what index action does in rails
    var parties = $firebase(partiesRef);

    var partyServiceObject = {
      parties: parties,
      saveParty: function(party){
        parties.$add(party);
      }
    };

    return partyServiceObject;
  })
  .factory('sendTextMessageService',
             function($firebase, FIREBASE_URL){
    var textMessageRef = new Firebase(FIREBASE_URL + 'textMessages');
    var textMessages = $firebase(textMessageRef);

    var msgObject = {
      saveTextMessage: function(textMessage){
        textMessages.$add(textMessage);
      }
    };

    return msgObject;
  });
