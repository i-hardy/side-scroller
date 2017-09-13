describe('Player', function() {

  var body = {};
  var bodyPartTwo = {};
  var bodyPartThree = {};

  beforeEach( function() {
    var Body = {};
    player = new Player(body);
  });

  describe('#getBody', function() {
    it('returns this._body', function() {
      expect(player.getBody()).toEqual(body)
    });
  });

  describe('#getObject', function() {
    it('returns this._object', function() {
      expect(player.getObject()).toEqual(player._object)
    });
  });

  describe('#addParts', function() {
    it('adds additional objects to this._bodyParts', function() {
      player.addParts(bodyPartTwo, bodyPartThree)
      expect(player._bodyParts).toEqual([body, bodyPartTwo, bodyPartThree])
    });
  });

  describe('#create', function() {
    it('updates this._object with a Matter Body.create object', function() {
      player.create();
      expect(bodyCheck).toEqual(true);
    });
  });

});
