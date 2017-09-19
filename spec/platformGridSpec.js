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

    it('sets subsequent y indices randomly, and does not set platforms which have indices off the grid', function() {
      tooticky.setFirstPlatform();
      tooticky.setPlatform();
      expect(tooticky.lastY).toBeGreaterThan(0);
      expect(tooticky.lastY).toBeLessThan(worldOptions.gridRows);
    });

    it('does not create new platforms for x indices that are off the grid', function() {
      tooticky.setFirstPlatform();
      tooticky.setPlatform();
      expect(tooticky.lastX).toBeLessThan(worldOptions.gridColumns);
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
});
