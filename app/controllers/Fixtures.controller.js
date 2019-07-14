const Repo = require('../repositories/Fixture.repository');
const {
  created,
  completed,
  notFound,
  badRequest
} = require('../../utils/Response.util');

class FixtureController {
  static async list(req, res) {
    // retrieve collection of fixtures
    const data = await Repo.list(req.query);
    // return collection data
    return completed(res, 'Fixtures retrieved', data);
  }

  static async find(req, res) {
    try {
      // find fixture by the given ID
      const fixture = await Repo.findById(req.params.id);
      // return a response with the found fixture
      return completed(res, 'Found fixture.', fixture);
    } catch (error) {
      // return not found response.
      return notFound(res, error.message);
    }
  }

  static async create(req, res) {
    try {
      // create fixture
      const fixture = await Repo.create(req.body);
      // return success response with fixture data
      return created(res, 'Fixture created.', fixture);
    } catch (error) {
      // return error if failed to save fixture
      return badRequest(res, error.message);
    }
  }

  static async update(req, res) {
    try {
      // create fixture
      await Repo.update(req.params.id, req.body);
      // return success response with fixture data
      return completed(
        res,
        'Fixture updated.',
        await Repo.findById(req.params.id)
      );
    } catch (error) {
      // return error if failed to save fixture
      return badRequest(res, error.message);
    }
  }

  static async delete(req, res) {
    try {
      // delete fixture
      await Repo.delete(req.params.id);
      // return success response
      return completed(res, 'Fixture deleted.');
    } catch (error) {
      // return not found response
      return badRequest(res, error.message);
    }
  }
}

module.exports = FixtureController;