'use strict';

describe('Service: Player', function () {

  // load the service's module
  beforeEach(module('tegApp'));

  // instantiate service
  var Player;
  beforeEach(inject(function (_Player_) {
    Player = _Player_;
  }));

  it('should do something', function () {
    expect(!!Player).toBe(true);
  });

});
