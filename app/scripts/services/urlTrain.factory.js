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
      .factory('urlTrainFactory', urlTrainFactory);

      urlTrainFactory.$inject =['$http','$q','apiUrl'];

      function urlTrainFactory($http,$q,apiUrl) {
        return {
            getUrl: getUrl
        }

        function getUrl (id_1, id_2) {
            var defered = $q.defer();
            var promise = defered.promise;

            $http({
                    cache: true,
                    method:'GET',
                    url: apiUrl + 'getUrl/'+id_1+'~'+id_2,
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
