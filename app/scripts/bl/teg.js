'use strict';

angular.module('tegApp')
	.factory('TEG', function (Dice, Player) {

		function make(players) {
			var that = {
				players: [],
				currentPlayer: null,
				attack: function(attacker, defender, attackingCountry, defendingCountry) {
					var totalDices = Math.max(attackingCountry.armies, defendingCountry.armies);
					var dices = Dice.roll(totalDices); // sorted pair of array[1..3] of dices (from 1 to 6)
					for (var i=0; i < dices; i++) {
						if (dices[0] > dices[1]) {
							attacker.removeArmy(attackingCountry);
						} else {
							defender.removeArmy(defendingCountry);
						}
					}
					if (defender.getArmy(defendingCountry) === 0) {
						defender.removeCountry(defendingCountry);
						attacker.addCountry(defendingCountry);
					}
				},
				changeTurn: function() {
					that.currentPlayer.endTurn();
					that.currentPlayer = that.players[that.players.indexOf(that.currentPlayer)+1];
					that.currentPlayer.startTurn();
				},
				addArmy(country, armies) {
					that.currentPlayer.addArmy(country, armies);
				}
			};

			return that;
		}

		// Public API here
		return {
			make: make
		};
	});
