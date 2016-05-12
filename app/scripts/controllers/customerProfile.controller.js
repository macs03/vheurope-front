(function () {
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
    .controller('CustomerProfileController',CustomerProfileController);

    CustomerProfileController.$inject = ['$scope', '$location'];

    function CustomerProfileController ($scope, $location) {
        var vm = this;
        var token = localStorage.getItem("resertrip_token");
        if (token == null) {
            $location.path("/login")
        }
    }

})();
