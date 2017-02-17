'use strict';

module.exports = {
  template: require('./user-item.html'),
  controller: ['$log', 'authService', UserItemController],
  controllerAs: 'userItemCtrl',
  bindings: {
    user: '<'
  }
};

function UserItemController($log, authService) {
  $log.debug('UserItemController');

  authService.currentUserId()
  .then( payload => {
    return this.user = payload;
  });
}
