(function() {
    'use strict';

    /**
     * @ngdoc function
     * @name vhEurope.controller:SuccessController
     * @description
     * # SuccessController
     * Controller of the vhEurope
     */
    angular
        .module('vhEurope')
        .controller('SuccessController', SuccessController);

    SuccessController.$inject = ['utilityService', '$scope', '$rootScope', '$interval', '$stateParams', '$location', 'apiUrl', 'sessionStorageService', '$analytics'];

    function SuccessController(utilityService, $scope, $rootScope, $interval, $stateParams, $location, apiUrl, sessionStorageService, $analytics) {
        var vm = this;
        var successData = sessionStorageService.getSuccessData();

        var searchView = true;
        $rootScope.$broadcast('viewEvent', searchView);

        //Eventos Google Analytics
        $analytics.eventTrack('# Passages Departure', {
            category: 'Success',
            label: 'Number of tickets purchased',
            value: successData.departureData[0].seats.length
        });
        $analytics.eventTrack('Bus Company Departure', {
            category: 'Success',
            label: successData.departureData[0].companyName
        });
        $analytics.eventTrack('Trip Duration Departure', {
            category: 'Success',
            label: successData.departureData[0].duration
        });
        $analytics.eventTrack('Type Service Departure', {
            category: 'Success',
            label: successData.departureData[0].typeService
        });

        /*for (var i = 0; i < successData.departureData.seats.length; i++) {
            $analytics.eventTrack('Seat Price Departure', {  category: 'Success', label: 'Price for Seat Number: '+successData.departureData.seats[i].seatNumber, value: successData.departureData.seats[i].price });
        }*/

        if (typeof(successData.returnData[0]) == 'object') {

            $analytics.eventTrack('# Passages Return', {
                category: 'Success',
                label: 'Number of tickets purchased',
                value: successData.returnData[0].seats.length
            });
            $analytics.eventTrack('Bus Company Return', {
                category: 'Success',
                label: successData.returnData[0].companyName
            });
            $analytics.eventTrack('Trip Duration Return', {
                category: 'Success',
                label: successData.returnData[0].duration
            });
            $analytics.eventTrack('Type Service Return', {
                category: 'Success',
                label: successData.returnData[0].typeService
            });

            /*for (var i = 0; i < successData.returnData.seats.length; i++) {
                $analytics.eventTrack('Seat Price Return', {  category: 'Success', label: 'Price for Seat Number: '+successData.returnData.seats[i].seatNumber, value: successData.returnData.seats[i].price });
            }*/

        }

        vm.customer = successData.customer;
        vm.customerEmail = successData.customerEmail;
        vm.providerName = successData.providerName;
        vm.purchaseId = successData.purchaseId;
        vm.total = successData.total;
        vm.departureData = successData.departureData;
        vm.returnData = successData.returnData;
        vm.totalFee = successData.totalFee
        vm.pdf = apiUrl;

        $('.modal-backdrop').hide();
        $('body').removeClass('modal-open');

        $rootScope.$broadcast('counterEvent', 1, false);
    }

})();