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
            baseUrl:'http://linkia-int.redfroggy.fr',
            apiPath:'/api/2014-06/', //Must start with '/'
            docApiPath:'/api-docs' //Must start with '/'
        },
        auth: {
            path: '/api/2014-06/account/authentication', //Must start with '/'
            appKey: '49226F8B790811CCC65C4EAE67B394A5CB610AC7316A1C5336A2A383D4EEC1D6'
        }
    }
);