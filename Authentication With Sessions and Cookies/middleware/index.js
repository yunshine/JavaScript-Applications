const middlewareObject = {
};

middlewareObject.isAuth = function (req, res, next) {
    if (req.session.isAuth) {
        next();
    } else {
        console.log("Sorry. You don't have permission to do that.");
        res.redirect('/login');
    }
}

module.exports = middlewareObject;
