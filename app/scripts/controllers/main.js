'use strict';

angular.module('tegApp')
	.controller('MainCtrl', function ($scope, $modal, TEG) {
		$scope.TEG = TEG['new']();
		var teg = $scope.TEG;

		$scope.addPlayer = function() {
			$modal.open({
				templateUrl: 'views/modals/addPlayer.html',
				controller: 'AddPlayerDlg',
				resolve: {
					colors: function() {
						return teg.colors;
					}
				}
			}).result.then(function(data){
				teg.addPlayer(data.color, data.name);
			});
		};


		$scope.pickCard = function(card) {
			card.active = !card.active;
		};

		$scope.trade = function() {
			var cards = _.filter($scope.TEG.currentPlayer.getCards(), { active: true });
			$scope.TEG.trade3Cards(cards);
		};

		$scope.canTrade3Cards = function() {
			var cards = _.filter($scope.TEG.currentPlayer.getCards(), { active: true });
			var res = false;

			if (cards.length === 3) {
				var allDifferent = _.reduce(cards, function(r, c) {
					return _.without(r, c.type);
				}, ['a','b','c']).length === 0;

				var allSame = _.all(cards, function(c) {
					return cards[0].type === c.type;
				});

				res = allDifferent || allSame;
			}

			return res;
		};
	})
	.controller('AddPlayerDlg', function(TEG, $scope, $modalInstance, colors) {
		$scope.data = {};
		$scope.colors = colors;
		$scope.ok = function () {
			$modalInstance.close($scope.data);
			return false;
		};
	});
