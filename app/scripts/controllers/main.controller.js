'use strict';

/**
 * @ngdoc function
 * @name vhEurope.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the vhEurope
 */
angular.module('vhEurope')
  .controller('MainController', function ($scope,utilityService) {
  	$scope.origin = 0;
  	$scope.destination = 0;

	$scope.myOptions = [
  		{id: 1, title: 'Spectrometer'},
  		{id: 2, title: 'Star Chart'},
  		{id: 3, title: 'Laser Pointer'}
	];

	$scope.myConfig = {
  		create: true,
  		valueField: 'id',
  		labelField: 'title',
  		delimiter: '|',
  		placeholder: 'Pick something',
  		onInitialize: function(selectize){
    		// receives the selectize object as an argument
  		},
  		maxItems: 1
	};

	  $scope.dates = {
        departureDate: '26-02-2016',
        arrivalDate: '',
        minDate: '02-26-2016',
        maxDate: '03-26-2016'
      };

	$scope.searchTrips = function () {
    	if($scope.origin === 0 || $scope.destination === 0){
    		console.log('Debes seleccionar las ciudades de ida y vuelta');
    	}else{
    		console.log($scope.origin);
    		console.log($scope.destination);
    		console.log($scope.dates.departure);
            console.log($scope.dates.arrivalDate);
            utilityService.setData($scope.origin,$scope.destination,$scope.dates.departure,$scope.dates.departure);
    	}

    };

   	$('.header-home.spain').attr('style','background: url("https://dl.dropboxusercontent.com/u/993466/voyhoy/gugenheim.png") no-repeat center center fixed; background-size: cover;');
  	var dateObject = pikadayResponsive($('#date'),{
    format: "DD-MM-YYYY",
    outputFormat: "x",
    checkIfNativeDate: function() {
        // return true if native date field should be used
    },
    placeholder: "Selecciona una fecha",
    classes: "",
    dayOffset: 0,
    pikadayOptions: {
    	minDate: new Date()
    }
});
  });
