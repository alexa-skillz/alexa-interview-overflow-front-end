'use strict';

module.exports = ['$log', '$rootScope', '$stateParams', 'questionService', 'answerService', HomeController];

function HomeController($log, $rootScope, $stateParams, questionService, answerService) {
  $log.debug('inside HomeController');

  console.log('$stateParams', $stateParams);
  this.questions = [];
  this.answers = [];

  this.showQuestions = function() {
    questionService.getQuestions()
    .then(questions => {
      this.questions = questions;
    });
  };

  this.showQuestions();

  this.showAnswers = function() {
    answerService.getAnswers()
    .then(answers => {
      this.answers = answers;
    });
  };

  this.showAnswers();

  $rootScope.$on('$locationChangeSuccess', () => {
    this.showQuestions();
    this.showAnswers();
  });
}
