'use strict';

describe("PlatformGrid", function () {
  var tooticky;

  beforeEach(function () {
    tooticky = new PlatformGrid();
    tooticky.setGrid();
  });

  describe('#setGrid', function () {
    it('creates an array based on the canvas height', function () {
      expect(tooticky.getGrid().length).toEqual(worldOptions.gridRows);
    });

    it('contains rows full of zeros', function () {
      tooticky.getGrid().forEach(function (row) {
        row.forEach(function (item) {
          expect(item).toEqual(0);
        });
      });
    });

    it('contains rows of a length based on the canvas width', function () {
      expect(tooticky.getGrid()[0].length).toEqual(worldOptions.gridColumns);
    });
  });

  describe('#setRow', function () {
    it('creates an array based on the canvas width', function () {
      expect(tooticky.setRow().length).toEqual(worldOptions.gridColumns);
    });
  });

  describe('#setGridElement', function () {
    it('can set a grid element to 1', function () {
      tooticky.setGridElement(0, 0);
      expect(tooticky.getGrid()[0][0]).toEqual(1);
    });
  });

  describe('#setFirstPlatform', function () {
    it('sets the first platform', function () {
      tooticky.setFirstPlatform();
      expect(tooticky.getGrid()[1][2]).toEqual(0);
    });

    it('records the x index of the platform', function () {
      tooticky.setFirstPlatform();
      expect(tooticky.lastX).toEqual(1);
    });

    it('records the y index of the platform', function () {
      tooticky.setFirstPlatform();
      expect(tooticky.lastY).toEqual(1);
    });
  });

  describe('#setPlatform', function() {
    it('sets subsequent platforms randomly', function() {
      tooticky.setFirstPlatform();
      tooticky.setPlatform();
      expect(tooticky.getGrid()[tooticky.lastY][tooticky.lastX]).toEqual(1);
    });

    it('sets an x index greater than the last x index', function() {
      tooticky.setFirstPlatform();
      tooticky.setPlatform();
      expect(tooticky.lastX).toBeGreaterThan(1);
      expect(tooticky.lastX).toBeLessThan(5);
    });

    it('does not create new platforms for x indices that are off the grid', function() {
      tooticky.setFirstPlatform();
      tooticky.setPlatform();
      expect(tooticky.lastX).toBeLessThan(worldOptions.gridColumns);
    });

    it('calls itself recursively in case of inaccessible platform', function () {
      var testtooticky = tooticky.setPlatform.bind(tooticky);
      spyOn(tooticky, 'detectInaccessiblePlatform').and.returnValue(true);
      spyOn(tooticky, 'setPlatform');
      tooticky.setFirstPlatform();
      testtooticky();
      expect(tooticky.setPlatform).toHaveBeenCalled();
    });

    it('places platforms if accessibility check is passed', function () {
      spyOn(tooticky, 'detectInaccessiblePlatform').and.returnValue(false);
      spyOn(tooticky, 'placePlatforms');
      tooticky.setFirstPlatform();
      tooticky.setPlatform();
      expect(tooticky.placePlatforms).toHaveBeenCalled();
    });

    it('calls setYCoordinates when building the grid', function () {
      spyOn(tooticky, 'setYCoordinates').and.callThrough();
      tooticky.setFirstPlatform();
      tooticky.setPlatform();
      expect(tooticky.setYCoordinates).toHaveBeenCalled();
    });
  });

  describe('#buildPlatforms', function () {
    beforeEach(function () {
      spyOn(tooticky, 'setGrid').and.callThrough();
      spyOn(tooticky, 'setFirstPlatform').and.callThrough();
      spyOn(tooticky, 'setPlatform').and.callThrough();
      tooticky.buildPlatforms(worldOptions.gridColumns);
    });

    it('creates the initial grid', function () {
      expect(tooticky.setGrid).toHaveBeenCalled();
    });

    it('sets the first platform', function () {
      expect(tooticky.setFirstPlatform).toHaveBeenCalled();
    });

    it('sets subsequent platforms', function () {
      expect(tooticky.setPlatform).toHaveBeenCalled();
    });
  });

  describe('#detectInaccessiblePlatform', function () {
    beforeEach(function () {
      tooticky.secondlastX = 1;
      tooticky.secondlastY = 3;
      tooticky.lastX = 2;
      tooticky.lastY = 2;
    });

    it('should be able to register an inaccessible platform', function () {
      expect(tooticky.detectInaccessiblePlatform(3, 3)).toBe(true);
    });

    it('returns false if there is sufficient gap on x', function () {
      expect(tooticky.detectInaccessiblePlatform(4, 3)).toBe(false);
    });

    it('returns false if there is sufficient gap on y', function () {
      expect(tooticky.detectInaccessiblePlatform(3, 4)).toBe(false);
    });
  });

  describe('#placePlatforms', function () {
    it('places accessible platforms when called', function () {
      spyOn(tooticky, 'setGridElement');
      tooticky.placePlatforms(3, 4);
      expect(tooticky.setGridElement).toHaveBeenCalled();
    });
  });

  describe('#setYCoordinates', function () {
    it('returns a higher number if y would stay in the grid', function () {
      tooticky.lastY = 2;
      expect(tooticky.setYCoordinates(1)).toEqual(3);
    });

    it('returns a lower number if y would be bigger value than grid', function () {
      tooticky.lastY = worldOptions.gridRows;
      expect(tooticky.setYCoordinates(1)).toEqual(worldOptions.gridRows-1)
    });

    it('returns a lower number if y + lastY is negative', function () {
      tooticky.lastY = 0;
      expect(tooticky.setYCoordinates(-1)).toEqual(1);
    });
  });
});
