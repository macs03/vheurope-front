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

      paymentFactory.$inject =['$http','$q','apiUrl','utilityService'];

      function paymentFactory($http,$q,apiUrl,utilityService) {
        return {
            getAll: getAll
        }

        function getAll (departureId,returnId,name, lastname, dni, email, card, month, year, cvv) {
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
                    url: apiUrl + 'purchase',
                    data: {
                        idIda : departureId,
                        idVuelta: idReturn,
                        name : name,
                        surname : lastname,
                        dni : dni,
                        email : email,
                        card : card,
                        expirationDate : expirationDate,
                        cvv : cvv,
                        lang : utilityService.getLang()
                    },
                    skipAuthorization: true
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
