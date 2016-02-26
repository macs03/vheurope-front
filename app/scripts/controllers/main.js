'use strict';

/**
 * @ngdoc function
 * @name vhEurope.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the vhEurope
 */
angular.module('vhEurope')
  .controller('MainCtrl', function ($scope) {
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
        departureDate: moment.tz('UTC'), //12:00 UTC, today.
        arrivalDate: moment.tz('UTC').add(1, 'd'), //12:00 UTC, in four days.
        minDate: moment.tz('UTC'),
        maxDate: moment.tz('UTC').add(20, 'd')
      };

	$scope.searchTrips = function () {
    	if($scope.origin === 0 || $scope.destination === 0){
    		console.log('Debes seleccionar las ciudades de ida y vuelta');
    	}else{
    		console.log($scope.origin);
    		console.log($scope.destination);
    		console.log($scope.dates.departure);
    	}
    	
    };
    
   	$('.header-home.spain').attr('style','background: url("https://dl.dropboxusercontent.com/u/993466/voyhoy/gugenheim.png") no-repeat center center fixed; background-size: cover;');
  });
