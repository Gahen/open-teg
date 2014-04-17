'use strict';

angular.module('tegApp', [
	'ngCookies',
	'ngResource',
	'ngSanitize',
	'ngRoute',
	'assert'
])
	.config(function ($routeProvider) {
		$routeProvider
			.when('/', {
				templateUrl: 'views/main.html',
				controller: 'MainCtrl'
			})
			.otherwise({
				redirectTo: '/'
			});
	});
