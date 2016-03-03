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
    .controller('MainController', MainController)

    MainController.$inject =['$scope','utilityService','locationsFactory'];


    function MainController ($scope,utilityService,locationsFactory) {

        var vm = this;
       

   	    $('.header-home.spain').attr('style','background: url("https://dl.dropboxusercontent.com/u/993466/voyhoy/gugenheim.png") no-repeat center center fixed; background-size: cover;');

    }
