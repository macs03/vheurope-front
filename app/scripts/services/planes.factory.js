(function () {
    'use strict';

    /**
     * @ngdoc service
     * @name vhEurope.planes.factory
     * @description
     * # planes.factory
     * Service in the vhEurope.
     */
    angular.module('vhEurope')
      .factory('planesFactory', planesFactory);

      planesFactory.$inject =['$http','$q','apiUrl','$filter'];

      function planesFactory($http,$q,apiUrl,$filter) {
        return {
            self : this,
            getAll : getAll,
            getFirstStep : getFirstStep,
            getApiData : getApiData,
            getApiStatus : getApiStatus,
            dataApi : '',
            allData : {},
            getData : getData
        }

        function getAll(origin, destination, departure, returns, passengers, departureCountry, arrivalCountry) {
            var split1 = departure.split('/');
            var departureFormated = split1[2] + '-' + split1[1] + '-' + split1[0];
            var returnsFormated = '';
            if (returns != ''){
                var split2 = returns.split('/');
                returnsFormated = split2[2] + '-' + split2[1] + '-' + split2[0];
            }
            var formatOrigin = origin.toLowerCase() + '--' + departureCountry;
            var formatDestination = destination.toLowerCase() + '--' + arrivalCountry;
            formatOrigin = formatOrigin.replace(/\s/g, '-');
            formatOrigin = formatOrigin.replace(/ñ/g, 'n');
            formatDestination = formatDestination.replace(/\s/g, '-');
            formatDestination = formatDestination.replace(/ñ/g, 'n');
            getFirstStep(formatOrigin,formatDestination,departureFormated,returnsFormated,1);
        }

        function getFirstStep (formatOrigin,formatDestination,departureFormated,returnsFormated,passengers) {
            var defered = $q.defer();
            var promise = defered.promise;
            $http({
                    method:'GET',
                    url: 'https://api-rt.resertrip.com/tickets/',
                    params: {
                        origin: 'santiago',
                        destination: 'BJZ',
                        when: departureFormated,
                        persons: passengers,
                        referer: 'www'
                    },

                })
                .success(function(data) {

                    defered.resolve(data);
                    getApiStatus(data.status);
                    self.dataApi = data.data;
                })
                .error(function(err) {
                    defered.reject(err)
                });

            return promise;
        }

        function getApiStatus(apiStatus) {
            var defered = $q.defer();
            var promise = defered.promise;
            $http({
                    method:'GET',
                    url: apiStatus
                })
                .success(function(data) {
                    defered.resolve(data);
                    if (data.progress == 0) {
                        setTimeout(function () {
                            getApiData(self.dataApi);
                        }, 10000)
                    }else{
                        setTimeout(function () {
                            getApiData(self.dataApi);
                        }, 4000)
                    }
                })
                .error(function(err) {
                    defered.reject(err)
                });

            return promise;
        }

        function getApiData(apiData) {
            var defered = $q.defer();
            var promise = defered.promise;
            $http({
                    method:'GET',
                    url: apiData
                })
                .success(function(data) {
                    console.log(data);
                    defered.resolve(data);
                    self.allData = data;
                })
                .error(function(err) {
                    defered.reject(err)
                });
            return promise;
        }

        function getData(){
            return {
                data : self.allData
            }
        }

      }
})();
