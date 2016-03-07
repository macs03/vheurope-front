(function () {
    'use strict';

    /**
     * @ngdoc service
     * @name vhEurope.price.filter
     * @description
     * # priice.filter
     * filter in the vhEurope.
     */
    angular.module('vhEurope')
      .filter('priceFilter', priceFilter);

      priceFilter.$inject =[];

      function priceFilter() {
        return function(input,price) {
            var salida = [];
            angular.forEach(input, function(value,key) {
               if (input[key].price > 0 && input[key].price <= price) {
                   salida.push(value)
               }
            })
            return salida;
        };
      }
})();
