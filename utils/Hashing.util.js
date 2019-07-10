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
  hash: str => bcrypt.hashSync(str, 20),

  /**
   * Compares a string against an encrypted password.
   * @param {String} str non-encrypted string
   * @param {String} encryptedStr encrypted string
   * @returns Boolean
   */
  hashCompare: (str, encryptedStr) => bcrypt.compareSync(str, encryptedStr)
};