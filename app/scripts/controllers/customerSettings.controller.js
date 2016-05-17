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
        vm.passwordConfirmed = true;

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
    }

})();
