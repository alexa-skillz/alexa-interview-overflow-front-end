'use strict';

module.exports = ['$log', '$rootScope', '$stateParams', 'questionService', 'authService', QuestionViewController];

function QuestionViewController($log, $rootScope, $stateParams, questionService, authService) {
  $log.debug('inside QuestionViewController');

  this.question = null;
  this.user = null;

  this.displayQuestion = function() {

    questionService.getQuestionByID($stateParams.id)
    .then( question => {
      this.question = question;
      console.log('QUESTION:', question);
    });

    authService.currentUserId()
    .then( payload => {
      return this.user = payload;
    });
  };

  this.displayQuestion();

  $rootScope.$on('$locationChangeSuccess', () => {
    this.displayQuestion();
  });

  $rootScope.$on('broadcastEvent', () => {
    $log.log('breadcastEvent');
    this.displayQuestion();
  });

}
