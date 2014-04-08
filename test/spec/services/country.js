'use strict';

describe('Service: Country', function () {

  // load the service's module
  beforeEach(module('tegApp'));

  // instantiate service
  var Country;
  beforeEach(inject(function (_Country_) {
    Country = _Country_;
  }));

  it('should do something', function () {
    expect(!!Country).toBe(true);
  });

});
