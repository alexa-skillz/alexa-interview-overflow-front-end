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

  // $log.log(':::', answer);
  // let answersList = questionViewCtrl.question.answers.$index;
  // $log.log(':::', questionViewCtrl.question.answers.$index);
}
