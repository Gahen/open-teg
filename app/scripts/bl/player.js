'use strict';

angular.module('tegApp')
	.factory('Player', function () {
		function differentCards(cards) {
			return _.uniq(cards, 'type').length === cards.length;
		}

		function make(name) {
			var that = {
				name: name,
				playing: false,
				cards: [],
				countries: [],
				startTurn: function() {
					that.playing = true;
				},
				endTurn: function() {
					that.playing = false;
				},
				addCountry: function(country) {
					that.countries.push(country);
				},
				removeCountry: function(country) {
					_.remove(that.countries, country);
				},
				addArmies: function(country, armies) {
					country.army+= armies;
				},
				removeArmy: function(country) {
					country.army--;
				},
				addCard: function(card) {
					that.cards.push(card);
				},
				useCards: function(cards) {
					if (differentCards(cards)) {

					}
				}
			};
		}

		// Public API here
		return {
			make: make
		};
	});
