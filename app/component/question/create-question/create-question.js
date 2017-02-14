'use strict';

require('./_create-question.scss');

module.exports = {
  template: require('./create-question.html'),
  controller: ['$log', 'questionService', CreateQuestionController],
  controllerAs: 'createQuestionCtrl',
};

function CreateQuestionController($log, questionService) {
  $log.debug('CreateQuestionController');

  this.question = {};

  this.createQuestion = function() {
    questionService.createQuestion(this.question)
    .then( () => {
      this.question.content = null;
    });
  };
}
