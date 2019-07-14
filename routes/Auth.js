const express = require('express');
const router = express.Router();
const Validator = require('./middleware/Validator.middleware');
const AuthController = require('../app/controllers/Auth.controller');
const TryCatch = require('../utils/TryCatch.utils');
const Validations = require('../app/validations');

/**
 * Login
 */
router.post('/login',
  Validations.Login,
  Validator,
  TryCatch(AuthController.login)
);

/**
 * Sign Up
 */
router.post('/signup',
  Validations.SignUp,
  Validator,
  TryCatch(AuthController.signup)
);

module.exports = router;