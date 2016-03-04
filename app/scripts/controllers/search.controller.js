(function () {
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

        SearchController.$inject =['locationsFactory','travelsFactory','utilityService','$scope','$interval','$routeParams'];

        function SearchController (locationsFactory,travelsFactory,utilityService,$scope,$interval,$routeParams) {
            var vm = this;
            //vm.searchTrip = searchTrip;
            vm.searching = false;
            vm.error = false;
            vm.order = order;
            vm.type = 'price';
            vm.reverse = true;

            vm.myOptions = [];
        	vm.myConfig = {
          		//create: true,
          		valueField: 'label',
          		labelField: 'label',
                searchField: ['label'],
          		delimiter: '|',
          		placeholder: 'Pick something',
          		onInitialize: function(selectize){
            		// receives the selectize object as an argument
          		},
          		maxItems: 1
        	};
            vm.dates = {
                departureDate: moment().format('DD/MM/YYYY'),
                returnDate: '',
                minDate: moment().format('MM-DD-YYYY'),
                maxDate: moment().add(30, 'days').format('MM-DD-YYYY')
            };

           vm.priceSlider = {
                price: 100,
                options: {
                    showSelectionBar: true,
                    translate: function(value) {
                        return '€' + value;
                    }
                }
            };

            locationsFactory
                .getAll()
                .then(function (data) {
                    vm.myOptions = data;
                })
                .catch(function (err) {
                    console.log(err);
                });

            var params = utilityService.getData();
          	vm.origin = params.origin+","+params.countryOrigin;
          	vm.destination = params.destination+","+params.countryDestination;
            vm.countryOrigin = params.countryOrigin;
            vm.countryDestination = params.countryDestination;

            if(params.origin){
                vm.results = false;
                vm.trips = [];
                vm.searching = true;
                vm.error = false;
                travelsFactory
                    .getAll(params.origin,params.destination,params.departure,params.returns,params.passengers)
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

            function order(type) {
                if(vm.type === type) {
                     vm.reverse =!vm.reverse
                } else{
                    vm.reverse = false
                }
                vm.type = type;
            }
        }
})();
