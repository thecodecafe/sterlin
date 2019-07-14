const { internalError } = require('./Response.util');
/**
 * @description Wraps a controller function in a try-catch block
 * @param  {object} req - The request object
 * @param  {object} res - The response object
 * @returns Status code and error message if an error is thrown
 */
module.exports = controller => async (req, res) => {
  try {
    await controller(req, res);
  } catch (error) {
    return internalError(res, 'Whoops, something went wrong!');
  }
  return true;
};