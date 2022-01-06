const express = require('express');
const router = express.Router();
const Event = require('../models/Event'); // add in correct models...
const middleware = require('../middleware/index');// add in the middlewareObject which I'll used for authorization for protected routes...

// Index Route - Events
router.get('/', middleware.isAuthorized, async (req, res) => {
    try {
        const events = await Event.find();
        res.status(200).json({ events }); // A 200 status code indicates that the request has succeeded (depending on the HTTP request method)...
    } catch (error) {
        console.log("Something went wrong while finding events...", error);
        res.status(500).json({ error: "There was a server error while finding events..." }); // A 500 status code indicates that there was an internal server error
    }
});

// CREATE Route - Events
router.post('/events', middleware.isAuthorized, async (req, res) => { });

// Update Route - Events
router.put('/events/:id', middleware.isAuthorized, async (req, res) => { });

// Destroy Route - Events
router.delete('/events/:id', middleware.isAuthorized, async (req, res) => { });

module.exports = router;
