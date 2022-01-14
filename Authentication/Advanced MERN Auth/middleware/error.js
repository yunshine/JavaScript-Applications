const ErrorResponse = require('../utilities/errorResponse');

const errorHandler = (err, req, res, next) => {
    const error = { ...err };

    const message = error.message;

    if (error.code === 11000) {  // in Mongoose, 11000 is a duplicate key error
        const message = 'Duplicate Field Value Error';
        error = new ErrorResponse(message, 400);
    }
};
