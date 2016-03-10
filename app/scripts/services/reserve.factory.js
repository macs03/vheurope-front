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

      reserveFactory.$inject =['$http','$q'];

      function reserveFactory($http,$q) {
        return {
            getAll: getAll
        }

        function getAll (passengersData, departureId, returnId) {
            var defered = $q.defer();
            var promise = defered.promise;
            console.log(departureId+" "+returnId);
            if (returnId != "-1") {
                console.log("hay vuelta");
            }else{
                var seatsList = []
                var passengers = []
                angular.forEach(passengersData, function(value,key) {
                    seatsList.push(passengersData[key].seatNumber);
                    passengers.push({
                        email : passengersData[key].email,
                        documentId : passengersData[key].dni,
                        name : passengersData[key].name,
                        surname : passengersData[key].lastname,
                        documentType : passengersData[key].document
                    });
                });
                var seatsDeparture = seatsList.join("~")
                var seatsReturn = "";
                var idReturn = "";
                console.log(passengers);
            }

            $http({
                    method:'POST',
                    url:'http://localhost:8080/vheurope-api/v1/reserves',
                    //url:'http://vheurope.cfapps.io/v1/reserves',
                    data: {
                        idIda : departureId,
                        seatsIda : seatsDeparture,
                        idVuelta : seatsReturn,
                        seatsVuelta : idReturn,
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
