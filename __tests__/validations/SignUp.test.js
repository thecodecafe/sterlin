const Validation = require('../../app/validations/SignUp.validation');
const { validSignUp, invalidSignUp } = require('../stubs/mock-request.auth');
const RunValidation = require('../stubs/run-validation.fn');
const mockingoose = require('mockingoose').default;
const UserModel = require('../../app/models/User.model');

describe('<SignUpValidation>', () => {
  it('should be an array of validations', () => {
    expect(Validation).toBeDefined();
    expect(Validation.constructor).toBe(Array);
  })

  it('should pass', async () => {
    mockingoose(UserModel).toReturn(0, 'count');
    const result = await RunValidation(validSignUp, Validation);
    expect(result).toBeDefined();
    expect(result.isEmpty).toBeDefined();
    expect(result.isEmpty()).toBeTruthy();
  })

  it('should fail', async () => {
    mockingoose(UserModel).toReturn(1, 'count');
    const result = await RunValidation(invalidSignUp, Validation);
    expect(result).toBeDefined();
    expect(result.isEmpty).toBeDefined();
    expect(result.isEmpty()).toBeFalsy();
    expect(result.array).toBeDefined();
    expect(result.array().findIndex(item => item.param == 'email')).not.toBe(-1)
    expect(result.array().findIndex(item => item.param == 'role')).not.toBe(-1)
    expect(result.array().findIndex(item => item.param == 'password')).not.toBe(-1)
    expect(result.array().findIndex(item => item.param == 'name')).toBe(-1)
  })

  afterEach(() => mockingoose(UserModel).reset())
});