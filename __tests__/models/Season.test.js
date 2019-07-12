const Season = require('../../app/models/Season.model');

describe('<Season Model Validations>', () => {
  it('should be invalid if name is not passed', done => {
    const season = new Season();
    season.validate(error => {
      expect(error.errors.name).toBeDefined();
      done();
    })
  });

  it('should be valid if name is passed', done => {
    const season = new Season({name: 'Real Madrid'});
    season.validate(error => {
      expect(error.errors.name).toBeUndefined();
      done();
    })
  });

  it('should be invalid if starting date is not passed', done => {
    const season = new Season();
    season.validate(error => {
      expect(error.errors.startDate).toBeDefined();
      done();
    })
  });

  it('should be invalid if ivalid starting date is passed', done => {
    const season = new Season({ startDate: 'start time' });
    season.validate(error => {
      expect(error.errors.startDate).toBeDefined();
      done();
    })
  });

  it('should be valid if correct starting date is passed', done => {
    const season = new Season({startDate: new Date().toUTCString()});
    season.validate(error => {
      expect(error.errors.startDate).toBeUndefined();
      done();
    })
  });

  it('should be invalid if ending date is not passed', done => {
    const season = new Season();
    season.validate(error => {
      expect(error.errors.endDate).toBeDefined();
      done();
    })
  });

  it('should be invalid if ivalid ending date is passed', done => {
    const season = new Season({ endDate: 'end time' });
    season.validate(error => {
      expect(error.errors.endDate).toBeDefined();
      done();
    })
  });

  it('should be valid if correct ending date is passed', done => {
    const season = new Season({endDate: new Date().toUTCString()});
    season.validate(error => {
      expect(error.errors.endDate).toBeUndefined();
      done();
    })
  });
});