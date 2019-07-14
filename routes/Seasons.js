const express = require('express');
const router = express.Router();
const Validation = require('../app/validations');
const Validator = require('./middleware/Validator.middleware');
const AuthMiddleware = require('./middleware/Auth.middleware');
const JWTCheckMiddleware = require('./middleware/JWTCheck.middleware');
const GuardedMiddleware = require('./middleware/Guarded.middleware');
const SeasonsController = require('../app/controllers/Seasons.controller');
const TryCatch = require('../utils/TryCatch.utils');

/**
 * Season List
 */
router.get('/', TryCatch(SeasonsController.list));

/**
 * Single Team
 */
router.get('/:id',
  TryCatch(SeasonsController.find)
);

/**
 * Create Team
 */
router.post('/',
  JWTCheckMiddleware,
  AuthMiddleware.authenticate('jwt', {session: false}),
  GuardedMiddleware(['admin']),
  Validation.CreateSeason,
  Validator,
  TryCatch(SeasonsController.create)
);

/**
 * Update Team
 */
router.put('/:id',
  JWTCheckMiddleware,
  AuthMiddleware.authenticate('jwt', {session: false}),
  GuardedMiddleware(['admin']),
  Validation.UpdateSeason,
  Validator,
  TryCatch(SeasonsController.update)
);

/**
 * Delete Team
 */
router.delete('/:id',
  JWTCheckMiddleware,
  AuthMiddleware.authenticate('jwt', {session: false}),
  GuardedMiddleware(['admin']),
  TryCatch(SeasonsController.delete)
);

module.exports = router;