const express = require('express');
const router = express.Router();
const Event = require('../models/Event'); // add in correct models...
const middleware = require('../middleware/index');// add in the middlewareObject which I'll used for authorization for protected routes...


// Index Route - Events
router.get('/', async (req, res) => { });

// CREATE Route - Events
router.post('/events', async (req, res) => { });

// Update Route - Events
router.put('/events/:id', async (req, res) => { });

// Destroy Route - Events
router.delete('/events/:id', async (req, res) => { });

module.exports = router;
