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
        countryOrigin:"",
        destination: "",
        countryDestination:"",
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
            countryOrigin: self.countryOrigin,
            destination:self.destination,
            countryDestination: self.countryDestination,
            departure:self.departure,
            returns:self.returns,
            passengers:self.passengers
        }
    }

    function setData(origin, countryOrigin, destination, countryDestination, departure, returns){
        self.origin = origin;
        self.countryOrigin = countryOrigin,
        self.destination = destination,
        self.countryDestination = countryDestination,
        self.departure = departure;
        self.returns = returns;
        self.passengers = "1";
    }

  }
