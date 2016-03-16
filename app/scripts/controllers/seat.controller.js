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
        vm.cnames_es = [
        { name: 'ABW', value:'Aruba' },
        { name: 'AFG', value:'Afganistan' },
        { name: 'AGO', value:'Angola' },
        { name: 'AIA', value:'Anguilla' },
        { name: 'ALA', value:'Islas Aland' },
        { name: 'ALB', value:'Albania' },
        { name: 'AND', value:'Andorra' },
        { name: 'ARE', value:'Emiratos Arabes Unidos' },
        { name: 'ARG', value:'Argentina' },
        { name: 'ARM', value:'Armenia' },
        { name: 'ASM', value:'Samoa Americana' },
        { name: 'ATA', value:'Antartica' },
        { name: 'ATF', value:'Territorios Franceses del Sur' },
        { name: 'ATG', value:'Antigua y Barbuda' },
        { name: 'AUS', value:'Australia' },
        { name: 'AUT', value:'Austria' },
        { name: 'AZE', value:'Azerbaiyán' },
        { name: 'BDI', value:'Burundi' },
        { name: 'BEL', value:'Belgica' },
        { name: 'BEN', value:'Benin' },
        { name: 'BES', value:'Bonaire, San Eustaquio y Saba' },
        { name: 'BFA', value:'Burkina Faso' },
        { name: 'BGD', value:'Bangladesh' },
        { name: 'BGR', value:'Bulgaria' },
        { name: 'BHR', value:'Bahrein' },
        { name: 'BHS', value:'Bahamas' },
        { name: 'BIH', value:'Bosnia y Herzegovina' },
        { name: 'BLM', value:'San Bartolomé' },
        { name: 'BLR', value:'Bielorrusia' },
        { name: 'BLZ', value:'Belice' },
        { name: 'BMU', value:'Bermuda' },
        { name: 'BOL', value:'Bolivia, Estado Plurinacional de' },
        { name: 'BRA', value:'Brasil' },
        { name: 'BRB', value:'Barbados' },
        { name: 'BRN', value:'Brunei Darussalam' },
        { name: 'BTN', value:'Bhután' },
        { name: 'BVT', value:'Isla Bouvet' },
        { name: 'BWA', value:'Botswana' },
        { name: 'CAF', value:'República Centroafricana' },
        { name: 'CAN', value:'Canadá' },
        { name: 'CCK', value:'Islas Cocos (Keeling)' },
        { name: 'CHE', value:'Suiza' },
        { name: 'CHL', value:'Chile' },
        { name: 'CHN', value:'China' },
        { name: 'CIV', value:'Côte d\'Ivoire' },
        { name: 'CMR', value:'Camerún' },
        { name: 'COD', value:'Congo, la República Democrática del' },
        { name: 'COG', value:'Congo' },
        { name: 'COK', value:'Islas Cook' },
        { name: 'COL', value:'Colombia' },
        { name: 'COM', value:'Comoras' },
        { name: 'CPV', value:'Cabo Verde' },
        { name: 'CRI', value:'Costa Rica' },
        { name: 'CUB', value:'Cuba' },
        { name: 'CUW', value:'Curazao' },
        { name: 'CXR', value:'Islas Navidad' },
        { name: 'CYM', value:'Islas Caimán' },
        { name: 'CYP', value:'Chipre' },
        { name: 'CZE', value:'República Checa ' },
        { name: 'DEU', value:'Alemania' },
        { name: 'DJI', value:'Djibouti' },
        { name: 'DMA', value:'Dominica' },
        { name: 'DNK', value:'Dinamarca' },
        { name: 'DOM', value:'República Dominicana' },
        { name: 'DZA', value:'Algelia' },
        { name: 'ECU', value:'Ecuador' },
        { name: 'EGY', value:'Egipto' },
        { name: 'ERI', value:'Eritrea' },
        { name: 'ESH', value:'Sahara Occidental' },
        { name: 'ESP', value:'España' },
        { name: 'EST', value:'Estonia' },
        { name: 'ETH', value:'Etiopía' },
        { name: 'FIN', value:'Finlandia' },
        { name: 'FJI', value:'Fiji' },
        { name: 'FLK', value:'Islas Malvinas (Falkland)' },
        { name: 'FRA', value:'Francia' },
        { name: 'FRO', value:'Islas Feroe' },
        { name: 'FSM', value:'Micronesia, Estados Federados de' },
        { name: 'GAB', value:'Gabón' },
        { name: 'GBR', value:'Reino Unido' },
        { name: 'GEO', value:'Georgia' },
        { name: 'GGY', value:'Guernsey' },
        { name: 'GHA', value:'Ghana' },
        { name: 'GIB', value:'Gibralta' },
        { name: 'GIN', value:'Guinea' },
        { name: 'GLP', value:'Guadelupe' },
        { name: 'GMB', value:'Gambia' },
        { name: 'GNB', value:'Guinea-Bissau' },
        { name: 'GNQ', value:'Guinea Ecuatorial' },
        { name: 'GRC', value:'Grecia' },
        { name: 'GRD', value:'Granada' },
        { name: 'GRL', value:'Groenlandia' },
        { name: 'GTM', value:'Guatemala' },
        { name: 'GUF', value:'Guayana Francesa' },
        { name: 'GUM', value:'Guam' },
        { name: 'GUY', value:'Guyana' },
        { name: 'HKG', value:'Hong Kong' },
        { name: 'HMD', value:'Islas Heard Island and McDonald' },
        { name: 'HND', value:'Honduras' },
        { name: 'HRV', value:'Croacia' },
        { name: 'HTI', value:'Haití' },
        { name: 'HUN', value:'Hungria' },
        { name: 'IDN', value:'Indonesia' },
        { name: 'IMN', value:'Isla de Man' },
        { name: 'IND', value:'India' },
        { name: 'IOT', value:'Territorio Británico del Océano Índico' },
        { name: 'IRL', value:'Irlanda' },
        { name: 'IRN', value:'Irán, República Islámica de' },
        { name: 'IRQ', value:'Irak' },
        { name: 'ISL', value:'Islandia' },
        { name: 'ISR', value:'Israel' },
        { name: 'ITA', value:'Italia' },
        { name: 'JAM', value:'Jamaica' },
        { name: 'JEY', value:'Jersey' },
        { name: 'JOR', value:'Jordan' },
        { name: 'JPN', value:'Japón' },
        { name: 'KAZ', value:'Kazajstán' },
        { name: 'KEN', value:'Kenia' },
        { name: 'KGZ', value:'Kirguistán' },
        { name: 'KHM', value:'Camboya' },
        { name: 'KIR', value:'Kiribati' },
        { name: 'KNA', value:'Saint Kitts and Nevis' },
        { name: 'KOR', value:'Corea del Sur' },
        { name: 'KWT', value:'Kuwait' },
        { name: 'LAO', value:'Lao People\'s República Democrática' },
        { name: 'LBN', value:'Líbano' },
        { name: 'LBR', value:'Liberia' },
        { name: 'LBY', value:'Jamahiriya Árabe Libia' },
        { name: 'LCA', value:'Santa Lucia' },
        { name: 'LIE', value:'Liechtenstein' },
        { name: 'LKA', value:'Sri Lanka' },
        { name: 'LSO', value:'Lesotho' },
        { name: 'LTU', value:'Lituania' },
        { name: 'LUX', value:'Luxemburgo' },
        { name: 'LVA', value:'Letonia' },
        { name: 'MAC', value:'Macao' },
        { name: 'MAF', value:'San Martín (parte francesa)' },
        { name: 'MAR', value:'Marruecos' },
        { name: 'MCO', value:'Monaco' },
        { name: 'MDA', value:'Moldova, República de' },
        { name: 'MDG', value:'Madagascar' },
        { name: 'MDV', value:'Maldivas' },
        { name: 'MEX', value:'México' },
        { name: 'MHL', value:'Islas Marshal' },
        { name: 'MKD', value:'Macedonia, la ex República Yugoslava de' },
        { name: 'MLI', value:'Mali' },
        { name: 'MLT', value:'Malta' },
        { name: 'MMR', value:'Myanmar' },
        { name: 'MNE', value:'Montenegro' },
        { name: 'MNG', value:'Mongolia' },
        { name: 'MNP', value:'Islas Marianas del Norte' },
        { name: 'MOZ', value:'Mozambique' },
        { name: 'MRT', value:'Mauritania' },
        { name: 'MSR', value:'Montserrat' },
        { name: 'MTQ', value:'Martinica' },
        { name: 'MUS', value:'Mauricio' },
        { name: 'MWI', value:'Malawi' },
        { name: 'MYS', value:'Malasia' },
        { name: 'MYT', value:'Mayotte' },
        { name: 'NAM', value:'Namibia' },
        { name: 'NCL', value:'Nueva Caledonia' },
        { name: 'NER', value:'Niger' },
        { name: 'NFK', value:'Islas Norfolk' },
        { name: 'NGA', value:'Nigeria' },
        { name: 'NIC', value:'Nicaragua' },
        { name: 'NIU', value:'Niue' },
        { name: 'NLD', value:'Paises Bajos' },
        { name: 'NOR', value:'Noruega' },
        { name: 'NPL', value:'Nepal' },
        { name: 'NRU', value:'Nauru' },
        { name: 'NZL', value:'Nueva Zelanda' },
        { name: 'OMN', value:'Omán' },
        { name: 'PAK', value:'Pakistán' },
        { name: 'PAN', value:'Panamá' },
        { name: 'PCN', value:'Pitcairn' },
        { name: 'PER', value:'Perú' },
        { name: 'PHL', value:'Filipinas' },
        { name: 'PLW', value:'Palau' },
        { name: 'PNG', value:'Papúa Nueva Guinea' },
        { name: 'POL', value:'Polonia' },
        { name: 'PRI', value:'Puerto Rico' },
        { name: 'PRK', value:'Corea Democrática Popular de la República' },
        { name: 'PRT', value:'Portugal' },
        { name: 'PRY', value:'Paraguay' },
        { name: 'PSE', value:'Palestina, Territorio Ocupado' },
        { name: 'PYF', value:'Polinesia Francesa' },
        { name: 'QAT', value:'Qatar' },
        { name: 'REU', value:'Reunión' },
        { name: 'ROU', value:'Rumanía' },
        { name: 'RUS', value:'Rusia' },
        { name: 'RWA', value:'Ruanda' },
        { name: 'SAU', value:'Arabia Saudita' },
        { name: 'SDN', value:'Sudán' },
        { name: 'SEN', value:'Senegal' },
        { name: 'SGP', value:'Singapur' },
        { name: 'SGS', value:'Georgia del Sur y las Islas Sandwich del Sur' },
        { name: 'SHN', value:'Santa Helena, Ascensión y Tristán da Cunha' },
        { name: 'SJM', value:'Svalbard y Jan Mayen' },
        { name: 'SLB', value:'Solomon Islands' },
        { name: 'SLE', value:'Sierra Leona' },
        { name: 'SLV', value:'El Salvador' },
        { name: 'SMR', value:'San Marino' },
        { name: 'SOM', value:'Somalia' },
        { name: 'SPM', value:'San Pedro y Miquelón' },
        { name: 'SRB', value:'Serbia' },
        { name: 'STP', value:'Santo Tomé y Príncipe' },
        { name: 'SUR', value:'Surinam' },
        { name: 'SVK', value:'Eslovaquia' },
        { name: 'SVN', value:'Eslovenia' },
        { name: 'SWE', value:'Suecia' },
        { name: 'SWZ', value:'Swazilandia' },
        { name: 'SXM', value:'Sint Maarten (parte neerlandesa)' },
        { name: 'SYC', value:'Seychelles' },
        { name: 'SYR', value:'Siria' },
        { name: 'TCA', value:'Islas Turcas y Caicos' },
        { name: 'TCD', value:'Chad' },
        { name: 'TGO', value:'Togo' },
        { name: 'THA', value:'Tailandia' },
        { name: 'TJK', value:'Tayikistán' },
        { name: 'TKL', value:'Tokelau' },
        { name: 'TKM', value:'Turkmenistán' },
        { name: 'TLS', value:'Timor-Leste' },
        { name: 'TON', value:'Tonga' },
        { name: 'TTO', value:'Trinidad y Tobago' },
        { name: 'TUN', value:'Túnez' },
        { name: 'TUR', value:'Turquía' },
        { name: 'TUV', value:'Tuvalu' },
        { name: 'TWN', value:'Taiwán, Provincia de China' },
        { name: 'TZA', value:'Tanzania, República Unida de' },
        { name: 'UGA', value:'Uganda' },
        { name: 'UKR', value:'Ucrania' },
        { name: 'UMI', value:'Estados Unidos Islas menores alejadas' },
        { name: 'URY', value:'Uruguay' },
        { name: 'USA', value:'Estados Unidos' },
        { name: 'UZB', value:'Uzbekistán' },
        { name: 'VAT', value:'Santa Sede (Ciudad del Vaticano)' },
        { name: 'VCT', value:'San Vicente y las Granadinas' },
        { name: 'VEN', value:'Venezuela, República Bolivariana de' },
        { name: 'VGB', value:'Islars Virgenes, Británicas' },
        { name: 'VIR', value:'Islas Virgenes,, U.S.' },
        { name: 'VNM', value:'Viet Nam' },
        { name: 'VUT', value:'Vanuatu' },
        { name: 'WLF', value:'Wallis and Futuna' },
        { name: 'WSM', value:'Samoa' },
        { name: 'YEM', value:'Yemen' },
        { name: 'ZAF', value:'Sudáfrica' },
        { name: 'ZMB', value:'Zambia' },
        { name: 'ZWE', value:'Zimbabwe '}
    ];

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
            //vm.resetSeatInSelection();
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
                    utilityService.setPaymentData(data.idIda,data.idVuelta,data.totalWithDiscount, data.totalFee, data.totalPayment, data.departure,data.return);
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
