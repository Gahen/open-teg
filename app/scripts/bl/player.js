'use strict';

angular.module('tegApp')
	.factory('Player', function () {

		function validTradeCards(cards, ownCards) {
			var types = 'abc';
			var cardTypes = _.pluck(cards, 'type');
			var are3 = cards.length === 3;
			var allDifferent = are3 && _.every(types, function(t) {
				return cardTypes.indexOf(t) !== -1;
			});
			var allOwn = are3 && _.every(cards, function(c) {
				return ownCards.indexOf(c) !== -1;
			});

			console.log(_.pluck(cards,'type'), _.pluck(ownCards, 'type'), allDifferent, allOwn);
			return allDifferent && allOwn;
		}

		function make(name, color) {
			var countries = [], cards = [], armies = 0, objective;

			var that = {
				name: name,
				color: color,
				playing: false,
				cardTrades: 0,
				startTurn: function() {
					that.playing = true;
				},
				endTurn: function() {
					that.playing = false;
				},
				getCountries: function() {
					return angular.copy(countries); // protect it from editing.
				},
				getCountry: function(countryId) {
					return _.where(countries, { id: countryId })[0];
				},
				hasCountry: function(country) {
					return _.contains(countries, country);
				},
				addCountry: function(country) {
					armies++;
					country.setArmies(1);
					countries.push(country);
				},
				removeCountry: function(country) {
					countries = _.without(countries, country);
				},
				/**
				 * ¿Add/RemoveArmies acá o en el TEG?
				 */
				addArmies: function(extraArmies) {
					armies += extraArmies;
				},
				removeArmy: function() {
					armies--;
				},
				getArmies: function() {
					return armies;
				},
				addCard: function(card) {
					cards.push(card);
				},
				getCards: function() {
					return cards;
				},
				hasCard: function(card) {
					return _.contains(cards, card);
				},
				canUseCard: function(countryOrCard) {
					var card = that.hasCard(countryOrCard) ? countryOrCard : _.find(cards, { country: countryOrCard });
					return card && !card.used;
				},
				useCard: function(countryOrCard) {
					var card = that.hasCard(countryOrCard) ? countryOrCard : _.find(cards, { country: countryOrCard });
					if (card && that.canUseCard(card)) {
						card.used = true;
					}
				},

				tradeCards: function(cardsToBeUsed) {
					if (!validTradeCards(cardsToBeUsed, cards)) {
						throw new Error('invalid cards to trade');
					} else {
						cards = _.difference(cards, cardsToBeUsed);
						that.cardTrades++;
					}
				},
				setObjective: function(o) {
					objective = o;
				},
				getObjective: function() {
					return objective;
				},
			};

			return that;
		}

		// Public API here
		return {
			make: make
		};
	});
