(function () {
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

        switchLanguageController.$inject =['$scope','$translate','$cookieStore'];

        function switchLanguageController ($scope,$translate,$cookieStore) {

            $scope.selectedLanguage = $cookieStore.get('NG_TRANSLATE_LANG_KEY');
            $scope.changeLanguage = function (langKey) {
                $translate.use(langKey);
                $scope.selectedLanguage = langKey;
            };
        }
})();
