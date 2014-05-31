/* global alert */
'use strict';

/**
 * Solo el jugador activo puede interactuar con este modulo
 */

angular.module('tegApp')
	.factory('TEG', function (Dice, Player, Country, $interval) {
		var DESTROY = 'destroy';
		var colors = {
			green: 'green',
			blue: 'blue',
			red: 'red',
			yellow: 'yellow',
			pink: 'pink',
			black: 'black'
		};

		var states = {
			// Base states
			attack: 'A',
			addArmies: 'AM',
			// Starting states
			firstArmies: 'FA',
			secondArmies: 'SA',
			// attacking sub states
			regroup: 'R',
			afterCard: 'AC'
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

		var z;

		var f = function() {
			var that = {
				players: [],
				colors: angular.copy(colors),
				state: states.firstArmies,
				currentPlayer: null,
				attacker: null, // last attacking player
				defender: null, // last defending player
				gameStarted: false,
				dices: [], // last pair of dices
				pendingArmies: 0,

				addPlayer: function(color, name) {
					delete that.colors[color];
					that.players.push(Player.make(name, color));
				},

				removePlayer: function(player) {
					that.players = _.remove(that.players, player);
					that.colors[player.getColor()] = player.getColor();
				},

				start: function() {
					that.gameStarted = true;
					that.setObjectives();
					that.setCountries();
					that.currentPlayer = that.players[0];
					that.pendingPlayers = that.players.slice(0);
					that.pendingArmies = 3;
					that.startTimer();
				},

				startTimer: function() {
					z = (new Date()).getTime()+60*2*1000; // 2 minutes

					var i = $interval(function() {
						that.time = z - (new Date()).getTime();
						if (that.time <= 0) {
							that.changeTurn();
							$interval.cancel(i);
						}
					}, 100);
				},

				setCountries: function() {
					var cs = _.shuffle(Country.get());
					var i = 0;
					_.each(cs, function(c) {
						i = i % that.players.length;
						that.players[i++].addCountry(c);
					});
				},

				setObjectives: function() {
					var objs = _.shuffle(objectives.slice(0));
					_.each(that.players, function(p) {
						p.setObjective(objs.shift());
					});
				},

				nextState: function() {
					switch (that.state) {
						case states.firstArmies:
							that.state = states.secondArmies;
							break;
						case states.secondArmies:
							that.state = states.attack;
							break;
						case states.attack:
						case states.afterCard:
						case states.regroup:
							that.state = states.addArmies;
							break;
						case states.addArmies:
							that.state = states.attack;
							break;
					}
				},

				countryAction: function(countryFrom, countryTo) {
					var p = that.currentPlayer;
					switch (that.state) {
						case states.firstArmies:
						case states.secondArmies:
						case states.addArmies:
							if (p.hasCountry(countryFrom) && that.pendingArmies > 0) {
								that.addArmies(1, countryFrom);
								that.pendingArmies--;
							}
							break;
						case states.attack:
						case states.regroup:
							if (!countryTo) {
								return _.partial(that.countryAction, countryFrom);
							} else if (p.hasCountry(countryFrom) && !p.hasCountry(countryFrom) && countryFrom.limits(countryTo)) {
								that.attack(countryFrom, countryTo);
							}
							break;
						case states.afterCard:
							if (p.hasCountry(countryFrom)) {
								if (p.canUseCard(countryFrom)) {
									that.addArmies(2, countryFrom);
									that.useCard(countryFrom);
								}
							}
							break;
					}
				},

				attack: function(attackingCountry, defendingCountry) {
					that.attacker = that.currentPlayer;
					var defender = that.defender = _.find(that.players, function(p) {
						return p.hasCountry(defendingCountry);
					});

					var totalDices = Math.max(attackingCountry.armies, defendingCountry.armies);
					var dices = Dice.roll(totalDices); // sorted pair of array[1..3] of dices (from 1 to 6)
					that.dices = dices;
					for (var i=0; i < dices; i++) {
						if (dices[0][i] > dices[1][i]) {
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
					that.checkIfWon();
					that.currentPlayer.endTurn();
					if (that.pendingPlayers.length === 0) {
						that.pendingPlayers = that.players.slice(1).push(that.players[that.players.length-1]);
						that.nextState();
					}
					that.currentPlayer = that.pendingPlayers.shift();
					that.currentPlayer.startTurn();
					that.startTime();
				},

				addArmies: function(country, armies) {
					that.currentPlayer.addArmy(country, armies);
				},

				checkIfWon: function(defender) {
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
		};

		// Public API here
		return {
			'new': f,
			states: states,
			objectives: objectives,
			colors: colors
		};
	});
