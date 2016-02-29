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

	$scope.myOptions = [];

	$scope.myConfig = {
  		create: true,
  		valueField: 'city',
  		labelField: 'label',
  		delimiter: '|',
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

      locationsFactory
        .getAll()
        .then(function (data) {
            $scope.myOptions = data;
        })
        .catch(function (err) {
            console.log(err);
        });

	$scope.searchTrips = function () {

        if ($scope.origin === $scope.destination || $scope.origin =="" || $scope.destination =="" ) {
            console.log("error cities");
            $scope.good = false;
        } else {
            if ($scope.dates.returnDate) {
                var date1 = $scope.dates.departureDate;
                var date2 = $scope.dates.returnDate;
                var vD1 = date1.split("/")
                var vD2 = date2.split("/")

                var newDate1 = new Date(vD1[2],vD1[1],vD1[0]);
                var newDate2 = new Date(vD2[2],vD2[1],vD2[0]);

                if ( newDate1 <= newDate2) {
                    console.log($scope.origin);
                	console.log($scope.destination);
                	console.log('departure: '+$scope.dates.departureDate);
                    console.log('returns: '+$scope.dates.returnDate);
                    utilityService.setData($scope.origin,"España", $scope.destination,"España", $scope.dates.departureDate, $scope.dates.returnDate);
                    $scope.good = true;

                }else {
                    console.log("error dates");
                    $scope.good = false;
                }
            }else{
                console.log($scope.origin);
            	console.log($scope.destination);
            	console.log('departure: '+$scope.dates.departureDate);
                console.log('returns: '+$scope.dates.returnDate);
                utilityService.setData($scope.origin,"España", $scope.destination,"España", $scope.dates.departureDate, $scope.dates.returnDate);
                $scope.good = true;
            }
        }
    };

   	$('.header-home.spain').attr('style','background: url("https://dl.dropboxusercontent.com/u/993466/voyhoy/gugenheim.png") no-repeat center center fixed; background-size: cover;');

  });
