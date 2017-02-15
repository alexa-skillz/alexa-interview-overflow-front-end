'use strict';

module.exports = {
  template: require('./answer-item.html'),
  controller: ['$log', '$stateParams', 'answerService', AnswerItemController],
  controllerAs: 'answerItemCtrl',
  bindings: {
    answer: '<',
  }
};

function AnswerItemController($log, $stateParams, answerService) {
  $log.debug('AnswerItemController');

  this.showEditAnswer = false;

  this.deleteAnswer = function() {
    answerService.deleteAnswer($stateParams.id, this.answer._id);
  };

  this.upvoteAnswer = function() {
    answerService.upvoteAnswer($stateParams.id, this.answer._id);
  };

  this.downvoteAnswer = function() {
    answerService.downvoteAnswer($stateParams.id, this.answer._id);
  };


}
