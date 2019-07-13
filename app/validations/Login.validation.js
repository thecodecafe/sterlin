const {body} = require('express-validator');

/**
 * Login Validation
 * @var Array
 */
module.exports = [
  // email validation
  body('email')
    .isEmail()
    .withMessage('The email address is invalid.'),
  // password validation
  body('password')
    .exists({checkFalsy: true})
    .withMessage('The password is required')
];