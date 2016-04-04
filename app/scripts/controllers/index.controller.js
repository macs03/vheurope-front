(function () {
    'use strict';

    /**
     * @ngdoc function
     * @name vhEurope.controller:indexController
     * @description
     * # indexController
     * Controller of the vhEurope
     */
    angular
        .module('vhEurope')
        .controller('indexController', indexController)

        indexController.$inject =['$scope','$interval','utilityService','$location','sessionStorageService','$timeout'];


        function indexController ($scope,$interval,utilityService,$location,sessionStorageService,$timeout) {
            $scope.pageTitle = "Resertrip Viaja inteligente";
            $scope.showCLock = false;
            $scope.completeTime = false;
            function changeTitle(ev, title){
                $scope.pageTitle = title;
            }
            $scope.$on('titleEvent', changeTitle)
            function counterClock(ev, counter,flag){
                if(flag){
                    if ( angular.isDefined($scope.time) ) {
                        return
                    };
                    $scope.showCLock = true;
                    var seconds = 60;
                    counter = counter-1;
                    seconds = seconds-1
                    $scope.counter = counter;
                    $scope.seconds = seconds;
                    $scope.time = $interval(function () {
                        seconds = seconds-1;
                        $scope.seconds = seconds;
                        if (seconds < 10 && seconds >=0) {
                            seconds = "0"+seconds;
                            $scope.seconds = seconds;
                        }
                        if (seconds < 0) {
                            $scope.seconds = "59";
                            counter = counter-1;
                            $scope.counter = counter;
                            seconds = 59;
                        }
                        if (counter < 0) {
                            $interval.cancel($scope.time);
                            $scope.completeTime = true;
                            if($scope.completeTime){
                                $('#time-complete').modal('show');
                            }
                            $scope.showCLock = false;
                            var url = sessionStorageService.getUrl();
                            $location.path(url);
                        }
                    }, 1000);
                }

                if(!flag) {
                    if (angular.isDefined($scope.time)) {
                        $interval.cancel($scope.time);
                        $scope.time = undefined;
                    }
                    $scope.showCLock = false;
                    $scope.$on('$destroy', function() {
                      // Make sure that the interval is destroyed too
                      $interval.cancel($scope.time);
                    });
                }
            }
            $scope.$on('counterEvent', counterClock);

            $timeout(function() {
                var init = sessionStorageService.getFlag()
                $scope.initial = init
            }, 3000);

        }
})();
