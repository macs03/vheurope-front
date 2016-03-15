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

        MainController.$inject =['$scope','locationsFactory','utilityService','$location'];


        function MainController ($scope,locationsFactory,utilityService,$location) {

            var vm = this;
            var params = utilityService.getData();
            vm.popular_searches = [];
            vm.today = String(new Date().getTime()/1000).replace('.',''); 

            vm.popular_searches.push({
                origin: 'Madrid',
                destination: 'Barcelona',
                image: 'https://dl.dropboxusercontent.com/u/993466/voyhoy/new-home/barcelona.jpg',
                price: '32.41',
                href: "/#/search/Madrid/ES/Barcelona/ES/"+vm.today+"/NaN"
            });
            vm.popular_searches.push({
                origin: 'Madrid',
                destination: 'Bilbao',
                image: 'https://dl.dropboxusercontent.com/u/993466/voyhoy/new-home/bilbao.png',
                price: '31.27',
                href: "/#/search/Madrid/ES/Bilbao/ES/"+vm.today+"/NaN"
            });
            vm.popular_searches.push({
                origin: 'Barcelona',
                destination: 'Madrid',
                image: 'https://dl.dropboxusercontent.com/u/993466/voyhoy/new-home/madrid.jpg',
                price: '32.41',
                href: "/#/search/Barcelona/ES/Madrid/ES/"+vm.today+"/NaN"
            });
            vm.popular_searches.push({
                origin: 'Sevilla',
                destination: 'Málaga',
                image: 'https://dl.dropboxusercontent.com/u/993466/voyhoy/new-home/malaga.png',
                price: '18.57',
                href: "/#/search/Sevilla/ES/Malaga/ES/"+vm.today+"/NaN"
            });
            vm.popular_searches.push({
                origin: 'Madrid',
                destination: 'Salamanca',
                image: 'https://dl.dropboxusercontent.com/u/993466/voyhoy/new-home/salamanca.png',
                price: '32.41',
                href: "/#/search/Madrid/ES/Salamanca/ES/"+vm.today+"/NaN"
            });
            vm.popular_searches.push({
                origin: 'Málaga',
                destination: 'Sevilla',
                image: 'https://dl.dropboxusercontent.com/u/993466/voyhoy/new-home/sevilla.png',
                price: '18.57',
                href: "/#/search/Malaga/ES/Sevilla/ES/"+vm.today+"/NaN"
            });
            vm.popular_searches.push({
                origin: 'Barcelona',
                destination: 'Valencia',
                image: 'https://dl.dropboxusercontent.com/u/993466/voyhoy/new-home/valencia.png',
                price: '29.16',
                href: "/#/search/Barcelona/ES/Valencia/ES/"+vm.today+"/NaN"
            });
            vm.popular_searches.push({
                origin: 'Barcelona',
                destination: 'Zaragoza',
                image: 'https://dl.dropboxusercontent.com/u/993466/voyhoy/new-home/zaragoza.png',
                price: '15.77',
                href: "/#/search/Barcelona/ES/Zaragoza/ES/"+vm.today+"/NaN"
            });

          	vm.origin = params.origin+","+params.countryOrigin;
          	vm.destination = params.destination+","+params.countryDestination;
            vm.countryOrigin = params.countryOrigin;
            vm.countryDestination = params.countryDestination;
            vm.changeDate = changeDate;
        	vm.myOptions = [];
        	vm.myConfig = {
          		//create: true,
          		valueField: 'id',
          		labelField: 'label',
                searchField: ['label'],
          		delimiter: '|',
          		placeholder: 'Elige tu ciudad',
          		onInitialize: function(selectize){
            		// receives the selectize object as an argument
          		},
          		maxItems: 1
        	};
            vm.dates = {
                departureDate: moment().format('DD/MM/YYYY'),
                returnDate: '',
                minDate: moment().format('MM-DD-YYYY'),
                maxDate: moment().add(30, 'days').format('MM-DD-YYYY')
            };


            locationsFactory
                .getAll()
                .then(function (data) {
                    vm.myOptions = data;
                })
                .catch(function (err) {
                    console.log(err);
                });


        	vm.searchTrips = function () {
                angular.forEach(vm.myOptions, function(value, key) {
                    if(vm.myOptions[key].id === vm.origin){
                        vm.originCity = vm.myOptions[key].city;
                        vm.originCountryCode = vm.myOptions[key].countryCode;
                        vm.originCountry = vm.myOptions[key].country;
                    }
                    if(vm.myOptions[key].id === vm.destination){
                        vm.destinationCity = vm.myOptions[key].city;
                        vm.destinationCountryCode = vm.myOptions[key].countryCode;
                        vm.destinationCountry = vm.myOptions[key].country;
                    }
                });
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
                            console.log(vm.originCity);
                        	console.log(vm.destinationCity);
                        	console.log('departure: '+vm.dates.departureDate);
                            console.log('returns: '+vm.dates.returnDate);
                            utilityService.setData(vm.originCity,vm.originCountry, vm.destinationCity,vm.destinationCountry, vm.dates.departureDate, vm.dates.returnDate);
                            vm.good = true;
                            $location.path ("/search/"+vm.originCity+"/"+vm.originCountryCode+"/"+vm.destinationCity+"/"+vm.destinationCountryCode+"/"+vm.departureDateUnix+"/"+vm.returnDateUnix);

                        }else {
                            console.log("error dates");
                            vm.good = false;
                            dateError();
                        }
                    }else{
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
                        utilityService.setData(vm.originCity,vm.originCountry, vm.destinationCity,vm.destinationCountry, vm.dates.departureDate, vm.dates.returnDate);
                        vm.good = true;
                        $location.path ("/search/"+vm.originCity+"/"+vm.originCountryCode+"/"+vm.destinationCity+"/"+vm.destinationCountryCode+"/"+vm.departureDateUnix+"/"+vm.returnDateUnix);
                    }
                }
            }


            function changeDate(){
                vm.departureDateUnix = new Date(vm.dates.departureDate).getTime()/1000;
            }

            $('#switch_language_title').html($('#switch_language li.active').find('a').html() + '<span class="caret"></span>');

            $('#switch_language li').on('click', function() {
                $('#switch_language_title').html($(this).find('a').html() + '<span class="caret"></span>');
            });

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

              $('#divNewNotifications li').on('click', function() {
                console.log('Entre');
                $('#dropdown_title').html($(this).find('a').html());
            });

       	    $('.header-home.spain').attr('style','background: url("https://s3.eu-central-1.amazonaws.com/vheurope/gugenheim.jpg") no-repeat center center fixed; background-size: cover;');

        }
})();
