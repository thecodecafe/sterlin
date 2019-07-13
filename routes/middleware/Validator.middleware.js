const { validationResult } = require('express-validator');
const validations = require('../../app/validations');

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
};

/**
 * Final validation middleware that checks to see if
 * there actually is an error.
 * @param {Object} req Request Object
 * @param {Object} res Response object
 * @param {Function} next moves to next middleware
 * @returns Object
 */
const validationChecker = (req, res, next) => {
  // get validation errors from request
  const errors = validationResult(req);

  // check if there are no errors
  if (!errors.isEmpty()) next();

  // prepare error message
  const responseErrors = getErrorMessages(errors.array());

  // return a response error
  return res.status(422).json({
    success: false,
    message: 'Validation error.',
    errors: responseErrors
  });
};

/**
 * Validation Middleware
 * The validation middleware is called and used to validate requests it
 * accepts an argument which is supposed to be the validations group
 * for the request.
 * @param {String} group name of validations group
 */
module.exports = group => {
  // return empty array if validation group was not found
  if(typeof validations[group] === 'undefined'
    || validations[group] === null
  ) return [];

  // get validations within group
  const validationGroup = validations[group];

  // push validator checker
  validationGroup.push(validationChecker);

  // return validation group
  return validationGroup;
};