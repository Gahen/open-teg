'use strict';

describe('Directive: mapa', function () {

  // load the directive's module
  beforeEach(module('tegApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<mapa></mapa>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the mapa directive');
  }));
});
