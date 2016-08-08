(function() {
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

    indexController.$inject = ['$scope', '$interval', 'utilityService', '$location', 'sessionStorageService', '$timeout'];


    function indexController($scope, $interval, utilityService, $location, sessionStorageService, $timeout) {
        $scope.pageDescription = "Compara horarios y precios de más de 90 empresas de autobús en España y reserva fácilmente online. Viaja inteligente con Resertrip.";
        $scope.showCLock = false;
        $scope.completeTime = false;
        $scope.searchView = false;
        $scope.initials = localStorage.getItem("resertrip_initials");
        $scope.avatar = localStorage.getItem("resertrip_avatar");
        if ($scope.avatar != null) {
            $scope.avatarFlag = true;
        } else {
            $scope.avatarFlag = false;
        }

        function changeView(ev, flag) {
            $scope.searchView = flag;
        }
        $scope.$on('viewEvent', changeView)

        function changeTitle(ev, title) {
            $scope.pageTitle = title;
        }
        $scope.$on('titleEvent', changeTitle)

        function changeDescription(ev, title) {
            $scope.pageDescription = title;
        }
        $scope.$on('descriptionEvent', changeDescription)

        var token = localStorage.getItem("resertrip_token");
        if (token != null) {
            $scope.login = true;
        } else {
            $scope.login = false;
            localStorage.removeItem("resertrip_avatar");
            localStorage.removeItem("resertrip_initials");
        }

        function changeStatus(ev, token) {
            if (token != null) {
                $scope.login = true;
            } else {
                $scope.login = false;
                localStorage.removeItem("resertrip_avatar");
                localStorage.removeItem("resertrip_initials");
            }
        }
        $scope.$on('tokenEvent', changeStatus)

        function initials(ev, initials) {
            localStorage.setItem("resertrip_initials", initials);
            $scope.initials = localStorage.getItem("resertrip_initials");
        }
        $scope.$on('initialEvent', initials)

        function avatar(ev, avatar) {
            localStorage.setItem("resertrip_avatar", avatar);
            $scope.avatar = localStorage.getItem("resertrip_avatar");
            if (avatar != null) {
                $scope.avatarFlag = true;
            } else {
                $scope.avatarFlag = false;
            }
        }
        $scope.$on('avatarEvent', avatar)

        function counterClock(ev, counter, flag) {
            if (flag) {
                if (angular.isDefined($scope.time)) {
                    return
                };
                $scope.showCLock = true;
                var seconds = 60;
                counter = counter - 1;
                seconds = seconds - 1
                $scope.counter = counter;
                $scope.seconds = seconds;
                $scope.time = $interval(function() {
                    seconds = seconds - 1;
                    $scope.seconds = seconds;
                    if (seconds < 10 && seconds >= 0) {
                        seconds = "0" + seconds;
                        $scope.seconds = seconds;
                    }
                    if (seconds < 0) {
                        $scope.seconds = "59";
                        counter = counter - 1;
                        $scope.counter = counter;
                        seconds = 59;
                    }
                    if (counter < 0) {
                        $interval.cancel($scope.time);
                        $scope.completeTime = true;
                        if ($scope.completeTime) {
                            $('#time-complete').modal('show');
                        }
                        $scope.showCLock = false;
                        var url = sessionStorageService.getUrl();
                        $location.path(url);
                    }
                }, 1000);
            }

            if (!flag) {
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
        $scope.initial = false;
        $timeout(function() {
            var init = sessionStorageService.getFlag();
            $scope.initial = init;
            $('.initial').fadeOut("slow");
        }, 3000);

    }
})();