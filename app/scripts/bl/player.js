'use strict';

angular.module('tegApp')
	.factory('Player', function () {

		function make(name, color) {
			var countries = [], cards = [], armies = 0, objective;

			function differentCards(cards) {
				return _.uniq(cards, 'type').length === cards.length;
			}

			var that = {
				name: name,
				color: color,
				playing: false,
				cardUses: 0,
				startTurn: function() {
					that.playing = true;
				},
				endTurn: function() {
					that.playing = false;
				},
				getCountries: function() {
					return angular.copy(countries); // protect it from editing.
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
				addArmies: function(country, extraArmies) {
					var myCountry = that.getCountry(country);
					armies += extraArmies;
					myCountry.addArmies(extraArmies);
				},
				removeArmy: function(country) {
					var myCountry = that.getCountry(country);
					myCountry.removeArmy();
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
					if (differentCards(cardsToBeUsed) && _.difference(cards, cardsToBeUsed).length === cards.length - 3) {
						cards = _.difference(cards, cardsToBeUsed);
						that.cardUses++;
					}
				},
				setObjective: function(o) {
					objective = o;
				},
				getObjective: function() {
					return objective;
				}
			};

			return that;
		}

		// Public API here
		return {
			make: make
		};
	});
