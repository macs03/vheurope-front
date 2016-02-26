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
    SearchController.$inject =['travelsFactory','utilityService','$scope'];

    function SearchController (travelsFactory,utilityService,$scope) {
        var vm = this;
        vm.searchTrip = searchTrip;
        vm.searching = false;
        vm.error = false;
        var indexParams = utilityService.getData();

        //params from index view
        if(indexParams.origin){
            vm.trips = [];
            vm.searching = true;
            vm.error = false;
            travelsFactory
                .getAll(indexParams.origin,indexParams.destiny,indexParams.departure,indexParams.returns,indexParams.passengers)
                .then((data)=>{
                    vm.trips = data;
                    vm.searching = false;
                })
                .catch((err)=>{
                    console.log(err)
                    vm.searching = false;
                    vm.error = true;
                })
        }

        //params from search view
        function searchTrip() {
            vm.trips = [];
            vm.searching = true;
            vm.error = false;
            travelsFactory
                .getAll(vm.origen,vm.destino,vm.ida,vm.vuelta,vm.pasajeros)
                .then((data)=>{
                    vm.trips = data;
                    vm.searching = false;
                })
                .catch((err)=>{
                    console.log(err)
                    vm.searching = false;
                    vm.error = true;
                    vm.msgError = err;
                })
        }
    }
