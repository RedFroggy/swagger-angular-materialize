'use strict';

/**
 * Util services
 */
angular.module('fr.redfroggy.swaggerApi.app.services').factory('UtilService', ['$log',function ($log) {
        return {
            getQueryString: function(request){
                //Create message with http method + http url + date
                var url = request.url;
                url = url.replace(/\|/g,'%7C');
                $log.debug('url before: '+url);

                if(url.indexOf('?') === -1 && request.params !== null){
                    var queryParams = _.reject(_.pairs(request.params),function(arr){
                        return arr[1] === null || arr[1] === undefined;
                    });
                    queryParams = queryParams.sort(function(arr1,arr2){
                        if(arr1[0] < arr2[0]) {
                            return 1;
                        }
                        if(arr2[0] < arr1[0]) {
                            return -1;
                        }
                        return 0;
                    });
                    var firstQuery = queryParams[queryParams.length - 1];
                    if(firstQuery !== null  && firstQuery !== undefined){
                        url = url+'?'+firstQuery[0]+'='+firstQuery[1];
                    }
                    if(queryParams !== null){
                        for(var i=queryParams.length-2;i>=0; i--){
                            var qs = queryParams[i];
                            if(qs !== null && qs.length === 2 && qs[1] !== null){
                                url += '&'+qs[0]+'='+qs[1];
                            }
                        }
                    }
                }
                $log.debug('url after: '+url);
                return url;
            }
        };
    }]
);