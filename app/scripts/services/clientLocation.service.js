(function () {
    'use strict';

    /**
     * @ngdoc service
     * @name vhEurope.clientLocation.service
     * @description
     * # clientLocation.service
     * Service in the vhEurope.
     *
     *
     * 
     * I've been thinking for a while if this module should be
     * a service or a factory and I still wonder. So if you have
     * any suggestion, feel free to tell !
     */
    angular.module('vhEurope')
      .service('clientLocationService', clientLocationService);

      clientLocationService.$inject =['$http', '$q', 'GeoIP'];

      function clientLocationService($http, $q, GeoIP) {
        return {
            ip: "",
            city: "",
            country: "",
            getData: getData,
            setData: setData
        }

        function getData(){
            var defered = $q.defer();
            var promise = defered.promise;

            // return {
            //     ip: self.ip,
            //     city: self.city,
            //     country: self.country,
            // }
            

            $http({
                    cache: true,
                    method:'GET',
                    url: GeoIP
                })
                .success(function(data) {
                    defered.resolve(data.city);
                })
                .error(function(err) {
                    defered.reject(err);
                });

            return promise;
        }

        function setData(ip, city, country){
            self.ip = ip;
            self.city = city;
            self.country = country;
        }
      }
})();
