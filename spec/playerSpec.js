describe('Player', function() {

  var body = {};
  var bodyPartTwo = {};
  var bodyPartThree = {};

  beforeEach( function() {
    player = new Player(body);
  });

  describe('#getBodyObject', function() {
    it('returns this._object', function() {
      expect(player.getBodyObject()).toEqual(player.object);
    });
  });

  describe('#addParts', function() {
    it('adds additional objects to this._bodyParts', function() {
      player.addParts(bodyPartTwo);
      player.addParts(bodyPartThree);
      expect(player.getBodyParts()).toEqual([body, bodyPartTwo, bodyPartThree]);
    });
  });

  describe('#create', function() {
    it('updates this._object with a Matter Body.create object', function() {
      spyOn(Matter.Body, "create");
      player.create();
      expect(Matter.Body.create).toHaveBeenCalled();
    });
  });

});
