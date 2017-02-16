'use strict';

module.exports = {
  template: require('./navbar.html'),
  controller: ['$log', '$location', '$rootScope', 'authService', NavBarController],
  controllerAs: 'navbarCtrl'
};

function NavBarController($log, $location, $rootScope, authService) {
  $log.debug('NavBarController');

  this.authenticationStatus = false;

  this.checkPath = function() {
    let path = $location.path();

    if(path === '/join') this.hideButtons = true;
  };

  this.checkPath();

  this.authentication = function() {
    authService.isLoggedIn()
    .then( payload => {
      if (payload) {
        return this.authenticationStatus = true;
      } else {
        return this.authenticationStatus = false;
      }
    });
  };

  this.authentication();

  console.log('this.authenticationStatus ======== ', this.authenticationStatus);

  this.logout = function() {
    $log.debug('navbarCtrl.logout()');

    this.hideButtons = true;
    authService.logout()
    .then( () => {
      $location.url('/');
    });
  };

  $rootScope.$on('$locationChangeSuccess', () => {
    this.checkPath();
    this.authentication();
  });
}
