(function() {
    'use strict';

    /**
     * @ngdoc function
     * @name vhEurope.controller:CustomerProfileController
     * @description
     * # CustomerProfileController
     * Controller of the vhEurope
     */
    angular
        .module('vhEurope')
        .controller('CustomerProfileController', CustomerProfileController);

    CustomerProfileController.$inject = ['$scope', '$location', 'customerInfoFactory', '$rootScope'];

    function CustomerProfileController($scope, $location, customerInfoFactory, $rootScope) {
        var vm = this;
        vm.callCustomerInfo = callCustomerInfo;
        vm.customerData = null;
        var token = localStorage.getItem("resertrip_token");
        if (token == null) {
            $location.path("/login")
        } else {
            callCustomerInfo();
        }

        function callCustomerInfo() {
            customerInfoFactory
                .getAll(token)
                .then(function(data) {
                    vm.customerData = data;
                    var name = data.fullName.split(",");
                    var initials;
                    if (name[1] != undefined) {
                        initials = name[1].charAt(1)+name[0].charAt(0)
                    }else{
                        initials = name[0].charAt(0)
                    }
                    var avatar = data.avatar;
                    $rootScope.$broadcast('initialEvent', initials);
                    $rootScope.$broadcast('avatarEvent', avatar);
                    if (avatar != null) {
                        vm.avatarFlag = true;
                    }else{
                        vm.avatarFlag = false
                    }
                })
                .catch(function(err) {
                    console.log(err);
                })
        }

    }

})();
