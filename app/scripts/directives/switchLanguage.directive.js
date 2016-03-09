(function () {
    'use strict';

    /**
     * @ngdoc service
     * @name vhEurope.form.directive
     * @description
     * # form.directive
     * Directive in the vhEurope.
     */
    angular.module('vhEurope')
      .directive('switchLanguageDirective', switchLanguageDirective);

      switchLanguageDirective.$inject =[];

      function switchLanguageDirective() {
        return {
            restrict: 'E',
            scope: {
                switchLanguage: '@'
            },
            templateUrl: 'views/switch-language.tpl.html',
            controller: 'switchLanguageController',
            controllerAs: 'switchLanguage'
        }
    }
})();
