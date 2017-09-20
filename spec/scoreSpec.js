'use strict';

describe('Score', function () {

  var hermione;

  beforeEach(function () {
    hermione = new Score();
  });

  describe('#showPoints', function () {
    it('it returns the current points', function () {
      expect(hermione.showPoints()).toEqual(0);
    });
  });

  describe('#increase', function () {
    it('increases points when called', function () {
      hermione.increase(100);
      expect(hermione.showPoints()).toEqual(100);
    });
  });

  describe('end of level bonus', function () {
    it('it awards end of level bonus if end is reached', function () {
      hermione.endBonus(0.5);
      expect(hermione.points).toEqual(hermione.END_BONUS*0.5);
    });
  });

  describe('#calculateDestructionPercentage', function () {
    it('returns the percentage of objects knocked to the floor', function () {
      hermione.endBonus(0.5);
      expect(hermione.calculateDestructionPercentage()).toEqual("50%");
    });
  });
});
