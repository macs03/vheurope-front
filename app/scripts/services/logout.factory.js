(function() {
    'use strict';

    /**
     * @ngdoc service
     * @name vhEurope.logout.factory
     * @description
     * # logout.factory
     * Service in the vhEurope.
     */
    angular.module('vhEurope')
        .factory('logoutFactory', logoutFactory);

    logoutFactory.$inject = ['$http', '$q', 'apiUrl'];

    function logoutFactory($http, $q, apiUrl) {
        return {
            logout: logout
        }

        function logout(token) {
            var defered = $q.defer();
            var promise = defered.promise;
            $http({
                    cache: true,
                    method: 'POST',
                    url: apiUrl + 'logout',
                    headers: {
                       'Authorization': token
                    }
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
