const mongoose = require('mongoose');
const { isDate } = require('../../utils/Rules.util');

// Shcema for Season model
const FixtureSchema = new mongoose.Schema({
  season: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Season',
    require: [true, 'The season is required.']
  },
  homeTeam: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Team'
  },
  awayTeam: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Team'
  },
  homeGoals: {
    type: Number,
    default: 0
  },
  awayGoals: {
    type: Number,
    default: 0
  },
  startsAt: {
    type: Date,
    required: [true, 'The start date is required.'],
    validate: {
      validator: value => isDate(value),
      msg: 'Starting time must be a date and time. E.g. yyyy-mm-ddThr:min'
    }
  },
  endsAt: {
    type: Date,
    required: [true, 'Then end date is required.'],
    validate: {
      validator: value => isDate(value),
      msg: 'Ending time must be a date and time. E.g. yyyy-mm-ddThr:min'
    }
  }
});

// export Season schema
module.exports = mongoose.model('Fixture', FixtureSchema);