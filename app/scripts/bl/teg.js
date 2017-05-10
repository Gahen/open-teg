/* global alert */
'use strict';

/**
 * Solo el jugador activo puede interactuar con este modulo
 */

angular.module('tegApp')
	.factory('TEG', function (Dice, Player, Country, Card, $interval) {

		var saveInterval = 5000;

		var OBJECTIVES_TYPES = {
			DESTROY: 'destroy',
			CONQUER: 'conquer'
		};

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
			attack: 'Ataque',
			addArmies: 'Agregar Ejércitos',
			// Starting states
			firstArmies: 'Sumar tropas iniciales',
			secondArmies: 'Sumar tropas secundarias',
			// attacking sub states
			regroup: 'Reagrupar',
			afterCard: 'Tomar tarjeta'
		};

		var objectives = [
			{ type: OBJECTIVES_TYPES.DESTROY, value: colors.green },
			{ type: OBJECTIVES_TYPES.DESTROY, value: colors.blue },
			{ type: OBJECTIVES_TYPES.DESTROY, value: colors.black },
			{ type: OBJECTIVES_TYPES.DESTROY, value: colors.pink },
			{ type: OBJECTIVES_TYPES.DESTROY, value: colors.yellow },
			{ type: OBJECTIVES_TYPES.DESTROY, value: colors.red },
			{
				type: OBJECTIVES_TYPES.CONQUER,
				value: {
					'africa': 6,
					'america del norte': 5,
					'europa': 4
				},
			},
			{
				type: OBJECTIVES_TYPES.CONQUER,
				value: {
					'america del sur': 6,
					'limitrofes': 3,
					'europa': 7
				}
			},
			{
				type: OBJECTIVES_TYPES.CONQUER,
				value: {
					'europa': 9,
					'asia': 4,
					'america del sur': 2
				}
			},
			{
				type: OBJECTIVES_TYPES.CONQUER,
				value: {
					'asia': 15,
					'america del norte': 5,
					'europa': 4
				}
			},
			{
				type: OBJECTIVES_TYPES.CONQUER,
				value: {
					'oceania': 2,
					'america del norte': 10,
					'asia': 4
				}
			},
			{
				type: OBJECTIVES_TYPES.CONQUER,
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
				type: OBJECTIVES_TYPES.CONQUER,
				value: {
					'europa': 2,
					'america del norte': 10,
					'oceania': 4
				}
			},
			{
				type: OBJECTIVES_TYPES.CONQUER,
				value: {
					'africa': 6,
					'america del sur': 6,
					'america del norte': 5
				}
			},
		];

		var z;

		var f = function() {
			var canTakeCard = false;

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
				cards: Card.all(),
				tradedCards: [],
				states: states,
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
					that.pendingPlayers = that.players.slice(1);
					that.pendingArmies = 5;
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

				takeCard: function() {
					if (canTakeCard) {
						that.cards = _.shuffle(that.cards);
						that.currentPlayer.addCard(that.cards.pop());
						canTakeCard = false;
					}
				},

				tradeCard: function(card) {
					var country = that.currentPlayer.getCountry(card.countryId);
					if (country && that.currentPlayer.hasCard(card) && !that.isTradedCard(card)) {
						that.addArmies(country, 2);
						that.tradedCards.push(card);
					}
				},

				canAddArmies: function() {
					return [that.states.firstArmies, that.states.secondArmies, that.states.addArmies].indexOf(that.state) !== -1 && that.currentCountryFrom && that.currentPlayer.hasCountry(that.currentCountryFrom);
				},

				canRegroup: function() {
					var p = that.currentPlayer;
					if (!that.currentCountryTo || !that.currentCountryFrom) {
						return false;
					}
					var countryTo = that.extendCountry(that.currentCountryTo);
					var countryFrom = that.extendCountry(that.currentCountryFrom);
					return p && p.hasCountry(countryFrom) && p.hasCountry(countryFrom) && countryTo.limitsWith(countryFrom) && (that.state === states.regroup || that.state === states.attack);
				},

				attempAction: function(q) {
					that._countryAction(that.currentCountryFrom, that.currentCountryTo, q);
				},

				regroup: function() {
					if (that.state === states.attack) {
						that.state = states.regroup;
					}
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

				extendCountry: function(country) {
					var owner = _.find(that.players, function(p) {
						return p.hasCountry(country);
					});
					country.owner = owner;

					return country;
				},

				countryAction: function(country) {
					var picked1 = !!that.currentCountryFrom && !that.currentCountryTo;
					var picked2 = !!(that.currentCountryFrom && that.currentCountryTo);
					// var picked0 = !picked1 && !picked2;

					if (picked1 && that.currentCountryFrom.id === country.id) {
						that._countryAction(that.currentCountryFrom);
					}
					else if (picked1 && country.limitsWith(that.currentCountryFrom)) {
						that.currentCountryTo = that.extendCountry(country);
					}
					else if (picked2 && that.currentCountryTo.id === country.id) {
						that._countryAction(that.currentCountryFrom, that.currentCountryTo);
					} else { // || picked0
						that.currentCountryFrom = that.extendCountry(country);
						delete that.currentCountryTo;
					}
				},

				_countryAction: function(countryFrom, countryTo, q) {
					var p = that.currentPlayer;
					switch (that.state) {
						case states.firstArmies:
						case states.secondArmies:
						case states.addArmies:
							if (p.hasCountry(countryFrom) && that.pendingArmies > 0) {
								while (q-- && that.pendingArmies--) {
									that.addArmies(countryFrom, 1);
								}
							}
							break;
						case states.attack:
							if (countryTo && countryTo.limitsWith(countryFrom) && !p.hasCountry(countryTo)) {
								that.attack(countryFrom, countryTo, q);
							}
							break; // if you cant attack maybe you are trying to regroup
						case states.regroup:
							if (that.canRegroup()) {
								while (q-- && countryFrom.armies > 1) {
									that.addArmies(countryTo, 1);
									that.removeArmy(countryFrom);
								}
								that.state = states.regroup;
							}
							break;
						case states.afterCard:
							if (p.hasCountry(countryFrom)) {
								if (p.canUseCard(countryFrom)) {
									that.addArmies(countryFrom, 1);
									that.useCard(countryFrom);
								}
							}
							break;
					}
				},

				canAttack: function() {
					if (!that.currentCountryTo || !that.currentCountryFrom) {
						return false;
					}
					var defendingCountry = that.currentCountryTo;
					var attackingCountry = that.currentCountryFrom;
					return attackingCountry.owner === that.currentPlayer &&
						defendingCountry.owner !== that.currentPlayer &&
						attackingCountry.armies > 1 && that.state === states.attack;
				},

				attack: function(attackingCountry, defendingCountry, q) {
					if (that.canAttack()) {

						that.attacker = that.currentPlayer;
						var defender = that.defender = _.find(that.players, function(p) {
							return p.hasCountry(defendingCountry);
						});

						q = Math.min(3,q);

						var attackDices = Math.min(attackingCountry.armies-1, q);
						var defenseDices = Math.min(defendingCountry.armies, 3);
						var dices = Dice.roll(attackDices, defenseDices);
						that.dices = dices;

						for (var i=0; i < dices[0].length && i < dices[1].length; i++) {
							if (defendingCountry.armies === 0) {
								break;
							}
							if (i < defenseDices && dices[0][i] > dices[1][i]) {
								// (dices[0][i] > dices[1][--defenseDices])
								that.removeArmy(defendingCountry);
							} else {
								that.removeArmy(attackingCountry);
							}
						}

						if (defendingCountry.armies === 0) {
							canTakeCard = true;
							defender.removeCountry(defendingCountry);
							that.currentPlayer.addCountry(defendingCountry);
							that.removeArmy(attackingCountry);

							// Si murió, entrego las cartas
							if (defender.getCountries().length === 0) {
								_.each(defender.getCards(), function(c) {
									that.currentPlayer.addCard(c);
								});
							}
						}

						that.checkIfWon(defender);
					}
				},

				changeTurn: function() {
					canTakeCard = false;
					that.checkIfWon();

					if (that.pendingPlayers.length === 0) {
						if (that.state !== states.attack) {
							that.pendingPlayers = that.players.slice(0);
						} else {
							that.pendingPlayers = that.players.slice(1);
							that.pendingPlayers.push(that.players[0]);

							that.players = that.pendingPlayers.slice(0);
						}
						that.nextState();
					}
					that.currentPlayer = that.pendingPlayers.shift();

					switch (that.state) {
						case states.firstArmies:
							that.pendingArmies = 5;
							break;
						case states.secondArmies:
							that.pendingArmies = 3;
							break;
						case states.addArmies:
							that.pendingArmies = Math.round(that.currentPlayer.getCountries().length/2);
							break;
						default:
							that.pendingArmies = 0;
							break;
					}

					that.startTimer();
				},

				removeArmy: function(country) {
					that.currentPlayer.removeArmy();
					country.removeArmies(1);
				},

				addArmies: function(country, armies) {
					country.addArmies(armies);
				},

				checkIfWon: function(defender) {
					var objective = that.currentPlayer.getObjective();
					// Objetivo común
					if (that.currentPlayer.getCountries().length >= 30) {
						that.gameEnded();
					}

					// Objetivo de destrucción
					if (defender && objective.type === OBJECTIVES_TYPES.DESTROY && !defender.getCountries().length) {
						if (objective.value === defender.color) {
							that.gameEnded(); // ganó
						}
					// objetivo de conquista
					} else if (objective.type === OBJECTIVES_TYPES.CONQUER) {
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
				},

				isTradedCard: function(card) {
					return _.contains(that.tradedCards, card);
				},

				trade3Cards: function(cards) {
					that.currentPlayer.tradeCards(cards);
					switch (that.currentPlayer.cardTrades) {
						case 1:
							that.pendingArmies += 4;
							break;
						case 2:
							that.pendingArmies += 7;
							break;
						case 3:
							that.pendingArmies += 10;
							break;
						default:
							that.pendingArmies += (that.currentPlayer.cardTrades-1)*5;
							break;
					}
				},
				serialize: function() {
					return JSON.stringify(that);
				},
				parse: function(state) {
					angular.extend(that, JSON.parse(state));

					// initialize all instances
					that.cards = _.map(that.cards, function(c) {
						return Card.parse(c);
					});

					that.players = _.map(that.players, function(p) {
						return Player.parse(p);
					});
				}
			};

			if (localStorage.getItem('TEGdata')) {
				that.parse(localStorage.getItem('TEGdata'));
			}

			$interval(function() {
				localStorage.setItem('TEGdata', that.serialize());
			}, saveInterval);

			return that;
		};

		// Public API here
		return {
			'new': f,
			'states': states,
			'objectives': objectives,
			'colors': colors,
		};
	});
