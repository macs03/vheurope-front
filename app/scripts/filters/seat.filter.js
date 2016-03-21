(function () {
    'use strict';

    /**
     * @ngdoc service
     * @name vhEurope.seat.filter
     * @description
     * # seat.filter
     * filter in the vhEurope.
     */
    angular.module('vhEurope')
      .filter('seatFilter', seatFilter);

      seatFilter.$inject =[];

      function seatFilter() {
        return function(input, seats) {
            var salida = [];
            angular.forEach(input, function(value,key) {
                for (var i = 0; i < seats.length; i++) {
                    if (input[key].typeService === seats[i] ) {
                        salida.push(value)
                    }
                }
            })
            return salida;
        };
      }
})();
