module.exports = {
  /**
   * JWT SECRET
   * The secret user to encode and decode the json web token
   * @var String
   */
  secret: process.env.JWT_SECRET,

  /**
   * JWT TTL
   * The lifespan of each generated json web token, in minutes.
   * @var Number
   */
  ttl: process.env.JWT_TTL
};