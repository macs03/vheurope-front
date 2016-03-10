(function () {
    'use strict';

    /**
     * @ngdoc service
     * @name vhEurope.payment.factory
     * @description
     * # payment.factory
     * Service in the vhEurope.
     */
    angular.module('vhEurope')
      .factory('paymentFactory', paymentFactory);

      paymentFactory.$inject =['$http','$q'];

      function paymentFactory($http,$q) {
        return {
            getAll: getAll
        }

        function getAll (departureId,returnId,name, lastname, dni, card, month, year, cvv) {
            var defered = $q.defer();
            var promise = defered.promise;
            var expirationDate = year + month;
            var idReturn = "";
            if(returnId == '-1'){
                idReturn = '';
            }else{
                idReturn = returnId;
            }

            $http({
                    method:'POST',
                    url:'http://localhost:8080/vheurope-api/v1/purchase',
                    //url:'http://vheurope.cfapps.io/v1/purchase',
                    data: {
                        idIda : departureId,
                        idVuelta: idReturn,
                        name : name,
                        surname : lastname,
                        dni : dni,
                        card : card,
                        expirationDate : expirationDate,
                        cvv : cvv
                    }
                })
                .success(function(data) {
                    defered.resolve(data);
                })
                .error(function(err) {
                    defered.reject(err);
                });

            return promise;
        }
      }
})();
