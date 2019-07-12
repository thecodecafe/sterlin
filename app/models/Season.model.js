const mongoose = require('mongoose');

// Shcema for Season model
const SeasonSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'The season\'s name is required.'],
    unique: true,
    index: true
  },
  startDate: {
    type: Date,
    required: [true, 'The start date is required.']
  },
  endDate: {
    type: Date,
    required: [true, 'The end date is required.']
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

// export Season schema
module.exports = mongoose.model('Season', SeasonSchema);