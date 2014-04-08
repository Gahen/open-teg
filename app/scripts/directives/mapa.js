'use strict';

angular.module('tegApp')
	.directive('mapa', function () {
		return {
			templateUrl: 'images/mapa.svg',
			restrict: 'E',
			link: function postLink(scope, element, attrs) {
				var box = angular.element('<div></div>');
				element.after(box);
				element.find('g').find('g')
					.on('click', function(el){
						box.text(el.currentTarget.id);
					}
				);
			}
		};
	});
