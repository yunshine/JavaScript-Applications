const express = require('express');
const router = express.Router();
const User = require('../models/Event'); // add in correct models...

// Index Route - Events
router.get('/', async (req, res) => { });

// CREATE Route - Events
router.post('/events', async (req, res) => { });

// Update Route - Events
router.put('/events/:id', async (req, res) => { });

// Destroy Route - Events
router.delete('/events/:id', async (req, res) => { });

module.exports = router;
