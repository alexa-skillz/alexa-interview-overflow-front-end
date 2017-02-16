'use strict';

module.exports = ['$log', '$rootScope', '$stateParams', 'questionService', 'authService', QuestionViewController];

function QuestionViewController($log, $rootScope, $stateParams, questionService, authService) {
  $log.debug('inside QuestionViewController');

  this.question = null;
  this.user = null;
  this.authenticationStatus = false;

  this.displayQuestion = function() {

    questionService.getQuestionByID($stateParams.id)
    .then( question => {
      this.question = question;
      $log.debug('QUESTION:', question);
    });

    authService.currentUserId()
    .then( payload => {
      return this.user = payload;
    });
  };

  this.displayQuestion();

  this.authentication = function() {
    authService.isLoggedIn()
    .then( payload => {
      if (payload) {
        return this.authenticationStatus = true;
      } else {
        return this.authenticationStatus = false;
      }
    });
  };

  this.authentication();

  $rootScope.$on('$locationChangeSuccess', () => {
    this.displayQuestion();
    this.authentication();
  });

  $rootScope.$on('broadcastEvent', () => {
    $log.debug('breadcastEvent');
    this.displayQuestion();
    this.authentication();
  });

}
