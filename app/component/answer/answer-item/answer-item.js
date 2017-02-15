'use strict';

module.exports = {
  template: require('./answer-item.html'),
  controller: ['$log', '$rootScope', 'answerService', AnswerItemController],
  controllerAs: 'answerItemCtrl',
  bindings: {
    answer: '<'
  }
};

function AnswerItemController($log, $rootScope, answerService) {
  $log.debug('QuestionItemController');

  this.showEditAnswer = false;

  this.deleteAnswer = function() {
    answerService.deleteAnswer(this.answer._id);
  };

  this.upvoteAnswer = function() {
    answerService.upvoteAnswer(this.answer._id);
  };

  this.downvoteAnswer = function() {
    answerService.downvoteAnswer(this.answer._id);
  };

}
