'use strict';

angular.module('tegApp', [
	'ngCookies',
	'ngResource',
	'ngSanitize',
	'ngRoute',
    'ui.bootstrap'
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
