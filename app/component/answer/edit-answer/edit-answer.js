'use strict';

module.exports = {
  template: require('./edit-answer.html'),
  controller: ['$log', 'answerService', EditAnswerController],
  controllerAs: 'editAnswerCtrl',
  bindings: {
    answer: '<'
  }
};

function EditAnswerController($log, answerService) {
  $log.debug('EditAnswerController');

  this.updateAnswer = function() {
    answerService.updateAnswer(this.answer._id, this.answer);
  };

}
