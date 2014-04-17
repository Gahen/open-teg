'use strict';

describe('Player', function () {

	// load the service's module
	beforeEach(module('tegApp'));

	// instantiate service
	var player;
	beforeEach(inject(function (_Player_) {
		player = _Player_.make('fafrula');
	}));

	it('should have a name', function () {
		expect(player.name).toBe('fafrula');
	});

	it('should add a country', function () {
		player.addCountry({ id: 'someCountry'});
		expect(player.name).toBe('fafrula');
	});

	it('should remove a country', function () {
	});

	it('should add armies', function () {
	});

	it('should remove an army', function () {
	});

	it('should add a card', function () {
		
	});

	it('should use cards correctly', function () {
	});

});
