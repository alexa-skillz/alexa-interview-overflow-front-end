'use strict';

module.exports = ['$log', '$rootScope', 'questionService', 'authService', HomeController];

function HomeController($log, $rootScope, questionService, authService) {
  $log.debug('inside HomeController');

  this.questions = [];
  this.answers = [];
  this.authenticationStatus = false;

  this.showQuestions = function() {
    questionService.getQuestions()
    .then(questions => {
      this.questions = questions;
    });
  };

  this.showQuestions();

  this.authentication = function() {
    authService.isLoggedIn()
    .then( payload => {
      if (payload === false) {
        return this.authenticationStatus = false;
      } else {
        return this.authenticationStatus = true;
      }
    });
  };

  $rootScope.$on('$locationChangeSuccess', () => {
    this.showQuestions();
  });
}
