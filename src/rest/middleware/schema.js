const {
    Validator,
    ValidationError,
} = require("express-json-validator-middleware");

const { validate } = new Validator();

const validationErrorHandler = (error, request, response, next) => {
    if (response.headersSent) {
        return next(error);
    }

    const isValidationError = error instanceof ValidationError;

    if (!isValidationError) {
        return next(error);
    }

    response.status(400).json({
        errors: error.validationErrors,
    });

    next();
}

module.exports = {
    validate,
    validationErrorHandler
}