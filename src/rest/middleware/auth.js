const { auth } = require('../config/firebase');
const { ErrorHandler } = require('./error');

// application level middleware
const setClaims = async (request, response, next) => {

    // check for authorization header
    if (request.headers.authorization && request.headers.authorization.startsWith('Bearer ')) {

        // if headers are set, decrypt and set user reference on request object
        try {
            const encryptedToken = request.headers.authorization.split('Bearer ')[1];
            const decodedToken = await auth.verifyIdToken(encryptedToken);
            //console.log('decodedToken', decodedToken);
            request.claims = decodedToken;
            next();
        } catch (error) {
            // most probably an invalid token
            next(error);
        }
    } else {
        // if headers are not set, continue without setting claims on request object
        // the error will be triggered by router middleware
        // when we introduce roles & capabilities
        next();
    }
}

// route level middleware
const restrictAccess = (roles) => {
    const validateUserRole = (request, response, next) => {
        try {
            let error = new ErrorHandler(403, 'User does not have permission to perform this operation');

            // if user is not set on request object, terminate the operation
            if (!request.claims) {
                next(error);
                return;
            }

            // check is user has claims
            const userRoles = roles.filter((role) => request.claims[role]);

            // allow operation if user has permission
            // else allow error handler to do its job
            (userRoles.length) > 0 ? next() : next(error);

        } catch (error) {
            next(error)
        }

    }

    return validateUserRole;
}

module.exports = {
    setClaims,
    restrictAccess
}