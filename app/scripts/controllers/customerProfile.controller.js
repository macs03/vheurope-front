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

    CustomerProfileController.$inject = ['$scope'];

    function CustomerProfileController ($scope) {
        var vm = this;
    }

})();
