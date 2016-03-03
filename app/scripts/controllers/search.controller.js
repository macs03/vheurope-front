'use strict';

/**
 * @ngdoc function
 * @name vhEurope.controller:SearchController
 * @description
 * # SearchController
 * Controller of the vhEurope
 */
angular
    .module('vhEurope')
    .controller('SearchController',SearchController);

    SearchController.$inject =['travelsFactory','utilityService','$scope','$interval','$routeParams'];

    function SearchController (travelsFactory,utilityService,$scope,$interval,$routeParams) {
        var vm = this;
        //vm.searchTrip = searchTrip;
        vm.searching = false;
        vm.error = false;


       vm.priceSlider = {
            price: 100,
            options: {
                showSelectionBar: true,
                translate: function(value) {
                    return '€' + value;
                }
            }
        };

        var indexParams = utilityService.getData();

        
        if(indexParams.origin){
            vm.results = false;
            vm.trips = [];
            vm.searching = true;
            vm.error = false;
            travelsFactory
                .getAll(indexParams.origin,indexParams.destination,indexParams.departure,indexParams.returns,indexParams.passengers)
                .then(function(data){
                    vm.trips = data;
                    vm.searching = false;
                    vm.results = true;
                })
                .catch(function(err){
                    console.log(err);
                    vm.searching = false;
                    vm.error = true;
                    vm.msgError = err;
                })

        }
    }
