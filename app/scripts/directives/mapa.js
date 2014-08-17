'use strict';

angular.module('tegApp')
	.directive('mapa', function () {
		return {
			templateUrl: 'images/mapa.svg',
			scope: {
				'ngModel': '='
			},
			restrict: 'E',
			link: function postLink($scope, element, attrs) {
				var teg = $scope.ngModel;
				var box = angular.element('<div></div>');
				element.after(box);
				element.find('g').find('g')
					.on('click', function(el){
						var country = $scope.find(el.currentTarget.id);
						if (country) {
							teg.countryAction(country);
						}
						$scope.$apply();
					}
				);
			},
			controller: 'mapaCtrl'
		};
	})

	.controller('mapaCtrl', function(Country, $scope) {
		var countries = Country.get();
		$scope.find = function(country) {
			return _.find(countries, {
				id: country
			});
		};

	});
