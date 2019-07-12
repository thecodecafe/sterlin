const mongoose = require('mongoose');

const invalidLogo = 'invalid logo';

const teamDoc = {
  _id: new mongoose.Types.ObjectId(),
  name: 'Team One',
  stadium: 'Stadium',
  logo: null,
};

module.exports = {
  teamDoc,
  invalidLogo
};