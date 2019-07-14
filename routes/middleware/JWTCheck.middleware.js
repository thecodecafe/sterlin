const { accessForbidden } = require('../../utils/Response.util');
module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if(!authorization) return accessForbidden(res, 'Authentication required.');
  next();
};