const mongoose = require('mongoose');

module.exports = { 
  // season doc
  seasonDoc: {
    _id: new mongoose.Types.ObjectId(),
    name: 'Season One',
    startDate: new Date().toUTCString(),
    endDate: new Date().toUTCString()
  }
};