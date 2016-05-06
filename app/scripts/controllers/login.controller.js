(function () {
    'use strict';

/**
 * @ngdoc function
 * @name vhEurope.controller:LoginController
 * @description
 * # LoginController
 * Controller of the vhEurope
 */
angular
    .module('vhEurope')
    .controller('LoginController',LoginController);

    LoginController.$inject = ['$scope'];

    function LoginController ($scope) {
        var vm = this;
    }

})();
