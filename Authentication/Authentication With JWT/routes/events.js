const express = require('express');
const router = express.Router();
const Event = require('../models/Event'); // add in correct models...
const middleware = require('../middleware/index');// add in the middlewareObject which I'll used for authorization for protected routes...


// Index Route - Events
router.get('/', middleware.isAuthorized, async (req, res) => {
    res.send("this worked perfectly fine...")
});

// CREATE Route - Events
router.post('/events', middleware.isAuthorized, async (req, res) => { });

// Update Route - Events
router.put('/events/:id', middleware.isAuthorized, async (req, res) => { });

// Destroy Route - Events
router.delete('/events/:id', middleware.isAuthorized, async (req, res) => { });

module.exports = router;
