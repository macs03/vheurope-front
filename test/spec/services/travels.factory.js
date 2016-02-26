'use strict';

describe('Service: travels.factory', function () {

  // load the service's module
  beforeEach(module('vhEurope'));

  // instantiate service
  var travels.factory;
  beforeEach(inject(function (_travels.factory_) {
    travels.factory = _travels.factory_;
  }));

  it('should do something', function () {
    expect(!!travels.factory).toBe(true);
  });

});
