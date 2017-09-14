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
});
