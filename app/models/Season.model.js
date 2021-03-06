const mongoose = require('mongoose');

// Shcema for Season model
const SeasonSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'The season\'s name is required.'],
    unique: true
  },
  slug: {
    type: String,
    index: true,
    default: ''
  },
  startDate: {
    type: Date,
    required: [true, 'The start date is required.']
  },
  endDate: {
    type: Date,
    required: [true, 'The end date is required.']
  }
}, {
  timestamps: true
});

// export Season schema
module.exports = mongoose.model('Season', SeasonSchema);