const User = require('../models/User'); // add in correct models...

exports.register = async (req, res, next) => {
    const { username, email, password } = req.body;

    try {
        // to register a user, we will create (and save) a new user to the database. Checking to see if the user already exists and hashing of the password prior to saving will take place in middleware.
        const user = await User.create({ username, email, password });

        res.status(201).json({ success: true, user: user }); // A 201 status code indicates that the request has succeeded and has led to the creation of a NEW resource
    } catch (error) {
        console.log("There was an error in the registration process: ", error);
        res.status(500).json({ success: false, error: error.message }); // A 500 status code indicates that there was an internal server error
    }
};

exports.login = async (req, res, next) => {
    const { email, password } = req.body;

    // check on the server side if the user has typed in an email and password
    if (!email || !password) {
        res.status(400).json({ success: false, error: "Please provide an email address and password." }); // The res. status() function sets the HTTP status for the response; A 400 status code indicates that the server can't or won't process the request due to something that is perceived to be a client error
    }

    // does this user exist in our database?
    try {
        let user = await User.findOne({ email }).select("+password"); // we need the .select because in the User model, we set it so that the password isn't returned unless specified

        // if the email provided by the user does not exist...
        if (!user) {
            res.status(400).json({ success: false, error: "Sorry. That email address or password is incorrect." }); // The res. status() function sets the HTTP status for the response; A 400 status code indicates that the server can't or won't process the request due to something that is perceived to be a client error
        }

        // if the email address matches, bcryptjs is used to compare the password in the req.body to the password in the database...
        const isMatch = await bcrypt.compare(password, user.password);
    } catch (error) {

    }
};

exports.forgotPassword = (req, res, next) => {
    res.send("Forgot Password Route");
};

exports.resetPassword = (req, res, next) => {
    res.send("Reset Password Route");
};
