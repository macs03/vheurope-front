'use strict';

/**
 * @ngdoc service
 * @name vhEurope.utility.service
 * @description
 * # utility.service
 * Service in the vhEurope.
 */
angular.module('vhEurope')
  .factory('utilityService', utilityService);

  utilityService.$inject =[];

  function utilityService() {
    return {
        self: this,
        origin: "",
        destination: "",
        departure: "",
        returns: "",
        passengers: "",
        getData: getData,
        setData: setData
    }
    var origin = ""
    function getData(){
        return {
            origin:self.origin,
            destination:self.destination,
            departure:self.departure,
            returns:self.returns,
            passengers:self.passengers
        }
    }

    function setData(origin, destination, departure, returns){
        self.origin = origin;
        self.destination = destination;
        self.departure = departure;
        self.returns = returns;
        self.passengers = "1";
    }

  }
