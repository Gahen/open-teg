'use strict';

angular.module('tegApp')
	.factory('Card', function (Country) {
		var types = [{'countryId':'gran_bretana','value':'b'},{'countryId':'argentina','value':'b'},{'countryId':'chile','value':'a'},{'countryId':'uruguay','value':'a'},{'countryId':'brasil','value':'a'},{'countryId':'sahara','value':'b'},{'countryId':'espana','value':'a'},{'countryId':'francia','value':'a'},{'countryId':'italia','value':'c'},{'countryId':'alemania','value':'b'},{'countryId':'egipto','value':'a'},{'countryId':'madagascar','value':'a'},{'countryId':'oregon','value':'c'},{'countryId':'alaska','value':'a'},{'countryId':'groenlandia','value':'b'},{'countryId':'etiopia','value':'a'},{'countryId':'rusia','value':'a'},{'countryId':'nueva_york','value':'b'},{'countryId':'terranova','value':'c'},{'countryId':'canada','value':'c'},{'countryId':'polonia','value':'b'},{'countryId':'california','value':'a'},{'countryId':'mexico','value':'a'},{'countryId':'labrador','value':'c'},{'countryId':'yukon','value':'b'},{'countryId':'peru','value':'a'},{'countryId':'colombia','value':'a'},{'countryId':'islandia','value':'a'},{'countryId':'suecia','value':'a'},{'countryId':'turquia','value':'a'},{'countryId':'israel','value':'c'},{'countryId':'arabia','value':'c'},{'countryId':'zaire','value':'b'},{'countryId':'sudafrica','value':'a'},{'countryId':'australia','value':'a'},{'countryId':'sumatra','value':'a'},{'countryId':'borneo','value':'c'},{'countryId':'java','value':'b'},{'countryId':'india','value':'b'},{'countryId':'malasia','value':'c'},{'countryId':'iran','value':'c'},{'countryId':'china','value':'b'},{'countryId':'gobi','value':'b'},{'countryId':'mongolia','value':'a'},{'countryId':'siberia','value':'b'},{'countryId':'aral','value':'b'},{'countryId':'tartaria','value':'a'},{'countryId':'tamir','value':'b'},{'countryId':'kamchatka','value':'c'},{'countryId':'japon','value':'b'}];

		function make(c) {
			if (c.__class !== 'Country') {
				c = Country.make(c);
			}
			if (!_.find(types, {countryId: c.id})) { return null; }
			var type = _.find(types, {countryId: c.id}).value;

			var that = {
				country: c,
				type: type, // optimization for searchs
				getCountry: _.constant(c),
				getType: _.constant(type)
			};

			return that;
		}

		return {
			make: make
		};
	}
);
