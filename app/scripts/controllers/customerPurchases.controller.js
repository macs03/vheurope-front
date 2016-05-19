(function() {
    'use strict';

    /**
     * @ngdoc function
     * @name vhEurope.controller:CustomerPurchasesController
     * @description
     * # CustomerPurchasesController
     * Controller of the vhEurope
     */
    angular
        .module('vhEurope')
        .controller('CustomerPurchasesController', CustomerPurchasesController);

    CustomerPurchasesController.$inject = ['$scope', '$location', 'customerInfoFactory'];

    function CustomerPurchasesController($scope, $location, customerInfoFactory) {
        var vm = this;
        var token = localStorage.getItem("resertrip_token");
        if (token == null) {
            $location.path("/login")
        }
        vm.purchasesData = null;
        vm.searching = true;
        customerInfoFactory
            .getCustomerPurchases(token)
            .then(function(data) {
                vm.purchasesData = data;
                vm.searching = false;
                console.log(data);
            })
            .catch(function(err) {
                vm.searching = false;
                console.log(err);
            })
    }

})();
