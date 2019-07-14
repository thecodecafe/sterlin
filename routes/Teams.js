const express = require('express');
const router = express.Router();
const Validation = require('../app/validations');
const Validator = require('./middleware/Validator.middleware');
const AuthMiddleware = require('./middleware/Auth.middleware');
const JWTCheckMiddleware = require('./middleware/JWTCheck.middleware');
const GuardedMiddleware = require('./middleware/Guarded.middleware');
const TeamsController = require('../app/controllers/Teams.controller');
const TryCatch = require('../utils/TryCatch.utils');

/**
 * Team List
 */
router.get('/', TryCatch(TeamsController.list));

/**
 * Single Team
 */
router.get('/:id',
  TryCatch(TeamsController.find)
);

/**
 * Create Team
 */
router.post('/',
  JWTCheckMiddleware,
  AuthMiddleware.authenticate('jwt', {session: false}),
  GuardedMiddleware(['admin']),
  Validation.CreateTeam,
  Validator,
  TryCatch(TeamsController.create)
);

/**
 * Update Team
 */
router.put('/:id',
  JWTCheckMiddleware,
  AuthMiddleware.authenticate('jwt', {session: false}),
  GuardedMiddleware(['admin']),
  Validation.UpdateTeam,
  Validator,
  TryCatch(TeamsController.update)
);

/**
 * Delete Team
 */
router.delete('/:id',
  JWTCheckMiddleware,
  AuthMiddleware.authenticate('jwt', {session: false}),
  GuardedMiddleware(['admin']),
  TryCatch(TeamsController.delete)
);

module.exports = router;