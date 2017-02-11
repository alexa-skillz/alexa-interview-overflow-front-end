'use strict';

module.exports = ['$q', '$log', '$http', 'authService', questionService];

function questionService($q, $log, $http, authService) {
  $log.debug('questionService');

  let service = {};
  service.questions = [];

  service.getQuestions = function() {
    $log.debug('inside of service.getQuestions()');

    let url = `${__API_URL__}/api/question`;

    let config = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    };

    return $http.get(url, config)
    .then( res => {
      $log.log('questions retrieved', res);
      service.questions = res.data;
      return service.questions;
    })
    .catch( err => {
      $log.error(err.message);
      return $q.reject(err);
    });

  };

  return service;
}
