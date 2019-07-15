const express = require('express');
const router = express.Router();
const FixturesController = require('../app/controllers/Fixtures.controller');
const TryCatch = require('../utils/TryCatch.utils');

/**
 * Fixture List
 */
router.get('/li/:code', TryCatch(FixturesController.verifyLink));

module.exports = router;