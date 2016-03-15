(function () {
    'use strict';

    /**
     * @ngdoc service
     * @name vhEurope.reserve.factory
     * @description
     * # reserve.factory
     * Service in the vhEurope.
     */
    angular.module('vhEurope')
      .factory('reserveFactory', reserveFactory);

      reserveFactory.$inject =['$http','$q','apiUrl'];

      function reserveFactory($http,$q,apiUrl) {
        return {
            getAll: getAll
        }

        function getAll (passengersDataDeparture, passengersDataReturn, departureId, returnId) {
            var defered = $q.defer();
            var promise = defered.promise;
            console.log(departureId+" "+returnId);
            if (returnId != "-1") {
                console.log("return");
                var seatsListDeparture = []
                var seatsListReturn = []
                var passengers = []
                angular.forEach(passengersDataReturn, function(value,key) {
                    seatsListReturn.push(passengersDataReturn[key].seatNumber);
                });
                angular.forEach(passengersDataDeparture, function(value,key) {
                    seatsListDeparture.push(passengersDataDeparture[key].seatNumber);
                    passengers.push({
                        email : passengersDataDeparture[key].email,
                        documentId : passengersDataDeparture[key].dni,
                        name : passengersDataDeparture[key].name,
                        surname : passengersDataDeparture[key].lastname,
                        documentType : passengersDataDeparture[key].document
                    });
                });
                var seatsDeparture = seatsListDeparture.join("~");
                var seatsReturn = seatsListReturn.join("~");
                var idReturn = returnId;
                console.log(passengers);
            }else{
                var seatsList = []
                var passengers = []
                angular.forEach(passengersDataDeparture, function(value,key) {
                    seatsList.push(passengersDataDeparture[key].seatNumber);
                    passengers.push({
                        email : passengersDataDeparture[key].email,
                        documentId : passengersDataDeparture[key].dni,
                        name : passengersDataDeparture[key].name,
                        surname : passengersDataDeparture[key].lastname,
                        documentType : passengersDataDeparture[key].document
                    });
                });
                var seatsDeparture = seatsList.join("~")
                var seatsReturn = "";
                var idReturn = "";
                console.log(passengers);
            }

            $http({
                    method:'POST',
                    url: apiUrl + 'reserves',
                    data: {
                        idIda : departureId,
                        seatsIda : seatsDeparture,
                        idVuelta : idReturn,
                        seatsVuelta : seatsReturn,
                        passengers : passengers
                    }
                })
                .success(function(data) {
                    defered.resolve(data);
                })
                .error(function(err) {
                    defered.reject(err);
                });

            return promise;
        }
      }
})();
