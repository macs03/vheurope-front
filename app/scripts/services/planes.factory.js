(function() {
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

    planesFactory.$inject = ['$http', '$q', 'apiUrl', '$filter','apiRtUrl'];

    function planesFactory($http, $q, apiUrl, $filter, apiRtUrl) {
        return {
            self: this,
            getFirstStep: getFirstStep,
            getApiData: getApiData,
            getApiStatus: getApiStatus,
            flag: ''
        }


        function getFirstStep(origin, destination, departure, returns, passengers, departureCountry, arrivalCountry) {
            self.flag = 0;
            var split1 = departure.split('/');
            var departureFormated = split1[2] + '-' + split1[1] + '-' + split1[0];
            var returnsFormated = '';
            if (returns != '') {
                var split2 = returns.split('/');
                returnsFormated = split2[2] + '-' + split2[1] + '-' + split2[0];
            }
            
            var formatOrigin = origin.toLowerCase(); // + '--' + 'ES';
            var formatDestination = destination.toLowerCase(); // + '--' + 'ES';
            formatOrigin = formatOrigin.replace(/\s/g, '-');
            formatOrigin = formatOrigin.replace(/ñ/g, 'n');
            formatDestination = formatDestination.replace(/\s/g, '-');
            formatDestination = formatDestination.replace(/ñ/g, 'n');
            var defered = $q.defer();
            var promise = defered.promise;
            $http({
                    method: 'GET',
                    url: apiRtUrl+'tickets/',
                    params: {
                        origin: formatOrigin,
                        destination: formatDestination,
                        when: departureFormated,
                        persons: passengers,
                        referer: 'www'
                    },

                })
                .success(function(data) {
                    defered.resolve(data);
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
                    method: 'GET',
                    url: apiStatus
                })
                .success(function(data) {
                    defered.resolve(data);
                })
                .error(function(err) {
                    defered.reject(err);
                });

            return promise;
        }

        function getApiData(apiData) {
            var defered = $q.defer();
            var promise = defered.promise;
            $http({
                    method: 'GET',
                    url: apiData
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
})();
