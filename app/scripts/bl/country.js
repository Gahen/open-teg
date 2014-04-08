'use strict';

angular.module('tegApp')
	.factory('Country', function () {
		var mock = [{'id':'gran_bretana'},{'id':'argentina'},{'id':'chile'},{'id':'uruguay'},{'id':'brasil'},{'id':'sahara'},{'id':'espana'},{'id':'francia'},{'id':'italia'},{'id':'alemania'},{'id':'egipto'},{'id':'madagascar'},{'id':'oregon'},{'id':'alaska'},{'id':'groenlandia'},{'id':'etiopia'},{'id':'rusia'},{'id':'nueva_york'},{'id':'terranova'},{'id':'canada'},{'id':'polonia'},{'id':'california'},{'id':'mexico'},{'id':'labrador'},{'id':'yukon'},{'id':'peru'},{'id':'colombia'},{'id':'islandia'},{'id':'suecia'},{'id':'turquia'},{'id':'israel'},{'id':'arabia'},{'id':'zaire'},{'id':'sudafrica'},{'id':'australia'},{'id':'sumatra'},{'id':'borneo'},{'id':'java'},{'id':'india'},{'id':'malasia'},{'id':'iran'},{'id':'china'},{'id':'gobi'},{'id':'mongolia'},{'id':'siberia'},{'id':'aral'},{'id':'tartaria'},{'id':'tamir'},{'id':'kamchatka'},{'id':'japon'}];
		// Service logic
		// ...

		var meaningOfLife = 42;

		// Public API here
		return {
			someMethod: function () {
				return meaningOfLife;
			}
		};
	});