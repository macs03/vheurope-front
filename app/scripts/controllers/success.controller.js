(function () {
    'use strict';

/**
 * @ngdoc function
 * @name vhEurope.controller:SeatController
 * @description
 * # SeatController
 * Controller of the vhEurope
 */
angular
    .module('vhEurope')
    .controller('SuccessController',SuccessController);

    SuccessController.$inject = ['utilityService','$scope','$interval','$stateParams','$location'];

    function SuccessController (utilityService, $scope, $interval, $stateParams,$location) {
        var vm = this;
       
    }


})();



