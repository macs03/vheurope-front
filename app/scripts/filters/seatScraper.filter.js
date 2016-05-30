(function () {
    'use strict';

    /**
     * @ngdoc service
     * @name vhEurope.seatScraper.filter
     * @description
     * # seatScraper.filter
     * filter in the vhEurope.
     */
    angular.module('vhEurope')
      .filter('seatScraperFilter', seatScraperFilter);

      seatScraperFilter.$inject =[];

      function seatScraperFilter() {
        return function(input, seats) {
            var salida = [];
            angular.forEach(input, function(value,key) {
                for (var i = 0; i < seats.length; i++) {
                    if (input[key].type__name === seats[i] ) {
                        salida.push(value)
                    }
                }
            })
            return salida;
        };
      }
})();
