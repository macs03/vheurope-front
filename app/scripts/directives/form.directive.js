'use strict';

/**
 * @ngdoc service
 * @name vhEurope.form.directive
 * @description
 * # form.directive
 * Directive in the vhEurope.
 */
angular.module('vhEurope')
  .directive('formDirective', formDirective);

  formDirective.$inject =[];

  function formDirective() {
    return {
        restrict: 'E',
        scope: {
            busqueda: '@'
        },
        templateUrl: 'views/form.tpl.html',
        controller: 'MainController',
        controllerAs: 'main'
    }
}
