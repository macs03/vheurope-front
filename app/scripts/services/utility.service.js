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
        self:this,
        origin:"",
        destiny:"",
        departure:"",
        returns:"",
        passengers: "",
        getData: getData,
        setData: setData
    }
    var origin = ""
    function getData(){
        return {
            origin:self.origin,
            destiny:self.destiny,
            departure:self.departure,
            returns:self.returns,
            passengers:self.passengers
        }
    }

    function setData(origin,destiny,departure,returns){
        self.origin = origin;
        self.destiny = destiny;
        self.departure = "05/03/2016"//departure;
        self.returns = returns;
        self.passengers = "1";
    }

  }
