'use strict';

describe('Card', function () {
	beforeEach(module('tegApp'));
	var Card, country;
	beforeEach(inject(function (_Card_, _Country_) {
		Card = _Card_;
		country = _Country_.make({id: 'argentina'});
	}));

	it('should not build invalid cards', function () {
		var card = Card.make({id: 'fafrula'});
		expect(card).toBe(null);
	});

	it('should build valid cards', function () {
		var card = Card.make({id: 'argentina'});
		expect(card).not.toBe(null);
	});

	it('should build countries from data', function() {
		var card = Card.make({id: 'argentina'});
		expect(card.getType()).toBe('b');
		expect(card.getCountry().__class).toEqual('Country');
	});

	describe('is valid', function() {
		// instantiate object
		var card;

		beforeEach(inject(function (Card) {
			card = Card.make(country);
		}));

		it('should have correct country', function() {
			expect(card.getCountry()).toEqual(country);
		});

		it('should have correct type', function() {
			expect(card.getType()).toBe('b');
		});
	});

});
