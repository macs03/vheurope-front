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

    CustomerProfileController.$inject = ['$scope', '$location', 'customerInfoFactory', '$rootScope', '$auth'];

    function CustomerProfileController($scope, $location, customerInfoFactory, $rootScope, $auth) {
        var vm = this;

        var searchView = true;
        $rootScope.$broadcast('viewEvent', searchView);

        vm.callCustomerInfo = callCustomerInfo;
        vm.customerData = null;
        vm.loadImage = false;
        vm.updateAvatar = updateAvatar;
        vm.error = false;
        vm.uploading = false;
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
                        initials = name[1].charAt(1) + name[0].charAt(0)
                    } else {
                        initials = name[0].charAt(0)
                    }
                    var avatar = data.avatar;
                    $rootScope.$broadcast('initialEvent', initials);
                    $rootScope.$broadcast('avatarEvent', avatar);
                    if (avatar != null) {
                        vm.avatarFlag = true;
                    } else {
                        vm.avatarFlag = false
                    }
                })
                .catch(function(err) {
                    if (err == 401) {
                        $auth.logout()
                            .then(function() {
                                // Desconectamos al usuario y lo redirijimos
                                var token = localStorage.getItem("resertrip_token");
                                $rootScope.$broadcast('tokenEvent', token);
                                $location.path("/login")
                            });
                    }
                })
        }

        $scope.myImage = '';
        $scope.myCroppedImage = '';

        var handleFileSelect = function(evt) {
            var file = evt.currentTarget.files[0];
            var reader = new FileReader();
            reader.onload = function(evt) {
                $scope.$apply(function($scope) {
                    vm.loadImage = true;
                    $scope.myImage = evt.target.result;
                });
            };
            reader.readAsDataURL(file);
        };
        angular.element(document.querySelector('#fileInput')).on('change', handleFileSelect);

        function updateAvatar() {
            vm.uploading = true;
            vm.loadImage = false;
            customerInfoFactory
                .postNewAvatar($scope.myCroppedImage)
                .then(function(data) {
                    callCustomerInfo();
                    $('#crop-img').modal('hide');
                    vm.uploading = false;
                })
                .catch(function(err) {
                    vm.error = true;
                    vm.uploading = false;
                })
        }

    }

})();