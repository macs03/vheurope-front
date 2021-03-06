(function() {
    'use strict';

    /**
     * @ngdoc function
     * @name vhEurope.controller:CustomerSettingsController
     * @description
     * # CustomerSettingsController
     * Controller of the vhEurope
     */
    angular
        .module('vhEurope')
        .controller('CustomerSettingsController', CustomerSettingsController);

    CustomerSettingsController.$inject = ['$scope', '$location', 'customerInfoFactory', '$auth', '$rootScope'];

    function CustomerSettingsController($scope, $location, customerInfoFactory, $auth, $rootScope) {
        var vm = this;

        var searchView = true;
        $rootScope.$broadcast('viewEvent', searchView);

        var token = localStorage.getItem("resertrip_token");
        if (token == null) {
            $location.path("/login")
        } else {
            callCustomerInfo();
        }

        vm.updateData = updateData;
        vm.confirm = confirm;
        vm.changePassword = changePassword;
        vm.reset = reset;
        vm.passwordConfirmed = true;
        vm.error = false;
        vm.wellDonePassword = false;
        vm.wellDoneData = false;
        vm.deleteUser = deleteUser;
        vm.delete = false;

        function callCustomerInfo() {
            customerInfoFactory
                .getAll(token)
                .then(function(data) {
                    vm.customerData = data;
                    var name = data.fullName.split(",");
                    if (name.length == 1) {
                        vm.firstName = name[0];
                    } else {
                        vm.firstName = name[1];
                        vm.lastName = name[0];
                    }
                })
                .catch(function(err) {
                    if (err == 401) {
                        $auth.logout()
                            .then(function() {
                                // Desconectamos al usuario y lo redirijimos
                                var token = localStorage.getItem("resertrip_token");
                                $rootScope.$broadcast('tokenEvent', token);
                                $location.path("/login")
                            });
                    }
                })
        }

        function updateData() {
            customerInfoFactory
                .putNewData(vm.firstName, vm.lastName, vm.customerData.identificationNumber, vm.customerData.email, vm.customerData.address, vm.customerData.birthday, vm.customerData.phoneNumber, vm.customerData.contactName, vm.customerData.contactEmail, vm.customerData.contactPhoneNumber)
                .then(function(data) {
                    vm.wellDoneData = true;
                })
                .catch(function(err) {
                    vm.error = true;
                })
        }

        function confirm() {
            if (vm.newPassword === vm.newPasswordConfirm) {
                vm.passwordConfirmed = true;
            } else {
                vm.passwordConfirmed = false;
            }
        }

        function changePassword() {
            customerInfoFactory
                .postNewPassword(vm.currentPassword, vm.newPassword, vm.newPasswordConfirm)
                .then(function(data) {
                    vm.wellDonePassword = true;
                })
                .catch(function(err) {
                    vm.error = true;
                })
        }

        function reset() {
            vm.error = false;
            vm.wellDonePassword = false;
            vm.wellDoneData = false;
        }

        function deleteUser() {
            customerInfoFactory
                .deleteUser(token)
                .then(function(data) {
                    $auth.logout()
                        .then(function() {
                            // Desconectamos al usuario y lo redirijimos
                            var token = localStorage.getItem("resertrip_token");
                            $rootScope.$broadcast('tokenEvent', token);
                            $location.path("/")
                        });
                })
                .catch(function(err) {
                    vm.error = true;
                })
        }

    }

})();