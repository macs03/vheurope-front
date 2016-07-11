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

        PaymentController.$inject = ['$scope','utilityService','paymentFactory','$stateParams','$location','$rootScope','sessionStorageService'];

        function PaymentController ($scope, utilityService, paymentFactory,$stateParams,$location,$rootScope,sessionStorageService) {

            var vm = this;
            // La informacion de inicializacion debe ser obtenida a traves de un servicio
            vm.pay = {
                total: 23000
            };

            vm.promo = {
                code: ''
            };
            vm.paying = paying;
            vm.showConfirmModal = showConfirmModal;
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

            var paymentData = sessionStorageService.getPayment();;

            vm.totalWithDiscount = paymentData.totalPrice;
            vm.totalFee = paymentData.totalFee,
            vm.totalPayment = paymentData.totalPayment;
            vm.departureData = paymentData.departure;
            vm.returnData = paymentData.returns;
            vm.isRoundTrip = false;
            if (vm.returnData.length > 0){
                if(vm.returnData[0].hasOwnProperty('company')){
                     vm.isRoundTrip = true;
                }
            }

            var payer = sessionStorageService.getPayer();
            if (payer != undefined) {
                vm.pay.name = payer.name;
                vm.pay.lastname = payer.lastname;
                vm.pay.dni = payer.dni;
                vm.pay.email = payer.email;
            }

            vm.validatePromo = function(){
                //console.log('Agregar logica de validacion de promociones');
            }; 

            vm.validatePayment = function(){
                //console.log('Agregar logica de validacion de pago');
            };

            function paying(name,lastname,dni,email,card,month,year,cvv) {
                $rootScope.$broadcast('counterEvent', 1, false);
                paymentFactory
                    .getAll($stateParams.idDeparture,$stateParams.idReturn,name,lastname,dni,email,card,month,year,cvv)
                    .then(function(data){
                        //$location.path ("/payment/"+$stateParams.idDeparture+"/"+$stateParams.idReturn);
                        utilityService.setSuccessData(data.customer,data.customerEmail,data.providerName,data.purchaseId,data.total,data.departureData,data.returnData);
                        sessionStorageService.setSuccessData(data.customer,data.customerEmail,data.providerName,data.purchaseId,data.total,data.departureData,data.returnData,data.totalFee);
                        $('#confirm-payment').modal('hide');
                        $location.path ("/success");
                    })
                    .catch(function(err){
                        $('#confirm-payment').modal('hide');
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

            function showConfirmModal() {
                if (vm.pay.name != undefined && vm.pay.lastname != undefined && vm.pay.dni != undefined && vm.pay.email != undefined && vm.pay.card != undefined && vm.pay.month != undefined && vm.pay.year != undefined && vm.pay.cvv != undefined ) {
                    $('#confirm-payment').modal('show');
                }else{
                    alertify.logPosition("bottom left");
                    alertify.log("Revise los campos del formulario de pago");
                }
            }

        }
})();
