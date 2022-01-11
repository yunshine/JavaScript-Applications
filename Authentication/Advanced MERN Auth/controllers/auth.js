const User = require('../models/User'); // add in correct models...

exports.register = async (req, res, next) => {
    const { username, email, password } = req.body;

    try {
        // to register a user, we will create (and save) a new user to the database. Checking to see if the user already exists and hashing of the password prior to saving will take place in middleware.
        const user = await User.create({username, email, password});

        res.status(201).json({ success: true, user: user }); // A 201 status code indicates that the request has succeeded and has led to the creation of a NEW resource
    } catch (error) {
        console.log("There was an error in the registration process: ", error);
        res.status(500).json({ success: false, error: error.message }); // A 500 status code indicates that there was an internal server error
    }
};

exports.login = (req, res, next) => {
    res.send("Login Route");
};

exports.forgotPassword = (req, res, next) => {
    res.send("Forgot Password Route");
};

exports.resetPassword = (req, res, next) => {
    res.send("Reset Password Route");
};
