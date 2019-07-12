const { teamDoc, invalidLogo } = require('./mock-data.team');
module.exports = {
  validTeamList: {
    body: {}
  },

  validTeamListSearch: {
    body: { search: '' }
  },

  validTeamFind: {
    params: {
      id: teamDoc._id
    }
  },

  inValidTeamFind: {
    params: {}
  },

  validTeamCreate: {
    body: {
      name: 'Team One',
      stadium: 'Stadium'
    }
  },

  inValidTeamCreate: {
    body: {
      name: 'Team One',
      stadium: 'Stadium',
      logo: invalidLogo
    }
  },

  validTeamUpdate: {
    params: { id: teamDoc._id },
    body: {
      name: 'Team One',
    }
  },

  inValidTeamUpdate: {
    params: { id: teamDoc._id },
    body: {logo: invalidLogo}
  },

  validTeamDelete: {
    params: {
      id: teamDoc._id
    }
  },

  inValidTeamDelete: {
    params: {}
  },
}