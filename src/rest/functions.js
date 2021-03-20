const express = require('express');
const cors = require('cors');
const functions = require('firebase-functions');
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

const restApp = express();

restApp.use(cors());

restApp.use(express.json());

const userRouteHandler = (request, response, next) => {
    response.json(request.body);
    next();
}

restApp.post(
    "/user",
    validate({ body: userSchema }),
    userRouteHandler
);

restApp.use(schemaValidationErrorMiddleware);

exports.rest = functions.https.onRequest(restApp);
