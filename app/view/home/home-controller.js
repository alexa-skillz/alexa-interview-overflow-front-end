'use strict';

module.exports = ['$log', '$rootScope', 'questionService', 'authService', HomeController];

function HomeController($log, $rootScope, questionService, authService) {
  $log.debug('inside HomeController');

  this.questions = [];
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
      if (payload) {
        return this.authenticationStatus = true;
      } else {
        return this.authenticationStatus = false;
      }
    });
  };

  this.authentication();

  $rootScope.$on('$locationChangeSuccess', () => {
    this.showQuestions();
    this.authentication();
  });
}
