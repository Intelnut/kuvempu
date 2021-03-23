const Site = require('./model');
const { ErrorHandler } = require('../../middleware/error');

// setup will be run the first time admin is instantiated
const createSetup = (req, res, next) => {
    Site.create({ setup: true }, (error, users) => {
        if (error) return next(new ErrorHandler(500, error.code || error.message));
        res.status(200).json(users);
    });
}

module.exports = {
    createSetup
}