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

      cancelFactory.$inject =['$http','$q','apiUrl','utilityService'];

      function cancelFactory($http,$q,apiUrl,utilityService) {
        return {
            getAll: getAll
        }

        function getAll (uuid) {
            var defered = $q.defer();
            var promise = defered.promise;
            $http({
                    method:'POST',
                    url: apiUrl + 'cancelTrip/'+uuid+'?lang='+utilityService.getLang(),
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
