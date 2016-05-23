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

        SearchController.$inject =['locationsFactory','locationsRtFactory','travelsFactory','planesFactory','urlTrainFactory','weatherFactory','utilityService','$scope','$interval','$stateParams','$timeout','$rootScope','sessionStorageService','scraperFactory','ngProgressFactory','$analytics','screenSize'];

        function SearchController (locationsFactory,locationsRtFactory,travelsFactory,planesFactory,urlTrainFactory,weatherFactory,utilityService,$scope,$interval,$stateParams,$timeout,$rootScope,sessionStorageService,scraperFactory,ngProgressFactory,$analytics,screenSize) {

            var vm = this;
            vm.searchMobile = false;
            vm.searchTrip = searchTrip;
            vm.searching = false;
            vm.error = false;
            vm.order = order;
            vm.type = 'salida';
            vm.reverse = true;
            vm.companyFilter = companyFilter;
            vm.seatFilter = seatFilter;
            vm.disabled = false;
            vm.alternativeSearch = alternativeSearch;
            vm.selectDeparture = true;
            vm.departureSelect = departureSelect;
            vm.returnSelectTrain = returnSelectTrain;
            vm.isLoading = true;
            vm.good = true;
            vm.seats = [];
            vm.seatsReset = [];
            vm.companies = [];
            vm.companiesReset = [];
            vm.minDuration = '';
            vm.showBus = true;
            vm.showTrain = false;
            vm.showPlane = false;
            vm.hasPlaneTrips = false;
            vm.combineTrips = false;
            vm.cnames_es = [
            { name: 'AW', value:'Aruba' },
            { name: 'AF', value:'Afganistan' },
            { name: 'AO', value:'Angola' },
            { name: 'AI', value:'Anguilla' },
            { name: 'AX', value:'Islas Aland' },
            { name: 'AL', value:'Albania' },
            { name: 'AD', value:'Andorra' },
            { name: 'AE', value:'Emiratos Arabes Unidos' },
            { name: 'AR', value:'Argentina' },
            { name: 'AM', value:'Armenia' },
            { name: 'AS', value:'Samoa Americana' },
            { name: 'ATA', value:'Antartica' },
            { name: 'ATF', value:'Territorios Franceses del Sur' },
            { name: 'AG', value:'Antigua y Barbuda' },
            { name: 'AU', value:'Australia' },
            { name: 'AT', value:'Austria' },
            { name: 'AZ', value:'Azerbaiyán' },
            { name: 'BI', value:'Burundi' },
            { name: 'BE', value:'Belgica' },
            { name: 'BJ', value:'Benin' },
            { name: 'BQ', value:'Bonaire, San Eustaquio y Saba' },
            { name: 'BF', value:'Burkina Faso' },
            { name: 'BD', value:'Bangladesh' },
            { name: 'BG', value:'Bulgaria' },
            { name: 'BHR', value:'Bahrein' },
            { name: 'BS', value:'Bahamas' },
            { name: 'BA', value:'Bosnia y Herzegovina' },
            { name: 'BL', value:'San Bartolomé' },
            { name: 'BY', value:'Bielorrusia' },
            { name: 'BZ', value:'Belice' },
            { name: 'BM', value:'Bermuda' },
            { name: 'BO', value:'Bolivia, Estado Plurinacional de' },
            { name: 'BR', value:'Brasil' },
            { name: 'BB', value:'Barbados' },
            { name: 'BN', value:'Brunei Darussalam' },
            { name: 'BTN', value:'Bhután' },
            { name: 'BT', value:'Isla Bouvet' },
            { name: 'BW', value:'Botswana' },
            { name: 'CF', value:'República Centroafricana' },
            { name: 'CA', value:'Canadá' },
            { name: 'CC', value:'Islas Cocos (Keeling)' },
            { name: 'CH', value:'Suiza' },
            { name: 'CL', value:'Chile' },
            { name: 'CN', value:'China' },
            { name: 'CIV', value:'Côte d\'Ivoire' },
            { name: 'CM', value:'Camerún' },
            { name: 'CD', value:'Congo, la República Democrática del' },
            { name: 'CG', value:'Congo' },
            { name: 'CK', value:'Islas Cook' },
            { name: 'CO', value:'Colombia' },
            { name: 'KM', value:'Comoras' },
            { name: 'CV', value:'Cabo Verde' },
            { name: 'CR', value:'Costa Rica' },
            { name: 'CU', value:'Cuba' },
            { name: 'CW', value:'Curazao' },
            { name: 'CX', value:'Islas Navidad' },
            { name: 'KY', value:'Islas Caimán' },
            { name: 'CY', value:'Chipre' },
            { name: 'CZ', value:'República Checa' },
            { name: 'DE', value:'Alemania' },
            { name: 'DJI', value:'Djibouti' },
            { name: 'DM', value:'Dominica' },
            { name: 'DK', value:'Dinamarca' },
            { name: 'DO', value:'República Dominicana' },
            { name: 'DZ', value:'Argelia' },
            { name: 'EC', value:'Ecuador' },
            { name: 'EG', value:'Egipto' },
            { name: 'ER', value:'Eritrea' },
            { name: 'EH', value:'Sahara Occidental' },
            { name: 'ES', value:'España' },
            { name: 'EE', value:'Estonia' },
            { name: 'ET', value:'Etiopía' },
            { name: 'FI', value:'Finlandia' },
            { name: 'FJ', value:'Fiji' },
            { name: 'FK', value:'Islas Malvinas (Falkland)' },
            { name: 'FR', value:'Francia' },
            { name: 'FO', value:'Islas Feroe' },
            { name: 'FM', value:'Micronesia, Estados Federados de' },
            { name: 'GA', value:'Gabón' },
            { name: 'GB', value:'Reino Unido' },
            { name: 'GE', value:'Georgia' },
            { name: 'GG', value:'Guernsey' },
            { name: 'GA', value:'Ghana' },
            { name: 'GI', value:'Gibralta' },
            { name: 'GN', value:'Guinea' },
            { name: 'GP', value:'Guadalupe' },
            { name: 'GM', value:'Gambia' },
            { name: 'GW', value:'Guinea-Bissau' },
            { name: 'GQ', value:'Guinea Ecuatorial' },
            { name: 'GR', value:'Grecia' },
            { name: 'GD', value:'Granada' },
            { name: 'GL', value:'Groenlandia' },
            { name: 'GT', value:'Guatemala' },
            { name: 'GF', value:'Guayana Francesa' },
            { name: 'GU', value:'Guam' },
            { name: 'GY', value:'Guyana' },
            { name: 'HK', value:'Hong Kong' },
            { name: 'HM', value:'Islas Heard Island and McDonald' },
            { name: 'HN', value:'Honduras' },
            { name: 'HR', value:'Croacia' },
            { name: 'HT', value:'Haití' },
            { name: 'HU', value:'Hungria' },
            { name: 'ID', value:'Indonesia' },
            { name: 'IM', value:'Isla de Man' },
            { name: 'IN', value:'India' },
            { name: 'IO', value:'Territorio Británico del Océano Índico' },
            { name: 'IE', value:'Irlanda' },
            { name: 'IR', value:'Irán, República Islámica de' },
            { name: 'IQ', value:'Irak' },
            { name: 'IS', value:'Islandia' },
            { name: 'IL', value:'Israel' },
            { name: 'IT', value:'Italia' },
            { name: 'JM', value:'Jamaica' },
            { name: 'JE', value:'Jersey' },
            { name: 'JO', value:'Jordan' },
            { name: 'JP', value:'Japón' },
            { name: 'KZ', value:'Kazajstán' },
            { name: 'KE', value:'Kenia' },
            { name: 'KG', value:'Kirguistán' },
            { name: 'KH', value:'Camboya' },
            { name: 'KI', value:'Kiribati' },
            { name: 'KNA', value:'Saint Kitts and Nevis' },
            { name: 'KR', value:'Corea del Sur' },
            { name: 'KW', value:'Kuwait' },
            { name: 'LAO', value:'Lao People\'s República Democrática' },
            { name: 'LB', value:'Líbano' },
            { name: 'LR', value:'Liberia' },
            { name: 'LBY', value:'Jamahiriya Árabe Libia' },
            { name: 'LC', value:'Santa Lucia' },
            { name: 'LIE', value:'Liechtenstein' },
            { name: 'LK', value:'Sri Lanka' },
            { name: 'LS', value:'Lesotho' },
            { name: 'LT', value:'Lituania' },
            { name: 'LU', value:'Luxemburgo' },
            { name: 'LV', value:'Letonia' },
            { name: 'MO', value:'Macao' },
            { name: 'MF', value:'San Martín (parte francesa)' },
            { name: 'MA', value:'Marruecos' },
            { name: 'MC', value:'Monaco' },
            { name: 'MD', value:'Moldova, República de' },
            { name: 'MG', value:'Madagascar' },
            { name: 'MV', value:'Maldivas' },
            { name: 'MX', value:'México' },
            { name: 'MH', value:'Islas Marshal' },
            { name: 'MK', value:'Macedonia, la ex República Yugoslava de' },
            { name: 'ML', value:'Mali' },
            { name: 'MT', value:'Malta' },
            { name: 'MM', value:'Myanmar' },
            { name: 'ME', value:'Montenegro' },
            { name: 'MN', value:'Mongolia' },
            { name: 'MP', value:'Islas Marianas del Norte' },
            { name: 'MZ', value:'Mozambique' },
            { name: 'MR', value:'Mauritania' },
            { name: 'MS', value:'Montserrat' },
            { name: 'MQ', value:'Martinica' },
            { name: 'MU', value:'Mauricio' },
            { name: 'MWI', value:'Malawi' },
            { name: 'MY', value:'Malasia' },
            { name: 'YT', value:'Mayotte' },
            { name: 'NA', value:'Namibia' },
            { name: 'NC', value:'Nueva Caledonia' },
            { name: 'NE', value:'Niger' },
            { name: 'NF', value:'Islas Norfolk' },
            { name: 'NG', value:'Nigeria' },
            { name: 'NI', value:'Nicaragua' },
            { name: 'NU', value:'Niue' },
            { name: 'NL', value:'Paises Bajos' },
            { name: 'NO', value:'Noruega' },
            { name: 'NP', value:'Nepal' },
            { name: 'NR', value:'Nauru' },
            { name: 'NZ', value:'Nueva Zelanda' },
            { name: 'OM', value:'Omán' },
            { name: 'PK', value:'Pakistán' },
            { name: 'PA', value:'Panamá' },
            { name: 'PN', value:'Pitcairn' },
            { name: 'PE', value:'Perú' },
            { name: 'PH', value:'Filipinas' },
            { name: 'PW', value:'Palau' },
            { name: 'PG', value:'Papúa Nueva Guinea' },
            { name: 'PL', value:'Polonia' },
            { name: 'PR', value:'Puerto Rico' },
            { name: 'KP', value:'Corea Democrática Popular de la República' },
            { name: 'PT', value:'Portugal' },
            { name: 'PY', value:'Paraguay' },
            { name: 'PS', value:'Palestina, Territorio Ocupado' },
            { name: 'PF', value:'Polinesia Francesa' },
            { name: 'QA', value:'Qatar' },
            { name: 'RE', value:'Reunión' },
            { name: 'RO', value:'Rumanía' },
            { name: 'RU', value:'Rusia' },
            { name: 'RW', value:'Ruanda' },
            { name: 'SA', value:'Arabia Saudita' },
            { name: 'SD', value:'Sudán' },
            { name: 'SN', value:'Senegal' },
            { name: 'SG', value:'Singapur' },
            { name: 'GS', value:'Georgia del Sur y las Islas Sandwich del Sur' },
            { name: 'SH', value:'Santa Helena, Ascensión y Tristán da Cunha' },
            { name: 'SJ', value:'Svalbard y Jan Mayen' },
            { name: 'SB', value:'Islas Sálomon' },
            { name: 'SL', value:'Sierra Leona' },
            { name: 'SV', value:'El Salvador' },
            { name: 'SM', value:'San Marino' },
            { name: 'SO', value:'Somalia' },
            { name: 'PM', value:'San Pedro y Miquelón' },
            { name: 'RS', value:'Serbia' },
            { name: 'ST', value:'Santo Tomé y Príncipe' },
            { name: 'SR', value:'Surinam' },
            { name: 'SK', value:'Eslovaquia' },
            { name: 'SI', value:'Eslovenia' },
            { name: 'SE', value:'Suecia' },
            { name: 'SWZ', value:'Swazilandia' },
            { name: 'SXM', value:'Saint Maarten (parte neerlandesa)' },
            { name: 'SYC', value:'Seychelles' },
            { name: 'SY', value:'Siria' },
            { name: 'TC', value:'Islas Turcas y Caicos' },
            { name: 'TD', value:'Chad' },
            { name: 'TG', value:'Togo' },
            { name: 'TH', value:'Tailandia' },
            { name: 'TJ', value:'Tayikistán' },
            { name: 'TK', value:'Tokelau' },
            { name: 'TM', value:'Turkmenistán' },
            { name: 'TL', value:'Timor-Leste' },
            { name: 'TO', value:'Tonga' },
            { name: 'TT', value:'Trinidad y Tobago' },
            { name: 'TN', value:'Túnez' },
            { name: 'TR', value:'Turquía' },
            { name: 'TV', value:'Tuvalu' },
            { name: 'TW', value:'Taiwán, Provincia de China' },
            { name: 'TZ', value:'Tanzania, República Unida de' },
            { name: 'UG', value:'Uganda' },
            { name: 'UA', value:'Ucrania' },
            { name: 'UMI', value:'Estados Unidos Islas menores alejadas' },
            { name: 'UY', value:'Uruguay' },
            { name: 'US', value:'Estados Unidos' },
            { name: 'UZ', value:'Uzbekistán' },
            { name: 'VA', value:'Santa Sede (Ciudad del Vaticano)' },
            { name: 'VC', value:'San Vicente y las Granadinas' },
            { name: 'VE', value:'Venezuela, República Bolivariana de' },
            { name: 'VG', value:'Islars Virgenes, Británicas' },
            { name: 'VI', value:'Islas Virgenes,, U.S.' },
            { name: 'VM', value:'Viet Nam' },
            { name: 'VU', value:'Vanuatu' },
            { name: 'WF', value:'Wallis and Futuna' },
            { name: 'WS', value:'Samoa' },
            { name: 'YE', value:'Yemen' },
            { name: 'ZA', value:'Sudáfrica' },
            { name: 'ZM', value:'Zambia' },
            { name: 'ZW', value:'Zimbabwe '}
        ];

            vm.weather_progressbar = ngProgressFactory.createInstance();
            vm.weather_progressbar.setHeight('6px');
            vm.weather_progressbar.setColor('#29abe5');
            vm.weather_progressbar.setParent(document.getElementById('weather_progress'));
            vm.weather_progressbar.setAbsolute();

            vm.weather_progress_scraper = ngProgressFactory.createInstance();
            vm.weather_progress_scraper.setHeight('6px');
            vm.weather_progress_scraper.setColor('#29abe5');
            vm.weather_progress_scraper.setParent(document.getElementById('weather_progress_scraper'));
            vm.weather_progress_scraper.setAbsolute();

            vm.nextDay = nextDay;
            vm.findMixRoutes = findMixRoutes;
            vm.firstStep = firstStep;
            vm.resetFirstSetep = resetFirstSetep;

            vm.myOptionsOrigin = [];
            vm.myOptionsDestination = [];

        	
            vm.myConfigOrigin = {
                //create: true,
                valueField: 'id',
                labelField: 'name',
                searchField: ['name'],
                delimiter: '|',
                openOnFocus: true,
                placeholder: 'Elige tu origen',
                onInitialize: function(selectize){
                    // receives the selectize object as an argument
                },
                maxItems: 1,
                preload: true,
                load: function(query, callback) {
                    if (!query.length) return callback();
                    vm.myOptionsOrigin = [];
                    locationsRtFactory
                    .getAll(query)
                    .then(function (data) {

                        callback(data);
                        vm.myOptionsOrigin = data;
                        //sessionStorageService.setLocations(data);
                        //sessionStorageService.setFlag(true);
                    })
                    .catch(function (err) {
                         callback();
                    });
                }
            };

            vm.myConfigDestination = {
                //create: true,
                valueField: 'id',
                labelField: 'name',
                searchField: ['name'],
                delimiter: '|',
                placeholder: 'Elige tu destino',
                onInitialize: function(selectize){
                    // receives the selectize object as an argument
                },
                maxItems: 1,
                preload: true,
                load: function(query, callback) {
                    if (!query.length) return callback();
                    vm.myOptionsDestination = [];
                    locationsRtFactory
                    .getAll(query)
                    .then(function (data) {
                        callback(data);
                        vm.myOptionsDestination = data;
                        //sessionStorageService.setLocations(data);
                        //sessionStorageService.setFlag(true);
                    })
                    .catch(function (err) {
                         callback();
                    });
                }
            };

            locationsRtFactory
                .getNearly()
                .then(function (data) {
                    // callback(data.items);
                    vm.myOptionsOrigin = data.nearPlaces;
                    vm.myOptionsDestination = data.nearPlaces;
                    //sessionStorageService.setLocations(data);
                    //sessionStorageService.setFlag(true);
                })
                .catch(function (err) {
                    console.log(err);
                    //  callback();
                });

            
            vm.dates = {
                departureDate: '',
                returnDate: '',
                minDate: moment().format('MM-DD-YYYY'),
                maxDate: moment().add(365, 'days').format('MM-DD-YYYY')
            };

            var toUTCDate = function(date){
                var _utc = new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(),  date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());
                return _utc;
            };

            var millisToUTCDate = function(millis){
                return toUTCDate(new Date(millis));
            };

            var mixedTripIcon = function(tripSection, typeTrip){
                if(tripSection <= 1 && tripSection >= 0){
                    var sections = typeTrip.split('_');
                    return sections[tripSection] === 'bus' ? 'fa-bus' : 'fa-ship';
                }
            }

            var showTripsType = function(tripType){
                vm.combineTrips = false; 
                $('.fa-trip-type').addClass('hidden');

                switch(tripType) {
                    case 'bus':
                        vm.showBus = true;
                        vm.showPlane = false;
                        vm.showTrain = false;
                        $('.tab-filter').removeClass('active');
                        $('.tab_bus').addClass('active');
                        break;
                    case 'train':
                        vm.showBus = false;
                        vm.showPlane = false;
                        vm.showTrain = true;
                        $('.tab-filter').removeClass('active');
                        $('.tab_train').addClass('active');
                        break;
                    case 'plane':
                        vm.showBus = false;
                        vm.showPlane = true;
                        vm.showTrain = false;
                        $('.tab-filter').removeClass('active');
                        $('.tab_plane').addClass('active');
                        break;
                }              
            }

            var getTripsSteps = function(maxDuration, tripDuration){
                var step = Math.floor(maxDuration/4);
                var total = Math.floor(tripDuration/step);
                var range = [];
                for(var i=1;i<=total;i++) {
                    range.push(i);
               }   
               return range;          
            }

            var getPlanesSteps = function(segments){
                var total = Math.floor(segments);
                var range = [];
                for(var i=1;i<=total;i++) {
                    range.push(i);
               }   
               return range;          
            }

            var getHourMinPlanes = function(minutes){
                var realmin = minutes % 60
                var hours = Math.floor(minutes / 60)
                return hours+'hrs '+realmin+'min';          
            }

            $scope.$watch('search.combineTrips', function(newVal, oldVal){
                if (newVal != oldVal && newVal != undefined) {
                    if(newVal === true){
                        vm.showBus = true;
                        vm.showPlane = true;
                        vm.showTrain = true;
                        $('.tab-filter').removeClass('active');
                        $('.fa-trip-type').removeClass('hidden');

                    }else{
                        vm.showBus = true;
                        vm.showPlane = false;
                        vm.showTrain = false;
                        $('#tab_bus').addClass('active');
                    }
                   
                }
            }, true);

            vm.toUTCDate = toUTCDate;
            vm.millisToUTCDate = millisToUTCDate;
            vm.mixedTripIcon = mixedTripIcon;
            vm.showTripsType = showTripsType;
            vm.getTripsSteps = getTripsSteps;
            vm.getPlanesSteps = getPlanesSteps;
            vm.getHourMinPlanes = getHourMinPlanes;

            var durationFormatted = function(duration) {
                return Math.floor(duration / 60) + " hrs " + (duration % 60) + " min"
            };

            vm.durationFormatted = durationFormatted;

            function setDateFilterRange(maxprice,minprice){
                vm.priceSlider = {
                     price: maxprice+1,
                     options: {
                         showSelectionBar: true,
                         translate: function(value) {
                             return '€' + value;
                         },
                         floor: 0,
                         ceil: maxprice+1,
                     }
                 };
            }

            vm.hourSlider = {
                minValue: 0,
                maxValue: 23,
                options: {
                    floor: 0,
                    ceil: 23,
                    translate: function(value, sliderId, label) {
                        switch (label) {
                            case 'model':
                              return value+':00 HRS';
                            case 'high':
                              return value+':59 HRS';
                            default:
                              return value+':HRS'
                          }
                    },
                    step: 1
                }
             };

             /*var session = sessionStorageService.getFlag();
             if (session == null || session == false) {
                 locationsFactory
                     .getAll()
                     .then(function (data) {
                         vm.myOptions = data;
                         sessionStorageService.setLocations(data);
                         sessionStorageService.setFlag(true);
                     })
                     .catch(function (err) {
                         console.log(err);
                     });
             }else{
                 vm.myOptions = sessionStorageService.getLocations()
             }*/

             vm.myOptionsOrigin = sessionStorageService.getLocations()
              vm.myOptionsDestination = sessionStorageService.getLocations()


            var params = utilityService.getData();
          	vm.origin = params.origin + ', ' + params.countryOrigin;
            vm.originCountryCode = params.originCountryCode;
          	vm.destination = params.destination + ', ' + params.countryDestination;
            vm.destinationCountryCode = params.destinationCountryCode;
            vm.dates.departureDate = params.departure;
            vm.dates.returnDate = params.returns;
            vm.countryOrigin = params.countryOrigin;
            vm.countryDestination = params.countryDestination;
            vm.passengers = parseInt(params.passengers);
            vm.passengersAdult  = parseInt(params.passengersAdult);
            vm.passengersChild  = parseInt(params.passengersChild);
            vm.passengersBaby  = parseInt(params.passengersBaby);

            vm.weather = weatherFactory.getWeather(params.destination, 'es');
            vm.weather_progressbar.reset();
            vm.weather_progressbar.start();

            vm.updatePassengers = function(type, direction){
                
                if(direction == 'up' && vm.passengers < 7){
                    if(type=='adult'){
                       vm.passengersAdult = vm.passengersAdult + 1;  
                    }
                    if(type=='child'){
                        vm.passengersChild =  vm.passengersChild + 1;
                    } 
                    if(type=='baby'){
                        vm.passengersBaby = vm.passengersBaby + 1;
                    } 
                }

                if(direction == 'dwn'){
                    if(type=='adult' && vm.passengersAdult > 0){
                       vm.passengersAdult = vm.passengersAdult - 1;  
                    }
                    if(type=='child' && vm.passengersChild > 0){
                        vm.passengersChild =  vm.passengersChild - 1;
                    } 
                    if(type=='baby' && vm.passengersBaby > 0){
                        vm.passengersBaby = vm.passengersBaby - 1;
                    } 
                }
                vm.passengers =  parseInt(vm.passengersAdult)  + parseInt(vm.passengersChild) + parseInt(vm.passengersBaby);
                $('#select_passengers').val(vm.passengers);
            };

            vm.updateSearchMobile = function(){
                vm.searchMobile = !vm.searchMobile;
            };

            vm.searchMobile = screenSize.on('xs, sm', function(isMatch){
                vm.searchMobile = !isMatch;
            });

            vm.tripDetails = function($event){
                var elementId = '#trip_details_'+jQuery(jQuery($event.target)[0]).attr('data-trip-id');
                $(elementId).slideToggle( "slow" );
            };

            if (screenSize.is('xs, sm')) {
                // it's a mobile device so fetch a small image
                vm.searchMobile = false;
            }else {
                // it's a desktop size so do the complicated calculations and render that
                vm.searchMobile = true;
            }

            var url = '/search/' + $stateParams.origin + '/' + $stateParams.originCountryCode + '/' + $stateParams.destination + '/' +$stateParams.destinationCountryCode + '/' + $stateParams.departureDate + '/' + $stateParams.returnDate;
            utilityService.setSearch(url);
            sessionStorageService.setUrl(url);
            $rootScope.$broadcast('counterEvent', 1, false);

            if(params.origin != null){
                var title = "Billetes de Autobús | "+params.origin+" a "+params.destination+" | Resertrip ";
                var description = "Compra billetes de autobús online con Resertrip. Elige entre docenas de empresa y encuentra el mejor precio. Planear tu viaje nunca ha sido tan fácil.";
                $rootScope.$broadcast('titleEvent', title);
                $rootScope.$broadcast('descriptionEvent', description);

                vm.results = false;
                vm.trips = [];
                vm.scraperTrips = [];
                vm.searching = true;
                vm.error = false;
                vm.disabled = true;
                setTimeout(function () {
                        $('.pikaday__display').prop('disabled', true);
                }, 100);

                //Eventos Google Analytics
                $analytics.eventTrack('Origin City', {  category: 'Search', label: params.origin });
                $analytics.eventTrack('Destination City', {  category: 'Search', label: params.destination });
                $analytics.eventTrack('Origin Country', {  category: 'Search', label: params.originCountryCode });
                $analytics.eventTrack('Destination Country', {  category: 'Search', label: params.destinationCountryCode });
                $analytics.eventTrack('Number Passengers', {  category: 'Search', label: 'Total Passengers', value: params.passengers });
                if ((params.returns).length == 0) {
                    $analytics.eventTrack('Trip Type', {  category: 'Search', label: 'One Way' });
                }else{
                    $analytics.eventTrack('Trip Type', {  category: 'Search', label: 'Round Trip' });
                    $analytics.eventTrack('Diff Days', {  category: 'Search', label: 'Diff Days', value: diffDays(params.departure,params.returns) });
                }

                travelsFactory
                    .getAll(params.origin, params.destination, params.departure, params.returns, params.passengers, params.originCountryCode, params.destinationCountryCode,params.passengersAdult,params.passengersChild,params.passengersBaby)
                    .then(function(data){

                        vm.isLoading = false;
                        vm.trips = data;
                        vm.searching = false;
                        vm.results = true;
                        vm.disabled = false;
                        vm.minDuration = data.minDuration;
                        vm.isMixedTrips = data.isMixedTrips;
                        $('.pikaday__display').prop('disabled', false);
                        vm.weather_progressbar.stop();
                        var time = $timeout(function () {
                            vm.maxPrice = data.maxPrice;
                            vm.minPrice = data.minPrice;
                            setDateFilterRange(data.maxPrice,data.minPrice);
                        }, 100);
                        for (var i = 0; i < data.typeServices.length; i++) {
                            vm.seats.push(data.typeServices[i].name)
                        }
                        vm.seatsReset = vm.seats;
                        for (var i = 0; i < data.companies.length; i++) {
                            vm.companies.push(data.companies[i].name)
                        }
                        vm.companiesReset = vm.companies;
                        vm.weather_progress_scraper.reset();
                        vm.weather_progress_scraper.start();

                          //AVIONES        
                        planesFactory
                            .getAll(params.origin, params.destination, params.departure, params.returns, params.passengers, params.originCountryCode, params.destinationCountryCode);
                            vm.scraperFlag = true;
                            var planesTime = $timeout(function () {
                                var planesData = planesFactory.getData();
                                if (!planesData.data.id || planesData.data.tickets.length ==0) {
                                    var planesTime2 = $timeout(function () {
                                        vm.planesTrips = planesData.data.tickets;
                    //                    scraperManager(scraperData.data.tickets);
                                        if (planesData.data.tickets.length ==0) {
                                            vm.planesFlag = false;
                                        }else{
                                            vm.planesFlag = false;
                                        }
                                    }, 20000);
                                }
                                vm.planesTrips = planesData.data.tickets;
                                if (planesData.data.tickets != undefined) {
                                    if (planesData.data.tickets.length != 0) {
                                        vm.planesFlag = true;
                                        vm.hasPlaneTrips = true;
                                        //scraperManager(scraperData.data.tickets);
                                    }else{
                                        vm.planesFlag = false;
                                    }
                                }
                            }, 15000);

                            // END AVIONES

                        scraperFactory
                            .getAll(params.origin, params.destination, params.departure, params.returns, params.passengers, params.originCountryCode, params.destinationCountryCode)
                            vm.scraperFlag = true;
                            var scraperTime = $timeout(function () {
                                var scraperData = scraperFactory.getData();
                                if (!scraperData.data.id || scraperData.data.tickets.length ==0) {
                                    var scraperTime2 = $timeout(function () {
                                        vm.scraperTrips = scraperData.data;
                                        scraperManager(scraperData.data.tickets);
                                        if (scraperData.data.tickets.length ==0) {
                                            vm.scraperFlag = false;
                                        }else{
                                            vm.scraperFlag = false;
                                        }
                                    }, 20000);
                                }
                                vm.scraperTrips = scraperData.data;
                                if (scraperData.data.tickets != undefined) {
                                    if (scraperData.data.tickets.length != 0) {
                                        vm.scraperFlag = false;
                                        scraperManager(scraperData.data.tickets);
                                    }else{
                                        vm.scraperFlag = false;
                                    }
                                }
                            }, 15000);
                        utilityService.setData(null,null,null,null, null, null, null);
                    })
                    .catch(function(err){
                        console.log(err);
                        vm.searching = false;
                        vm.error = true;
                        vm.msgError = err;
                        vm.disabled = false;
                        $('.pikaday__display').prop('disabled', false);
                        apiError();
                        utilityService.setData(null,null,null,null, null, null, null);
                    })

            }else{
                console.log('POR AQIO');
                var origin = $stateParams.origin.split(",");
                var destination = $stateParams.destination.split(",");

                var dateDeparture = new Date(parseInt($stateParams.departureDate));
                var dateReturn = ""
                var returnDateFormat = ""
                var formatOrigin;
                var formatDestination;

                var specialLocations = ['A_Coruna','Logrono','Ona','Sona','Arino','Banos','Bonar','Pinar','Riano','Beleno',
                                        'Bikuna','Brinas','Bunuel','Caneda','Canedo','Degana','Duenas','Soto_Duenas','Finana','Granon',
                                        'Guenes','Iguena','Minano','Muneca','Norena','Susane','Verina','Vicuna','Albunol','Alcaniz',
                                        'Anezcar','Argonos','Borlena','Calanas','Cocenas','Cegunal','E.Gonar','Iraneta','La_Pena','La_Vina',
                                        'Penalba','Porrino','Saldana','Santona','Vinuela','A_Caniza','A_Sudina','Avinante','Canarico','Barinas',
                                        'Lecinana','Ontinena','Sarinena','Cadinano','Camarinas','Fustinana','La_Vinuela','Sabinanigo','Soto_De_Luina','Finana_Empolme',
                                        'Penaflor','Penuelas','Sopenano','Peniscola','Salobrena','V.Pecenil','Penahorada','Penarrolla','Valdepenas','Soto_Duenas',
                                        'Penapardas_Cruce','Santibanes_Pena','Finca_Los_Cedenos','Penalba_De_Castro','Quint._Entrepenas','Penaranda_De_Duenno','Carrena_De_Cabrales','Treceno_(Valdalija)','Castrejon_De_La_Pena','Linares_(Penarubia)',
                                        'Pisuena_-_B.Guzmazan','Villaverde_De_La_Pena','Castaneo','Codonera','La_Buniza','Villafane','Fernan_Nunes','Canete_La_Real','Campo_De_Santibanez','Socobio_(Castaneda)',
                                        'Santibanes_De_Valdeiglesias','Villamonio','Ventas_De_Canizar','Codonera','Dona_Maria','El_Madrono','Dona_Mencia','Fuentes_De_Onoro','Alto_San_Mateo_-_Maono','V.Castanos',
                                        'Canos_De_Meca','Quintanaostono','Banos_De_Montemayor','Martin_Monos_De_Las_Posadas','Armuna_Al','Cabronana','Albunuelas','Puente_De_Tuna','Arenas_De_Iguna','Oruna_De_Pielagos',
                                        'Cabanuelas'];

                for (var i = 0; i < specialLocations.length; i++) {
                    if ($stateParams.origin == specialLocations[i]) {
                        formatOrigin = $stateParams.origin.replace(/n/g, 'ñ');
                        formatOrigin = formatOrigin.replace(/_/g, ' ');
                        break;
                    }else{
                        formatOrigin = $stateParams.origin.replace(/_/g, ' ');
                    }
                }
                for (var i = 0; i < specialLocations.length; i++) {
                    if ($stateParams.destination == specialLocations[i]) {
                        formatDestination = $stateParams.destination.replace(/n/g, 'ñ');
                        formatDestination = formatDestination.replace(/_/g, ' ');
                        break;
                    }else{
                        formatDestination = $stateParams.destination.replace(/_/g, ' ');
                    }
                }

                if($stateParams.returnDate ==  "NaN"){
                    returnDateFormat = "";
                }else{
                    dateReturn = new Date(parseInt($stateParams.returnDate));
                    var returnDay = dateReturn.getDate();
                    var returnMonth = dateReturn.getMonth()+1;
                    var returnYear = dateReturn.getFullYear();

                    if(parseInt(returnDay) < 10){
                        returnDay = '0'+returnDay;
                    }
                    if(parseInt(returnMonth) < 10){
                        returnMonth = '0'+returnMonth;
                    }
                    returnDateFormat = returnDay+"/"+returnMonth+"/"+returnYear;
                }
                var departureDay = dateDeparture.getDate();
                var departureMonth = dateDeparture.getMonth()+1;
                var departureYear = dateDeparture.getFullYear();

                if(parseInt(departureDay) < 10){
                    departureDay = '0'+departureDay;
                }
                if(parseInt(departureMonth) < 10){
                    departureMonth = '0'+departureMonth;
                }
                var departureDateFormat = departureDay+'/'+departureMonth+'/'+departureYear;
                
                angular.forEach(vm.cnames_es, function(value, key) {
                    if(vm.cnames_es[key].name === $stateParams.originCountryCode){
                        vm.originCountry = vm.cnames_es[key].value;
                    }
                    if (vm.cnames_es[key].name === $stateParams.destinationCountryCode) {
                        vm.destinationCountry = vm.cnames_es[key].value;
                    }
                });



                vm.origin = formatOrigin + ', ' + vm.originCountry;
                vm.originCountryCode= $stateParams.originCountryCode;
                vm.destination = formatDestination + ', ' + vm.destinationCountry;
                vm.destinationCountryCode = $stateParams.destinationCountryCode;
                vm.dates.departureDate = departureDateFormat;
                vm.dates.returnDate = returnDateFormat;
                vm.countryOrigin = origin[1];
                vm.countryDestination = destination[1];
                vm.passengers  = 1;

                if(!sessionStorageService.getPassengers()){
                    sessionStorageService.setPassengers(1,0,0);
                }
                vm.passengersAdult  = parseInt(sessionStorageService.getPassengers().passengersAdult);
                vm.passengersChild  = parseInt(sessionStorageService.getPassengers().passengersChild);
                vm.passengersBaby  = parseInt(sessionStorageService.getPassengers().passengersBaby);

                vm.results = false;
                vm.trips = [];
                vm.scraperTrips = [];
                vm.searching = true;
                vm.error = false;
                vm.disabled = true;
                setTimeout(function () {
                        $('.pikaday__display').prop('disabled', true);
                }, 100);

                var title = "Billetes de Autobús | "+$stateParams.origin+" a "+$stateParams.destination+" | Resertrip ";
                var description = "Compra billetes de autobús online con Resertrip. Elige entre docenas de empresa y encuentra el mejor precio. Planear tu viaje nunca ha sido tan fácil.";
                $rootScope.$broadcast('titleEvent', title);
                $rootScope.$broadcast('descriptionEvent', description);
                vm.weather = weatherFactory.getWeather($stateParams.destination, 'es');
                vm.weather_progressbar.reset();
                vm.weather_progressbar.start();

                //Eventos Google Analytics
                $analytics.eventTrack('Origin City', {  category: 'Search', label: formatOrigin });
                $analytics.eventTrack('Destination City', {  category: 'Search', label: formatDestination });
                $analytics.eventTrack('Origin Country', {  category: 'Search', label: $stateParams.originCountryCode });
                $analytics.eventTrack('Destination Country', {  category: 'Search', label: $stateParams.destinationCountryCode });
                $analytics.eventTrack('Number Passengers', {  category: 'Search', label: 'Total Passengers', value: vm.passengers });
                if ((returnDateFormat).length == 0) {
                    $analytics.eventTrack('Trip Type', {  category: 'Search', label: 'One Way' });
                }else{
                    $analytics.eventTrack('Trip Type', {  category: 'Search', label: 'Round Trip' });
                    $analytics.eventTrack('Diff Days', {  category: 'Search', label: 'Diff Days', value: diffDays(departureDateFormat,returnDateFormat) });
                }

                travelsFactory
                    .getAll(formatOrigin,formatDestination,departureDateFormat,returnDateFormat,vm.passengers,$stateParams.originCountryCode,$stateParams.destinationCountryCode,vm.passengersAdult,vm.passengersChild,vm.passengersBaby)
                    .then(function(data){
                        vm.isLoading = false;
                        vm.trips = data;
                        vm.searching = false;
                        vm.results = true;
                        vm.disabled = false;
                        vm.minDuration = data.minDuration;
                        vm.isMixedTrips = data.isMixedTrips;
                        $('.pikaday__display').prop('disabled', false);
                        vm.weather_progressbar.stop();
                       

                        var time = $timeout(function () {
                            vm.maxPrice = data.maxPrice;
                            vm.minPrice = data.minPrice;
                            setDateFilterRange(data.maxPrice,data.minPrice);
                        }, 100);

                        for (var i = 0; i < data.typeServices.length; i++) {
                            vm.seats.push(data.typeServices[i].name)
                        }
                        vm.seatsReset = vm.seats;
                        for (var i = 0; i < data.companies.length; i++) {
                            vm.companies.push(data.companies[i].name)
                        }
                        vm.companiesReset = vm.companies;
                        vm.weather_progress_scraper.reset();
                        vm.weather_progress_scraper.start();

                          //AVIONES        
                        planesFactory
                            .getAll(formatOrigin, formatDestination, departureDateFormat, returnDateFormat, vm.passengers, $stateParams.originCountryCode, $stateParams.destinationCountryCode);
                            vm.scraperFlag = true;
                            var planesTime = $timeout(function () {
                                var planesData = planesFactory.getData();
                                if (!planesData.data.id || planesData.data.tickets.length ==0) {
                                    var planesTime2 = $timeout(function () {
                                        vm.planesTrips = planesData.data.tickets;
                    //                    scraperManager(scraperData.data.tickets);
                                        if (planesData.data.tickets.length ==0) {
                                            vm.planesFlag = false;
                                        }else{
                                            vm.planesFlag = false;
                                        }
                                    }, 20000);
                                }
                                vm.planesTrips = planesData.data.tickets;
                                if (planesData.data.tickets != undefined) {
                                    if (planesData.data.tickets.length != 0) {
                                        vm.planesFlag = true;
                                        vm.hasPlaneTrips = true;
                                        //scraperManager(scraperData.data.tickets);
                                    }else{
                                        vm.planesFlag = false;
                                    }
                                }
                            }, 15000);

                            // END AVIONES
                        scraperFactory
                            .getAll(formatOrigin, formatDestination, departureDateFormat, returnDateFormat, vm.passengers, $stateParams.originCountryCode, $stateParams.destinationCountryCode);
                            vm.scraperFlag = true;
                            var scraperTime = $timeout(function () {
                                var scraperData = scraperFactory.getData();
                                if (!scraperData.data.id || scraperData.data.tickets.length ==0) {
                                    var scraperTime2 = $timeout(function () {
                                        vm.scraperTrips = scraperData.data;
                                        scraperManager(scraperData.data.tickets);
                                        if (scraperData.data.tickets.length ==0) {
                                            vm.scraperFlag = false;
                                        }else{
                                            vm.scraperFlag = false;
                                        }
                                    }, 20000);
                                }
                                vm.scraperTrips = scraperData.data;
                                if (scraperData.data.tickets != undefined) {
                                    if (scraperData.data.tickets.length != 0) {
                                        vm.scraperFlag = false;
                                        scraperManager(scraperData.data.tickets);
                                    }else{
                                        vm.scraperFlag = false;
                                    }
                                }
                            }, 15000);

                        

                    })
                    .catch(function(err){
                        console.log(err);
                        vm.searching = false;
                        vm.error = true;
                        vm.msgError = err;
                        vm.disabled = false;
                        $('.pikaday__display').prop('disabled', false);
                        apiError();
                    })
            }

            function order(type) {
                if(vm.selectDeparture == true){
                    if(vm.typeDeparture === type) {
                        vm.reverseDeparture =!vm.reverseDeparture;
                        vm.reverse = !vm.reverse;
                    } else{
                        vm.reverseDeparture = false
                        vm.reverse = false;
                    }
                    vm.typeDeparture = type;
                    vm.type = type;
                }else {
                    if(vm.typeReturn === type) {
                        vm.reverseReturn =!vm.reverseReturn;
                        vm.reverse = !vm.reverse;
                    } else{
                        vm.reverseReturn = false;
                        vm.reverse = false;
                    }
                    vm.typeReturn = type;
                    vm.type = type;
                }
            }

            $scope.$watch('search.origin', function(newVal, oldVal){
                if (newVal != oldVal && newVal != undefined) {
                    console.log('changed '+oldVal+" to "+newVal);
                    vm.seats = [];
                    vm.seatsReset = [];
                    vm.companies = [];
                    vm.companiesReset = [];
                    searchTrip();
                }
            }, true);
            $scope.$watch('search.destination', function(newVal, oldVal){
                if (newVal != oldVal && newVal !== undefined) {
                    console.log('changed '+oldVal+" to "+newVal);
                    vm.seats = [];
                    vm.seatsReset = [];
                    vm.companies = [];
                    vm.companiesReset = [];
                    searchTrip();
                }
            }, true);
            $scope.$watch('search.dates.departureDate', function(newVal, oldVal){
                if (newVal != oldVal && newVal !== undefined) {
                    console.log('changed '+oldVal+" to "+newVal);
                    vm.seats = [];
                    vm.seatsReset = [];
                    vm.companies = [];
                    vm.companiesReset = [];
                    searchTrip();
                }
            }, true);
            $scope.$watch('search.dates.returnDate', function(newVal, oldVal){
                if (newVal != oldVal && newVal !== undefined) {
                    console.log('changed '+oldVal+" to "+newVal);
                    if (oldVal != 'Invalid date') {
                        vm.seats = [];
                        vm.seatsReset = [];
                        vm.companies = [];
                        vm.companiesReset = [];
                        searchTrip();
                    }
                }
            }, true);

            $scope.$watch('search.passengers', function(newVal, oldVal){
                if (newVal != oldVal && newVal != undefined) {
                    console.log('changed '+oldVal+" to "+newVal);
                    vm.seats = [];
                    vm.seatsReset = [];
                    vm.companies = [];
                    vm.companiesReset = [];
                    searchTrip();
                }
            }, true);

            function searchTrip() {
                angular.forEach(vm.myOptionsOrigin, function(value, key) {
                    if(vm.myOptionsOrigin[key].id === vm.origin){
                        vm.originCity = vm.myOptionsOrigin[key].id;
                        vm.originCountryCode = vm.myOptionsOrigin[key].countryCode;
                        vm.originCountry = vm.myOptionsOrigin[key].country;
                    }
                });

                angular.forEach(vm.myOptionsDestination, function(value, key) {
                   
                    if(vm.myOptionsDestination[key].id === vm.destination){
                        vm.destinationCity = vm.myOptionsDestination[key].id;
                        vm.destinationCountryCode = vm.myOptionsDestination[key].countryCode;
                        vm.destinationCountry = vm.myOptionsDestination[key].country;
                    }
                });
                var origin = vm.origin.split(',');
                var destination = vm.destination.split(',');
                if (vm.origin === vm.destination || vm.origin == '' || vm.destination == '' ) {
                    console.log("error cities");
                    vm.good = false;
                    cityError();
                } else {
                    if(vm.dates.returnDate == 'Invalid date' || vm.dates.returnDate == undefined) vm.dates.returnDate = ''

                    if (vm.dates.returnDate != '' && vm.dates.returnDate != 'Invalid date') {
                        var date1 = vm.dates.departureDate;
                        var date2 = vm.dates.returnDate;
                        var vD1 = date1.split('/')
                        var vD2 = date2.split('/')
                        var newDate1 = new Date(vD1[2],vD1[1],vD1[0]);
                        var newDate2 = new Date(vD2[2],vD2[1],vD2[0]);

                        if ( newDate1 <= newDate2) {
                            vm.weather_progressbar.reset();
                            vm.weather_progressbar.start();

                            callSearch(origin[0],destination[0],vm.dates.departureDate,vm.dates.returnDate,vm.passengers,vm.originCountryCode,vm.destinationCountryCode);
                            vm.good = true;

                        }else {
                            console.log("error dates");
                            vm.good = false;
                            dateError();
                        }
                    }else{
                        vm.weather_progressbar.reset();
                        vm.weather_progressbar.start();

                        callSearch(origin[0],destination[0],vm.dates.departureDate,vm.dates.returnDate,vm.passengers,vm.originCountryCode,vm.destinationCountryCode);
                        vm.good = true;
                    }
                }

            }

            function callSearch(origin,destination,departureDate,returnDate,passengers,originCountry,destinationCountry) {
                vm.isLoading = true;
                vm.results = false;
                vm.trips = [];
                vm.scraperTrips = [];
                vm.searching = true;
                vm.error = false;
                vm.disabled = true;
                $('.pikaday__display').prop('disabled', true);
                var title = 'Resertrip ' + origin + '-' + destination;
                $rootScope.$broadcast('titleEvent', title);

                //Eventos Google Analytics
                $analytics.eventTrack('Origin City', {  category: 'Search', label: origin });
                $analytics.eventTrack('Destination City', {  category: 'Search', label: destination });
                $analytics.eventTrack('Origin Country', {  category: 'Search', label: originCountry });
                $analytics.eventTrack('Destination Country', {  category: 'Search', label: destinationCountry });
                $analytics.eventTrack('Number Passengers', {  category: 'Search', label: 'Total Passengers', value: vm.passengers });
                if ((returnDate).length == 0) {
                    $analytics.eventTrack('Trip Type', {  category: 'Search', label: 'One Way' });
                }else{
                    $analytics.eventTrack('Trip Type', {  category: 'Search', label: 'Round Trip' });
                    $analytics.eventTrack('Diff Days', {  category: 'Search', label: 'Diff Days', value: diffDays(departureDate,returnDate) });
                }
                
                travelsFactory
                    .getAll(origin,destination,departureDate,returnDate,passengers,originCountry,destinationCountry,vm.passengersAdult,vm.passengersChild,vm.passengersBaby)
                    .then(function(data){
                        vm.isLoading = false;
                        vm.trips = data;
                        vm.searching = false;
                        vm.results = true;
                        vm.disabled = false;
                        vm.minDuration = data.minDuration;
                        vm.isMixedTrips = data.isMixedTrips;
                        vm.selectDeparture = true;
                        vm.idIda_1 = 0;
                        vm.idVuelta_1 = 0;
                        vm.dateIda_1 = 0;
                        vm.selectMixTrip = false;
                        $('.pikaday__display').prop('disabled', false);
                        vm.weather_progressbar.stop();
                        var time = $timeout(function () {
                            vm.maxPrice = data.maxPrice;
                            vm.minPrice = data.minPrice;
                            setDateFilterRange(data.maxPrice,data.minPrice);
                        }, 100);
                        for (var i = 0; i < data.typeServices.length; i++) {
                            vm.seats.push(data.typeServices[i].name)
                        }
                        vm.seatsReset = vm.seats;
                        for (var i = 0; i < data.companies.length; i++) {
                            vm.companies.push(data.companies[i].name)
                        }
                        vm.companiesReset = vm.companies;
                        vm.weather_progress_scraper.reset();
                        vm.weather_progress_scraper.start();

                          //AVIONES        
                        planesFactory
                            .getAll(origin, destination, departureDate, returnDate, passengers, originCountry, destinationCountry);
                            vm.scraperFlag = true;
                            var planesTime = $timeout(function () {
                                var planesData = planesFactory.getData();
                                if (!planesData.data.id || planesData.data.tickets.length ==0) {
                                    var planesTime2 = $timeout(function () {
                                        vm.planesTrips = planesData.data.tickets;
                    //                    scraperManager(scraperData.data.tickets);
                                        if (planesData.data.tickets.length ==0) {
                                            vm.planesFlag = false;
                                        }else{
                                            vm.planesFlag = false;
                                        }
                                    }, 20000);
                                }
                                vm.planesTrips = planesData.data.tickets;
                                if (planesData.data.tickets != undefined) {
                                    if (planesData.data.tickets.length != 0) {
                                        vm.planesFlag = true;
                                        vm.hasPlaneTrips = true;
                                        //scraperManager(scraperData.data.tickets);
                                    }else{
                                        vm.planesFlag = false;
                                    }
                                }
                            }, 15000);

                            // END AVIONES

                        scraperFactory
                            .getAll(origin, destination, departureDate, returnDate, passengers, originCountry, destinationCountry)
                            vm.scraperFlag = true;
                            var scraperTime = $timeout(function () {
                                var scraperData = scraperFactory.getData();
                                if (!scraperData.data.id || scraperData.data.tickets.length ==0) {
                                    var scraperTime2 = $timeout(function () {
                                        vm.scraperTrips = scraperData.data;
                                        scraperManager(scraperData.data.tickets);
                                        if (scraperData.data.tickets.length ==0) {
                                            vm.scraperFlag = false;
                                        }else{
                                            vm.scraperFlag = false;
                                        }
                                    }, 20000);
                                }
                                vm.scraperTrips = scraperData.data;
                                if (scraperData.data.tickets != undefined) {
                                    if (scraperData.data.tickets.length != 0) {
                                        vm.scraperFlag = false;
                                        scraperManager(scraperData.data.tickets);
                                    }else{
                                        vm.scraperFlag = false;
                                    }
                                }
                            }, 15000);
                    })
                    .catch(function(err){
                        console.log(err);
                        vm.searching = false;
                        vm.error = true;
                        vm.msgError = err;
                        vm.disabled = false;
                        $('.pikaday__display').prop('disabled', false);
                        apiError();
                    })
            }
            var listCompanies = new Set();
            function companyFilter(company,long) {
                if (company.checked) {
                   vm.company = company.name;
                   if (vm.companies.length === long) {
                       vm.companies = [];
                       listCompanies.add(company.name);
                       vm.companies = Array.from(listCompanies);
                   }else{
                       listCompanies.add(company.name);
                       vm.companies = Array.from(listCompanies);
                   }
                }else{
                    for (var i = vm.companies.length; i--;) {
                        if (vm.companies[i] === company.name) {
                            vm.companies.splice(i, 1);
                            listCompanies = new Set(vm.companies);
                        }
                    }
                    if(vm.companies.length === 0){
                        vm.companies = vm.companiesReset;
                    }
                }
            }
            var listSeats = new Set();
            function seatFilter(seat,long) {
                if (seat.checked) {
                   vm.seat = seat.name;
                   if (vm.seats.length === long) {
                       vm.seats = [];
                       listSeats.add(seat.name);
                       vm.seats = Array.from(listSeats);
                   }else{
                       listSeats.add(seat.name);
                       vm.seats = Array.from(listSeats);
                   }
                }else{
                    for (var i = vm.seats.length; i--;) {
                        if (vm.seats[i] === seat.name) {
                            vm.seats.splice(i, 1);
                            listSeats = new Set(vm.seats);
                        }
                    }
                    if(vm.seats.length === 0){
                        vm.seats = vm.seatsReset;
                    }
                }
            }

            function alternativeSearch(origin, countryOrigin, destination, countryDestination) {
                vm.origin = origin+", "+countryOrigin;
                vm.destination = destination+", "+countryDestination;
            }

            function departureSelect(type,id,origin,destination,departure,duration,arrival,price,typeService,companyName,logo) {
                vm.selectMixTrip = false;
                vm.selectDeparture = !vm.selectDeparture;
                if(!vm.selectDeparture){
                    vm.departureId = id;
                    vm.departureOrigin = origin;
                    vm.departureDestination = destination;
                    vm.departureDeparture = departure;
                    vm.departureDuration = duration;
                    vm.departureArrival = arrival;
                    vm.departurePrice = price;
                    vm.departureTypeService = typeService;
                    vm.departureCompanyName = companyName;
                    vm.departureLogo = logo;
                    $('.'+id).css({
                        "box-shadow" : "2px 6px 12px 0px rgba(135, 133, 135, 0.5)",
                        "border" : "1px solid #29ABE5"
                    });
                }else{
                    $('.'+vm.idIda_1).css({
                        "border" : "none",
                        "box-shadow" : "none"
                    });
                    $('.'+vm.idIda_1).hover(function () {
                        $(this).css({
                            "box-shadow" : "2px 6px 12px 0px rgba(135, 133, 135, 0.5)"
                        })
                    }, function() {
                        $( this ).css({
                            "box-shadow" : "none"
                        });
                    });
                    $('.'+vm.departureId).css({
                        "border" : "none",
                        "box-shadow" : "none"
                    });
                    $('.'+vm.departureId).hover(function () {
                        $(this).css({
                            "box-shadow" : "2px 6px 12px 0px rgba(135, 133, 135, 0.5)"
                        })
                    }, function() {
                        $( this ).css({
                            "box-shadow" : "none"
                        });
                    });
                    $('#'+vm.idVuelta_1).css({
                        "border" : "none",
                        "box-shadow" : "none"
                    });
                    $('#'+vm.idVuelta_1).hover(function () {
                        $(this).css({
                            "box-shadow" : "2px 6px 12px 0px rgba(135, 133, 135, 0.5)"
                        })
                    }, function() {
                        $( this ).css({
                            "box-shadow" : "none"
                        });
                    });
                    vm.departureId = '';
                    vm.departureDeparture = '';
                    vm.departureDuration = '';
                    vm.departureArrival = '';
                    vm.departurePrice = '';
                    vm.departureTypeService = '';
                    vm.departureCompanyName = '';
                    vm.departureLogo = '';
                    vm.idIda_1 = 0;
                }
            }

            function returnSelectTrain(id) {
                 urlTrainFactory
                    .getUrl(vm.departureId, id)
                    .then(function(data){
                        //console.log(data);
                        if(data.url != null ){
                           window.location.href = data.url;
                        }else{
                            alert('No es posible utilizar esa combinacion de viajes');
                        }
                    })
                    .catch(function(err){
                        console.log(err);
                    })
            }

            function scraperManager(scraper){
                var companies = {};
                var seats = {};
                var listCompanies = new Set();
                var listSeats = new Set();
                var top = 0;
                angular.forEach(scraper, function(value,key) {
                    companies.id = key;
                    companies.name = scraper[key].data.enterprise__name;
                    if (companies.name == "Auto-Res, S.L.U.") {
                        companies.nickName = 'AVANZABUS';
                    }
                    listCompanies.add(companies);
                    seats.id = key;
                    seats.name = scraper[key].data.type__name;
                    listSeats.add(seats);
                    if (top < scraper[key].data.price) {
                        top = scraper[key].data.price;
                    }
                });
                if (top > vm.maxPrice) {
                    setDateFilterRange(top,vm.minPrice);
                }
                var listCompaniesArr = Array.from(listCompanies);
                vm.scraperCompanies = listCompaniesArr;
                var listSeatsArr = Array.from(listSeats);
                vm.scraperSeats = listSeatsArr;
                for (var i = 0; i < vm.scraperCompanies.length; i++) {
                    vm.companies.push(vm.scraperCompanies[i].name);
                }
                for (var i = 0; i < vm.scraperSeats.length; i++) {
                    vm.seats.push(vm.scraperSeats[i].name);
                }
                vm.companiesReset = vm.companies;
                vm.seatsReset = vm.seats;
            }

            function nextDay() {
                var today = vm.dates.departureDate.split('/')
                var day = parseInt(today[0]);
                var month = parseInt(today[1]);
                var year = today[2];
                var nextDate = new Date(year,month-1,day+1);
                var nextDayMonth = nextDate.getUTCMonth()+1;
                if (nextDayMonth < 10) {
                    nextDayMonth = '0'+nextDayMonth;
                }
                var nestDayDay = nextDate.getUTCDate();
                if (parseInt(nextDate.getUTCDate()) < 10) {
                    nestDayDay = '0'+nextDate.getUTCDate();
                }
                vm.dates.departureDate = nestDayDay+'/'+nextDayMonth+'/'+nextDate.getUTCFullYear();
                $('input[placeholder="Ida"]').val(vm.dates.departureDate);
            }

            function findMixRoutes(id) {
                vm.searchingMix = true;
                travelsFactory
                    .getMixedTrips(id)
                    .then(function (data) {
                        vm.searchingMix = false;
                        vm.results = true;
                        vm.trips = data;
                        vm.isMixedTrips = data.isMixedTrips
                        var time = $timeout(function () {
                            vm.maxPrice = data.maxPrice;
                            vm.minPrice = data.minPrice;
                            setDateFilterRange(data.maxPrice,data.minPrice);
                        }, 100);
                        for (var i = 0; i < data.typeServices.length; i++) {
                            vm.seats.push(data.typeServices[i].name)
                        }
                        vm.seatsReset = vm.seats;
                        for (var i = 0; i < data.companies.length; i++) {
                            vm.companies.push(data.companies[i].name)
                        }
                        vm.companiesReset = vm.companies;
                    })
                    .catch(function (err) {
                        vm.searchingMix = false;
                        console.log(err);
                    })
            }

            vm.selectMixTrip = false;
            vm.idIda_1 = 0;
            vm.idVuelta_1 = 0;
            vm.dateIda_1 = 0;
            function firstStep(id_1,type,origin,destination,departure,duration,arrival,price,typeService,companyName,logo) {
                var date = new Date(parseInt(arrival))
                var minutes = date.getUTCMinutes() + 50;
                date = date.setUTCMinutes(minutes);
                if (type == 1) {
                    vm.dateIda_1 = date;
                    $('html, body').stop().animate({
                        scrollTop: jQuery('#tramo-1').offset().top
                    }, 800);
                    $('#'+id_1).css({
                        "box-shadow" : "2px 6px 12px 0px rgba(135, 133, 135, 0.5)",
                        "border" : "1px solid #29ABE5"
                    });
                    vm.selectMixTrip = true;
                    vm.idIda_1 = id_1;
                }
                if (type == 2) {
                    $('html, body').stop().animate({
                        scrollTop: jQuery('#tramo-ida-1').offset().top
                    }, 800);
                    $('.'+id_1).css({
                        "box-shadow" : "2px 6px 12px 0px rgba(135, 133, 135, 0.5)",
                        "border" : "1px solid #29ABE5"
                    });
                    vm.dateIda_1 = date;
                    vm.selectMixTrip = true;
                    vm.idIda_1 = id_1;
                    vm.departureId_1 = id_1;
                    vm.departureOrigin_1 = origin;
                    vm.departureDestination_1 = destination;
                    vm.departureDeparture_1 = departure;
                    vm.departureDuration_1 = duration;
                    vm.departureArrival_1 = arrival;
                    vm.departurePrice_1 = price;
                    vm.departureTypeService_1 = typeService;
                    vm.departureCompanyName_1 = companyName;
                    vm.departureLogo_1 = logo;
                }
                if(type == 3){
                    $('html, body').stop().animate({
                        scrollTop: jQuery('#tramo-vuelta-1').offset().top
                    }, 800);
                    $('#'+id_1).css({
                        "box-shadow" : "2px 6px 12px 0px rgba(135, 133, 135, 0.5)",
                        "border" : "1px solid #29ABE5"
                    });
                    vm.dateVuelta_1 = date;
                    vm.selectMixTrip = true;
                    vm.idVuelta_1 = id_1;
                    vm.returnId = id_1;
                    vm.returnOrigin = origin;
                    vm.returnDestination = destination;
                    vm.returnDeparture = departure;
                    vm.returnDuration = duration;
                    vm.returnArrival = arrival;
                    vm.returnPrice = price;
                    vm.returnTypeService = typeService;
                    vm.returnCompanyName = companyName;
                    vm.returnLogo = logo;
                }
            }

            function resetFirstSetep(type) {
                if (type == 1) {
                    $('html, body').stop().animate({
                        scrollTop: jQuery('#tramo-0').offset().top
                    }, 800);
                    $('#'+vm.idIda_1).css({
                        "border" : "none",
                        "box-shadow" : "none"
                    });
                    $('#'+vm.idIda_1).hover(function () {
                        $(this).css({
                            "box-shadow" : "2px 6px 12px 0px rgba(135, 133, 135, 0.5)"
                        })
                    }, function() {
                        $( this ).css({
                            "box-shadow" : "none"
                        });
                    });
                    vm.selectMixTrip = false;
                    vm.idIda_1 = 0;
                }
                if (type == 2) {
                    $('html, body').stop().animate({
                        scrollTop: jQuery('#tramo-ida-0').offset().top
                    }, 800);
                    $('.'+vm.idIda_1).css({
                        "border" : "none",
                        "box-shadow" : "none"
                    });
                    $('.'+vm.idIda_1).hover(function () {
                        $(this).css({
                            "box-shadow" : "2px 6px 12px 0px rgba(135, 133, 135, 0.5)"
                        })
                    }, function() {
                        $( this ).css({
                            "box-shadow" : "none"
                        });
                    });
                    vm.selectMixTrip = false;
                    vm.idIda_1 = 0;
                }
                if (type == 3) {
                    $('html, body').stop().animate({
                        scrollTop: jQuery('#tramo-vuelta-0').offset().top
                    }, 800);
                    $('#'+vm.idVuelta_1).css({
                        "border" : "none",
                        "box-shadow" : "none"
                    });
                    $('#'+vm.idVuelta_1).hover(function () {
                        $(this).css({
                            "box-shadow" : "2px 6px 12px 0px rgba(135, 133, 135, 0.5)"
                        })
                    }, function() {
                        $( this ).css({
                            "box-shadow" : "none"
                        });
                    });
                    vm.selectMixTrip = false;
                    vm.idVuelta_1 = 0;
                }
            }

            function apiError() {
                if(vm.error){
                    $('#error-box').modal('show');
                }
            }

            function cityError() {
                if(!vm.good){
                    $('#error-cities').modal('show');
                }
            }

            function dateError() {
                if(!vm.good){
                    $('#error-date').modal('show');
                }
            }

            function diffDays(f1,f2){
                var aFecha1 = f1.split('/'); 
                var aFecha2 = f2.split('/'); 
                var fFecha1 = Date.UTC(aFecha1[2],aFecha1[1]-1,aFecha1[0]); 
                var fFecha2 = Date.UTC(aFecha2[2],aFecha2[1]-1,aFecha2[0]); 
                var dif = fFecha2 - fFecha1;
                var dias = Math.floor(dif / (1000 * 60 * 60 * 24)); 
                
                return dias;
            }

            $('.btn-filters').on('click', function(){
                $('#filters-container').toggleClass('hidden-xs');
            });

            $('#select_passengers').on('click', function(){
                var offset = $(this).offset();
                $('.popover-select-passengers').attr('style', 'display: block;top:'+(offset.top+55)+'px;left:'+(offset.left)+'px;');
                $('.popover-select-passengers').toggleClass('open');
                $('#popover-bg').attr('style', 'display: block;opacity:0');
            });

            $('#popover-bg').on('click', function(){
                $('.popover-select-passengers').attr('style', 'display: none;');
                $('#popover-bg').attr('style', 'display: none;opacity:0');
            });
        }

})();
