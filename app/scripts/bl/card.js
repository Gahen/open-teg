'use strict';

angular.module('tegApp')
	.factory('Card', function (Country) {
		var typeName = {
			'a': 'barco',
			'b': 'globo',
			'c': 'cañón'
		};

		var types = [{'id':'gran_bretana','value':'b'},{'id':'argentina','value':'b'},{'id':'chile','value':'a'},{'id':'uruguay','value':'a'},{'id':'brasil','value':'a'},{'id':'sahara','value':'b'},{'id':'espana','value':'a'},{'id':'francia','value':'a'},{'id':'italia','value':'c'},{'id':'alemania','value':'b'},{'id':'egipto','value':'a'},{'id':'madagascar','value':'a'},{'id':'oregon','value':'c'},{'id':'alaska','value':'a'},{'id':'groenlandia','value':'b'},{'id':'etiopia','value':'a'},{'id':'rusia','value':'a'},{'id':'nueva_york','value':'b'},{'id':'terranova','value':'c'},{'id':'canada','value':'c'},{'id':'polonia','value':'b'},{'id':'california','value':'a'},{'id':'mexico','value':'a'},{'id':'labrador','value':'c'},{'id':'yukon','value':'b'},{'id':'peru','value':'a'},{'id':'colombia','value':'a'},{'id':'islandia','value':'a'},{'id':'suecia','value':'a'},{'id':'turquia','value':'a'},{'id':'israel','value':'c'},{'id':'arabia','value':'c'},{'id':'zaire','value':'b'},{'id':'sudafrica','value':'a'},{'id':'australia','value':'a'},{'id':'sumatra','value':'a'},{'id':'borneo','value':'c'},{'id':'java','value':'b'},{'id':'india','value':'b'},{'id':'malasia','value':'c'},{'id':'iran','value':'c'},{'id':'china','value':'b'},{'id':'gobi','value':'b'},{'id':'mongolia','value':'a'},{'id':'siberia','value':'b'},{'id':'aral','value':'b'},{'id':'tartaria','value':'a'},{'id':'tamir','value':'b'},{'id':'kamchatka','value':'c'},{'id':'japon','value':'b'}];

		function make(c) {
			if (c.__class !== 'Country') {
				c = Country.make(c);
			}
			if (!_.find(types, {id: c.id})) { return null; }
			var type = _.find(types, {id: c.id}).value;

			var that = {
				country: c,
				type: type, // optimization for searchs
				getCountry: _.constant(c),
				getType: _.constant(typeName[type])
			};

			return that;
		}

		function all() {
			return _.map(types, function(t) {
				return make(t);
			});
		}

		return {
			make: make,
			all: all
		};
	}
);
