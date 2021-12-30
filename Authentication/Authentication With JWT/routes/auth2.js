const express = require('express');
const bcrypt = require("bcryptjs"); // used to encrypt/hash passwords...
const jwt = require('jsonwebtoken'); // tokens used for authorization, not authentication...
const config = require('config'); // used to share json values from the default.json file in the config folder
const router = express.Router();
const User = require('../models/User'); // add in correct models...

// Login
router.post('/login', async (req, res) => { });

// Register
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        let user = await User.findOne({ email });

        // when a user registers, we need to make sure that this user doesn't already exist in the database. We'll do this by looking for the email address in the database...
        if (user) {
            return res.status(400).json({ error: "Sorry. This user already exists." }); // The res. status() function sets the HTTP status for the response; A 400 status code indicates that the server can't or won't process the request due to something that is perceived to be a client error
        }

        // if this user doesn't already exist in the database, we need to save this new user to the database...
        const hashedPW = await bcrypt.hash(password, 12); // the "12" is the salt, which is used to make the hash more random...
        user = new User({
            username: username,
            email: email,
            password: hashedPW // we don't want to save a string password in our database, so we'll use the bcryptjs package to encrypt/hash the password...
        });
        const newUser = await user.save(); // .save() is a Mongoose method used to save the user in the database; we also have this user saved as newUser so that we can use it with JWT...

        // once the user is saved, i want to create a payload and send a token (with the payload) to the frontend to tell the frontend that this user was successfully created and is authorized to use the routes in this app...
        const payload = {
            user: {
                _id: newUser._id
            }
        };
        // generates a token...
        const token = jwt.sign(payload, config.get("JWT_SECRET"), { expiresIn: '1hr' });

        // once the token is generated, respond to the client with this token...
        res.status(201).json({ token }); // A 201 status code indicates that the request has succeeded and has led to the creation of a resource
    } catch (error) {
        console.log("There was an error in the registration process: ", error);
        res.status(500).json({ error: "There was a server error in the registration process." });
    }
});

module.exports = router;
