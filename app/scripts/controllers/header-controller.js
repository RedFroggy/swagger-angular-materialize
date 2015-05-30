'use strict';

/**
 * @ngdoc function
 * @name fr.redfroggy.swaggerApi.app.controllers:HeaderController
 * @description
 * # HeaderController
 * Controller of the fr.redfroggy.swaggerApi.app.controllers
 */
angular.module('fr.redfroggy.swaggerApi.app.controllers').controller('HeaderController', ['$scope','Authentication',function ($scope,Authentication) {

    //Initialization
    $scope.alert = {};

    /**
     * Show login modal event
     */
    $scope.showLoginModal = function(){
        $('#loginModal').openModal();
    };

    /**
     * On click logout event
     */
    $scope.onClickLogout = function(){
        Authentication.logout();
        $scope.alert.title = 'Logout';
        $scope.alert.message = 'You were successfully logged out';
        $('#alertModal').openModal();
    };
}]);

