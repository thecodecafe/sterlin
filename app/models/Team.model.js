const mongoose = require('mongoose');
const { isURL } = require('../../utils/Rules.util');

// Shcema for Season model
const TeamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'The team\'s name is required.'],
    unique: true
  },
  slug: {
    type: String,
    index: true,
    default: ''
  },
  logo: {
    type: String,
    default: null
  },
  stadium: {
    type: String,
    required: [true, 'The team\'s stadium name is required.']
  }
}, {
  timestamps: true
});

// Ensure logo is url when passed.
TeamSchema.path('logo').validate(
  value => {
    return value ? isURL(value) : true;
  },
  'Team logo must be a valid url.'
);

// export Season schema
module.exports = mongoose.model('Team', TeamSchema);