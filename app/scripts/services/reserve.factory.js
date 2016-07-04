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

        function getAll (passengersDataDeparture, passengersDataDeparture2, passengersDataReturn, passengersDataReturn2, departureId, returnId, hasBoat) {
            var defered = $q.defer();
            var promise = defered.promise;
            if (returnId != "-1") {
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
                    if (hasBoat) {
                        passengers.push({
                            email : passengersDataDeparture[key].email,
                            documentIdentifier : passengersDataDeparture[key].dni,
                            name : passengersDataDeparture[key].name,
                            surname : passengersDataDeparture[key].lastname,
                            gender : passengersDataDeparture[key].genders,
                            ageCategory : passengersDataDeparture[key].ages,
                            birthDate : passengersDataDeparture[key].bornDate,
                            typeDocument : passengersDataDeparture[key].docTypes,
                            phoneContact : passengersDataDeparture[key].phone,
                            nacionality : passengersDataDeparture[key].country,
                            docExpirationDate : passengersDataDeparture[key].docExpirationDate
                        });
                    }else{
                        passengers.push({
                            email : passengersDataDeparture[key].email,
                            documentId : passengersDataDeparture[key].dni,
                            name : passengersDataDeparture[key].name,
                            surname : passengersDataDeparture[key].lastname,
                            documentType : passengersDataDeparture[key].document,
                            nationality : passengersDataDeparture[key].country,
                            phoneContact : passengersDataDeparture[key].phone,
                            birthDate : passengersDataDeparture[key].bornDate,
                            gender : passengersDataDeparture[key].genders
                        });
                    }
                });
                seatsDeparture.push(seatsListDeparture.join("~"));
                seatsReturn.push(seatsListReturn.join("~"));
                var idReturn = returnId;
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
                    if (hasBoat) {
                        passengers.push({
                            email : passengersDataDeparture[key].email,
                            documentIdentifier : passengersDataDeparture[key].dni,
                            name : passengersDataDeparture[key].name,
                            surname : passengersDataDeparture[key].lastname,
                            gender : passengersDataDeparture[key].genders,
                            ageCategory : passengersDataDeparture[key].ages,
                            birthDate : passengersDataDeparture[key].bornDate,
                            typeDocument : passengersDataDeparture[key].docTypes,
                            phoneContact : passengersDataDeparture[key].phone,
                            nacionality : passengersDataDeparture[key].country,
                            docExpirationDate : passengersDataDeparture[key].docExpirationDate
                        });
                    }else {
                        passengers.push({
                            email : passengersDataDeparture[key].email,
                            documentId : passengersDataDeparture[key].dni,
                            name : passengersDataDeparture[key].name,
                            surname : passengersDataDeparture[key].lastname,
                            documentType : passengersDataDeparture[key].document,
                            nationality : passengersDataDeparture[key].country,
                            phoneContact : passengersDataDeparture[key].phone,
                            birthDate : passengersDataDeparture[key].bornDate,
                            gender : passengersDataDeparture[key].genders
                        });
                    }
                });
                seatsDeparture.push(seatsList.join("~"));
                var seatsReturn = "";
                var idReturn = "";
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
                    },
                    skipAuthorization: true
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
