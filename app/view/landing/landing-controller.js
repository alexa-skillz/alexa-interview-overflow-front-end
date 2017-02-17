'use strict';

module.exports = ['$log', '$location', '$rootScope', LandingController];

function LandingController($log, $location) {
  let url = $location.url();
  this.showSignup = url === '/join#signup' || url === '/join';
}
