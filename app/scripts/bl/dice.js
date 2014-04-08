'use strict';

angular.module('tegApp')
	.factory('Dice', function () {
		return {
			roll: function(dices) {
				var pair = [[], []];
				while (dices--) {
					pair[0].push(Math.round(Math.random()*6+1));
					pair[1].push(Math.round(Math.random()*6+1));
				}
				return pair;
			}
		};
	});
