'use strict';

angular.module('tegApp')
	.factory('Country', function () {
		var mock = [
			{
					"id": "gran_bretana",
					"continent": "europa"
			},
			{
					"id": "argentina",
					"continent": "america del sur"
			},
			{
					"id": "chile",
					"continent": "america del sur"
			},
			{
					"id": "uruguay",
					"continent": "america del sur"
			},
			{
					"id": "brasil",
					"continent": "america del sur"
			},
			{
					"id": "sahara",
					"continent": "africa"
			},
			{
					"id": "espana",
					"continent": "europa"
			},
			{
					"id": "francia",
					"continent": "europa"
			},
			{
					"id": "italia",
					"continent": "europa"
			},
			{
					"id": "alemania",
					"continent": "europa"
			},
			{
					"id": "egipto",
					"continent": "africa"
			},
			{
					"id": "madagascar",
					"continent": "africa"
			},
			{
					"id": "oregon",
					"continent": "america del norte"
			},
			{
					"id": "alaska",
					"continent": "america del norte"
			},
			{
					"id": "groenlandia",
					"continent": "america del norte"
			},
			{
					"id": "etiopia",
					"continent": "africa"
			},
			{
					"id": "rusia",
					"continent": "europa"
			},
			{
					"id": "nueva_york",
					"continent": "america del norte"
			},
			{
					"id": "terranova",
					"continent": "america del norte"
			},
			{
					"id": "canada",
					"continent": "america del norte"
			},
			{
					"id": "polonia",
					"continent": "europa"
			},
			{
					"id": "california",
					"continent": "america del norte"
			},
			{
					"id": "mexico",
					"continent": "america del norte"
			},
			{
					"id": "labrador",
					"continent": "america del norte"
			},
			{
					"id": "yukon",
					"continent": "america del norte"
			},
			{
					"id": "peru",
					"continent": "america del sur"
			},
			{
					"id": "colombia",
					"continent": "america del sur"
			},
			{
					"id": "islandia",
					"continent": "europa"
			},
			{
					"id": "suecia",
					"continent": "europa"
			},
			{
					"id": "turquia",
					"continent": "asia"
			},
			{
					"id": "israel",
					"continent": "asia"
			},
			{
					"id": "arabia",
					"continent": "asia"
			},
			{
					"id": "zaire",
					"continent": "africa"
			},
			{
					"id": "sudafrica",
					"continent": "africa"
			},
			{
					"id": "australia",
					"continent": "oceania"
			},
			{
					"id": "sumatra",
					"continent": "oceania"
			},
			{
					"id": "borneo",
					"continent": "oceania"
			},
			{
					"id": "java",
					"continent": "oceania"
			},
			{
					"id": "india",
					"continent": "asia"
			},
			{
					"id": "malasia",
					"continent": "asia"
			},
			{
					"id": "iran",
					"continent": "asia"
			},
			{
					"id": "china",
					"continent": "asia"
			},
			{
					"id": "gobi",
					"continent": "asia"
			},
			{
					"id": "mongolia",
					"continent": "asia"
			},
			{
					"id": "siberia",
					"continent": "asia"
			},
			{
					"id": "aral",
					"continent": "asia"
			},
			{
					"id": "tartaria",
					"continent": "asia"
			},
			{
					"id": "tamir",
					"continent": "asia"
			},
			{
					"id": "kamchatka",
					"continent": "asia"
			},
			{
					"id": "japon",
					"continent": "asia"
			}
		];

	function make(country) {
		var that = {
			__class: 'Country',
			addArmies: function(armies) {
				that.armies += armies;
			},
			removeArmy: function() {
				that.armies--;
			},
			setArmies: function(armies) {
				that.armies = armies;
			},
			getId: _.constant(country.id)
		};

		angular.extend(that, country);

		return that;
	}
	function get() {
		return _.map(mock, function(m) {
			return make(m);
		});
	}

	// Public API here
	return {
		make: make,
		get: get
	};
	});
