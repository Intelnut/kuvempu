const express = require('express');
const router = express.Router();

const {
    createSetup
} = require('./controller');

router.post(
    '/',
    createSetup
);

module.exports = router;