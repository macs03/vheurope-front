(function () {
    'use strict';

    /**
     * @ngdoc service
     * @name vhEurope.locations.factory
     * @description
     * # locations.factory
     * Service in the vhEurope.
     */
    angular.module('vhEurope')
      .factory('locationsFactory', locationsFactory);

      locationsFactory.$inject =['$http','$q','apiUrl'];

      function locationsFactory($http,$q,apiUrl) {
        return {
            getAll: getAll
        }

        function getAll () {
            var defered = $q.defer();
            var promise = defered.promise;

            $http({
                    method:'GET',
                    url: apiUrl + 'locations',
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
