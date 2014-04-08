'use strict';

describe('Service: TEG', function () {

  // load the service's module
  beforeEach(module('appApp'));

  // instantiate service
  var TEG;
  beforeEach(inject(function (_TEG_) {
    TEG = _TEG_;
  }));

  it('should do something', function () {
    expect(!!TEG).toBe(true);
  });

});
