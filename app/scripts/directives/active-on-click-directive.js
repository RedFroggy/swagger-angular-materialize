'use strict';

/**
 * @ngdoc function
 * @name fr.redfroggy.swaggerApi.app.directives:activeOnClick
 * @description
 * # activeOnClick
 * Directive of the fr.redfroggy.swaggerApi.app.directives module
 */
angular.module('fr.redfroggy.swaggerApi.app.directives').directive('activeOnClick', function(){
    return {
        restrict: 'A',
        scope:{
            activeClass:'@?'
        },
        link:function(scope,element,attrs){
            if(!attrs.activeClass){
                scope.activeClass = 'active red darken-4';
            }
            $(element).find('a').on('click',function(event) {
                $(element).find('a.active').removeClass(scope.activeClass);
                $(event.currentTarget).addClass(scope.activeClass);
            });
        }
    };
});