(function() {
    'use strict';

    /**
     * @ngdoc function
     * @name vhEurope.controller:MainCtrl
     * @description
     * # MainCtrl
     * Controller of the vhEurope
     */
    angular
        .module('vhEurope')
        .controller('switchLanguageController', switchLanguageController)

    switchLanguageController.$inject = ['$scope', '$translate', '$cookieStore', 'utilityService', 'sessionStorageService', '$rootScope'];

    function switchLanguageController($scope, $translate, $cookieStore, utilityService, sessionStorageService, $rootScope) {

        sessionStorageService.setCountry('es');
        sessionStorageService.setLanguage('es');

        $scope.selectedLanguage = $cookieStore.get('NG_TRANSLATE_LANG_KEY');
        $scope.selectedCountry = utilityService.getCountry()

        $scope.changeCountry = function(country) {
            $scope.selectedCountry = country;
            $rootScope.$broadcast('countryEvent', country);
            $translate.use(country);
            $scope.selectedLanguage = country;
            utilityService.setLang(country);
            sessionStorageService.setCountry(country);
            $rootScope.$broadcast('langEvent', country);
        }

        $scope.changeLanguage = function(langKey) {
            $translate.use(langKey);
            $scope.selectedLanguage = langKey;
            utilityService.setLang(langKey);
            sessionStorageService.setLanguage(langKey);
            $rootScope.$broadcast('langEvent', langKey);

        };
    }




})();