'use strict';

module.exports = ['$q', '$log', '$http', 'authService', answerService];

function answerService($q, $log, $http, authService) {
  $log.debug('answerService');

  let service = {};
  service.answers = [];

  // MAY NOT NEED SINCE WE DONT DISPLAY A LIST OF ANSWERS SEPERATE FROM THE QUESTIONS
  service.getAnswers = function() {
    $log.debug('inside of service.getAnswers()');

    let url = `${__API_URL__}/api/answers`;
    let config = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    };

    return $http.get(url, config)
    .then( res => {
      $log.log('answers retrieved', res);
      service.answers = res.data;
      return service.answers;
    })
    .catch( err => {
      $log.error(err.message);
      return $q.reject(err);
    });

  };
  // END OF getAnswers function

  service.createAnswer = function(questionID, answer) {
    $log.debug('inside of service.createAnswer()');

    return authService.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/questions/${questionID}/answers`;
      let config = {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      };

      return $http.post(url, answer, config);
    })
    .then( res => {
      $log.log('answer created');
      let answer = res.data;
      service.answers.unshift(answer);
      return answer;
    })
    .catch( err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };

  service.updateAnswer = function(questionID, answerID, answerData) {
    $log.debug('answerService.updateAnswer()');

    return authService.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/questions/${questionID}/answers/${answerID}`;
      let config = {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      };

      return $http.put(url, answerData, config);
    })
    .then( res => {
      for (let i = 0; i < service.answers.length; i++) {
        let current = service.answers[i];
        if (current._id === answerID) {
          service.answers[i] = res.data;
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

  service.deleteAnswer = function(questionID, answerID) {
    $log.debug('answerService.deleteAnswer()');

    return authService.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/questions/${questionID}/answers/${answerID}`;
      let config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };

      return $http.delete(url, config);
    })
    // .then( res => {
    //   for (let i = 0; i < service.answers.length; i++) {
    //     let current = service.answers[i];
    //     console.log('current', current);
    //     if (current._id === answerID) {
    //       service.answers.indexOf(current, splice(i, 1);
    //       break;
    //     }
    //   }
    // })
    .catch( err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };

  service.upvoteAnswer = function(questionID, answerID, answerData) {
    $log.debug('answerService.upvoteAnswer()');
    return authService.getToken()
    .then( token => {
      console.log(token);
      let url = `${__API_URL__}/api/questions/${questionID}/answers/${answerID}/upvote`;
      let config = {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      };

      return $http.put(url, answerData, config);
    })
    .then( res => {
      for (let i = 0; i < service.answers.length; i++) {
        let current = service.answers[i];
        if (current._id === answerID) {

          service.answers[i] = res.data;
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

  service.downvoteAnswer = function(questionID, answerID, answerData) {
    $log.debug('answerService.downvoteAnswer()');
    return authService.getToken()
    .then( token => {
      console.log(token);
      let url = `${__API_URL__}/api/questions/${questionID}/answers/${answerID}/downvote`;
      let config = {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      };

      return $http.put(url, answerData, config);
    })
    .then( res => {
      for (let i = 0; i < service.answers.length; i++) {
        let current = service.answers[i];
        if (current._id === answerID) {

          service.answers[i] = res.data;
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
  return service;
}
