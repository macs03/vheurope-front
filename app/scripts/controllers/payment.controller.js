(function () {
    'use strict';

    /**
     * @ngdoc function
     * @name vhEurope.controller:MainCtrl
     * @description
     * # MainCtrl
     * Controller of the vhEurope
     */
    angular
        .module('vhEurope')
        .controller('PaymentController', PaymentController)

        PaymentController.$inject = ['$scope','utilityService'];

        function PaymentController ($scope, utilityService) {

            var vm = this;
            // La informacion de inicializacion debe ser obtenida a traves de un servicio
            vm.pay = {
                total: 23000
            }; 

            vm.promo = {
                code: ''
            }; 

            vm.trips = {};
            vm.trips.round = {
                origin: 'Barcelona', 
                countryOrigin: 'España', 
                destination: 'Madrid', 
                countryDestination: 'España', 
                departureHour: '12:00', 
                departureDate: 'Julio, 25 2016',
                company: 'Alsa',
                typeService: 'Semi-cama'
            };
            vm.trips.return = {
                origin: 'Madrid', 
                countryOrigin: 'España', 
                destination: 'Barcelona', 
                countryDestination: 'España', 
                departureHour: '23:00', 
                departureDate: 'Julio, 25 2016',
                company: 'Alsa',
                typeService: 'Semi-cama'
            }; 

            vm.validatePromo = function(){
                console.log('Agregar logica de validacion de promociones');
            }; 

            vm.validatePayment = function(){
                console.log('Agregar logica de validacion de pago');
            };          
        }
})();
