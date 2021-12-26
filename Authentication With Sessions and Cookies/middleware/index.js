const middlewareObject = {
};

middlewareObject.isAuth = function (req, res, next) {
    if (req.session.isAuth) {
        next();
    } else {
        res.redirect('/login');
    }
}

module.exports = middlewareObject;
