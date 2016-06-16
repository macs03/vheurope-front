(function () {
    'use strict';

    /**
     * @ngdoc service
     * @name vhEurope.companyScraper.filter
     * @description
     * # companyScraper.filter
     * filter in the vhEurope.
     */
    angular.module('vhEurope')
      .filter('companyScraperFilter', companyScraperFilter);

      companyScraperFilter.$inject =[];

      function companyScraperFilter() {
        return function(input, companies) {
            var salida = [];
            angular.forEach(input, function(value,key) {
                for (var i = 0; i < companies.length; i++) {
                    if (input[key].enterprise__name === companies[i] ) {
                        salida.push(value);
                    }
                }
            });
            return salida;
        };
      }
})();
