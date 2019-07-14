const fs = require('fs');
const path = require('path');
const baseFileName = path.basename(__filename);
const validations = {};

/**
 * This will be used to check if the passed
 * file is a valid validation file.
 * @param {String} file
 */
const filesFilter = file => {
  return file.indexOf('.') !== 0
    && (file !== baseFileName)
    && (file.slice(-14) === '.validation.js');
};

/**
 * This will import the validation from the validation file name
 * give and add it to the db object.
 * @param {String} file
 */
const registrer = file => {
  const filename = file.split('.');
  validations[filename[0]] = require(path.join(__dirname, file));
};

/**
 * Here we read the validation files from the validations directory
 * and then for each file import it's validation into seqeulize
 * and initialise the validation.
 */
fs
  .readdirSync(__dirname)
  .filter(filesFilter)
  .forEach(registrer);

// export db
module.exports = validations;