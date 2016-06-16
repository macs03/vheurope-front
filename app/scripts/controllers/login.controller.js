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

    LoginController.$inject = ['$scope', '$auth', '$location', '$rootScope', 'customerInfoFactory'];

    function LoginController($scope, $auth, $location, $rootScope, customerInfoFactory) {
        var vm = this;
        vm.reset = reset;
        vm.passChanged = false;
        vm.resetPassword = resetPassword;
        var token = localStorage.getItem("resertrip_token");
        vm.error = false;
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
                    vm.error = true;
                });
        }

        function reset() {
            vm.error = false;
            vm.passChanged = false;
        }

        function resetPassword() {
            if (vm.email) {
                customerInfoFactory
                    .resetPassword(vm.email)
                    .then(function (data) {
                        vm.passChanged = true;
                    })
                    .catch(function (err) {
                        vm.error = true;
                    })
                $('#myModal').modal('hide');
            }
        }
    }

})();
