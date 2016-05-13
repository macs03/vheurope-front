(function() {
    'use strict';

    /**
     * @ngdoc function
     * @name vhEurope.controller:CustomerProfileController
     * @description
     * # CustomerProfileController
     * Controller of the vhEurope
     */
    angular
        .module('vhEurope')
        .controller('CustomerProfileController', CustomerProfileController);

    CustomerProfileController.$inject = ['$scope', '$location', 'customerInfoFactory'];

    function CustomerProfileController($scope, $location, customerInfoFactory) {
        var vm = this;
        vm.callCustomerInfo = callCustomerInfo;
        vm.customerData = null;
        var token = localStorage.getItem("resertrip_token");
        if (token == null) {
            $location.path("/login")
        } else {
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
