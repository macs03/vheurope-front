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

                var html = "<input type='text' id='" + attrs.id + "' class='"+attrs.class+"' >" +
                   "</input>";

                var newElem = $(html);
                element.replaceWith(newElem);

                return function (scope, element, attrs, controller) {

                    var el = element[0];
                    var minDate = new Date(attrs.minDate.toString());
                    var maxDate = new Date(attrs.maxDate);
                    var placeholder = "Selecciona un día";
                    var dateFormat = "DD-MM-YYYY";
                    var daysNames = {
                        previousMonth : 'Anterior',
                        nextMonth     : 'Siguiente',
                        months        : ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'],
                        weekdays      : ['Domingo','Lunes','Martes','Miercoles','Jueves','Viernes','Sábado'],
                        weekdaysShort : ['Dom','Lun','Mar','Mie','Jue','Vie','Sab']
                    }

                    //Inicializo la configuracion del detapicker en funcion de los atributos
                    if (attrs.hasOwnProperty('minDate')){
                        minDate = new Date(attrs.minDate.toString());
                    }
                    if (attrs.hasOwnProperty('language')){
                        if(attr.language === 'EN'){
                            daysNames= {
                                previousMonth : 'Previous Month',
                                nextMonth     : 'Next Month',
                                months        : ['January','February','March','April','May','June','July','August','September','October','November','December'],
                                weekdays      : ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
                                weekdaysShort : ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']
                            }
                        }
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

                        if(attrs.id != "departureDate"){
                            scope.returnObj = dateObject;
                        } else {
                            scope.departureDateValue = dateObject.value;
                            if(scope.returnObj){
                                scope.returnObj.pikaday.setMinDate(moment(scope.departureDateValue).toDate());
                                if(dateObject.value > scope.returnObj.value){
                                    scope.returnObj.setDate();
                                }
                            }
                        }

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
                        pikadayOptions: {
                            minDate: new Date(minDate),
                            maxDate: new Date(maxDate),
                            i18n: daysNames,
                            firstDay: 1
                        }
                    });

                    if(attrs.id != "departureDate"){
                        scope.returnObj = dateObject;
                    }

                    $(el).on("change-date", function(e, dateObject) {
                        processChange(dateObject);
                    });

                    if (attrs.setDate == "true"){
                        dateObject.setDate(new Date())
                    }

                    if (attrs.hasOwnProperty('departureDate')) {
                        var vD = attrs.departureDate.split("/");
                        var newDate = new Date(vD[1]+"/"+vD[0]+"/"+vD[2]);
                        dateObject.setDate(newDate);
                    }

                    if (attrs.hasOwnProperty('returnDate')) {
                        var vD = attrs.returnDate.split("/");
                        var newDate = new Date(vD[1]+"/"+vD[0]+"/"+vD[2]);
                        dateObject.setDate(newDate);
                    }
                };
             }
          };
    });
})();
