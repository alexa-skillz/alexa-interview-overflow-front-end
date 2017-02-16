'use strict';

module.exports = {
  template: require('./edit-answer.html'),
  controller: ['$log', '$stateParams', '$rootScope', 'answerService', EditAnswerController],
  controllerAs: 'editAnswerCtrl',
  bindings: {
    answer: '<'
  }
};

function EditAnswerController($log, $stateParams, $rootScope, answerService) {
  $log.debug('EditAnswerController');

  this.updateAnswer = function() {
    answerService.updateAnswer($stateParams.id, this.answer._id, this.answer)
    .then( () => {
      $rootScope.$broadcast('broadcastEvent', this.answer);
    });
  };

}
