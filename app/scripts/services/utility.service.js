(function() {
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

    utilityService.$inject = ['$translate', '$location'];

    function utilityService($translate, $location) {
        return {
            self: this,
            origin: "",
            originCountryCode: "",
            countryOrigin: "",
            destination: "",
            destinationCountryCode: "",
            countryDestination: "",
            departure: "",
            returns: "",
            passengers: "",
            passengersAdult: "",
            passengersChild: "",
            passengersBaby: "",
            getData: getData,
            setData: setData,
            setPaymentData: setPaymentData,
            getPaymentData: getPaymentData,
            objDeparture: {},
            objReturn: {},
            idIda: "",
            idVuelta: "",
            totalPayment: "",
            setSuccessData: setSuccessData,
            getSuccessData: getSuccessData,
            customer: "",
            customerEmail: "",
            providerName: "",
            purchaseId: "",
            total: "",
            objDepartureSuccess: {},
            objReturnSuccess: {},
            setPayer: setPayer,
            getPayer: getPayer,
            payer: {},
            setSearch: setSearch,
            getSearch: getSearch,
            url: "",
            lang: "es",
            setLang: setLang,
            getLang: getLang,
            getCountry: getCountry
        }
        var origin = ""

        function getData() {
            return {
                origin: self.origin,
                countryOrigin: self.countryOrigin,
                destination: self.destination,
                countryDestination: self.countryDestination,
                departure: self.departure,
                returns: self.returns,
                passengers: self.passengers,
                originCountryCode: self.originCountryCode,
                destinationCountryCode: self.destinationCountryCode,
                passengersAdult: self.passengersAdult,
                passengersChild: self.passengersChild,
                passengersBaby: self.passengersBaby
            }
        }

        function setData(origin, countryOrigin, destination, countryDestination, departure, returns, passengers, originCountry, destinationCountry, passengersAdult, passengersChild, passengersBaby) {
            self.origin = origin;
            self.countryOrigin = countryOrigin,
                self.destination = destination,
                self.countryDestination = countryDestination,
                self.departure = departure;
            self.returns = returns;
            self.passengers = passengers;
            self.originCountryCode = originCountry;
            self.destinationCountryCode = destinationCountry;
            self.passengersAdult = passengersAdult;
            self.passengersChild = passengersChild;
            self.passengersBaby = passengersBaby;
        }

        function setPaymentData(idIda, idVuelta, totalWithDiscount, totalFee, totalPayment, departure, returns) {
            self.idIda = idIda;
            self.idVuelta = idVuelta;
            self.totalWithDiscount = totalWithDiscount;
            self.totalFee = totalFee;
            self.totalPayment = totalPayment
            self.objDeparture = departure;
            self.objReturn = returns;
        }

        function getPaymentData() {
            return {
                idIda: self.idIda,
                idVuelta: self.idVuelta,
                totalWithDiscount: self.totalWithDiscount,
                totalFee: self.totalFee,
                totalPayment: self.totalPayment,
                departure: self.objDeparture,
                returns: self.objReturn
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
                customer: self.customer,
                customerEmail: self.customerEmail,
                providerName: self.providerName,
                purchaseId: self.purchaseId,
                total: self.total,
                departure: self.objDepartureSuccess,
                returns: self.objReturnSuccess
            }
        }

        function setPayer(payer) {
            self.payer = payer;
        }

        function getPayer() {
            return {
                payer: self.payer
            }
        }

        function setSearch(url) {
            self.url = url;
        }

        function getSearch() {
            return {
                url: self.url
            }
        }

        function setLang(lang) {
            self.lang = lang;
        }

        function getLang() {
            return self.lang
        }

        function getCountry() {
            var path = $location.absUrl();
            //var path = 'www.resertrip.fr/#/';
            //var path = 'www.resertrip.es/#/';
            //var path = 'www.resertrip.com/#/';
            var lang = 'es';

            var split1 = path.split('/');
            var split2 = split1[0].split('.')
            var location = split2[2];

            if (location == 'fr') {
                $translate.use('fr');
                lang = 'fr';
            } else if (location == 'es') {
                $translate.use('es');
                lang = 'es';
            } else {
                $translate.use('es');
                lang = 'es';
            }
            return lang
        }

    }
})();