'use strict';

/**
 * @ngdoc overview
 * @name voyHoyEropeFrontApp
 * @description
 * # voyHoyEropeFrontApp
 *
 * Main module of the application.
 */
angular
  .module('vhEurope', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/search.tpl.html',
        controller: 'SearchController',
        controllerAs: 'search'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
