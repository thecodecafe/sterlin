const mongoose = require('mongoose');
const { isDate } = require('../../utils/Rules.util');

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
    required: [true, 'The start date is required.'],
    validate: {
      validator: value => isDate(value),
      msg: 'Start date must be a valid date. E.g. yyyy-mm-ddThr:min'
    }
  },
  endDate: {
    type: Date,
    required: [true, 'Then end date is required.'],
    validate: {
      validator: value => isDate(value),
      msg: 'Start date must be a valid date. E.g. yyyy-mm-ddThr:min'
    }
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

// export Season schema
module.exports = mongoose.model('Season', SeasonSchema);