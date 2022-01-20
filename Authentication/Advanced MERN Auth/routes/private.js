const express = require('express');
const router = express.Router();
const { protectRoute } = require('../middleware/auth');
const { getPrivateData } = require('../controllers/private');

// router.route('/').get(getPrivateData);
router.get('/', protectRoute, getPrivateData);

module.exports = router;
