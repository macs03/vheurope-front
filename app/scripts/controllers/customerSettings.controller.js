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

        function callCustomerInfo() {
            customerInfoFactory
                .getAll(token)
                .then(function(data) {
                    vm.customerData = data;
                })
                .catch(function(err) {
                    console.log(err);
                })
        }
    }

})();
