(function () {
    'use strict';

/**
 * @ngdoc function
 * @name vhEurope.controller:LogoutController
 * @description
 * # LogoutController
 * Controller of the vhEurope
 */
angular
    .module('vhEurope')
    .controller('LogoutController',LogoutController);

    LogoutController.$inject = ['$scope'];

    function LogoutController ($scope) {
        var vm = this;
    }

})();
