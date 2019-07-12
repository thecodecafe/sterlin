const Model = require('../models/Season.model');
const FixtureRepo = require('./Fixture.repository');

class SeasonRepository {
  static async list(options = {}) {
    // get seasons
    return await Model.find()
      .and(options.search ? [
        {'$or': {name: {'$regex': `.*${options.search}.*`}}}
      ] : []);
  }

  static async findById(id) {
    // fail if an id is not passed
    if(!id) return Promise.reject(new Error('Can\t find season without an ID'));
    // find season by it's ID
    const season = await Model.findOne({_id: id});
    // reject promise if no season was found
    if(!season) return Promise.reject(new Error('Season not found'));
    // resolve with season info and fixtures link if found
    return Promise.resolve(season);
  }

  static async create({ name, startDate, endDate }) {
    try{
      // instantiate new season
      let season = new Model({
        name,
        startDate,
        endDate
      });

      // save season
      season = await season.save();

      // resolve with season info and fixtures link
      return Promise.resolve(season);
    }catch(error){
      // reject with the given error
      return Promise.reject(error);
    }
  }

  static async update(id, {name, startDate, endDate }) {
    // fail if an id is not passed
    if(!id)
      return Promise.reject(new Error('Can\t update season without an ID'));

    // updates to perform
    const update = {};
    // add updates when available
    if(name) update.name = name;
    if(startDate) update.startDate = startDate;
    if(endDate) update.endDate = endDate;

    // find season by it's ID
    let season = await Model.findOne({_id: id});
    // reject promise if no season was found
    if(!season) return Promise.reject(new Error('Season not found'));

    // update collection with the given id
    Object.keys(update).forEach(key => {
      season[key] = update[key];
    });
    season = season.save();
    // return true if items where updated
    return Promise.resolve(season);
  }

  static async delete(id) {
    // fail if an id is not passed
    if(!id)
      return Promise.reject(new Error('Can\t delete season without an ID'));

    // find season by it's ID
    const season = await Model.findOne({_id: id});

    // reject promise if no season was found
    if(!season) return Promise.reject(new Error('Season not found'));

    // delete season
    await Model.deleteOne({_id: id});
    
    // delete fixtures
    await FixtureRepo.deleteBySeason(id);

    // resolve with the count for the number of items deleted
    return Promise.resolve(true);
  }
}

module.exports = SeasonRepository;