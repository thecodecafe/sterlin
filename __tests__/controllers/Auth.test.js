require('../../configs/dotenv');
const mockingoose = require('mockingoose').default;
const {
  validLogin,
  invalidLoginEmail,
  invalidLoginPassword,
  invalidLogin,
  invalidLoginWorngPassword,
  validSignUp,
  invalidSignUp
} = require('../stubs/mock-request.auth');
const { userDoc } = require('../stubs/mock-date.user');
const mockResponse = require('../stubs/mock.response');
const Controller = require('../../app/controllers/Auth.controller');
const User = require('../../app/models/User.model');

describe('<AuthController.Login>', () => {
  it('should return a success response', async () => {
    mockingoose(User).toReturn(userDoc, 'findOne');
    const response = await Controller.login(validLogin, mockResponse());
    expect(response).toBeDefined();
    expect(response.status).toBeDefined();
    expect(response.status).toBe(200);
    expect(response.success).toBeDefined();
    expect(response.success).toBeTruthy();
    expect(response.data).toBeDefined();
    expect(response.data.token).toBeDefined();
    expect(typeof(response.data.token)).toBe('string');
    expect(response.data.user).toBeDefined();
    expect(response.data.user.id).toBeDefined();
    expect(typeof(response.data.user.id)).toBe('string');
    expect(response.data.user.email).toBeDefined();
    expect(typeof(response.data.user.email)).toBe('string');
    expect(response.data.user.name).toBeDefined();
    expect(typeof(response.data.user.name)).toBe('string');
    expect(response.data.user.password).toBeUndefined();
    expect(response.data.user.isAdmin).toBeDefined();
    expect(typeof(response.data.user.isAdmin)).toBe('boolean');
  });

  it('should return a failure response', async () => {
    mockingoose(User).toReturn(null, 'findOne');
    const response = await Controller.login(invalidLoginWorngPassword, mockResponse());
    expect(response).toBeDefined();
    expect(response.status).toBeDefined();
    expect(response.status).toBe(400);
    expect(response.success).toBeDefined();
    expect(response.success).toBeFalsy();
    expect(response.data).toBeUndefined();
    expect(response.message).toBeDefined();
    expect(response.message).toMatch(/credentials/);
  });

  it('should return a failure response', async () => {
    mockingoose(User).toReturn(userDoc, 'findOne');
    const response = await Controller.login(invalidLoginWorngPassword, mockResponse());
    expect(response).toBeDefined();
    expect(response.status).toBeDefined();
    expect(response.status).toBe(400);
    expect(response.success).toBeDefined();
    expect(response.success).toBeFalsy();
    expect(response.data).toBeUndefined();
    expect(response.message).toBeDefined();
    expect(response.message).toMatch(/credentials/);
  });

  it('should return a failure response', async () => {
    const response = await Controller.login(invalidLogin, mockResponse());
    expect(response).toBeDefined();
    expect(response.status).toBeDefined();
    expect(response.status).toBe(400);
    expect(response.success).toBeDefined();
    expect(response.success).toBeFalsy();
    expect(response.data).toBeUndefined();
    expect(response.message).toBeDefined();
    expect(response.message).toMatch(/invalid/i);
  });

  it('should return a failure response', async () => {
    const response = await Controller.login(invalidLoginEmail, mockResponse());
    expect(response).toBeDefined();
    expect(response.status).toBeDefined();
    expect(response.status).toBe(400);
    expect(response.success).toBeDefined();
    expect(response.success).toBeFalsy();
    expect(response.data).toBeUndefined();
    expect(response.message).toBeDefined();
    expect(response.message).toMatch(/invalid/i);
  });

  it('should return a failure response', async () => {
    const response = await Controller.login(invalidLoginPassword, mockResponse());
    expect(response).toBeDefined();
    expect(response.status).toBeDefined();
    expect(response.status).toBe(400);
    expect(response.success).toBeDefined();
    expect(response.success).toBeFalsy();
    expect(response.data).toBeUndefined();
    expect(response.message).toBeDefined();
    expect(response.message).toMatch(/invalid/i);
  });
});

describe('<AuthController.SignUp>', () => {
  it('should return a success response', async () => {
    mockingoose(User).toReturn(userDoc, 'save');
    const response = await Controller.signup(validSignUp, mockResponse());
    expect(response).toBeDefined();
    expect(response.status).toBeDefined();
    expect(response.status).toBe(201);
    expect(response.success).toBeDefined();
    expect(response.success).toBeTruthy();
    expect(response.data).toBeDefined();
    expect(response.data.token).toBeDefined();
    expect(typeof(response.data.token)).toBe('string');
    expect(response.data.user).toBeDefined();
    expect(response.data.user.id).toBeDefined();
    expect(typeof(response.data.user.id)).toBe('string');
    expect(response.data.user.email).toBeDefined();
    expect(typeof(response.data.user.email)).toBe('string');
    expect(response.data.user.name).toBeDefined();
    expect(typeof(response.data.user.name)).toBe('string');
    expect(response.data.user.password).toBeUndefined();
    expect(response.data.user.isAdmin).toBeDefined();
    expect(typeof(response.data.user.isAdmin)).toBe('boolean');
  });

  it('should return bad request response', async () => {
    mockingoose(User).toReturn(userDoc, 'save');
    const response = await Controller.signup(invalidSignUp, mockResponse());
    expect(response).toBeDefined();
    expect(response.status).toBeDefined();
    expect(response.status).toBe(400);
    expect(response.success).toBeDefined();
    expect(response.success).toBeFalsy();
    expect(response.data).toBeUndefined();
    expect(response.message).toBeDefined();;
    expect(response.message).toMatch(/email/i);;
  });
});