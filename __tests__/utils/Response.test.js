const {
  created,
  completed,
  accessForbidden,
  unauthorized,
  badRequest,
  notProcessible,
  notFound,
  internalError
} = require('../../utils/Response.util');
const httpMocks = require('node-mocks-http');

describe('<Response>', () => {
  it('created response', (done) => {
    // create mock response
    const response = httpMocks.createResponse();
    // make request
    created(response, 'Yes!!!');
    // get response JSON data
    const result = response._getJSONData();
    // get the status code
    const statusCode = response._getStatusCode();
    // check response
    expect(result).toBeDefined();
    expect(statusCode).toBe(201);
    expect(result.success).toBeTruthy();
    expect(result.message).toBe('Yes!!!');
    expect(result.data).toBeUndefined();
    expect(result.meta).toBeUndefined();
    done();
  });

  it('created response', (done) => {
    // create mock response
    const response = httpMocks.createResponse();
    // make request
    created(response);
    // get response JSON data
    const result = response._getJSONData();
    // get the status code
    const statusCode = response._getStatusCode();
    // check response
    expect(result).toBeDefined();
    expect(statusCode).toBe(201);
    expect(result.success).toBeTruthy();
    expect(result.message).toBe('Created!');
    done();
  });

  it('completed response', (done) => {
    // create mock response
    const response = httpMocks.createResponse();
    // make request
    completed(response, 'Completed', {name: 'Daniel'});
    // get response JSON data
    const result = response._getJSONData();
    // get the status code
    const statusCode = response._getStatusCode();
    // check response
    expect(result).toBeDefined();
    expect(statusCode).toBe(200);
    expect(result.success).toBeTruthy();
    expect(result.message).toBe('Completed');
    expect(result.data).toBeDefined();
    expect(result.data.name).toBe('Daniel');
    expect(result.meta).toBeUndefined();
    done();
  });

  it('completed response', (done) => {
    // create mock response
    const response = httpMocks.createResponse();
    // make request
    completed(response);
    // get response JSON data
    const result = response._getJSONData();
    // check response
    expect(result).toBeDefined();
    expect(result.message).toBe('Completed!');
    done();
  });

  it('access forbidden response', (done) => {
    // create mock response
    const response = httpMocks.createResponse();
    // make request
    accessForbidden(response);
    // get response JSON data
    const result = response._getJSONData();
    // get the status code
    const statusCode = response._getStatusCode();
    // check response
    expect(result).toBeDefined();
    expect(statusCode).toBe(403);
    expect(result.success).toBeFalsy();
    expect(result.message).toBe('Access forbidden!');
    done();
  });

  it('unauthorized response', (done) => {
    // create mock response
    const response = httpMocks.createResponse();
    // make request
    unauthorized(response);
    // get response JSON data
    const result = response._getJSONData();
    // get the status code
    const statusCode = response._getStatusCode();
    // check response
    expect(result).toBeDefined();
    expect(statusCode).toBe(401);
    expect(result.success).toBeFalsy();
    expect(result.message).toBe('You are unauthorized!');
    done();
  });

  it('bad request response', (done) => {
    // create mock response
    const response = httpMocks.createResponse();
    // make request
    badRequest(response, 'Invalid request!');
    // get response JSON data
    const result = response._getJSONData();
    // get the status code
    const statusCode = response._getStatusCode();
    // check response
    expect(result).toBeDefined();
    expect(statusCode).toBe(400);
    expect(result.success).toBeFalsy();
    expect(result.message).toBe('Invalid request!');
    done();
  });

  it('bad request response', (done) => {
    // create mock response
    const response = httpMocks.createResponse();
    // make request
    badRequest(response);
    // get response JSON data
    const result = response._getJSONData();
    // check response
    expect(result).toBeDefined();
    expect(result.message).toBe('Invalid request!');
    done();
  });

  it('validation error response', (done) => {
    // create mock response
    const response = httpMocks.createResponse();
    // make request
    notProcessible(response, 'Invalid data sent!', {name: 'Please enter your name'});
    // get response JSON data
    const result = response._getJSONData();
    // check response
    expect(result).toBeDefined();
    expect(statusCode).toBe(422);
    expect(result.success).toBeFalsy();
    expect(result.message).toBe('Invalid data sent!');
    expect(result.meta).toBeDefined();
    expect(result.meta.errors).toBeDefined();
    expect(result.meta.errors.name).toBe('Please enter your name');
    done();
  });

  it('validation error response', (done) => {
    // create mock response
    const response = httpMocks.createResponse();
    // make request
    notProcessible(response);
    // get response JSON data
    const result = response._getJSONData();
    // check response
    expect(result).toBeDefined();
    expect(result.message).toBe('Invalid data sent!');
    expect(result.meta).toBeDefined();
    expect(result.meta.errors).toBeDefined();
    done();
  });

  it('not found response', (done) => {
    // create mock response
    const response = httpMocks.createResponse();
    // make request
    notFound(response, 'Resource not found!');
    // get response JSON data
    const result = response._getJSONData();
    // get the status code
    const statusCode = response._getStatusCode();
    // check response
    expect(result).toBeDefined();
    expect(statusCode).toBe(404);
    expect(result.success).toBeFalsy();
    expect(result.message).toBe('Resource not found!');
    done();
  });

  it('not found response', (done) => {
    // create mock response
    const response = httpMocks.createResponse();
    // make request
    notFound(response);
    // get response JSON data
    const result = response._getJSONData();
    // check response
    expect(result).toBeDefined();
    expect(result.message).toBe('Resource not found!');
    done();
  });

  it('not found response', (done) => {
    // create mock response
    const response = httpMocks.createResponse();
    // make request
    internalError(response, 'An internal error occured!');
    // get response JSON data
    const result = response._getJSONData();
    // get the status code
    const statusCode = response._getStatusCode();
    // check response
    expect(result).toBeDefined();
    expect(statusCode).toBe(500);
    expect(result.success).toBeFalsy();
    expect(result.message).toBe('An internal error occured!');
    done();
  });

  it('not found response', (done) => {
    // create mock response
    const response = httpMocks.createResponse();
    // make request
    internalError(response);
    // get response JSON data
    const result = response._getJSONData();
    // check response
    expect(result).toBeDefined();
    expect(result.message).toBe('An internal error occured!');
    done();
  });
});