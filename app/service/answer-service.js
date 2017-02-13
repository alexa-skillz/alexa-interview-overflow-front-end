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



  return service;
}
