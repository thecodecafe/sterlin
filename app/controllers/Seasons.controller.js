const Repo = require('../repositories/Season.repository');
const {
  created,
  completed,
  notFound,
  badRequest
} = require('../../utils/Response.util');

class SeasonsController {
  static async list(req, res) {
    // get allowed params
    const { search } = req.body;
    // retrieve collection of seasons
    const data = await Repo.list({search});
    // return collection data
    return completed(res, 'Teams retrieved', data);
  }

  static async find(req, res) {
    try{
      // find season by the given ID
      const season = await Repo.findById(req.params.id);
      // return a response with the found season
      return completed(res, 'Found season.', season);
    }catch(error){
      // return not found response.
      return notFound(res, error.message);
    }
  }

  static async create(req, res) {
    try{
      // create season
      const season = await Repo.create(req.body);
      // return success response with season data
      return created(res, 'Team created.', season);
    }catch(error){
      // return error if failed to save season
      return badRequest(res, error.message);
    }
  }

  static async update(req, res) {
    try{
      // create season
      await Repo.update(req.params.id, req.body);
      // return success response with season data
      return completed(
        res,
        'Team updated.',
        await Repo.findById(req.params.id)
      );
    }catch(error){
      // return error if failed to save season
      return badRequest(res, error.message);
    }
  }

  static async delete(req, res) {
    try{
      // delete season
      await Repo.delete(req.params.id);
      // return success response
      return completed(res, 'Team deleted.');
    }catch(error){
      // return not found response
      return badRequest(res, error.message);
    }
  }
}

module.exports = SeasonsController;