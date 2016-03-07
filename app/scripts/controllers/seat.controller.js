(function () {
    'use strict';

/**
 * @ngdoc function
 * @name vhEurope.controller:SeatController
 * @description
 * # SeatController
 * Controller of the vhEurope
 */
angular
    .module('vhEurope')
    .controller('SeatController',SeatController);

    SeatController.$inject = ['travelsFactory','utilityService','$scope','$interval'];

    function SeatController (travelsFactory, utilityService, $scope, $interval) {
        var vm = this;
        var sc, sc2, sc3, sc4;
        vm.seatsSelected = [];
        vm.seatInSelection = {};
        vm.totalSeats = 0;
        vm.totalMount = 0;

        vm.trips = {};
        vm.trips.round = {
        	origin: 'Barcelona', 
        	countryOrigin: 'España', 
        	countryCodeOrigin: 'es', 
        	destination: 'Madrid', 
        	countryDestination: 'España', 
        	countryCodeDestination: 'es',  
        	departureHour: '12:00', 
        	arrivalHour: '23:00', 
        	terminalOrigin: 'Terminal Barajas 14C', 
        	terminalDestination: 'Terminal Madrid 12C', 
        	duration: '10h 23min', 
        	company: 'Alsa', 
        	companyLogo: 'https://www.voyhoy.com/static/images/60x60/new/bus-logo/chile/expreso-norte.jpg',
        	size: 2,
        	seatMap: [
        		[
        			"a[32,32]a[33,33]_a[34,34]",
        			"a[35,35]a[36,36]_a[37,37]",
        			"a[38,38]a[39,39]_a[40,40]",
        			"a[41,41]a[42,42]_a[43,43]"
        		],
        		[
        			"a[01,01]a[02,02]_a[03,03]",
        			"a[04,04]a[05,05]__",
        			"a[06,06]a[07,07]__",
        			"a[08,08]a[09,09]_a[10,10]",
        			"a[11,11]a[12,12]_a[13,13]",
        			"a[14,14]a[15,15]_a[16,16]",
        			"a[17,17]a[18,18]_a[19,19]",
        			"a[20,20]a[21,21]_a[22,22]",
        			"a[23,23]a[24,24]_a[25,25]",
        			"a[26,26]a[27,27]_a[28,28]",
        			"a[29,29]a[30,30]_a[31,31]"
        		]
        	],
        	unavailableSeats: [["32"],["05", "08", "23", "26"]],
        	tripIdFloorOne: 121212,
        	tripIdFloorTwo: 131313,
        	priceFloorOne: 12000,
        	priceFloorTwo: 15000,
        };
        vm.trips.return = {
        	origin: 'Madrid', 
        	countryOrigin: 'España', 
        	countryCodeOrigin: 'es', 
        	destination: 'Barcelona', 
        	countryDestination: 'España', 
        	countryCodeDestination: 'es',  
        	departureHour: '23:00', 
        	arrivalHour: '06:00', 
        	terminalOrigin: 'Terminal Madrid 12C', 
        	terminalDestination: 'Terminal Barajas 14C', 
        	duration: '10h 25min', 
        	company: 'Alsa', companyLogo: 'https://www.voyhoy.com/static/images/60x60/new/bus-logo/chile/expreso-norte.jpg',
        	size: 2,
        	seatMap: [
        		[
        			"a[32,32]a[33,33]_a[34,34]",
        			"a[35,35]a[36,36]_a[37,37]",
        			"a[38,38]a[39,39]_a[40,40]",
        			"a[41,41]a[42,42]_a[43,43]"
        		],
        		[
        			"a[01,01]a[02,02]_a[03,03]",
        			"a[04,04]a[05,05]__",
        			"a[06,06]a[07,07]__",
        			"a[08,08]a[09,09]_a[10,10]",
        			"a[11,11]a[12,12]_a[13,13]",
        			"a[14,14]a[15,15]_a[16,16]",
        			"a[17,17]a[18,18]_a[19,19]",
        			"a[20,20]a[21,21]_a[22,22]",
        			"a[23,23]a[24,24]_a[25,25]",
        			"a[26,26]a[27,27]_a[28,28]",
        			"a[29,29]a[30,30]_a[31,31]"
        		]
        	],
        	unavailableSeats: [["35"],["01", "03", "13", "31"]],
        	tripIdFloorOne: 121212,
        	tripIdFloorTwo: 131313,
        	priceFloorOne: 12000,
        	priceFloorTwo: 15000,
        };

        vm.resetSeatInSelection = function () {
        	vm.seatInSelection = {
	        	name: '',
	        	lastname: '',
	        	country: '',
	        	rut: '',
	        	tripId: '',
	        	floor: 0,
	        	seatNumber: 0
        	};
		};


        vm.addSeat = function () {
        	console.log('SEAT');
  			console.log(vm.seatInSelection);
  			if(vm.seatInSelection.update != true){
  				vm.seatsSelected.push(angular.copy(vm.seatInSelection));
  			}
  			console.log(vm.seatsSelected);
  			$('#formSeat').modal('hide');
  			vm.resetSeatInSelection();
  			vm.updateTotals();
		};

		vm.releaseSeat = function (trip, floor, seatNumber, update) {
			console.log(seatNumber+'-'+trip);
        	if(trip === 0){
        		console.log('IDA');
              	if(floor === 1){
              		sc.status(seatNumber.toString(), 'available');
              	}else{
              		sc2.status(seatNumber.toString(), 'available');
              	}
            }else{
              	console.log('VUELTA');
              	if(floor === 1){
              		sc3.status(seatNumber.toString(), 'available');
              	}else{
              		sc4.status(seatNumber.toString(), 'available');
              	}
            }

            if (update === true){
            	$scope.$apply();
            }
            vm.updateTotals();
            $('#formSeat').modal('hide');
		};

		vm.deleteSeat = function (trip, floor, seatNumber, update) {
			for(var i = vm.seatsSelected.length; i--;) {
           		if(vm.seatsSelected[i].trip === trip && vm.seatsSelected[i].seatNumber === seatNumber) {
              		vm.seatsSelected.splice(i, 1);
              		vm.releaseSeat (trip, floor, seatNumber, update);
              		break;
            	}
        	}
		};

		vm.selectSeat = function (seatNumber, trip, floor, item) {
			//seatNUmber = Numero de asiento
			//trip => 0 = ida, 2= vuelta
			//floor = Numero de piso
			console.log(item);

			if(item != null ){
				vm.seatInSelection = item;
				vm.seatInSelection.update = true;
			}else{

				vm.seatInSelection.seatNumber = seatNumber;
	            vm.seatInSelection.trip = trip;
	            vm.seatInSelection.floor = floor;

				if (trip === 0){
					if(floor === 1){
						vm.seatInSelection.tripId = vm.trips.round.tripIdFloorOne;
						vm.seatInSelection.price = vm.trips.round.priceFloorOne;
					}else{
						vm.seatInSelection.tripId = vm.trips.round.tripIdFloorTwo;
						vm.seatInSelection.price = vm.trips.round.priceFloorTwo;
					}
						
				}else {
					if(floor === 1){
						vm.seatInSelection.tripId = vm.trips.return.tripIdFloorOne;
						vm.seatInSelection.price = vm.trips.return.priceFloorOne;
					}else{
						vm.seatInSelection.tripId = vm.trips.return.tripIdFloorTwo;
						vm.seatInSelection.price = vm.trips.return.priceFloorTwo;
					}
				}
				
				$scope.$apply(); 
			}

            $('#formSeat').modal('show');
		};

		vm.updateTotals = function () {
			vm.totalSeats = 0;
			vm.totalMount = 0;

			for(var i = vm.seatsSelected.length; i--;) {
				vm.totalSeats ++;
				vm.totalMount += vm.seatsSelected[i].price;
        	}
		};

		//jQuery Plugins & Code
    	//Inicializacion de los tabs
        $('#seats-ida a, #seats-vuelta a').click(function (e) {
            e.preventDefault()
            $(this).tab('show')
        });

        $('#formSeat').on('hidden.bs.modal', function (e) {
  			vm.resetSeatInSelection();
		})

        sc = $('#seat-map-1').seatCharts({
        map: vm.trips.round.seatMap[0],
        seats: {
            a: {
                price   : 99.99,
                classes : 'front-seat' //your custom CSS class
            }

        },
        naming : {
                        top : false,
                        left: false
         },
        click: function () {
            if (this.status() == 'available') {
            	var seatNumber = this.settings.label;
            	vm.selectSeat(seatNumber, 0, 1, null);
                //do some stuff, i.e. add to the cart
               return 'selected';
            } else if (this.status() == 'selected') {
            	var seatNumber = this.settings.label;
            	vm.deleteSeat(0, 1, seatNumber, true);
                //seat has been vacated
                return 'available';
            } else if (this.status() == 'unavailable') {
                //seat has been already booked
                return 'unavailable';
            } else {
                return this.style();
            }
        }
    });

    if(vm.trips.round.size === 2){
    	
    	sc2 = $('#seat-map-2').seatCharts({
	        map: vm.trips.round.seatMap[1],
	        seats: {
	            a: {
	                price   : 99.99,
	                classes : 'front-seat' //your custom CSS class
	            }

	        },
	        naming : {
	                        top : false,
	                        left: false
	         },
	        click: function () {
	            if (this.status() == 'available') {
	            	var seatNumber = this.settings.label;
	            	vm.selectSeat(seatNumber, 0, 2, null);
	                //do some stuff, i.e. add to the cart
	               return 'selected';
	            } else if (this.status() == 'selected') {
	            	var seatNumber = this.settings.label;
	            	vm.deleteSeat(0, 2, seatNumber, true);
	                //seat has been vacated
	                return 'available';
	            } else if (this.status() == 'unavailable') {
	                //seat has been already booked
	                return 'unavailable';
	            } else {
	                return this.style();
	            }
	        }
	    });
    }

    if(vm.trips.round.unavailableSeats[1].length > 0){

        $.each(vm.trips.round.unavailableSeats[0], function(index, item){
        	console.log(item);
            sc.status(item.toString(), 'unavailable');
        });

        $.each(vm.trips.round.unavailableSeats[1], function(index, item){
            sc2.status(item.toString(), 'unavailable');
        });
    }else{

        $.each(vm.trips.round.unavailableSeats[0], function(index, item){
            sc.status(item.toString(), 'available');
        });
    }



    sc3 = $('#seat-map-3').seatCharts({
        map: vm.trips.return.seatMap[0],
        seats: {
            a: {
                price   : 99.99,
                classes : 'front-seat' //your custom CSS class
            }

        },
        naming : {
                        top : false,
                        left: false
         },
        click: function () {
            if (this.status() == 'available') {
            	var seatNumber = this.settings.label;
            	vm.selectSeat(seatNumber, 1, 1, null);
                //do some stuff, i.e. add to the cart
               
                return 'selected';
            } else if (this.status() == 'selected') {
            	var seatNumber = this.settings.label;
            	vm.deleteSeat(1, 1, seatNumber, true);
                //seat has been vacated
                return 'available';
            } else if (this.status() == 'unavailable') {
                //seat has been already booked
                return 'unavailable';
            } else {
                return this.style();
            }
        }
    });

    if(vm.trips.return.size === 2){
    	
    	sc4 = $('#seat-map-4').seatCharts({
	        map: vm.trips.round.seatMap[1],
	        seats: {
	            a: {
	                price   : 99.99,
	                classes : 'front-seat' //your custom CSS class
	            }

	        },
	        naming : {
	                        top : false,
	                        left: false
	         },
	        click: function () {
	            if (this.status() == 'available') {
	            	var seatNumber = this.settings.label;
	            	vm.selectSeat(seatNumber, 1, 2, null);
	                //do some stuff, i.e. add to the cart
	               return 'selected';
	            } else if (this.status() == 'selected') {
	            	var seatNumber = this.settings.label;
	            	vm.deleteSeat(1, 2, seatNumber, true);
	                //seat has been vacated
	                return 'available';
	            } else if (this.status() == 'unavailable') {
	                //seat has been already booked
	                return 'unavailable';
	            } else {
	                return this.style();
	            }
	        }
	    });
    }

    if(vm.trips.return.unavailableSeats[1].length > 0){

        $.each(vm.trips.return.unavailableSeats[0], function(index, item){
        	console.log(item);
            sc3.status(item.toString(), 'unavailable');
        });

        $.each(vm.trips.return.unavailableSeats[1], function(index, item){
            sc4.status(item.toString(), 'unavailable');
        });
    }else{

        $.each(vm.trips.return.unavailableSeats[0], function(index, item){
            sc3.status(item.toString(), 'available');
        });
    }

}


})();



