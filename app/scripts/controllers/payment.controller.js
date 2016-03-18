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

        PaymentController.$inject = ['$scope','utilityService','paymentFactory','$stateParams','$location'];

        function PaymentController ($scope, utilityService, paymentFactory,$stateParams,$location) {

            var vm = this;
            // La informacion de inicializacion debe ser obtenida a traves de un servicio
            vm.pay = {
                total: 23000
            };

            vm.promo = {
                code: ''
            };
            vm.paying = paying;
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

            var paymentData = utilityService.getPaymentData();

            vm.totalWithDiscount = paymentData.totalWithDiscount;
            vm.totalFee = paymentData.totalFee,
            vm.totalPayment = paymentData.totalPayment;
            vm.departureData = paymentData.departure;
            vm.returnData = paymentData.returns;
            vm.isRoundTrip = false;
            
            if (vm.returnData != undefined){
                if(vm.returnData.hasOwnProperty('company')){
                     vm.isRoundTrip = true;
                }
            }

            var payer = utilityService.getPayer();
            if (payer.payer != undefined) {
                vm.pay.name = payer.payer.name;
                vm.pay.lastname = payer.payer.lastname;
                vm.pay.dni = payer.payer.dni;
                vm.pay.email = payer.payer.email;
            }

            vm.validatePromo = function(){
                console.log('Agregar logica de validacion de promociones');
            }; 

            vm.validatePayment = function(){
                console.log('Agregar logica de validacion de pago');
            };

            function paying(name,lastname,dni,email,card,month,year,cvv) {
                paymentFactory
                    .getAll($stateParams.idDeparture,$stateParams.idReturn,name,lastname,dni,email,card,month,year,cvv)
                    .then(function(data){
                        //$location.path ("/payment/"+$stateParams.idDeparture+"/"+$stateParams.idReturn);
                        utilityService.setSuccessData(data.customer,data.customerEmail,data.providerName,data.purchaseId,data.total,data.departureData,data.returnData);
                        $location.path ("/success");
                    })
                    .catch(function(err){
                        console.log(err);
                        vm.msgError = err;
                        vm.errorPayment = true;
                        paymentError();
                    })
            }

            function paymentError() {
                if(vm.errorPayment){
                    $('#error-payment').modal('show');
                }
            }

        }
})();
