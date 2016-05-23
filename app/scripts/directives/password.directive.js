(function() {
    'use strict';

    /**
     * @ngdoc service
     * @name vhEurope.password.directive
     * @description
     * # password.directive
     * Directive in the vhEurope.
     */
    angular.module('vhEurope')
        .directive('passwordDirective', passwordDirective);

    passwordDirective.$inject = ['$parse'];

    function passwordDirective($parse) {
        return {
            require: 'ngModel',
            restrict: 'A',
            link: function(scope, elem, attrs, ctrl) {
                //This part does the matching
                scope.$watch(function() {
                    return (ctrl.$pristine && angular.isUndefined(ctrl.$modelValue)) || $parse(attrs.match)(scope) === ctrl.$modelValue;
                }, function(currentValue) {
                    ctrl.$setValidity('match', currentValue);
                });

                //This part is supposed to check the strength
                ctrl.$parsers.unshift(function(viewValue) {
                    var pwdValidLength, pwdHasLetter, pwdHasNumber;

                    pwdValidLength = (viewValue && viewValue.length >= 8 ? true : false);
                    pwdHasLetter = (viewValue && /[A-z]/.test(viewValue)) ? true : false;
                    pwdHasNumber = (viewValue && /\d/.test(viewValue)) ? true : false;

                    if (pwdValidLength && pwdHasLetter && pwdHasNumber) {
                        ctrl.$setValidity('pwd', true);
                        ctrl.$setValidity('good', false);
                        ctrl.$setValidity('regular', true);
                        ctrl.$setValidity('bad', true);
                    }else if (pwdValidLength && pwdHasLetter || pwdHasLetter && pwdHasNumber || pwdValidLength && pwdHasNumber) {
                        ctrl.$setValidity('good', true);
                        ctrl.$setValidity('regular', false);
                        ctrl.$setValidity('bad', true);
                    } else {
                        ctrl.$setValidity('good', true);
                        ctrl.$setValidity('regular', true);
                        ctrl.$setValidity('bad', false);
                        ctrl.$setValidity('pwd', false);
                    }
                    return viewValue;
                });
            },
        };
    }
})();
