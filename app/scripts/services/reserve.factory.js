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

        function getAll (passengersDataDeparture, passengersDataDeparture2, passengersDataReturn, passengersDataReturn2, departureId, returnId) {
            var defered = $q.defer();
            var promise = defered.promise;
            console.log(departureId+" "+returnId);
            if (returnId != "-1") {
                console.log("return");
                var seatsListDeparture = []
                var seatsListReturn = []
                var seatsDeparture = []
                var seatsReturn = []
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
                seatsDeparture.push(seatsListDeparture.join("~"));
                seatsReturn.push(seatsListReturn.join("~"));
                var idReturn = returnId;
                console.log(passengers);
                if (passengersDataReturn2.length > 0) {
                    var seatsListDeparture = []
                    var seatsListReturn = []
                    angular.forEach(passengersDataReturn2, function(value,key) {
                        seatsListReturn.push(passengersDataReturn2[key].seatNumber);
                    });
                    angular.forEach(passengersDataDeparture2, function(value,key) {
                        seatsListDeparture.push(passengersDataDeparture2[key].seatNumber);
                    });
                    seatsDeparture.push(seatsListDeparture.join("~"));
                    seatsReturn.push(seatsListReturn.join("~"));
                    var idReturn = returnId;
                }
            }else{
                var seatsList = []
                var passengers = []
                var seatsDeparture = []
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
                seatsDeparture.push(seatsList.join("~"));
                var seatsReturn = "";
                var idReturn = "";
                console.log(passengers);
                if (passengersDataDeparture2.length > 0) {
                    var seatsList = [];
                    angular.forEach(passengersDataDeparture2, function(value,key) {
                        seatsList.push(passengersDataDeparture2[key].seatNumber);
                    });
                    seatsDeparture.push(seatsList.join("~"));
                    var seatsReturn = "";
                    var idReturn = "";
                }
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
