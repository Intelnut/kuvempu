
const server = require('./config/server');
const { functions } = require('./config/firebebase');

const userSchema = require('./schema/user.json');

const {
    Validator,
    ValidationError,
} = require("express-json-validator-middleware");

const { validate } = new Validator();

const schemaValidationErrorMiddleware = (error, request, response, next) => {
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


const userRouteHandler = (request, response, next) => {
    response.json(request.body);
    next();
}

server.post(
    "/users/:uid",
    validate({ body: userSchema }),
    userRouteHandler
);

server.use(schemaValidationErrorMiddleware);

exports.rest = functions.https.onRequest(server);
