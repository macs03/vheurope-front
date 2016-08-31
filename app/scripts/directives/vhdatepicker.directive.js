(function() {
  'use strict';


  app.directive('vhdatepicker', function($parse) {
    return {
      restrict: "E",
      replace: true,
      transclude: false,
      compile: function(element, attrs) {
        var modelAccessor = $parse(attrs.ngModel);

        var html = "<input type='text' id='" + attrs.id + "' class='" + attrs.class + "'>" +
          "</input>";

        var newElem = $(html);
        element.replaceWith(newElem);

        return function(scope, element, attrs, controller) {

          var dateObject = pikadayResponsive(element, {
            format: "DD-MM-YYYY",
            outputFormat: "x",
            placeholder: "Selecciona una fecha",
            dayOffset: 0,
            checkIfNativeDate: function() {
              return Modernizr.inputtypes.date && (Modernizr.touch && navigator.appVersion.indexOf("Win") === -1);
            },
            pikadayOptions: {
              minDate: new Date()
            }
          });

          scope.$watch(modelAccessor, function(val) {
            var date = new Date(val);
          });

        };

      }
    };
  });
})();