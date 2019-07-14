const { body } = require('express-validator');
const SeasonModel = require('../models/Season.model');
const TeamModel = require('../models/Team.model');
const { isDate } = require('../../utils/Rules.util');

/**
 * Create Fixture Validation
 * @var Array
 */
module.exports = [
  // name validation
  body('season')
    .exists({ checkFalsy: true })
    .withMessage('The season is required.')
    .custom(async value => {
      const count = await SeasonModel.count({ _id: value });
      if (count < 1) throw new Error('The season is invalid.');
      return true;
    }),
  // home team validation
  body('homeTeam')
    .exists({ checkFalsy: true })
    .withMessage('The home team is required.')
    .custom(async value => {
      const count = await TeamModel.count({ _id: value });
      if (count < 1) throw new Error('The home team is invalid.');
      return true;
    })
    .custom(async (value, {req}) => {
      if (value === req.body.awayTeam)
        throw new Error('Home team must not be same as away team.');
      return true;
    }),
  // away team validation
  body('awayTeam')
    .exists({ checkFalsy: true })
    .withMessage('The away team is required.')
    .custom(async value => {
      const count = await TeamModel.count({ _id: value });
      if (count < 1) throw new Error('The away team is invalid.');
      return true;
    })
    .custom(async (value, {req}) => {
      if (value === req.body.homeTeam)
        throw new Error('Away team must not be same as home team.');
      return true;
    }),
  // away team validation
  body('startsAt')
    .exists({ checkFalsy: true })
    .withMessage('The start date and tiem is required.')
    .custom(async value => {
      if (!isDate(value))
        throw new Error(
          'The start date and time format is invalid. E.g. YYYY-MM-DD HH:MM:SS.'
        );
      return true;
    })
];