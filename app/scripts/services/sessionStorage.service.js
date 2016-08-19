(function() {
    'use strict';

    /**
     * @ngdoc service
     * @name vhEurope.sessionStorage.service
     * @description
     * # sessionStorage.service
     * Service in the vhEurope.
     */
    angular.module('vhEurope')
        .factory('sessionStorageService', sessionStorageService);

    sessionStorageService.$inject = ['localStorageService'];

    function sessionStorageService(localStorageService) {
        return {
            setUrl: setUrl,
            getUrl: getUrl,
            setPayment: setPayment,
            getPayment: getPayment,
            setPayer: setPayer,
            getPayer: getPayer,
            setSuccessData: setSuccessData,
            getSuccessData: getSuccessData,
            setLocations: setLocations,
            getLocations: getLocations,
            setFlag: setFlag,
            getFlag: getFlag,
            setPassengers: setPassengers,
            getPassengers: getPassengers,
            setIdForPlanes: setIdForPlanes,
            getIdForPlanes: getIdForPlanes,
            setLanguage: setLanguage,
            getLanguage: getLanguage
        }

        function setUrl(url) {
            localStorageService.set('url', url);
        }

        function getUrl() {
            return localStorageService.get('url')
        }

        function setPayment(idIda, idVuelta, totalPrice, totalFee, totalPayment, departure, returns) {
            var payment = {
                idDeparture: idIda,
                idReturn: idVuelta,
                totalPrice: totalPrice,
                totalFee: totalFee,
                totalPayment: totalPayment,
                departure: departure,
                returns: returns
            };
            localStorageService.set('payment', JSON.stringify(payment));
        }

        function getPayment() {
            var data = JSON.parse(localStorageService.get("payment"));
            return data;
        }

        function setPayer(payer) {
            localStorageService.set('payer', JSON.stringify(payer));
        }

        function getPayer() {
            var data = JSON.parse(localStorageService.get("payer"));
            return data;
        }

        function setSuccessData(customer, customerEmail, providerName, purchaseId, total, departureData, returnData, totalFee) {
            var success = {
                customer: customer,
                customerEmail: customerEmail,
                providerName: providerName,
                purchaseId: purchaseId,
                total: total,
                departureData: departureData,
                returnData: returnData,
                totalFee: totalFee
            };
            localStorageService.set('success', JSON.stringify(success));
        }

        function getSuccessData() {
            var data = JSON.parse(localStorageService.get('success'));
            return data;
        }

        function setLocations(locations) {
            localStorageService.set('locations', JSON.stringify(locations));
        }

        function getLocations() {
            var data = JSON.parse(localStorageService.get("locations"));
            return data;
        }

        function setFlag(flag) {
            localStorageService.set('flag', JSON.stringify(flag));
        }

        function getFlag() {
            var data = JSON.parse(localStorageService.get("flag"));
            return data;
        }

        function setPassengers(adults, children, babies) {
            var passengers = {
                passengersAdult: adults,
                passengersChild: children,
                passengersBaby: babies
            }
            localStorageService.set('passengers', JSON.stringify(passengers));
        }

        function getPassengers() {
            var data = JSON.parse(localStorageService.get("passengers"));
            return data;
        }

        function setIdForPlanes(origin, destination) {
            var destinies = {
                origin: origin,
                destination: destination
            }
            localStorageService.set('destinies', JSON.stringify(destinies));
        }

        function getIdForPlanes() {
            var data = JSON.parse(localStorageService.get("destinies"));
            return data;
        }

        function setLanguage(language) {
            localStorageService.set('lang', JSON.stringify(language));
        }

        function getLanguage() {
            var data = JSON.parse(localStorageService.get("lang"));
            return data;
        }

    }
})();