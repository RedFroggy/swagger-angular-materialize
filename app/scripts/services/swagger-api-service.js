'use strict';

angular.module('fr.redfroggy.swaggerApi.app.services').factory('SwaggerApi', ['$resource','Config','$http',function ($resource,Config,$http) {
    var resource = $resource(Config.server.baseUrl+Config.server.docApiPath);

    resource.detail = function(path){
        return $http.get(Config.server.baseUrl+Config.server.docApiPath+path);
    };
    return resource;
}]);