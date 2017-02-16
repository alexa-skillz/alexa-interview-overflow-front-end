'use strict';

module.exports = ['$log', '$rootScope', '$stateParams', 'userService', 'authService', UserViewController];

function UserViewController($log, $rootScope, $stateParams, userService, authService) {
  $log.debug('inside UserViewController');

  this.user = null;

  this.displayUser = function() {

    userService.getUserByID($stateParams.id)
    .then( user => {
      this.user = user;
      console.log('USER:', user);
    });
  };

  this.displayUser();

  $rootScope.$on('$locationChangeSuccess', () => {
    this.displayUser();
  });

}
