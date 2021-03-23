const express = require('express');
const router = express.Router();
const { validate: validateSchema } = require('../../middleware/schema');
const siteSettingsSchema = require('./schema.json');

const {
    createSetup,
} = require('./controller');

router.get('/schema', (req, res, next) => {
    res.status(200).json(siteSettingsSchema);
});

router.post('/setup', createSetup);

router.post('/', (req, res, next) => {
    res.status(200).send('update generic site settings');
});

router.get('/', (req, res, next) => {
    res.status(200).send('fetch generic site settings');
});

router.put('/', (req, res, next) => {
    res.status(200).send('update generic site settings');
});

module.exports = router;