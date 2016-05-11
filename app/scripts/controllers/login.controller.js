(function() {
    'use strict';

    /**
     * @ngdoc function
     * @name vhEurope.controller:LoginController
     * @description
     * # LoginController
     * Controller of the vhEurope
     */
    angular
        .module('vhEurope')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$scope', '$auth', '$location', '$rootScope'];

    function LoginController($scope, $auth, $location, $rootScope) {
        var vm = this;
        var token = localStorage.getItem("resertrip_token");
        if (token != null) {
            $location.path("/customer-profile")
        }
        this.login = function() {
            $auth.login({
                    username: vm.email,
                    password: vm.password
                })
                .then(function() {
                    // Si se ha logueado correctamente, lo tratamos aquí.
                    var token = localStorage.getItem("resertrip_token");
                    $rootScope.$broadcast('tokenEvent', token);
                    $location.path("/customer-profile")
                })
                .catch(function(response) {
                    // Si ha habido errores llegamos a esta parte
                    console.log("no se pudo loguear por: ");
                    console.log(response);
                });
        }
    }

})();
