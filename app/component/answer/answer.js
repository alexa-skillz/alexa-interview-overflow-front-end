'use strict';

module.exports = {
  template: require('./answer.html'),
  controller: ['$log', 'answerService', AnswerController],
  controllerAs: 'answerCtrl',
  bindings: {
    answer: '<'
  }
};

function AnswerController($log, answerService) {
  $log.debug('AnswerController');
}
