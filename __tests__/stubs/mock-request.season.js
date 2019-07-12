const { seasonDoc } = require('./mock-data.season');
module.exports = {
  validSeasonList: {
    body: {}
   },
   
   validSeasonListSearch: {
    body: { search: '' }
   },

   validSeasonFind: {
     params: {
       id: seasonDoc._id
     }
   },

   inValidSeasonFind: {
     params: { }
   },

   validSeasonCreate: {
    body: {
     name: 'Season One',
     startDate: new Date().toUTCString(),
     endDate: new Date().toUTCString(),
    }
   },

   inValidSeasonCreate: {
    body: {
     name: 'Season One',
     startDate: new Date().toUTCString()
    }
   },

   validSeasonUpdate: {
    params: {id: seasonDoc._id},
    body: {
     name: 'Season One',
    }
   },

   inValidSeasonUpdate: {
    params: {id: seasonDoc._id},
    body: {
     name: 'Season One',
     startDate: 'invalid date'
    }
   },

   validSeasonDelete: {
     params: {
       id: seasonDoc._id
     }
   },

   inValidSeasonDelete: {
     params: { }
   },
}