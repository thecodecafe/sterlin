const { body } = require('express-validator');
const SeasonModel = require('../models/Season.model');
const TeamModel = require('../models/Team.model');
const FixtureModel = require('../models/Fixture.model');
const { isDate } = require('../../utils/Rules.util');

/**
 * Create Fixture Validation
 * @var Array
 */
module.exports = [
  // name validation
  body('season')
    .if(value => value !== undefined)
    .exists({ checkFalsy: true })
    .withMessage('Season cannot be empty.')
    .custom(async value => {
      const count = await SeasonModel.count({ _id: value });
      if (count < 1) throw new Error('The season is invalid.');
      return true;
    }),
  // home team validation
  body('homeTeam')
    .if(value => value !== undefined)
    .exists({ checkFalsy: true })
    .withMessage('The home team cannot be empty.')
    .custom(async (value, { req }) => {
      if (value === req.body.awayTeam)
        throw new Error('Home team must not be same as away team.');
      return true;
    })
    .custom(async value => {
      const count = await TeamModel.count({ _id: value });
      if (count < 1) throw new Error('The home team is invalid.');
      return true;
    })
    .custom(async (value, { req }) => {
      const count = await FixtureModel.count(
        { _id: req.params.id, awayTeam: value }
      );
      if (body('awayTeam').exists() && count > 0)
        throw new Error('Home team must not be same as away team.');
      return true;
    }),
  // away team validation
  body('awayTeam')
    .if(value => value !== undefined)
    .exists({ checkFalsy: true })
    .withMessage('The away team cannot be empty.')
    .custom(async (value, { req }) => {
      if (value === req.body.homeTeam)
        throw new Error('Away team must not be same as home team.');
      return true;
    })
    .custom(async value => {
      const count = await TeamModel.count({ _id: value });
      if (count < 1) throw new Error('The away team is invalid.');
      return true;
    })
    .custom(async (value, { req }) => {
      const count = await FixtureModel.count(
        { _id: req.params.id, homeTeam: value }
      );
      if (body('homeTeam').exists() && count > 0)
        throw new Error('Away team must not be same as home team.');
      return true;
    }),
  // start date time validation
  body('startsAt')
    .if(value => value !== undefined)
    .exists({ checkFalsy: true })
    .withMessage('The start date and time cannnot be empty.')
    .custom(async value => {
      if (!isDate(value))
        throw new Error(
          'The start date and time format is invalid. E.g. YYYY-MM-DD HH:MM:SS.'
        );
      return true;
    }),
  // home goals validation
  body('homeGoals')
    .if(value => value !== undefined)
    .exists({ checkFalsy: true })
    .withMessage('The home goals cannot be empty.')
    .isNumeric()
    .withMessage('The home goals must be a number.'),
  // away goals validation
  body('awayGoals')
    .if(value => value !== undefined)
    .exists({ checkFalsy: true })
    .withMessage('The away goals cannot be empty.')
    .isNumeric()
    .withMessage('The away goals must be a number.')
];