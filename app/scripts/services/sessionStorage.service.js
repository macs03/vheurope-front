(function () {
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

      sessionStorageService.$inject =['localStorageService'];

      function sessionStorageService(localStorageService) {
        return {
            setUrl : setUrl,
            getUrl : getUrl,
            setPayment : setPayment,
            getPayment : getPayment,
            setPayer : setPayer,
            getPayer : getPayer
        }

        function setUrl(url) {
            localStorageService.set('url',url);
        }

        function getUrl() {
            return localStorageService.get('url')
        }

        function setPayment(idIda,idVuelta,totalPrice, totalFee, totalPayment, departure,returns) {
            var payment = {
                idDeparture : idIda,
                idReturn: idVuelta,
                totalPrice : totalPrice,
                totalFee : totalFee,
                totalPayment : totalPayment,
                departure : departure,
                returns : returns
            };
            localStorageService.set('payment',JSON.stringify(payment));
        }

        function getPayment() {
            var data = JSON.parse(localStorageService.get("payment"));
            return data;
        }

        function setPayer(payer) {
            localStorageService.set('payer',JSON.stringify(payer));
        }

        function getPayer() {
            var data = JSON.parse(localStorageService.get("payer"));
            return data;
        }

      }
})();
