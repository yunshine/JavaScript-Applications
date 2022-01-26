const User = require('../models/User'); // add in correct models...
const ErrorResponse = require('../utilities/errorResponse');
const sendEmail = require('../utilities/sendEmail');
const crypto = require('crypto'); // used for hashing tokens

exports.register = async (req, res, next) => {
    const { username, email, password } = req.body;

    try {
        // to register a user, we will create (and save) a new user to the database. Checking to see if the user already exists and hashing of the password prior to saving will take place in middleware.
        const user = await User.create({ username, email, password });

        // return res.status(201).json({ success: true, token: "token-gibberish" }); // A 201 status code indicates that the request has succeeded and has led to the creation of a NEW resource
        sendToken(user, 201, res);
    } catch (error) {
        console.log("There was a server error in the registration process: ", error);
        res.status(500).json({ success: false, error: error.message }); // A 500 status code indicates that there was an internal server error
        next(error); // using middleware errorHandler
    }
};

exports.login = async (req, res, next) => {
    const { email, password } = req.body;

    // check on the server side if the user has typed in an email and password
    if (!email || !password) {
        // return res.status(400).json({ success: false, error: "Please provide an email address and password." }); // The res. status() function sets the HTTP status for the response; A 400 status code indicates that the server can't or won't process the request due to something that is perceived to be a client error
        return next(new ErrorResponse("Please provide an email address and password.", 400));
    }

    // does this user exist in our database?
    try {
        let user = await User.findOne({ email }).select("+password"); // we need the .select because in the User model, we set it so that the password isn't returned unless specified

        // if the email provided by the user does not exist...
        if (!user) {
            // return res.status(401).json({ success: false, error: "Sorry. That email address or password is incorrect." }); // The res. status() function sets the HTTP status for the response; A 401 status code indicates that the client request has not been completed because it lacks valid authentication credentials for the requested resource
            return next(new ErrorResponse("Sorry. That email address or password is incorrect.", 401)); // A 401 status code indicates that the client request has not been completed because it lacks valid authentication credentials for the requested resource.
        }

        // if the email address matches, bcryptjs is used to compare the password in the req.body to the password in the database...
        const isMatch = await user.comparePasswords(password);

        // if the password provided by the user does not match the password in the database...
        if (!isMatch) {
            console.log("Sorry. That email address or password is incorrect.")
            // return res.status(401).json({ success: false, error: "Sorry. That email address or password is incorrect." }); // The res. status() function sets the HTTP status for the response; A 401 status code indicates that the client request has not been completed because it lacks valid authentication credentials for the requested resource
            return next(new ErrorResponse("Sorry. That email address or password is incorrect.", 401)); // A 401 status code indicates that the client request has not been completed because it lacks valid authentication credentials for the requested resource.
        }

        // if we make it past the if statements to this point in the code, I want to respond with a token and let the user log in
        // return res.status(200).json({ success: true, token: "token-gibberish" }); // A 200 status code indicates that the request has succeeded (depending on the HTTP request method)...
        sendToken(user, 200, res);
    } catch (error) {
        console.log("There was a server error in the login process: ", error);
        res.status(500).json({ success: false, error: error.message }); // A 500 status code indicates that there was an internal server error
    }
};

exports.forgotPassword = async (req, res, next) => {
    const { email } = req.body;

    try {
        // first, we need to check to see if the user exists in our database
        const user = await User.findOne({ email });


        if (!user) {
            return next(new ErrorResponse("Sorry. An email could not be sent.", 404)); // A 404 status code indicates that the server cannot find the requested resource.
        }

        const resetToken = user.getResetPasswordToken();

        // now that we have the resetToken (in the User model), we can save the user with this new resetToken into our database
        await user.save();

        const resetURL = `http://localhost:8080/passwordreset/${resetToken}`; //should be pointing to the frontend...

        const htmlMessage = `
        <h3>You have requested a password reset.</h3>
        <p>Please go to this link to reset your password</p>
        <a href=${resetURL} clictracking-off>${resetURL}</a>
        `;

        // sending the email...
        try {
            await sendEmail({
                to: user.email,
                subject: "Password Reset Request",
                text: htmlMessage
            });

            res.status(200).json({ success: true, data: "Password Reset Email Successfully Sent." }); // A 200 status code indicates that the request has succeeded (depending on the HTTP request method)...
            console.log("here...: ");
        } catch (error) {
            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;

            await user.save();
            return next(new ErrorResponse("Sorry. An email could not be sent.", 500)); // A 500 status code indicates that there was an internal server error
        }
    } catch (error) {
        next(error);
    }
};

const sendToken = (user, statusCode, res) => {
    const token = user.getSignedToken();
    res.status(statusCode).json({ success: true, token });
}

exports.resetPassword = async (req, res, next) => {
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.resetToken).digest("hex"); // recreates the resetToken based off of the resetToken we got from the req.params in the url (ie. /resetpassword/:resetToken)

    // now that we have the resetPasswordToken, we search for the user with the same resetPasswordToken
    try {
        const user = await User.findOne({
            resetPasswordToken: resetPasswordToken,
            resetPasswordExpire: { $gt: Date.now() } // checking in MongoDB that the expire date is greater than the time now...
        });

        if (!user) {
            return next(new ErrorResponse("Invalid Reset Token.", 400));
        }

        // if there is a user found AND the resetPasswordToken is valid...
        user.password = req.body.password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save();

        return res.status(201).json({ success: true, data: "Password Successfully Reset." }); // A 201 status code indicates that the request has succeeded and has led to the creation of a NEW resource
    } catch (error) {

    }
};
