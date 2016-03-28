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

    SuccessController.$inject = ['utilityService','$scope','$rootScope','$interval','$stateParams','$location','apiUrl'];

    function SuccessController (utilityService, $scope, $rootScope, $interval, $stateParams,$location,apiUrl) {
        var vm = this;
        var successData = utilityService.getSuccessData();
        vm.customer = successData.customer;
        vm.customerEmail = successData.customerEmail;
        vm.providerName = successData.providerName;
        vm.purchaseId = successData.purchaseId;
        vm.total = successData.total;
        vm.departureData = successData.departure;
        vm.returnData = successData.returns;
        vm.pdf = apiUrl;
        $rootScope.$broadcast('counterEvent', 1, false);
    }

})();
