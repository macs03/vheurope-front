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
      .factory('locationsRtFactory', locationsRtFactory);

      locationsRtFactory.$inject =['$http','$q','apiRtUrl'];

      function locationsRtFactory($http,$q,apiRtUrl) {
        return {
            getAll: getAll
        }

        function getAll (query) {
            var defered = $q.defer();
            var promise = defered.promise;

            $http({
                    cache: true,
                    method:'GET',
                    url: apiRtUrl+'destinations/?q='+query,
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
