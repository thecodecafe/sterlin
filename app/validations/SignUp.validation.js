const { body } = require('express-validator');

/**
 * Sign Up Validation
 * @var Array
 */
module.exports = [
  // name validation
  body('name')
    .exists({ checkFalsy: true })
    .withMessage('Name is required.'),
  // email validation
  body('email')
    .exists({ checkFalsy: true })
    .withMessage('The email address is required.')
    .isEmail()
    .withMessage('The email address is invalid.'),
  // password validation
  body('password')
    .exists({ checkFalsy: true })
    .withMessage('The password is required')
    .custom((value, { req }) => {
      if (value !== req.body.passwordConfirmation) {
        throw new Error('Passwords do not match.');
      }
      return true;
    }),
  // role validation
  body('role')
    .exists({ checkFalsy: true })
    .withMessage('The role is required')
    .custom(value => {
      if (['admin', 'user'].indexOf(value) === -1) {
        throw new Error(`${value} is not a supported role.`);
      }
      return true;
    })
];