(function () {
    'use strict';

/**
 * @ngdoc function
 * @name vhEurope.controller:CancelController
 * @description
 * # CancelController
 * Controller of the vhEurope
 */
angular
    .module('vhEurope')
    .controller('CancelController',CancelController);

    CancelController.$inject = ['utilityService','$scope','$rootScope','$interval','$stateParams','$location','cancelFactory','paymentOrderFactory'];

    function CancelController (utilityService, $scope, $rootScope, $interval, $stateParams,$location,cancelFactory,paymentOrderFactory) {
        var vm = this;
        vm.cancelTrip = cancelTrip;
        vm.cancelOk = "";
        paymentOrderFactory
            .getAll($stateParams.uuid)
            .then(function (data) {
                vm.cancelData = data;
            })
            .catch(function (err) {
                console.log(err);
            });

        function cancelTrip(uuid) {
            cancelFactory
                .getAll(uuid)
                .then(function (data) {
                    vm.cancelOk = "OK";
                })
                .catch(function (err) {
                    console.log(err);
                });
        }
    }

})();
