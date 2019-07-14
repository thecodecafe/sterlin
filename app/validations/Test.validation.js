const {body} = require('express-validator');

/**
 * Test Validation
 * @var Array
 */
module.exports = [
  // email validation
  body('name')
    .exists({checkFalsy: true})
    .withMessage('The name is required.')
];