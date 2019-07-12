const mongoose = require('mongoose');

const fixtureDoc = {
  _id: new mongoose.Types.ObjectId(),
  season: new mongoose.Types.ObjectId(),
  homeTeam: new mongoose.Types.ObjectId(),
  awayTeam: new mongoose.Types.ObjectId(),
  startsAt: new Date().toUTCString()
};

const newfixtureDoc = {
  ...fixtureDoc,
  homeGoals: 0,
  awayGoals: 0,
  endsAt: new Date(new Date( fixtureDoc.startsAt ).getTime() + (60000 * 100)).toUTCString()
};

const updatedfixtureDoc = {
  ...newfixtureDoc,
  homeGoals: 2,
  awayGoals: 1,
  endsAt: new Date(new Date( newfixtureDoc.startsAt ).getTime() + (60000 * 100)).toUTCString()
};

module.exports = {
  fixtureDoc,
  newfixtureDoc,
  updatedfixtureDoc
}