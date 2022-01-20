const jwt = require('jsonwebtoken'); // tokens used for authorization, not authentication...
const User = require('../models/User'); // add in correct models...
const ErrorResponse = require('../utilities/errorResponse');

// this middleware will protect routes by checking for jsonwebtoken in the headers
exports.protectRoute = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) { // "Bearer" is added to the start of the token to show that this is an authentication-bearing token
        token = req.headers.authorization.split(" ")[1]; // because the token should look something like "Bearer 98q723khadckjhv98q347k" with a space 
    }


    // if there was no token found, we take care of it using our ErrorResponse handler
    if (!token) {
        return next(new ErrorResponse("Access Denied. You Are Not Authorized to Access This Route adsfasdf.", 401)); // A 401 status code indicates that the client request has not been completed because it lacks valid authentication credentials for the requested resource.
    }

    // in this try/catch, we'll decode the token we just got
    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET); // what verify does is decrypt the token based on our secret

        const user = await User.findById(decodedToken._id);
        console.log("here...: ", user);

        // if no user was found, the token was not valid, so...
        if (!user) {
            return next(new ErrorResponse("No user found.", 404)); // A 404 status code indicates that the server cannot find the requested resource.
        }

        // on the request object, we want to set that user and make it available to our protected routes
        req.user = user;
        next();
    } catch (error) {
        return next(new ErrorResponse("Access Denied. You Are Not Authorized to Access This Route.", 401)); // A 401 status code indicates that the client request has not been completed because it lacks valid authentication credentials for the requested resource.
    }
}

