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
        .controller('FooterController', FooterController)

        FooterController.$inject =['$scope','$rootScope'];


        function FooterController ($scope,$rootScope) {

            var vm = this;
            vm.popular_links = [];
            vm.today = String(new Date().getTime()/1000).replace('.','');
         
          

            vm.popular_links.push({
                id: 1,
                origin: 'Madrid',
                destination: 'Barcelona',
                href: "/#/search/Madrid/ESP/Barcelona/ESP/"+vm.today+"/NaN"
            });
            vm.popular_links.push({
                id: 2,
                origin: 'Barcelona',
                destination: 'Madrid',
                href: "/#/search/Barcelona/ESP/Madrid/ESP/"+vm.today+"/NaN"
            });
            vm.popular_links.push({
                id: 3,
                origin: 'Madrid',
                destination: 'Granada',
                href: "/#/search/Madrid/ESP/Granada/ESP/"+vm.today+"/NaN"
            });
            vm.popular_links.push({
                id: 4,
                origin: 'Granada',
                destination: 'Madrid',
                href: "/#/search/Granada/ESP/Madrid/ESP/"+vm.today+"/NaN"
            });
            vm.popular_links.push({
                id: 5,
                origin: 'Madrid',
                destination: 'Bilbao',
                href: "/#/search/Madrid/ESP/Bilbao/ESP/"+vm.today+"/NaN"
            });
            vm.popular_links.push({
                id: 6,
                origin: 'Bilbao',
                destination: 'Madrid',
                href: "/#/search/Bilbao/ESP/Madrid/ESP/"+vm.today+"/NaN"
            });
            vm.popular_links.push({
                id: 7,
                origin: 'Madrid',
                destination: 'Burgos',
                href: "/#/search/Madrid/ESP/Burgos/ESP/"+vm.today+"/NaN"
            });
            vm.popular_links.push({
                id: 8,
                origin: 'Burgos',
                destination: 'Madrid',
                href: "/#/search/Burgos/ESP/Madrid/ESP/"+vm.today+"/NaN"
            });
            vm.popular_links.push({
                id: 9,
                origin: 'Granada',
                destination: 'Malaga',
                href: "/#/search/Granada/ESP/Malaga/ESP/"+vm.today+"/NaN"
            });
            vm.popular_links.push({
                id: 10,
                origin: 'Malaga',
                destination: 'Granada',
                href: "/#/search/Malaga/ESP/Granada/ESP/"+vm.today+"/NaN"
            });
            vm.popular_links.push({
                id: 11,
                origin: 'Barcelona',
                destination: 'Zaragoza',
                href: "/#/search/Barcelona/ESP/Zaragoza/ESP/"+vm.today+"/NaN"
            });
            vm.popular_links.push({
                id: 12,
                origin: 'Zaragoza',
                destination: 'Barcelona',
                href: "/#/search/Zaragoza/ESP/Barcelona/ESP/"+vm.today+"/NaN"
            });
            vm.popular_links.push({
                id: 13,
                origin: 'Madrid',
                destination: 'Zaragoza',
                href: "/#/search/Madrid/ESP/Zaragoza/ESP/"+vm.today+"/NaN"
            });
            vm.popular_links.push({
                id: 14,
                origin: 'Zaragoza',
                destination: 'Madrid',
                href: "/#/search/Zaragoza/ESP/Madrid/ESP/"+vm.today+"/NaN"
            });
            vm.popular_links.push({
                id: 15,
                origin: 'Valencia',
                destination: 'Barcelona',
                href: "/#/search/Valencia/ESP/Barcelona/ESP/"+vm.today+"/NaN"
            });
            vm.popular_links.push({
                id: 16,
                origin: 'Barcelona',
                destination: 'Valencia',
                href: "/#/search/Barcelona/ESP/Valencia/ESP/"+vm.today+"/NaN"
            });
            vm.popular_links.push({
                id: 17,
                origin: 'Madrid',
                destination: 'Oviedo',
                href: "/#/search/Madrid/ESP/Oviedo/ESP/"+vm.today+"/NaN"
            });
            vm.popular_links.push({
                id: 18,
                origin: 'Oviedo',
                destination: 'Madrid',
                href: "/#/search/Oviedo/ESP/Madrid/ESP/"+vm.today+"/NaN"
            });
            vm.popular_links.push({
                id: 19,
                origin: 'Madrid',
                destination: 'Valladolid',
                href: "/#/search/Madrid/ESP/Valladolid/ESP/"+vm.today+"/NaN"
            });
            vm.popular_links.push({
                id: 20,
                origin: 'Valladolid',
                destination: 'Madrid',
                href: "/#/search/Valladolid/ESP/Madrid/ESP/"+vm.today+"/NaN"
            });
            vm.popular_links.push({
                id: 21,
                origin: 'Madrid',
                destination: 'Valencia',
                href: "/#/search/Madrid/ESP/Valencia/ESP/"+vm.today+"/NaN"
            });
            vm.popular_links.push({
                id: 22,
                origin: 'Valencia',
                destination: 'Madrid',
                href: "/#/search/Valencia/ESP/Madrid/ESP/"+vm.today+"/NaN"
            });
            vm.popular_links.push({
                id: 23,
                origin: 'Madrid',
                destination: 'Vigo',
                href: "/#/search/Madrid/ESP/Vigo/ESP/"+vm.today+"/NaN"
            });
            vm.popular_links.push({
                id: 24,
                origin: 'Vigo',
                destination: 'Madrid',
                href: "/#/search/Vigo/ESP/Madrid/ESP/"+vm.today+"/NaN"
            });
        }
})();
