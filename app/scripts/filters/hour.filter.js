(function () {
    'use strict';

    /**
     * @ngdoc service
     * @name vhEurope.hour.filter
     * @description
     * # hour.filter
     * filter in the vhEurope.
     */
    angular.module('vhEurope')
      .filter('hourFilter', hourFilter);

      hourFilter.$inject =[];

      function hourFilter() {
        return function(input, minValue, maxValue) {
            if (input.length > 0){
                var dateUNIX = input[0].departure;
                var date = new Date(dateUNIX);
                var day = date.getDate();
                var month = date.getUTCMonth();
                var year = date.getFullYear();
                var firstTime = new Date(year,month,day,minValue,0,0);
                var secondTime = new Date(year,month,day,maxValue,59,59);
                var initialTime = firstTime.getTime();
                var finalTime = secondTime.getTime();

                var salida = [];
                angular.forEach(input, function(value,key) {
                   if (input[key].departure >= initialTime && input[key].departure <= finalTime) {
                       salida.push(value);
                   }
                })
                return salida;

            }
        };
      }
})();
