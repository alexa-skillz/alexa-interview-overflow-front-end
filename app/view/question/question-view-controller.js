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

  $rootScope.$on('addAnswer', () => {
    $log.log('run the add answer');
    this.displayQuestion();
  });

  $rootScope.$on('deleteAnswer', () => {
    $log.log('run the delete answer');
    this.displayQuestion();
  });

  $rootScope.$on('upvoteAnswer', () => {
    $log.log('run the upvote answer');
    this.displayQuestion();
  });

  $rootScope.$on('downvoteAnswer', () => {
    $log.log('run the down answer');
    this.displayQuestion();
  });

  $rootScope.$on('editAnswer', () => {
    $log.log('run the edit answer');
    this.displayQuestion();
  });

}
