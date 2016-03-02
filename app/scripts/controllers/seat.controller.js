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
    .controller('SeatController',SeatController);

    SearchController.$inject =['travelsFactory','utilityService','$scope','$interval'];

    function SeatController (travelsFactory, utilityService, $scope, $interval) {
        $('#seats-ida a, #seats-vuelta a').click(function (e) {
            e.preventDefault()
            $(this).tab('show')
        })
        
    }
