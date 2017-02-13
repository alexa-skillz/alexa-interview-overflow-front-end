'use strict';

module.exports = ['$log', '$rootScope', '$stateParams', 'questionService', QuestionViewController];

function QuestionViewController($log, $rootScope, $stateParams, questionService) {
  $log.debug('inside QuestionViewController');

  console.log('question view - stateParams', $stateParams);

  let questionID = $stateParams.id;
  this.question = null;

  this.displayQuestion = function(questionID) {
    questionService.getQuestionByID(questionID)
    .then( question => {
      this.question = question;
    });
  };

  this.displayQuestion();

  $rootScope.$on('$locationChangeSuccess', () => {
    this.displayQuestion();
  });
}
