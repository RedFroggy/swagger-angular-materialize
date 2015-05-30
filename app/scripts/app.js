'use strict';

/**
 * @ngdoc overview
 * @name swaggerApiDoc
 * @description
 * # swaggerApiDoc
 *
 * Main module of the application.
 */
angular.module('swaggerApiDoc', [
    'ngCookies',
    'ngSanitize',
    'ngTouch',
    'ab-base64',
    'LocalStorageModule',
    'chart.js',
    'fr.redfroggy.swaggerApi.app'
  ]
);

/**
 * @ngdoc overview
 * @name fr.redfroggy.swaggerApi.app
 * @description
 * # fr.redfroggy.swaggerApi.app
 *
 * Main sub module of the application.
 */
angular.module('fr.redfroggy.swaggerApi.app',
    [
        'fr.redfroggy.swaggerApi.app.router',
        'fr.redfroggy.swaggerApi.app.services',
        'fr.redfroggy.swaggerApi.app.controllers',
        'fr.redfroggy.swaggerApi.app.directives'
    ]
);

/**
 * @ngdoc overview
 * @name fr.redfroggy.swaggerApi.app
 * @description
 * # fr.redfroggy.swaggerApi.app configuration
 *
 * Configuration of the module fr.redfroggy.swaggerApi.app
 */
angular.module('fr.redfroggy.swaggerApi.app')
    .config(['$httpProvider','localStorageServiceProvider','ChartJsProvider',function ($httpProvider,localStorageServiceProvider) {
        $httpProvider.defaults.timeout = 5000;
        $httpProvider.interceptors.push('httpSecurityInterceptor');
        localStorageServiceProvider.setPrefix('swaggerAngularApp');

    }])
    .run(['$rootScope','Authentication',function($rootScope,Authentication){
        $rootScope.authenticated = Authentication.isAuthenticated();
    }]);


/**
 * @ngdoc overview
 * @name fr.redfroggy.swaggerApi.app.router
 * @description
 * # fr.redfroggy.swaggerApi.app.router
 *
 * Router module
 */
angular.module('fr.redfroggy.swaggerApi.app.router',['ui.router']);

/**
 * @ngdoc overview
 * @name fr.redfroggy.swaggerApi.app.controllers
 * @description
 * # fr.redfroggy.swaggerApi.app.controllers
 *
 * Controllers module
 */
angular.module('fr.redfroggy.swaggerApi.app.controllers',[]);

/**
 * @ngdoc overview
 * @name fr.redfroggy.swaggerApi.app.directives
 * @description
 * # fr.redfroggy.swaggerApi.app.directives
 *
 * Directives module
 */
angular.module('fr.redfroggy.swaggerApi.app.directives',[]);

/**
 * @ngdoc overview
 * @name fr.redfroggy.swaggerApi.angular.app.services
 * @description
 * # fr.redfroggy.swaggerApi.angular.app.services
 *
 * Services module
 */
angular.module('fr.redfroggy.swaggerApi.app.services',['ngResource']);
