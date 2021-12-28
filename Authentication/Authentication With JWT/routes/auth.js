const express = require('express');
const config = require('config');
const router = express.Router();
const User = require('../models/User'); // add in correct models...

// Login
router.post('login', async (req, res) => { });

// Register
router.post('register', async (req, res) => { });

module.exports = router;
