'use strict';

require('./_question-item.scss');

module.exports = {
  template: require('./question-item.html'),
  controller: ['$log', 'questionService', QuestionItemController],
  controllerAs: 'questionItemCtrl',
  bindings: {
    question: '<'
  }
};

function QuestionItemController($log, questionService) {
  $log.debug('QuestionItemController');

  this.showEditQuestion = false;

  this.deleteQuestion = function() {
    questionService.deleteQuestion(this.question._id);
  };
}