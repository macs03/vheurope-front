(function () {
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
            setData: setData,
            setPaymentData: setPaymentData,
            getPaymentData : getPaymentData,
            objDeparture : {},
            objReturn: {},
            idIda : "",
            idVuelta: "",
            totalPayment : "",
            setSuccessData : setSuccessData,
            getSuccessData : getSuccessData,
            customer : "",
            customerEmail : "",
            providerName : "",
            purchaseId : "",
            total : "",
            objDepartureSuccess: {},
            objReturnSuccess: {}
        }
        var origin = ""
        function getData(){
            return {
                origin: self.origin,
                countryOrigin: self.countryOrigin,
                destination: self.destination,
                countryDestination: self.countryDestination,
                departure: self.departure,
                returns: self.returns,
                passengers: self.passengers
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
           // localStorage.setItem("origin", origin);
           // localStorage.setItem("countryOrigin", countryOrigin);
           // localStorage.setItem("destination", destination);
           // localStorage.setItem("countryDestination", countryDestination);
           // localStorage.setItem("departure", departure);
           // localStorage.setItem("returns", returns);
           // localStorage.setItem("passengers", "1");

        }

        function setPaymentData(idIda,idVuelta,totalPayment,departure, returns) {
            self.idIda = idIda;
            self.idVuelta = idVuelta;
            self.totalPayment = totalPayment
            self.objDeparture = departure;
            self.objReturn = returns;
        }

        function getPaymentData(){
            return {
                idIda : self.idIda,
                idVuelta: self.idVuelta,
                totalPayment : self.totalPayment,
                departure : self.objDeparture,
                returns : self.objReturn
            }
        }

        function setSuccessData(customer, customerEmail, providerName, purchaseId, total, departure, returns) {
            self.customer = customer;
            self.customerEmail = customerEmail;
            self.providerName = providerName;
            self.purchaseId = purchaseId;
            self.total = total;
            self.objDepartureSuccess = departure;
            self.objReturnSuccess = returns;
        }

        function getSuccessData() {
            return {
                customer : self.customer,
                customerEmail: self.customerEmail,
                providerName: self.providerName,
                purchaseId: self.purchaseId,
                total: self.total,
                departure: self.objDepartureSuccess,
                returns : self.objReturnSuccess
            }
        }

      }
})();
