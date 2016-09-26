(function () {
    'use strict';

    /**
     * @ngdoc service
     * @name vhEurope.placePicker.directive
     * @description
     * # placePicker.directive
     * Directive in the vhEurope.
     */
    angular.module('vhEurope')

    /*.directive("placePicker", function() {
        return {
            restrict: 'EA',
            scope: {
                config: '=?',
                ngModel: '=',
                options: '='
            },
            link: function(scope, element, attrs, ctrl){

                var defaultConifg = {

                };

                var config = angular.extend({}, defaultConifg, scope.config);

                var html = "<input type='text' id='" + attrs.id + "' class='" + attrs.class + "' placeholder='" + config.placeholder + "'>/</input>"; 

                var newElem = $(html);
                element.replaceWith(newElem);

                //
                // * Uses Sifter to do the search
                // * available functions of Sifter:
                // * - initialization: Sifter(items, settings)
                // * - 
                 
            }
        };
    });*/



     
    // selectize classical placePicker
    .directive("placePicker", function(sessionStorageService) {

        return {
            restrict: 'EA',
            require: '^ngModel',
            scope: { ngModel: '=', config: '=?', options: '=?', ngDisabled: '=', ngRequired: '&' },
            link: function(scope, element, attrs, modelCtrl) {

                var selectizeConfig = {
                    //create: true,
                    valueField: 'label',
                    labelField: 'label',
                    searchField: ['label'],
                    delimiter: '|',
                    highlight: false,
                    onInitialize: function(selectize){
                      // receives the selectize object as an argument
                    },
                    maxItems: 1
                };
                var selectize,
                    settings = angular.extend({}, Selectize.defaults, selectizeConfig, scope.config);

                scope.options = scope.options || [];
                scope.config = scope.config || {};

                var isEmpty = function(val) {
                    return val === undefined || val === null || !val.length; //support checking empty arrays
                };

                var toggle = function(disabled) {
                    disabled ? selectize.disable() : selectize.enable();
                }

                var validate = function() {
                    var isInvalid = (scope.ngRequired() || attrs.required || settings.required) && isEmpty(scope.ngModel);
                    modelCtrl.$setValidity('required', !isInvalid);
                };

                var setSelectizeOptions = function(curr, prev) {
                    angular.forEach(prev, function(opt){
                        if(curr.indexOf(opt) === -1){
                            var value = opt[settings.valueField];
                            selectize.removeOption(value, true);
                        }
                    }); 

                    selectize.addOption(curr, true);

                    setSelectizeValue();
                }

                var setSelectizeValue = function() {
                    validate();

                    selectize.$control.toggleClass('ng-valid', modelCtrl.$valid);
                    selectize.$control.toggleClass('ng-invalid', modelCtrl.$invalid);
                    selectize.$control.toggleClass('ng-dirty', modelCtrl.$dirty);
                    selectize.$control.toggleClass('ng-pristine', modelCtrl.$pristine);

                    if (!angular.equals(selectize.items, scope.ngModel)) {
                        selectize.setValue(scope.ngModel, true);
                    }
                }

                settings.onChange = function(value) {
                    var value = angular.copy(selectize.items);
                    if (settings.maxItems == 1) {
                        value = value[0]
                    }
                    modelCtrl.$setViewValue( value );

                    if (scope.config.onChange) {
                        scope.config.onChange.apply(this, arguments);
                    }
                };

                settings.onOptionAdd = function(value, data) {
                    if( scope.options.indexOf(data) === -1 ) {
                        scope.options.push(data);

                        if (scope.config.onOptionAdd) {
                          scope.config.onOptionAdd.apply(this, arguments);
                        }
                    }
                };

                settings.onInitialize = function() {
                    selectize = element[0].selectize;

                    setSelectizeOptions(scope.options);

                    //provides a way to access the selectize element from an
                    //angular controller
                    if (scope.config.onInitialize) {
                        scope.config.onInitialize(selectize);
                    }

                    scope.$watchCollection('options', setSelectizeOptions);
                    scope.$watch('ngModel', setSelectizeValue);
                    scope.$watch('ngDisabled', toggle);

                    scope.$on('langEvent',function(){
                        var languageSession = sessionStorageService.getLanguage();
                        var retorno, city_destination, city_origin;
                        if (languageSession == null) {
                            if (utilityService.getLang() == 'es') {
                                retorno = 'Vuelta';
                                city_origin = 'Elige tu origen';
                                city_destination = 'Elige tu destino';
                            } else if (utilityService.getLang() == 'en') {
                                retorno = 'Return';
                                city_origin = 'Choose your origin';
                                city_destination = 'Choose your destination';
                            } else {
                                retorno = 'Retour';
                                city_origin = 'Choisissez votre origine';
                                city_destination = 'Choisissez votre destination';
                            }
                        } else {
                            if (languageSession == 'es') {
                                retorno = 'Vuelta';
                                city_origin = 'Elige tu origen';
                                city_destination = 'Elige tu destino';
                            } else if (languageSession == 'en') {
                                retorno = 'Return';
                                city_origin = 'Choose your origin';
                                city_destination = 'Choose your destination';
                            } else {
                                retorno = 'Retour';
                                city_origin = 'Choisissez votre origine';
                                city_destination = 'Choisissez votre destination';
                            }
                        }
                        var inputOrigin = angular.element("place-picker[ng-model*='origin']").parent().find("input");
                        var inputDestination = angular.element("place-picker[ng-model*='destination']").parent().find("input");
                        var inputReturn = angular.element("input.pikaday__display").parent().find("input#returnDate").next();
                        angular.element(inputOrigin).prop("placeholder", city_origin).css("width","auto");
                        angular.element(inputDestination).prop("placeholder", city_destination).css("width","auto");
                        angular.element(inputReturn).prop("placeholder", retorno);
                    });
                };

                element.selectize(settings);

                element.on('$destroy', function() {
                    if (selectize) {
                        selectize.destroy();
                        element = null;
                    }
                });
            }
        };
    });
})();
