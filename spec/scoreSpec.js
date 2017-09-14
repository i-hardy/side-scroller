describe('Score', function () {

var hermione;
var cat;

beforeEach(function () {
  hermione = new Score();
  cat = jasmine.createSpyObj('cat', ['getX']);
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
      cat.getX.and.returnValue(512);
      hermione.endBonus();
      expect(hermione.points).toEqual(hermione.END_BONUS);
    });
  });
});
