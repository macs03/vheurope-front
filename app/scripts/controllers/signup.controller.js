(function() {
    'use strict';

    /**
     * @ngdoc function
     * @name vhEurope.controller:SignUpController
     * @description
     * # SignUpController
     * Controller of the vhEurope
     */
    angular
        .module('vhEurope')
        .controller('SignUpController', SignUpController);

    SignUpController.$inject = ['$scope', '$auth', '$location', '$rootScope'];

    function SignUpController($scope, $auth, $location, $rootScope) {
        var vm = this;
        var token = localStorage.getItem("resertrip_token");
        if (token != null) {
            $location.path("/customer-profile")
        }
        this.signup = function() {
            $auth.signup({
                    firstName: vm.name,
                    email: vm.email,
                    password: vm.password,
                    passwordRepeat: vm.confirmPassword
                })
                .then(function(data) {
                    // Si se ha registrado correctamente,
                    // Podemos redirigirle a otra parte
                    var getToken = data.data.token;
                    localStorage.setItem("resertrip_token", getToken);
                    var token = localStorage.getItem("resertrip_token");
                    $rootScope.$broadcast('tokenEvent', token);
                    $location.path("/customer-profile");
                })
                .catch(function(response) {
                    console.log(response);
                    // Si ha habido errores, llegaremos a esta función
                });
        }
    }

})();
