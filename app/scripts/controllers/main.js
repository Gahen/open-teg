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


		teg.addPlayer(teg.colors.black, "jugador 1");
		teg.addPlayer(teg.colors.red, "jugador 2");
		teg.addPlayer(teg.colors.green, "jugador 3");
	})
	.controller('AddPlayerDlg', function(TEG, $scope, $modalInstance, colors) {
		$scope.data = {};
		$scope.colors = colors;
		$scope.ok = function () {
			$modalInstance.close($scope.data);
			return false;
		};
	});
