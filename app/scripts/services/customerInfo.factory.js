(function() {
    'use strict';

    /**
     * @ngdoc service
     * @name vhEurope.customerInfo.factory
     * @description
     * # customerInfo.factory
     * Service in the vhEurope.
     */
    angular.module('vhEurope')
        .factory('customerInfoFactory', customerInfoFactory);

    customerInfoFactory.$inject = ['$http', '$q', 'apiUrl'];

    function customerInfoFactory($http, $q, apiUrl) {
        return {
            getAll: getAll,
            putNewData: putNewData,
            postNewPassword: postNewPassword,
            postNewAvatar: postNewAvatar,
            deleteUser: deleteUser,
            getCustomerPurchases: getCustomerPurchases,
            resetPassword: resetPassword
        }
        var aux = null;
        var flag = false;

        function getAll(token) {
            var defered = $q.defer();
            var promise = defered.promise;
            if (token != aux) {
                flag = false;
                aux = token;
            } else {
                flag = true;
            }
            $http({
                    //cache: flag,
                    method: 'GET',
                    url: apiUrl + 'customer'
                })
                .success(function(data) {
                    defered.resolve(data);
                })
                .error(function(err) {
                    defered.reject(err);
                });

            return promise;
        }

        function putNewData(firstName, lastName, dni, email, address, birthday, phone, contactName, contactEmail, contactPhoneNumber) {
            var defered = $q.defer();
            var promise = defered.promise;
            $http({
                    //cache: flag,
                    method: 'PUT',
                    url: apiUrl + 'customer',
                    data: {
                        firstName: firstName,
                        lastName: lastName,
                        address: address,
                        email: email,
                        contactName: contactName,
                        contactEmail: contactEmail,
                        contactPhoneNumber: contactPhoneNumber,
                        birthday: birthday,
                        phoneNumber: phone,
                        identificationNumber: dni
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

        function postNewPassword(oldPassword, newPassword, newPasswordRepeat) {
            var defered = $q.defer();
            var promise = defered.promise;
            $http({
                    //cache: flag,
                    method: 'POST',
                    url: apiUrl + 'customer/password',
                    data: {
                        oldPassword: oldPassword,
                        newPassword: newPassword,
                        newPasswordRepeat: newPasswordRepeat
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

        function postNewAvatar(avatar) {
            var defered = $q.defer();
            var promise = defered.promise;
            $http({
                    //cache: flag,
                    method: 'POST',
                    url: apiUrl + 'customer/avatar',
                    data: {
                        data: avatar
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

        function deleteUser(token) {
            var defered = $q.defer();
            var promise = defered.promise;
            $http({
                    method: 'DELETE',
                    url: apiUrl + 'customer/user'
                })
                .success(function(data) {
                    defered.resolve(data);
                })
                .error(function(err) {
                    defered.reject(err);
                });

            return promise;
        }

        function getCustomerPurchases(token) {
            var defered = $q.defer();
            var promise = defered.promise;
            $http({
                    method: 'GET',
                    url: apiUrl + 'customer/trips'
                })
                .success(function(data) {
                    defered.resolve(data);
                })
                .error(function(err) {
                    defered.reject(err);
                });

            return promise;
        }

        function resetPassword(email) {
            var defered = $q.defer();
            var promise = defered.promise;

            $http({
                    //cache: flag,
                    method: 'PUT',
                    url: apiUrl + 'resetPassword',
                    data: {
                        email: email
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
