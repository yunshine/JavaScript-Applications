const jwt = require('jsonwebtoken');
const config = require('config');

const middlewareObject = {}; // We need to use middleware in order to check if a request to a protected route contains the correct and valid token in the header.

middlewareObject.isAuthorized = function (req, res, next) {
    const authorizationHeader = req.header('Authorization'); // 'Authorization' is the key in the header where the token is. Remember, the token is being sent through the headers to specific routes...

    // if the authorizationHeader is empty...
    if (!authorizationHeader) {
        return res.status(401).json({ error: "Unauthorized. Access Denied." }); // A 401 status code indicates that the client request has not been completed because it lacks valid authentication credentials for the requested resource.
    }

    // if we get to this portion of the code, we know that a token exists in the header. So, we'll need to check if that token is valid...
    try {
        const decodedToken = jwt.verify(authorizationHeader, config.get('JWT_SECRET')); // veryify() is a function that comes with JWT. What it does is it takes the token and checks to see if it is valid by comparing it to our secret (ie does it match our hash). If it is valid, the token will be decoded.

        // before we go to the route using next(), we want to set some data on our request object for that specifc route using this middleware. Specifically, we are setting the userID to the user_id found in the decoded token...
        req.userId = decodedToken.user_id;

        next();
    } catch (err) {
        res.status(401).json({ error: "Unauthorized. Access Denied." }); // A 401 status code indicates that the client request has not been completed because it lacks valid authentication credentials for the requested resource.
    };
};

module.exports = middlewareObject;
