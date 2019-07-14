const jwt = require('jsonwebtoken');
const { secret, ttl } = require('../configs/jwt');

module.exports = {
  /**
   * Syncronously crates a jwt token with the data sent.
   * @param {Object} data
   * @returns String
   */
  createToken: data => jwt.sign(data, secret, {expiresIn: ttl})
};