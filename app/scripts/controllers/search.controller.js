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

        SearchController.$inject =['locationsFactory','travelsFactory','weatherFactory','utilityService','$scope','$interval','$stateParams','$timeout','$rootScope','sessionStorageService','scraperFactory','ngProgressFactory','$analytics','screenSize'];

        function SearchController (locationsFactory,travelsFactory,weatherFactory,utilityService,$scope,$interval,$stateParams,$timeout,$rootScope,sessionStorageService,scraperFactory,ngProgressFactory,$analytics,screenSize) {
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
            vm.isLoading = true;
            vm.good = true;
            vm.seats = [];
            vm.seatsReset = [];
            vm.companies = [];
            vm.companiesReset = [];
            vm.minDuration = '';
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

            vm.toUTCDate = toUTCDate;
            vm.millisToUTCDate = millisToUTCDate;

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

             var session = sessionStorageService.getFlag();
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
             }

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
                console.log(type);
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
                var title = "Resertrip "+params.origin+"-"+params.destination;
                $rootScope.$broadcast('titleEvent', title);
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
                var title = 'Resertrip ' + $stateParams.origin + '-' + $stateParams.destination;
                $rootScope.$broadcast('titleEvent', title);
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
                angular.forEach(vm.myOptions, function(value, key) {
                    if(vm.myOptions[key].label === vm.origin){
                        vm.originCity = vm.myOptions[key].city;
                        vm.originCountryCode = vm.myOptions[key].countryCode;
                        vm.originCountry = vm.myOptions[key].country;
                    }
                    if(vm.myOptions[key].label === vm.destination){
                        vm.destinationCity = vm.myOptions[key].city;
                        vm.destinationCountryCode = vm.myOptions[key].countryCode;
                        vm.destinationCountry = vm.myOptions[key].country;
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

            function departureSelect(id,origin,destination,departure,duration,arrival,price,typeService,companyName,logo) {
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
                }else{
                    vm.departureId = '';
                    vm.departureDeparture = '';
                    vm.departureDuration = '';
                    vm.departureArrival = '';
                    vm.departurePrice = '';
                    vm.departureTypeService = '';
                    vm.departureCompanyName = '';
                    vm.departureLogo = '';
                }
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


            var re = $('.nu');
            re.addClass('hidden');
            $('.fa-trip-type').addClass('hidden');
            $.each(re, function(index, item){
                if($(item).data('type') === 'bus' ){
                    $(item).removeClass('hidden'); 
                }
            });

            $('.tab-filter').on('click', function(){
                var type = $(this).data('type');
                $( "#combine-trips" ).prop( "checked", false );
                $('.tab-filter').removeClass('active');
                $('.fa-trip-type').addClass('hidden');
                $(this).addClass('active');
                var re = $('.nu');
                re.addClass('hidden');
                $.each(re, function(index, item){
                    if($(item).data('type') === type ){
                       $(item).removeClass('hidden'); 
                    }
                });
            });

            $('#combine-trips').on('change', function(){
                if($(this).prop('checked') === false){
                    $('#bus').addClass('active');
                    var re = $('.nu');
                    re.addClass('hidden');
                    $.each(re, function(index, item){
                        if($(item).data('type') === 'bus' ){
                            $(item).removeClass('hidden'); 
                        }
                    });
                }else{
                    $('.tab-filter').removeClass('active');
                    var re = $('.nu');
                    re.removeClass('hidden');
                    $('.fa-trip-type').removeClass('hidden');
                }

            });
        }

})();
