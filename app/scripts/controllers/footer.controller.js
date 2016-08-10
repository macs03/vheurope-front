(function() {
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

    FooterController.$inject = ['$scope', '$rootScope', 'utilityService'];


    function FooterController($scope, $rootScope, utilityService) {

        var vm = this;
        vm.popular_links = [];
        vm.today = String(moment().add(1, 'days').unix());

        var country = utilityService.getCountry();

        if (country == 'fr') {
            console.log('Francia');
        } else if (country == 'es') {
            console.log('España');
        }

        vm.popular_links.push({
            id: 1,
            origin: 'Madrid',
            destination: 'Barcelona',
            href: "/#/search/Madrid/ES/Barcelona/ES/" + vm.today + "/NaN"
        });
        vm.popular_links.push({
            id: 2,
            origin: 'Barcelona',
            destination: 'Madrid',
            href: "/#/search/Barcelona/ES/Madrid/ES/" + vm.today + "/NaN"
        });
        vm.popular_links.push({
            id: 3,
            origin: 'Madrid',
            destination: 'Granada',
            href: "/#/search/Madrid/ES/Granada/ES/" + vm.today + "/NaN"
        });
        vm.popular_links.push({
            id: 4,
            origin: 'Granada',
            destination: 'Madrid',
            href: "/#/search/Granada/ES/Madrid/ES/" + vm.today + "/NaN"
        });
        vm.popular_links.push({
            id: 5,
            origin: 'Madrid',
            destination: 'Bilbao',
            href: "/#/search/Madrid/ES/Bilbao/ES/" + vm.today + "/NaN"
        });
        vm.popular_links.push({
            id: 6,
            origin: 'Bilbao',
            destination: 'Madrid',
            href: "/#/search/Bilbao/ES/Madrid/ES/" + vm.today + "/NaN"
        });
        vm.popular_links.push({
            id: 7,
            origin: 'Madrid',
            destination: 'Burgos',
            href: "/#/search/Madrid/ES/Burgos/ES/" + vm.today + "/NaN"
        });
        vm.popular_links.push({
            id: 8,
            origin: 'Burgos',
            destination: 'Madrid',
            href: "/#/search/Burgos/ES/Madrid/ES/" + vm.today + "/NaN"
        });
        vm.popular_links.push({
            id: 9,
            origin: 'Granada',
            destination: 'Malaga',
            href: "/#/search/Granada/ES/Malaga/ES/" + vm.today + "/NaN"
        });
        vm.popular_links.push({
            id: 10,
            origin: 'Malaga',
            destination: 'Granada',
            href: "/#/search/Malaga/ES/Granada/ES/" + vm.today + "/NaN"
        });
        vm.popular_links.push({
            id: 11,
            origin: 'Barcelona',
            destination: 'Zaragoza',
            href: "/#/search/Barcelona/ES/Zaragoza/ES/" + vm.today + "/NaN"
        });
        vm.popular_links.push({
            id: 12,
            origin: 'Zaragoza',
            destination: 'Barcelona',
            href: "/#/search/Zaragoza/ES/Barcelona/ES/" + vm.today + "/NaN"
        });
        vm.popular_links.push({
            id: 13,
            origin: 'Madrid',
            destination: 'Zaragoza',
            href: "/#/search/Madrid/ES/Zaragoza/ES/" + vm.today + "/NaN"
        });
        vm.popular_links.push({
            id: 14,
            origin: 'Zaragoza',
            destination: 'Madrid',
            href: "/#/search/Zaragoza/ES/Madrid/ES/" + vm.today + "/NaN"
        });
        vm.popular_links.push({
            id: 15,
            origin: 'Valencia',
            destination: 'Barcelona',
            href: "/#/search/Valencia/ES/Barcelona/ES/" + vm.today + "/NaN"
        });
        vm.popular_links.push({
            id: 16,
            origin: 'Barcelona',
            destination: 'Valencia',
            href: "/#/search/Barcelona/ES/Valencia/ES/" + vm.today + "/NaN"
        });
        vm.popular_links.push({
            id: 17,
            origin: 'Madrid',
            destination: 'Oviedo',
            href: "/#/search/Madrid/ES/Oviedo/ES/" + vm.today + "/NaN"
        });
        vm.popular_links.push({
            id: 18,
            origin: 'Oviedo',
            destination: 'Madrid',
            href: "/#/search/Oviedo/ES/Madrid/ES/" + vm.today + "/NaN"
        });
        vm.popular_links.push({
            id: 19,
            origin: 'Madrid',
            destination: 'Valladolid',
            href: "/#/search/Madrid/ES/Valladolid/ES/" + vm.today + "/NaN"
        });
        vm.popular_links.push({
            id: 20,
            origin: 'Valladolid',
            destination: 'Madrid',
            href: "/#/search/Valladolid/ES/Madrid/ES/" + vm.today + "/NaN"
        });
        vm.popular_links.push({
            id: 21,
            origin: 'Madrid',
            destination: 'Valencia',
            href: "/#/search/Madrid/ES/Valencia/ES/" + vm.today + "/NaN"
        });
        vm.popular_links.push({
            id: 22,
            origin: 'Valencia',
            destination: 'Madrid',
            href: "/#/search/Valencia/ES/Madrid/ES/" + vm.today + "/NaN"
        });
        vm.popular_links.push({
            id: 23,
            origin: 'Madrid',
            destination: 'Vigo',
            href: "/#/search/Madrid/ES/Vigo/ES/" + vm.today + "/NaN"
        });
        vm.popular_links.push({
            id: 24,
            origin: 'Vigo',
            destination: 'Madrid',
            href: "/#/search/Vigo/ES/Madrid/ES/" + vm.today + "/NaN"
        });
    }
})();