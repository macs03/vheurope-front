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
       'rzModule',
       'pascalprecht.translate',
       'angular-loading-bar',
       'constants',
       'ui.router',
       'ui.mask',
       'LocalStorageModule'
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
                 .state('legal-text', {
                     url: '/legal-text',
                     templateUrl: 'views/legal-text.tpl.html',
                 })
                 .state('privacy-policy', {
                     url: '/privacy-policy',
                     templateUrl: 'views/privacy-policy.tpl.html',
                 })
                 .state('cookies-policy', {
                     url: '/cookies-policy',
                     templateUrl: 'views/cookies-policy.tpl.html',
                 })
                 .state('terms', {
                     url: '/terms',
                     templateUrl: 'views/terms.tpl.html',
                 })
                 .state('cancel', {
                     url: '/cancel/:uuid',
                     templateUrl: 'views/cancel.tpl.html',
                     controller: 'CancelController',
                     controllerAs: 'cancel'
                 })
     });

    app.config(['$translateProvider', function ($translateProvider) {
      $translateProvider.useStaticFilesLoader({
        prefix: '/scripts/languages/locale-',
        suffix: '.json'
      });

      $translateProvider.preferredLanguage('es');
      $translateProvider.useSanitizeValueStrategy('sanitize');
      $translateProvider.useCookieStorage();
      $translateProvider.fallbackLanguage('es');
    }]);

    app.config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
      cfpLoadingBarProvider.includeSpinner = false;
    }]);

    app.config(['localStorageServiceProvider', function (localStorageServiceProvider) {
        localStorageServiceProvider
            .setPrefix('resertrip')
            .setStorageType('sessionStorage');
    }]);

})();
