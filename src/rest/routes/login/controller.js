const Login = require('./model');
const { ErrorHandler } = require('../../middleware/error');

// login user with email and password
const loginUser = (req, res, next) => {
    Login.create(req.body, (error, token) => {
        if (error) return next(new ErrorHandler(403, `${error.code || error.message}`));
        res.status(200).json(token);
    });
}

module.exports = {
    loginUser
}