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

    SuccessController.$inject = ['utilityService','$scope','$interval','$routeParams','$location'];

    function SuccessController (utilityService, $scope, $interval, $routeParams,$location) {
        var vm = this;
       
    }


})();



