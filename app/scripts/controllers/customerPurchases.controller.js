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

    CustomerPurchasesController.$inject = ['$scope', '$location'];

    function CustomerPurchasesController($scope, $location) {
        var vm = this;
        var token = localStorage.getItem("resertrip_token");
        if (token == null) {
            $location.path("/login")
        }
    }

})();
