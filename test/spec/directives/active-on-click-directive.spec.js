/**
 * Tests activeOnClick directive
 */
describe('Tests activeOnClick directives', function () {
    beforeEach(module('fr.redfroggy.swaggerApi.app.directives'));

    var scope, element, rootScope;

    /**
     * Before each test
     */
    beforeEach(inject(function ($rootScope, $compile) {
        //Inject scopes
        rootScope = $rootScope;
        scope = $rootScope.$new();

        //Create directive html element
        element = angular.element('<ul active-on-click><li><a href="#"></a></li><li><a href="#"></a></li></ul>');
        $compile(element)(scope);
        scope.$digest();
    }));

    /**
     * After each test
     */
    afterEach(function () {
        //Remove directive element
        element.remove();
    });

    it('activeOnClick initialisation',function(){
        expect(element.isolateScope().activeClass).toBeDefined();
        $(element).find('a:first').trigger('click');
    });

    it('activeOnClick change active class on click',function(){
        expect($(element).find('a:first').hasClass('active')).toBeFalsy();

        $(element).find('a:first').trigger('click');

        expect($(element).find('a:first').hasClass('active')).toBeTruthy();
        expect($(element).find('a.active').length).toBe(1);
    });
});