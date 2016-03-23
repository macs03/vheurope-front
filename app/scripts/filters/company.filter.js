(function () {
    'use strict';

    /**
     * @ngdoc service
     * @name vhEurope.company.filter
     * @description
     * # company.filter
     * filter in the vhEurope.
     */
    angular.module('vhEurope')
      .filter('companyFilter', companyFilter);

      companyFilter.$inject =[];

      function companyFilter() {
        return function(input, companies) {
            var salida = [];
            angular.forEach(input, function(value,key) {
                for (var i = 0; i < companies.length; i++) {
                    if (input[key].companyName === companies[i] ) {
                        salida.push(value)
                    }
                }
            })
            return salida;
        };
      }
})();
