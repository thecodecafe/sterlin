const { appKey } = require("../configs/app");
const AES = require("crypto-js/aes");
const UTF8_ENC = require("crypto-js/enc-utf8");

/**
 * Encrypts any given data
 * @param {any} data
 */
module.exports.encrypto = data => {
  // don't encrypt null or undefined
  if(data === undefined || data === null) return null;
  // encrypt data
  const encryptedString = AES.encrypt(JSON.stringify(data), appKey);
  // return encrypted data as string
  return encryptedString.toString();
};

/**
 * Decrypts any system encrypted data
 * @param {any} data
 */
module.exports.decrypto = data => {
  if (typeof data !== 'string' || data.trim().length < 4) return null;
  // decrypt data
  let decryptedString = AES.decrypt(data, appKey);
  // convert decrypted data to string
  decryptedString = decryptedString.toString(UTF8_ENC);
  // return decrypted data an parse from JSON string
  return decryptedString ? JSON.parse(decryptedString) : null;
};