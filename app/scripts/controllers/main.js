'use strict';

angular.module('tegApp')
	.controller('MainCtrl', function ($scope, $modal, TEG) {
		$scope.TEG = TEG;
		$scope.addPlayer = function() {
			$modal.open({
				templateUrl: 'views/modals/addPlayer.html',
				controller: 'AddPlayerDlg'
			}).result.then(function(){
				// TEG.addPlayer(name, color);
			});
		};

	})
	.controller('AddPlayerDlg', function(TEG, $scope) {
		$scope.colors = TEG.colors;
	});
