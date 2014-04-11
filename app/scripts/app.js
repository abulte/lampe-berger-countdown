'use strict';

angular
  .module('bergerCountdownApp', [
    'ngSanitize',
    'ngRoute',
    'timer',
    'ngLadda'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .service('bcNotifications', function($window) {

    var doNotif = function(message) {
      var n = new $window.Notification('Lampe Berger',
        {'body': message}
      );
      n.onclick = function () {
        this.close();
      };
    };

    this.notify = function(message) {
      if ('Notification' in $window) {
        var perm = $window.Notification.permission;
        if (perm === 'default') {
          $window.Notification.requestPermission(function(perm) {
            if(perm === 'granted') {
              doNotif(message);
            }
          });
        } else if (perm === 'granted') {
          doNotif(message);
        }
      } else {
        console.log('No notification API support.');
      }
    };

  });
