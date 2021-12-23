const express = require('express');
const router = express.Router();
const User = require('../models/user');

// add in the correct models...
const User = require('../models/user');

router.get('/test', (req, res) => {
    res.send("testing routes...");
});

router.get('/register', (req, res) => {
    res.render('register');
});

router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    // when a user registers, we need to make sure that this user doesn't already exist in the database. We'll do this by looking for the email address in the database...
    let user = await User.findOne({ email });
    if (user) {
        console.log("Sorry. This email already exists in the database.")
        return res.redirect('/register');
    }

    // if this user doesn't already exist in the database, we need to save this new user to the database...
    user = new User({
        username: username,
        email: email,
        password: "something" // we don't want to save this string password in our database, so we'll use bcrypt...
    });
});

module.exports = router;
