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

      seatsFactory.$inject =['$http','$q','apiUrl','utilityService'];

      function seatsFactory($http,$q,apiUrl,utilityService) {
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
                    url: apiUrl + 'seats',
                    data: {
                        idIda:idDeparture,
                        idVuelta:returnId,
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
