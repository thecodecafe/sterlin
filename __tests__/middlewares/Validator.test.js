const Middleware = require('../../routes/middleware/Validator.middleware');

describe('<ValidatorMiddleware>', () => {
  it('should return an empty array', () => {
    const result = Middleware('fake-validation-group');
    expect(result).toBeDefined();
    expect(result.length).toBeDefined();
    expect(result.constructor).toBe(Array);
  });

  it('should return an empty array', () => {
    const result = Middleware('Test');
    expect(result).toBeDefined();
    expect(result.length).toBeDefined();
    expect(result.length > 0 ).toBe(true);
    expect(result.constructor).toBe(Array);
  });
});