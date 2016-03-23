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

        indexController.$inject =['$scope'];


        function indexController ($scope) {
            $scope.pageTitle = "Resertrip Viaja inteligente";

            function changeTitle(ev, title){
                $scope.pageTitle = title;
            }
            $scope.$on('titleEvent', changeTitle)
        }
})();
