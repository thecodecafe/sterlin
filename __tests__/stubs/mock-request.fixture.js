const { fixtureDoc, newfixtureDoc } = require('./mock-data.fixture');
module.exports = {
  fixtureList: {
    query: {}
  },

  fixtureListSearch: {
    query: { search: '' }
  },

  fixtureListDateFilter: {
    query: {
      from: new Date().toUTCString(),
      to: new Date().toUTCString()
    }
  },

  fixtureListPending: {
    query: { status: 'pending' }
  },

  fixtureListOngoing: {
    query: { status: 'ongoing' }
  },

  fixtureListCompleted: {
    query: { status: 'completed' }
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
      startsAt: 'invalid date'
    }
  },

  validFixtureUpdate: {
    params: { id: fixtureDoc._id },
    body: {
      startsAt: newfixtureDoc.startsAt,
      season: newfixtureDoc.season
    }
  },

  inValidFixtureUpdate: {
    params: { id: fixtureDoc._id },
    body: {
      startsAt: 'invalid date',
      season: newfixtureDoc.season,
      awayTeam: newfixtureDoc.awayTeam,
      homeTeam: newfixtureDoc.awayTeam
    }
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