'use strict';

describe('Service: Dice', function () {

	// load the service's module
	beforeEach(module('tegApp'));

	// instantiate service
	var Dice;
	beforeEach(inject(function (_Dice_) {
		Dice = _Dice_;
	}));

	it('should throw with invalid parameters', function () {
		expect(Dice.roll.bind(null)).toThrow();
		expect(Dice.roll.bind(null, 1)).toThrow();
		expect(Dice.roll.bind(null, null, 1)).toThrow();
		expect(Dice.roll.bind(null, -1, 1)).toThrow();
		expect(Dice.roll.bind(null, 1, -1)).toThrow();
		expect(Dice.roll.bind(null, Infinity, 1)).toThrow();
		expect(Dice.roll.bind(null, 1, 0)).toThrow();
	});

	it('should return 2 dices', function() {
		expect(Dice.roll(2,2).length).toBe(2);
	});

	it('should roll valid dices', function() {
		var t = 100;
		while (t--) {
			var dices = Dice.roll(1,1);
			expect(dices[1]<7).toBe(true);
			expect(dices[1]>0).toBe(true);
			expect(dices[0]<7).toBe(true);
			expect(dices[0]>0).toBe(true);
		}
	});
});
