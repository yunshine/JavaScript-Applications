const middlewareObject = {
};

middlewareObject.isLoggedIn = function (req, res, next) {
    if (req.session.isAuth) {
        next();
    } else {
        console.log("Sorry. You don't have permission to do that.");
        res.redirect('/login');
    }
}

middlewareObject.isNotLoggedIn = function (req, res, next) {
    if (!req.session.isAuth) {
        next();
    } else {
        console.log("Please don't do that.");
        res.redirect('/dashboard');
    }
}

module.exports = middlewareObject;
