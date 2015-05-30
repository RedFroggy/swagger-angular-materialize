'use strict';

/**
 * @ngdoc function
 * @name fr.redfroggy.swaggerApi.app.controllers:ResourceDetailCtrl
 * @description
 * # ResourceDetailCtrl
 * Controller of the fr.redfroggy.swaggerApi.app.controllers module
 */
angular.module('fr.redfroggy.swaggerApi.app.controllers').controller('ResourceDetailCtrl', ['$scope','$stateParams','$http','Config','localStorageService',function ($scope,$stateParams,$http,Config,localStorageService) {

    //Initialization
    $scope.data = {};
    if(!$scope.data.patchJson){
        $scope.data.patchJson = '';
    }

    //If an api have been selected
    if($scope.selectedApi) {
        $scope.apiDetail = $scope.selectedApi.apis[$stateParams.index];
        $scope.parentIndex = $stateParams.parentIndex;
        $scope.apiInfo = $scope.apiDoc.apis[$scope.parentIndex-1];
    }

    /**
     * Construct request url
     * @param apiDetail current api detail
     * @param onlyParameters return only parameters query
     * @return {string} url
     */
    $scope.getRequestUrl = function(apiDetail,onlyParameters){
        if(apiDetail) {
            var url = !onlyParameters ? apiDetail.path : '';
            angular.forEach(apiDetail.operations[0].parameters, function (parameter) {
                if (parameter.value) {
                    if (parameter.paramType === 'path') {
                        url = url.replace('{' + parameter.name + '}', parameter.value);
                    } else if (parameter.paramType === 'query') {
                        url += url.indexOf('?') === -1 ? '?' + parameter.name + '=' + parameter.value : '&' + parameter.name + '=' + parameter.value;
                    }
                }
            });
            return url;
        }
    };

    /**
     * Generate JSON data for PUT,POST or PATH request
     * @param parameter current parameter info
     */
    $scope.generateJSON = function(parameter){

        var modelDTO;
        if($scope.apiDetail.operations[0].method === 'PATCH'){
            modelDTO = $scope.selectedApi.models[$scope.apiDetail.operations[0].items.type];
        } else{
            modelDTO = $scope.selectedApi.models[parameter.type];
        }
        if(modelDTO){
            var dataJson = {};
            angular.forEach(modelDTO.properties,function(property,name){
                if(property.type === 'string'){
                    dataJson[name] = '';
                } else if(property.type === 'boolean'){
                    dataJson[name] = false;
                } else if(property.type === 'integer'){
                    dataJson[name] = 1;
                } else if(property.type === 'array'){
                    dataJson[name] = [{id:''}];
                } else if(property.type === 'object'){
                    dataJson[name] = {id:''};
                }
            });
            if($scope.apiDetail.operations[0].method === 'POST' || $scope.apiDetail.operations[0].method === 'PATCH'){
                delete dataJson.id;
            }
            if($scope.apiDetail.operations[0].method !== 'PATCH'){
                parameter.dataJson = JSON.stringify(dataJson,null,4);
            } else{
                $scope.data.patchJson = JSON.stringify(dataJson,null,4);
            }

        }
    };

    /**
     * Click event of the 'try out' button
     * @param apiDetail current api detail
     */
    $scope.send= function(apiDetail){
        apiDetail.response = null;
        apiDetail.status = null;
        var operation = apiDetail.operations [0];
        var req = {
            method: operation.method,
            url: Config.server.baseUrl+$scope.getRequestUrl(apiDetail),
            headers: {
                'Content-Type': 'application/json'
            }
        };
        if(operation.method === 'POST' || operation.method === 'PUT'){
            req.data = operation.parameters[0].dataJson;
        } else if(operation.method === 'PATCH'){
            req.data = $scope.data.patchJson;
        }

        $http(req).success(function(data,status,headers,config){
            var endTime = new Date().getTime();
            apiDetail.message = JSON.stringify(data, null, 4);
            apiDetail.status = status;
            apiDetail.date = new Date();
            $('#bodyModal').openModal();

            var duration = endTime - config.startTime;
            if(duration && duration !== ''){
                var apiStorage = localStorageService.get('api'+$stateParams.parentIndex+'resource'+$stateParams.index);
                if(apiStorage){
                    apiStorage.push({date:new Date(),time:duration,url:$scope.getRequestUrl(apiDetail,true)});
                } else{
                    apiStorage = [{date:new Date(),time:duration,url:$scope.getRequestUrl(apiDetail,true)}];
                }
                localStorageService.set('api'+$stateParams.parentIndex+'resource'+$stateParams.index,apiStorage);
            }

        }).error(function(data){
            if(data){
                apiDetail.message = data.detail;
                apiDetail.date = new Date(data.time);
                apiDetail.status = data.statusCode;
            } else{
                apiDetail.date = new Date();
            }
            $('#bodyModal').openModal();
        });
    };
}]);