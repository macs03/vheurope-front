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
      .directive('vhfooterDirective', footerDirective);

      footerDirective.$inject =[];

      function footerDirective() {
        return {
            restrict: 'E',
            scope: {
                busqueda: '@'
            },
            templateUrl: 'views/footer.tpl.html',
            controller: 'FooterController',
            controllerAs: 'footer'
        }
    }
})();
