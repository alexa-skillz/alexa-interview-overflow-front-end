'use strict';

module.exports = {
  template: require('./answer-item.html'),
  controller: ['$log', '$stateParams', 'answerService', AnswerItemController],
  controllerAs: 'answerItemCtrl',
  bindings: {
    answer: '<',
    user: '<'
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

  $log.log('::: this', this);
  // $log.log('::: user.claim._id', this.user.claim._id);
  // $log.log('::: answer.author._id', this.answer.author._id);

// answerItemCtrl.user.claim._id = answerItemCtrl.answer.author._id
}
