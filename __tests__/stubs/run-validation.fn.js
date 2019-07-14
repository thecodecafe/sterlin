const httpMock = require('node-mocks-http');
const { validationResult } = require('express-validator');

module.exports = async (data, validations) => {
  // create mock request
  const req = httpMock.createRequest(data);
  // create mock response
  const res = httpMock.createResponse();
  // run validations
  for (let i = 0; i < validations.length; i++) {
    await validations[i](req, res, () => { });
  }
  // return validation result
  return validationResult(req);
}