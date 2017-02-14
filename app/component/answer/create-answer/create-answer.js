'use strict';

module.exports = {
  template: require('./create-answer.html'),
  controller: ['$log', '$stateParams', 'answerService', 'authService', CreateAnswerController],
  controllerAs: 'createAnswerCtrl'
};

function CreateAnswerController($log, $stateParams, answerService, authService) {
  $log.debug('CreateAnswerController');

  this.answer = {};

  this.createAnswer = function() {
    answerService.createAnswer($stateParams.id,this.answer)
    .then( () => {
      this.answer.content = null;
      // this.answer.author = authService.currentUserId();
    });
  };
}
