'use strict';

/**
 * @ngdoc function
 * @name fr.redfroggy.swaggerApi.app.directives:highlight
 * @description
 * # highlight
 * Directive of the fr.redfroggy.swaggerApi.app.directives module
 */
angular.module('fr.redfroggy.swaggerApi.app.directives').directive('highlight', ['$interpolate',function($interpolate){
    return {
        restrict: 'EA',
        scope:true,
        compile: function (tElem) {
            var interpolateFn = $interpolate(tElem.html(), true);
            tElem.html('');

            return function(scope, elem){
                scope.$watch(interpolateFn, function (value) {
                    elem.html(hljs.highlight('json', value).value);
                });
            };
        }
    };
}]);