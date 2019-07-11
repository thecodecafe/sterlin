const bcrypt = require('bcrypt');

/**
 * Password Hash
 * Hashes a password with bcrypt.
 */
module.exports = {
  /**
   * Hashed a string and returns the hashed string.
   * @param {String} str string to be hashed
   * @returns String
   */
  hash: str => {
    // throw an error if string is not passed
    if(!str || typeof str !== 'string')
      throw new Error('Please supply a string to be hashed.');
    // encrypt string an return
    return bcrypt.hashSync(str, 10);
  },

  /**
   * Compares a string against an encrypted password.
   * @param {String} str non-encrypted string
   * @param {String} encryptedStr encrypted string
   * @returns Boolean
   */
  hashCompare: (str, encryptedStr) => bcrypt.compareSync(str, encryptedStr)
};