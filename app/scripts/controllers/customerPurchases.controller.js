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

    CustomerPurchasesController.$inject = ['$scope'];

    function CustomerPurchasesController($scope) {
        var vm = this;
    }

})();
