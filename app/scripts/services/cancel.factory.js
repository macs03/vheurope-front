(function () {
    'use strict';

    /**
     * @ngdoc service
     * @name vhEurope.cancel.factory
     * @description
     * # cancel.factory
     * Service in the vhEurope.
     */
    angular.module('vhEurope')
      .factory('cancelFactory', cancelFactory);

      cancelFactory.$inject =['$http','$q','apiUrl'];

      function cancelFactory($http,$q,apiUrl) {
        return {
            getAll: getAll
        }

        function getAll (uuid) {
            var defered = $q.defer();
            var promise = defered.promise;
            $http({
                    method:'POST',
                    url: apiUrl + 'cancelTrip/'+uuid,
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
