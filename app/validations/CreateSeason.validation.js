const { body } = require('express-validator');
const SeasonModel = require('../models/Season.model');
const { isDate } = require('../../utils/Rules.util');

/**
 * Create Season Validation
 * @var Array
 */
module.exports = [
  // name validation
  body('name')
    .trim()
    .exists({ checkFalsy: true })
    .withMessage('The season name is required.')
    .custom(async value => {
      const count = await SeasonModel.count({ name: value.trim() });
      if (count > 0)
        throw new Error('A season with that name already exists.');
      return true;
    }),
  // start date
  body('startDate')
    .exists({ checkFalsy: true })
    .withMessage('The start date is required.')
    .custom(value => {
      if (!isDate(value))
        throw new Error('The start date must be a date. E.g. MM/DD/YYY.');
      return true;
    }),
  // end date
  body('endDate')
    .exists({ checkFalsy: true })
    .withMessage('The start date is required.')
    .custom(value => {
      if (!isDate(value))
        throw new Error('The end date must be a date. E.g. MM/DD/YYY.');
      return true;
    })
];