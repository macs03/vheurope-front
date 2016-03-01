'use strict';

/**
 * @ngdoc function
 * @name vhEurope.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the vhEurope
 */
angular.module('vhEurope')
  .controller('MainController', function ($scope,utilityService,locationsFactory) {

  	$scope.origin = 0;
  	$scope.destination = 0;

	
  $scope.myOptions = [
      {id: 1, city: 'Barcelona', country: 'España', label: 'Barcelona, España'},
      {id: 1, city: 'Madrid', country: 'España', label: 'Madrid, España'},
      {id: 1, city: 'Bercena', country: 'España', label: 'Barcena, España'},

  ];


	$scope.myConfig = {
  		create: false,
  		valueField: 'city',
  		labelField: 'label',
  		placeholder: 'Pick something',
  		onInitialize: function(selectize){
    		// receives the selectize object as an argument
  		},
  		maxItems: 1
	};

	  $scope.dates = {
        departureDate: moment().format('DD/MM/YYYY'),
        returnDate: '',
        minDate: moment().format('MM-DD-YYYY'),
        maxDate: moment().add(30, 'days').format('MM-DD-YYYY')
      };

      /*locationsFactory
        .getAll()
        .then(function (data) {
          console.log(data);
            $scope.myOptions = data;
        })
        .catch(function (err) {
            console.log(err);
        });
        */

	$scope.searchTrips = function () {

    	console.log($scope.origin);
    	console.log($scope.destination);
    	console.log('departure: '+$scope.dates.departureDate);
        console.log('returns: '+$scope.dates.returnDate);
        utilityService.setData($scope.origin, $scope.destination, $scope.dates.departureDate, $scope.dates.returnDate);


    };

   	$('.header-home.spain').attr('style','background: url("https://dl.dropboxusercontent.com/u/993466/voyhoy/gugenheim.png") no-repeat center center fixed; background-size: cover;');

  });
