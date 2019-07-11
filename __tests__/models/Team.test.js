const Team = require('../../app/models/Team.model');

describe('<Team Model Validations>', () => {
  it('should be invalid if name is not passed', done => {
    const team = new Team();
    team.validate(error => {
      expect(error.errors.name).toBeDefined();
      done();
    })
  });

  it('should be valid if name is passed', done => {
    const team = new Team({name: 'Real Madrid'});
    team.validate(error => {
      expect(error.errors.name).toBeUndefined();
      done();
    })
  });

  it('should be invalid if stadium name is not passed', done => {
    const team = new Team();
    team.validate(error => {
      expect(error.errors.name).toBeDefined();
      done();
    })
  });

  it('should be valid if stadium name is passed', done => {
    const team = new Team({stadiumName: 'Santiago Bernabéu Stadium'});
    team.validate(error => {
      expect(error.errors.stadiumName).toBeUndefined();
      done();
    })
  });

  it('should be invalid if logo is not a url', done => {
    const team = new Team({logo: 'logo'});
    team.validate(error => {
      expect(error.errors.name).toBeDefined();
      done();
    })
  });

  it('should be valid if logo is a url', done => {
    const team = new Team({logo: 'http://google.com'});
    team.validate(error => {
      expect(error.errors.logo).toBeUndefined();
      done();
    })
  });
});