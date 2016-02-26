
'use strict';


app.directive('vhdatepicker', function ($parse) {
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

            console.log(element);
            console.log(attrs);

            return function (scope, element, attrs, controller) {
                  var processChange = function () {
                     var date = new Date(element.datepicker("getDate"));

                     scope.$apply(function (scope) {
                        // Change bound variable
                        modelAccessor.assign(scope, date);
                     });
                  };

                  var dateObject = pikadayResponsive(element,{
                   format: "DD-MM-YYYY",
                   outputFormat: "x",
                   checkIfNativeDate: function() {
                       // return true if native date field should be used
                   },
                   placeholder: "Selecciona una fecha",
                   classes: "",
                   dayOffset: 0,
                   pikadayOptions: {
                     minDate: new Date()
                   }
               });
               

               scope.$watch(modelAccessor, function (val) {
                  var date = new Date(val);
                 // element.datepicker("setDate", date);
               });

            };

         }
      };
});