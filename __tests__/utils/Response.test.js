const {
  created,
  completed,
  accessForbidden,
  unauthorized,
  badRequest,
  validationError,
  notFound,
  internalError
} = require('../../utils/Response.util');

// mock response object
const mockResponse = () => {
  const res = {};
  res.status = (code) => {
    // chane status to the code passed
    res.status = code;
    
    // return response object
    return res;
  };
  res.json = (obj) => {
    // remove json and status from object if found
    delete obj.json;
    delete obj.status;

    // go over all object
    Object.keys(obj).forEach(i => res[i] = obj[i]);

    // return response object
    return res;
  };
  // retunr response object
  return res;
};

describe('<Response>', () => {
  let res;
  beforeEach(() => {
    res = mockResponse();
  });

  it('created response', (done) => {
    const response = created(res, 'Yes!!!');
    expect(response).toBeDefined();
    expect(response.status).toBe(201);
    expect(response.success).toBeTruthy();
    expect(response.message).toBe('Yes!!!');
    expect(response.data).toBeUndefined();
    expect(response.meta).toBeUndefined();
    done();
  });

  it('created response', (done) => {
    const response = created(res);
    expect(response).toBeDefined();
    expect(response.status).toBe(201);
    expect(response.success).toBeTruthy();
    expect(response.message).toBe('Created!');
    done();
  });

  it('completed response', (done) => {
    const response = completed(res, 'Completed', {name: 'Daniel'});
    expect(response).toBeDefined();
    expect(response.status).toBe(200);
    expect(response.success).toBeTruthy();
    expect(response.message).toBe('Completed');
    expect(response.data).toBeDefined();
    expect(response.data.name).toBe('Daniel');
    expect(response.meta).toBeUndefined();
    done();
  });

  it('completed response', (done) => {
    const response = completed(res);
    expect(response).toBeDefined();
    expect(response.message).toBe('Completed!');
    done();
  });

  it('access forbidden response', (done) => {
    const response = accessForbidden(res);
    expect(response).toBeDefined();
    expect(response.status).toBe(403);
    expect(response.success).toBeFalsy();
    expect(response.message).toBe('Access forbidden!');
    done();
  });

  it('unauthorized response', (done) => {
    const response = unauthorized(res);
    expect(response).toBeDefined();
    expect(response.status).toBe(401);
    expect(response.success).toBeFalsy();
    expect(response.message).toBe('You are unauthorized!');
    done();
  });

  it('bad request response', (done) => {
    const response = badRequest(res, 'Invalid request!');
    expect(response).toBeDefined();
    expect(response.status).toBe(400);
    expect(response.success).toBeFalsy();
    expect(response.message).toBe('Invalid request!');
    done();
  });

  it('bad request response', (done) => {
    const response = badRequest(res);
    expect(response).toBeDefined();
    expect(response.message).toBe('Invalid request!');
    done();
  });

  it('validation error response', (done) => {
    const response = validationError(res, 'Invalid data sent!', {name: 'Please enter your name'});
    expect(response).toBeDefined();
    expect(response.status).toBe(422);
    expect(response.success).toBeFalsy();
    expect(response.message).toBe('Invalid data sent!');
    expect(response.meta).toBeDefined();
    expect(response.meta.errors).toBeDefined();
    expect(response.meta.errors.name).toBe('Please enter your name');
    done();
  });

  it('validation error response', (done) => {
    const response = validationError(res);
    expect(response).toBeDefined();
    expect(response.message).toBe('Invalid data sent!');
    expect(response.meta).toBeDefined();
    expect(response.meta.errors).toBeDefined();
    done();
  });

  it('not found response', (done) => {
    const response = notFound(res, 'Resource not found!');
    expect(response).toBeDefined();
    expect(response.status).toBe(404);
    expect(response.success).toBeFalsy();
    expect(response.message).toBe('Resource not found!');
    done();
  });

  it('not found response', (done) => {
    const response = notFound(res);
    expect(response).toBeDefined();
    expect(response.message).toBe('Resource not found!');
    done();
  });

  it('not found response', (done) => {
    const response = internalError(res, 'An internal error occured!');
    expect(response).toBeDefined();
    expect(response.status).toBe(500);
    expect(response.success).toBeFalsy();
    expect(response.message).toBe('An internal error occured!');
    done();
  });

  it('not found response', (done) => {
    const response = internalError(res);
    expect(response).toBeDefined();
    expect(response.message).toBe('An internal error occured!');
    done();
  });
});