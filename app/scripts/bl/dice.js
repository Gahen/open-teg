'use strict';

angular.module('tegApp')
	.factory('Dice', function () {
		return {
			roll: function(first, second) {
				if (!first || !second || first < 1 || first > 3 || second < 1 || second > 3) {
					throw new Error('Dice.roll: invalid parameters');
				}
				var pair = [[], []];
				while (first--) {
					pair[0].push(Math.ceil(Math.random()*6));
				}
				while (second--) {
					pair[1].push(Math.ceil(Math.random()*6));
				}

				pair[0].sort().reverse();
				pair[1].sort().reverse();
				return pair;
			}
		};
	});
