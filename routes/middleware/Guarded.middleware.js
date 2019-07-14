const { internalError, unauthorized } = require('../../utils/Response.util');
module.exports = allowed => {
  if(!Array.isArray(allowed))
    throw new TypeError('Please pass an array of allow roles');
  return (req, res, next) => {
    const {user} = req;
    if(!user)
      return internalError(res,
        'An internal error occured, pleas try again in a moment.'
      );
    if(allowed.indexOf(user.role) === -1)
      return unauthorized(res, 'Access denied!');
    next();
  };
};