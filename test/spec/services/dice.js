'use strict';

describe('Service: Dice', function () {

  // load the service's module
  beforeEach(module('tegApp'));

  // instantiate service
  var Dice;
  beforeEach(inject(function (_Dice_) {
    Dice = _Dice_;
  }));

  it('should do something', function () {
    expect(!!Dice).toBe(true);
  });

});
