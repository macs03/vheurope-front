(function () {
    'use strict';

    /**
     * @ngdoc service
     * @name vhEurope.mixedTrips.directive
     * @description
     * # mixedTrips.directive
     * Directive in the vhEurope.
     */
    angular.module('vhEurope')
      .directive('mixedTripsDirective', mixedTripsDirective);

      mixedTripsDirective.$inject =[];

      function mixedTripsDirective() {
        return {
            restrict: 'E',
            scope: {
                busqueda: '@'
            },
            templateUrl: 'views/mixedTrips.tpl.html',
            controller: 'SearchController',
            controllerAs: 'search'
        }
    }
})();
