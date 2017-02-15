'use strict';

module.exports = {
  template: require('./question-item.html'),
  controller: ['$log', 'questionService', 'authService', QuestionItemController],
  controllerAs: 'questionItemCtrl',
  bindings: {
    question: '<',
    user: '<'
  }
};

function QuestionItemController($log, questionService, authService) {
  $log.debug('QuestionItemController');

  this.showEditQuestion = false;

  authService.currentUserId()
  .then( payload => {
    return this.user = payload;
  });

  this.deleteQuestion = function() {
    questionService.deleteQuestion(this.question._id);
  };

  this.upvoteQuestion = function() {
    questionService.upvoteQuestion(this.question._id);
  };

  this.downvoteQuestion = function() {
    questionService.downvoteQuestion(this.question._id);
  };

}
