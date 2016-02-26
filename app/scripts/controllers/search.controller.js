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
    SearchController.$inject =['travelsFactory','$scope'];

    function SearchController (travelsFactory,$scope) {
        var vm = this;
        vm.searchTrip = searchTrip;
        vm.searching = false;
        vm.error = false;

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
            })
    }
    }
