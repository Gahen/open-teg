/* global _ */
'use strict';

describe('Player constructor', function () {

	// load the service's module
	beforeEach(module('tegApp'));
	var Player;
	beforeEach(inject(function (_Player_) {
		Player = _Player_;
	}));

	it('should not make players if parameters are invalid', function() {
		expect(Player.make.bind(null)).toThrow();
	});

	it('should not make players if parameters are invalid', function() {
		expect(Player.make.bind(null, 'red')).toThrow();
	});

	it('should make a player', function() {
		var player = Player.make('fafrula', 'red');
		expect(player instanceof Object).toBe(true);
	});

	describe('Instance', function() {
		// instantiate objects
		var player, country1, country2;
		beforeEach(inject(function (_Player_, _Country_) {
			var countries = _Country_.get();
			country1 = countries[0];
			country2 = countries[1];
			player = _Player_.make('fafrula', 'red');
		}));

		it('should have a name', function () {
			expect(player.name).toBe('fafrula');
		});

		describe('Countries', function() {
			beforeEach(inject(function (_Player_) {
				player = _Player_.make('fafrula', 'red');
				spyOn(country1, 'setArmies');
			}));

			it('should add a country', function () {
				player.addCountry(country1);
				expect(player.getCountries()).toEqual([country1]);
				expect(country1.setArmies).toHaveBeenCalledWith(1);
				expect(player.hasCountry(country1)).toBe(true);
				expect(player.getCountry(country1.id)).toBe(country1);
			});

			it('should not find unknown countries', function () {
				expect(player.hasCountry(country1)).toBe(false);
				expect(player.getCountry.bind(null, country1.id)).toThrow();
			});

			it('should remove a country', function () {
				player.addCountry(country1);
				player.removeCountry(country1);
				expect(player.getCountries()).toEqual([]);
			});
		});

		describe('Armies', function() {
			it('should add armies', function () {
				var add = 10;
				player.addArmies(add);
				expect(player.getArmies()).toBe(add);
			});

			it('should remove an army', function () {
				player.addArmies(5);
				player.removeArmy();
				expect(player.getArmies()).toBe(4);
			});
		});
		describe('Cards', function() {
			var card, card2, card3, card4;
			beforeEach(inject(function(_Card_) {
				var cards = _Card_.all();
				card = _.find(cards, { 'type': 'a' });
				card2 = _.find(cards, { 'type': 'b' });
				card3 = _.find(cards, { 'type': 'c' });
				card4 = _.find(cards, { 'type': 'b' });
			}));

			it('should add a card', function () {
				player.addCard(card);
				expect(player.getCards()).toEqual([card]);
				expect(player.hasCard(card)).toBe(true);
			});

			it('should not trade cards if they are fewer than 3', function () {
				player.addCard(card);
				expect(player.tradeCards.bind(null, [card])).toThrow();
				expect(player.getCards()).toEqual([card]);
				player.addCard(card2);
				expect(player.tradeCards.bind(null, [card, card2])).toThrow();
				expect(player.getCards()).toEqual([card, card2]);
			});

			it('should not trade cards if they don\'t have 3 different ones', function () {
				var cards = [ card, card2, card4 ];
				player.addCard(card);
				player.addCard(card2);
				player.addCard(card4);
				expect(player.tradeCards.bind(null, cards)).toThrow();
			});

			it('should trade cards', function () {
				var cards = [ card, card2, card3 ];
				player.addCard(card);
				player.addCard(card2);
				player.addCard(card3);
				expect(player.getCards()).toEqual(cards);
				player.tradeCards(cards);
				expect(player.getCards()).toEqual([]);
			});
		});

		describe('Game', function() {
			var card1, card2;
			beforeEach(inject(function(_Card_) {
				card1 = _Card_.make(country1);
				card2 = _Card_.make(country2);
				player.addCard(card1);
			}));

			it('should fail without a card', function () {
				expect(player.useCard.bind(null)).toThrow();
			});

			it('should not use a card twice', function () {
				player.useCard(card1);
				expect(player.useCard.bind(null, card1)).toThrow();
			});

			it('should use cards', function () {
				expect(player.canUseCard(card1)).toBe(true);
				player.useCard(card1);
				expect(player.canUseCard(card1)).toBe(false);
			});
			
			it('should find a card by country object', function() {
				expect(player.canUseCard(country1)).toBe(true);
				player.useCard(country1);
				expect(player.canUseCard(country1)).toBe(false);

			});

			it('should not use extraneus cards', function () {
				expect(player.canUseCard(card2)).toBe(false);
				expect(player.useCard.bind(null, card2)).toThrow();
			});

			it('should set objectives', function() {
				var o = {};
				player.setObjective(o);
				expect(player.getObjective()).toBe(o);
			});
			
		});
	});
});
