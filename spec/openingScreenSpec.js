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

  describe("#getMute", function () {
    it('returns the theme mute instruction', function () {
      expect(timmy.getMute()).toEqual("music off/on = m");
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
    beforeEach(function () {
      spyOn(context, 'drawImage');
      spyOn(context, 'fillText');
      spyOn(context, 'fillRect');
      timmy.draw();
    });

    it('draws the background image', function () {
      expect(context.drawImage).toHaveBeenCalled();
    });

    it('draws a box for the text to go on', function () {
      expect(context.fillRect).toHaveBeenCalled();
    });

    it('writes the game name, mute button and rules on the canvas', function () {
      expect(context.fillText.calls.count()).toEqual(timmy.getRules().length + 2);
    });
  });
});
