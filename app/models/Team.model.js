const mongoose = require('mongoose');
const { isURL } = require('../../utils/Rules.util');

// Shcema for Season model
const TeamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'The team\'s name is required.'],
    unique: true,
    index: true
  },
  logo: {
    type: String,
    default: null
  },
  stadiumName: {
    type: String,
    required: [true, 'The team\'s stadium name is required.']
  }
});

// Ensure logo is url when passed.
TeamSchema.path('logo').validate(
  value => {
    return value ? isURL(value) : true;
  },
  'Another team with the same name already exists.'
);

// export Season schema
module.exports = mongoose.model('Team', TeamSchema);