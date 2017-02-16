'use strict';

module.exports = {
  template: require('./question-item.html'),
  controller: ['$log', '$location', 'questionService', 'authService', QuestionItemController],
  controllerAs: 'questionItemCtrl',
  bindings: {
    question: '<',
    user: '<'
  }
};

function QuestionItemController($log, $location, questionService, authService) {
  $log.debug('QuestionItemController');

  this.showEditQuestion = false;

  authService.currentUserId()
  .then( payload => {
    return this.user = payload;
  });

  this.deleteQuestion = function() {
    questionService.deleteQuestion(this.question._id);
  };

  this.upvoteQuestion = function() {
    questionService.upvoteQuestion(this.question._id);
  };

  this.downvoteQuestion = function() {
    questionService.downvoteQuestion(this.question._id);
  };

  // added

  this.checkQuestionPath = function() {
    let path = $location.path();
    // if(path === `/questions/${questionID}/answers/${answerID}`) this.hideLink = true;
    // if(path === '/questions/') this.hideLink = true;
    if(path === '/questions/',$location) this.hideLink = true;
    if(path === '/questions/',$location) $log.log('::::::::::::: yup');
  };

  this.checkQuestionPath();

}
