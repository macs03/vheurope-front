(function () {
    'use strict';

    /**
     * @ngdoc service
     * @name vhEurope.priceScraper.filter
     * @description
     * # priceScraper.filter
     * filter in the vhEurope.
     */
    angular.module('vhEurope')
      .filter('priceScraperFilter', priceScraperFilter);

      priceScraperFilter.$inject =[];

      function priceScraperFilter() {
        return function(input,price) {
            var salida = [];
            angular.forEach(input, function(value,key) {
               if (input[key].data.price > 0 && input[key].data.price <= price) {
                   salida.push(value)
               }
            })
            return salida;
        };
      }
})();
