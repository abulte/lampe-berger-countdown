'use strict';

angular.module('bergerCountdownApp')
  .controller('MainCtrl', function ($scope, $interval, bcNotifications) {
    $scope.label = 'Light my fire';
    $scope.icon = 'fire';
    $scope.progress = 0;
    $scope.btnClass = 'success';

    var duration;

    // actions
    // - waitForBlow
    // - releasingParfume
    // - waitForCap
    // - done
    $scope.nextAction = 'waitForBlow';
    $scope.$watch('progress', function(progress) {
      if (progress === 100) {
        $scope.btnClass = 'danger';
        $scope.progress = 0;
        if ($scope.nextAction === 'waitForBlow') {
          $scope.label = 'Blow it!';
          $scope.nextAction = 'releasingParfume';
          bcNotifications.notify('Blow your lamp!');
        } else if ($scope.nextAction === 'releasingParfume') {
          $scope.label = 'Cap it!';
          $scope.nextAction = 'waitForCap';
          bcNotifications.notify('Cap your lamp!');
        }
      }
    });

    $scope.next = function(nextAction) {
      $scope.nextAction = nextAction;
      $scope.progress = 0;

      if (nextAction === 'waitForBlow') {
        duration = 2 * 60;
      } else if (nextAction === 'releasingParfume') {
        $scope.btnClass = 'info';
        $scope.label = 'Let it release.';
        duration = 20 * 60;
      } else if (nextAction === 'waitForCap') {
        $scope.btnClass = 'success';
        $scope.label = 'Enjoy!';
        $scope.nextAction = 'done';
        return;
      } else {
        return;
      }

      // var increment = duration / 120;
      var interval = (duration / 100) * 1000;
      $interval(function() {
        $scope.progress += 1;
      }, interval, 100);
    };
  });
