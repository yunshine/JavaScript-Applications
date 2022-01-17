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
        return new ErrorResponse("Unauthorized. Access Denied.", 401); // A 401 status code indicates that the client request has not been completed because it lacks valid authentication credentials for the requested resource.
    }
}

