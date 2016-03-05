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

    SearchController.$inject = ['travelsFactory','utilityService','$scope','$interval'];

    function SeatController (travelsFactory, utilityService, $scope, $interval) {
        var vm = this;
        var sc, sc2, sc3, sc4;
        
        vm.seatsSelected = [];

        //Inicializo objeto seat
        vm.selectSeat = {
        	name: '',
        	lastname: '',
        	tripId: '',
        	floor: 'algo',
        	seatNumber: 0
        };

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
        		"a[01,01]a[02,02]_a[03,03]a[04,04]",
            	"a[05,05]a[06,06]_a[07,07]a[08,08]",
            	"a[09,09]a[10,10]_a[11,11]a[12,12]",
            	"a[13,13]a[14,14]_a[15,15]a[16,16]",
            	"a[17,17]a[18,18]_a[19,19]a[20,20]",
            	"a[21,21]a[22,22]_a[23,23]a[24,24]",
            	"a[25,25]a[26,26]_a[27,27]a[28,28]",
            	"a[29,29]a[30,30]_a[31,31]a[32,32]",
            	"a[33,33]a[34,34]_a[35,35]a[36,36]",
            	"a[37,37]a[38,38]_a[39,39]a[40,40]",
            	"a[41,41]a[42,42]_a[43,43]a[44,44]",
            	"a[45,45]a[46,46]_a[47,47]a[48,48]"
        	],
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
        		"a[01,01]a[02,02]_a[03,03]a[04,04]",
            	"a[05,05]a[06,06]_a[07,07]a[08,08]",
            	"a[09,09]a[10,10]_a[11,11]a[12,12]",
            	"a[13,13]a[14,14]_a[15,15]a[16,16]",
            	"a[17,17]a[18,18]_a[19,19]a[20,20]",
            	"a[21,21]a[22,22]_a[23,23]a[24,24]",
            	"a[25,25]a[26,26]_a[27,27]a[28,28]",
            	"a[29,29]a[30,30]_a[31,31]a[32,32]",
            	"a[33,33]a[34,34]_a[35,35]a[36,36]",
            	"a[37,37]a[38,38]_a[39,39]a[40,40]",
            	"a[41,41]a[42,42]_a[43,43]a[44,44]",
            	"a[45,45]a[46,46]_a[47,47]a[48,48]"
        	],
        	tripIdFloorOne: 121212,
        	tripIdFloorTwo: 131313,
        	priceFloorOne: 12000,
        	priceFloorTwo: 15000,
        };

         

        vm.addSeat = function () {
        	console.log('SEAT');
  			console.log(vm.selectSeat);
  			vm.seatsSelected.push(vm.selectSeat);
  			console.log(vm.seatsSelected);
		};

		vm.selectSeat2 = function (seatNumber, trip, floor) {
			//seatNUmber = Numero de asiento
			//trip => 0 = ida, 2= vuelta
			//floor = Numero de piso

			vm.selectSeat.seatNumber = seatNumber;
            vm.selectSeat.trip = trip;
            vm.selectSeat.floor = floor;
			if (trip === 0 && floor === 1){
				if(floor === 1){
					vm.selectSeat.tripId = vm.trips.round.tripIdFloorOne;
				}else{
					vm.selectSeat.tripId = vm.trips.round.tripIdFloorTwo;
				}
					
			}else {
				if(floor === 1){
					vm.selectSeat.tripId = vm.trips.return.tripIdFloorOne;
				}else{
					vm.selectSeat.tripId = vm.trips.return.tripIdFloorTwo;
				}
			}
            

            $('#formSeat').modal('show');

		};


    	//Inicializacion de los tabs
        $('#seats-ida a, #seats-vuelta a').click(function (e) {
            e.preventDefault()
            $(this).tab('show')
        });

        sc = $('#seat-map-1').seatCharts({
        map: vm.trips.round.seatMap,
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
            	vm.selectSeat2(seatNumber, 0, 1);
                //do some stuff, i.e. add to the cart
               

                
                return 'selected';
            } else if (this.status() == 'selected') {
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



