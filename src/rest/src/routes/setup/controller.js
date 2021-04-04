const Setup = require('./model');
const { ErrorHandler } = require('../../middleware/error');

// setup
const createSetup = (req, res, next) => {
    const data = req.body;
    Setup.create(data, (error, feedback) => {
        if (error) return next(new ErrorHandler(500, error.message));
        res.status(200).json(feedback);
    });
}

module.exports = {
    createSetup
}