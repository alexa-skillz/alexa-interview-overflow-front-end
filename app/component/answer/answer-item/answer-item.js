'use strict';

module.exports = {
  template: require('./answer-item.html'),
  controller: ['$log', '$stateParams', '$rootScope', 'answerService', AnswerItemController],
  controllerAs: 'answerItemCtrl',
  bindings: {
    answer: '<',
    user: '<'
  }
};

function AnswerItemController($log, $stateParams, $rootScope, answerService) {
  $log.debug('AnswerItemController');

  this.showEditAnswer = false;

  this.deleteAnswer = function() {
    answerService.deleteAnswer($stateParams.id, this.answer._id)
    .then( () => {
      $rootScope.$broadcast('broadcastEvent', this.answer);
    });
  };

  this.upvoteAnswer = function() {
    answerService.upvoteAnswer($stateParams.id, this.answer._id)
    .then( () => {
      $rootScope.$broadcast('broadcastEvent', this.answer);
    });
  };

  this.downvoteAnswer = function() {
    answerService.downvoteAnswer($stateParams.id, this.answer._id)
    .then( () => {
      $rootScope.$broadcast('broadcastEvent', this.answer);
    });
  };

}
