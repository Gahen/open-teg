'use strict';

angular.module('tegApp')
	.directive('mapa', function ($window) {
		var dict = {
			'gran_bretana': 'Gran Bretaña',
			'alaska': 'Alaska',
			'argentina': 'Argentina',
			'chile': 'Chile',
			'uruguay': 'Uruguay',
			'brasil': 'Brasil',
			'sahara': 'Sahara',
			'espana': 'España',
			'francia': 'Francia',
			'italia': 'Italia',
			'alemania': 'Alemania',
			'egipto': 'Egipto',
			'madagascar': 'Madagascar',
			'oregon': 'Oregon',
			'groenlandia': 'Groenlandia',
			'etiopia': 'Etiopia',
			'rusia': 'Rusia',
			'nueva_york': 'Nueva York',
			'terranova': 'Terranova',
			'canada': 'Canada',
			'polonia': 'Polonia',
			'california': 'California',
			'mexico': 'Mexico',
			'labrador': 'Labrador',
			'yukon': 'Yukon',
			'peru': 'Peru',
			'colombia': 'Colombia',
			'islandia': 'Islandia',
			'suecia': 'Suecia',
			'turquia': 'Turquia',
			'israel': 'Israel',
			'arabia': 'Arabia',
			'zaire': 'Zaire',
			'sudafrica': 'Sudafrica',
			'australia': 'Australia',
			'sumatra': 'Sumatra',
			'borneo': 'Borneo',
			'java': 'Java',
			'india': 'India',
			'malasia': 'Malasia',
			'iran': 'Iran',
			'china': 'China',
			'gobi': 'Gobi',
			'mongolia': 'Mongolia',
			'siberia': 'Siberia',
			'aral': 'Aral',
			'tartaria': 'Tartaria',
			'tamir': 'Tamir',
			'kamchatka': 'Kamchatka',
			'japon': 'Japon'
		};

		return {
			templateUrl: 'images/mapa.svg',
			scope: {
				'ngModel': '='
			},
			restrict: 'E',
			link: function postLink($scope, element) {
				var teg = $scope.ngModel;
				var box = angular.element('<div></div>');
				var last;
				element.after(box);

				var setOwnerColor = function(c) {
					var country = $scope.find(c.id);
					var el = angular.element(c);
					if (country) {
						$scope.$watch(function() {
							return teg.extendCountry(country).owner;
						}, function(o) {
							if (o) {
								el.attr('class', o.color);
							}
						});

						// Texto y cantidad
						$scope.$watch(function() {
							return country.armies;
						}, function(o) {
							el.find('tspan').text(dict[country.id] + (country.armies ? ' ('+country.armies+')':''));
						});

						// nombres
						el.find('tspan').text(dict[country.id]);
					}
				};

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

						/*
						if (last) {
							setOwnerColor(last);
						}
						last = event.currentTarget;
						*/

						angular.element(last).attr('class', 'active');
						$scope.$apply();
					});

				angular.forEach(gs, setOwnerColor);

				function resize() {
					var scale = element[0].offsetWidth / element.find('g')[0].getBoundingClientRect().width;
					element.find('g')[0].setAttribute('transform', 'scale('+scale+')');
					element.parent().css('height', (element.find('g')[0].getBoundingClientRect().height)+'px');
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
