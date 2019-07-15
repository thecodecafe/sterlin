const Model = require('../models/Fixture.model');
const TeamRepo = require('./Team.repository');

/**
 * Creates date filter for when fetching a list of fixtures.
 * @param {Object} options
 */
const createListDateFilter = options => {
  // filters container
  const filter = [];
  // add start date
  if (options.from)
    filter.push({ startsAt: { '$gte': options.from } });
  // add end date
  if (options.to)
    filter.push({ endsAt: { '$lte': options.to } });
  // retun filter result
  return filter;
};

const createListStatusFilter = status => {
  // filters container
  const filter = [];
  // pending fixtures
  if (status === 'pending')
    filter.push({ startsAt: { '$gte': new Date().toUTCString() } });
  // ongoing fixtures
  if (status === 'ongoing') {
    filter.push({ startsAt: { '$lte': new Date().toUTCString() } });
    filter.push({ endsAt: { '$gt': new Date().toUTCString() } });
  }
  // completed fixtures
  if (status === 'completed')
    filter.push({ sendsAt: { '$gt': new Date().toUTCString() } });
  // retun filter result
  return filter;
};

/**
 * Creates team filter for when fetching a list of fixtures.
 * @param {Object} options
 */
const createListTeamFilter = async search => {
  // filters container
  const filter = [];
  // check if options is passed with search term
  if (search) {
    // gete team IDs
    let teamIds = await TeamRepo.list({
      search: search, fields: ['_id']
    });
    teamIds = teamIds.map(item => item._id);
    // filter home and away team where id matches the list of returned teams
    filter.push({ '$or': { homeTeam: { '$in': teamIds } } });
    filter.push({ '$or': { awayTeam: { '$in': teamIds } } });
  }
  // return filter
  return filter;
};

const createUpdateList = data => {
  const updates = {};
  // add updates that were passed
  Object.keys(data).forEach(item => {
    if (['season', '_id'].indexOf(item) !== -1) return;
    if (item === 'startsAt') {
      updates.startsAt = data[item];
      updates.endsAt = new Date(
        new Date(data[item]).getTime() + ((60 * 100) * 1000)
      ).toUTCString();
      return;
    }
    updates[item] = data[item];
  });
  return updates;
};

class FixtureRepository {
  static async list(options) {
    const { from, to, search, status } = options || {};
    const searchFilter = await createListTeamFilter(search);
    const dateFilter = status
      ? createListStatusFilter(status)
      : createListDateFilter({ from, to });

    // get fixtures
    let query = Model.find()
      .populate('season')
      .populate('homeTeam')
      .populate('awayTeam');

    // add filters if set
    if(dateFilter.length > 0) query = query.and(dateFilter);
    if(searchFilter.length > 0) query = query.and(searchFilter);

    // execute query
    return await query.exec();
  }

  static async findById(id) {
    // fail if an id is not passed
    if(!id)
      return Promise.reject(new Error('Can\t find fixture without an ID'));

    // find fixture by it's ID
    const fixture = await Model.findOne({ _id: id })
      .populate('season')
      .populate('homeTeam')
      .populate('awayTeam');
    // reject promise if no fixture was found
    if (!fixture) return Promise.reject(new Error('Fixture not found'));

    // resolve with fixture info and fixtures link if found
    return Promise.resolve(fixture);
  }

  static async create({ season, homeTeam, awayTeam, startsAt }) {
    try {
      // instantiate new fixture
      let fixture = new Model({
        season, homeTeam, awayTeam, startsAt,
        endsAt: new Date(
          new Date(startsAt).getTime() + ((60 * 100) * 1000)
        ).toUTCString()
      });

      // save fixture
      fixture = await fixture.save();
      // get fixture info
      await fixture
        .populate('season')
        .populate('homeTeam')
        .populate('awayTeam');

      // resolve with fixture info and fixtures link
      return Promise.resolve(fixture);
    } catch (error) {
      // reject with the given error
      return Promise.reject(error);
    }
  }

  static async update(id, data) {
    // fail if an id is not passed
    if(!id)
      return Promise.reject(new Error('Can\t update fixture without an ID'));

    // create the updates list
    const update = createUpdateList(data);

    // find fixture by it's ID
    let fixture = await Model.findOne({_id: id});

    // reject promise if no fixture was found
    if(!fixture) return Promise.reject(new Error('Fixture not found'));

    // no need to update if nothing was passed
    if(Object.keys(update).length < 1) return fixture;

    // update collection with the given id
    Object.keys(update).forEach(key => fixture[key] = update[key]);
    // save update
    fixture = fixture.save();

    // return true if items where updated
    return Promise.resolve(fixture);
  }

  static async delete(id) {
    // fail if an id is not passed
    if(!id)
      return Promise.reject(new Error('Can\t delete fixture without an ID'));

    // find fixture by it's ID
    const fixture = await Model.findOne({_id: id});

    // reject promise if no fixture was found
    if(!fixture) return Promise.reject(new Error('Fixture not found'));

    // delete fixture
    await Model.deleteOne({_id: id});

    // resolve with the count for the number of items deleted
    return Promise.resolve(true);
  }

  static async deleteBySeason(season) {
    // delete fixture
    await Model.deleteMany({ season });
    // resolve with delete cound
    return Promise.resolve(true);
  }
}

module.exports = FixtureRepository;