const { fixtureDoc, newfixtureDoc } = require('./mock-data.fixture');
module.exports = {
  fixtureList: {
    body: {}
  },

  fixtureListSearch: {
    body: { search: '' }
  },

  fixtureListDateFilter: {
    body: {
      from: new Date().toUTCString(),
      to: new Date().toUTCString()
    }
  },

  fixtureListPending: {
    body: { status: 'pending' }
  },

  fixtureListOngoing: {
    body: { status: 'ongoing' }
  },

  fixtureListCompleted: {
    body: { status: 'completed' }
  },

  validFixtureFind: {
    params: {
      id: fixtureDoc._id
    }
  },

  inValidFixtureFind: {
    params: {}
  },

  validFixtureCreate: {
    body: {
      season: newfixtureDoc.season,
      homeTeam: newfixtureDoc.homeTeam,
      awayTeam: newfixtureDoc.awayTeam,
      startsAt: newfixtureDoc.startsAt,
    }
  },

  inValidFixtureCreate: {
    body: {
      homeTeam: newfixtureDoc.homeTeam,
      awayTeam: newfixtureDoc.awayTeam,
      startsAt: newfixtureDoc.startsAt
    }
  },

  validFixtureUpdate: {
    params: { id: fixtureDoc._id },
    body: {
      startsAt: newfixtureDoc.startsAt,
    }
  },

  inValidFixtureUpdate: {
    params: { id: fixtureDoc._id },
    body: {startsAt: 'invalid date'}
  },

  validFixtureDelete: {
    params: {
      id: fixtureDoc._id
    }
  },

  inValidFixtureDelete: {
    params: {}
  },
}