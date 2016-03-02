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
    .controller('MainController', MainController)

    MainController.$inject =['$scope','utilityService','locationsFactory'];


    function MainController ($scope,utilityService,locationsFactory) {

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
            minDate: moment().format('MM-DD-YYYY'),
            maxDate: moment().add(30, 'days').format('MM-DD-YYYY')
        };

        locationsFactory
            .getAll()
            .then(function (data) {
                vm.myOptions = data;
            })
            .catch(function (err) {
                console.log(err);
            });


    	vm.searchTrips = function () {
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
                        console.log(vm.origin);
                    	console.log(vm.destination);
                    	console.log('departure: '+vm.dates.departureDate);
                        console.log('returns: '+vm.dates.returnDate);
                        utilityService.setData(origin[0],origin[1], destination[0],destination[1], vm.dates.departureDate, vm.dates.returnDate);
                        vm.good = true;

                    }else {
                        console.log("error dates");
                        vm.good = false;
                    }
                }else{
                    console.log(vm.origin);
                	console.log(vm.destination);
                	console.log('departure: '+vm.dates.departureDate);
                    console.log('returns: '+vm.dates.returnDate);
                    utilityService.setData(origin[0],origin[1], destination[0],destination[1], vm.dates.departureDate, vm.dates.returnDate);
                    vm.good = true;
                }
            }
        }

   	    $('.header-home.spain').attr('style','background: url("https://dl.dropboxusercontent.com/u/993466/voyhoy/gugenheim.png") no-repeat center center fixed; background-size: cover;');

    }
