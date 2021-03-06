const Model = require('../models/Team.model');
const { url } = require('../../configs/app');
const slugify = require('slugify');

const createSearchFilter = search => {
  if(!search || search.trim().length < 1) return [];
  const filter = [
    {slug: {'$regex': `.*${search.toLowerCase()}.*`}},
    {name: {'$regex': `.*${search}.*`}},
    {stadium: {'$regex': `.*${search}.*`}},
    {slug: {'$regex': `.*${slugify(search)}.*`}}
  ];
  // add extra steps if term has more words
  if(search.split().length > 1){
    const head = search.substr(0, search.length / 2);
    const tail = search.substr(search.length / 2, search.length);
    filter.push({slug: {'$regex': `.*${head.toLowerCase()}.*`}});
    filter.push({name: {'$regex': `.*${head}.*`}});
    filter.push({stadium: {'$regex': `.*${head}.*`}});
    filter.push({slug: {'$regex': `.*${tail.toLowerCase()}.*`}});
    filter.push({name: {'$regex': `.*${tail}.*`}});
    filter.push({stadium: {'$regex': `.*${tail}.*`}});
  }
  return filter;
};

class TeamRepository {
  static async list(options) {
    let {search, fields} = options || {};
    const searchFilter = createSearchFilter(search);
    // set fields, all by default
    fields = Array.isArray(fields) ? fields.join(' ') : null;
    // get teams
    let query = Model.find({}, fields);
    // add search filter is any is psecified
    if(searchFilter.length > 0) query = query.and([{'$or': searchFilter}]);
    // execute query
    return await query.exec();
  }

  static async findById(id) {
    // fail if an id is not passed
    if(!id) return Promise.reject(new Error('Can\t find team without an ID'));
    // find team by it's ID
    const team = await Model.findOne({_id: id});
    // reject promise if no team was found
    if(!team) return Promise.reject(new Error('Team not found'));
    // resolve with team info and fixtures link if found
    return Promise.resolve({
      ...team._doc,
      fixtures: `${url}/fixtures/search?team=${id}`
    });
  }

  static async create({ name, logo, stadium }) {
    try{
      // instantiate new team
      let team = new Model({
        name,
        slug: slugify(String(name).toLowerCase()),
        stadium,
        logo: logo ? logo : null
      });

      // save team
      team = await team.save();

      // resolve with team info and fixtures link
      return Promise.resolve({
        ...team._doc,
        fixtures: `${url}/fixtures/search?team=${team.id}`
      });
    }catch(error){
      // reject with the given error
      return Promise.reject(error);
    }
  }

  static async update(id, {name, logo, stadium }) {
    // fail if an id is not passed
    if(!id)
      return Promise.reject(new Error('Can\t update team without an ID'));
    // updates to perform
    const update = {};
    // add updates when available
    if(name) {
      update.name = name;
      update.slug = slugify(name.toLowerCase());
    }
    if(logo) update.logo = logo;
    if(stadium) update.stadium = stadium;
    // find team by it's ID
    let team = await Model.findOne({_id: id});
    // reject promise if no team was found
    if(!team) return Promise.reject(new Error('Team not found'));
    // update collection with the given id
    Object.keys(update).forEach(key => {
      team[key] = update[key];
    });
    team = team.save();
    // return true if items where updated
    return Promise.resolve(team);
  }

  static async delete(id) {
    // fail if an id is not passed
    if(!id)
      return Promise.reject(new Error('Can\t delete team without an ID'));

    // find team by it's ID
    const team = await Model.findOne({_id: id});

    // reject promise if no team was found
    if(!team) return Promise.reject(new Error('Team not found'));

    // delete team
    await Model.deleteOne({_id: id});

    // resolve with the count for the number of items deleted
    return Promise.resolve(true);
  }
}

module.exports = TeamRepository;