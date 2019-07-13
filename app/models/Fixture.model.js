const mongoose = require('mongoose');

// Shcema for Season model
const FixtureSchema = new mongoose.Schema({
  season: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Season',
    required: [true, 'The season is required.']
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
    required: [true, 'The start date is required.']
  },
  endsAt: {
    type: Date,
    required: [true, 'The end date is required.']
  }
}, {
  timestamps: true
});

// export Season schema
module.exports = mongoose.model('Fixture', FixtureSchema);