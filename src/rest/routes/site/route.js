const express = require('express');
const router = express.Router();
const { validate: validateSchema } = require('../../middleware/schema');
const siteSettingsSchema = require('./schema.json');

const {
    createSiteSettings,
    fetchSiteSettings,
    updateSiteSettings
} = require('./controller');

router.get('/schema', (req, res, next) => {
    res.status(200).json(siteSettingsSchema);
});

// TODO: Role Middleware
router.get('/', getSiteSettings);
router.post('/', validateSchema({ body: siteSettingsSchema }), createSiteSettings);
router.put('/', validateSchema({ body: siteSettingsSchema }), updateSiteSettings);

module.exports = router;