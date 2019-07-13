const { body } = require('express-validator');
const TeamModel = require('../models/Team.model');
const { isURL } = require('../../utils/Rules.util');

/**
 * Create Team Validation
 * @var Array
 */
module.exports = [
  // name validation
  body('name')
    .exists({ checkFalsy: true })
    .withMessage('The team name is required.')
    .custom(async value => {
      const count = await TeamModel.count({ name: value.trim() });
      if (count > 0) throw new Error('A team with that name already exists.');
      return true;
    }),
  // log validation
  body('logo')
    .if(logo => logo)
    .custom(value => {
      if (!isURL(value))
        throw new Error('Logo must be a URL.');
      return true;
    }),
  // stadium validation
  body('stadium')
    .exists({ checkFalsy: true })
    .withMessage('The team\'s stadium is required.')
];