'use strict';

module.exports = ['$stateProvider', '$urlRouterProvider', routerConfig];

function routerConfig($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.when('/register' , '/join#register');
  $urlRouterProvider.when('/login' , '/join#login');
  $urlRouterProvider.when('/user' , '/user');
  $urlRouterProvider.when('', '/');

  let states = [
    {
      name: 'home',
      url: '/',
      template: require('../view/home/home.html'),
      controller: 'HomeController',
      controllerAs: 'homeCtrl'
    },
    {
      name: 'question by id',
      url: '/questions/:id',
      template: require('../view/question/question-view.html'),
      controller: 'QuestionViewController',
      controllerAs: 'questionViewCtrl'
    },
    {
      name: 'landing',
      url: '/join',
      template: require('../view/landing/landing.html'),
      controller: 'LandingController',
      controllerAs: 'landingCtrl'
    },
    {
      name: 'user',
      url: '/user',
      template: require('../view/user/user.html'),
      controller: 'UserController',
      controllerAs: 'userCtrl'
    }
  ];

  states.forEach( state => {
    $stateProvider.state(state);
  });
}
