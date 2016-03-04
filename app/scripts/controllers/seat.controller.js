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

    SearchController.$inject = ['travelsFactory','utilityService','$scope','$interval'];

    function SeatController (travelsFactory, utilityService, $scope, $interval) {
        
        var vm = this;
        vm.trips = {};
        vm.trips.round = {origin: 'Barcelona', countryOrigin: 'España', countryCodeOrigin: 'es', destination: 'Madrid', countryDestination: 'España', countryCodeDestination: 'es',  departureHour: '12:00', arrivalHour: '23:00', terminalOrigin: 'Terminal Barajas 14C', terminalDestination: 'Terminal Madrid 12C', duration: '10h 23min', company: 'Alsa', companyLogo: 'https://www.voyhoy.com/static/images/60x60/new/bus-logo/chile/expreso-norte.jpg'};
        vm.trips.return = {origin: 'Madrid', countryOrigin: 'España', countryCodeOrigin: 'es', destination: 'Barcelona', countryDestination: 'España', countryCodeDestination: 'es',  departureHour: '23:00', arrivalHour: '06:00', terminalOrigin: 'Terminal Madrid 12C', terminalDestination: 'Terminal Barajas 14C', duration: '10h 25min', company: 'Alsa', companyLogo: 'https://www.voyhoy.com/static/images/60x60/new/bus-logo/chile/expreso-norte.jpg'};

        vm.seatsSelected = [];
         
        console.log(vm);



    	//Inicializacion de los tabs
        $('#seats-ida a, #seats-vuelta a').click(function (e) {
            e.preventDefault()
            $(this).tab('show')
        })
        
    }
