const mockingoose = require('mockingoose').default;
const User = require('../../app/models/User.model');
const Repo = require('../../app/repositories/User.repository');
const { userDoc, password } = require('../stubs/mock-date.user');

describe('<UserRepository.findByEmailAndPassword>', () => {
  // reset mongoose first
  beforeEach(() => mockingoose(User).reset());

  // we should expect a user
  it('should return a user', async (done) => {
    // set document to return when findOne is called on user
    mockingoose(User).toReturn(userDoc, 'findOne');
    // get the user
    const user = await Repo.findByEmailAndPassword(userDoc.email, password);
    // check user data
    expect(user).toBeDefined();
    expect(user._id).toBeDefined();
    expect(user.email).toBeDefined();
    expect(user.password).toBeDefined();
    done();
  });

  it('should fail for incorrect password', async (done) => {
    // set document to return when findOne is called on user
    mockingoose(User).toReturn(userDoc, 'findOne');
    try{
      await Repo.findByEmailAndPassword(userDoc.email, 'foo');
    }catch(error){
      // check user data
      expect(error.message).toMatch(/credential/);
      // end test
      done();
    }
  });

  it('should fail for incorrect email address', async (done) => {
    // set document to return when findOne is called on user
    mockingoose(User).toReturn(null, 'findOne');
    try{
      await Repo.findByEmailAndPassword(userDoc.email, userDoc.password);
    }catch(error){
      // check user data
      expect(error.message).toMatch(/credential/);
      // end test
      done();
    }
  });
});

describe('UserRepository.Create', () => {
  // reset mongoose first
  beforeEach(() => mockingoose(User).reset());

  it('should create a new user and return the user\'s info', async (done) => {
    // return doc when save is called
    mockingoose(User).toReturn(userDoc, 'save');
    // create user 
    const user = await Repo.create({...userDoc, password: password});
    // test response
    expect(user).toBeDefined();
    expect(user._id).toBeDefined();
    expect(user.name).toBeDefined();
    expect(user.email).toBeDefined();
    expect(user.password).toBeDefined();
    // end test
    done();
  });

  it('should fail hashing when a password is not passed', async (done) => {
    // return doc when save is called
    mockingoose(User).toReturn(null, 'save');
    try{
      // create user 
      await Repo.create({});
    }catch(error){
      // test response
      expect(error.message).toMatch(/hash/);
    }
    // end test
    done();
  });

  it('should fail when nothing is passed', async (done) => {
    // return doc when save is called
    mockingoose(User).toReturn(null, 'save');
    try{
      // create user 
      await Repo.create();
    }catch(error){
      // test response
      expect(error.message).toMatch(/destructure/);
    }
    // end test
    done();
  });

  it('should fail if user info is missing', async (done) => {
    // return doc when save is called
    mockingoose(User).toReturn(null, 'save');
    try{
      // create user 
      await Repo.create({password: 'password'});
    }catch(error){
      // test response
      expect(error.name).toBe('ValidationError');
    }
    // end test
    done();
  });
});