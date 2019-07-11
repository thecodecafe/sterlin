/**
 * JSON Response.
 * @param success Boolean (REQURIED)
 * @param message String (REQUIRED)
 * @param data Object (OPTIONAL)
 * @param meta Object (OPTIONAL)
 * @var Object
 */

/**
 * The response utility helps create responses
 * for different cases.
 */
module.exports = {
  /**
   * This is meant to be used in a case where a request
   * causes the creation of a new data.
   * @param {Object} res Response Object
   * @param {String} message
   * @param {Object} data
   * @param {Object} meta
   * @return Object
   */
  created: (
    res,
    message = 'Created!',
    data = undefined,
    meta = undefined
  ) => res.status(201).json({
    success: true,
    message: message,
    data: data,
    meta: meta
  }),

  /**
   * This is meant to be used in a case where data
   * is retrieved, a side effect occurrs
   * successfully, or data is update.
   * @param {Object} res Response Object
   * @param {String} message
   * @param {Object} data
   * @param {Object} meta
   * @return Object
   */
  completed: (
    res,
    message = 'Completed!',
    data = undefined,
    meta = undefined
  ) => res.status(200).json({
    success: true,
    message: message,
    data: data,
    meta: meta
  }),

  /**
   * This is meant to be used in a case where access is
   * forbidden to an authenticated user.
   * @param {Object} res Response Object
   * @param {String} message
   * @return Object
   */
  accessForbidden: (
    res,
    message = 'Access forbidden!'
  ) => res.status(403).json({
    success: false,
    message: message
  }),

  /**
   * This is meant to be used in a case where an
   * unauthenticated user makes a request.
   * @param {Object} res Response Object
   * @param {String} message
   * @return Object
   */
  unauthorized: (
    res,
    message = 'You are unauthorized!'
  ) => res.status(401).json({
    success: false,
    message: message
  }),

  /**
   * This is meant to be used in a case where
   * a user makes a bad request.
   * @param {Object} res Response Object
   * @param {String} message
   * @return Object
   */
  badRequest: (
    res,
    message = 'Invalid request!'
  ) => res.status(400).json({
    success: false,
    message: message
  }),

  /**
   * This is meant to be used in a case where validation for a
   * request did not pass through successfully.
   * @param {Object} res Response Object
   * @param {String} message
   * @param {Object} errors
   * @return Object
   */
  validationError: (
    res,
    message = 'Invalid data sent!',
    errors = {}
  ) => res.status(422).json({
    success: false,
    message: message,
    meta: { errors }
  }),

  /**
   * This is meant to be used in a case where a requested data is
   * not found or an endpoint does not exist.
   * @param {Object} res Response Object
   * @param {String} message
   * @return Object
   */
  notFound: (
    res,
    message = 'Resource not found!'
  ) => res.status(404).json({
    success: false,
    message: message
  }),

  /**
   * This is meant to be used in a case where an internal erro occured.
   * E.g. like a db connection failed.
   * @param {Object} res Response Object
   * @param {String} message
   * @return Object
   */
  internalError: (
    res,
    message = 'An internal error occured!'
  ) => res.status(500).json({
    success: false,
    message: message
  })
};