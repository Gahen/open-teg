'use strict';

angular.module('tegApp')
	.factory('Player', function () {
		// Service logic
		// ...
		var countries = [];

		var that = {
			gotCountry: false,
			playing: false,
			startTurn: function() {
				that.playing = true;
			},
			endTurn: function() {
				that.playing = false;
			},
			addCountry: function(country) {
				countries.push(country);
				country.army = 1;
			},
			removeCountry: function(country) {
			},
			addArmies: function(country, armies) {
				country.army+= armies;
			},
			removeArmy: function(country) {
				country.army--;
			},
			addCard: function(card) {
			},
			useCards: function(cards) {
			}
		};

		// Public API here
		return {
			someMethod: function () {
				return meaningOfLife;
			}
		};
	});
