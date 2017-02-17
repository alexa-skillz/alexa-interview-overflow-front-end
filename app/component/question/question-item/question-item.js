'use strict';

module.exports = {
  template: require('./question-item.html'),
  controller: ['$log', '$rootScope', 'questionService', 'authService', QuestionItemController],
  controllerAs: 'questionItemCtrl',
  bindings: {
    question: '<',
    user: '<'
  }
};

function QuestionItemController($log, $rootScope, questionService, authService) {
  $log.debug('QuestionItemController');

  this.showEditQuestion = false;

  authService.currentUserId()
  .then( payload => {
    return this.user = payload;
  });

  this.deleteQuestion = function() {
    questionService.deleteQuestion(this.question._id)
    .then( () => {
      $rootScope.$broadcast('broadcastEvent', this.question);
    });
  };

  this.upvoteQuestion = function() {
    questionService.upvoteQuestion(this.question._id)
    .then( () => {
      $rootScope.$broadcast('broadcastEvent', this.question);
    });
  };

  this.downvoteQuestion = function() {
    questionService.downvoteQuestion(this.question._id)
    .then( () => {
      $rootScope.$broadcast('broadcastEvent', this.question);
    });
  };

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
