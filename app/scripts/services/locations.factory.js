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

  locationsFactory.$inject =['$http','$q'];

  function locationsFactory($http,$q) {
    return {
        getAll: getAll
    }

    function getAll () {
        var defered = $q.defer();
        var promise = defered.promise;

        $http({
                method:'GET',
                url:'http://localhost:8080/vheurope-api/v1/locations',
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
