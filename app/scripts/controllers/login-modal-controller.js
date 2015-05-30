'use strict';

/**
 * @ngdoc function
 * @name fr.redfroggy.swaggerApi.app.controllers:LoginModalController
 * @description
 * # LoginModalController
 * Controller of the fr.redfroggy.swaggerApi.app.controllers
 */
angular.module('fr.redfroggy.swaggerApi.app.controllers').controller('LoginModalController', ['$scope','Authentication',function ($scope,Authentication) {
    /**
     * On click login event
     * @param login login
     * @param password password
     */
    $scope.onClickLogin = function(login,password){
        if($scope.loginForm.$valid){

            //Http login
            Authentication.login(login,password).then(function(){
                $scope.alert.title = 'Successful authentication';
                $scope.alert.message = 'User '+login+' is now authenticated';
                $scope.alert.isError = false;
                $('#alertModal').openModal();
            },function(error){
                $scope.alert.title = 'Authentication failed';
                $scope.alert.isError = true;
                $scope.alert.message = 'User '+login+' could not be authenticated: '+error.detail;
                $('#alertModal').openModal();
            });
        }
    };
}]);