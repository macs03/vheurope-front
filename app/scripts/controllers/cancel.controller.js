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
                var departureDate = data.departureData[0].departureDate;
                var returnDate;
                if (data.returnData.length != 0) {
                    returnDate = data.returnData[0].departureDate;
                    var splitReturn = returnDate.split('/');
                    var dateReturn = new Date(splitReturn[2]+'/'+splitReturn[1]+'/'+splitReturn[0]);
                }
                var splitDeparture = departureDate.split('/');
                var dateDeparture = new Date(splitDeparture[2]+'/'+splitDeparture[1]+'/'+splitDeparture[0]);
                var today = new Date();
                if (dateDeparture.getTime() < today.getTime()) {
                    vm.unableCancel = true;
                }
            })
            .catch(function (err) {
                //console.log(err);
            });

        function cancelTrip(uuid) {
            cancelFactory
                .getAll(uuid)
                .then(function (data) {
                    vm.cancelOk = "OK";
                })
                .catch(function (err) {
                    //console.log(err);
                });
        }
    }

})();
