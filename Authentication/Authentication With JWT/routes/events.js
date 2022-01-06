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
router.post('/events', middleware.isAuthorized, async (req, res) => {
    const { title, description, date } = req.body;

    try {
        // create a new Event object...
        const event = new Event({
            title,
            description,
            date
        });

        // save the new Event object to the database...
        const newEvent = await event.save();

        res.status(201).json({ event: newEvent }); // A 201 status code indicates that the request has succeeded and has led to the creation of a NEW resource
    } catch (error) {
        console.log("Something went wrong while creating your new event...", error);
        res.status(500).json({ error: "There was a server error while creating your new event..." }); // A 500 status code indicates that there was an internal server error
    }
});


// Update Route - Events
router.put('/events/:id', middleware.isAuthorized, async (req, res) => {
    const eventID = req.params.id;
    const { title, description, date } = req.body;
    const updatedEvent = {};

    try {
        // we'll check to see if anything was updated in the req.body...
        if (title) updatedEvent.title = title;
        if (description) updatedEvent.description = description;
        if (date) updatedEvent.date = date;

        // find the Event to update, then save the updated Event to the database...
        const event = await Event.findByIdAndUpdate(eventID, { $set: updatedEvent }, { new: true }); // the new: true option means that this event variable will be the updated one, not the one we found by ID
        res.status(201).json({ event }); // A 201 status code indicates that the request has succeeded and has led to the creation of a NEW resource
    } catch (error) {
        console.log("Something went wrong while updating your new event...", error);
        res.status(500).json({ error: "There was a server error while updating your new event..." }); // A 500 status code indicates that there was an internal server error
    }
});

// Destroy Route - Events
router.delete('/events/:id', middleware.isAuthorized, async (req, res) => { });

module.exports = router;
