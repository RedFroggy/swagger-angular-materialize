'use strict';

/**
 * @ngdoc function
 * @name fr.redfroggy.swaggerApi.app.controllers:ApiDetailCtrl
 * @description
 * # ApiDetailCtrl
 * Controller of the fr.redfroggy.swaggerApi.app.controllers module
 */
angular.module('fr.redfroggy.swaggerApi.app.controllers').controller('ApiDetailCtrl', ['$scope','$stateParams','SwaggerApi','localStorageService','$filter','apiInfo',function ($scope,$stateParams,SwaggerApi,localStorageService,$filter,apiInfo) {

    $scope.parentIndex  = $stateParams.index;

    /**
     * When the apiInfo promise is resolved
     */
    apiInfo.$promise.then(function() {
        //Get api detail: list of resources
        if($scope.apiInfo) {
            SwaggerApi.detail($scope.apiInfo.path).success(function (api) {
                $scope.detailApi = api;

                //Attach current api detail to parent scope
                if ($scope.$parent) {
                    $scope.$parent.selectedApi = api;

                    //Add index number to each resource
                    angular.forEach(api.apis, function (apiDetail, index) {
                        apiDetail.index = index;
                    });
                }
            });
        }
    });

    /**
     * On click parameter type event
     * Find type by name and show modal
     * @param type parameter type
     */
    $scope.onClickParameterType = function(type){
        $scope.dto = $scope.selectedApi.models[type];
        $('#typeObjectModal').openModal(); //ignore jshint
    };

    /**
     * Check if the current resource has statistics information
     * in local storage
     * @param index resource index
     * @return {boolean}
     */
    $scope.hasStats = function(index){
        return localStorageService.get('api'+$scope.parentIndex+'resource'+index) !== null;
    };

    /**
     * Get colors array according to http method
     * Used to shw chart color according to http method
     * @param method http method (GET,POST,PUT,DELETE,PATCH,HEAD)
     * @return {string[]}
     */
    $scope.getColorFromHttpMethod = function(method){
        if(method === 'GET'){
            return ['#e0e0e0'];
        }
        if(method === 'POST'){
            return ['#4db6ac'];
        }
        if(method === 'PUT'){
            return ['#fff176'];
        }
        if(method === 'PATCH'){
            return ['#4fc3f7'];
        }
        if(method === 'HEAD'){
            return ['#f06292'];
        }
        if(method === 'DELETE'){
            return ['#E57373'];
        }
    };

    /**
     * Create api chart data
     * - labels
     * - options
     * - series
     * - values
     * @param api current api
     */
    $scope.createApiChartData = function(api,apiStorage){
        var stats = [];
        $scope.labels = [];

        $scope.colors = $scope.getColorFromHttpMethod(api.operations[0].method);

        $scope.options = {scaleLabel: '<%=value %> (ms)',responsive:true,tooltipTemplate:'<%=value %> ms'};
        $scope.series = ['<strong>'+$scope.apiInfo.description+' '+api.operations[0].method+' '+api.description+'</strong><br/><a href="">'+$scope.detailApi.resourcePath+'</a>'];

        angular.forEach(apiStorage,function(apiInfo){
            if(apiInfo.time) {
                $scope.labels.push($filter('date')(apiInfo.date, 'medium'));
                stats.push(apiInfo.time);
            }
        });

        $scope.stats = [stats];
    };

    /**
     * On click stat button event
     * @param api current api
     */
    $scope.onClickStatBtn = function(api){
        //Get api stats from local storage
        var apiStorage = localStorageService.get('api'+$scope.parentIndex+'resource'+api.index);

        if(apiStorage){
            $scope.createApiChartData(api,apiStorage);
            $('#chartModal').openModal();
        }
    };

    /**
     * Check if the current type is a DTO type (wrapper object)
     * @param type type to check
     * @return {boolean}
     */
    $scope.isDtoType = function(type){
        return $scope.selectedApi.models[type] !== undefined && type !== 'object' && type !== 'array' && type !== 'string';
    };

    /**
     * Generic method to close a modal
     * @param modalName
     */
    $scope.onCloseModal = function(modalName){
        $('#'+modalName).closeModal();
    };
}]);

