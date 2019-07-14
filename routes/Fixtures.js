const express = require('express');
const router = express.Router();
const Validation = require('../app/validations');
const Validator = require('./middleware/Validator.middleware');
const AuthMiddleware = require('./middleware/Auth.middleware');
const JWTCheckMiddleware = require('./middleware/JWTCheck.middleware');
const GuardedMiddleware = require('./middleware/Guarded.middleware');
const FixturesController = require('../app/controllers/Fixtures.controller');
const TryCatch = require('../utils/TryCatch.utils');

/**
 * Fixture List
 */
router.get('/', TryCatch(FixturesController.list));

/**
 * Single Fixture
 */
router.get('/:id',
  TryCatch(FixturesController.find)
);

/**
 * Create Fixture
 */
router.post('/',
  JWTCheckMiddleware,
  AuthMiddleware.authenticate('jwt', {session: false}),
  GuardedMiddleware(['admin']),
  Validation.CreateFixture,
  Validator,
  TryCatch(FixturesController.create)
);

/**
 * Update Fixture
 */
router.put('/:id',
  JWTCheckMiddleware,
  AuthMiddleware.authenticate('jwt', {session: false}),
  GuardedMiddleware(['admin']),
  Validation.UpdateFixture,
  Validator,
  TryCatch(FixturesController.update)
);

/**
 * Delete Fixture
 */
router.delete('/:id',
  JWTCheckMiddleware,
  AuthMiddleware.authenticate('jwt', {session: false}),
  GuardedMiddleware(['admin']),
  TryCatch(FixturesController.delete)
);

module.exports = router;