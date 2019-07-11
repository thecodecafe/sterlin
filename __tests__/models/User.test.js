const User = require('../../app/models/User.model');

describe('<User Model Validations>', () => {
  it('should be invalid if name is not passed', done => {
    const user = new User();
    user.validate(error => {
      expect(error.errors.name).toBeDefined();
      done();
    })
  });

  it('should be invalid if email is not passed', done => {
    try {
      const user = new User();
      user.validate(error => {
        expect(error.errors.email).toBeDefined();
        done();
      });
    }catch(e){
      done();
    }
  });

  it('should be invalid if incorrect email is given', done => {
    try{
      const user = new User({ email: 'bad emailaddress' });
      user.validate(error => {
        expect(error.errors.email).toBeDefined();
        done();
      });
    }catch(e){
      done();
    }
  });

  it('should be valid if correct email is given', done => {
    try {
      const user = new User({ email: 'jonel@example.com' });
      user.validate(error => {
        expect(error.errors.email).toBeUndefined();
        done();
      });
    } catch(e){
      done();
    }
  });

  it('should be invalid if password is not passed', (done) => {
    const user = new User();
    user.validate(error => {
      expect(error.errors.password).toBeDefined();
      done();
    });
  });
});