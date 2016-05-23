(function () {
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

        MainController.$inject =['$scope','locationsFactory', 'locationsRtFactory','utilityService','$location','$rootScope','$translate','$cookieStore','sessionStorageService'];


        function MainController ($scope,locationsFactory,locationsRtFactory,utilityService,$location,$rootScope,$translate,$cookieStore,sessionStorageService) {

            var vm = this;
            var params = utilityService.getData();
            vm.popular_searches = [];
            vm.today = String(new Date().getTime()/1000).replace('.','');
            $scope.selectedLanguage = $cookieStore.get('NG_TRANSLATE_LANG_KEY');
            var title = "Compra Billetes de Autobús en España | Resertrip ";
            var description = "Compara horarios y precios de más de 90 empresas de autobús en España y reserva fácilmente online. Viaja inteligente con Resertrip.";
            $rootScope.$broadcast('titleEvent', title);
            $rootScope.$broadcast('descriptionEvent', description);
            $rootScope.$broadcast('counterEvent', 1, false);

            vm.popular_searches.push({
                id: 0,
                origin: 'Madrid',
                destination: 'Barcelona',
                image: 'https://s3.eu-central-1.amazonaws.com/vheurope/new-home/barcelona.jpg',
                price: '32.41',
                href: "/#/search/Madrid/ESP/Barcelona/ESP/"+vm.today+"/NaN"
            });
            vm.popular_searches.push({
                id: 1,
                origin: 'Madrid',
                destination: 'Bilbao',
                image: 'https://s3.eu-central-1.amazonaws.com/vheurope/new-home/bilbao.png',
                price: '31.27',
                href: "/#/search/Madrid/ESP/Bilbao/ESP/"+vm.today+"/NaN"
            });
            vm.popular_searches.push({
                id: 2,
                origin: 'Barcelona',
                destination: 'Madrid',
                image: 'https://s3.eu-central-1.amazonaws.com/vheurope/new-home/madrid.jpg',
                price: '32.41',
                href: "/#/search/Barcelona/ESP/Madrid/ESP/"+vm.today+"/NaN"
            });
            vm.popular_searches.push({
                id: 3,
                origin: 'Sevilla',
                destination: 'Malaga',
                image: 'https://s3.eu-central-1.amazonaws.com/vheurope/new-home/malaga.png',
                price: '18.57',
                href: "/#/search/Sevilla/ESP/Malaga/ESP/"+vm.today+"/NaN"
            });
            vm.popular_searches.push({
                id: 4,
                origin: 'Madrid',
                destination: 'Salamanca',
                image: 'https://s3.eu-central-1.amazonaws.com/vheurope/new-home/salamanca.png',
                price: '32.41',
                href: "/#/search/Madrid/ESP/Salamanca/ESP/"+vm.today+"/NaN"
            });
            vm.popular_searches.push({
                id: 5,
                origin: 'Malaga',
                destination: 'Sevilla',
                image: 'https://s3.eu-central-1.amazonaws.com/vheurope/new-home/sevilla.png',
                price: '18.57',
                href: "/#/search/Malaga/ESP/Sevilla/ESP/"+vm.today+"/NaN"
            });
            vm.popular_searches.push({
                id: 6,
                origin: 'Barcelona',
                destination: 'Valencia',
                image: 'https://s3.eu-central-1.amazonaws.com/vheurope/new-home/valencia.png',
                price: '29.16',
                href: "/#/search/Barcelona/ESP/Valencia/ESP/"+vm.today+"/NaN"
            });
            vm.popular_searches.push({
                id: 7,
                origin: 'Barcelona',
                destination: 'Zaragoza',
                image: 'https://s3.eu-central-1.amazonaws.com/vheurope/new-home/zaragoza.png',
                price: '15.77',
                href: "/#/search/Barcelona/ESP/Zaragoza/ESP/"+vm.today+"/NaN"
            });

          	vm.origin = params.origin+","+params.countryOrigin;
          	vm.destination = params.destination+","+params.countryDestination;
            vm.countryOrigin = params.countryOrigin;
            vm.countryDestination = params.countryDestination;
            vm.passengers  = 1;
            vm.passengersAdult  = 1;
            vm.passengersChild  = 0;
            vm.passengersBaby  = 0;
            vm.changeDate = changeDate;
            vm.quickSearch = quickSearch;
        	vm.myOptionsOrigin = [];
            vm.myOptionsDestination = [];

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

        	vm.configOrigin = {
          		//create: true,
          		valueField: 'rt',
          		labelField: 'name',
                searchField: ['name'],
          		delimiter: '|',
                openOnFocus: true,
          		placeholder: $scope.selectedLanguage == 'es' ? 'Elige tu origen' : 'Choose your origin',
          		onInitialize: function(selectize){
            		// receives the selectize object as an argument
          		},
          		maxItems: 1,
                preload: true,
                load: function(query, callback) {
                    if (!query.length) return callback();
                    //if (query.length >= 3){
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
                    //}
                }
        	};

            vm.configDestination = {
                //create: true,
                valueField: 'rt',
                labelField: 'name',
                searchField: ['name'],
                delimiter: '|',
                placeholder: $scope.selectedLanguage == 'es' ? 'Elige tu destino' : 'Choose your destination',
                onInitialize: function(selectize){
                    // receives the selectize object as an argument
                },
                maxItems: 1,
                preload: true,
                load: function(query, callback) {
                    if (!query.length) return callback();
                    //if (query.length >= 3){
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
                    //}
                }
            };

            vm.dates = {
                departureDate: moment().format('DD/MM/YYYY'),
                returnDate: '',
                minDate: moment().format('MM-DD-YYYY'),
                maxDate: moment().add(365, 'days').format('MM-DD-YYYY')
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
            /*
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
            */
            

        	vm.searchTrips = function () {

                angular.forEach(vm.myOptionsOrigin, function(value, key) {
                    console.log(value+key);
                    if(vm.myOptionsOrigin[key].rt === vm.origin){
                        vm.originCity = vm.myOptionsOrigin[key].rt;
                        vm.originCountryCode = vm.myOptionsOrigin[key].countryCode;
                        vm.originCountry = vm.myOptionsOrigin[key].country;

                    }
                });

                 angular.forEach(vm.myOptionsDestination, function(value, key) {
                   
                    if(vm.myOptionsDestination[key].rt === vm.destination){
                        vm.destinationCity = vm.myOptionsDestination[key].rt;
                        vm.destinationCountryCode = vm.myOptionsDestination[key].countryCode;
                        vm.destinationCountry = vm.myOptionsDestination[key].country;

                    }
                });

                var formatOrigin;
                var formatDestination;
                formatOrigin = vm.originCity.replace(/\s/g, '_');
                formatOrigin = formatOrigin.replace(/ñ/g, 'n');
                formatDestination = vm.destinationCity.replace(/\s/g, '_');
                formatDestination = formatDestination.replace(/ñ/g, 'n');
                var origin = vm.origin.split(",");
                var destination = vm.destination.split(",");
                if (vm.originCity === vm.destinationCity || vm.originCity =="" || vm.destinationCity =="" ) {
                    console.log("error cities");
                    vm.good = false;
                    cityError();
                } else {
                    if(vm.dates.returnDate=="Invalid date" || vm.dates.returnDate==undefined) vm.dates.returnDate=""

                    if (vm.dates.returnDate != "" && vm.dates.returnDate!="Invalid date") {
                        var date1 = vm.dates.departureDate;
                        var date2 = vm.dates.returnDate;
                        var vD1 = date1.split("/")
                        var vD2 = date2.split("/")
                        changeDate();
                        var newDate1 = new Date(vD1[2],vD1[1],vD1[0]);
                        var newDate2 = new Date(vD2[2],vD2[1],vD2[0]);
                        var newDate3 = new Date(vD1[2],vD1[1]-1,vD1[0]);
                        var newDate4 = new Date(vD2[2],vD2[1]-1,vD2[0]);
                        vm.departureDateUnix = new Date(newDate3).getTime();
                        vm.returnDateUnix = new Date(newDate4).getTime();

                        if ( newDate1 <= newDate2) {
                            console.log('IF');
                            console.log(vm.originCity);
                        	console.log(vm.destinationCity);
                        	console.log('departure: '+vm.dates.departureDate);
                            console.log('returns: '+vm.dates.returnDate);
                            utilityService.setData(vm.originCity,vm.originCountry, vm.destinationCity,vm.destinationCountry, vm.dates.departureDate, vm.dates.returnDate, vm.passengers,vm.originCountryCode,vm.destinationCountryCode,vm.passengersAdult,vm.passengersChild,vm.passengersBaby);
                            sessionStorageService.setPassengers(vm.passengersAdult,vm.passengersChild,vm.passengersBaby);
                            sessionStorageService.setLocations(vm.myOptionsOrigin.concat(vm.myOptionsDestination));
                            vm.good = true;
                            $location.path ("/search/"+formatOrigin+"/"+vm.originCountryCode+"/"+formatDestination+"/"+vm.destinationCountryCode+"/"+vm.departureDateUnix+"/"+vm.returnDateUnix);

                        }else {
                            console.log("error dates");
                            vm.good = false;
                            dateError();
                        }
                    }else{
                        console.log('ELSE');
                        var date1 = vm.dates.departureDate;
                        var date2 = vm.dates.returnDate;
                        var vD1 = date1.split("/")
                        var vD2 = date2.split("/")
                        console.log(vm.originCity);
                    	console.log(vm.destinationCity);
                    	console.log('departure: '+vm.dates.departureDate);
                        console.log('returns: '+vm.dates.returnDate);
                        var newDate3 = new Date(vD1[2],vD1[1]-1,vD1[0]);
                        var newDate4 = new Date(vD2[2],vD2[1]-1,vD2[0]);
                        vm.departureDateUnix = new Date(newDate3).getTime();
                        vm.returnDateUnix = new Date(newDate4).getTime();
                        utilityService.setData(vm.originCity,vm.originCountry, vm.destinationCity,vm.destinationCountry, vm.dates.departureDate, vm.dates.returnDate, vm.passengers,vm.originCountryCode,vm.destinationCountryCode,vm.passengersAdult,vm.passengersChild,vm.passengersBaby);
                        sessionStorageService.setPassengers(vm.passengersAdult,vm.passengersChild,vm.passengersBaby);
                        sessionStorageService.setLocations(vm.myOptionsOrigin.concat(vm.myOptionsDestination));
                        vm.good = true;
                        $location.path ("/search/"+formatOrigin+"/"+vm.originCountryCode+"/"+formatDestination+"/"+vm.destinationCountryCode+"/"+vm.departureDateUnix+"/"+vm.returnDateUnix);
                    }
                }
            }

            function changeDate(){
                vm.departureDateUnix = new Date(vm.dates.departureDate).getTime()/1000;
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

            function quickSearch(origin, destination, id) {
                sessionStorageService.setPassengers(1,0,0);
                $('#departureDate-quick-'+id).change(function () {
                    var departureDate = $('#departureDate-quick-'+id).val();
                    $location.path ("/search/"+origin+"/ES/"+destination+"/ES/"+departureDate+"/NaN");
                })
            }

            //$('#switch_language_title').html($('#switch_language li.active').find('a').html() + '<span class="caret"></span>');

            $('#switch_language li').on('click', function() {
                $('#switch_language_title').html($(this).find('a').html() + '<span class="caret"></span>');
            });


            $('#select_passengers').on('click', function(){
                var offset = $(this).offset();
                $('.popover-select-passengers').attr('style', 'display: block;top:'+(offset.top-132)+'px;left:'+(offset.left)+'px;');
                $('.popover-select-passengers').toggleClass('open');
                $('#popover-bg').attr('style', 'display: block;opacity:0');
            });

             $('#popover-bg').on('click', function(){
                $('.popover-select-passengers').attr('style', 'display: none;');
                $('#popover-bg').attr('style', 'display: none;opacity:0');
            });

            var bg_images = [
                "https://s3.eu-central-1.amazonaws.com/vheurope/new-home/bg/barcelona_desde_arriba.jpg",
                "https://s3.eu-central-1.amazonaws.com/vheurope/new-home/bg/ciudad_barcelona.jpg",
                "https://s3.eu-central-1.amazonaws.com/vheurope/new-home/bg/cordoba.jpg",
                "https://s3.eu-central-1.amazonaws.com/vheurope/new-home/bg/costa_brava_catalonia.jpg",
                "https://s3.eu-central-1.amazonaws.com/vheurope/new-home/bg/espana.jpg",
                "https://s3.eu-central-1.amazonaws.com/vheurope/new-home/bg/espania.jpg",
                "https://s3.eu-central-1.amazonaws.com/vheurope/new-home/bg/girona.jpg",
                "https://s3.eu-central-1.amazonaws.com/vheurope/new-home/bg/madrid.jpg",
                "https://s3.eu-central-1.amazonaws.com/vheurope/new-home/bg/sevilla.jpg",
                "https://s3.eu-central-1.amazonaws.com/vheurope/new-home/bg/sevilla_andalusia.jpg",
                "https://s3.eu-central-1.amazonaws.com/vheurope/new-home/bg/velika.jpg",
                "https://s3.eu-central-1.amazonaws.com/vheurope/new-home/bg/vlc.jpg",
                "https://s3.eu-central-1.amazonaws.com/vheurope/new-home/bg/1.jpg",
                "https://s3.eu-central-1.amazonaws.com/vheurope/new-home/bg/2.jpg",
                "https://s3.eu-central-1.amazonaws.com/vheurope/new-home/bg/3.jpg",
                "https://s3.eu-central-1.amazonaws.com/vheurope/new-home/bg/4.jpg",
                "https://s3.eu-central-1.amazonaws.com/vheurope/new-home/bg/5.jpg",
                "https://s3.eu-central-1.amazonaws.com/vheurope/new-home/bg/6.jpg",
                "https://s3.eu-central-1.amazonaws.com/vheurope/new-home/bg/7.jpg",
                "https://s3.eu-central-1.amazonaws.com/vheurope/new-home/bg/8.jpg",
                "https://s3.eu-central-1.amazonaws.com/vheurope/new-home/bg/9.jpg",
                "https://s3.eu-central-1.amazonaws.com/vheurope/new-home/bg/10.jpg",
                "https://s3.eu-central-1.amazonaws.com/vheurope/new-home/bg/11.jpg",
                "https://s3.eu-central-1.amazonaws.com/vheurope/new-home/bg/12.jpg",
                "https://s3.eu-central-1.amazonaws.com/vheurope/new-home/bg/13.jpg",
                "https://s3.eu-central-1.amazonaws.com/vheurope/new-home/bg/14.jpg",
                "https://s3.eu-central-1.amazonaws.com/vheurope/new-home/bg/15.jpg"
                ];
                
                $('.header-home.spain').attr('style','background: url('+bg_images[Math.floor((Math.random() * 26) + 1)]+') no-repeat center center fixed; background-size: cover;');
                $('.cookie-message').cookieBar();
        }
})();
