const { auth } = require('../config/firebase');

// application level middleware
const setUser = async (request, response, next) => {

    // check for authorization header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
        const encryptedToken = req.headers.authorization.split('Bearer ')[1];
        // if headers are set, decrypt and set user reference on request object
        try {
            const decodedToken = await auth.verifyIdToken(encryptedToken);
            request.user = decodedToken;
            next();
        } catch (error) {
            // most probably an invalid token
            next();
        }
    } else {
        // if headers are not set, continue without setting user on request object
        // the error will be triggered by router middleware, wherever the user role validation is applied
        next();
    }
}

module.exports = {
    setUser
}