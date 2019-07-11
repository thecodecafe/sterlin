const mongoose = require('mongoose');
const Fixture = require('../../app/models/Fixture.model');

describe('<Fixture Model Validations>', () => {

  it('should be valid if season is passed', done => {
    const fixtures = new Fixture({season: mongoose.Types.ObjectId()});
    fixtures.validate(error => {
      expect(error.errors.season).toBeUndefined();
      done();
    })
  });

  it('should be valid if homeTeam is passed', done => {
    const fixtures = new Fixture({homeTeam: mongoose.Types.ObjectId()});
    fixtures.validate(error => {
      expect(error.errors.homeTeam).toBeUndefined();
      done();
    })
  });

  it('should be valid if awayTeam is passed', done => {
    const fixtures = new Fixture({awayTeam: mongoose.Types.ObjectId()});
    fixtures.validate(error => {
      expect(error.errors.awayTeam).toBeUndefined();
      done();
    })
  });

  it('should be invalid if homeGoals is not passed', done => {
    const fixtures = new Fixture();
    fixtures.validate(error => {
      expect(error.errors.homeGoals).toBeUndefined();
      expect(fixtures.homeGoals).toBe(0);
      done();
    })
  });

  it('should be valid if homeGoals is passed', done => {
    const fixtures = new Fixture({homeGoals: 'ten'});
    fixtures.validate(error => {
      expect(error.errors.homeGoals).toBeDefined();
      done();
    })
  });

  it('should be invalid if awayGoals is not passed', done => {
    const fixtures = new Fixture();
    fixtures.validate(error => {
      expect(error.errors.awayGoals).toBeUndefined();
      expect(fixtures.awayGoals).toBe(0);
      done();
    })
  });

  it('should be valid if awayGoals is passed', done => {
    const fixtures = new Fixture({awayGoals: 'ten'});
    fixtures.validate(error => {
      expect(error.errors.awayGoals).toBeDefined();
      done();
    })
  });

  it('should be invalid if starting time is not passed', done => {
    const fixtures = new Fixture();
    fixtures.validate(error => {
      expect(error.errors.startsAt).toBeDefined();
      done();
    })
  });

  it('should be invalid if ivalid starting time is passed', done => {
    const fixtures = new Fixture({ startsAt: 'start time' });
    fixtures.validate(error => {
      expect(error.errors.startsAt).toBeDefined();
      done();
    })
  });

  it('should be valid if correct starting time is passed', done => {
    const fixtures = new Fixture({startsAt: new Date().toUTCString()});
    fixtures.validate(error => {
      expect(error.errors.startsAt).toBeUndefined();
      done();
    })
  });

  it('should be invalid if ending time is not passed', done => {
    const fixtures = new Fixture();
    fixtures.validate(error => {
      expect(error.errors.endsAt).toBeDefined();
      done();
    })
  });

  it('should be invalid if ivalid ending time is passed', done => {
    const fixtures = new Fixture({ endsAt: 'end time' });
    fixtures.validate(error => {
      expect(error.errors.endsAt).toBeDefined();
      done();
    })
  });

  it('should be valid if correct ending time is passed', done => {
    const fixtures = new Fixture({endsAt: new Date().toUTCString()});
    fixtures.validate(error => {
      expect(error.errors.endsAt).toBeUndefined();
      done();
    })
  });
});