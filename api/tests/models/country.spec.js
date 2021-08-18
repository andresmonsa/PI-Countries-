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
      it('error sin name', function (done) {
        Activity.create({
          duration: 'Hola',
        })
          .then(() => done('No debería haberse creado'))
          .catch(() => done());
      });
    });
  });


});