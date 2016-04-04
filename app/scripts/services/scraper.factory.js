(function () {
    'use strict';

    /**
     * @ngdoc service
     * @name vhEurope.scraper.factory
     * @description
     * # scraper.factory
     * Service in the vhEurope.
     */
    angular.module('vhEurope')
      .factory('scraperFactory', scraperFactory);

      scraperFactory.$inject =['$http','$q','apiUrl','$filter'];

      function scraperFactory($http,$q,apiUrl,$filter) {
        return {
            self : this,
            getAll : getAll,
            getFirstStep : getFirstStep,
            getApiData : getApiData,
            getApiStatus : getApiStatus,
            dataApi : "" ,
            allData : {},
            getData : getData
        }

        function getAll(origin,destination,departure,returns,passengers) {
            var split1 = departure.split('/');
            var newDeparture = new Date(split1[1]+"-"+split1[0]+"-"+split1[2]);
            var newReturn = "";
            if(returns !=""){
                var split2 = returns.split('/');
                var newReturn = new Date(split2[1]+"-"+split2[0]+"-"+split2[2]);
            }
            var departureFormated = $filter('date')(newDeparture, 'yyyy-MM-dd');
            var returnsFormated = $filter('date')(newReturn, 'yyyy-MM-dd');
            var formatOrigin = origin.toLowerCase();
            var formatDestination = destination.toLowerCase();
            formatOrigin= formatOrigin.replace(/\s/g,"-");
            formatOrigin= formatOrigin.replace(/ñ/g,"n");
            formatDestination= formatDestination.replace(/\s/g,"-");
            getFirstStep(formatOrigin,formatDestination,departureFormated,returnsFormated,1);
        }

        function getFirstStep (formatOrigin,formatDestination,departureFormated,returnsFormated,passengers) {
            var defered = $q.defer();
            var promise = defered.promise;
            $http({
                    method:'GET',
                    url: 'https://api.voyhoy.com/tickets/',
                    params: {
                        origin:formatOrigin+'--espana',
                        destination:formatDestination+'--espana',
                        when:departureFormated,
                        persons:passengers,
                        referer:'vh-europe'
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
                    if (data.progress == "0") {
                        setTimeout(function () {
                            getApiData(self.dataApi);
                        },10000)
                    }else{
                        setTimeout(function () {
                            getApiData(self.dataApi);
                        },4000)
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
