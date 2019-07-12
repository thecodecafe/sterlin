const User = require('../../app/models/User.model');

describe('<User Model Validations>', () => {
  it('should fail if name is not provided', done => {
    const user = new User();
    user.validate(error => {
      expect(error.errors.name).toBeDefined();
      done();
    })
  });

  it('should fail if email is not provided', done => {
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

  it('should fail if incorrect email is given', done => {
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

  it('should fail if password is not provided', (done) => {
    const user = new User();
    user.validate(error => {
      expect(error.errors.password).toBeDefined();
      done();
    });
  });

  it('should fail if no role is provided', done => {
    const user = new User();
    user.validate(error => {
      expect(error.errors.role).toBeDefined();
      done();
    })
  });

  it('should fail if an invalid role is provided', done => {
    const user = new User({role: 'role'});
    user.validate(error => {
      expect(error.errors.role).toBeDefined();
      done();
    })
  });
});