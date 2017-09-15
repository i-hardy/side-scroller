describe('Score', function () {

var hermione;

beforeEach(function () {
  hermione = new Score();
});

describe('#points', function () {

    it('it starts with zero', function () {
      expect(hermione.points).toEqual(0);
    });

    it('increases points when called', function () {
      hermione.increase(100);
      expect(hermione.points).toEqual(100);
    });
  });

  describe('end of level bonus', function () {
    it('it awards end of level bonus if end is reached', function () {
      hermione.endBonus();
      expect(hermione.points).toEqual(hermione.END_BONUS);
    });
  });

  describe('precious object hitting ground', function() {
    it('score increase is triggered if object hits ground', function() {
      hermione.preciousObject.y = 250;
      hermione.hitGroundScore();
      expect(hermione.points).toEqual(hermione.preciousObject.preciousness);
    });
  });
});
