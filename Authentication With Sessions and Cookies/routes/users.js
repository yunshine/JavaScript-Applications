const express = require('express');
const bcrypt = require("bcryptjs"); // used to encrypt/hash passwords...
const router = express.Router();
const User = require('../models/user'); // add in the correct models...
const middleware = require('../middleware/index');// add in the middlewareObject which I'll used for authorization...

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

    const hashedPW = await bcrypt.hash(password, 12); // the "12" is the salt, which is used to make the hash more random...

    // if this user doesn't already exist in the database, we need to save this new user to the database...
    user = new User({
        username: username,
        email: email,
        password: hashedPW // we don't want to save a string password in our database, so we'll use the bcryptjs package to encrypt/hash the password...
    });

    await user.save(); //Mongoose method used to save the user in the database...

    res.redirect('/login');
});


router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    let user = await User.findOne({ email });

    // if the email provided by the user does not exist...
    if (!user) {
        console.log("Sorry. That email address or password is incorrect.")
        return res.redirect('/login');
    }

    // if the email address matches, bcryptjs is used to compare the password in the req.body to the password in the database...
    const isMatch = await bcrypt.compare(password, user.password);
    console.log("so far so good", isMatch);

    // if the password provided by the user does not match the password in the database...
    if (!isMatch) {
        console.log("Sorry. That email address or password is incorrect.")
        return res.redirect('/login');
    }

    // if the password is a match, we want to log the user in...
    res.redirect('/test');
});

module.exports = router;
