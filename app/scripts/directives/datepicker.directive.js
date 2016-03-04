(function () {
    'use strict';
    angular
        .module('vhEurope')
        .directive('vhdatepicker', function ($parse) {
        return {
            restrict: "E",
            replace: true,
            transclude: false,
            compile: function (element, attrs) {
                var modelAccessor = $parse(attrs.ngModel);

                var html = "<input type='text' id='" + attrs.id + "' >" +
                   "</input>";

                var newElem = $(html);
                element.replaceWith(newElem);

                return function (scope, element, attrs, controller) {

                    var el = element[0];
                    var minDate = null;
                    var maxDate = null;
                    var placeholder = "Selecciona un día";
                    var dateFormat = "DD-MM-YYYY";

                    //Inicializo la configuracion del detapicker en funcion de los atributos
                    if (attrs.hasOwnProperty('minDate')){
                        minDate = attrs.minDate;
                    }

                    if (attrs.hasOwnProperty('maxDate')){
                        maxDate = attrs.maxDate;
                    }

                    if (attrs.hasOwnProperty('placeholder')){
                        placeholder = attrs.placeholder;
                    }

                    if (attrs.hasOwnProperty('dateFormat')){
                        dateFormat = attrs.dateFormat;
                    }

                    var processChange = function (dateObject) {
                        var date = new Date(dateObject.value);
                        scope.$apply(function (scope) {
                            // Change bound variable
                            modelAccessor.assign(scope, moment(dateObject.value).format(dateFormat));
                        });
                    };

                    var dateObject = pikadayResponsive(el,{
                        format: dateFormat,
                        outputFormat: "x",
                        checkIfNativeDate: function() {
                           // return true if native date field should be used
                        },
                        placeholder: placeholder,
                        classes: "",
                        dayOffset: 0,
                        pikadayOptions: {
                            minDate: new Date(minDate),
                            maxDate: new Date(maxDate),
                        }
                    });

                    $(el).on("change-date", function(e, dateObject) {
                        processChange(dateObject);
                    });

                    if (attrs.setDate == "true"){
                        dateObject.setDate(new Date())
                    }
                };
             }
          };
    });
})();
