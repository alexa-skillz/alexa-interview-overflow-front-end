'use strict';

require('./_edit-question.scss');

module.exports = {
  template: require('./edit-question.html'),
  controller: ['$log', 'questionService', EditQuestionController],
  controllerAs: 'editQuestionCtrl',
  bindings: {
    question: '<'
  }
};

function EditQuestionController($log, questionService) {
  $log.debug('EditQuestionController');

  this.updateQuestion = function() {
    questionService.updateQuestion(this.question._id, this.question);
  };

}
