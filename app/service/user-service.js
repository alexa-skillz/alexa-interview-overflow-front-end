'use strict';

module.exports = ['$q', '$log', '$http', userService];

function userService($q, $log, $http) {
  $log.debug('userService');

  let service = {};
  service.users = [];

  service.getUsers = function() {
    $log.debug('inside of service.getUsers()');

    let url = `${__API_URL__}/api/users`;

    let config = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    };

    return $http.get(url, config)
    .then( res => {
      $log.log('users retrieved', res);
      service.users = res.data;
      return service.users;
    })
    .catch( err => {
      $log.error(err.message);
      return $q.reject(err);
    });

  };

  service.getUserByID = function(userID) {
    $log.debug('inside of service.getUserByID()');

    let url = `${__API_URL__}/api/users/${userID}`;
    let config = {
      headers: {
        Accept: 'application/json'
      }
    };

    return $http.get(url, config)
    .then( res => {
      $log.log('user retrieved', res);
      service.users = res.data;
      return service.users;
    });
  };
  return service;
}
