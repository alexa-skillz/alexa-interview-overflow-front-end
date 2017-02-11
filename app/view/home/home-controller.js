'use strict';

module.exports = ['$log', '$rootScope', 'questionService', HomeController];

function HomeController($log, $rootScope, questionService) {
  $log.debug('inside HomeController');

  this.questions = [];

  this.showQuestions = function() {
    questionService.getQuestions()
    .then(questions => {
      this.questions = questions;
    });
  };

  this.showQuestions();

  $rootScope.$on('$locationChangeSuccess', () => {
    this.showQuestions();
  });
}
