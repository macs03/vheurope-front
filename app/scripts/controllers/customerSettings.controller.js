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

    CustomerSettingsController.$inject = ['$scope', '$location'];

    function CustomerSettingsController($scope, $location) {
        var vm = this;
        var token = localStorage.getItem("resertrip_token");
        if (token == null) {
            $location.path("/login")
        }
    }

})();
