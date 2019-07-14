const TryCatch = require('../../utils/TryCatch.utils');
const httpMocks = require('node-mocks-http');

describe('<Hashing>', () => {
  it('should fire the controller', async () => {
    const req = httpMocks.createRequest();
    const res = httpMocks.createResponse();

    await TryCatch((req, res) => {
      res.status(200).json({success: true})
    })(req, res);
    
    const result = res._getJSONData();
    const statusCode = res._getStatusCode();

    expect(result).toBeDefined();
    expect(result.success).toBe(true);
    expect(statusCode).toBe(200);
  });

  it('should return internal error response', async () => {
    const req = httpMocks.createRequest();
    const res = httpMocks.createResponse();

    await TryCatch(() => { throw new Error('Something happend.'); })(req, res);
    
    const result = res._getJSONData();
    const statusCode = res._getStatusCode();

    expect(result).toBeDefined();
    expect(result.success).toBe(false);
    expect(result.message).toMatch(/something went wrong/i);
    expect(statusCode).toBe(500);
  });
});