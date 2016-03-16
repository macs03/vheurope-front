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

    SeatController.$inject = ['travelsFactory','utilityService','seatsFactory','reserveFactory','$scope','$interval','$stateParams','$location'];

    function SeatController (travelsFactory, utilityService, seatsFactory, reserveFactory, $scope, $interval, $stateParams,$location) {
        var vm = this;
        var sc, sc2, sc3, sc4;
        vm.seatsSelectedDeparture = [];
        vm.seatsSelectedReturn = [];
        vm.seatInSelection = {};
        vm.isLoading = true;
        vm.totalSeats = 0;
        vm.totalMount = 0;
        vm.trips = {};
        vm.reserve = reserve;
        vm.errorSeat = false;
        vm.errorReserve = false;
        vm.selectDepartureSeat = true;

        seatsFactory
            .getAll($stateParams.idDeparture,$stateParams.idReturn)
            .then(function (data) {
                vm.isLoading = false;
                console.log(data);
                vm.trips.isRoundTrip = data.isRoundTrip;
                vm.trips.round = data.departure;
                vm.trips.return = data.return;
                console.log(vm.trips.round);
                console.log(vm.trips.return);
                vm.passengers = data.totalPeople;
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
                vm.msgError = err;
                vm.errorSeat = true;
                seatError();
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
                console.log(vm.seatInSelection.trip);
                if(vm.seatInSelection.trip === 0){
                    console.log("Departure");
                    vm.seatsSelectedDeparture.push(angular.copy(vm.seatInSelection));
                    vm.selectDepartureSeat = false;
                    if($stateParams.idReturn == "-1"){
                        vm.resetSeatInSelection();
                        if(vm.seatsSelectedDeparture.length == vm.passengers){
                            console.log("se llenaron los asientos");
                            vm.allSeats = true;
                        }
                    }
                }
                if(vm.seatInSelection.trip === 1){
                    console.log("return");
                    vm.seatsSelectedReturn.push(angular.copy(vm.seatInSelection));
                    vm.selectDepartureSeat = true;
                    vm.resetSeatInSelection();
                    if(vm.seatsSelectedDeparture.length == vm.passengers){
                        console.log("se llenaron los asientos");
                        vm.allSeats = true;
                    }
                }
  			}
  			console.log(vm.seatsSelectedDeparture);
            console.log(vm.seatsSelectedReturn);
  			$('#formSeat').modal('hide');
  			vm.updateTotals();
		};

		vm.releaseSeat = function (trip, floor, seatNumber, update) {
            if($stateParams.idReturn != "-1"){
                console.log(seatNumber+'-'+trip);
                vm.selectDepartureSeat = true;
                vm.allSeats = false;
                console.log(vm.seatsSelectedDeparture.length);
                console.log(vm.seatsSelectedReturn.length);
                for (var i = 0; i < trip.length; i++) {
                    if(trip[i] === 0){
                        console.log('IDA');
                        if(floor[i] === 1){
                            sc.status(seatNumber[i].toString(), 'available');
                        }else{
                            sc2.status(seatNumber[i].toString(), 'available');
                        }
                    }else{
                        console.log('VUELTA');
                        if(floor[i] === 1){
                            sc3.status(seatNumber[i].toString(), 'available');
                        }else{
                            sc4.status(seatNumber[i].toString(), 'available');
                        }
                    }
                }
            }else{
                console.log(seatNumber+'-'+trip);
                vm.selectDepartureSeat = true;
                vm.allSeats = false;
                console.log(vm.seatsSelectedDeparture.length);
                console.log(vm.seatsSelectedReturn.length);
            	if(trip === 0){
            		console.log('IDA');
                  	if(floor === 1){
                  		sc.status(seatNumber.toString(), 'available');
                  	}else{
                  		sc2.status(seatNumber.toString(), 'available');
                  	}
                }
            }
            if (update === true){
            	$scope.$apply();
            }
            vm.updateTotals();
            $('#formSeat').modal('hide');
		};

		vm.deleteSeat = function (trip, floor, seatNumber, update) {
            if($stateParams.idReturn != "-1"){
                var trips = [];
                var floors = [];
                var seatNumbers = [];
    			for(var i = vm.seatsSelectedDeparture.length; i--;) {
                    for(var j = vm.seatsSelectedReturn.length; j--;) {
                        if (j === i){
                            if(vm.seatsSelectedReturn[j].trip === trip && vm.seatsSelectedReturn[j].seatNumber === seatNumber) {
                                trips = [trip,vm.seatsSelectedDeparture[j].trip];
                                floors = [floor,vm.seatsSelectedDeparture[j].floor];
                                seatNumbers = [seatNumber,vm.seatsSelectedDeparture[j].seatNumber];
                                vm.seatsSelectedReturn.splice(j, 1);
                                vm.seatsSelectedDeparture.splice(j, 1);
                                vm.releaseSeat (trips, floors, seatNumbers, update);
                                break;
                            }
                            if(vm.seatsSelectedDeparture[i].trip === trip && vm.seatsSelectedDeparture[i].seatNumber === seatNumber) {
                                trips = [trip,vm.seatsSelectedReturn[i].trip];
                                floors = [floor,vm.seatsSelectedReturn[i].floor];
                                seatNumbers = [seatNumber,vm.seatsSelectedReturn[j].seatNumber];
                                vm.seatsSelectedReturn.splice(i, 1);
                                vm.seatsSelectedDeparture.splice(i, 1);
                                vm.releaseSeat (trips, floors, seatNumbers, update);
                                break;
                            }
                        }

                    }
            	}
            }else{
                for(var i = vm.seatsSelectedDeparture.length; i--;) {
                    if(vm.seatsSelectedDeparture[i].trip === trip && vm.seatsSelectedDeparture[i].seatNumber === seatNumber) {
                    	vm.seatsSelectedDeparture.splice(i, 1);
                    	vm.releaseSeat (trip, floor, seatNumber, update);
                    	break;
                    }
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
                $('#formSeat').modal('show');
                vm.selectDepartureSeat = true
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
					$('#formSeat').modal('show');
				}else {
					if(floor === 1){
						vm.seatInSelection.tripId = vm.trips.return.tripIdFloorOne;
						vm.seatInSelection.price = vm.trips.return.priceFloorOne;
					}else{
						vm.seatInSelection.tripId = vm.trips.return.tripIdFloorTwo;
						vm.seatInSelection.price = vm.trips.return.priceFloorTwo;
					}
                    vm.addSeat();
				}

				$scope.$apply();
			}
		};

		vm.updateTotals = function () {
			vm.totalSeats = 0;
			vm.totalMount = 0;

			for(var i = vm.seatsSelectedDeparture.length; i--;) {
				vm.totalSeats ++;
				vm.totalMount += vm.seatsSelectedDeparture[i].price;
        	}

            for(var i = vm.seatsSelectedReturn.length; i--;) {
				vm.totalSeats ++;
				vm.totalMount += vm.seatsSelectedReturn[i].price;
        	}
		};

        function reserve() {
            reserveFactory
                .getAll(vm.seatsSelectedDeparture,vm.seatsSelectedReturn,$stateParams.idDeparture,$stateParams.idReturn)
                .then(function(data){
                    utilityService.setPaymentData(data.idIda,data.idVuelta,data.totalPayment,data.departure,data.return);
                    $location.path ("/payment/"+$stateParams.idDeparture+"/"+$stateParams.idReturn);
                })
                .catch(function(err){
                    console.log(err);
                    vm.msgErrorReserve = err;
                    vm.errorReserve = true;
                    reserveError();
                })
        }

		//jQuery Plugins & Code
    	//Inicializacion de los tabs
        $('#seats-ida a, #seats-vuelta a').click(function (e) {
            e.preventDefault()
            $(this).tab('show')
        });

        $('#formSeat').on('hidden.bs.modal', function (e) {
  			//vm.resetSeatInSelection();
		})

        $('.country').countrySelector({
            language: 'ES'
        });

        function seatError() {
            if(vm.errorSeat){
                $('#error-seat').modal('show');
            }
        }

        function reserveError() {
            if(vm.errorReserve){
                $('#error-reserve').modal('show');
            }
        }

        /*

    
    */

}


})();
