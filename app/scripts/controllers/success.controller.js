(function () {
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
    .controller('SuccessController',SuccessController);

    SuccessController.$inject = ['utilityService','$scope','$rootScope','$interval','$stateParams','$location','apiUrl','sessionStorageService'];

    function SuccessController (utilityService, $scope, $rootScope, $interval, $stateParams,$location,apiUrl,sessionStorageService) {
        var vm = this;
        var successData = sessionStorageService.getSuccessData();
        vm.customer = successData.customer;
        vm.customerEmail = successData.customerEmail;
        vm.providerName = successData.providerName;
        vm.purchaseId = successData.purchaseId;
        vm.total = successData.total;
        vm.departureData = successData.departureData;
        vm.returnData = successData.returnData;
        vm.pdf = apiUrl;
        $rootScope.$broadcast('counterEvent', 1, false);
    }

})();
