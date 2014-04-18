'use strict';

angular.module('tegApp')
	.factory('Player', function () {
		var countries = [], cards = [], armies = 0;

		function getCountry(country) {
			return _.find(countries, { id : country.id });
		}

		function differentCards(cards) {
			return _.uniq(cards, 'type').length === cards.length;
		}

		function make(name) {
			var that = {
				name: name,
				playing: false,
				startTurn: function() {
					that.playing = true;
				},
				endTurn: function() {
					that.playing = false;
				},
				getCountries: function() {
					return angular.copy(countries); // protect it from editing.
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
					var myCountry = getCountry(country);
					armies += extraArmies;
					myCountry.addArmies(extraArmies);
				},
				removeArmy: function(country) {
					var myCountry = getCountry(country);
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
				useCards: function(cardsToBeUsed) {
					if (differentCards(cardsToBeUsed) && _.difference(cards, cardsToBeUsed).length === cards.length - 3) {
						cards = _.difference(cards, cardsToBeUsed);
					}
				}
			};

			return that;
		}

		// Public API here
		return {
			make: make
		};
	});
