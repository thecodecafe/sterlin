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
     startDate: new Date().toISOString(),
     endDate: new Date().toISOString(),
    }
   },

   inValidSeasonCreate: {
    body: {
     name: 'Season One',
     startDate: 'invalid date',
     endDate: 'invalid date',
    }
   },

   validSeasonUpdate: {
    params: {id: seasonDoc._id},
    body: {
     name: 'Season One',
     startDate: new Date().toISOString(),
     endDate: new Date().toISOString(),
    }
   },

   inValidSeasonUpdate: {
    params: {id: seasonDoc._id},
    body: {
     name: 'Season One',
     startDate: 'invalid date',
     endDate: 'invalid date',
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