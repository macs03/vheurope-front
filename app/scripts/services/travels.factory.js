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
            getAll: getAll,
            skipAccents: skipAccents,
            getMixedTrips : getMixedTrips
        }

        function getAll (origin,destiny,departure,returns,passengers,departureCountry,arrivalCountry,passengersAdult,passengersChild,passengersBaby) {
            var defered = $q.defer();
            var promise = defered.promise;
            var departureFormated = $filter('date')(departure, 'dd/MM/yyyy');
            var returnsFormated = $filter('date')(returns, 'dd/MM/yyyy');

            $http({
                    method:'GET',
                    url: apiUrl + 'trips',
                    params: {
                        departure: skipAccents(origin),
                        departureCountry:departureCountry,
                        arrival: skipAccents(destiny),
                        arrivalCountry:arrivalCountry,
                        departureDate:departureFormated,
                        returnDate:returnsFormated,
                        adultPassengersNumber : passengersAdult,
                        childPassengersNumber : passengersChild,
                        babyPassengersNumber : passengersBaby
                    },
                    skipAuthorization: true
                })
                .success(function(data) {
                    defered.resolve(data);
                })
                .error(function(err) {
                    defered.reject(err)
                });

            return promise;
        }

        function getMixedTrips(id) {
            var defered = $q.defer();
            var promise = defered.promise;
            $http({
                    method:'GET',
                    url: apiUrl + 'tripsFromRoute',
                    params: {
                        id : id
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

      function skipAccents(text) {
        var acentos = "ÃÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛãàáäâèéëêìíïîòóöôùúüûÑñÇç";
        var original = "AAAAAEEEEIIIIOOOOUUUUaaaaaeeeeiiiioooouuuunncc";
        for (var i=0; i<acentos.length; i++) {
          text = text.replace(acentos.charAt(i), original.charAt(i));
        }

        return text;
      }

})();
