const mongoose = require('mongoose');
const { validLogin } = require('./mock-request.auth');
const { hash } = require('../../utils/Hashing.util');

const userDoc = {
  _id: new mongoose.Types.ObjectId(),
  name: 'Jon Doe',
  email: validLogin.body.email,
  password: hash(validLogin.body.password),
  isAdmin: false
};

module.exports = {
  userDoc,
  password: validLogin.body.password
};