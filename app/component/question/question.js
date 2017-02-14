'use strict';

module.exports = {
  template: require('./question.html'),
  controller: ['$log', 'questionService', QuestionController],
  controllerAs: 'questionCtrl',
  bindings: {
    question: '<'
  }
};

function QuestionController($log, questionService) {
  $log.debug('QuestionController');

  this.question = [];

  this.questionID = function() {
    questionService.getQuestionByID()
    .then( question => {
      this.question = question;
    });
  };
}
