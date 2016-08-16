(function() {
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
        .controller('SeatController', SeatController);

    SeatController.$inject = ['travelsFactory', 'utilityService', 'countryService', 'seatsFactory', 'reserveFactory', '$scope', '$interval', '$stateParams', '$location', '$rootScope', 'sessionStorageService', '$timeout', '$analytics'];

    function SeatController(travelsFactory, utilityService, countryService, seatsFactory, reserveFactory, $scope, $interval, $stateParams, $location, $rootScope, sessionStorageService, $timeout, $analytics) {
        var vm = this;
        var sc, sc2, sc3, sc4, sc5, sc6, sc7, sc8;

        var searchView = true;
        $rootScope.$broadcast('viewEvent', searchView);

        vm.seatsSelectedDeparture = [];
        vm.seatsSelectedDeparture2 = [];
        vm.seatsSelectedReturn = [];
        vm.seatsSelectedReturn2 = [];
        vm.seatInSelection = {};
        vm.isLoading = true;
        vm.totalSeats = 0;
        vm.totalMount = 0;
        vm.trips = {};
        vm.reserve = reserve;
        vm.errorSeat = false;
        vm.errorReserve = false;
        vm.sourceSeat = ""

        if (utilityService.getLang() == 'es') {
            vm.cnames_es = countryService.country_es();
        } else if (utilityService.getLang() == 'en') {
            vm.cnames_es = countryService.country_en();
        } else {
            vm.cnames_es = countryService.country_fr();
        }

        vm.selectDepartureSeat = true;
        vm.validateDni = validateDni;

        vm.selectSeatAutomatic = selectSeatAutomatic;

        seatsFactory
            .getAll($stateParams.idDeparture, $stateParams.idReturn)
            .then(function(data) {
                vm.isLoading = false;
                vm.trips.isRoundTrip = data.isRoundTrip;
                vm.trips.round = data.departure;
                vm.trips.return = data.return;
                vm.sourceSeat = data.source;
                vm.hasBoat = data.hasBoat;
                vm.ageCategories = data.ageCategories;
                vm.genders = data.genders;
                vm.docTypes = data.docTypes;
                var title = "Resertrip " + data.departure[0].origin + "-" + data.departure[0].destination;
                $rootScope.$broadcast('titleEvent', title);
                vm.passengers = data.totalPeople;
                vm.autoPassengers = vm.passengers - 1;
                for (var i = 0; i < vm.trips.round.length; i++) {
                    if (vm.trips.round[i].automaticSeat) {
                        vm.roundSeats = [];
                        var seatAuto = {};
                        for (var j = 0; j < vm.trips.round[i].seatMap.length; j++) {
                            var seatsRound = vm.trips.round[i].seatMap[j]
                            var split1 = seatsRound.split('[');
                            var split2 = split1[1].split(']');
                            var split3 = split2[0].split(',');
                            seatAuto.label = split3[1];
                            seatAuto.number = split3[0];
                            vm.roundSeats.push(seatAuto);
                        }

                    }
                }
                for (var i = 0; i < vm.trips.return.length; i++) {
                    if (vm.trips.return[i].automaticSeat) {
                        vm.returnSeats = [];
                        var seatAuto = {};
                        for (var j = 0; j < vm.trips.return[i].seatMap.length; j++) {
                            var seatsReturn = vm.trips.return[i].seatMap[0]
                            var split1 = seatsReturn.split('[');
                            var split2 = split1[1].split(']');
                            var split3 = split2[0].split(',');
                            seatAuto.label = split3[1];
                            seatAuto.number = split3[0];
                            vm.returnSeats.push(seatAuto);
                        }
                    }
                }
                var len = vm.trips.round.length;
                var len2 = vm.trips.return.length;
                if (len == 1) {
                    vm.tramos = true;

                } else if (len == 2) {
                    vm.tramos = false;
                }
                if (len2 == 1) {
                    vm.tramos2 = true;

                } else if (len2 == 2) {
                    vm.tramos2 = false;
                }
                sc = $('#seat-map-' + 0).seatCharts({
                    map: vm.trips.round[0].seatMap,
                    seats: {
                        a: {
                            price: 99.99,
                            classes: 'front-seat' //your custom CSS class
                        }

                    },
                    naming: {
                        top: false,
                        left: false
                    },
                    click: function() {
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

                if (vm.trips.round[0].automaticSeat) {

                    sc2 = $('#seat-map-2-' + 0).seatCharts({
                        map: vm.trips.round[0].seatMap,
                        seats: {
                            a: {
                                price: 99.99,
                                classes: 'front-seat' //your custom CSS class
                            }

                        },
                        naming: {
                            top: false,
                            left: false
                        },
                        click: function() {
                            if (this.status() == 'available') {
                                var seatNumber = this.settings.id;
                                var seatLabel = this.settings.label;
                                vm.selectSeat(seatNumber, seatLabel, 0, 2, null);

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

                //Elimino los asientos ocupados
                if (vm.trips.round[0].unavailableSeats.length > 0) {

                    $.each(vm.trips.round[0].unavailableSeats, function(index, item) {
                        sc.status(item.toString(), 'unavailable');
                    });
                    if (vm.trips.round[0].automaticSeat) {
                        $.each(vm.trips.round[0].unavailableSeats, function(index, item) {
                            sc2.status(item.toString(), 'unavailable');
                        });
                    }
                } else {

                    $.each(vm.trips.round[0].unavailableSeats, function(index, item) {

                        sc.status(item.toString(), 'unavailable');
                    });
                }
                if (vm.trips.round.length > 1) {
                    sc3 = $('#seat-map-' + 1).seatCharts({
                        map: vm.trips.round[1].seatMap,
                        seats: {
                            a: {
                                price: 99.99,
                                classes: 'front-seat' //your custom CSS class
                            }

                        },
                        naming: {
                            top: false,
                            left: false
                        },
                        click: function() {
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

                    if (vm.trips.round[1].size === 2) {

                        sc4 = $('#seat-map-2-' + 1).seatCharts({
                            map: vm.trips.round[1].seatMap,
                            seats: {
                                a: {
                                    price: 99.99,
                                    classes: 'front-seat' //your custom CSS class
                                }

                            },
                            naming: {
                                top: false,
                                left: false
                            },
                            click: function() {
                                if (this.status() == 'available') {
                                    var seatNumber = this.settings.id;
                                    var seatLabel = this.settings.label;
                                    vm.selectSeat(seatNumber, seatLabel, 0, 2, null);

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

                    //Elimino los asientos ocupados
                    if (vm.trips.round[1].unavailableSeats.length > 0) {

                        $.each(vm.trips.round[1].unavailableSeats, function(index, item) {
                            sc3.status(item.toString(), 'unavailable');
                        });
                        if (vm.trips.round[1].size === 2) {
                            $.each(vm.trips.round[1].unavailableSeats, function(index, item) {
                                sc4.status(item.toString(), 'unavailable');
                            });
                        }
                    } else {
                        $.each(vm.trips.round[1].unavailableSeats, function(index, item) {
                            sc3.status(item.toString(), 'unavailable');
                        });
                    }
                }

                if (vm.trips.isRoundTrip) {
                    sc5 = $('#seat-map-3-' + 0).seatCharts({
                        map: vm.trips.return[0].seatMap,
                        seats: {
                            a: {
                                price: 99.99,
                                classes: 'front-seat' //your custom CSS class
                            }
                        },
                        naming: {
                            top: false,
                            left: false
                        },
                        click: function() {
                            if (this.status() == 'available') {
                                var seatNumber = this.settings.id;
                                var seatLabel = this.settings.label;
                                vm.selectSeat(seatNumber, seatLabel, 1, 1, null);
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

                    if (vm.trips.return[0].automaticSeat) {
                        sc6 = $('#seat-map-4-' + 0).seatCharts({
                            map: vm.trips.return[0].seatMap,
                            seats: {
                                a: {
                                    price: 99.99,
                                    classes: 'front-seat' //your custom CSS class
                                }

                            },
                            naming: {
                                top: false,
                                left: false
                            },
                            click: function() {
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

                    if (vm.trips.return[0].unavailableSeats.length > 0) {

                        $.each(vm.trips.return[0].unavailableSeats, function(index, item) {
                            sc5.status(item.toString(), 'unavailable');
                        });
                        if (vm.trips.return[0].automaticSeat) {
                            $.each(vm.trips.return[0].unavailableSeats, function(index, item) {
                                sc6.status(item.toString(), 'unavailable');
                            });
                        }
                    } else {

                        $.each(vm.trips.return[0].unavailableSeats, function(index, item) {
                            sc5.status(item.toString(), 'unavailable');
                        });
                    }
                    if (vm.trips.return.length > 1) {
                        sc7 = $('#seat-map-3-' + 1).seatCharts({
                            map: vm.trips.return[1].seatMap,
                            seats: {
                                a: {
                                    price: 99.99,
                                    classes: 'front-seat' //your custom CSS class
                                }
                            },
                            naming: {
                                top: false,
                                left: false
                            },
                            click: function() {
                                if (this.status() == 'available') {
                                    var seatNumber = this.settings.id;
                                    var seatLabel = this.settings.label;
                                    vm.selectSeat(seatNumber, seatLabel, 1, 1, null);
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

                        if (vm.trips.return[1].size === 2) {

                            sc8 = $('#seat-map-4' + 1).seatCharts({
                                map: vm.trips.return[1].seatMap,
                                seats: {
                                    a: {
                                        price: 99.99,
                                        classes: 'front-seat' //your custom CSS class
                                    }

                                },
                                naming: {
                                    top: false,
                                    left: false
                                },
                                click: function() {
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

                        if (vm.trips.return[1].unavailableSeats.length > 0) {

                            $.each(vm.trips.return[1].unavailableSeats, function(index, item) {
                                sc7.status(item.toString(), 'unavailable');
                            });
                            if (vm.trips.return[1].size === 2) {
                                $.each(vm.trips.return[1].unavailableSeats, function(index, item) {
                                    sc8.status(item.toString(), 'unavailable');
                                });
                            }
                        } else {

                            $.each(vm.trips.return[1].unavailableSeats, function(index, item) {
                                sc7.status(item.toString(), 'unavailable');
                            });
                        }
                    }

                }


            })
            .catch(function(err) {
                $timeout(function() {
                    $('#error-seat').modal('hide');
                    var url = sessionStorageService.getUrl();
                    $timeout(function() {
                        $location.path(url);
                    }, 500);
                }, 12000);
                vm.msgError = err;
                vm.errorSeat = true;
                seatError();
            });

        vm.resetSeatInSelection = function() {
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

        var aux = 0
        vm.addSeat = function() {
            var counter = 5;
            $rootScope.$broadcast('counterEvent', counter, true);
            if (vm.seatInSelection.update != true) {
                //Eventos Google Analytics
                $analytics.eventTrack('Select Seat', {
                    category: 'Seat',
                    label: vm.seatInSelection.seatNumber
                });
                if (vm.seatInSelection.trip === 0) {
                    if (vm.seatRound) {
                        vm.seatsSelectedDeparture2.push(angular.copy(vm.seatInSelection));
                    } else {
                        vm.seatsSelectedDeparture.push(angular.copy(vm.seatInSelection));
                    }
                    if (vm.trips.round.length < 2) {
                        vm.selectDepartureSeat = false;
                    } else {
                        vm.seatRound = !vm.seatRound;
                    }
                    if ($stateParams.idReturn == "-1") {
                        if (vm.trips.round.length == 2) {
                            if (vm.seatsSelectedDeparture.length == vm.passengers && vm.seatsSelectedDeparture2.length == vm.passengers) {
                                vm.selectDepartureSeat = false
                                vm.allSeats = true;
                                vm.resetSeatInSelection();
                            }
                        } else {
                            vm.selectDepartureSeat = false;
                            vm.resetSeatInSelection();
                            if (vm.seatsSelectedDeparture.length == vm.passengers) {
                                vm.allSeats = true;
                            } else {
                                vm.allSeats = false;
                                vm.selectDepartureSeat = true;
                            }
                        }
                        if (vm.trips.round.automaticSeat && vm.passengers > 1) {
                            vm.autoPassengers--;
                        }
                    } else {
                        if (vm.trips.round.length == 2) {
                            if (vm.seatsSelectedDeparture.length > aux && vm.seatsSelectedDeparture2.length > aux && vm.passengers >= aux) {
                                vm.selectDepartureSeat = false;
                                aux = aux + 1;
                                vm.seatReturn = false;
                            }
                            if (vm.seatsSelectedDeparture.length == vm.passengers && vm.seatsSelectedDeparture2.length == vm.passengers) {
                                vm.selectDepartureSeat = false;
                            }
                            if (vm.seatsSelectedDeparture.length == vm.passengers && vm.seatsSelectedReturn2.length == vm.passengers) {
                                vm.allSeats = true;
                            }
                        } else {
                            if (vm.seatsSelectedDeparture.length == vm.passengers && vm.selectAgain && vm.seatsSelectedReturn.length == vm.passengers) {
                                vm.allSeats = true;
                                vm.seatReturn = true;
                            }
                        }
                    }
                }
                if (vm.seatInSelection.trip === 1) {
                    if (vm.seatReturn) {
                        vm.seatsSelectedReturn2.push(angular.copy(vm.seatInSelection));
                        vm.selectDepartureSeat = true;
                        vm.seatRound = false;
                        vm.seatReturn = false;
                    } else {
                        vm.seatsSelectedReturn.push(angular.copy(vm.seatInSelection));
                    }
                    if (vm.trips.return.length == 2) {
                        vm.seatReturn = true;
                        if (vm.seatsSelectedReturn.length == vm.passengers && vm.seatsSelectedReturn2.length == vm.passengers) {
                            vm.allSeats = true;
                        }
                        if (vm.seatsSelectedDeparture.length == vm.passengers && vm.seatsSelectedReturn2.length == vm.passengers) {
                            vm.allSeats = true;
                        }
                    } else {
                        vm.selectDepartureSeat = true;
                        if (vm.seatsSelectedDeparture.length == vm.passengers) {
                            vm.allSeats = true;
                        }
                        vm.resetSeatInSelection();
                    }
                    //vm.resetSeatInSelection();
                    if (vm.trips.round.automaticSeat && vm.passengers > 1) {
                        vm.autoPassengers--;
                    }
                }
                if (vm.automaticSeat) {
                    if (vm.returnSeats.length > 0) {
                        vm.seatInSelection.trip = 1;
                        vm.seatInSelection.price = vm.trips.round.priceFloorOne;
                        vm.seatInSelection.tripId = vm.trips.round.tripIdFloorOne;
                        vm.seatInSelection.seatLabel = vm.returnSeats[vm.autoPassengers].label;
                        vm.seatInSelection.seatNumber = vm.returnSeats[vm.autoPassengers].number;
                        vm.seatsSelectedReturn.push(angular.copy(vm.seatInSelection));
                        if (vm.seatsSelectedDeparture.length == vm.passengers) {
                            vm.allSeats = true;
                        }
                    }
                }
            } else {
                vm.selectDepartureSeat = false;
                if (vm.seatInSelection.trip === 0) {
                    if ($stateParams.idReturn == "-1") {
                        if (vm.trips.round.length == 2) {
                            vm.seatsSelectedDeparture2[vm.index].country = angular.copy(vm.seatsSelectedDeparture[vm.index].country);
                            vm.seatsSelectedDeparture2[vm.index].dni = angular.copy(vm.seatsSelectedDeparture[vm.index].dni);
                            vm.seatsSelectedDeparture2[vm.index].document = angular.copy(vm.seatsSelectedDeparture[vm.index].document);
                            vm.seatsSelectedDeparture2[vm.index].email = angular.copy(vm.seatsSelectedDeparture[vm.index].email);
                            vm.seatsSelectedDeparture2[vm.index].lastname = angular.copy(vm.seatsSelectedDeparture[vm.index].lastname);
                            vm.seatsSelectedDeparture2[vm.index].phone = angular.copy(vm.seatsSelectedDeparture[vm.index].phone);
                            vm.seatsSelectedDeparture2[vm.index].name = angular.copy(vm.seatsSelectedDeparture[vm.index].name);
                            vm.selectDepartureSeat = false;
                        }
                        vm.seatsSelectedDeparture[vm.index] = angular.copy(vm.seatInSelection);
                        vm.resetSeatInSelection();
                        vm.selectDepartureSeat = true;
                        if (vm.seatsSelectedDeparture.length == vm.passengers) {
                            vm.allSeats = true;
                        }
                    } else {
                        if (vm.trips.round.length == 2) {
                            vm.seatsSelectedDeparture2[vm.index].country = angular.copy(vm.seatsSelectedDeparture[vm.index].country);
                            vm.seatsSelectedDeparture2[vm.index].dni = angular.copy(vm.seatsSelectedDeparture[vm.index].dni);
                            vm.seatsSelectedDeparture2[vm.index].document = angular.copy(vm.seatsSelectedDeparture[vm.index].document);
                            vm.seatsSelectedDeparture2[vm.index].email = angular.copy(vm.seatsSelectedDeparture[vm.index].email);
                            vm.seatsSelectedDeparture2[vm.index].lastname = angular.copy(vm.seatsSelectedDeparture[vm.index].lastname);
                            vm.seatsSelectedDeparture2[vm.index].phone = angular.copy(vm.seatsSelectedDeparture[vm.index].phone);
                            vm.seatsSelectedDeparture2[vm.index].name = angular.copy(vm.seatsSelectedDeparture[vm.index].name);
                            vm.selectDepartureSeat = false;
                        }
                        if (vm.seatsSelectedReturn.length > 0) {
                            vm.seatsSelectedReturn[vm.index].country = angular.copy(vm.seatsSelectedDeparture[vm.index].country);
                            vm.seatsSelectedReturn[vm.index].dni = angular.copy(vm.seatsSelectedDeparture[vm.index].dni);
                            vm.seatsSelectedReturn[vm.index].document = angular.copy(vm.seatsSelectedDeparture[vm.index].document);
                            vm.seatsSelectedReturn[vm.index].email = angular.copy(vm.seatsSelectedDeparture[vm.index].email);
                            vm.seatsSelectedReturn[vm.index].lastname = angular.copy(vm.seatsSelectedDeparture[vm.index].lastname);
                            vm.seatsSelectedReturn[vm.index].phone = angular.copy(vm.seatsSelectedDeparture[vm.index].phone);
                            vm.seatsSelectedReturn[vm.index].name = angular.copy(vm.seatsSelectedDeparture[vm.index].name);
                            vm.selectDepartureSeat = false;
                        }
                        if (vm.trips.return.length == 2) {
                            vm.seatsSelectedReturn2[vm.index].country = angular.copy(vm.seatsSelectedDeparture[vm.index].country);
                            vm.seatsSelectedReturn2[vm.index].dni = angular.copy(vm.seatsSelectedDeparture[vm.index].dni);
                            vm.seatsSelectedReturn2[vm.index].document = angular.copy(vm.seatsSelectedDeparture[vm.index].document);
                            vm.seatsSelectedReturn2[vm.index].email = angular.copy(vm.seatsSelectedDeparture[vm.index].email);
                            vm.seatsSelectedReturn2[vm.index].lastname = angular.copy(vm.seatsSelectedDeparture[vm.index].lastname);
                            vm.seatsSelectedReturn2[vm.index].phone = angular.copy(vm.seatsSelectedDeparture[vm.index].phone);
                            vm.seatsSelectedReturn2[vm.index].name = angular.copy(vm.seatsSelectedDeparture[vm.index].name);
                            vm.selectDepartureSeat = false;
                        }
                        if (vm.seatsSelectedDeparture.length == vm.passengers) {
                            vm.allSeats = true;
                        }
                    }
                }
            }
            if (vm.trips.round.automaticSeat) {
                vm.autoPassengers--;
            }
            if (vm.hasBoat) {
                $('#formSeatBoat').modal('hide');
            } else {
                $('#formSeat').modal('hide');
            }
            vm.updateTotals();
        };

        vm.releaseSeat = function(trip, floor, seatNumber, update, index, bus) {
            if (trip === 0) {
                if (bus == 0) {
                    if (vm.seatsSelectedDeparture.length === 0 && vm.seatsSelectedReturn.length === 0) {
                        vm.allSeats = false;
                        vm.selectDepartureSeat = true;
                        vm.seatRound = false;
                    } else {
                        vm.selectDepartureSeat = true;
                        vm.allSeats = false;
                        vm.seatRound = false;
                    }
                    if (floor === 1) {
                        sc.status(seatNumber.toString(), 'available');
                    } else {
                        sc2.status(seatNumber.toString(), 'available');
                    }
                    vm.seatInSelection.update = false;
                } else {
                    if (vm.seatsSelectedDeparture2.length === 0 && vm.seatsSelectedReturn.length === 0) {
                        vm.allSeats = false;
                        vm.selectDepartureSeat = true;
                        vm.seatRound = true;
                    } else {
                        vm.selectDepartureSeat = true;
                        vm.allSeats = false;
                        vm.seatRound = true;
                    }
                    if (vm.seatsSelectedDeparture2.length === 0 && vm.seatsSelectedDeparture.length === 0) {
                        vm.seatRound = false;
                    }
                    if (floor === 1) {
                        sc3.status(seatNumber.toString(), 'available');
                    } else {
                        sc4.status(seatNumber.toString(), 'available');
                    }
                    vm.seatInSelection.update = false;
                }
            } else {
                if (bus == 0) {
                    if (vm.seatsSelectedDeparture.length === 0 && vm.seatsSelectedReturn.length === 0) {
                        vm.allSeats = false;
                        vm.selectDepartureSeat = true;
                        vm.seatReturn = false;
                    } else {
                        vm.selectDepartureSeat = false;
                        vm.allSeats = false;
                        vm.seatReturn = false;
                    }
                    if (floor === 1) {
                        sc5.status(seatNumber.toString(), 'available');
                    } else {
                        sc6.status(seatNumber.toString(), 'available');
                    }
                } else {
                    if (vm.seatsSelectedDeparture.length === 0 && vm.seatsSelectedReturn.length === 0) {
                        vm.allSeats = false;
                        vm.selectDepartureSeat = true;
                        vm.seatReturn = true;
                    } else {
                        vm.selectDepartureSeat = false;
                        vm.allSeats = false;
                        vm.seatReturn = true;
                    }
                    if (vm.seatsSelectedReturn.length === 0 && vm.seatsSelectedReturn2.length === 0) {
                        vm.seatReturn = false;
                    }
                    if (floor === 1) {
                        sc7.status(seatNumber.toString(), 'available');
                    } else {
                        sc8.status(seatNumber.toString(), 'available');
                    }
                }
            }
            if (update === true) {
                $scope.$apply();
            }
            vm.updateTotals();
            if (vm.hasBoat) {
                $('#formSeatBoat').modal('hide');
            } else {
                $('#formSeat').modal('hide');
            }
        };

        vm.deleteSeat = function(trip, floor, seatNumber, update, index, bus) {
            //Eventos Google Analytics
            $analytics.eventTrack('Unselect Seat', {
                category: 'Seat',
                label: seatNumber
            });
            if (trip === 0) {
                if (bus == 0) {
                    if (vm.seatsSelectedDeparture[index].trip === trip && vm.seatsSelectedDeparture[index].seatNumber === seatNumber) {
                        if ($stateParams.idReturn != "-1") {
                            if (vm.seatsSelectedDeparture.length == vm.seatsSelectedReturn.length) {
                                vm.seatInSelection = vm.seatsSelectedDeparture[index];
                                vm.seatsSelectedDeparture.splice(index, 1);
                                vm.releaseSeat(trip, floor, seatNumber, update, index, bus);
                            } else {
                                //Do not delete
                            }
                        } else {
                            vm.seatInSelection = vm.seatsSelectedDeparture[index];
                            vm.seatsSelectedDeparture.splice(index, 1);
                            vm.releaseSeat(trip, floor, seatNumber, update, index, bus);
                        }
                    }
                } else {
                    if (vm.seatsSelectedDeparture2[index].trip === trip && vm.seatsSelectedDeparture2[index].seatNumber === seatNumber) {
                        if ($stateParams.idReturn != "-1") {
                            if (vm.seatsSelectedDeparture2.length == vm.seatsSelectedReturn.length) {
                                vm.seatInSelection = vm.seatsSelectedDeparture2[index];
                                vm.seatsSelectedDeparture2.splice(index, 1);
                                vm.releaseSeat(trip, floor, seatNumber, update, index, bus);
                            } else {
                                //Do not delete
                            }
                        } else {
                            vm.seatInSelection = vm.seatsSelectedDeparture2[index];
                            vm.seatsSelectedDeparture2.splice(index, 1);
                            vm.releaseSeat(trip, floor, seatNumber, update, index, bus);
                        }
                    }
                }
            } else {
                if (bus == 0) {
                    if (vm.seatsSelectedReturn[index].trip === trip && vm.seatsSelectedReturn[index].seatNumber === seatNumber) {
                        if ($stateParams.idReturn != "-1") {
                            if (vm.seatsSelectedDeparture.length == vm.seatsSelectedReturn.length) {
                                vm.seatInSelection = vm.seatsSelectedReturn[index];
                                vm.seatsSelectedReturn.splice(index, 1);
                                vm.releaseSeat(trip, floor, seatNumber, update, index, bus);
                            } else {
                                //Do not delete
                            }
                        } else {
                            vm.seatInSelection = vm.seatsSelectedReturn[index];
                            vm.seatsSelectedReturn.splice(index, 1);
                            vm.releaseSeat(trip, floor, seatNumber, update, index, bus);
                        }
                    }
                } else {
                    if (vm.seatsSelectedReturn2[index].trip === trip && vm.seatsSelectedReturn2[index].seatNumber === seatNumber) {
                        if ($stateParams.idReturn != "-1") {
                            if (vm.seatsSelectedDeparture.length == vm.seatsSelectedReturn2.length) {
                                vm.seatInSelection = vm.seatsSelectedReturn2[index];
                                vm.seatsSelectedReturn2.splice(index, 1);
                                vm.releaseSeat(trip, floor, seatNumber, update, index);
                            } else {
                                //Do not delete
                            }
                        } else {
                            vm.seatInSelection = vm.seatsSelectedReturn2[index];
                            vm.seatsSelectedReturn2.splice(index, 1);
                            vm.releaseSeat(trip, floor, seatNumber, update, index);
                        }
                    }
                }
            }
        };

        function selectSeatAutomatic(trip, index) {
            $analytics.eventTrack('Select Seat Automatic', {
                category: 'Seat',
                label: 'Automatic Seats'
            });
            if (trip == 0) {
                vm.seatInSelection.trip = trip;
                vm.seatInSelection.price = vm.trips.round[0].priceFloorOne;
                vm.seatInSelection.tripId = vm.trips.round[0].tripIdFloorOne;
                vm.seatInSelection.seatLabel = vm.roundSeats[vm.autoPassengers].label;
                vm.seatInSelection.seatNumber = vm.roundSeats[vm.autoPassengers].number;
                if (index == 0) {
                    if (vm.hasBoat) {
                        $('#formSeatBoat').modal('show');
                    } else {
                        $('#formSeat').modal('show');
                    }
                } else {
                    vm.addSeat();
                }
            } else {
                vm.seatInSelection.trip = trip;
                vm.seatInSelection.price = vm.trips.round[0].priceFloorOne;
                vm.seatInSelection.tripId = vm.trips.round[0].tripIdFloorOne;
                vm.seatInSelection.seatLabel = vm.returnSeats[vm.autoPassengers].label;
                vm.seatInSelection.seatNumber = vm.returnSeats[vm.autoPassengers].number;
                vm.addSeat();
            }

        }
        vm.seatRound = false;
        vm.seatReturn = false;
        vm.selectSeat = function(seatNumber, seatLabel, trip, floor, item, index) {
            //seatNUmber = Numero de asiento
            //trip => 0 = ida, 2= vuelta
            //floor = Numero de piso
            vm.index = index;

            if (item != null) {
                vm.seatInSelection = item;
                vm.seatInSelection.update = true;
                if (vm.hasBoat) {
                    $('#formSeatBoat').modal('show');
                } else {
                    $('#formSeat').modal('show');
                }
                vm.selectDepartureSeat = true
            } else {
                if ($stateParams.idReturn != "-1") {
                    if (vm.seatInSelection.trip === 1) {
                        vm.selectAgain = true;
                        //vm.resetSeatInSelection();
                    }
                }
                vm.seatInSelection.seatNumber = seatNumber;
                vm.seatInSelection.seatLabel = seatLabel;
                vm.seatInSelection.trip = trip;
                vm.seatInSelection.floor = floor;

                $analytics.eventTrack('Select Seat Open Form', {
                    category: 'Seat',
                    label: 'Open Form'
                });

                if (trip === 0) {
                    if (floor === 1) {
                        vm.seatInSelection.tripId = vm.trips.round[0].tripIdFloorOne;
                        vm.seatInSelection.price = 0;
                        for (var i = 0; i < vm.trips.round.length; i++) {
                            vm.seatInSelection.price = vm.seatInSelection.price + vm.trips.round[i].priceFloorOne;
                        }
                    } else {
                        vm.seatInSelection.tripId = vm.trips.round[0].tripIdFloorTwo;
                        vm.seatInSelection.price = 0;
                        for (var i = 0; i < vm.trips.round.length; i++) {
                            vm.seatInSelection.price = vm.seatInSelection.price + vm.trips.round[i].priceFloorTwo;
                        }
                    }
                    if (!vm.seatRound) {
                        if (vm.hasBoat) {
                            $('#formSeatBoat').modal('show');
                        } else {
                            $('#formSeat').modal('show');
                        }
                    } else {
                        vm.addSeat();
                    }
                } else {
                    if (floor === 1) {
                        vm.seatInSelection.tripId = vm.trips.return[0].tripIdFloorOne;
                        vm.seatInSelection.price = 0;
                        for (var i = 0; i < vm.trips.return.length; i++) {
                            vm.seatInSelection.price = vm.seatInSelection.price + vm.trips.return[i].priceFloorOne;
                        }
                    } else {
                        vm.seatInSelection.tripId = vm.trips.return[0].tripIdFloorTwo;
                        vm.seatInSelection.price = 0;
                        for (var i = 0; i < vm.trips.return.length; i++) {
                            vm.seatInSelection.price = vm.seatInSelection.price + vm.trips.return[i].priceFloorTwo;
                        }
                    }
                    vm.addSeat();
                    vm.index = index;
                }

                $scope.$apply();
            }
        };

        vm.updateTotals = function() {
            vm.totalSeats = 0;
            vm.totalMount = 0;

            for (var i = vm.seatsSelectedDeparture.length; i--;) {
                vm.totalSeats++;
                // vm.totalMount += vm.seatsSelectedDeparture[i].price;
                // vm.totalMount = Math.round(vm.totalMount * 100) / 100;
            }

            for (var i = vm.seatsSelectedReturn.length; i--;) {
                vm.totalSeats++;
                // vm.totalMount += vm.seatsSelectedReturn[i].price;
                // vm.totalMount = Math.round(vm.totalMount * 100) / 100;
            }

            if (vm.seatsSelectedReturn.length > 0) {
                if (vm.hasBoat) {
                    vm.totalMount += 0 + vm.seatsSelectedDeparture[0].price;
                } else {
                    vm.totalMount += vm.seatsSelectedReturn[0].price + vm.seatsSelectedDeparture[0].price;
                }
                vm.totalMount = Math.round(vm.totalMount * 100) / 100;
            } else if (vm.seatsSelectedDeparture.length > 0) {
                vm.totalMount += vm.seatsSelectedDeparture[0].price;
                vm.totalMount = Math.round(vm.totalMount * 100) / 100;
            }

        };

        function reserve() {
            reserveFactory
                .getAll(vm.seatsSelectedDeparture, vm.seatsSelectedDeparture2, vm.seatsSelectedReturn, vm.seatsSelectedReturn2, $stateParams.idDeparture, $stateParams.idReturn, vm.hasBoat)
                .then(function(data) {
                    utilityService.setPayer(vm.seatsSelectedDeparture[0]);
                    utilityService.setPaymentData(data.idIda, data.idVuelta, data.totalPrice, data.totalFee, data.totalPayment, data.departure, data.return);
                    sessionStorageService.setPayer(vm.seatsSelectedDeparture[0]);
                    sessionStorageService.setPayment(data.idIda, data.idVuelta, data.totalPrice, data.totalFee, data.totalPayment, data.departure, data.return);
                    $location.path("/payment/" + $stateParams.idDeparture + "/" + $stateParams.idReturn);
                })
                .catch(function(err) {
                    vm.msgErrorReserve = err;
                    vm.errorReserve = true;
                    reserveError();
                })
        }

        //jQuery Plugins & Code
        //Inicializacion de los tabs
        $('#seats-ida a, #seats-vuelta a').click(function(e) {
            e.preventDefault()
            $(this).tab('show')
        });

        $('#formSeat').on('hidden.bs.modal', function(e) {
            //vm.resetSeatInSelection();
        })

        function seatError() {
            if (vm.errorSeat) {
                $('#error-seat').modal('show');
            }
        }

        function reserveError() {
            if (vm.errorReserve) {
                $('#error-reserve').modal('show');
            }
        }

        function validateDni() {
            vm.dniEdit = true;
            vm.errorDni = true;
            if (vm.seatInSelection.document == 1) {
                if (vm.seatInSelection.dni != undefined) {
                    if (isDNI(vm.seatInSelection.dni)) {
                        vm.errorDni = false;
                    } else {
                        vm.errorDni = true;
                    }
                }
            } else
            if (vm.seatInSelection.document == 2 || (vm.seatInSelection.docTypes == 1 && vm.hasBoat)) {
                if (vm.seatInSelection.dni != undefined) {
                    if (validateNif(vm.seatInSelection.dni)) {
                        vm.errorDni = false;
                    } else {
                        vm.errorDni = true;
                    }
                }
            } else
            if (vm.seatInSelection.document == 3 || (vm.seatInSelection.docTypes == 3 || vm.seatInSelection.docTypes == 5 || vm.seatInSelection.docTypes == 4 && vm.hasBoat)) {
                if (vm.seatInSelection.dni != undefined) {
                    if (validatePassport(vm.seatInSelection.dni)) {
                        vm.errorDni = false;
                    } else {
                        vm.errorDni = true;
                    }
                }
            } else {
                if (vm.seatInSelection.dni != undefined) {
                    if (isDNI(vm.seatInSelection.dni)) {
                        vm.errorDni = false;
                    } else {
                        vm.errorDni = true;
                    }
                }
            }
        }

        function isDNI(dni) {
            var numero, le, letra;
            var expresion_regular_dni = /^[XYZ]?\d{5,8}[A-Z]$/;

            dni = dni.toUpperCase();

            if (expresion_regular_dni.test(dni) === true) {
                numero = dni.substr(0, dni.length - 1);
                numero = numero.replace('X', 0);
                numero = numero.replace('Y', 1);
                numero = numero.replace('Z', 2);
                le = dni.substr(dni.length - 1, 1);
                numero = numero % 23;
                letra = 'TRWAGMYFPDXBNJZSQVHLCKET';
                letra = letra.substring(numero, numero + 1);
                if (letra != le) {
                    return false;
                } else {
                    return true;
                }
            } else {
                return false;
            }
        }

        function validateNif(value) {
            value = value.toUpperCase();
            // Basic format test
            if (!value.match('((^[A-Z]{1}[0-9]{7}[A-Z0-9]{1}$|^[T]{1}[A-Z0-9]{8}$)|^[0-9]{8}[A-Z]{1}$)')) {
                return false;
            }
            // Test NIF
            if (/^[0-9]{8}[A-Z]{1}$/.test(value)) {
                return ("TRWAGMYFPDXBNJZSQVHLCKE".charAt(value.substring(8, 0) % 23) === value.charAt(8));
            }
            // Test specials NIF (starts with K, L or M)
            if (/^[KLM]{1}/.test(value)) {
                return (value[8] === String.fromCharCode(64));
            }
            return false;
        }

        function validatePassport(value) {
            value = value.toUpperCase();
            var expresion_regular_passport = /^[A-Z]{3}[1-9]\d{5}$|^[0-9]\d{6,8}$|^[A-Z]{1,2}[0-9]{5,6}$/;

            if (expresion_regular_passport.test(value) === true) {
                return true;
            } else {
                return false;
            }

        }

    }


})();