'use strict';

/* Services */

angular.module('myApp.services', [])
  // .value('FIREBASE_URL', 'https://waitandeat-louishoan.firebaseio.com/');
  .factory('FIREBASE_URL', function(){
    return 'https://waitandeat-louishoan.firebaseio.com/';
  });
