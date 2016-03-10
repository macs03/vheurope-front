(function () {
    'use strict';

    /**
     * @ngdoc service
     * @name vhEurope.seats.factory
     * @description
     * # seats.factory
     * Service in the vhEurope.
     */
    angular.module('vhEurope')
      .factory('seatsFactory', seatsFactory);

      seatsFactory.$inject =['$http','$q'];

      function seatsFactory($http,$q) {
        return {
            getAll: getAll
        }

        function getAll (idDeparture,idReturn) {
            var defered = $q.defer();
            var promise = defered.promise;
            var returnId = null;
            if(idReturn == '-1'){
                returnId = '';
            }else{
                returnId = idReturn;
            }
            $http({
                    method:'POST',
                    url:'http://localhost:8080/vheurope-api/v1/seats',
                    data: {
                        idIda:idDeparture,
                        idVuelta:returnId,
                    },
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
