'use strict';

describe('OpeningScreen', function () {
  var timmy;

  beforeEach(function () {
    timmy = new OpeningScreen();
  });

  describe("#getTitle", function () {
    it('returns the name of the game', function () {
      expect(timmy.getTitle()).toEqual("KittyGame");
    });
  });

  describe('#getRules', function () {
    it('returns the rules as an array', function () {
      expect(timmy.getRules()).toEqual(jasmine.any(Array));
    });

    it('returns an array of which each element is a string', function () {
      timmy.getRules().forEach(function (rule) {
        expect(rule).toEqual(jasmine.any(String));
      });
    });
  });

  describe('#draw', function () {
    it('writes the game name and rules on the canvas', function () {
      spyOn(context, 'fillText');
      timmy.draw();
      expect(context.fillText.calls.count()).toEqual(timmy.getRules().length + 1);
    });
  });
});
