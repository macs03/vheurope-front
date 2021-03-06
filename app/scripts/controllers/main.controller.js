(function() {
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

    MainController.$inject = ['$scope', 'locationsFactory', 'locationsRtFactory', 'utilityService', '$location', '$rootScope', '$translate', '$cookieStore', 'sessionStorageService'];


    function MainController($scope, locationsFactory, locationsRtFactory, utilityService, $location, $rootScope, $translate, $cookieStore, sessionStorageService) {

        var vm = this;
        var params = utilityService.getData();
        vm.popular_searches = [];
        vm.popular_searches_es = [];
        vm.popular_searches_fr = [];
        vm.today = String(new Date().getTime() / 1000).replace('.', '');
        $scope.selectedLanguage = $cookieStore.get('NG_TRANSLATE_LANG_KEY');
        var title = "Compra Billetes de Autobús, Tren y Avión en España | Resertrip ";
        var description = "Compara horarios y precios de empresas de autobús, tren y avión en España y reserva fácilmente online. Viaja inteligente con Resertrip.";
        $rootScope.$broadcast('titleEvent', title);
        $rootScope.$broadcast('descriptionEvent', description);
        $rootScope.$broadcast('counterEvent', 1, false);

        var searchView = false;
        $rootScope.$broadcast('viewEvent', searchView);

        var bg_images = [];
        var bg_images_es = [
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

        var bg_images_fr = [
            "https://s3.eu-central-1.amazonaws.com/vheurope/home/background/france/Loire.jpg",
            "https://s3.eu-central-1.amazonaws.com/vheurope/home/background/france/Paris-2.jpg",
            "https://s3.eu-central-1.amazonaws.com/vheurope/home/background/france/Paris.jpg",
            "https://s3.eu-central-1.amazonaws.com/vheurope/home/background/france/cannes.jpg",
            "https://s3.eu-central-1.amazonaws.com/vheurope/home/background/france/colmar.jpg",
            "https://s3.eu-central-1.amazonaws.com/vheurope/home/background/france/hotel-paris.jpg",
            "https://s3.eu-central-1.amazonaws.com/vheurope/home/background/france/mersailles.jpg",
            "https://s3.eu-central-1.amazonaws.com/vheurope/home/background/france/paris-4.jpg",
            "https://s3.eu-central-1.amazonaws.com/vheurope/home/background/france/south-france.jpg",
            "https://s3.eu-central-1.amazonaws.com/vheurope/home/background/france/versailles.jpg"
        ];

        var country = utilityService.getCountry();
        var countryLS = sessionStorageService.getCountry();
        var languageSession = sessionStorageService.getLanguage();
        vm.countryLang = "";

        if (country == 'fr' || countryLS == 'fr') {
            vm.countrySelected = country;
            vm.popular_searches = vm.popular_searches_fr;
            bg_images = bg_images_fr;
            if (languageSession === 'es') {
                vm.countryLang = "Francia";
            } else if (languageSession === 'fr') {
                vm.countryLang = "France";
            } else {
                vm.countryLang = "France";
            }
        } else if (country == 'es' || countryLS == 'es') {
            vm.countrySelected = country;
            vm.popular_searches = vm.popular_searches_es;
            bg_images = bg_images_es;
            if (languageSession === 'es') {
                vm.countryLang = "España";
            } else if (languageSession === 'fr') {
                vm.countryLang = "Espagne";
            } else {
                vm.countryLang = "Spain";
            }
        }

        function changeCountryAndLanguaje() {
            var countryCode = sessionStorageService.getCountry();
            var langCode = sessionStorageService.getLanguage();
            if (countryCode == "fr") {
                if (langCode == "es") {
                    vm.countryLang = "Francia";
                } else if (langCode == "fr") {
                    vm.countryLang = "France";
                } else {
                    vm.countryLang = "France";
                }
            } else if (countryCode == "es") {
                if (langCode == "es") {
                    vm.countryLang = "España";
                } else if (langCode == "fr") {
                    vm.countryLang = "Espagne";
                } else {
                    vm.countryLang = "Spain";
                }
            }
        }

        function changeCountry(ev, country) {
            if (country == "es") {
                vm.countrySelected = country;
                vm.popular_searches = vm.popular_searches_es;
                bg_images = bg_images_es;
                $('.header-home.spain').attr('style', 'background: url(' + bg_images[Math.floor((Math.random() * 25) + 1)] + ') no-repeat center center fixed; background-size: cover;');
            } else if (country == 'fr') {
                vm.countrySelected = country;
                vm.popular_searches = vm.popular_searches_fr;
                bg_images = bg_images_fr;
                $('.header-home.spain').attr('style', 'background: url(' + bg_images[Math.floor((Math.random() * 9) + 1)] + ') no-repeat center center fixed; background-size: cover;');
            }
        }
        $scope.$on('countryEvent', changeCountry)

        function changeLang(ev, lang) {
            if (lang == 'es') {
                vm.retorno = 'Vuelta';
                vm.city_origin = 'Elige tu origen';
                vm.city_destination = 'Elige tu destino';
            } else if (lang == 'en') {
                vm.retorno = 'Return';
                vm.city_origin = 'Choose your origin';
                vm.city_destination = 'Choose your destination';
            } else {
                vm.retorno = 'Retour';
                vm.city_origin = 'Choisissez votre origine';
                vm.city_destination = 'Choisissez votre destination';
            }
            changeCountryAndLanguaje();
        }
        $scope.$on('langEvent', changeLang)

        var languageSession = sessionStorageService.getLanguage();
        if (languageSession == null) {
            if (utilityService.getLang() == 'es') {
                vm.retorno = 'Vuelta';
                vm.city_origin = 'Elige tu origen';
                vm.city_destination = 'Elige tu destino';
                $translate.use('es');
            } else if (utilityService.getLang() == 'en') {
                vm.retorno = 'Return';
                vm.city_origin = 'Choose your origin';
                vm.city_destination = 'Choose your destination';
                $translate.use('en');
            } else {
                vm.retorno = 'Retour';
                vm.city_origin = 'Choisissez votre origine';
                vm.city_destination = 'Choisissez votre destination';
                $translate.use('fr');
            }
        } else {
            if (languageSession == 'es') {
                vm.retorno = 'Vuelta';
                vm.city_origin = 'Elige tu origen';
                vm.city_destination = 'Elige tu destino';
                $translate.use('es');
            } else if (languageSession == 'en') {
                vm.retorno = 'Return';
                vm.city_origin = 'Choose your origin';
                vm.city_destination = 'Chosse your destination';
                $translate.use('en');
            } else {
                vm.retorno = 'Retour';
                vm.city_origin = 'choisissez votre origine';
                vm.city_destination = 'Choisissez votre destination';
                $translate.use('fr');
            }

        }

        vm.popular_searches_es.push({
            id: 0,
            origin: 'Madrid',
            destination: 'Barcelona',
            image: 'https://s3.eu-central-1.amazonaws.com/vheurope/new-home/barcelona.jpg',
            price: '32.41',
            href: "/#/search/Madrid/ES/Barcelona/ES/" + vm.today + "/NaN",
            country: "ES"
        });
        vm.popular_searches_es.push({
            id: 1,
            origin: 'Madrid',
            destination: 'Bilbao',
            image: 'https://s3.eu-central-1.amazonaws.com/vheurope/new-home/bilbao.png',
            price: '31.27',
            href: "/#/search/Madrid/ES/Bilbao/ES/" + vm.today + "/NaN",
            country: "ES"
        });
        vm.popular_searches_es.push({
            id: 2,
            origin: 'Barcelona',
            destination: 'Madrid',
            image: 'https://s3.eu-central-1.amazonaws.com/vheurope/new-home/madrid.jpg',
            price: '32.41',
            href: "/#/search/Barcelona/ES/Madrid/ES/" + vm.today + "/NaN",
            country: "ES"
        });
        vm.popular_searches_es.push({
            id: 3,
            origin: 'Sevilla',
            destination: 'Malaga',
            image: 'https://s3.eu-central-1.amazonaws.com/vheurope/new-home/malaga.png',
            price: '18.57',
            href: "/#/search/Sevilla/ES/Malaga/ES/" + vm.today + "/NaN",
            country: "ES"
        });
        vm.popular_searches_es.push({
            id: 4,
            origin: 'Madrid',
            destination: 'Salamanca',
            image: 'https://s3.eu-central-1.amazonaws.com/vheurope/new-home/salamanca.png',
            price: '32.41',
            href: "/#/search/Madrid/ES/Salamanca/ES/" + vm.today + "/NaN",
            country: "ES"
        });
        vm.popular_searches_es.push({
            id: 5,
            origin: 'Malaga',
            destination: 'Sevilla',
            image: 'https://s3.eu-central-1.amazonaws.com/vheurope/new-home/sevilla.png',
            price: '18.57',
            href: "/#/search/Malaga/ES/Sevilla/ES/" + vm.today + "/NaN",
            country: "ES"
        });
        vm.popular_searches_es.push({
            id: 6,
            origin: 'Barcelona',
            destination: 'Valencia',
            image: 'https://s3.eu-central-1.amazonaws.com/vheurope/new-home/valencia.png',
            price: '29.16',
            href: "/#/search/Barcelona/ES/Valencia/ES/" + vm.today + "/NaN",
            country: "ES"
        });
        vm.popular_searches_es.push({
            id: 7,
            origin: 'Barcelona',
            destination: 'Zaragoza',
            image: 'https://s3.eu-central-1.amazonaws.com/vheurope/new-home/zaragoza.png',
            price: '15.77',
            href: "/#/search/Barcelona/ES/Zaragoza/ES/" + vm.today + "/NaN",
            country: "ES"
        });

        vm.popular_searches_fr.push({
            id: 0,
            origin: 'Lille',
            destination: 'Paris',
            image: 'https://s3.eu-central-1.amazonaws.com/vheurope/home/popular_trips/france/Paris.jpg',
            price: '5.00',
            href: "/#/search/Lille/FR/Paris/FR/" + vm.today + "/NaN",
            country: "FR"
        });
        vm.popular_searches_fr.push({
            id: 1,
            origin: 'Paris',
            destination: 'Bruxelles',
            image: 'https://s3.eu-central-1.amazonaws.com/vheurope/home/popular_trips/france/Bruxelles.jpg',
            price: '15.00',
            href: "/#/search/Paris/FR/Bruxelles/FR/" + vm.today + "/NaN",
            country: "FR"
        });
        vm.popular_searches_fr.push({
            id: 2,
            origin: 'Lyon',
            destination: 'Paris',
            image: 'https://s3.eu-central-1.amazonaws.com/vheurope/home/popular_trips/france/Paris.jpg',
            price: '15.00',
            href: "/#/search/Lyon/FR/Paris/FR/" + vm.today + "/NaN",
            country: "FR"
        });
        vm.popular_searches_fr.push({
            id: 3,
            origin: 'Toulouse',
            destination: 'Paris',
            image: 'https://s3.eu-central-1.amazonaws.com/vheurope/home/popular_trips/france/Paris.jpg',
            price: '19.00',
            href: "/#/search/Toulouse/FR/Paris/FR/" + vm.today + "/NaN",
            country: "FR"
        });
        vm.popular_searches_fr.push({
            id: 4,
            origin: 'Paris',
            destination: 'Lyon',
            image: 'https://s3.eu-central-1.amazonaws.com/vheurope/home/popular_trips/france/Lyon.jpg',
            price: '15.00',
            href: "/#/search/Paris/FR/Lyon/FR/" + vm.today + "/NaN",
            country: "FR"
        });
        vm.popular_searches_fr.push({
            id: 5,
            origin: 'Paris',
            destination: 'Lille',
            image: 'https://s3.eu-central-1.amazonaws.com/vheurope/home/popular_trips/france/Lille.jpg',
            price: '5.00',
            href: "/#/search/Paris/FR/Lille/FR/" + vm.today + "/NaN",
            country: "FR"
        });
        vm.popular_searches_fr.push({
            id: 6,
            origin: 'Paris',
            destination: 'Toulouse',
            image: 'https://s3.eu-central-1.amazonaws.com/vheurope/home/popular_trips/france/Toulouse.jpg',
            price: '19.00',
            href: "/#/search/Paris/FR/Toulouse/FR/" + vm.today + "/NaN",
            country: "FR"
        });
        vm.popular_searches_fr.push({
            id: 7,
            origin: 'Bordeaux',
            destination: 'Paris',
            image: 'https://s3.eu-central-1.amazonaws.com/vheurope/home/popular_trips/france/Paris.jpg',
            price: '25.00',
            href: "/#/search/Bordeaux/FR/Paris/FR/" + vm.today + "/NaN",
            country: "FR"
        });

        vm.origin = params.origin + "," + params.countryOrigin;
        vm.destination = params.destination + "," + params.countryDestination;
        vm.countryOrigin = params.countryOrigin;
        vm.countryDestination = params.countryDestination;
        vm.passengers = 1;
        vm.passengersAdult = 1;
        vm.passengersChild = 0;
        vm.passengersBaby = 0;
        vm.changeDate = changeDate;
        vm.quickSearch = quickSearch;
        vm.myOptionsOrigin = [];
        vm.myOptionsDestination = [];
        vm.switcher = switcher;

        vm.updatePassengers = function(type, direction) {
            if (direction == 'up' && vm.passengers < 7) {
                if (type == 'adult') {
                    vm.passengersAdult = vm.passengersAdult + 1;
                }
                if (type == 'child') {
                    vm.passengersChild = vm.passengersChild + 1;
                }
                if (type == 'baby') {
                    vm.passengersBaby = vm.passengersBaby + 1;
                }
            }

            if (direction == 'dwn') {
                if (type == 'adult' && vm.passengersAdult > 0) {
                    vm.passengersAdult = vm.passengersAdult - 1;
                }
                if (type == 'child' && vm.passengersChild > 0) {
                    vm.passengersChild = vm.passengersChild - 1;
                }
                if (type == 'baby' && vm.passengersBaby > 0) {
                    vm.passengersBaby = vm.passengersBaby - 1;
                }
            }
            vm.passengers = parseInt(vm.passengersAdult) + parseInt(vm.passengersChild) + parseInt(vm.passengersBaby);
            $('#select_passengers').val(vm.passengers);
        };

        vm.configOrigin = {
            //create: true,
            valueField: 'rt',
            labelField: 'name',
            searchField: ['name'],
            delimiter: '|',
            openOnFocus: true,
            placeholder: vm.city_origin,
            onInitialize: function(selectize) {
                // receives the selectize object as an argument
            },
            maxItems: 1,
            preload: true,
            load: function(query, callback) {
                if (!query.length) return callback();
                if (query.length >= 3) {
                    vm.myOptionsOrigin = [];
                    locationsRtFactory
                        .getAll(query)
                        .then(function(data) {

                            callback(data);
                            vm.myOptionsOrigin = data;
                            //sessionStorageService.setLocations(data);
                            //sessionStorageService.setFlag(true);
                        })
                        .catch(function(err) {
                            callback();
                        });
                }
            }
        };

        vm.configDestination = {
            //create: true,
            valueField: 'rt',
            labelField: 'name',
            searchField: ['name'],
            delimiter: '|',
            placeholder: vm.city_destination,
            onInitialize: function(selectize) {
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
                    .then(function(data) {
                        callback(data);
                        vm.myOptionsDestination = data;

                        //sessionStorageService.setLocations(data);
                        //sessionStorageService.setFlag(true);
                    })
                    .catch(function(err) {
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
            .then(function(data) {
                // callback(data.items);
                vm.myOptionsOrigin = data;
                vm.myOptionsDestination = data;
                //sessionStorageService.setLocations(data);
                //sessionStorageService.setFlag(true);
            })
            .catch(function(err) {
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


        vm.searchTrips = function() {

            angular.forEach(vm.myOptionsOrigin, function(value, key) {
                if (vm.myOptionsOrigin[key].rt === vm.origin) {
                    vm.originCity = vm.myOptionsOrigin[key].name;
                    vm.originCountryCode = vm.myOptionsOrigin[key].countryCode;
                    vm.originCountry = vm.myOptionsOrigin[key].country;
                    vm.originId = vm.myOptionsOrigin[key].id;
                    vm.originRT = vm.myOptionsOrigin[key].rt;
                }
            });

            angular.forEach(vm.myOptionsDestination, function(value, key) {

                if (vm.myOptionsDestination[key].rt === vm.destination) {
                    vm.destinationCity = vm.myOptionsDestination[key].name;
                    vm.destinationCountryCode = vm.myOptionsDestination[key].countryCode;
                    vm.destinationCountry = vm.myOptionsDestination[key].country;
                    vm.destinationId = vm.myOptionsDestination[key].id;
                    vm.destinationRT = vm.myOptionsDestination[key].rt;
                }
            });

            sessionStorageService.setIdForPlanes(vm.originId, vm.destinationId, vm.originRT, vm.destinationRT);

            var formatOrigin;
            var formatDestination;
            var origin = vm.originCity.split(",");
            var destination = vm.destinationCity.split(",");
            formatOrigin = origin[0].replace(/\s/g, '_');
            formatOrigin = skipAccents(formatOrigin);
            formatDestination = destination[0].replace(/\s/g, '_');
            formatDestination = skipAccents(formatDestination);

            if (vm.originCity === vm.destinationCity || vm.originCity == "" || vm.destinationCity == "") {
                vm.good = false;
                cityError();
            } else {
                if (vm.dates.returnDate == "Invalid date" || vm.dates.returnDate == undefined) vm.dates.returnDate = ""

                if (vm.dates.returnDate != "" && vm.dates.returnDate != "Invalid date") {
                    var date1 = vm.dates.departureDate;
                    var date2 = vm.dates.returnDate;
                    var vD1 = date1.split("/")
                    var vD2 = date2.split("/")
                    changeDate();
                    var newDate1 = new Date(vD1[2], vD1[1], vD1[0]);
                    var newDate2 = new Date(vD2[2], vD2[1], vD2[0]);
                    var newDate3 = new Date(vD1[2], vD1[1] - 1, vD1[0]);
                    var newDate4 = new Date(vD2[2], vD2[1] - 1, vD2[0]);
                    vm.departureDateUnix = new Date(newDate3).getTime();
                    vm.returnDateUnix = new Date(newDate4).getTime();

                    if (newDate1 <= newDate2) {
                        utilityService.setData(vm.originCity, vm.originCountry, vm.destinationCity, vm.destinationCountry, vm.dates.departureDate, vm.dates.returnDate, vm.passengers, vm.originCountryCode, vm.destinationCountryCode, vm.passengersAdult, vm.passengersChild, vm.passengersBaby, vm.originRT, vm.destinationRT);
                        sessionStorageService.setPassengers(vm.passengersAdult, vm.passengersChild, vm.passengersBaby);
                        sessionStorageService.setLocations(vm.myOptionsOrigin.concat(vm.myOptionsDestination));
                        vm.good = true;
                        $location.path("/search/" + formatOrigin + "/" + vm.originCountryCode + "/" + formatDestination + "/" + vm.destinationCountryCode + "/" + vm.departureDateUnix + "/" + vm.returnDateUnix);

                    } else {
                        vm.good = false;
                        dateError();
                    }
                } else {
                    var date1 = vm.dates.departureDate;
                    var date2 = vm.dates.returnDate;
                    var vD1 = date1.split("/")
                    var vD2 = date2.split("/")
                    var newDate3 = new Date(vD1[2], vD1[1] - 1, vD1[0]);
                    var newDate4 = new Date(vD2[2], vD2[1] - 1, vD2[0]);
                    vm.departureDateUnix = new Date(newDate3).getTime();
                    vm.returnDateUnix = new Date(newDate4).getTime();
                    utilityService.setData(vm.originCity, vm.originCountry, vm.destinationCity, vm.destinationCountry, vm.dates.departureDate, vm.dates.returnDate, vm.passengers, vm.originCountryCode, vm.destinationCountryCode, vm.passengersAdult, vm.passengersChild, vm.passengersBaby, vm.originRT, vm.destinationRT);
                    sessionStorageService.setPassengers(vm.passengersAdult, vm.passengersChild, vm.passengersBaby);
                    sessionStorageService.setLocations(vm.myOptionsOrigin.concat(vm.myOptionsDestination));
                    vm.good = true;
                    $location.path("/search/" + formatOrigin + "/" + vm.originCountryCode + "/" + formatDestination + "/" + vm.destinationCountryCode + "/" + vm.departureDateUnix + "/" + vm.returnDateUnix);
                }
            }
        }

        function changeDate() {
            vm.departureDateUnix = new Date(vm.dates.departureDate).getTime() / 1000;
        }

        function cityError() {
            if (!vm.good) {
                $('#error-cities').modal('show');
            }
        }

        function dateError() {
            if (!vm.good) {
                $('#error-date').modal('show');
            }
        }

        function quickSearch(origin, destination, id, country) {
            sessionStorageService.setPassengers(1, 0, 0);
            $('#departureDate-quick-' + id).change(function() {
                var departureDate = $('#departureDate-quick-' + id).val();
                $location.path("/search/" + origin + "/" + country + "/" + destination + "/" + country + "/" + departureDate + "/NaN");
            })
        }

        function switcher() {
            var splitOrigin = vm.origin.split(',')
            var splitDestination = vm.destination.split(',')
            var originSwitch;
            var destinationSwitch;
            if (splitOrigin[0] != 'undefined' && splitDestination[0] != 'undefined') {
                originSwitch = vm.destination;
                destinationSwitch = vm.origin;
                // change the cities
                vm.origin = originSwitch;
                vm.destination = destinationSwitch;
            }
        }


        $('#select_passengers').on('click', function() {
            var offset = $(this).offset();
            $('.popover-select-passengers').attr('style', 'display: block;top:' + (offset.top - 132) + 'px;left:' + (offset.left) + 'px;');
            $('.popover-select-passengers').toggleClass('open');
            $('#popover-bg').attr('style', 'display: block;opacity:0');
        });
        $('#select_passengers').siblings('span').on('click', function() {
            var offset = $('#select_passengers').offset();
            $('.popover-select-passengers').attr('style', 'display: block;top:' + (offset.top - 132) + 'px;left:' + (offset.left) + 'px;');
            $('.popover-select-passengers').toggleClass('open');
            $('#popover-bg').attr('style', 'display: block;opacity:0');
        });

        $('#popover-bg').on('click', function() {
            $('.popover-select-passengers').attr('style', 'display: none;');
            $('#popover-bg').attr('style', 'display: none;opacity:0');
        });

        vm.openReturnCalendar = openReturnCalendar;
        vm.openDepartureCalendar = openDepartureCalendar

        function openReturnCalendar() {
            $('#returnDate').siblings('input').click();
        }

        function openDepartureCalendar() {
            $('#departureDate').siblings('input').click();
        }

        $('.header-home.spain').attr('style', 'background: url(' + bg_images[Math.floor((Math.random() * 25) + 1)] + ') no-repeat center center fixed; background-size: cover;');
        $('.cookie-message').cookieBar();

        function skipAccents(text) {
            var acentos = "ÃÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛãàáäâèéëêìíïîòóöôùúüûÑñÇç";
            var original = "AAAAAEEEEIIIIOOOOUUUUaaaaaeeeeiiiioooouuuunncc";
            for (var i = 0; i < acentos.length; i++) {
                text = text.replace(acentos.charAt(i), original.charAt(i));
            }

            return text;
        }

    }
})();