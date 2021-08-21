const { Activity, Country, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Activity model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validaciones', () => {
    beforeEach(() => Activity.sync({ force: false }));
    describe('Model', () => {
      it('Must include a valid difficulty', (done) => {
        Activity.create({ id: '666', name: "dance", difficulty: "6", duration: 2, season: "Winter" })
          .then(() => done(new Error('Must include a valid difficulty')))
          .catch(() => done());
      });
      it('Must include a name', function (done) {
        Activity.create({
          duration: 'Hola',
        })
          .then(() => done('No debería haberse creado'))
          .catch(() => done());
      });
    });
  });
  describe('Validaciones', () => {
    beforeEach(() => Country.sync({ force: false }));
    describe('Model', () => {
      it('Must include a valid code', (done) => {
        Country.create({ code: 22})
          .then(() => done(new Error('Code must be a string')))
          .catch(() => done());
      });
      it('Should have a valid value for Season', function (done) {
        Country.create({
          name: 'Testear',
          duration: 40,
          season: 'autumnn',
          difficulty: 5
        })
          .then(() => done('No debería haberse creado'))
          .catch(() => done());
      });
    });
  });


});