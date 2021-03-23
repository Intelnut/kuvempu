const express = require('express');
const router = express.Router();
const { validate: validateSchema } = require('../../middleware/schema');
const siteSettingsSchema = require('./schema.json');

router.post('/su', (req, res, next) => {
    res.status(200).send('setup super user defined in server.properties');
});

router.get('/schema', (req, res, next) => {
    res.status(200).json(siteSettingsSchema);
});

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