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
       'constants',
       'ui.router'
     ]);

     app.config(function ($stateProvider, $urlRouterProvider) {
         // For any unmatched url, send to /
             $urlRouterProvider.otherwise('/');

             $stateProvider
                 .state('main', {
                     url: '/',
                     templateUrl: 'views/main.html',
                     controller: 'MainController',
                     controllerAs: 'main'
                 })
                 .state('search', {
                     url: '/search/:origin/:originCountryCode/:destination/:destinationCountryCode/:departureDate/:returnDate',
                     templateUrl: 'views/search.tpl.html',
                     controller: 'SearchController',
                     controllerAs: 'search'
                 })
                 .state('seat', {
                     url: '/seat/:idDeparture/:idReturn',
                     templateUrl: 'views/seat.tpl.html',
                     controller: 'SeatController',
                     controllerAs: 'seat'
                 })
                 .state('payment', {
                     url: '/payment/:idDeparture/:idReturn',
                     templateUrl: 'views/payment.tpl.html',
                     controller: 'PaymentController',
                     controllerAs: 'payment'
                 })
                 .state('success', {
                     url: '/success',
                     templateUrl: 'views/success.tpl.html',
                     controller: 'SuccessController',
                     controllerAs: 'success'
                 })
     });

    app.config(['$translateProvider', function ($translateProvider) {
      $translateProvider.useStaticFilesLoader({
        prefix: 'languages/locale-',
        suffix: '.json'
      });

      $translateProvider.preferredLanguage('es');
      $translateProvider.useSanitizeValueStrategy('escape');
      $translateProvider.useCookieStorage();
      $translateProvider.fallbackLanguage('es');
    }]);

    app.config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
      cfpLoadingBarProvider.includeSpinner = false;
    }]);

})();
