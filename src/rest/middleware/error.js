const {
    ValidationError
} = require("express-json-validator-middleware");

class ErrorHandler extends Error {
    constructor(statusCode, message) {
        super();
        this.statusCode = statusCode;
        this.message = message;
    }
}

const appErrorHandler = (error, request, response, next) => {

    // check if headers was sent for the response
    if (response.headersSent) {
        return next(error);
    }

    // check schema validation error
    if (error instanceof ValidationError) {
        // send bad request header if schema validation failed
        response.status(400).json({
            status: "error",
            statusCode: 400,
            message: error.validationErrors,
        });
    }

    // route errors
    const { statusCode, message } = error;
    response.status(statusCode).json({
        status: "error",
        statusCode,
        message
    });
}

module.exports = {
    appErrorHandler,
    ErrorHandler
}