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
            getAll: getAll,
            getNearly: getNearly
        }

        function getAll (query) {
            var defered = $q.defer();
            var promise = defered.promise;
            var destinations = [];


            $http({
                    cache: false,
                    method:'GET',
                    url: apiRtUrl+'destinations/?q='+query,
                })
                .success(function(data) {
                    for (var i = 0; i < data.items.length; i++) {
                      destinations.push({id: data.items[i].id, name: data.items[i].name+', '+data.items[i].country.name, country: data.items[i].country.name, countryCode: data.items[i].country.id});
                    }
                    defered.resolve(destinations);
                })
                .error(function(err) {
                    defered.reject(err);
                });

            return promise;
        }

        function getNearly() {
            var defered = $q.defer();
            var promise = defered.promise;

            $http({
                    cache: false,
                    method:'GET',
                    url: apiRtUrl+'geolocate/?language=es',
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
