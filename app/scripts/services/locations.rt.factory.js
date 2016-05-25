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
                      destinations.push({label: data.items[i].name+', '+data.items[i].country.name, rt: data.items[i].rt, id: data.items[i].id, name: data.items[i].name+', '+data.items[i].country.name, country: data.items[i].country.name, countryCode: data.items[i].country.id});
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
            var destinations = [];

            $http({
                    cache: false,
                    method:'GET',
                    url: apiRtUrl+'geolocate/?language=es',
                })
                .success(function(data) {
                    //console.log(data.nearPlaces);
                    for (var i = 0; i < data.nearPlaces.length; i++) {
                      destinations.push({label: data.nearPlaces[i].name+', '+data.nearPlaces[i].country.name, rt: data.nearPlaces[i].rt, id: data.nearPlaces[i].id, name: data.nearPlaces[i].name+', '+data.nearPlaces[i].country.name, country: data.nearPlaces[i].country.name, countryCode: data.nearPlaces[i].country.id});
                    }
                    for (var i = 0; i < data.suggestions.length; i++) {
                        if(data.suggestions[i].length == undefined){
                            destinations.push({label: data.suggestions[i].name+', '+data.suggestions[i].country.name, rt: data.suggestions[i].rt, id: data.suggestions[i].id, name: data.suggestions[i].name+', '+data.suggestions[i].country.name, country: data.suggestions[i].country.name, countryCode: data.suggestions[i].country.id});
                        }
                    }
                    defered.resolve(destinations);
                    //defered.resolve(data);
                })
                .error(function(err) {
                    defered.reject(err);
                });

            return promise;
        }

        function getInformation(query) {
            var defered = $q.defer();
            var promise = defered.promise;

            $http({
                    cache: false,
                    method:'GET',
                    url: apiRtUrl+'destinations/?id=' + query,
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
