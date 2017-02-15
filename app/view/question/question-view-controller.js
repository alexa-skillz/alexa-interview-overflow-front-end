'use strict';

module.exports = ['$log', '$rootScope', '$stateParams', 'questionService', QuestionViewController];

function QuestionViewController($log, $rootScope, $stateParams, questionService) {
  $log.debug('inside QuestionViewController');

  this.question = null;

  this.displayQuestion = function() {

    questionService.getQuestionByID($stateParams.id)
    .then( question => {
      this.question = question;
    });
  };

  this.displayQuestion();

  $rootScope.$on('$locationChangeSuccess', () => {
    this.displayQuestion();
  });

  $rootScope.$on('addAnswer', () => {
    $log.log('run the add answer');
    this.displayQuestion();
  });
}
