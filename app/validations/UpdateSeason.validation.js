const { body } = require('express-validator');
const SeasonModel = require('../models/Season.model');
const { isDate } = require('../../utils/Rules.util');

/**
 * Update Season Validation
 * @var Array
 */
module.exports = [
  // name validation
  body('name')
    .trim()
    .if(value => value !== undefined)
    .exists({checkNull: true})
    .withMessage('The season name cannot be empty.')
    .custom(async (value, {req}) => {
      const count = await SeasonModel.count(
        {name: value, _id: {'$ne': req.params.id}}
      );
      if (count > 0) throw new Error('A season with that name already exists');
      return true;
    }),
  // start date
  body('startDate')
    .if(value => value)
    .exists({checkNull: true})
    .withMessage('The start date cannot be empty')
    .custom(value => {
      if (!isDate(value))
        throw new Error('The start date must be a date. E.g. MM/DD/YYY.');
      return true;
    }),
  // end date
  body('endDate')
    .if(value => value)
    .exists({checkNull: true})
    .withMessage('The end date cannot be empty')
    .custom(value => {
      if (!isDate(value))
        throw new Error('The end date must be a date. E.g. MM/DD/YYY.');
      return true;
    })
];