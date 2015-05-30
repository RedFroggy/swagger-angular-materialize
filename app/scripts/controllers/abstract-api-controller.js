'use strict';

/**
 * @ngdoc function
 * @name fr.redfroggy.swaggerApi.app.controllers:AbstractApiCtrl
 * @description
 * # AbstractApiCtrl
 * Controller of the fr.redfroggy.swaggerApi.app.controllers module
 */
angular.module('fr.redfroggy.swaggerApi.app.controllers').controller('AbstractApiCtrl', ['$scope','$state','apiInfo',function ($scope,$state,apiInfo) {

    //By default, go to home page
   $state.go('home');

    //Get ai info promise
   $scope.apiDoc = apiInfo;
}]);
