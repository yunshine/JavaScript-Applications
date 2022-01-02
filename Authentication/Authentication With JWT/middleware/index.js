const jwt = require('jsonwebtoken');
const config = require('config');

const middlewareObject = {
};

middlewareObject.isAuthorized = function (req, res, next) {
    const authorizationHeader = req.header('Authorization');

    if (!authorizationHeader) {
        return res.status(401).json({ error: "Unauthorized. Access Denied." });
    }

    try {
        const decodedToken = jwt.verify(authenticationHeader, config.get('JWT_SECRET'));

        req.userId = decodedToken.user_id;

        next();
    } catch (err) {
        res.status(401).json({ error: "Unauthorized. Access Denied." });
    };
};

module.exports = middlewareObject;
