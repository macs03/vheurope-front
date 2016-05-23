(function() {
    'use strict';

    /**
     * @ngdoc service
     * @name vhEurope.profileMenu.directive
     * @description
     * # profileMenu.directive
     * Directive in the vhEurope.
     */
    angular.module('vhEurope')
        .directive('vhProfileMenuDirective', profileMenuDirective);

    profileMenuDirective.$inject = [];

    function profileMenuDirective() {

        var directive = {
            restrict: 'EA',
            templateUrl: 'views/profile-menu.tpl.html'
        }
        return directive;
    }
})();
