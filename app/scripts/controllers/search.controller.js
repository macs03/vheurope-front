'use strict';

/**
 * @ngdoc function
 * @name vhEurope.controller:SearchController
 * @description
 * # SearchController
 * Controller of the vhEurope
 */
angular.module('vhEurope')

    .controller('SearchController',SearchController);
    SearchController.$inject =['travelsFactory','utilityService','$scope','$interval'];

    function SearchController (travelsFactory,utilityService,$scope,$interval) {
        var vm = this;
        vm.searchTrip = searchTrip;
        vm.searching = false;
        vm.error = false;
        var indexParams = utilityService.getData();
        var search = $interval(function () {
            indexParams = utilityService.getData()
            searchTrip();
        }, 1000);

        function searchTrip() {
            if(indexParams.origin){
                vm.trips = [];
                vm.searching = true;
                vm.error = false;
                travelsFactory
                    .getAll(indexParams.origin,indexParams.destination,indexParams.departure,indexParams.returns,indexParams.passengers)
                    .then((data)=>{
                        vm.trips = data;
                        vm.searching = false;
                    })
                    .catch((err)=>{
                        console.log(err);
                        vm.searching = false;
                        vm.error = true;
                        vm.msgError = err;
                    })
                utilityService.setData(null,null,null,null);
                indexParams = null;
            }
        }
    }
