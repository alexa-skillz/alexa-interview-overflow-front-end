'use strict';
const JWT = require('jwt-client');

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
    $log.debug('setToken', token);
    return $q.resolve(token);
  }

  service.getToken = function(){
    $log.debug('authService.getToken');
    if (token) {
      $log.debug('getToken', token);
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
      $log.debug('success', res.data.token);
      return setToken(res.data.token);
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
      $log.debug('success', res.data.token);
      return setToken(res.data.token);
    })
    .catch( err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };

  service.isLoggedIn = function() {
    var token = service.getToken();
    $log.debug('isLoggedIn token', token);
    if (token) {
      var payload = JWT.read(token);
      $log.debug('payload', payload);
      return payload.exp > Date.now() / 1000;
    } else {
      return false;
    }
  };

  service.currentUserId = function() {
    return service.getToken()
    .then( token => {
      let userToken = token;

      let payload = JWT.read(userToken);
      $log.debug('payload', payload);
      return payload;
    });
  };


  return service;
}
