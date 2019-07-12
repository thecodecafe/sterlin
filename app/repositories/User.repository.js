const Model = require('../models/User.model');
const { hash, hashCompare } = require('../../utils/Hashing.util');

class UserRepository {
  static async create({ name, email, password, isAdmin }) {
    try{
      // instantiate new user
      let user = new Model({name, email, isAdmin, password: hash(password)});
      // save user
      user = await user.save();
      // resolve the promise
      return Promise.resolve(user);
    }catch(error){
      return Promise.reject(error);
    }
  }
  static async findByEmailAndPassword(email, password) {
    // reject if no email is passed
    if(!email) return Promise.reject('Incorrect credentials.');
    // reject if no password is passed
    if(!password) return Promise.reject('Incorrect credentials.');
    // find user
    const user = await Model.findOne({email: email});
    // reject if not found
    if(!user) return Promise.reject(new Error('Incorrect credentials.'));
    // check if passwords match
    if(!hashCompare(password, user.password))
      return Promise.reject(new Error('Incorrect credentials.'));
    // resolve if found
    return Promise.resolve(user);
  }
}

module.exports = UserRepository;