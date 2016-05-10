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

    CustomerSettingsController.$inject = ['$scope'];

    function CustomerSettingsController($scope) {
        var vm = this;
    }

})();
