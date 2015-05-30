/**
 * @ngdoc constant
 * @name fr.redfroggy.swaggerApi.app
 * @description
 * # fr.redfroggy.swaggerApi.app
 *
 * fr.redfroggy.swaggerApi.app config constant
 */
angular.module('fr.redfroggy.swaggerApi.app').constant('Config',
    {
        server:{
            baseUrl:'http://localhost:8080',
            apiPath:'/api/v1/', //Must start with '/'
            docApiPath:'/api-docs' //Must start with '/'
        },
        auth: {
            path: '/api/account/authentication', //Must start with '/'
            appKey: '#APP_KEY'
        }
    }
);