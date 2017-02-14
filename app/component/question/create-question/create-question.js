'use strict';

require('./_create-question.scss');

module.exports = {
  template: require('./create-question.html'),
  controller: ['$log', 'questionService', 'authService', CreateQuestionController],
  controllerAs: 'createQuestionCtrl',
};

function CreateQuestionController($log, questionService, authService) {
  $log.debug('CreateQuestionController');

  this.question = {};

  this.createQuestion = function() {
    questionService.createQuestion(this.question)
    .then( () => {
      this.question.content = null;
      this.question.author = authService.currentUserId();
    });
  };
}
