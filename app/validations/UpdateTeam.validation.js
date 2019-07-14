const { body } = require('express-validator');
const TeamModel = require('../models/Team.model');
const { isURL } = require('../../utils/Rules.util');

/**
 * Update Team Validation
 * @var Array
 */
module.exports = [
  // name validation
  body('name')
    .if(value => value !== undefined)
    .exists({ checkFalsy: true })
    .withMessage('The team name cannot be empty.')
    .custom(async (value, {req}) => {
      const count = await TeamModel.count(
        {name: value.trim(), _id: {'$ne': req.params.id}}
      );
      if (count > 0) throw new Error('A team with that name already exists');
      return true;
    }),
  // log validation
  body('logo')
    .if(value => value !== undefined)
    .exists({ checkFalsy: true })
    .custom(value => {
      if (!isURL(value))
        throw new Error('Logo must be a URL.');
      return true;
    }),
  // stadium validation
  body('stadium')
    .if(value => value !== undefined)
    .exists({ checkFalsy: true })
    .withMessage('The team\'s stadium cannot be empty.')
];