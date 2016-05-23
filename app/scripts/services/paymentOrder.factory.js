(function () {
    'use strict';

    /**
     * @ngdoc service
     * @name vhEurope.paymentOrder.factory
     * @description
     * # paymentOrder.factory
     * Service in the vhEurope.
     */
    angular.module('vhEurope')
      .factory('paymentOrderFactory', paymentOrderFactory);

      paymentOrderFactory.$inject =['$http','$q','apiUrl'];

      function paymentOrderFactory($http,$q,apiUrl) {
        return {
            getAll: getAll
        }

        function getAll (uuid) {
            var defered = $q.defer();
            var promise = defered.promise;
            $http({
                    method:'GET',
                    url: apiUrl + 'paymentOrder/'+uuid,
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
