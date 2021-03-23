const Site = require('./model');
const { ErrorHandler } = require('../../middleware/error');

const createSiteSettings = (req, res, next) => {
    Site.create(req.body, (error, settings) => {
        if (error) return next(new ErrorHandler(500, error.message));
        res.status(200).json(settings);
    });
}

const getSiteSettings = (req, res, next) => {
    Site.fetch({}, (error, settings) => {
        if (error) return next(new ErrorHandler(500, error.message));
        res.status(200).json(settings);
    });
}

const updateSiteSettings = (req, res, next) => {
    Site.update(req.body, (error, settings) => {
        if (error) return next(new ErrorHandler(500, error.message));
        res.status(200).json(settings);
    });
}

module.exports = {
    createSiteSettings,
    getSiteSettings,
    updateSiteSettings
}