'use strict';

angular.module('tegApp')
	.directive('mapa', function ($window) {
		return {
			templateUrl: 'images/mapa.svg',
			scope: {
				'ngModel': '='
			},
			restrict: 'E',
			link: function postLink($scope, element) {
				var cc;
				var teg = $scope.ngModel;
				var box = angular.element('<div></div>');
				element.after(box);
				var gs = element.find('g').find('g').find('g')
					.on('dblclick', function(event){
						event.preventDefault();
					})
					.on('click', function(event){
						event.preventDefault();
						var country = $scope.find(event.currentTarget.id);
						if (country) {
							teg.countryAction(country);
						}
						$scope.$apply();
					});
				angular.forEach(gs, function(c) {
					var country = $scope.find(c.id);
					if (country) {
						$scope.$watch(function() {
							return teg.extendCountry(country).owner;
						}, function(o) {
							if (o) {
								angular.element(c).addClass(o.color);
							}
						});
					}
				});

				function resize() {
					var scale = element[0].offsetWidth / element.find('g')[0].getBoundingClientRect().width;
					element.find('g')[0].setAttribute('transform', 'scale('+scale+')');
					element.parent().css('height', element.find('g')[0].getBoundingClientRect().width+'px');
				}
				resize();
				$window.onresize = resize;
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
