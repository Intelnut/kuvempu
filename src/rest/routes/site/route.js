const express = require('express');
const router = express.Router();
const { validate: validateSchema } = require('../../middleware/schema');
const { restrictAccess } = require('../../middleware/auth');
const siteSettingsSchema = require('./schema.json');

const {
    createSiteSettings,
    fetchSiteSettings,
    updateSiteSettings
} = require('./controller');

const allowedRoles = ['super_admin', 'admin'];

router.get('/schema', (req, res, next) => {
    res.status(200).json(siteSettingsSchema);
});

router.get(
    '/',
    restrictAccess(allowedRoles),
    fetchSiteSettings
);

router.post(
    '/',
    restrictAccess(allowedRoles),
    validateSchema({ body: siteSettingsSchema }),
    createSiteSettings
);

router.put(
    '/',
    restrictAccess(allowedRoles),
    validateSchema({ body: siteSettingsSchema }),
    updateSiteSettings
);

module.exports = router;