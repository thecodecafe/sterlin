const packageJSON = require('../package.json');

module.exports = {
  /**
   * Application Version
   * Here we store our application version.
   * @var String
   */
  appVersion: packageJSON.verssion,

  /**
   * Application Name
   * This is our application name.
   * @var String
   */
  appName: packageJSON.name,

  /**
   * Application Key
   * This is our application key.
   * @var String
   */
  appKey: process.env.APP_KEY,

  /**
   * Application URL
   * This is our applications url.
   * @var String
   */
  url: process.env.APP_URL,

  /**
   * Application Debug State
   * This is used to determine whether the application is
   * in a debug state, this is useful for when displaying
   * errors for different environments
   * @var Boolean
   */
  debug: process.env.APP_DEBUG || false,

  /**
   * Application Port
   * The port our aplication will be running form
   * @var Number
   */
  port: process.env.PORT || process.env.APP_PORT,

  /**
   * Mongo DB URI
   * This is used to connect to a mongodb database
   * @var String
   */
  mongoURI: 'mongodb://'
    + process.env.DB_USER
    + ':' + process.env.DB_PASSWORD
    + process.env.DB_HOST
    + '/' + process.env.DB_NAME
};