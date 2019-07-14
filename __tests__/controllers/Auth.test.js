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
const Controller = require('../../app/controllers/Auth.controller');
const User = require('../../app/models/User.model');
const httpMocks = require('node-mocks-http');

describe('<AuthController.Login>', () => {
  it('should return a success response', async () => {
    mockingoose(User).toReturn(userDoc, 'findOne');
    // create mock response
    const response = httpMocks.createResponse();
    // make request
    await Controller.login(validLogin, response);
    // get response JSON data
    const result = response._getJSONData();
    // get the status code
    const statusCode = response._getStatusCode();
    // check response
    expect(result).toBeDefined();
    expect(statusCode).toBe(200);
    expect(result.success).toBeDefined();
    expect(result.success).toBeTruthy();
    expect(result.data).toBeDefined();
    expect(result.data.token).toBeDefined();
    expect(typeof(result.data.token)).toBe('string');
    expect(result.data.user).toBeDefined();
    expect(result.data.user.id).toBeDefined();
    expect(typeof(result.data.user.id)).toBe('string');
    expect(result.data.user.email).toBeDefined();
    expect(typeof(result.data.user.email)).toBe('string');
    expect(result.data.user.name).toBeDefined();
    expect(typeof(result.data.user.name)).toBe('string');
    expect(result.data.user.password).toBeUndefined();
    expect(result.data.user.role).toBeDefined();
    expect(typeof(result.data.user.role)).toBe('string');
  });

  it('should return a failure response', async () => {
    mockingoose(User).toReturn(null, 'findOne');
    // create mock response
    const response = httpMocks.createResponse();
    // make request
    await Controller.login(invalidLoginWorngPassword, response);
    // get response JSON data
    const result = response._getJSONData();
    // get the status code
    const statusCode = response._getStatusCode();
    // check response
    expect(result).toBeDefined();
    expect(statusCode).toBe(400);
    expect(result.success).toBeDefined();
    expect(result.success).toBeFalsy();
    expect(result.data).toBeUndefined();
    expect(result.message).toBeDefined();
    expect(result.message).toMatch(/credentials/);
  });

  it('should return a failure response', async () => {
    mockingoose(User).toReturn(userDoc, 'findOne');
    // create mock response
    const response = httpMocks.createResponse();
    // make request
    await Controller.login(invalidLoginWorngPassword, response);
    // get response JSON data
    const result = response._getJSONData();
    // get the status code
    const statusCode = response._getStatusCode();
    // check response
    expect(result).toBeDefined();
    expect(statusCode).toBe(400);
    expect(result.success).toBeDefined();
    expect(result.success).toBeFalsy();
    expect(result.data).toBeUndefined();
    expect(result.message).toBeDefined();
    expect(result.message).toMatch(/credentials/);
  });

  it('should return a failure response', async () => {
    // create mock response
    const response = httpMocks.createResponse();
    // make request
    await Controller.login(invalidLogin, response);
    // get response JSON data
    const result = response._getJSONData();
    // get the status code
    const statusCode = response._getStatusCode();
    // check response
    expect(result).toBeDefined();
    expect(statusCode).toBe(400);
    expect(result.success).toBeDefined();
    expect(result.success).toBeFalsy();
    expect(result.data).toBeUndefined();
    expect(result.message).toBeDefined();
    expect(result.message).toMatch(/invalid/i);
  });

  it('should return a failure response', async () => {
    // create mock response
    const response = httpMocks.createResponse();
    // make request
    await Controller.login(invalidLoginEmail, response);
    // get response JSON data
    const result = response._getJSONData();
    // get the status code
    const statusCode = response._getStatusCode();
    // check response
    expect(result).toBeDefined();
    expect(statusCode).toBe(400);
    expect(result.success).toBeDefined();
    expect(result.success).toBeFalsy();
    expect(result.data).toBeUndefined();
    expect(result.message).toBeDefined();
    expect(result.message).toMatch(/invalid/i);
  });

  it('should return a failure response', async () => {
     // create mock response
     const response = httpMocks.createResponse();
     // make request
     await Controller.login(invalidLoginPassword, response);
     // get response JSON data
     const result = response._getJSONData();
     // get the status code
     const statusCode = response._getStatusCode();
     // check response
    expect(result).toBeDefined();
    expect(statusCode).toBe(400);
    expect(result.success).toBeDefined();
    expect(result.success).toBeFalsy();
    expect(result.data).toBeUndefined();
    expect(result.message).toBeDefined();
    expect(result.message).toMatch(/invalid/i);
  });
});

describe('<AuthController.SignUp>', () => {
  it('should return a success response', async () => {
    mockingoose(User).toReturn(userDoc, 'save');
    // create mock response
    const response = httpMocks.createResponse();
    // make request
    await Controller.signup(validSignUp, response);
    // get response JSON data
    const result = response._getJSONData();
    // get the status code
    const statusCode = response._getStatusCode();
    // check response
    expect(result).toBeDefined();
    expect(statusCode).toBe(201);
    expect(result.success).toBeDefined();
    expect(result.success).toBeTruthy();
    expect(result.data).toBeDefined();
    expect(result.data.token).toBeDefined();
    expect(typeof(result.data.token)).toBe('string');
    expect(result.data.user).toBeDefined();
    expect(result.data.user.id).toBeDefined();
    expect(typeof(result.data.user.id)).toBe('string');
    expect(result.data.user.email).toBeDefined();
    expect(typeof(result.data.user.email)).toBe('string');
    expect(result.data.user.name).toBeDefined();
    expect(typeof(result.data.user.name)).toBe('string');
    expect(result.data.user.password).toBeUndefined();
    expect(result.data.user.role).toBeDefined();
    expect(typeof(result.data.user.role)).toBe('string');
  });

  it('should return bad request response', async () => {
    mockingoose(User).toReturn(userDoc, 'save');
    // create mock response
    const response = httpMocks.createResponse();
    // make request
    await Controller.signup(invalidSignUp, response);
    // get response JSON data
    const result = response._getJSONData();
    // get the status code
    const statusCode = response._getStatusCode();
    // check response
    expect(result).toBeDefined();
    expect(statusCode).toBe(400);
    expect(result.success).toBeDefined();
    expect(result.success).toBeFalsy();
    expect(result.data).toBeUndefined();
    expect(result.message).toBeDefined();;
    expect(result.message).toMatch(/email/i);;
  });
});