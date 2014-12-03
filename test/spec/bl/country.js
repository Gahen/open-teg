/* global _ */
'use strict';

describe('Country constructor', function () {

	// load the service's module
	beforeEach(module('tegApp'));

	// instantiate service
	var Country;
	beforeEach(inject(function (_Country_) {
		Country = _Country_;
	}));

	it('should not make countries if parameters are invalid', function() {
		expect(Country.make.bind(null)).toThrow();
	});

	it('should make a country', function() {
		var country = Country.make('fafrula', 'red');
		expect(country instanceof Object).toBe(true);
	});

	describe('Instance', function() {
		var arg, bra, col;
		beforeEach(inject(function (_Country_) {
			var countries = _Country_.get();
			arg = _.find(countries, { id: 'argentina'});
			bra = _.find(countries, { id: 'brasil'});
			col = _.find(countries, { id: 'colombia'});
		}));

		it('should start with 0 armies', function() {
			expect(arg.armies).toBe(0);
		});

		it('should add armies from the country', function() {
			arg.addArmies(2);
			expect(arg.armies).toBe(2);
		});

		it('should remove armies from the country', function() {
			arg.addArmies(2);
			arg.removeArmies(1);
			expect(arg.armies).toBe(1);
		});

		it('should set country armies', function() {
			arg.setArmies(4);
			expect(arg.armies).toBe(4);
		});

		it('should return it\'s own name', function() {
			expect(arg.getName()).toBe('Argentina');
			expect(col.getName()).toBe('Colombia');
			expect(bra.getName()).toBe('Brasil');
		});

		it('should check if a country is limitrophe (?)', function() {
			expect(arg.limitsWith(col)).toBe(false);
			expect(arg.limitsWith(bra)).toBe(true);
		});
	});

});
