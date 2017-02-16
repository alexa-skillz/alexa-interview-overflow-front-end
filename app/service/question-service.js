'use strict';

module.exports = ['$q', '$log', '$http', 'authService', questionService];

function questionService($q, $log, $http, authService) {
  $log.debug('questionService');

  let service = {};
  service.questions = [];

  service.getQuestions = function() {
    $log.debug('inside of service.getQuestions()');

    let url = `${__API_URL__}/api/questions`;

    let config = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    };

    return $http.get(url, config)
    .then( res => {
      $log.debug('questions retrieved', res);
      service.questions = res.data;
      return service.questions;
    })
    .catch( err => {
      $log.error(err.message);
      return $q.reject(err);
    });

  };

  service.createQuestion = function(question) {
    $log.debug('inside of service.createQuestion()');

    return authService.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/questions`;
      let config = {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      };

      return $http.post(url, question, config);
    })
    .then( res => {
      $log.debug('question created');
      let question = res.data;
      service.questions.unshift(question);
      $log.debug(question);
      return question;
    })
    .catch( err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };

  service.updateQuestion = function(questionID, questionData) {
    $log.debug('questionService.updateQuestion()');

    return authService.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/questions/${questionID}`;
      let config = {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      };

      return $http.put(url, questionData, config);
    })
    .then( res => {
      for (let i = 0; i < service.questions.length; i++) {
        let current = service.questions[i];
        if (current._id === questionID) {
          service.questions[i] = res.data;
          break;
        }
      }

      return res.data;
    })
    .catch( err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };

  service.deleteQuestion = function(questionID) {
    $log.debug('questionService.updateQuestion()');

    return authService.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/questions/${questionID}`;
      let config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };

      return $http.delete(url, config);
    })
    .then( res => {
      for (let i = 0; i < service.questions.length; i++) {
        let current = service.questions[i];
        if (current._id === questionID) {
          service.questions.splice(i, 1);
          break;
        }
      }
    })
    .catch( err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };

  service.upvoteQuestion = function(questionID, questionData) {
    $log.debug('questionService.upvoteQuestion()');
    return authService.getToken()
    .then( token => {
      $log.debug(token);
      let url = `${__API_URL__}/api/questions/${questionID}/upvote`;
      let config = {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      };

      return $http.put(url, questionData, config);
    })
    .then( res => {
      for (let i = 0; i < service.questions.length; i++) {
        let current = service.questions[i];
        if (current._id === questionID) {

          service.questions[i] = res.data;
          break;
        }
      }

      return res.data;
    })
    .catch( err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };

  service.downvoteQuestion = function(questionID, questionData) {
    $log.debug('questionService.downvoteQuestion()');
    return authService.getToken()
    .then( token => {
      $log.debug(token);
      let url = `${__API_URL__}/api/questions/${questionID}/downvote`;
      let config = {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      };

      return $http.put(url, questionData, config);
    })
    .then( res => {
      for (let i = 0; i < service.questions.length; i++) {
        let current = service.questions[i];
        if (current._id === questionID) {

          service.questions[i] = res.data;
          break;
        }
      }

      return res.data;
    })
    .catch( err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };

  service.getQuestionByID = function(questionID) {
    $log.debug('inside of service.getQuestionByID()');

    let url = `${__API_URL__}/api/questions/${questionID}`;
    let config = {
      headers: {
        Accept: 'application/json'
      }
    };

    return $http.get(url, config)
    .then( res => {
      $log.debug('question retrieved', res);
      service.questions = res.data;
      return service.questions;
    });
  };

  return service;
}
