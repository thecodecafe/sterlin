const Validation = require('../../app/validations/Login.validation');
const { validLogin, invalidLogin } = require('../stubs/mock-request.auth');
const RunValidation = require('../stubs/run-validation.fn');

describe('<LoginValidation>', () => {
  it('should be an array of validations', () => {
    expect(Validation).toBeDefined();
    expect(Validation.constructor).toBe(Array);
  })

  it('should pass', async () => {
    const result = await RunValidation(validLogin, Validation);
    expect(result).toBeDefined();
    expect(result.isEmpty).toBeDefined();
    expect(result.isEmpty()).toBeTruthy();
  })

  it('should fail', async () => {
    const result = await RunValidation(invalidLogin, Validation);
    expect(result).toBeDefined();
    expect(result.isEmpty).toBeDefined();
    expect(result.isEmpty()).toBeFalsy();
    expect(result.array).toBeDefined();
    expect(result.array().findIndex(item => item.param == 'email')).not.toBe(-1);
    expect(result.array().findIndex(item => item.param == 'password')).not.toBe(-1);
  })
});