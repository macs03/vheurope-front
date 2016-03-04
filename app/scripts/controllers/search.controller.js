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
            vm.searchTrip = searchTrip;
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

            $scope.$watch('search.origin', function(newVal, oldVal){
                if (newVal != oldVal && newVal != undefined) {
                    console.log('changed '+oldVal+" to "+newVal);
                    searchTrip();
                }
            }, true);
            $scope.$watch('search.destination', function(newVal, oldVal){
                if (newVal != oldVal && newVal != undefined) {
                    console.log('changed '+oldVal+" to "+newVal);
                    searchTrip();
                }
            }, true);
            $scope.$watch('search.dates.departureDate', function(newVal, oldVal){
                if (newVal != oldVal && newVal != undefined) {
                    console.log('changed '+oldVal+" to "+newVal);
                    searchTrip();
                }
            }, true);
            $scope.$watch('search.dates.returnDate', function(newVal, oldVal){
                if (newVal != oldVal && newVal != undefined) {
                    console.log('changed '+oldVal+" to "+newVal);
                    searchTrip();
                }
            }, true);

            function searchTrip() {
                console.log("vamos a buscar");
                var origin = vm.origin.split(",");
                var destination = vm.destination.split(",");
                if (vm.origin === vm.destination || vm.origin =="" || vm.destination =="" ) {
                    console.log("error cities");
                    vm.good = false;
                } else {
                    if(vm.dates.returnDate=="Invalid date" || vm.dates.returnDate==undefined) vm.dates.returnDate=""

                    if (vm.dates.returnDate != "" && vm.dates.returnDate!="Invalid date") {
                        var date1 = vm.dates.departureDate;
                        var date2 = vm.dates.returnDate;
                        var vD1 = date1.split("/")
                        var vD2 = date2.split("/")
                        var newDate1 = new Date(vD1[2],vD1[1],vD1[0]);
                        var newDate2 = new Date(vD2[2],vD2[1],vD2[0]);

                        if ( newDate1 <= newDate2) {
                            callSearch(origin[0],destination[0],vm.dates.departureDate,vm.dates.returnDate);
                            vm.good = true;

                        }else {
                            console.log("error dates");
                            vm.good = false;
                        }
                    }else{
                        callSearch(origin[0],destination[0],vm.dates.departureDate,vm.dates.returnDate);
                        vm.good = true;
                    }
                }

            }

            function callSearch(origin,destination,departureDate,returnDate) {
                vm.results = false;
                vm.trips = [];
                vm.searching = true;
                vm.error = false;
                travelsFactory
                    .getAll(origin,destination,departureDate,returnDate,1)
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
})();
