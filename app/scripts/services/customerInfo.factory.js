(function() {
    'use strict';

    /**
     * @ngdoc service
     * @name vhEurope.customerInfo.factory
     * @description
     * # customerInfo.factory
     * Service in the vhEurope.
     */
    angular.module('vhEurope')
        .factory('customerInfoFactory', customerInfoFactory);

    customerInfoFactory.$inject = ['$http', '$q', 'apiUrl'];

    function customerInfoFactory($http, $q, apiUrl) {
        return {
            getAll: getAll
        }
        var aux = null;
        var flag = false;

        function getAll(token) {
            var defered = $q.defer();
            var promise = defered.promise;
            if (token != aux) {
                flag = false;
                aux = token;
            } else {
                flag = true;
            }
            $http({
                    cache: flag,
                    method: 'GET',
                    url: apiUrl + 'customer'
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
