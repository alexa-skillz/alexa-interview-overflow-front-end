'use strict';

module.exports = {
  template: require('./create-answer.html'),
  controller: ['$log', '$stateParams', '$rootScope', 'answerService', 'authService', CreateAnswerController],
  controllerAs: 'createAnswerCtrl',
};

function CreateAnswerController($log, $stateParams, $rootScope, answerService, authService) {
  $log.debug('CreateAnswerController');

  this.answer = {};

  this.createAnswer = function() {
    answerService.createAnswer($stateParams.id,this.answer)
    .then( () => {
      $rootScope.$broadcast('addAnswer', this.answer);
      this.answer.content = null;
    });
  };
}
