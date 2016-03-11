(function () {
    'use strict';

    /**
     * @ngdoc service
     * @name vhEurope.travels.factory
     * @description
     * # travels.factory
     * Service in the vhEurope.
     */
    angular.module('vhEurope')
      .factory('travelsFactory', travelsFactory);

      travelsFactory.$inject =['$http','$q','$filter','apiUrl'];

      function travelsFactory($http,$q,$filter,apiUrl) {
        return {
            getAll: getAll
        }

        function getAll (origin,destiny,departure,returns,passengers) {
            var defered = $q.defer();
            var promise = defered.promise;
            var departureFormated = $filter('date')(departure, 'dd/MM/yyyy');
            var returnsFormated = $filter('date')(returns, 'dd/MM/yyyy');

            $http({
                    method:'GET',
                    url: apiUrl + 'trips',
                    params: {
                        departure:origin,
                        arrival:destiny,
                        departureDate:departureFormated,
                        returnDate:returnsFormated,
                        totalPeople:passengers
                    },

                })
                .success(function(data) {
                    defered.resolve(data);
                })
                .error(function(err) {
                    defered.reject(err)
                });

            return promise;
        }
      }
})();
