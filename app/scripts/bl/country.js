'use strict';

angular.module('tegApp')
	.factory('Country', function () {
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

		var mock = [
			{'id':'gran_bretana','continent':'europa','limits':['alemania','espana','islandia']},
			{'id':'alaska','continent':'america del norte','limits':['yukon','kamchatka','oregon']},
			{'id':'argentina','continent':'america del sur','limits':['chile','peru','brasil','uruguay']},
			{'id':'chile','continent':'america del sur','limits':['argentina','peru','australia']} ,
			{'id':'uruguay','continent':'america del sur','limits':['brasil','argentina']},
			{'id':'brasil','continent':'america del sur','limits':['uruguay','argentina','peru','colombia','sahara']},
			{'id':'sahara','continent':'africa','limits':['zaire','etiopia','egipto','espana','brasil']},
			{'id':'espana','continent':'europa','limits':['francia','sahara','gran_bretana']},
			{'id':'francia','continent':'europa','limits':['italia','alemania','espana']},
			{'id':'italia','continent':'europa','limits':['francia','alemania']},
			{'id':'alemania','continent':'europa','limits':['polonia','gran_bretana','francia','italia']},
			{'id':'egipto','continent':'africa','limits':['etiopia','madagascar','sahara','israel','turquia','polonia']},
			{'id':'madagascar','continent':'africa','limits':['egipto','zaire']},
			{'id':'oregon','continent':'america del norte','limits':['alaska','yukon','canada','nueva_york','california']},
			{'id':'groenlandia','continent':'america del norte','limits':['labrador','nueva_york','islandia']},
			{'id':'etiopia','continent':'africa','limits':['sudafrica','zaire','sahara','egipto']},
			{'id':'rusia','continent':'europa','limits':['polonia','turquia','iran','aral','suecia']},
			{'id':'nueva_york','continent':'america del norte','limits':['california','oregon','canada','terranova','groenlandia']},
			{'id':'terranova','continent':'america del norte','limits':['nueva_york','labrador','canada']},
			{'id':'canada','continent':'america del norte','limits':['yukon','oregon','nueva_york','terranova']},
			{'id':'polonia','continent':'europa','limits':['alemania','rusia','turquia','egipto']},
			{'id':'california','continent':'america del norte','limits':['mexico','nueva_york','oregon']},
			{'id':'mexico','continent':'america del norte','limits':['colombia','california']},
			{'id':'labrador','continent':'america del norte','limits':['groenlandia','terranova']},
			{'id':'yukon','continent':'america del norte','limits':['alaska','oregon','canada']},
			{'id':'peru','continent':'america del sur','limits':['colombia','brasil','argentina','chile']},
			{'id':'colombia','continent':'america del sur','limits':['peru','brasil','mexico']},
			{'id':'islandia','continent':'europa','limits':['gran_bretana','suecia','groenlandia']},
			{'id':'suecia','continent':'europa','limits':['rusia','islandia']},
			{'id':'turquia','continent':'asia','limits':['israel','arabia','iran','rusia','polonia','egipto']},
			{'id':'israel','continent':'asia','limits':['turquia','arabia','egipto']},
			{'id':'arabia','continent':'asia','limits':['israel','turquia']},
			{'id':'zaire','continent':'africa','limits':['sahara','etiopia','sudafrica','madagascar']},
			{'id':'sudafrica','continent':'africa','limits':['zaire','etiopia']},
			{'id':'australia','continent':'oceania','limits':['java','borneo','sumatra','chile']},
			{'id':'sumatra','continent':'oceania','limits':['india','australia']},
			{'id':'borneo','continent':'oceania','limits':['australia','malasia']},
			{'id':'java','continent':'oceania','limits':['australia']},
			{'id':'india','continent':'asia','limits':['sumatra','china','malasia','iran']},
			{'id':'malasia','continent':'asia','limits':['china','india']},
			{'id':'iran','continent':'asia','limits':['rusia','aral','mongolia','gobi','china','india','turquia']},
			{'id':'china','continent':'asia','limits':['japon','kamchatka','siberia','mongolia','gobi','iran','india','malasia']},
			{'id':'gobi','continent':'asia','limits':['china','mongolia','iran']},
			{'id':'mongolia','continent':'asia','limits':['china','siberia','aral','iran','gobi']},
			{'id':'siberia','continent':'asia','limits':['kamchatka','china','mongolia','aral','tartaria','tamir']},
			{'id':'aral','continent':'asia','limits':['tartaria','siberia','mongolia','iran','rusia']},
			{'id':'tartaria','continent':'asia','limits':['tamir','siberia','aral']},
			{'id':'tamir','continent':'asia','limits':['tartaria','siberia']},
			{'id':'kamchatka','continent':'asia','limits':['japon','china','siberia']},
			{'id':'japon','continent':'asia','limits':['kamchatka','china']}
		];

		function make(country) {
			var that = {
				armies: 0,
				__class: 'Country',
				addArmies: function(armies) {
					that.armies += armies;
				},
				removeArmies: function(armies) {
					that.addArmies(-armies);
				},
				setArmies: function(armies) {
					that.armies = armies;
				},
				limitsWith: function(c) {
					return _.contains(that.limits, c.id);
				},
				getId: _.constant(country.id),
				getName: function() {
					return dict[that.id];
				}
			};

			angular.extend(that, country);

			return that;
		}

		var get = _.memoize(function() {
			return _.map(mock, function(m) {
				return make(m);
			});
		});

		// Public API here
		return {
			make: make,
			get: get
		};
	});
