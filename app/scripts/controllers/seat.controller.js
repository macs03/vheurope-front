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

    SeatController.$inject = ['travelsFactory','utilityService','seatsFactory','reserveFactory','$scope','$interval','$routeParams','$location'];

    function SeatController (travelsFactory, utilityService, seatsFactory, reserveFactory, $scope, $interval, $routeParams,$location) {
        var vm = this;
        var sc, sc2, sc3, sc4;
        vm.seatsSelected = [];
        vm.seatInSelection = {};
        vm.isLoading = true;
        vm.totalSeats = 0;
        vm.totalMount = 0;
        vm.trips = {};
        vm.reserve = reserve;

        seatsFactory
            .getAll($routeParams.idDeparture,$routeParams.idReturn)
            .then(function (data) {
                vm.isLoading = false;
                console.log(data);
                vm.trips.isRoundTrip = data.isRoundTrip;
                vm.trips.round = data.departure;
                vm.trips.return = data.return;
                console.log(vm.trips.round);
                console.log(vm.trips.return);

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
                            var seatNumber = this.settings.id;
                            var seatLabel = this.settings.label;
                            vm.selectSeat(seatNumber, seatLabel, 0, 1, null);
                            //do some stuff, i.e. add to the cart
                           return 'selected';
                        } else if (this.status() == 'selected') {
                            var seatNumber = this.settings.id;
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
                                var seatNumber = this.settings.id;
                                var seatLabel = this.settings.label;
                                vm.selectSeat(seatNumber, seatLabel, 0, 2, null);
                                //do some stuff, i.e. add to the cart
                               return 'selected';
                            } else if (this.status() == 'selected') {
                                var seatNumber = this.settings.id;
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

                //Elimino los asientos ocupados
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
                        
                        sc.status(item.toString(), 'unavailable');
                    });
                } 

                if(vm.trips.isRoundTrip){

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
                                var seatNumber = this.settings.id;
                                var seatLabel = this.settings.label;
                                vm.selectSeat(seatNumber, seatLabel,  1, 1, null);
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
                                    var seatNumber = this.settings.id;
                                    var seatLabel = this.settings.label;
                                    vm.selectSeat(seatNumber, seatLabel, 1, 2, null);

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
                            sc3.status(item.toString(), 'unavailable');
                        });
                    }

                }


            })
            .catch(function (err) {
                console.log(err);
            });

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

		vm.selectSeat = function (seatNumber, seatLabel, trip, floor, item) {
			//seatNUmber = Numero de asiento
			//trip => 0 = ida, 2= vuelta
			//floor = Numero de piso
			console.log(item);

			if(item != null ){
				vm.seatInSelection = item;
				vm.seatInSelection.update = true;
			}else{

				vm.seatInSelection.seatNumber = seatNumber;
                vm.seatInSelection.seatLabel = seatLabel;
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

        function reserve() {
            reserveFactory
                .getAll(vm.seatsSelected,$routeParams.idDeparture,$routeParams.idReturn)
                .then(function(data){
                    $location.path ("/payment")
                })
                .catch(function(err){
                    console.log(err);
                })
        }

		//jQuery Plugins & Code
    	//Inicializacion de los tabs
        $('#seats-ida a, #seats-vuelta a').click(function (e) {
            e.preventDefault()
            $(this).tab('show')
        });

        $('#formSeat').on('hidden.bs.modal', function (e) {
  			vm.resetSeatInSelection();
		})

        /*

    
    */

}


})();



