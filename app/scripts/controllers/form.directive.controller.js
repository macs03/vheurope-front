(function () {
    'use strict';

    /**
     * @ngdoc function
     * @name vhEurope.controller:MainCtrl
     * @description
     * # MainCtrl
     * Controller of the vhEurope
     */
    angular
        .module('vhEurope')
        .controller('FormDirectiveController', FormDirectiveController)

        FormDirectiveController.$inject =['$scope','utilityService','locationsFactory'];


        function FormDirectiveController ($scope,utilityService,locationsFactory) {

            var vm = this;
            var params = utilityService.getData();
          	vm.origin = params.origin+","+params.countryOrigin;
          	vm.destination = params.destination+","+params.countryDestination;
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
                minDate: moment().format('DD-MM-YYYY'),
                maxDate: moment().add(30, 'days').format('DD-MM-YYYY')
            };

            locationsFactory
                .getAll()
                .then(function (data) {
                    vm.myOptions = data;
                })
                .catch(function (err) {
                    //console.log(err);
                });


        	vm.searchTrips = function () {
                var origin = vm.origin.split(",");
                var destination = vm.destination.split(",");
                if (vm.origin === vm.destination || vm.origin =="" || vm.destination =="" ) {
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
                            utilityService.setData(origin[0],origin[1], destination[0],destination[1], vm.dates.departureDate, vm.dates.returnDate);
                            vm.good = true;

                        }else {
                            vm.good = false;
                        }
                    }else{
                        utilityService.setData(origin[0],origin[1], destination[0],destination[1], vm.dates.departureDate, vm.dates.returnDate);
                        vm.good = true;
                    }
                }
            }


        }
})();
