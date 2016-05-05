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

    SeatController.$inject = ['travelsFactory','utilityService','seatsFactory','reserveFactory','$scope','$interval','$stateParams','$location','$rootScope','sessionStorageService', '$timeout','$analytics'];

    function SeatController (travelsFactory, utilityService, seatsFactory, reserveFactory, $scope, $interval, $stateParams,$location,$rootScope,sessionStorageService,$timeout,$analytics) {
        var vm = this;
        var sc, sc2, sc3, sc4 , sc5 , sc6, sc7, sc8;
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
        vm.validateDni = validateDni;

        vm.selectSeatAutomatic = selectSeatAutomatic;

        seatsFactory
            .getAll($stateParams.idDeparture,$stateParams.idReturn)
            .then(function (data) {
                vm.isLoading = false;
                console.log(data);
                vm.trips.isRoundTrip = data.isRoundTrip;
                vm.trips.round = data.departure;
                vm.trips.return = data.return;
                vm.hasBoat = data.hasBoat;
                vm.ageCategories = data.ageCategories;
                vm.genders = data.genders;
                vm.docTypes = data.docTypes;
                console.log(vm.trips.round);
                console.log(vm.trips.return);
                var title = "Resertrip "+data.departure[0].origin+"-"+data.departure[0].destination;
                $rootScope.$broadcast('titleEvent', title);
                vm.passengers = data.totalPeople;
                vm.autoPassengers = vm.passengers - 1;
                for (var i = 0; i < vm.trips.round.length; i++) {
                    if (vm.trips.round[i].automaticSeat) {
                        vm.roundSeats = [];
                        vm.returnSeats = [];
                        for (var j = 0; j < vm.passengers; j++) {
                            var seatAuto = {};
                            var seatsRound = vm.trips.round[i].seatMap[0]
                            var split1 = seatsRound.split('[');
                            var split2 = split1[1].split(']');
                            var split3 = split2[0].split(',');
                            seatAuto.label = split3[1];
                            seatAuto.number = split3[0];
                            vm.roundSeats.push(seatAuto);
                            if (vm.trips.return != undefined && vm.trips.return.length != 0 && vm.trips.return[j].automaticSeat) {
                                var seatAuto = {};
                                var seatsReturn = vm.trips.return[j].seatMap[0]
                                var split1 = seatsReturn.split('[');
                                var split2 = split1[1].split(']');
                                var split3 = split2[0].split(',');
                                seatAuto.label = split3[1];
                                seatAuto.number = split3[0];
                                vm.returnSeats.push(seatAuto);
                            }
                        }
                    }
                }
                var len = vm.trips.round.length;
                var len2 = vm.trips.return.length;
                if (len == 1) {
                    vm.tramos = true;

                }else if (len == 2) {
                    vm.tramos = false;
                }
                if (len2 == 1) {
                    vm.tramos2 = true;

                }else if (len2 == 2) {
                    vm.tramos2 = false;
                }
                sc = $('#seat-map-'+0).seatCharts({
                    map: vm.trips.round[0].seatMap,
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

                if(vm.trips.round[0].size === 2){

                    sc2 = $('#seat-map-2-'+0).seatCharts({
                        map: vm.trips.round[i].seatMap,
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
                if(vm.trips.round[0].unavailableSeats.length > 0){

                    $.each(vm.trips.round[0].unavailableSeats, function(index, item){
                        sc.status(item.toString(), 'unavailable');
                    });
                    if(vm.trips.round[0].size === 2){
                        $.each(vm.trips.round[0].unavailableSeats, function(index, item){
                            sc2.status(item.toString(), 'unavailable');
                        });
                    }
                }else{

                    $.each(vm.trips.round[0].unavailableSeats, function(index, item){

                        sc.status(item.toString(), 'unavailable');
                    });
                }
                if(vm.trips.round.length > 1){
                    sc3 = $('#seat-map-'+1).seatCharts({
                        map: vm.trips.round[1].seatMap,
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

                    if(vm.trips.round[1].size === 2){

                        sc4 = $('#seat-map-2-'+1).seatCharts({
                            map: vm.trips.round[1].seatMap,
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
                    if(vm.trips.round[1].unavailableSeats.length > 0){

                        $.each(vm.trips.round[1].unavailableSeats, function(index, item){
                            sc3.status(item.toString(), 'unavailable');
                        });
                        if(vm.trips.round[1].size === 2){
                            $.each(vm.trips.round[1].unavailableSeats, function(index, item){
                                sc4.status(item.toString(), 'unavailable');
                            });
                        }
                    }else{
                        $.each(vm.trips.round[1].unavailableSeats, function(index, item){
                            sc3.status(item.toString(), 'unavailable');
                        });
                    }
                }

                if(vm.trips.isRoundTrip){
                    sc5 = $('#seat-map-3-'+0).seatCharts({
                        map: vm.trips.return[0].seatMap,
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

                    if(vm.trips.return[0].size === 2){

                        sc6 = $('#seat-map-4'+0).seatCharts({
                            map: vm.trips.round[0].seatMap,
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

                    if(vm.trips.return[0].unavailableSeats.length > 0){

                        $.each(vm.trips.return[0].unavailableSeats, function(index, item){
                            sc5.status(item.toString(), 'unavailable');
                        });
                        if(vm.trips.return[0].size === 2){
                            $.each(vm.trips.return[0].unavailableSeats, function(index, item){
                                sc6.status(item.toString(), 'unavailable');
                            });
                        }
                    }else{

                        $.each(vm.trips.return[0].unavailableSeats, function(index, item){
                            sc5.status(item.toString(), 'unavailable');
                        });
                    }
                    if (vm.trips.return.length > 1) {
                        sc7 = $('#seat-map-3-'+1).seatCharts({
                            map: vm.trips.return[1].seatMap,
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

                        if(vm.trips.return[1].size === 2){

                            sc8 = $('#seat-map-4'+1).seatCharts({
                                map: vm.trips.round[1].seatMap,
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

                        if(vm.trips.return[1].unavailableSeats.length > 0){

                            $.each(vm.trips.return[1].unavailableSeats, function(index, item){
                                sc7.status(item.toString(), 'unavailable');
                            });
                            if(vm.trips.return[1].size === 2){
                                $.each(vm.trips.return[1].unavailableSeats, function(index, item){
                                    sc8.status(item.toString(), 'unavailable');
                                });
                            }
                        }else{

                            $.each(vm.trips.return[1].unavailableSeats, function(index, item){
                                sc7.status(item.toString(), 'unavailable');
                            });
                        }
                    }

                }


            })
            .catch(function (err) {
                $timeout(function () {
                    $('#error-seat').modal('hide');
                    var url = sessionStorageService.getUrl();
                    $timeout(function () {
                        $location.path (url);
                    }, 500);
                }, 12000);
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

        var aux = 0
        vm.addSeat = function () {
        	console.log('SEAT');
            var counter = 5;
            $rootScope.$broadcast('counterEvent', counter, true);
  			console.log(vm.seatInSelection);
  			if(vm.seatInSelection.update != true){
                //Eventos Google Analytics
                $analytics.eventTrack('Select Seat', {  category: 'Seat', label: vm.seatInSelection.seatNumber });
                console.log(vm.seatInSelection);
                if(vm.seatInSelection.trip === 0){
                    console.log("Departure");
                    if (vm.seatRound) {
                        vm.seatsSelectedDeparture2.push(angular.copy(vm.seatInSelection));
                    }else{
                        vm.seatsSelectedDeparture.push(angular.copy(vm.seatInSelection));
                    }
                    if (vm.trips.round.length < 2) {
                        vm.selectDepartureSeat = false;
                    }else{
                        vm.seatRound = !vm.seatRound;
                    }
                    if($stateParams.idReturn == "-1"){
                        if (vm.trips.round.length == 2) {
                            if (vm.seatsSelectedDeparture.length == vm.passengers && vm.seatsSelectedDeparture2.length == vm.passengers) {
                                vm.selectDepartureSeat = false
                                vm.allSeats = true;
                                vm.resetSeatInSelection();
                            }
                        }else{
                            vm.selectDepartureSeat = false;
                            vm.resetSeatInSelection();
                            if(vm.seatsSelectedDeparture.length == vm.passengers){
                                console.log("seats full");
                                vm.allSeats = true;
                            }else{
                                vm.allSeats = false;
                                vm.selectDepartureSeat = true;
                            }
                        }
                        if (vm.trips.round.automaticSeat && vm.passengers > 1) {
                            vm.autoPassengers --;
                        }
                    }else{
                        if (vm.trips.round.length == 2) {
                            if (vm.seatsSelectedDeparture.length > aux && vm.seatsSelectedDeparture2.length >aux && vm.passengers >= aux) {
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
                        }else{
                            if(vm.seatsSelectedDeparture.length == vm.passengers && vm.selectAgain  && vm.seatsSelectedReturn.length == vm.passengers){
                                console.log("seats full");
                                vm.allSeats = true;
                                vm.seatReturn = true;
                            }
                        }
                    }
                }
                if(vm.seatInSelection.trip === 1){
                    console.log("return");
                    if (vm.seatReturn) {
                        vm.seatsSelectedReturn2.push(angular.copy(vm.seatInSelection));
                        vm.selectDepartureSeat = true;
                        vm.seatRound = false;
                        vm.seatReturn = false;
                    }else{
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
                    }else{
                        vm.selectDepartureSeat = true;
                        if(vm.seatsSelectedDeparture.length == vm.passengers){
                            console.log("seats full");
                            vm.allSeats = true;
                        }
                        vm.resetSeatInSelection();
                    }
                    //vm.resetSeatInSelection();
                    if (vm.trips.round.automaticSeat && vm.passengers > 1) {
                        vm.autoPassengers --;
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
                        if(vm.seatsSelectedDeparture.length == vm.passengers){
                            console.log("seats full");
                            vm.allSeats = true;
                        }
                    }
                }
			}else{
                console.log("SEAT UPDATE");
                vm.selectDepartureSeat = false;
                console.log(vm.seatInSelection.trip);
                if(vm.seatInSelection.trip === 0){
                    if($stateParams.idReturn == "-1"){
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
                        if(vm.seatsSelectedDeparture.length == vm.passengers){
                            console.log("full seats");
                            vm.allSeats = true;
                        }
                    }else{
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
                        if(vm.seatsSelectedDeparture.length == vm.passengers){
                                console.log("full seats");
                                vm.allSeats = true;
                            }
                    }
                }
            }
            console.log("departure");
            console.log(vm.seatsSelectedDeparture);
            console.log("return");
            console.log(vm.seatsSelectedReturn);
            if (vm.trips.round.automaticSeat) {
                vm.autoPassengers --;
            }
            if (vm.hasBoat) {
                $('#formSeatBoat').modal('hide');
            }else{
                $('#formSeat').modal('hide');
            }
			vm.updateTotals();
		};

		vm.releaseSeat = function (trip, floor, seatNumber, update,index, bus) {
            console.log(seatNumber+'-'+trip);
            if(trip === 0){
                console.log('IDA');
                if (bus == 0) {
                    if (vm.seatsSelectedDeparture.length === 0 && vm.seatsSelectedReturn.length === 0) {
                        vm.allSeats = false;
                        vm.selectDepartureSeat = true;
                        vm.seatRound = false;
                        console.log("reset");
                    }else{
                        vm.selectDepartureSeat = true;
                        vm.allSeats = false;
                        vm.seatRound = false;
                    }
                    if(floor === 1){
                        sc.status(seatNumber.toString(), 'available');
                    }else{
                        sc2.status(seatNumber.toString(), 'available');
                    }
                    vm.seatInSelection.update = false;
                }else{
                    if (vm.seatsSelectedDeparture2.length === 0 && vm.seatsSelectedReturn.length === 0) {
                        vm.allSeats = false;
                        vm.selectDepartureSeat = true;
                        vm.seatRound = true;
                        console.log("reset");
                    }else{
                        vm.selectDepartureSeat = true;
                        vm.allSeats = false;
                        vm.seatRound = true;
                    }
                    if (vm.seatsSelectedDeparture2.length === 0 && vm.seatsSelectedDeparture.length === 0) {
                        vm.seatRound = false;
                    }
                    if(floor === 1){
                        sc3.status(seatNumber.toString(), 'available');
                    }else{
                        sc4.status(seatNumber.toString(), 'available');
                    }
                    vm.seatInSelection.update = false;
                }
            }else{
                console.log('VUELTA');
                if (bus == 0) {
                    if (vm.seatsSelectedDeparture.length === 0 && vm.seatsSelectedReturn.length === 0) {
                        vm.allSeats = false;
                        vm.selectDepartureSeat = true;
                        console.log("reset");
                        vm.seatReturn = false;
                    }else{
                        vm.selectDepartureSeat = false;
                        vm.allSeats = false;
                        vm.seatReturn = false;
                    }
                    if(floor === 1){
                        sc5.status(seatNumber.toString(), 'available');
                    }else{
                        sc6.status(seatNumber.toString(), 'available');
                    }
                }else{
                    if (vm.seatsSelectedDeparture.length === 0 && vm.seatsSelectedReturn.length === 0) {
                        vm.allSeats = false;
                        vm.selectDepartureSeat = true;
                        console.log("reset");
                        vm.seatReturn = true;
                    }else{
                        vm.selectDepartureSeat = false;
                        vm.allSeats = false;
                        vm.seatReturn = true;
                    }
                    if (vm.seatsSelectedReturn.length === 0 && vm.seatsSelectedReturn2.length === 0) {
                        vm.seatReturn = false;
                    }
                    if(floor === 1){
                        sc7.status(seatNumber.toString(), 'available');
                    }else{
                        sc8.status(seatNumber.toString(), 'available');
                    }
                }
            }
            if (update === true){
            	$scope.$apply();
            }
            vm.updateTotals();
            if (vm.hasBoat) {
                $('#formSeatBoat').modal('hide');
            }else{
                $('#formSeat').modal('hide');
            }
		};

		vm.deleteSeat = function (trip, floor, seatNumber, update, index, bus) {
            //Eventos Google Analytics
            $analytics.eventTrack('Unselect Seat', {  category: 'Seat', label: seatNumber });
            console.log(index);
            console.log(bus);
            if (trip === 0) {
                if (bus == 0) {
                    if(vm.seatsSelectedDeparture[index].trip === trip && vm.seatsSelectedDeparture[index].seatNumber === seatNumber) {
                        if($stateParams.idReturn != "-1"){
                            if (vm.seatsSelectedDeparture.length == vm.seatsSelectedReturn.length) {
                                vm.seatInSelection = vm.seatsSelectedDeparture[index];
                                vm.seatsSelectedDeparture.splice(index, 1);
                                vm.releaseSeat (trip, floor, seatNumber, update,index,bus);
                            }else{
                                console.log("Do not delete");
                            }
                        }else{
                            vm.seatInSelection = vm.seatsSelectedDeparture[index];
                            vm.seatsSelectedDeparture.splice(index, 1);
                            vm.releaseSeat (trip, floor, seatNumber, update,index,bus);
                         }
                    }
                }else{
                    if(vm.seatsSelectedDeparture2[index].trip === trip && vm.seatsSelectedDeparture2[index].seatNumber === seatNumber) {
                        if($stateParams.idReturn != "-1"){
                            if (vm.seatsSelectedDeparture2.length == vm.seatsSelectedReturn.length) {
                                vm.seatInSelection = vm.seatsSelectedDeparture2[index];
                                vm.seatsSelectedDeparture2.splice(index, 1);
                                vm.releaseSeat (trip, floor, seatNumber, update,index,bus);
                            }else{
                                console.log("Do not delete");
                            }
                        }else{
                            vm.seatInSelection = vm.seatsSelectedDeparture2[index];
                            vm.seatsSelectedDeparture2.splice(index, 1);
                            vm.releaseSeat (trip, floor, seatNumber, update,index,bus);
                         }
                    }
                }
            } else {
                if (bus == 0) {
                    if(vm.seatsSelectedReturn[index].trip === trip && vm.seatsSelectedReturn[index].seatNumber === seatNumber) {
                        if($stateParams.idReturn != "-1"){
                            if (vm.seatsSelectedDeparture.length == vm.seatsSelectedReturn.length) {
                                vm.seatInSelection = vm.seatsSelectedReturn[index];
                                vm.seatsSelectedReturn.splice(index, 1);
                                vm.releaseSeat (trip, floor, seatNumber, update,index, bus);
                            }else{
                                console.log("Do no delete");
                            }
                        }else{
                            vm.seatInSelection = vm.seatsSelectedReturn[index];
                            vm.seatsSelectedReturn.splice(index, 1);
                            vm.releaseSeat (trip, floor, seatNumber, update,index, bus);
                         }
                    }
                }else{
                    if(vm.seatsSelectedReturn2[index].trip === trip && vm.seatsSelectedReturn2[index].seatNumber === seatNumber) {
                        if($stateParams.idReturn != "-1"){
                            if (vm.seatsSelectedDeparture.length == vm.seatsSelectedReturn2.length) {
                                vm.seatInSelection = vm.seatsSelectedReturn2[index];
                                vm.seatsSelectedReturn2.splice(index, 1);
                                vm.releaseSeat (trip, floor, seatNumber, update,index);
                            }else{
                                console.log("Do no delete");
                            }
                        }else{
                            vm.seatInSelection = vm.seatsSelectedReturn2[index];
                            vm.seatsSelectedReturn2.splice(index, 1);
                            vm.releaseSeat (trip, floor, seatNumber, update,index);
                         }
                    }
                }
            }
		};

        function selectSeatAutomatic(trip,index) {
            console.log("Automatic Seat");
            $analytics.eventTrack('Select Seat Automatic', {  category: 'Seat', label: 'Automatic Seats' });
            if (trip == 0) {
                vm.seatInSelection.trip = trip;
                vm.seatInSelection.price = vm.trips.round.priceFloorOne;
                vm.seatInSelection.tripId = vm.trips.round.tripIdFloorOne;
                vm.seatInSelection.seatLabel = vm.roundSeats[vm.autoPassengers].label;
                vm.seatInSelection.seatNumber = vm.roundSeats[vm.autoPassengers].number;
                if (index == 0) {
                    if (vm.hasBoat) {
                        $('#formSeatBoat').modal('show');
                    }else{
                        $('#formSeat').modal('show');
                    }
                }else{
                    vm.addSeat();
                }
            }else{
                vm.seatInSelection.trip = trip;
                vm.seatInSelection.price = vm.trips.round.priceFloorOne;
                vm.seatInSelection.tripId = vm.trips.round.tripIdFloorOne;
                vm.seatInSelection.seatLabel = vm.returnSeats[vm.autoPassengers].label;
                vm.seatInSelection.seatNumber = vm.returnSeats[vm.autoPassengers].number;
                vm.addSeat();
            }

        }
        vm.seatRound = false;
        vm.seatReturn = false;
		vm.selectSeat = function (seatNumber, seatLabel, trip, floor, item, index) {
			//seatNUmber = Numero de asiento
			//trip => 0 = ida, 2= vuelta
			//floor = Numero de piso
            console.log(index);
			console.log(item);
            vm.index = index;

			if(item != null ){
				vm.seatInSelection = item;
				vm.seatInSelection.update = true;
                if (vm.hasBoat) {
                    $('#formSeatBoat').modal('show');
                }else{
                    $('#formSeat').modal('show');
                }
                vm.selectDepartureSeat = true
			}else{
                if($stateParams.idReturn != "-1"){
                    if(vm.seatInSelection.trip === 1){
                        vm.selectAgain = true;
                        //vm.resetSeatInSelection();
                    }
                }
				vm.seatInSelection.seatNumber = seatNumber;
                vm.seatInSelection.seatLabel = seatLabel;
	            vm.seatInSelection.trip = trip;
	            vm.seatInSelection.floor = floor;

                $analytics.eventTrack('Select Seat Open Form', {  category: 'Seat', label: 'Open Form' });
               
				if (trip === 0){
					if(floor === 1){
						vm.seatInSelection.tripId = vm.trips.round[0].tripIdFloorOne;
                        vm.seatInSelection.price = 0;
                        for (var i = 0; i <  vm.trips.round.length; i++) {
                            vm.seatInSelection.price = vm.seatInSelection.price + vm.trips.round[i].priceFloorOne;
                        }
					}else{
						vm.seatInSelection.tripId = vm.trips.round[0].tripIdFloorTwo;
                        vm.seatInSelection.price = 0;
                        for (var i = 0; i <  vm.trips.round.length; i++) {
                            vm.seatInSelection.price = vm.seatInSelection.price + vm.trips.round[i].priceFloorTwo;
                        }
					}
                    if (!vm.seatRound) {
                        if (vm.hasBoat) {
                            $('#formSeatBoat').modal('show');
                        }else{
                            $('#formSeat').modal('show');
                        }
                    }else{
                        vm.addSeat();
                    }
				}else {
					if(floor === 1){
						vm.seatInSelection.tripId = vm.trips.return[0].tripIdFloorOne;
                        vm.seatInSelection.price = 0;
                        for (var i = 0; i <  vm.trips.return.length; i++) {
                            vm.seatInSelection.price = vm.seatInSelection.price + vm.trips.return[i].priceFloorOne;
                        }
					}else{
						vm.seatInSelection.tripId = vm.trips.return[0].tripIdFloorTwo;
                        vm.seatInSelection.price = 0;
                        for (var i = 0; i <  vm.trips.return.length; i++) {
                            vm.seatInSelection.price = vm.seatInSelection.price + vm.trips.return[i].priceFloorTwo;
                        }
					}
                    vm.addSeat();
                    vm.index = index;
				}

				$scope.$apply();
			}
		};

		vm.updateTotals = function () {
			vm.totalSeats = 0;
			vm.totalMount = 0;

			for(var i = vm.seatsSelectedDeparture.length; i--;) {
				vm.totalSeats ++;
				// vm.totalMount += vm.seatsSelectedDeparture[i].price;
                // vm.totalMount = Math.round(vm.totalMount * 100) / 100;
        	}

            for(var i = vm.seatsSelectedReturn.length; i--;) {
				vm.totalSeats ++;
				// vm.totalMount += vm.seatsSelectedReturn[i].price;
                // vm.totalMount = Math.round(vm.totalMount * 100) / 100;
        	}

            if (vm.seatsSelectedReturn.length > 0) {
                vm.totalMount += vm.seatsSelectedReturn[0].price + vm.seatsSelectedDeparture[0].price;
                vm.totalMount = Math.round(vm.totalMount * 100) / 100;
            }else if(vm.seatsSelectedDeparture.length > 0){
                vm.totalMount += vm.seatsSelectedDeparture[0].price;
                vm.totalMount = Math.round(vm.totalMount * 100) / 100;
            }

		};

        function reserve() {
            reserveFactory
                .getAll(vm.seatsSelectedDeparture,vm.seatsSelectedDeparture2,vm.seatsSelectedReturn,vm.seatsSelectedReturn2,$stateParams.idDeparture,$stateParams.idReturn,vm.hasBoat)
                .then(function(data){
                    utilityService.setPayer(vm.seatsSelectedDeparture[0]);
                    utilityService.setPaymentData(data.idIda,data.idVuelta,data.totalPrice, data.totalFee, data.totalPayment, data.departure,data.return);
                    sessionStorageService.setPayer(vm.seatsSelectedDeparture[0]);
                    sessionStorageService.setPayment(data.idIda,data.idVuelta,data.totalPrice, data.totalFee, data.totalPayment, data.departure,data.return);
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

        function validateDni() {
            vm.dniEdit = true;
            vm.errorDni = true;
            if(vm.seatInSelection.document == 1){
                if(vm.seatInSelection.dni != undefined){
                    if(isDNI(vm.seatInSelection.dni)){
                        vm.errorDni = false;
                    }else{
                        vm.errorDni = true;
                    }
                }
            }else
            if(vm.seatInSelection.document == 2 || (vm.seatInSelection.docTypes == 1 && vm.hasBoat)){
                if(vm.seatInSelection.dni != undefined){
                    if(validateNif(vm.seatInSelection.dni)){
                        vm.errorDni = false;
                    }else{
                        vm.errorDni = true;
                    }
                }
            }else
            if(vm.seatInSelection.document == 3|| (vm.seatInSelection.docTypes == 3 || vm.seatInSelection.docTypes == 5 || vm.seatInSelection.docTypes == 4 && vm.hasBoat)){
                if(vm.seatInSelection.dni != undefined){
                    if(validatePassport(vm.seatInSelection.dni)){
                        vm.errorDni = false;
                    }else{        
                        vm.errorDni = true;
                    }
                }
            }else{
                if(vm.seatInSelection.dni != undefined){
                    if(isDNI(vm.seatInSelection.dni)){
                        vm.errorDni = false;
                    }else{
                        vm.errorDni = true;
                    }
                }
            }
        }

        function isDNI(dni) {
        	var numero, le, letra;
        	var expresion_regular_dni = /^[XYZ]?\d{5,8}[A-Z]$/;

        	dni = dni.toUpperCase();

        	if(expresion_regular_dni.test(dni) === true){
        		numero = dni.substr(0,dni.length-1);
        		numero = numero.replace('X', 0);
        		numero = numero.replace('Y', 1);
        		numero = numero.replace('Z', 2);
        		le = dni.substr(dni.length-1, 1);
        		numero = numero % 23;
        		letra = 'TRWAGMYFPDXBNJZSQVHLCKET';
        		letra = letra.substring(numero, numero+1);
        		if (letra != le) {
        			return false;
        		}else{
        			return true;
        		}
        	}else{
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

            if(expresion_regular_passport.test(value) === true){
                return true;
            }else{
                return false;
            }

        }

}


})();
