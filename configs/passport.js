const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const db = require('../models');
const jwtConfig = require('../configs/jwt');
const { User } = db;

/**
 * Here we use passports' jwt strategy to
 * get the user from the token passed in
 * the authorizations header.
 */
passport.use(new JWTStrategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: jwtConfig.secret
  },
  async (payload, done) => {
    // fund user bearing the user id on the payload
    const user = await User.findOne({ where: { id: payload.user_id } });

    // check if the user does not exist
    if (!user) return done(new Error('invalid token'), false);

    // continue request
    done(null, user);
  }
));

// export passport
module.exports = passport;