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

        SearchController.$inject =['locationsFactory','travelsFactory','utilityService','$scope','$interval','$stateParams','$timeout'];

        function SearchController (locationsFactory,travelsFactory,utilityService,$scope,$interval,$stateParams,$timeout) {
            var vm = this;
            vm.searchTrip = searchTrip;
            vm.searching = false;
            vm.error = false;
            vm.order = order;
            vm.type = 'price';
            vm.reverse = true;
            vm.companyFilter = companyFilter;
            vm.seatFilter = seatFilter;
            vm.disabled = false;
            vm.alternativeSearch = alternativeSearch;
            vm.selectDeparture = true;
            vm.departureSelect = departureSelect;
            vm.isLoading = true;

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
                maxDate: moment().add(30, 'days').format('MM-DD-YYYY')
            };
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

            locationsFactory
                .getAll()
                .then(function (data) {
                    vm.myOptions = data;
                })
                .catch(function (err) {
                    console.log(err);
                });

            var params = utilityService.getData();
          	vm.origin = params.origin+", "+params.countryOrigin;
          	vm.destination = params.destination+", "+params.countryDestination;
            vm.dates.departureDate = params.departure;
            vm.dates.returnDate = params.returns;
            vm.countryOrigin = params.countryOrigin;
            vm.countryDestination = params.countryDestination;

            if(params.origin){
                vm.results = false;
                vm.trips = [];
                vm.searching = true;
                vm.error = false;
                vm.disabled = true;
                setTimeout(function () {
                        $('.pikaday__display').prop('disabled', true);
                }, 100);

                travelsFactory
                    .getAll(params.origin,params.destination,params.departure,params.returns,params.passengers)
                    .then(function(data){
                        vm.isLoading = false;
                        vm.trips = data;
                        vm.searching = false;
                        vm.results = true;
                        vm.disabled = false;
                        $('.pikaday__display').prop('disabled', false);
                        var time = $timeout(function () {
                            setDateFilterRange(data.maxPrice,data.minPrice);
                        }, 100);
                    })
                    .catch(function(err){
                        console.log(err);
                        vm.searching = false;
                        vm.error = true;
                        vm.msgError = err;
                        vm.disabled = false;
                        $('.pikaday__display').prop('disabled', false);
                    })

            }else{
                var origin = $stateParams.origin.split(",");
                var destination = $stateParams.destination.split(",");
                var dateDeparture = new Date(parseInt($stateParams.departureDate));
                var dateReturn = ""
                var returnDateFormat = ""

                if($stateParams.returnDate ==  "NaN"){
                    returnDateFormat = "";
                }else{
                    dateReturn = new Date(parseInt($routeParams.returnDate));
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

                vm.origin = $stateParams.origin+", España";
                vm.destination = $stateParams.destination+", España";
                vm.dates.departureDate = departureDateFormat;
                vm.dates.returnDate = returnDateFormat;
                vm.countryOrigin = origin[1];
                vm.countryDestination = destination[1];

                vm.results = false;
                vm.trips = [];
                vm.searching = true;
                vm.error = false;
                vm.disabled = true;
                setTimeout(function () {
                        $('.pikaday__display').prop('disabled', true);
                }, 100);

                travelsFactory
                    .getAll(origin[0],destination[0],departureDateFormat,returnDateFormat,1)
                    .then(function(data){
                        vm.isLoading = false;
                        vm.trips = data;
                        vm.searching = false;
                        vm.results = true;
                        vm.disabled = false;
                        $('.pikaday__display').prop('disabled', false);
                        var time = $timeout(function () {
                            setDateFilterRange(data.maxPrice,data.minPrice);
                        }, 100);
                    })
                    .catch(function(err){
                        console.log(err);
                        vm.searching = false;
                        vm.error = true;
                        vm.msgError = err;
                        vm.disabled = false;
                        $('.pikaday__display').prop('disabled', false);
                    })
            }

            function order(type) {
                if(vm.type === type) {
                     vm.reverse =!vm.reverse
                } else{
                    vm.reverse = false
                }
                vm.type = type;
            }

            $scope.$watch('search.origin', function(newVal, oldVal){
                if (newVal != oldVal && newVal != undefined) {
                    console.log('changed '+oldVal+" to "+newVal);
                    searchTrip();
                }
            }, true);
            $scope.$watch('search.destination', function(newVal, oldVal){
                if (newVal != oldVal && newVal != undefined) {
                    console.log('changed '+oldVal+" to "+newVal);
                    searchTrip();
                }
            }, true);
            $scope.$watch('search.dates.departureDate', function(newVal, oldVal){
                if (newVal != oldVal && newVal != undefined) {
                    console.log('changed '+oldVal+" to "+newVal);
                    searchTrip();
                }
            }, true);
            $scope.$watch('search.dates.returnDate', function(newVal, oldVal){
                if (newVal != oldVal && newVal != undefined) {
                    console.log('changed '+oldVal+" to "+newVal);
                    searchTrip();
                }
            }, true);

            function searchTrip() {

                var origin = vm.origin.split(",");
                var destination = vm.destination.split(",");
                if (vm.origin === vm.destination || vm.origin =="" || vm.destination =="" ) {
                    console.log("error cities");
                    vm.good = false;
                } else {
                    if(vm.dates.returnDate=="Invalid date" || vm.dates.returnDate==undefined) vm.dates.returnDate=""

                    if (vm.dates.returnDate != "" && vm.dates.returnDate!="Invalid date") {
                        var date1 = vm.dates.departureDate;
                        var date2 = vm.dates.returnDate;
                        var vD1 = date1.split("/")
                        var vD2 = date2.split("/")
                        var newDate1 = new Date(vD1[2],vD1[1],vD1[0]);
                        var newDate2 = new Date(vD2[2],vD2[1],vD2[0]);

                        if ( newDate1 <= newDate2) {
                            callSearch(origin[0],destination[0],vm.dates.departureDate,vm.dates.returnDate);
                            vm.good = true;

                        }else {
                            console.log("error dates");
                            vm.good = false;
                        }
                    }else{
                        callSearch(origin[0],destination[0],vm.dates.departureDate,vm.dates.returnDate);
                        vm.good = true;
                    }
                }

            }

            function callSearch(origin,destination,departureDate,returnDate) {
                vm.isLoading = true;
                vm.results = false;
                vm.trips = [];
                vm.searching = true;
                vm.error = false;
                vm.disabled = true;
                $('.pikaday__display').prop('disabled', true);
                travelsFactory
                    .getAll(origin,destination,departureDate,returnDate,1)
                    .then(function(data){
                        vm.isLoading = false;
                        vm.trips = data;
                        vm.searching = false;
                        vm.results = true;
                        vm.disabled = false;
                        $('.pikaday__display').prop('disabled', false);
                        var time = $timeout(function () {
                            setDateFilterRange(data.maxPrice,data.minPrice);
                        }, 100);
                    })
                    .catch(function(err){
                        console.log(err);
                        vm.searching = false;
                        vm.error = true;
                        vm.msgError = err;
                        vm.disabled = false;
                        $('.pikaday__display').prop('disabled', false);
                    })
            }

            function companyFilter(company) {
                if (company.checked) {
                   vm.company = company.name;
                }else{
                    vm.company ={};
                }
            }

            function seatFilter(seat) {
                if (seat.checked) {
                   vm.seat = seat.name;
                }else{
                    vm.seat ={};
                }
            }

            function alternativeSearch(origin, countryOrigin, destination, countryDestination) {
                vm.origin = origin+", "+countryOrigin;
                vm.destination = destination+", "+countryDestination;
                callSearch(origin,destination,vm.dates.departureDate,vm.dates.returnDate);
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
                    vm.departureId = "";
                    vm.departureDeparture = "";
                    vm.departureDuration = "";
                    vm.departureArrival = "";
                    vm.departurePrice = "";
                    vm.departureTypeService = "";
                    vm.departureCompanyName = "";
                    vm.departureLogo = "";
                }
            }

            $('.btn-filters').on('click', function(){
                $('#filters-container').toggleClass('hidden-xs');
            });

        }
})();
