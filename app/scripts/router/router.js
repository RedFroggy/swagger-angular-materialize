'use strict';

/**
 * @ngdoc function
 * @name fr.redfroggy.swaggerApi.app.router
 * @description
 * Configuration of the fr.redfroggy.swaggerApi.app.router module
 */
angular.module('fr.redfroggy.swaggerApi.app.router').config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider){
    $urlRouterProvider.otherwise('/api/home');

    $stateProvider
        .state('api', {
            url: '/api',
            abstract:true,
            templateUrl: 'views/api.html',
            controller:'AbstractApiCtrl',
            resolve:{
                apiInfo:['SwaggerApi',function(SwaggerApi){
                    return SwaggerApi.get();
                }]
            }
        })
        .state('home', {
            url: '/home',
            parent:'api',
            templateUrl: 'views/home.html'
        })
        .state('api.list', {
            url: '/list',
            parent:'api',
            templateUrl: 'views/api/api-list.html',
            controller:['$scope','$state','apiInfo',function($scope,$state,apiInfo){

                //By default, load first api detail
                $state.go('api.detail',{index:1});

                apiInfo.$promise.then(function() {
                    $scope.apiInfo = $scope.apiDoc.apis[0];
                });



                /**
                 * On click api event
                 * @param event click event
                 * @param api api
                 */
                $scope.onSelectApi = function(event,api,index){
                    $scope.apiInfo = api;
                    $state.go('api.detail',{index:index+1});
                    $('li.collection-item').removeClass('active red darken-4');
                    $(event.currentTarget).parents('li').addClass('active red darken-4');
                };
            }]
        })
        .state('api.detail', {
            url: '/detail/{index}',
            parent:'api.list',
            templateUrl: 'views/api/api-detail.html',
            controller:'ApiDetailCtrl'
        })
        .state('api.resource', {
            url: '/detail/{parentIndex}/resource/{index}',
            parent:'api.list',
            templateUrl: 'views/resource/resource-detail.html',
            controller:'ResourceDetailCtrl'
        });
}]);