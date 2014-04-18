'use strict';

describe('Player', function () {

	// load the service's module
	beforeEach(module('tegApp'));

	// instantiate objects
	var player, country, card, card2, card3;
	beforeEach(inject(function (_Player_, _Country_, _Card_) {
		card = _Card_.make({id: 'gran_bretana'}); // This should be more mockable.
		card2 = _Card_.make({id: 'arabia'}); // This should be more mockable.
		card3 = _Card_.make({id: 'italia'}); // This should be more mockable.
		country = _Country_.make({id: 'someCountry'});
		player = _Player_.make('fafrula');
		spyOn(country, 'setArmies');
	}));

	it('should have a name', function () {
		expect(player.name).toBe('fafrula');
	});

	it('should add a country', function () {
		player.addCountry(country);
		expect(player.getCountries()).toEqual([country]);
		expect(country.setArmies).toHaveBeenCalledWith(1);
	});

	it('should remove a country', function () {
		player.addCountry(country);
		player.removeCountry(country);
		expect(player.getCountries()).toEqual([]);
	});

	it('should add armies', function () {
		var add = 10;
		player.addCountry(country);
		player.addArmies(country, add);
		expect(player.getArmies()).toBe(add+1);
	});

	it('should remove an army', function () {
		player.addCountry(country);
		player.addArmies(country, 5);
		player.removeArmy(country);
		expect(player.getArmies()).toBe(5);
	});

	it('should add a card', function () {
		player.addCard(card);
		expect(player.getCards()).toEqual([card]);
	});

	it('should not use cards if they are unusable', function () {
		player.addCard(card);
		player.useCards([card]);
		expect(player.getCards()).toEqual([card]);
	});

	it('should use cards', function () {
		var cards = [ card, card2, card3 ];
		player.addCard(card);
		player.addCard(card2);
		player.addCard(card3);
		player.useCards(cards);
		expect(player.getCards()).toEqual([]);
	});

});
