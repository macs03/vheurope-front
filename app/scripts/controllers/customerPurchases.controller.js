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

    CustomerPurchasesController.$inject = ['$scope', '$location', 'customerInfoFactory', '$auth', '$rootScope'];

    function CustomerPurchasesController($scope, $location, customerInfoFactory, $auth, $rootScope) {
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
            })
            .catch(function(err) {
                vm.searching = false;
                console.log(err);
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

})();
