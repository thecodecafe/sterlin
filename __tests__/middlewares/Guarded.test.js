const Middleware = require('../../routes/middleware/Guarded.middleware');
const httpMocks = require('node-mocks-http');

describe('<GuardedMiddleware>', () => {
  it('should return a function', () => {
    const result = Middleware([]);
    expect(result).toBeDefined();
    expect(typeof(result)).toBe('function');
  });

  it('should throw an error', () => {
    expect(Middleware).toThrow();
  });

  it('shoult return an internal error if user is missin from request', () => {
    const req = httpMocks.createRequest();
    const res = httpMocks.createResponse();
    Middleware([])(req, res);
    const result = res._getJSONData();
    const statusCode = res._getStatusCode();
    expect(result).toBeDefined();
    expect(statusCode).toBe(500);
    expect(result.success).toBe(false);
    expect(result.message).toBeDefined();
    expect(result.message).toMatch(/internal/i);
  });

  it('should return an unauthorized error if user doeas\'t have permission', () => {
    const req = httpMocks.createRequest({user: {role: 'user'}});
    const res = httpMocks.createResponse();
    Middleware(['admin'])(req, res);
    const result = res._getJSONData();
    const statusCode = res._getStatusCode();
    expect(result).toBeDefined();
    expect(statusCode).toBe(401);
    expect(result.success).toBe(false);
    expect(result.message).toBeDefined();
    expect(result.message).toMatch(/denied/i);
  });

  it('should should allow user', () => {
    let success = false;
    const next = () => {success = true}
    const req = httpMocks.createRequest({user: {role: 'admin'}});
    const res = httpMocks.createResponse();
    Middleware(['admin'])(req, res, next);
    expect(success).toBe(true);
  });
});