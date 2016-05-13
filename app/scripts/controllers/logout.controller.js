(function() {
    'use strict';

    /**
     * @ngdoc function
     * @name vhEurope.controller:LogoutController
     * @description
     * # LogoutController
     * Controller of the vhEurope
     */
    angular
        .module('vhEurope')
        .controller('LogoutController', LogoutController);

    LogoutController.$inject = ['$scope', '$auth', '$location', '$rootScope', 'logoutFactory'];

    function LogoutController($scope, $auth, $location, $rootScope, logoutFactory) {
        var vm = this;
        var token = localStorage.getItem("resertrip_token");
        logoutFactory
            .logout(token)
        $auth.logout()
            .then(function() {
                // Desconectamos al usuario y lo redirijimos
                var token = localStorage.getItem("resertrip_token");
                $rootScope.$broadcast('tokenEvent', token);
                $location.path("/")
            });
    }

})();
