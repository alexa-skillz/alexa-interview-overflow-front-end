'use strict';

module.exports = {
  template: require('./edit-answer.html'),
  controller: ['$log', '$stateParams', 'answerService', EditAnswerController],
  controllerAs: 'editAnswerCtrl',
  bindings: {
    answer: '<'
  }
};

function EditAnswerController($log, $stateParams, answerService) {
  $log.debug('EditAnswerController');

  this.updateAnswer = function() {
    answerService.updateAnswer($stateParams.id, this.answer._id, this.answer);
  };

}
