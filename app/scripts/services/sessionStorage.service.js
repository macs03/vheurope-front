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
            getUrl : getUrl
        }

        function setUrl(url) {
            localStorageService.set('url',url);
        }

        function getUrl() {
            return localStorageService.get('url')
        }

      }
})();
