(function () {
    'use strict';

    /**
     * @ngdoc overview
     * @name voyHoyEropeFrontApp
     * @description
     * # voyHoyEropeFrontApp
     *
     * Main module of the application.
     */
    var app = angular
      .module('vhEurope', [
       'ngAnimate',
       'ngCookies',
       'ngResource',
       'ngRoute',
       'ngSanitize',
       'ngTouch',
       'selectize',
       '720kb.datepicker',
       'rzModule',
       'pascalprecht.translate',
       'angular-loading-bar',
       'constants'
     ]);

      app.config(function ($routeProvider) {
        $routeProvider
          .when('/', {
            templateUrl: 'views/main.html',
            controller: 'MainController',
            controllerAs: 'main'
          })
          .when('/search/:origin/:destination/:departureDate/:returnDate', {
            templateUrl: 'views/search.tpl.html',
            controller: 'SearchController',
            controllerAs: 'search'
          })
          .when('/seat/:idDeparture/:idReturn', {
            templateUrl: 'views/seat.tpl.html',
            controller: 'SeatController',
            controllerAs: 'seat'
          })
          .when('/payment/:idDeparture/:idReturn', {
            templateUrl: 'views/payment.tpl.html',
            controller: 'PaymentController',
            controllerAs: 'payment'
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

    app.config(['$translateProvider', function ($translateProvider) {
      $translateProvider.useStaticFilesLoader({
        prefix: 'languages/locale-',
        suffix: '.json'
      });

      $translateProvider.preferredLanguage('es');
      $translateProvider.useSanitizeValueStrategy('escape');
      $translateProvider.useCookieStorage();

    }]);

    app.config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
      cfpLoadingBarProvider.includeSpinner = false;
    }]);

})();
