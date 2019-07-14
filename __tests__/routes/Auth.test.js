require('../../configs/dotenv');
const request = require('supertest');
const app = require('../stubs/run-app.fn');
const mockingoose = require('mockingoose').default;
const UserModel = require('../../app/models/User.model');
const { userDoc } = require('../stubs/mock-date.user');
const { validLogin, invalidLoginEmail, validSignUp, invalidSignUp } = require('../stubs/mock-request.auth');
app.use('/auth', require('../../routes/Auth'));

describe('<AuthRoutes.Login>', () => {
  it('should return a token and a user', () => {
    mockingoose(UserModel).toReturn(userDoc, 'findOne');
    return request(app)
      .post('/auth/login')
      .send(validLogin.body)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(({body}) => {
        expect(body).toBeDefined();
        expect(body.success).toBe(true);
        expect(body.data).toBeDefined();
        expect(body.data.token).toBeDefined();
        expect(body.data.user).toBeDefined();
        expect(body.data.user.name).toBeDefined();
        expect(body.data.user.email).toBeDefined();
        expect(body.data.user.id).toBeDefined();
      })
  });

  it('should return a bad request response', () => {
    mockingoose(UserModel).toReturn(null, 'findOne');
    return request(app)
      .post('/auth/login')
      .send(validLogin.body)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)
      .then(({body}) => {
        expect(body).toBeDefined();
        expect(body.success).toBe(false);
        expect(body.data).toBeUndefined();
        expect(body.message).toBeDefined();
        expect(body.message).toMatch(/credentials/i);
      })
  });

  it('should return unprecessible entity error', () => {
    return request(app)
      .post('/auth/login')
      .send(invalidLoginEmail.body)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)
      .expect(422)
      .then(({body}) => {
        expect(body).toBeDefined();
        expect(body.success).toBe(false);
        expect(body.data).toBeUndefined();
        expect(body.message).toBeDefined();
        expect(body.message).toMatch(/validation/i);
        expect(body.meta).toBeDefined();
        expect(body.meta.errors).toBeDefined();
        expect(body.meta.errors.email).toBeDefined();
      })
  });

  afterEach(() => mockingoose(UserModel).reset())
});

describe('<AuthRoutes.SignUp>', () => {
  beforeAll(() => mockingoose(UserModel).reset())

  it('should return a token and a user', () => {
    mockingoose(UserModel).toReturn(0, 'count');
    mockingoose(UserModel).toReturn(userDoc, 'save');
    return request(app)
      .post('/auth/signup')
      .send(validSignUp.body)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
      .then(({body}) => {
        expect(body).toBeDefined();
        expect(body.success).toBe(true);
        expect(body.data).toBeDefined();
        expect(body.data.token).toBeDefined();
        expect(body.data.user).toBeDefined();
        expect(body.data.user.name).toBeDefined();
        expect(body.data.user.email).toBeDefined();
        expect(body.data.user.id).toBeDefined();
      })
  });

  it('should fail if email is in use', () => {
    mockingoose(UserModel).toReturn(1, 'count');
    return request(app)
      .post('/auth/signup')
      .send(validSignUp.body)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)
      .expect(422)
      .then(({body}) => {
        expect(body).toBeDefined();
        expect(body.success).toBe(false);
        expect(body.data).toBeUndefined();
        expect(body.meta).toBeDefined();
        expect(body.meta.errors).toBeDefined();
        expect(body.meta.errors.email).toBeDefined();
      })
  });

  it('should fail if invalid date is passed', () => {
    mockingoose(UserModel).toReturn(0, 'count');
    return request(app)
      .post('/auth/signup')
      .send(invalidSignUp.body)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)
      .expect(422)
      .then(({body}) => {
        expect(body).toBeDefined();
        expect(body.success).toBe(false);
        expect(body.data).toBeUndefined();
        expect(body.meta).toBeDefined();
        expect(body.meta.errors).toBeDefined();
        expect(body.meta.errors.password).toBeDefined();
      })
  });

  afterEach(() => mockingoose(UserModel).reset())
});