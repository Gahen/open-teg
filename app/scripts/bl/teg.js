/* global alert */
'use strict';

/**
 * Solo el jugador activo puede interactuar con este modulo
 */

angular.module('tegApp')
	.factory('TEG', function (Dice) {
		var DESTROY = 'destroy';
		var colors = {
			green: 'green',
			blue: 'blue',
			red: 'red',
			yellow: 'yellow',
			pink: 'pink',
			black: 'black'
		};

		var objectives = [
			{ type: DESTROY, value: colors.green },
			{ type: DESTROY, value: colors.blue },
			{ type: DESTROY, value: colors.black },
			{ type: DESTROY, value: colors.pink },
			{ type: DESTROY, value: colors.yellow },
			{ type: DESTROY, value: colors.red },
			{
				type: 'conquer',
				value: {
					'africa': 6,
					'america del norte': 5,
					'europa': 4
				},
			},
			{
				type: 'conquer',
				value: {
					'america del sur': 6,
					'limitrofes': 3,
					'europa': 7
				}
			},
			{
				type: 'conquer',
				value: {
					'europa': 9,
					'asia': 4,
					'america del sur': 2
				}
			},
			{
				type: 'conquer',
				value: {
					'asia': 15,
					'america del norte': 5,
					'europa': 4
				}
			},
			{
				type: 'conquer',
				value: {
					'oceania': 2,
					'america del norte': 10,
					'asia': 4
				}
			},
			{
				type: 'conquer',
				value: {
					'oceania': 2,
					'america del norte': 4,
					'asia': 3,
					'africa': 2,
					'america del sur': 2,
					'europa': 3
				}
			},
			{
				type: 'conquer',
				value: {
					'europa': 2,
					'america del norte': 10,
					'oceania': 4
				}
			},
			{
				type: 'conquer',
				value: {
					'africa': 6,
					'america del sur': 6,
					'america del norte': 5
				}
			},
		];

		function make(players) {
			var that = {
				players: players,
				currentPlayer: null,

				attack: function(defender, attackingCountry, defendingCountry) {
					var totalDices = Math.max(attackingCountry.armies, defendingCountry.armies);
					var dices = Dice.roll(totalDices); // sorted pair of array[1..3] of dices (from 1 to 6)
					for (var i=0; i < dices; i++) {
						if (dices[0] > dices[1]) {
							that.currentPlayer.removeArmy(attackingCountry);
						} else {
							defender.removeArmy(defendingCountry);
						}
					}
					if (defender.getArmy(defendingCountry) === 0) {
						defender.removeCountry(defendingCountry);
						that.currentPlayer.addCountry(defendingCountry);

						// Si murió, entrego las cartas
						if (defender.getCountries().length === 0) {
							_.each(defender.getCards(), function(c) {
								that.currentPlayer.addCard(c);
							});
						}
					}
					that.checkIfWon(defender);
				},

				changeTurn: function() {
					that.currentPlayer.endTurn();
					that.currentPlayer = that.players[that.players.indexOf(that.currentPlayer)+1];
					that.currentPlayer.startTurn();
					that.checkIfWon();
				},

				addArmies: function(country, armies) {
					that.currentPlayer.addArmy(country, armies);
				},

				checkIfWon(defender) {
					var objective = that.currentPlayer.getObjective();
					// Objetivo común
					if (that.currentPlayer.getCountries().length >= 30) {
						that.gameEnded();
					}

					// Objetivo de destrucción
					if (objective.type === DESTROY && !defender.getCountries().length) {
						if (objective.value === defender.color) {
							that.gameEnded(); // ganó
						}
					// objetivo de conquista
					} else if (objective.type === 'conquer') {
						var obj = angular.copy(objective.value);
						_.each(that.currentPlayer.getCountries(), function(c) {
							if (obj[c.continent]) {
								obj[c.continent]--;
							}
						});
						if (_.every(obj, function(c) {
							return c <= 0;
						})) {
							that.gameEnded(); // ganó
						}
					}
				},
				gameEnded: function() {
					alert('game ended');
				}
			};

			return that;
		}

		// Public API here
		return {
			make: make
		};
	});
