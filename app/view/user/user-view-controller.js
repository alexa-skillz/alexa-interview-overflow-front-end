'use strict';

module.exports = ['$log', '$rootScope', '$stateParams', 'userService', UserViewController];

function UserViewController($log, $rootScope, $stateParams, userService) {
  $log.debug('inside UserViewController');

  this.user;

  this.displayUser = function() {

    userService.getUsers()
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
