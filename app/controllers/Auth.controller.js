const { created, completed, badRequest } = require('../../utils/Response.util');
const { createToken } = require('../../utils/Token.util');
const Repo = require('../repositories/User.repository');

class AuthController {
  static async login(req, res) {
    // deconstruct request body
    const { email, password } = req.body;
    try{
      // find user with the given email
      const user = await Repo.findByEmailAndPassword(email, password);
      // get user name and ID from user object
      const {name, _id, role} = user;
      // return completed response with token
      return completed(res, 'Login complete!', {
        token: createToken({id: String(user._id)}),
        user: { name, id: String(_id), email, role }
      });
    }catch(error){
      // return failer response
      return badRequest(res, error.message);
    }
  }

  static async signup(req, res){
    try{
      // create new user
      const {_id, email, name, role} = await Repo.create(req.body);
      // return created response with token
      return created(res, 'Sign up complete!', {
        token: createToken({id: String(_id)}),
        user: { id: String(_id), email, name, role}
      });
    }catch(error){
      // return error response
      return badRequest(res, error.message);
    }
  }
}

module.exports = AuthController;