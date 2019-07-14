const { validationResult } = require('express-validator');
const { notProcessible } = require('../../utils/Response.util');

/**
 * Parses errors array and returns an errors list object.
 * @param {Array} errors array of errors
 * @returns Object
 */
const getErrorMessages = errors => {
  const responseErrors = {};
  for (let i = 0; i < errors.length; i++) {
    responseErrors[errors[i].param] = errors[i].msg;
  }
  return responseErrors;
};

/**
 * Final validation middleware that checks to see if
 * there actually is an error.
 * @param {Object} req Request Object
 * @param {Object} res Response object
 * @param {Function} next moves to next middleware
 * @returns Object
 */
module.exports = async (req, res, next) => {
  // get validation errors from request
  const errors = await validationResult(req);

  // check if there are no errors
  if (errors.isEmpty()) return next();

  // prepare error message
  const responseErrors = getErrorMessages(errors.array());

  // return a response error
  return notProcessible(res, 'Validation error', responseErrors);
};