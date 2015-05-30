'use strict';

/**
 * Http interceptor to add proper headers to the request.
 */
angular.module('fr.redfroggy.swaggerApi.app.services').factory('httpSecurityInterceptor', ['$rootScope','$cookieStore', function ($rootScope,$cookieStore) {
            return {
                /**
                 * Request interceptor
                 * @param request http request original
                 * @returns {*} http request modified
                 */
                request: function (request) {
                    return request;
                },
                responseError:function(response){
                    if(response.status === 401){
                        $rootScope.authenticated = false;
                        delete $rootScope.account;
                        $cookieStore.remove('account');
                    }
                    return response;
                }
            };
        }]
);