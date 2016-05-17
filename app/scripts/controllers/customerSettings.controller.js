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

    CustomerSettingsController.$inject = ['$scope', '$location', 'customerInfoFactory'];

    function CustomerSettingsController($scope, $location, customerInfoFactory) {
        var vm = this;
        var token = localStorage.getItem("resertrip_token");
        if (token == null) {
            $location.path("/login")
        }else {
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

        function callCustomerInfo() {
            customerInfoFactory
                .getAll(token)
                .then(function(data) {
                    vm.customerData = data;
                    var name = data.fullName.split(",");
                    vm.firstName = name[1];
                    vm.lastName = name[0];
                })
                .catch(function(err) {
                    console.log(err);
                })
        }

        function updateData() {
            customerInfoFactory
                .putNewData(vm.firstName,vm.lastName,vm.customerData.identificationNumber,vm.customerData.email,vm.customerData.address,vm.customerData.birthday,vm.customerData.phoneNumber, vm.customerData.contactName, vm.customerData.contactEmail, vm.customerData.contactPhoneNumber)
                .then(function (data) {
                    console.log(data);
                    vm.wellDoneData = true;
                })
                .catch(function (err) {
                    console.log(err);
                })
        }

        function confirm() {
            if (vm.newPassword === vm.newPasswordConfirm) {
                vm.passwordConfirmed = true;
            }else{
                vm.passwordConfirmed = false;
            }
        }

        function changePassword() {
            customerInfoFactory
                .postNewPassword(vm.currentPassword, vm.newPassword, vm.newPasswordConfirm)
                .then(function (data) {
                    console.log(data);
                    vm.wellDonePassword = true;
                })
                .catch(function (err) {
                    console.log(err);
                    vm.error = true;
                })
        }

        function reset() {
            vm.error = false;
            vm.wellDonePassword = false;
            vm.wellDoneData = false;
        }

    }

})();
