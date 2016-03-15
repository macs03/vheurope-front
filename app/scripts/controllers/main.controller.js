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

        MainController.$inject =['$scope','locationsFactory','utilityService'];


        function MainController ($scope,locationsFactory,utilityService) {

            var vm = this;
            var params = utilityService.getData();
            vm.popular_searches = [];
            vm.popular_searches.push({
                origin: 'Madrid',
                destination: 'Barcelona',
                image: 'https://dl.dropboxusercontent.com/u/993466/voyhoy/new-home/barcelona.jpg',
                price: '8700'
            });
            vm.popular_searches.push({
                origin: 'Madrid',
                destination: 'Bilbao',
                image: 'https://dl.dropboxusercontent.com/u/993466/voyhoy/new-home/bilbao.png',
                price: '8700'
            });
            vm.popular_searches.push({
                origin: 'Barcelona',
                destination: 'Madrid',
                image: 'https://dl.dropboxusercontent.com/u/993466/voyhoy/new-home/madrid.jpg',
                price: '8900'
            });
            vm.popular_searches.push({
                origin: 'Sevilla',
                destination: 'Málaga',
                image: 'https://dl.dropboxusercontent.com/u/993466/voyhoy/new-home/malaga.png',
                price: '9700'
            });
            vm.popular_searches.push({
                origin: 'Madrid',
                destination: 'Salamanca',
                image: 'https://dl.dropboxusercontent.com/u/993466/voyhoy/new-home/salamanca.png',
                price: '5700'
            });
            vm.popular_searches.push({
                origin: 'Málaga',
                destination: 'Sevilla',
                image: 'https://dl.dropboxusercontent.com/u/993466/voyhoy/new-home/sevilla.png',
                price: '8700'
            });
            vm.popular_searches.push({
                origin: 'Barcelona',
                destination: 'Valencia',
                image: 'https://dl.dropboxusercontent.com/u/993466/voyhoy/new-home/valencia.png',
                price: '9900'
            });
            vm.popular_searches.push({
                origin: 'Barcelona',
                destination: 'Zaragoza',
                image: 'https://dl.dropboxusercontent.com/u/993466/voyhoy/new-home/zaragoza.png',
                price: '4700'
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

                        }else {
                            console.log("error dates");
                            vm.good = false;
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

       	    $('.header-home.spain').attr('style','background: url("https://s3.eu-central-1.amazonaws.com/vheurope/gugenheim.jpg") no-repeat center center fixed; background-size: cover;');

        }
})();
