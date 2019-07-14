const mongoose = require('mongoose');
const { isEmail } = require('../../utils/Rules.util');

// Email Validation
const EmailValidation = {
  validator: value => {
    // check if the value passed is a valid email address
    return isEmail(value);
  },
  msg: 'The email address is invalid.'
};

// Shcema for user model
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'The user\'s name is required.']
  },
  email: {
    type: String,
    required: [true, 'Ther user\'s email address is required.'],
    validate: [EmailValidation],
    unique: true,
    index: true
  },
  password: {
    type: String,
    required: [true, 'The user\'s password is required.']
  },
  role: {
    type: String,
    required: [true, 'The user\'s role is required.'],
    enum: ['admin', 'user']
  }
}, {
  timestamps: true
});

// export user schema
module.exports = mongoose.model('User', UserSchema);