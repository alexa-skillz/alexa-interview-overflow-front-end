'use strict';

module.exports = ['$q', '$log', '$http', '$window', authService];

function authService($q, $log, $http, $window){
  $log.debug('authService');

  let service = {};
  let token = null;

  function setToken(_token){
    $log.debug('authService.setToken()');

    if (! _token) {
      return $q.reject(new Error('no token'));
    }

    $window.localStorage.setItem('token', _token);
    token = _token;
    console.log('setToken', token);
    return $q.resolve(token);
  }

  service.getToken = function(){
    $log.debug('authService.getToken');
    if (token) {
      return $q.resolve(token);
    }

    token = $window.localStorage.getItem('token');
    if (token) return $q.resolve(token);
    return $q.reject(new Error('token not found'));
  };

  service.logout = function(){
    $log.debug('authService.logout()');

    $window.localStorage.removeItem('token');
    token = null;
    return $q.resolve();
  };

  service.signup = function(user) {
    $log.debug('authService.signup()');

    let url = `${__API_URL__}/register`;
    let config = {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    };

    return $http.post(url, user, config)
    .then( res => {
      $log.log('success', res.data);
      return setToken(res.data);
    })
    .catch(err => {
      $log.error('failure', err.message);
      return $q.reject(err);
    });
  };

  service.login = function(user){
    $log.debug('authService.login()');

    let url = `${__API_URL__}/login`;
    let data = {
      username: user.username,
      password: user.password,
    };
    let config = {
      headers: {
        Accept: 'application/json',
      }
    };

    return $http.post(url, data, config)
    .then( res => {
      $log.log('success', res.data);
      return setToken(res.data);
    })
    .catch( err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };

  service.isLoggedIn = function() {
    var token = service.getToken();

    if (token) {
      var payload = JSON.parse($window.atob(token.split('.')[1]));

      return payload.exp > Date.now() / 1000;
    } else {
      return false;
    }
  };

  service.currentUser = function() {
    if (service.isLoggedIn()) {
      var token = service.getToken();
      var payload = JSON.parse($window.atob(token.split('.')[1]));
      return payload.username;
    }
  };

  service.currentUserId = function() {
    if (service.isLoggedIn()) {
      var token = service.getToken();
      var payload = JSON.parse($window.atob(token.split('.')[1]));
      return payload._id;
    }
  };

  return service;
}
