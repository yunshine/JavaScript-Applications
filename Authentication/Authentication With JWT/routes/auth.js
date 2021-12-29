const express = require('express');
const config = require('config');
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
            return res.status(400).json({ error: "Sorry. This user already exists." });
        }
        const hashedPW = await bcrypt.hash(password, 12); // the "12" is the salt, which is used to make the hash more random...
        // if this user doesn't already exist in the database, we need to save this new user to the database...
        user = new User({
            username: username,
            email: email,
            password: hashedPW // we don't want to save a string password in our database, so we'll use the bcryptjs package to encrypt/hash the password...
        });
    } catch (error) { }





    await user.save(); //Mongoose method used to save the user in the database...

    res.redirect('/login');
});

module.exports = router;
