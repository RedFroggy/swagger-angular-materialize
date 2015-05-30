'use strict';

/**
 * Authentication service
 */
angular.module('fr.redfroggy.swaggerApi.app.services').factory('Authentication', ['$rootScope','$cookieStore','$q', function ($rootScope,$cookieStore,$q) {
            return {
                login: function (username,password) {

                    var deferred = $q.defer();

                    deferred.resolve(data);

                    return deferred.promise;
                },
                isAuthenticated:function(){
                    if($cookieStore.get('account')){
                        $rootScope.account = angular.fromJson($cookieStore.get('account'));
                    }
                    return angular.isDefined($rootScope.account);
                },
                logout:function(){
                    $rootScope.authenticated = false;
                    delete $rootScope.account;
                    $cookieStore.remove('account');
                }
            };
        }]
);