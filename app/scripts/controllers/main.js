'use strict';

/**
 * @ngdoc function
 * @name angularMathCentersApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularMathCentersApp
 */
angular.module('angularMathCentersApp')
  .controller('MainCtrl', function ($scope, $interval) {

    var ctrl = this;

    // Loop all videos
    $scope.$on('youtube.player.ended', function ($event, player) {
      player.playVideo();
    });

    var initialActiveLength = 720;
    var initialBetweenLength = 60;

    // Timer
    ctrl.timer = {
      currentState: 'active',
      timeRemaining: initialActiveLength,
      displayTimeRemaining: function () {
        var seconds, minutes, displaySeconds, displayMinutes;
        seconds = this.timeRemaining % 60;
        minutes = Math.floor(this.timeRemaining / 60);
        if (seconds < 10) {
          displaySeconds = '0' + String(seconds);
        } else {
          displaySeconds = String(seconds);
        }
        displayMinutes = String(minutes);
        return displayMinutes + ':' + displaySeconds;
      },
      state: {
        active: {
          length: initialActiveLength,
          youTubeId: ''
        },
        between: {
          length: initialBetweenLength,
          youTubeId: 'dwH1daa8NY8'
        }
      },
      reset: function () {
        this.currentState = 'active';
        this.timeRemaining = this.state.active;
      },
      increment: function () {
        this.timeRemaining = this.timeRemaining - 1;
        if (this.timeRemaining === 0) {
          switch (this.currentState) {
            case 'active':
              this.currentState = 'between';
              this.timeRemaining = this.state.between.length;
            break;
            case 'between':
              this.currentState = 'active';
              this.timeRemaining = this.state.active.length;
            break;
          }
        }
      }
    };

    $interval(function(){ctrl.timer.increment();}, 1000);

  });
