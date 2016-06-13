//http://localhost:8080/vheurope-api/v1/
//http://api.resertrip.com/v1/
//http://sandbox.api.resertrip.com/v1/
(function () {
    'use strict';
    angular.module('constants', [])
    .constant('apiUrl', 'https://api.resertrip.com/v1/')
    .constant('apiRtUrl', 'https://api-rt.resertrip.com/');
})();
