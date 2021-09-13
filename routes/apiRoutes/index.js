const express = require('express');

const router = express.Router();


router.use(require('./votersRoutes'));
router.use(require('./candidateRoutes'));
router.use(require('./voteRoutes'));

module.exports = router 