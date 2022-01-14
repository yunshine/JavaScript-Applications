const ErrorResponse = require('../utilities/errorResponse');

const errorHandler = (err, req, res, next) => {
    let error = { ...err };

    error.message = err.message;
    console.log("err from error Handler: ", err);

    if (err.code === 11000) {  // in Mongoose, 11000 is a duplicate key error
        const message = 'Duplicate Field Value Error';
        error = new ErrorResponse(message, 400); // A 400 status code indicates that the server can't or won't process the request due to something that is perceived to be a client error
    }

    if (err.name === "ValidationError") {
        const message = Object.values(err.errors).map(value => value.message);
        error = new ErrorResponse(message, 400); // A 400 status code indicates that the server can't or won't process the request due to something that is perceived to be a client error
    }

    res.status(error.statusCode || 500).json({ success: false, error: error.message || "Server Error." }); // A 500 status code indicates that there was an internal server error
};

module.exports = errorHandler;
